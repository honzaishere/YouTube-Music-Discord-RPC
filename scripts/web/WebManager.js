const {get, set} = require("../database/PluginManager");
const electron = require("electron");
const {changePlayState, checkSongInfo, setLastSongInfo} = require("./SongInfoManager");
const path = require("path");
const PlaylistJS = require("./JS/PlaylistJS");
const {windows} = require("electron-is");
let app_tray = null

module.exports.finishWebLoad = (window) => {
    // Do not inject until we get the actual YouTube Music page.
    if (!window.webContents.getURL().includes("https://music.youtube.com/")) {
        const ConsentCSS = require("./CSS/ConsentCSS")
        ConsentCSS.load(window);
        console.log(`[ConsentCSS] Enabled`)
    }

    // Do not inject until we get the actual YouTube Music page.
    if (window.webContents.getURL().includes("https://music.youtube.com")) {
        const ColorChangerCSS = require("./CSS/ColorChangerCSS")
        const HomepageCSS = require("./CSS/HomepageCSS")
        const PlayerCSS = require("./CSS/PlayerCSS")
        const PlaylistsCSS = require("./CSS/PlaylistsCSS")
        const PluginsMenuCSS = require("./CSS/PluginsMenuCSS")
        const TitlebarCSS = require("./CSS/TitlebarCSS")
        const WhiteColorCSS = require("./CSS/WhiteColorCSS")
        const YouTubeSansCSS = require("./CSS/YouTubeSansCSS")
        const GamerModeCSS = require("./CSS/GamerModeCSS")
        const PluginsMenuJS = require("./JS/PluginsMenuJS")
        const TitlebarJS = require("./JS/TitlebarJS")

        ColorChangerCSS.load(window);
        console.log(`[ColorChangerCSS] Enabled`)
        HomepageCSS.load(window);
        console.log(`[HomepageCSS] Enabled`)
        PlayerCSS.load(window);
        console.log(`[PlayerCSS] Enabled`)
        PlaylistsCSS.load(window);
        console.log(`[PlaylistsCSS] Enabled`)
        PluginsMenuCSS.load(window);
        console.log(`[PluginsMenuCSS] Enabled`)
        TitlebarCSS.load(window);
        console.log(`[TitlebarCSS] Enabled`)
        WhiteColorCSS.load(window);
        console.log(`[WhiteColorCSS] Enabled`)
        if (get("disable-yt-sans") === false) YouTubeSansCSS.load(window);
        console.log(`[YouTubeSansCSS] Enabled`)
        GamerModeCSS.load(window);
        console.log(`[GamerModeCSS] Enabled`)
        PluginsMenuJS.load(window);
        console.log(`[PluginsMenuJS] Enabled`)
        TitlebarJS.load(window);
        console.log(`[TitlebarJS] Enabled`)

        if (get("disable-better-fullscreen") === true) {
            window.webContents.executeJavaScript(`document.querySelector("#layout").setAttribute("disable-better-fullscreen", "")`)
            console.log(`[BetterFullScreen] Disabled`)
        }

        this.loadPlugins(window)
    }

    this.handleIPC(window)
    this.handleWindow(window)
}


module.exports.loadPlugins = (window) => {
    const adblocker = require("../../plugins/adblocker/Plugin")
    const bypass_premium_restrictions = require("../../plugins/bypass-premium-restrictions/Plugin")
    const color_changer = require("../../plugins/color-changer/Plugin")
    const discord_rpc = require("../../plugins/discord-rpc/Plugin")
    const downloader = require("../../plugins/downloader/Plugin")

    // Do not inject until we get the actual YouTube Music page.
    if (window.webContents.getURL().includes("https://music.youtube.com/")) {
        window.webContents.executeJavaScript("ytcfg.data_.IS_SUBSCRIBER").then(is => {
            if (is) {
                const store = require("electron-store")
                const s = new store()
                s.set("app.premium-user", true)
                if (get("show-premium-tag") === true) {
                    window.webContents.on("page-title-updated", () => {
                        window.setTitle(window.getTitle().replace("YouTube Music", "YouTube Music Premium"))
                    })
                }

                if (get("color-changer") === true) color_changer.enable(window);
                console.log(`[color-changer] Enabled`)
                if (get("discord-rpc") === true) discord_rpc.enable(window);
                console.log(`[discord-rpc] Enabled`)
                downloader.enable(window);
                console.log(`[downloader] Enabled`)
                return
            }
            if (!is) {
                const store = require("electron-store")
                const s = new store()
                s.set("app.premium-user", false)
                window.setTitle("YouTube Music")
                window.webContents.on("page-title-updated", () => {
                    window.setTitle("YouTube Music")
                })

                if (get("adblocker") === true) adblocker.enable(window);
                console.log(`[adblocker] Enabled`)
                if (get("disable-premium-upgrade") === true || get("disable-miniplayer") === true) bypass_premium_restrictions.enable(window);
                console.log(`[bypass-premium-restrictions] Enabled`)
                if (get("color-changer") === true) color_changer.enable(window);
                console.log(`[color-changer] Enabled`)
                if (get("discord-rpc") === true) discord_rpc.enable(window);
                console.log(`[discord-rpc] Enabled`)
                downloader.enable(window);
                console.log(`[downloader] Enabled`)
            }
        })
    }
}

