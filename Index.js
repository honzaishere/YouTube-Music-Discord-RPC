const electron = require("electron")
const app = electron.app

const path = require("path")
const is = require("electron-is")
const unhandled = require("electron-unhandled")

const { didFirstLaunch } = require("./Scripts/firstLaunch")
const { settingsDatabase, clearDB } = require("./Scripts/databaseManager")
const { applyCSS } = require("./Scripts/applyCSS")
const { setupSongInfo } = require("./Scripts/songInfoManager")
const { setApplicationMenu } = require("./Scripts/applicationMenu")
const { createConnection } = require("./Scripts/discordManager")
const { changeColorsForLastVideo } = require("./Scripts/colorChanger")
const { blockAds } = require("./Scripts/adBlocker")
const { injectScripts } = require("./Scripts/injectScripts")
const { handleOffline } = require("./Scripts/handleOffline")
const { log } = require("./Scripts/logger")
const { setupIPCRemote } = require("./Scripts/ipcEvents")

unhandled({
    logger: console.log,
    showDialog: false
})

let loaded

if (settingsDatabase.get("DisableHardwareAcceleration") == true) {
    app.disableHardwareAcceleration()
    log(`Index: Disabled Hardware Acceleration`)
}

app.on("ready", () => {
    didFirstLaunch()
    blockAds(electron)
    clearDB()

    const window = new electron.BrowserWindow({
        width: 1280,
        height: 720,
        minHeight: 720,
        minWidth: 1280,
        title: "YouTube Music",
        icon: "Icons/Icon.ico",
        roundedCorners: true,
        webPreferences: {
            preload: path.join(__dirname, "Preload.js"),
            nodeIntegration: true,
        },
        darkTheme: true,
        backgroundColor: "#0e0e0e",
        show: false,
    })

    setupIPCRemote()

    this.browserWindow = window

    if (settingsDatabase.get("SaveLastVideo")) {
        if (settingsDatabase.get("LastVideoId")) {
            if (settingsDatabase.get("LastVideoList")) {
                window.loadURL(`https://music.youtube.com/watch?v=${settingsDatabase.get("LastVideoId")}&list=${settingsDatabase.get("LastVideoList")}`)
                loaded = true
                log(`Index: Loading last saved URL https://music.youtube.com/watch?v=${settingsDatabase.get("LastVideoId")}&list=${settingsDatabase.get("LastVideoList")}`)

                setTimeout(() => {
                    if (!window.isVisible()) {
                        settingsDatabase.delete("LastVideoId")
                        settingsDatabase.delete("LastVideoList")
                        electron.dialog.showErrorBox(`YouTube Music`, `Looks like YouTube Music is not responding... Try reloading the app`)
                        app.quit()
                    }
                }, 30000)
            }
            else {
                window.loadURL(`https://music.youtube.com/watch?v=${settingsDatabase.get("LastVideoId")}`)
                loaded = true
                log(`Index: Loading last saved URL https://music.youtube.com/watch?v=${settingsDatabase.get("LastVideoId")}`)

                setTimeout(() => {
                    if (!window.isVisible()) {
                        settingsDatabase.delete("LastVideoId")
                        settingsDatabase.delete("LastVideoList")
                        electron.dialog.showErrorBox(`YouTube Music`, `YouTube Music is not responding... Reload the app.`)
                        app.quit()
                    }
                }, 30000)
            }
        } else {
            window.loadURL("https://music.youtube.com/")
            log(`Index: Loading URL https://music.youtube.com/`)

            setTimeout(() => {
                if (!window.isVisible()) {
                    settingsDatabase.delete("LastVideoId")
                    settingsDatabase.delete("LastVideoList")
                    electron.dialog.showErrorBox(`YouTube Music`, `YouTube Music is not responding... Reload the app.`)
                    app.quit()
                }
            }, 30000)
        }
    }
    else {
        window.loadURL("https://music.youtube.com/")
        log(`Index: Loading URL https://music.youtube.com/`)

        setTimeout(() => {
            if (!window.isVisible()) {
                settingsDatabase.delete("LastVideoId")
                settingsDatabase.delete("LastVideoList")
                electron.dialog.showErrorBox(`YouTube Music`, `Looks like YouTube Music is not responding... Try reloading the app`)
                app.quit()
            }
        }, 30000)
    }

    app.setLoginItemSettings({
        openAtLogin: settingsDatabase.get("StartupLaunch")
    })
    log(`Index: openAtLogin: ${settingsDatabase.get("StartupLaunch")}`)


    if (is.windows()) {
        const appID = "honzawashere.youtube.music";
        app.setAppUserModelId(appID)
        const appLocation = process.execPath
        const appData = app.getPath("appData")
        if (!is.dev() && !appLocation.startsWith(path.join(appData, "..", "Local", "Temp"))) {
            const shortcutPath = path.join(appData, "Microsoft", "Windows", "Start Menu", "Programs", "YouTube Music.lnk")
            try {
                const shortcutDetails = electron.shell.readShortcutLink(shortcutPath)
                if (shortcutDetails.target !== appLocation || shortcutDetails.appUserModelId !== appID) {
                    throw "needUpdate";
                }
            } catch (error) {
                electron.shell.writeShortcutLink(
                    shortcutPath,
                    error === "needUpdate" ? "update" : "create",
                    {
                        target: appLocation,
                        cwd: appLocation.slice(0, appLocation.lastIndexOf(path.sep)),
                        description: "YouTube Music App with modifications",
                        appUserModelId: appID
                    }
                );
            }
        }
        setApplicationMenu(window)
    }

    window.webContents.on("did-finish-load", () => {
        log(`Index: Finished loading URL: ${window.webContents.getURL()}`)
        injectScripts(window)
        applyCSS(window)
        setupSongInfo(window)

        if (loaded == true) {
            if (window.webContents.getURL().startsWith(`https://accounts.google.com/v3/signin/`)) {
                if (!window.isVisible()) {
                    window.show()
                }
                return
            }
            if (window.webContents.getURL().startsWith(`https://accounts.google.com/v3/signin/`)) {
                if (!window.isVisible()) {
                    window.show()
                }
                return
            }
            if (window.webContents.getURL().startsWith(`https://consent.youtube.com/`)) {
                if (!window.isVisible()) {
                    window.show()
                }
                return
            }
            window.show()
            changeColorsForLastVideo(window)
            createConnection()
        } else {
            window.show()
            createConnection()
        }
    })

    window.webContents.on("did-fail-load", () => {
        electron.dialog.showErrorBox("YouTube Music can't be loaded.", "YouTube Music can't be load because of error. Please check your network connection and try it again. Sorry for this! :(")
    })

    electron.ipcMain.on("navigation", () => {
        log("Index: Navigated on page: " + window.webContents.getURL())
    })

    electron.ipcMain.on("preload-loaded", () => {
        log(`Preload: Preload has been loaded`)
    })

    electron.ipcMain.on("page-content-loaded", () => {
        log(`Preload: Page content loaded, DOMContentLoaded event will be executed`)
    })
})