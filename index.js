const electron = require("electron")
const app = electron.app

const path = require("path")
const moment = require("moment")
const is = require("electron-is")
const title = require("console-title")
const { setApplicationMenu } = require("./menu")
const unhandled = require("electron-unhandled")

const db = require("simpl.db")
const fs = require("fs")
const DiscordDB = new db.Database({ dataFile: "./discord.json" })
const config = new db.Database({ dataFile: "./app.json" })
const player = new db.Database({ dataFile: "./player.json" })

if (!DiscordDB.get("PluginEnabled")) {
    DiscordDB.set("PluginEnabled", true)
    DiscordDB.set("ShowNameAndAuthor", true)
    DiscordDB.set("ShowVideoImage", true)
    DiscordDB.set("ShowTimeLeft", true)
    DiscordDB.set("ShowPlaybackState", true)
}

if(!config.get("StartupLaunch") == false || !config.get("DisableHardwareAcceleration") == false) {
    if(!config.get("StartupLaunch") == true || config.get("DisableHardwareAcceleration") == true) {
        config.set("StartupLaunch", false)
        config.set("DisableHardwareAcceleration", false)
    }
}

if(config.get("DisableHardwareAcceleration") == false) {
    app.disableHardwareAcceleration()
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

    window.webContents.on("enter-html-full-screen", (event) => {
        if (window.isFullScreen()) {
            debug("Window", "Menu Bar has been hidden")
            window.setMenuBarVisibility(false)
        }
    })

    window.webContents.on("leave-html-full-screen", (event) => {
        if (!window.isFullScreen()) {
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
        window.show()
    })
    return
})

app.on("window-all-closed", () => {
    app.quit()
})