module.exports.preloadPlugins = (window) => {
    const adblocker = require("../../plugins/adblocker/Plugin")
    const bypass_premium_restrictions = require("../../plugins/bypass-premium-restrictions/Plugin")
    const color_changer = require("../../plugins/color-changer/Plugin")
    const discord_rpc = require("../../plugins/discord-rpc/Plugin")
    const downloader = require("../../plugins/downloader/Plugin")

    if (get("adblocker") === true) adblocker.preload(window);
    console.log(`[adblocker] Preloaded`)
    if (get("bypass-premium-restrictions") === true) bypass_premium_restrictions.preload(window);
    console.log(`[bypass-premium-restrictions] Preloaded`)
    if (get("color-changer") === true) color_changer.preload(window);
    console.log(`[color-changer] Preloaded`)
    if (get("discord-rpc") === true) discord_rpc.preload(window);
    console.log(`[discord-rpc] Preloaded`)
    downloader.preload(window);
    console.log(`[downloader] Preloaded`)
}

module.exports.handleURLChange = (window, url) => {
    const PlaylistJS = require("./JS/PlaylistJS")
    if (url.includes(PlaylistJS.info.include)) return PlaylistJS.load(window)
    if (!url.includes(PlaylistJS.info.include)) return PlaylistJS.clear(window)
}

module.exports.handleIPC = (window) => {
    function handle(plugin, window) {
        if (plugin === "disable-yt-sans") {
            if (get("disable-yt-sans") === true) {
                set("disable-yt-sans", false)
            } else {
                set("disable-yt-sans", true)
            }
        }
        if (plugin === "disable-better-fullscreen") {
            if (get("disable-better-fullscreen") === true) {
                set("disable-better-fullscreen", false)
                window.webContents.executeJavaScript(`document.querySelector("ytmusic-app-layout").removeAttribute("disable-better-fullscreen")`)
            } else {
                set("disable-better-fullscreen", true)
                window.webContents.executeJavaScript(`document.querySelector("ytmusic-app-layout").setAttribute("disable-better-fullscreen", "")`)
            }
        }
        if (plugin === "adblocker") {
            const adblocker = require("../../plugins/adblocker/Plugin")
            adblocker.handle()
        }
        if (plugin === "disable-miniplayer") {
            const bypass_premium = require("../../plugins/bypass-premium-restrictions/Plugin")
            bypass_premium.handle(plugin)
        }
        if (plugin === "disable-premium-upgrade") {
            const bypass_premium = require("../../plugins/bypass-premium-restrictions/Plugin")
            bypass_premium.handle()
        }
        if (plugin === "color-changer") {
            const color_changer = require("../../plugins/color-changer/Plugin")
            color_changer.handle()
        }
        if (plugin === "color-changer-songs") {
            const color_changer = require("../../plugins/color-changer/Plugin")
            color_changer.handle_songs()
        }
        if (plugin === "color-changer-videos") {
            const color_changer = require("../../plugins/color-changer/Plugin")
            color_changer.handle_videos()
        }
        if (plugin === "color-changer-private-songs") {
            const color_changer = require("../../plugins/color-changer/Plugin")
            color_changer.handle_private()
        }
        if (plugin === "discord-rpc" || plugin === "discord-show-playback" || plugin === "discord-show-cover" || plugin === "discord-show-songdata" || plugin === "discord-show-time") {
            const discord = require("../../plugins/discord-rpc/Plugin")
            discord.handle(plugin)
        }
        if (plugin === "download-mp3") {
            const download = require("../../plugins/downloader/Plugin")
            download.downloadMp3(window)
        }
        if (plugin === "download-mp4") {
            const download = require("../../plugins/downloader/Plugin")
            download.downloadMp4(window)
        }
        if (plugin === "gamer-mode") {
            const gamer = require("../../plugins/gaming-mode/Plugin")
            gamer.handle()
        }
        if (plugin === "show-premium-tag") {
            const premium = require("../../plugins/premium-features/Plugin")
            premium.handle()
        }
        if (plugin === "resume-playback-on-launch") {
            const res = require("../../plugins/resume-playback-on-launch/Plugin")
            res.handle()
        }
        if (plugin === "disable-tray") {
            if (get("disable-tray") === true) {
                set("disable-tray", false)
                this.addTray(window)
            } else {
                set("disable-tray", true)
                this.destroyTray()
            }
        }
        if (plugin === "close-background") {
            if (get("close-background") === true) {
                set("close-background", false)
            } else {
                set("close-background", true)
            }
        }
    }

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

    electron.ipcMain.on("button-clicked", (e, [args]) => {
        handle(args, window)
    })

    electron.ipcMain.on("rate-limited", () => {
        electron.dialog.showMessageBox({ title: "Oops...", message: "You are rate limited. The app should work well in next 100 seconds. You should prevent yourself from relaunching the app too much.", buttons: ["OK"], icon: path.join(__dirname, "..", "..", "icons", "tray.png")})
    })

    electron.ipcMain.on("av-clicked", (e, [args]) => {
        if (args === "audio") {
            if (window.isFullScreen()) {
                window.webContents.executeJavaScript(`
                    document.querySelector("#fullscreen-container").style.display = "block"
                ;0`)
            }
        }
        if (args === "video") {
            if (window.isFullScreen()) {
                window.webContents.executeJavaScript(`
                    document.querySelector("#fullscreen-container").style.display = "none"
                ;0`)
            }
        }
    })

    electron.ipcMain.on("close", () => {
        if (get("close-background") === true) {
            window.hide()
        } else {
            window.webContents.executeJavaScript(`
            document.querySelector("#movie_player").getCurrentTime().toString().split(".")[0]
        `).then(time => {
                window.webContents.executeJavaScript(`document.querySelector("#movie_player").getVideoData()`).then(data => {
                    setLastSongInfo(time, data.list || undefined)
                    electron.app.quit()
                })
            })
        }
    })

    electron.ipcMain.on("minimize", () => {
        window.minimize()
    })

    electron.ipcMain.on("maximize", () => {
        window.maximize()
    })

    electron.ipcMain.on("restore", () => {
        window.unmaximize()
    })

    function handler() {
        if (window.isMaximized()) {
            window.webContents.executeJavaScript(`document.body.classList.add('maximized')`);
        } else {
            window.webContents.executeJavaScript(`document.body.classList.remove('maximized')`);
        }
    }

    window.on("maximize", () => {
        handler()
    })

    window.on("unmaximize", () => {
        handler()
    })
}

