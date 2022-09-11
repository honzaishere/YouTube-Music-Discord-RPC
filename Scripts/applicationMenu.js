const { app, Menu, clipboard } = require("electron");
const { changeColors, wipeColors } = require("./colorChanger");
const { discordDatabase, settingsDatabase } = require("./databaseManager");
const { createConnection } = require("./discordManager");

module.exports.setApplicationMenu = (window) => {
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
                                checked: discordDatabase.get("PluginEnabled"),
                                click: (item) => {
                                    if(item.checked) {
                                        discordDatabase.set("PluginEnabled", true)
                                        createConnection()
                                    } else {
                                        discordDatabase.set("PluginEnabled", false)
                                    }
                                }
                            },
                            {
                                label: "Privacy Mode",
                                type: "checkbox",
                                checked: discordDatabase.get("PrivacyMode"),
                                click: (item) => {
                                    if(item.checked) {
                                        discordDatabase.set("PrivacyMode", true)
                                    } else {
                                        discordDatabase.set("PrivacyMode", false)
                                    }
                                }
                            },
                            {
                                label: "Watch Video Button",
                                type: "checkbox",
                                checked: discordDatabase.get("WatchVideoButton"),
                                click: (item) => {
                                    if(item.checked) {
                                        discordDatabase.set("WatchVideoButton", true)
                                    } else {
                                        discordDatabase.set("WatchVideoButton", false)
                                    }
                                }
                            },
                            {
                                label: "Time Left",
                                type: "checkbox",
                                checked:discordDatabase.get("TimeLeft"),
                                click: (item) => {
                                    if(item.checked) {
                                        discordDatabase.set("TimeLeft", true)
                                    } else {
                                        discordDatabase.set("TimeLeft", false)
                                    }
                                }
                            },
                            {
                                label: "Playback State",
                                type: "checkbox",
                                checked: discordDatabase.get("PlaybackState"),
                                click: (item) => {
                                    if(item.checked) {
                                        discordDatabase.set("PlaybackState", true)
                                    } else {
                                        discordDatabase.set("PlaybackState", false)
                                    }
                                }
                            },
                            {
                                label: "Searching Status",
                                type: "checkbox",
                                checked: discordDatabase.get("Searching"),
                                click: (item) => {
                                    if(item.checked) {
                                        discordDatabase.set("Searching", true)
                                    } else {
                                        discordDatabase.set("Searching", false)
                                    }
                                }
                            },
                            {
                                label: "Idling Status",
                                type: "checkbox",
                                checked: discordDatabase.get("Idling"),
                                click: (item) => {
                                    if(item.checked) {
                                        discordDatabase.set("Idling", true)
                                    } else {
                                        discordDatabase.set("Idling", false)
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
                                    window.webContents.reload()
                                }
                            },
                            {
                                label: "Copy URL",
                                click: () => {
                                    clipboard.writeText(window.webContents.getURL())
                                }
                            },
                            {
                                label: "Dev Tools",
                                click: () => {
                                    window.webContents.openDevTools()
                                }
                            },
                            {
                                label: "Disable hardware acceleration (After relaunching)",
                                type: "checkbox",
                                checked: settingsDatabase.get("DisableHardwareAcceleration"),
                                click: (item) => {
                                    if(item.checked) {
                                        settingsDatabase.set("DisableHardwareAcceleration", true)
                                    } else {
                                        settingsDatabase.set("DisableHardwareAcceleration", false)
                                    }
                                }
                            },
                            {
                                label: "Start at Login",
                                type: "checkbox",
                                checked: settingsDatabase.get("StartupLaunch"),
                                click: (item) => {
                                    if(item.checked) {
                                        settingsDatabase.set("StartupLaunch", true)
                                    } else {
                                        settingsDatabase.set("StartupLaunch", false)
                                    }
                                }
                            },
                            {
                                label: "Disable Autoplay (After reloading)",
                                type: "checkbox",
                                checked: settingsDatabase.get("DisableAutoplay"),
                                click: (item) => {
                                    if(item.checked) {
                                        settingsDatabase.set("DisableAutoplay", true)
                                    } else {
                                        settingsDatabase.set("DisableAutoplay", false)
                                    }
                                }
                            },
                            {
                                label: "Color Changer",
                                type: "checkbox",
                                checked: settingsDatabase.get("ColorChanger"),
                                click: (item) => {
                                    if(item.checked) {
                                        settingsDatabase.set("ColorChanger", true)
                                        changeColors(window)
                                    } else {
                                        settingsDatabase.set("ColorChanger", false)
                                        wipeColors(window)
                                    }
                                }
                            },
                            {
                                label: "Save Last Song",
                                type: "checkbox",
                                checked: settingsDatabase.get("SaveLastVideo"),
                                click: (item) => {
                                    if(item.checked) {
                                        settingsDatabase.set("SaveLastVideo", true)
                                    } else {
                                        settingsDatabase.set("SaveLastVideo", false)
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