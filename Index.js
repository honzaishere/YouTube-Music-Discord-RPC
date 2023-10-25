const electron = require("electron")
const path = require("path");
const unhandled = require("electron-unhandled")

const {finishWebLoad, preloadPlugins, handleURLChange} = require("./scripts/web/WebManager");
const {changePlayState, checkSongInfo, setLastSongInfo} = require("./scripts/web/SongInfoManager");
const {createDatabase, get, set, getJSON} = require("./scripts/database/PluginManager");
const {getLastSongInfo} = require("./scripts/database/PluginManager");
const bypass_premium = require("./plugins/bypass-premium-restrictions/Plugin");
const color_changer = require("./plugins/color-changer/Plugin");
const download = require("./plugins/downloader/Plugin");
const store = require("electron-store");
const premium = require("./plugins/premium-features/Plugin");

const gotTheLock = electron.app.requestSingleInstanceLock();
if (!gotTheLock) {
    process.exit()
}

let w

function handle(plugin, window) {
    if(plugin === "adblocker") {
        const adblocker = require("./plugins/adblocker/Plugin")
        adblocker.handle()
    }
    if(plugin === "disable-miniplayer") {
        const bypass_premium = require("./plugins/bypass-premium-restrictions/Plugin")
        bypass_premium.handle(plugin)
    }
    if(plugin === "disable-premium-upgrade") {
        const bypass_premium = require("./plugins/bypass-premium-restrictions/Plugin")
        bypass_premium.handle()
    }
    if(plugin === "color-changer") {
        const color_changer = require("./plugins/color-changer/Plugin")
        color_changer.handle()
    }
    if(plugin === "color-changer-songs") {
        const color_changer = require("./plugins/color-changer/Plugin")
        color_changer.handle_songs()
    }
    if(plugin === "color-changer-videos") {
        const color_changer = require("./plugins/color-changer/Plugin")
        color_changer.handle_videos()
    }
    if(plugin === "color-changer-private-songs") {
        const color_changer = require("./plugins/color-changer/Plugin")
        color_changer.handle_private()
    }
    if(plugin === "discord-rpc") {
        const discord = require("./plugins/discord-rpc/Plugin")
        discord.handle()
    }
    if(plugin === "download-mp3") {
        const download = require("./plugins/downloader/Plugin")
        download.downloadMp3(window)
    }
    if(plugin === "download-mp4") {
        const download = require("./plugins/downloader/Plugin")
        download.downloadMp4(window)
    }
    if(plugin === "gamer-mode") {
        const gamer = require("./plugins/gaming-mode/Plugin")
        gamer.handle()
    }
    if(plugin === "show-premium-tag") {
        const premium = require("./plugins/premium-features/Plugin")
        premium.handle()
    }
    if(plugin === "resume-playback-on-launch") {
        const res = require("./plugins/resume-playback-on-launch/Plugin")
        res.handle()
    }
}

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
            }
        }
    )

    this.browserWindow = window
    w = window
    window.webContents.openDevTools()
    electron.Menu.setApplicationMenu(null)

    preloadPlugins(window)
    await createDatabase()

    window.webContents.on("will-prevent-unload", (event) => {
        event.preventDefault()
        console.log(`[Window] Forced unloading`)
    })

    const oldSongInfo = getLastSongInfo()

    if(get("resume-playback-on-launch") === true && oldSongInfo.details !== undefined) {
        console.log(`[Window] Loading YouTube Music page with last video...`)
        window.loadURL("https://music.youtube.com/watch?v=" + oldSongInfo.details.videoId).then(() => {
            if(window.webContents.getURL().includes("https://music.youtube.com")) {
                console.log(`[Window] Showing window`)
                window.show()
            } else {
                console.log(`[Window] Got consent page, inserting css`)
                window.show()
            }
        })
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
        finishWebLoad(window)
    })

    electron.ipcMain.on("button-clicked", (e, [args]) => {
        handle(args, window)
    })

    window.webContents.on("did-start-navigation", (e, url) => {
        handleURLChange(window, url)
    })

    window.on("close", () => {
        setLastSongInfo()
        electron.app.quit()
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