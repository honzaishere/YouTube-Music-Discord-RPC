const electron = require("electron")
const app = electron.app

const path = require("path")
const is = require("electron-is")

const { didFirstLaunch } = require("./Scripts/firstLaunch")
const { settingsDatabase, songInfoDatabase } = require("./Scripts/databaseManager")
const applyCSS = require("./Scripts/applyCSS")
const { setupSongInfo } = require("./Scripts/songInfoManager")
const { setApplicationMenu } = require("./Scripts/applicationMenu")
const { createConnection } = require("./Scripts/discordManager")
const { changeColorsForLastVideo } = require("./Scripts/colorChanger")
const { blockAds } = require("./Scripts/adBlocker")

let loaded

if(settingsDatabase.get("DisableHardwareAcceleration") == true) {
    app.disableHardwareAcceleration()
}

app.on("ready", () => {
    didFirstLaunch()

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
            autoplayPolicy: settingsDatabase.get("DisableAutoplay") ? "document-user-activation-required" : "no-user-gesture-required"
        },
        backgroundColor: "#0e0e0e",
        show: false
    })

    window.loadURL("https://music.youtube.com")
    
    app.setLoginItemSettings({
        openAtLogin: settingsDatabase.get("StartupLaunch")
    })

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
        window.show()
        applyCSS(window)
        setupSongInfo(window)
        blockAds(window)
        createConnection()

        if(settingsDatabase.get("SaveLastVideo")) {
            if(settingsDatabase.get("LastVideoId") !== "") {
                setTimeout(() => {
                    if(songInfoDatabase.get("musicVideoType") == "MUSIC_VIDEO_TYPE_ATV" || songInfoDatabase.get("musicVideoType") == "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
                        changeColorsForLastVideo(window)
                    }
                }, 5000)
            }
        }
        if(loaded == true) return
        if(settingsDatabase.get("SaveLastVideo")) {
            if(settingsDatabase.get("LastVideoId") !== "") {
                window.loadURL("https://music.youtube.com/watch?v=" + settingsDatabase.get("LastVideoId"))
                loaded = true
            }
        }
    })
})