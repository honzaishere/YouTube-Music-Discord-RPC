const { app, Menu, clipboard } = require("electron")
const db = require("simpl.db")
const { connect, close } = require("./discord")

const moment = require("moment");
const logs = require("./logs");

module.exports.setApplicationMenu = () => {
    if (process.platform === "darwin") {
        const name = app.name;
        menuTemplate.unshift({
            label: name,
            submenu: [
                { role: "about" },
                { type: "separator" },
                { role: "hide" },
                { role: "hideothers" },
                { role: "unhide" },
                { type: "separator" },
                {
                    label: "Select All",
                    accelerator: "CmdOrCtrl+A",
                    selector: "selectAll:",
                },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { type: "separator" },
                { role: "minimize" },
                { role: "close" },
                { role: "quit" },
            ],
        });
    }

    const DiscordDB = new db.Database({ dataFile: "./json/discord.json" })
    const config = new db.Database({ dataFile: "./json/app.json" })

    const menu = Menu.buildFromTemplate(
        [
            {
                label: "Options",
                submenu: [
                    {
                        label: "Discord",
                        type: "submenu",
                        submenu: [
                            {
                                label: "Plugin Enabled",
                                type: "checkbox",
                                checked: DiscordDB.get("PluginEnabled"),
                                click: (item) => {
                                    if(item.checked) {
                                        DiscordDB.set("PluginEnabled", true)
                                        logs("Database", "PluginEnabled set to: true")
                                        connect()
                                        logs("Discord", "connect() triggered")
                                    } else {
                                        DiscordDB.set("PluginEnabled", false)
                                        logs("Database", "PluginEnabled set to: false")
                                        close()
                                        logs("Discord", "close() triggered")
                                    }
                                }
                            },
                            {
                                label: "Show Video Name, Author and Image",
                                type: "checkbox",
                                checked: DiscordDB.get("ShowNameAndAuthor"),
                                click: (item) => {
                                    if(item.checked) {
                                        DiscordDB.set("ShowNameAndAuthor", true)
                                        logs("Database", "ShowNameAndAuthor set to: true")
                                    } else {
                                        DiscordDB.set("ShowNameAndAuthor", false)
                                        logs("Database", "ShowNameAndAuthor set to: false")
                                    }
                                }
                            },
                            {
                                label: "Show Video Image",
                                type: "checkbox",
                                checked: DiscordDB.get("ShowVideoImage"),
                                click: (item) => {
                                    if(item.checked) {
                                        DiscordDB.set("ShowVideoImage", true)
                                        logs("Database", "ShowVideoImage set to: true")
                                    } else {
                                        DiscordDB.set("ShowVideoImage", false)
                                        logs("Database", "ShowVideoImage set to: false")
                                    }
                                }
                            },
                            {
                                label: "Show Time Left",
                                type: "checkbox",
                                checked: DiscordDB.get("ShowTimeLeft"),
                                click: (item) => {
                                    if(item.checked) {
                                        DiscordDB.set("ShowTimeLeft", true)
                                        logs("Database", "ShowTimeLeft set to: true")
                                    } else {
                                        DiscordDB.set("ShowTimeLeft", false)
                                        logs("Database", "ShowTimeLeft set to: false")
                                    }
                                }
                            },
                            {
                                label: "Show Playback State",
                                type: "checkbox",
                                checked: DiscordDB.get("ShowPlaybackState"),
                                click: (item) => {
                                    if(item.checked) {
                                        DiscordDB.set("ShowPlaybackState", true)
                                        logs("Database", "ShowPlaybackState set to: true")
                                    } else {
                                        DiscordDB.set("ShowPlaybackState", false)
                                        logs("Database", "ShowPlaybackState set to: false")
                                    }
                                }
                            },
                            {
                                label: "Show \"Watch Video\" Button",
                                type: "checkbox",
                                checked: DiscordDB.get("ShowWatchVideoButton"),
                                click: (item) => {
                                    if(item.checked) {
                                        DiscordDB.set("ShowWatchVideoButton", true)
                                        logs("Database", "ShowWatchVideoButton set to: true")
                                    } else {
                                        DiscordDB.set("ShowWatchVideoButton", false)
                                        logs("Database", "ShowWatchVideoButton set to: false")
                                    }
                                }
                            },
                            {
                                label: "Show Searching Status",
                                type: "checkbox",
                                checked: DiscordDB.get("ShowSearchStatus"),
                                click: (item) => {
                                    if(item.checked) {
                                        DiscordDB.set("ShowSearchStatus", true)
                                        logs("Database", "ShowSearchStatus set to: true")
                                    } else {
                                        DiscordDB.set("ShowSearchStatus", false)
                                        logs("Database", "ShowSearchStatus set to: false")
                                    }
                                }
                            }
                        ],
                    },
                    {
                        label: "Other",
                        type: "submenu",
                        submenu: [
                            {
                                label: "Reload",
                                click: () => {
                                    const { BrowserWindow, colorsChanger } = require(".")
                                    BrowserWindow.webContents.reload()
                                    logs("WebContents", "Reloading page")
                                }
                            },
                            {
                                label: "Copy URL",
                                click: () => {
                                    const { BrowserWindow } = require(".")
                                    clipboard.writeText(BrowserWindow.webContents.getURL())
                                    logs("Clipboard", "Written: " + BrowserWindow.webContents.getURL())
                                }
                            },
                            {
                                label: "Dev Tools",
                                click: () => {
                                    const { BrowserWindow } = require(".")
                                    BrowserWindow.webContents.openDevTools()
                                    logs("Clipboard", "Opened devTools")
                                }
                            },
                            {
                                label: "Disable hardware acceleration (After relaunching)",
                                type: "checkbox",
                                checked: config.get("DisableHardwareAcceleration"),
                                click: (item) => {
                                    if(item.checked) {
                                        config.set("DisableHardwareAcceleration", true)
                                        logs("Database", "DisableHardwareAcceleration set to: true")
                                    } else {
                                        config.set("DisableHardwareAcceleration", false)
                                        logs("Database", "DisableHardwareAcceleration set to: false")
                                    }
                                }
                            },
                            {
                                label: "Start at Login",
                                type: "checkbox",
                                checked: config.get("StartupLaunch"),
                                click: (item) => {
                                    if(item.checked) {
                                        config.set("StartupLaunch", true)
                                        logs("Database", "StartupLaunch set to: true")
                                    } else {
                                        config.set("StartupLaunch", false)
                                        logs("Database", "StartupLaunch set to: false")
                                    }
                                }
                            },
                            {
                                label: "Disable Autoplay (After reloading)",
                                type: "checkbox",
                                checked: config.get("DisableAutoplay"),
                                click: (item) => {
                                    if(item.checked) {
                                        config.set("DisableAutoplay", true)
                                        logs("Database", "DisableAutoplay set to: true")
                                    } else {
                                        config.set("DisableAutoplay", false)
                                        logs("Database", "DisableAutoplay set to: false")
                                    }
                                }
                            },
                            {
                                label: "Color Changer",
                                type: "checkbox",
                                checked: config.get("ColorChanger"),
                                click: (item) => {
                                    if(item.checked) {
                                        config.set("ColorChanger", true)
                                        logs("Database", "ColorChanger set to: true")
                                        const { colorsChanger } = require(".") 
                                        colorsChanger()
                                    } else {
                                        config.set("ColorChanger", false)
                                        logs("Database", "ColorChanger set to: false")
                                        const { colorsReset } = require(".") 
                                        colorsReset()
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    );
    Menu.setApplicationMenu(menu);
};