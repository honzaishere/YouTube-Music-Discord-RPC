const { app, Menu, clipboard } = require("electron")
const db = require("simpl.db")
const { connect, close } = require("./discord")

const moment = require("moment")

async function debug(title, message) {
    console.log(`[${moment().format("DD/MM/YYYY-HH:mm:ss")}] [${title}] ${message}`)
}

module.exports.setApplicationMenu = () => {
    const DiscordDB = new db.Database({ dataFile: "./discord.json" })
    const config = new db.Database({ dataFile: "./app.json" })
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
                                        connect()
                                    } else {
                                        DiscordDB.set("PluginEnabled", false)
                                        close()
                                    }
                                }
                            },
                            {
                                label: "Show Video Name, Author & Image",
                                type: "checkbox",
                                checked: DiscordDB.get("ShowNameAndAuthor"),
                                click: (item) => {
                                    if(item.checked) {
                                        DiscordDB.set("ShowNameAndAuthor", true)
                                    } else {
                                        DiscordDB.set("ShowNameAndAuthor", false)
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
                                    } else {
                                        DiscordDB.set("ShowVideoImage", false)
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
                                    } else {
                                        DiscordDB.set("ShowTimeLeft", false)
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
                                    } else {
                                        DiscordDB.set("ShowPlaybackState", false)
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
                                    const { BrowserWindow } = require(".")
                                    BrowserWindow.webContents.reload()
                                }
                            },
                            {
                                label: "Copy URL",
                                click: () => {
                                    const { BrowserWindow } = require(".")
                                    clipboard.writeText(BrowserWindow.webContents.getURL())
                                }
                            },
                            {
                                label: "Dev Tools",
                                click: () => {
                                    const { BrowserWindow } = require(".")
                                    BrowserWindow.webContents.openDevTools()
                                }
                            },
                            {
                                label: "Disable hardware acceleration (After relaunching)",
                                type: "checkbox",
                                checked: config.get("DisableHardwareAcceleration"),
                                click: (item) => {
                                    if(item.checked) {
                                        config.set("DisableHardwareAcceleration", true)
                                    } else {
                                        config.set("DisableHardwareAcceleration", false)
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
                                    } else {
                                        config.set("StartupLaunch", false)
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