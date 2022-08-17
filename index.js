const electron = require("electron")
const app = electron.app

const path = require("path")
const moment = require("moment")
const title = require("console-title")
const { setApplicationMenu } = require("./menu")
const unhandled = require("electron-unhandled")

const db = require("simpl.db")
const fs = require("fs")
const DiscordDB = new db.Database({ dataFile: "./discord.json" })
const player = new db.Database({ dataFile: "./player.json" })

if(!DiscordDB.get("PluginEnabled")) {
    DiscordDB.set("PluginEnabled", true)
    DiscordDB.set("ShowNameAndAuthor", true)
    DiscordDB.set("ShowVideoImage", true)
    DiscordDB.set("ShowTimeLeft", true)
    DiscordDB.set("ShowPlaybackState", true)
}

unhandled({
	showDialog: false,
    logger: console.log
})

async function debug(title, message) {
    console.log(`[${moment().format("DD/MM/YYYY-HH:mm:ss")}] [${title}] ${message}`)
}
title("YouTube Music: Dev Console")

app.once("ready", () => {
    debug("App", "Ready, creating BrowserWindow")
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
            nodeIntegration: true
        }
    })

    this.BrowserWindow = window
    setApplicationMenu()

    window.webContents.on("enter-html-full-screen", (event) => {
        if(window.isFullScreen()) {
            debug("Window", "Menu Bar has been hidden")
            window.setMenuBarVisibility(false)
        }
    })

    window.webContents.on("leave-html-full-screen", (event) => {
        if(!window.isFullScreen()) {
            debug("Window", "Menu Bar has been shown")
            window.setMenuBarVisibility(true)
        }
    })

    window.webContents.on("media-paused", () => {
        player.set("State", false)
    })

    window.webContents.on("media-started-playing", () => {
        player.set("State", true)
    })

    window.loadURL("https://music.youtube.com/")
    debug("WebContents", "Loading: https://music.youtube.com/")

    window.webContents.on("did-finish-load", () => {
        debug("WebContents", "Loaded: https://music.youtube.com/")
        window.webContents.openDevTools()
        window.show()
    })
    return
})

app.on("window-all-closed", () => {
    fs.rm("./lastSongInfo.json", () => {
        app.quit()
    })
})