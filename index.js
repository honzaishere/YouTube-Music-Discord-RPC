const electron = require("electron")
const app = electron.app

const path = require("path")
const moment = require("moment")
const is = require("electron-is")
const title = require("console-title")
const { setApplicationMenu } = require("./menu")
const unhandled = require("electron-unhandled")
const enhanceWebRequest = require("electron-better-web-request").default;

const db = require("simpl.db")
const fs = require("fs")

fs.readdir("./json", (e) => {
    if (e) fs.mkdir("./json", (err) => {
        if (err) app.quit()
    })
})

const logs = require("./logs")
const { blocker } = require("./ads")
const DiscordDB = new db.Database({ dataFile: "./json/discord.json" })
const config = new db.Database({ dataFile: "./json/app.json" })
const player = new db.Database({ dataFile: "./json/player.json" })

if (!config.get("AlreadyLaunched")) {
    if (config.get("Version") == "2.0.0") return
    config.set("AlreadyLaunched", true)
    logs("Database", "AlreadyLaunched set to: true")
    config.set("StartupLaunch", false)
    logs("Database", "StartupLaunch set to: false")
    config.set("DisableHardwareAcceleration", false)
    logs("Database", "DisableHardwareAcceleration set to: false")
    config.set("DisableAutoplay", false)
    logs("Database", "DisableAutoplay set to: false")
    config.set("ColorChanger", true)
    logs("Database", "ColorChanger set to: true")
    config.set("Version", "1.0.9")
    logs("Database", "Version set to: 1.0.9")
}

if (config.get("DisableHardwareAcceleration") == true) {
    app.disableHardwareAcceleration()
    logs("App", "Disabled hardware acceleration")
}

unhandled({
    showDialog: false,
    logger: console.log
})

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) app.quit();

app.on('second-instance', () => {
    if (!this.BrowserWindow) return;
    if (this.BrowserWindow.isMinimized()) this.BrowserWindow.restore();
    if (!this.BrowserWindow.isVisible()) this.BrowserWindow.show();
    this.BrowserWindow.focus();
});

this.insertCSS
this.executeJavaScript

