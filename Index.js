let preloadPath = "";
let wasPreloadEnabled = false;
let currentWindow;

const electron = require("electron")
const path = require("path");
const unhandled = require("electron-unhandled")

const { get } = require("./scripts/database/PluginManager")
const {finishWebLoad, redoFinishWebLoad} = require("./scripts/web/WebManager");
const {getLastSongInfo, createDatabase} = require("./scripts/database/PluginManager");
const {bypassNetwork} = require("./scripts/web/Managers/Window/networkManager")
const {addTray} = require("./scripts/web/Managers/Window/windowManager")
const {preloadPlugins} = require("./scripts/web/Managers/Window/pluginManager");

const gotTheLock = electron.app.requestSingleInstanceLock();
if (!gotTheLock) {
    process.exit()
}

unhandled({showDialog: false, logger: console.log})

if (get("gamer-mode") === true) {
    electron.app.disableHardwareAcceleration()
}

electron.app.on("ready", async () => {
    if (get("adblocker") === true) {
        preloadPath = path.join(__dirname, "Preload.js")
    }
    if (get("adblocker") === false) {
        preloadPath = path.join(__dirname, "NoAdPreload.js")
    }

    const window = new electron.BrowserWindow(
        {
            title: "YouTube Music",
            icon: path.join(__dirname, "icons", "icon.ico"),
            show: false,
            minWidth: 1280,
            minHeight: 720,
            webPreferences: {
                preload: preloadPath,
                nodeIntegration: true
            },
            frame: false
        }
    )

    this.browserWindow = window
    currentWindow = window
    electron.Menu.setApplicationMenu(null)

    bypassNetwork(window)
    preloadPlugins(window)
    addTray(window)
    await createDatabase()

    const oldSongInfo = getLastSongInfo()

    if (get("resume-playback-on-launch") === true) {
        try {
            window.loadURL(`https://music.youtube.com/watch?v=${oldSongInfo.info.details.videoId || undefined}&t=${oldSongInfo.time}&list=${oldSongInfo.list}`).then(() => {
                window.show()
            })
        } catch (e) {
            window.loadURL("https://music.youtube.com/").then(() => {
                window.show()
            })
        }
    } else {
        window.loadURL("https://music.youtube.com/").then(() => {
            window.show()
        })
    }

    electron.ipcMain.on("preload-enabled", () => {
        if (wasPreloadEnabled === true) {
            redoFinishWebLoad(window)
            return
        }
        if (wasPreloadEnabled === false) {
            finishWebLoad(window)
            wasPreloadEnabled = true
        }
    })

    window.webContents.on("render-process-gone", () => {
        electron.dialog.showMessageBox({
            title: "YouTube Music",
            message: "Unfortunately, it looks like that YouTube Music has crashed. Please reload the app.",
            icon: path.join(__dirname, "..", "..", "icons", "tray.png")
        })
    })
})

electron.app.on("second-instance", () => {
    if (!currentWindow) {
        process.exit()
        return
    }

    if (currentWindow.isMinimized()) {
        currentWindow.restore()
    }

    if (!currentWindow.isVisible()) {
        currentWindow.show()
    }

    currentWindow.focus()
})