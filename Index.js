const electron = require("electron")
const path = require("path");
const unhandled = require("electron-unhandled")

const {finishWebLoad, preloadPlugins} = require("./scripts/web/WebManager");
const {changePlayState, checkSongInfo} = require("./scripts/web/SongInfoManager");
const {createDatabase, get} = require("./scripts/database/PluginManager");

unhandled({ showDialog: false, logger: console.log })

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

    preloadPlugins(window)
    await createDatabase(window)

    window.webContents.on("will-prevent-unload", (event) => {
        event.preventDefault()
        console.log(`[Window] Prevented unloading`)
    })

    console.log(`[Window] Loading YouTube Music page...`)
    window.loadURL("https://music.youtube.com").then(() => {
        window.webContents.on("did-finish-load", () => {
            finishWebLoad(window)
        })

        console.log(`[Window] Showing window`)
        window.show()
    })

    window.on("minimize", () => {
        console.log(`[Window] Video is hidden now to increase performance`)
        window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.add("video-disable-performance") }`)
    })

    window.on("restore", () => {
        console.log(`[Window] Video is shown again because app is not minimized anymore`)
        window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.remove("video-disable-performance") }`)
    })

    window.webContents.on("devtools-opened", () => {
        console.log(`[Window] devTools opened`)
    })

    window.webContents.on("devtools-closed", () => {
        console.log(`[Window] devTools closed`)
    })

    electron.ipcMain.on("play", () => {
        if(get("discord-rpc") === true) {
            changePlayState(window, 'play')
        }
    })

    electron.ipcMain.on("seek", () => {
        if(get("discord-rpc") === true) {
            changePlayState(window, 'play')
        }
    })

    electron.ipcMain.on("pause", () => {
        if(get("discord-rpc") === true) {
            changePlayState(window, 'pause')
        }
    })

    electron.ipcMain.on("song-info", () => {
        checkSongInfo(window)
    })

    electron.ipcMain.on("preload-enabled", () => {
        console.log("[Preload] Preload script enabled")
    })

    window.webContents.on("page-title-updated", (event) => {
        event.preventDefault()
    })
})