app.once("ready", async () => {
    fs.rm("./json/songInfo.json", (err) => {
        if (err) return
    })
    fs.rm("./json/player.json", (err) => {
        if (err) return
    })

    logs("App", "Ready, creating BrowserWindow")
    const window = new electron.BrowserWindow({
        width: 1280,
        height: 720,
        minHeight: 720,
        minWidth: 1280,
        show: false,
        title: "YouTube Music",
        icon: "icon.ico",
        roundedCorners: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            autoplayPolicy: config.get("DisableAutoplay") ? "document-user-activation-required" : "no-user-gesture-required"
        },
        backgroundColor: "#0e0e0e"
    })

    function insertCSS(value) {
        window.webContents.insertCSS(value)
        logs(`CSS`, `Applied Custom Style Sheet: ${value}`)
    }

    async function executeJavaScript(value) {
        const callback = await window.webContents.executeJavaScript(value)
        logs(`JS`, `Executed Custom JavaScript: ${value}`)
        return callback
    }

    this.insertCSS = (value) => { insertCSS(value) }
    this.executeJavaScript = (value) => { executeJavaScript(value) }

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
                        description: "YouTube Music App with Discord RPC",
                        appUserModelId: appID
                    }
                );
            }
        }
    }

    app.setLoginItemSettings({
        openAtLogin: config.get("StartupLaunch")
    })

    this.BrowserWindow = window
    setApplicationMenu()
    logs(`App`, "Custom application menu applied")

    window.webContents.on("enter-html-full-screen", (event) => {
        if (window.isFullScreen()) {
            logs("Window", "Menu Bar has been hidden")
            window.setMenuBarVisibility(false)
        }
    })

    window.webContents.on("leave-html-full-screen", (event) => {
        if (!window.isFullScreen()) {
            logs("Window", "Menu Bar has been shown")
            window.setMenuBarVisibility(true)
        }
    })

    window.webContents.on("media-paused", () => {
        player.set("State", false)
        logs("Player", "State set to: false")
    })

    window.webContents.on("media-started-playing", () => {
        player.set("State", true)
        logs("Player", "State set to: true")

        window.webContents.executeJavaScript(`document.querySelector("#player-page").role`).then(r => {
            if(r == null) {
                window.webContents.executeJavaScript(`document.querySelector("#right-controls > tp-yt-paper-icon-button.toggle-player-page-button.style-scope.ytmusic-player-bar").click()`)
                logs(`Player`, "Opened player page")
            }
        })
    })

    window.loadURL("https://music.youtube.com/")
    logs("WebContents", "Loading: https://music.youtube.com/")

    window.webContents.on("did-finish-load", () => {
        window.show()
        logs("Window", "Shown Window")
        removeContentSecurityPolicy()

        // Player Bar modification
        this.insertCSS(`ytmusic-app-layout[player-visible_] > [slot=player-bar], ytmusic-app-layout[player-visible_] #player-bar-background.ytmusic-app-layout {transform: none}`)
        this.insertCSS(`ytmusic-app-layout > [slot=player-bar], #player-bar-background.ytmusic-app-layout {bottom: 0.5% !important;left: 50% !important;width: 90% !important;transform: translate(-50%) !important;border: 2px transparent;border-radius: 5px;}`)
        this.insertCSS(`.middle-controls.ytmusic-player-bar {justify-content:none !important;}`)
        this.insertCSS(`ytmusic-player-bar:hover #progress-bar.ytmusic-player-bar {--paper-slider-knob-color: #fff !important;--paper-slider-knob-start-color: #fff !important;--paper-slider-knob-start-border-color: #fff !important;}`)
        this.insertCSS(`#progress-bar.ytmusic-player-bar {--paper-slider-active-color:#fff !important}`)

        // Change "youtubered" to white
        this.insertCSS(`html {--ytmusic-color-youtubered: #fff !important;--ytmusic-play-button-loading-indicator-color: #fff !important;--ytmusic-setting-item-toggle-active: #fff !important}`)

        // Spinner bar color setting to white
        this.insertCSS(`.spinner-layer.tp-yt-paper-spinner-lite { color: #ffffff !important}`)

        // White logo
        window.webContents.executeJavaScript(`document.querySelector("#left-content > a > picture:nth-child(1) > source:nth-child(1)").srcset = 'https://music.youtube.com/img/white_logo.svg'`).catch(err => { if (err) return })
        window.webContents.executeJavaScript(`document.querySelector("#left-content > a > picture:nth-child(1) > source:nth-child(2)").srcset = 'https://music.youtube.com/img/white_logo.svg'`).catch(err => { if (err) return })
        window.webContents.executeJavaScript(`document.querySelector("#left-content > a > picture:nth-child(1) > img").src = 'https://music.youtube.com/img/white_logo.svg'`).catch(err => { if (err) return })

        // Set "Playback Speed" title to "Playback Speed [Experiment]"
        window.webContents.executeJavaScript('document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer").title = document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer").title + " [Experiment]"')

        // Fix queue songs by forcing them to be draggable and enabled
        this.insertCSS("ytmusic-player-queue:not([is-select-autoplay-item-enabled]) #automix-contents.ytmusic-player-queue {pointer-events: auto !important;}")

        // Button animations
        this.insertCSS("ytmusic-pivot-bar-item-renderer {transition: 0.3s ease;}")
        this.insertCSS("tp-yt-paper-icon-button.ytmusic-search-box, input.ytmusic-search-box, input.ytmusic-search-box::placeholder {transition: 0.3s ease;}")
        this.insertCSS("#placeholder.ytmusic-search-box {transition: 0.3s ease;}")
        this.insertCSS("ytmusic-search-suggestion {transition: 0.3s ease}")
        this.insertCSS("ytmusic-chip-cloud-chip-renderer:not([chip-style=STYLE_PRIMARY]):not([chip-style=STYLE_SECONDARY]):not([chip-style=STYLE_LARGE_TRANSLUCENT_AND_SELECTED_WHITE]):not([is-selected]):not([enable-bauhaus-style]) a.ytmusic-chip-cloud-chip-renderer, ytmusic-chip-cloud-chip-renderer[chip-style=STYLE_DEFAULT]:not([enable-bauhaus-style]) a.ytmusic-chip-cloud-chip-renderer {transition: 0.3s ease}")
        this.insertCSS(".sign-in-link.ytmusic-nav-bar {transition: 0.3s ease !important;}")
        this.insertCSS(".sign-in-link.ytmusic-nav-bar:hover {background:#ffffff80 !important;}")
        this.insertCSS("tp-yt-iron-icon {transition: 0.3s ease !important;}")
        this.insertCSS("tp-yt-iron-icon:hover {fill:white;}")
        this.insertCSS("tp-yt-paper-tab {transition: 0.3s ease}")
        this.insertCSS("tp-yt-paper-tab:hover {color:white !important;}")
        this.insertCSS("tp-yt-paper-iron-icon {transition: 0.3s ease !important;}")
        this.insertCSS("tp-yt-paper-iron-icon:hover {fill:#ffffff80;}")
        this.insertCSS(".badges.ytmusic-responsive-list-item-renderer ytmusic-inline-badge-renderer.ytmusic-responsive-list-item-renderer {width: 0px !important; height: 0px !important; display: none;}")
        this.insertCSS(`document.querySelector("#left-content") {user-select:none;}`)
        this.insertCSS(`document.querySelector("#layout > ytmusic-nav-bar > div.center-content.style-scope.ytmusic-nav-bar > ytmusic-pivot-bar-renderer") {user-select:none;}`)
        this.insertCSS(`ytmusic-pivot-bar-item-renderer.ytmusic-pivot-bar-renderer {user-select:none;}`)

        // Player sidebar modification
        this.insertCSS(`.side-panel.ytmusic-player-page {border-radius:15px;background-color: var(--ytmusic-brand-background-solid);margin-bottom:1% !important}`)
        this.insertCSS(`ytmusic-description-shelf-renderer:not([has-strapline_]) .description.non-expandable.ytmusic-description-shelf-renderer {margin-left:2%;}`)
        this.insertCSS(`.footer.ytmusic-description-shelf-renderer {margin-left:2% !important;display: none;}`)
        this.insertCSS(`.autoplay.ytmusic-tab-renderer {margin-left:4% !important}`)
        this.insertCSS(`ytmusic-player-queue.ytmusic-tab-renderer {margin-left:2%;margin-bottom:1%;}`)
        this.insertCSS(`.duration.ytmusic-player-queue-item {margin-right:2%}`)

        // Hover time disabling
        this.insertCSS(`#hover-time-info.ytmusic-player-bar {display:none !important}`)

        // Make lyrics unselectable so they can't be copied etc...
        this.insertCSS("ytmusic-description-shelf-renderer:not([has-strapline_]) .description.non-expandable.ytmusic-description-shelf-renderer {user-select:none;}")
        setInterval(() => {
            window.webContents.executeJavaScript('document.querySelector("#movie_player").getVideoData()').then(r => {
                const result = r
                player.set("videoId", r.video_id)
                log(`Player`, "videoId set to:" + r.video_id)
            }).catch(err => { return })

            const cfg = new db.Database({ dataFile: "./json/app.json" })
            if (!cfg.get("ColorChanger") == true) return

            window.webContents.executeJavaScript('if(document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)")) { document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)").innerHTML }').then(value => {
                if (value) {
                    colorChanger()
                } else {
                    this.colorsVideoReset()
                }
            }).catch(err => { this.colorsVideoReset() })

            this.colorsChanger = () => {
                colorChanger()
            }

            this.colorsReset = () => {
                logs(`Song Info`, `Now Playing: ${songInfo.get("author")} - ${songInfo.get("title")} [https://music.youtube.com/watch?v=${songInfo.get("videoId")}/]`)
                this.insertCSS(`body {background-color:#030303 !important}`)
                this.insertCSS(`html {--ytmusic-brand-background-solid: var(--ytmusic-color-black1) !important;--ytmusic-general-background-c: var(--ytmusic-color-black4) !important}`)
                this.insertCSS(`ytmusic-tabs.stuck { background-color:#030303 !important;}`)
                this.insertCSS(`.av-toggle.ytmusic-av-toggle {background-color:var(--ytmusic-color-black1) !important}`)
                const play = new db.Database({ dataFile: "./json/player.json" })
                if (play.get("lastSongColorChanged")) {
                    play.delete("lastSongColorChanged")
                    logs(`Player`, "lastSongColorChanged has been removed")
                }
                logs(`CSS`, "Colors resetted")
            }

            this.colorsVideoReset = () => {
                const songInfo = new db.Database({ dataFile: "./json/songInfo.json" })
                if (songInfo.get("videoId") == undefined) return
                const play = new db.Database({ dataFile: "./json/player.json" })
                if (play.get("lastSongColorChanged") == songInfo.get("videoId")) return
                logs(`Song Info`, `Now Playing: ${songInfo.get("author")} - ${songInfo.get("title")} [https://music.youtube.com/watch?v=${songInfo.get("videoId")}/]`)
                this.insertCSS(`body {background-color:#030303 !important}`)
                this.insertCSS(`html {--ytmusic-brand-background-solid: var(--ytmusic-color-black1) !important;--ytmusic-general-background-c: var(--ytmusic-color-black4) !important}`)
                this.insertCSS(`ytmusic-tabs.stuck { background-color:#030303 !important;}`)
                this.insertCSS(`.av-toggle.ytmusic-av-toggle {background-color:(--ytmusic-color-black4) !important}`)
                play.set("lastSongColorChanged", songInfo.get("videoId"))
                logs(`CSS`, "Colors resetted")
                logs(`Player`, "lastSongColorChanged set to:" + songInfo.get("videoId"))
            }

            function colorChanger() {
                const songInfo = new db.Database({ dataFile: "./json/songInfo.json" })
                if (songInfo.get("videoId") == undefined) return
                const play = new db.Database({ dataFile: "./json/player.json" })
                if (play.get("lastSongColorChanged") == songInfo.get("videoId")) return
                if (songInfo.get("videoId") == window.webContents.getURL) return
                if (play.get("lastSongColorChanged") == window.webContents.getURL()) return

                const getPixels = require("get-pixels")

                logs(`CSS`, `Downloading: https://img.youtube.com/vi/${songInfo.get("videoId")}/maxresdefault.jpg`)
                getPixels(`https://img.youtube.com/vi/${songInfo.get("videoId")}/maxresdefault.jpg`, (err, pixels) => {
                    const array = []
                    array.push(pixels.data[0])
                    array.push(pixels.data[1])
                    array.push(pixels.data[2])

                    const chroma = require("chroma-js")
                    const darkerColor = chroma(array[0], array[1], array[2]).darken(0.5).hex()
                    const darkestColor = chroma(array[0], array[1], array[2]).darken(0.8).hex()

                    const { insertCSS } = require(".")

                    console.log()
                    logs(`Song Info`, `Now Playing: ${songInfo.get("author")} - ${songInfo.get("title")} [https://music.youtube.com/watch?v=${songInfo.get("videoId")}/]`)
                    logs(`CSS`, `Main Color: ${chroma(array[0], array[1], array[2]).hex()}`)
                    logs(`CSS`, `Dark Color: ${darkerColor}`)
                    insertCSS(`body {background-color:${darkerColor} !important}`)
                    insertCSS(`html {--ytmusic-brand-background-solid:rgb(${array[0]}, ${array[1]}, ${array[2]}) !important;--ytmusic-general-background-c:${darkerColor} !important}`)
                    insertCSS(`ytmusic-tabs.stuck { background-color:${darkerColor} !important;}`)
                    insertCSS(`.av-toggle.ytmusic-av-toggle {background-color:${darkerColor} !important}`)
                    logs(`CSS`, `Player recolored`)
                    console.log()
                })
                play.set("lastSongColorChanged", songInfo.get("videoId"))
                logs("Player", `lastSongColorChanged set to: ${songInfo.get("videoId")}`)
            }
        }, 200)
        //blocker(window.webContents.session)
    })
    return
})

function removeContentSecurityPolicy(
    session = electron.session.defaultSession
) {
    logs("Session", "Removed content security policy")
    // Allows defining multiple "onHeadersReceived" listeners
    // by enhancing the session.
    // Some plugins (e.g. adblocker) also define a "onHeadersReceived" listener
    enhanceWebRequest(session);

    // Custom listener to tweak the content security policy
    session.webRequest.onHeadersReceived(function (details, callback) {
        if (
            !details.responseHeaders["content-security-policy-report-only"] &&
            !details.responseHeaders["content-security-policy"]
        )
            return callback({ cancel: false });
        delete details.responseHeaders["content-security-policy-report-only"];
        delete details.responseHeaders["content-security-policy"];
        callback({ cancel: false, responseHeaders: details.responseHeaders });
    });

    // When multiple listeners are defined, apply them all
    session.webRequest.setResolver("onHeadersReceived", (listeners) => {
        const response = listeners.reduce(
            async (accumulator, listener) => {
                if (accumulator.cancel) {
                    return accumulator;
                }

                const result = await listener.apply();
                return { ...accumulator, ...result };
            },
            { cancel: false }
        );

        return response;
    });
}