module.exports.handleWindow = (window) => {
    window.webContents.on("will-prevent-unload", (event) => {
        event.preventDefault()
        console.log(`[Window] Forced unloading`)
    })

    window.on("minimize", () => {
        console.log(`[Window] Video is hidden now to increase performance`)
        window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.add("video-disable-performance") }`)
        window.webContents.executeJavaScript(`document.querySelector("body").classList.add("gamer-mode")`)
        if (get("gamer-mode") === true) {
            set("color-changer", false)
        }
    })

    window.on("restore", () => {
        console.log(`[Window] Video is shown again because app is not minimized anymore`)
        window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.remove("video-disable-performance") }`)
        window.webContents.executeJavaScript(`document.querySelector("body").classList.remove("gamer-mode")`)
        if (get("gamer-mode") === true) {
            set("color-changer", true)
        }
    })

    window.on("blur", () => {
        if (get("gamer-mode") === true) {
            console.log(`[Window] Video is hidden now to increase performance`)
            window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.add("video-disable-performance") }`)
            window.webContents.executeJavaScript(`document.querySelector("body").classList.add("gamer-mode")`)
            set("color-changer", false)
        }
    })

    window.on("focus", () => {
        if (get("gamer-mode") === true) {
            console.log(`[Window] Video is shown again because app is not minimized anymore`)
            window.webContents.executeJavaScript(`if(document.querySelector("video")) { document.querySelector("video").classList.remove("video-disable-performance") }`)
            window.webContents.executeJavaScript(`document.querySelector("body").classList.remove("gamer-mode")`)
            set("color-changer", true)
        }
    })

    window.on("close", () => {
        window.webContents.executeJavaScript(`
            document.querySelector("#movie_player").getCurrentTime().toString().split(".")[0]
        `).then(time => {
            window.webContents.executeJavaScript(`document.querySelector("#movie_player").getVideoData()`).then(data => {
                setLastSongInfo(time, data.list || undefined)
                electron.app.quit()
            })
        })
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

    window.webContents.on("did-start-navigation", (e, url) => {
        this.handleURLChange(window, url)
    })
}

module.exports.addTray = (window) => {
    const tray = new electron.Tray(path.join(__dirname, "..", "..", "icons", "tray.png"))
    const menu = new electron.Menu.buildFromTemplate([
        {
            label: "Quit", click: () => {
                electron.app.quit()
            }
        }
    ])

    tray.on("click", () => {
        window.show()
        window.focus()
    })

    tray.setContextMenu(menu)
    app_tray = tray
}

module.exports.destroyTray = () => {
    app_tray.destroy()
}

module.exports.bypassNetwork = (window) => {
    const oldUserAgent = window.webContents.userAgent;
    const userAgents = {
        windows : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    }

    const sec_ch_ua = `"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"`

    window.webContents.session.webRequest.onBeforeSendHeaders((details, cb) => {
        if (window.webContents.getURL().startsWith('https://accounts.google.com') && details.url.startsWith('https://accounts.google.com')) {
            details.requestHeaders['User-Agent'] = oldUserAgent;
        } else {
            if(windows()) {
                details.requestHeaders['User-Agent'] = userAgents["windows"]
                details.requestHeaders['Sec-Ch-Ua'] = sec_ch_ua
            }
        }

        cb({ requestHeaders: details.requestHeaders });
    });
}