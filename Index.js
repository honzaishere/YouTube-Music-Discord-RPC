const electron = require("electron")
const path = require("path");
const unhandled = require("electron-unhandled")

const {finishWebLoad, preloadPlugins, addTray, bypassNetwork} = require("./scripts/web/WebManager");
const {createDatabase, get, set, getJSON} = require("./scripts/database/PluginManager");
const {getLastSongInfo} = require("./scripts/database/PluginManager");
const store = require("electron-store");

const gotTheLock = electron.app.requestSingleInstanceLock();
if (!gotTheLock) {
    process.exit()
}

let w

unhandled({ showDialog: false, logger: console.log })

if(get("gamer-mode") === true) {
    console.log(`[Window] app.disableHardwareAcceleration() called.`)
    electron.app.disableHardwareAcceleration()
}

electron.app.on("ready", async () => {
    let pr
    if(get("adblocker") === true) {
        pr = path.join(__dirname, "Preload.js")
    } else {
        pr = path.join(__dirname, "NoAdPreload.js")
    }
    const window = new electron.BrowserWindow(
        {
            title: "YouTube Music",
            icon: path.join(__dirname, "icons", "icon.ico"),
            show: false,
            minWidth: 1280,
            minHeight: 720,
            webPreferences: {
                preload: pr,
                nodeIntegration: true
            },
            frame: false
        }
    )

    this.browserWindow = window
    w = window
    electron.Menu.setApplicationMenu(null)
    const is = require("electron-is")
    if(is.dev()) {
        w.webContents.openDevTools({ mode: "detach" })
    }

    bypassNetwork(window)
    preloadPlugins(window)
    addTray(window)
    await createDatabase()

    const oldSongInfo = getLastSongInfo()

    if(get("resume-playback-on-launch") === true) {
        console.log(`[Window] Loading YouTube Music page with last video...`)
        try {
            window.loadURL(`https://music.youtube.com/watch?v=${oldSongInfo.info.details.videoId || undefined}&t=${oldSongInfo.time}&list=${oldSongInfo.list}`).then(() => {
            if(window.webContents.getURL().includes("https://music.youtube.com")) {
                console.log(`[Window] Showing window`)
                window.show()
            } else {
                console.log(`[Window] Got consent page, inserting css`)
                window.show()
            }
        })
        } catch(e) {
            console.log(`[Window] Loading YouTube Music page...`)
            window.loadURL("https://music.youtube.com/").then(async () => {
                if(window.webContents.getURL().includes("https://music.youtube.com")) {
                    console.log(`[Window] Showing window`)
                    window.show()
                } else {
                    console.log(`[Window] Got consent page, inserting css`)
                    window.show()
                }
            })
        }
    } else {
        console.log(`[Window] Loading YouTube Music page...`)
        window.loadURL("https://music.youtube.com/").then(async () => {
            if(window.webContents.getURL().includes("https://music.youtube.com")) {
                console.log(`[Window] Showing window`)
                window.show()
            } else {
                console.log(`[Window] Got consent page, inserting css`)
                window.show()
            }
        })
    }

    electron.ipcMain.on("preload-enabled", () => {
        console.log("[Preload] Preload script enabled")
        finishWebLoad(window)
    })
})

electron.app.on("second-instance", () => {
    if(!w) {
        console.log(`[Window] Already one session running, closing...`)
        process.exit()
        return
    }

    if(w.isMinimized()) {
        w.restore()
    }

    if(!w.isVisible()) {
        w.show()
    }

    w.focus()
})