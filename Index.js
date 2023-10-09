const electron = require("electron")
const path = require("path");
const unhandled = require("electron-unhandled")

const {finishWebLoad, preloadPlugins, loadPlugins} = require("./scripts/web/WebManager");
const {changePlayState, checkSongInfo} = require("./scripts/web/SongInfoManager");
const {createDatabase, get, set} = require("./scripts/database/PluginManager");

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
    if(get("adblocker") === false) {
        pr = path.join(__dirname, "NoAdPreload.js")
    } else {
        pr = path.join(__dirname, "Preload.js")
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
            }
        }
    )

    this.browserWindow = window
    w = window

    preloadPlugins(window)
    await createDatabase(window)

    window.webContents.on("will-prevent-unload", (event) => {
        event.preventDefault()
        console.log(`[Window] Prevented unloading`)
    })

    console.log(`[Window] Loading YouTube Music page...`)
    window.loadURL("https://music.youtube.com").then(() => {
        finishWebLoad(window)
        console.log(`[Window] Showing window`)
        window.show()
    })

    window.on("minimize", () => {
        console.log(`[Window] Video is hidden now to increase performance`)
        window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.add("video-disable-performance") }`)
        window.webContents.executeJavaScript(`document.querySelector("body").classList.add("gamer-mode")`)
        if(get("gamer-mode") === true) {
            set("color-changer", false)
        }
    })

    window.on("restore", () => {
        console.log(`[Window] Video is shown again because app is not minimized anymore`)
        window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.remove("video-disable-performance") }`)
        window.webContents.executeJavaScript(`document.querySelector("body").classList.remove("gamer-mode")`)
        if(get("gamer-mode") === true) {
            set("color-changer", true)
        }
    })

    window.on("blur", () => {
        if(get("gamer-mode") === true) {
            console.log(`[Window] Video is hidden now to increase performance`)
            window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.add("video-disable-performance") }`)
            window.webContents.executeJavaScript(`document.querySelector("body").classList.add("gamer-mode")`)
            set("color-changer", false)
        }
    })

    window.on("focus", () => {
        if(get("gamer-mode") === true) {
            console.log(`[Window] Video is shown again because app is not minimized anymore`)
            window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.remove("video-disable-performance") }`)
            window.webContents.executeJavaScript(`document.querySelector("body").classList.remove("gamer-mode")`)
            set("color-changer", true)
        }
    })

    window.on("enter-full-screen", () => {
        window.setMenuBarVisibility(false)
    })

    window.on("leave-full-screen", () => {
        window.setMenuBarVisibility(true)
    })

    window.webContents.on("devtools-opened", () => {
        console.log(`[Window] devTools opened`)
    })

    window.webContents.on("devtools-closed", () => {
        console.log(`[Window] devTools closed`)
    })

    electron.ipcMain.on("play", () => {
        changePlayState(window, 'play')
    })

    electron.ipcMain.on("seek", () => {
        changePlayState(window, 'play')
    })

    electron.ipcMain.on("pause", () => {
        changePlayState(window, 'pause')
    })

    electron.ipcMain.on("song-info", () => {
        checkSongInfo(window)
    })

    electron.ipcMain.on("preload-enabled", () => {
        console.log("[Preload] Preload script enabled")
        loadPlugins(window)
    })

    window.on("close", () => {
        electron.app.quit()
    })
})

electron.app.on("second-instance", () => {
    if(!w) {
        process.exit()
        console.log(`[Window] Already one session running, closing...`)
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