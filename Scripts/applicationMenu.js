const { app, Menu, clipboard } = require("electron");
const { wipeColors } = require("./colorChanger");
const { discordDatabase, settingsDatabase } = require("./databaseManager");
const { createConnection } = require("./discordManager");
const { download } = require("./downloadManager");
const { log } = require("./logger");
const { decideColor } = require("./songInfoManager");

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
                                        wipePresence()
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
                        ],
                    },
                    {
                        label: "Tweaks/Mods",
                        type: "submenu",
                        submenu: [
                            {
                                label: "Color Changer",
                                type: "checkbox",
                                checked: settingsDatabase.get("ColorChanger"),
                                click: (item) => {
                                    if(item.checked) {
                                        settingsDatabase.set("ColorChanger", true)
                                        decideColor(window, false)
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
                            },
                            {
                                label: "Hide Audio/Video switcher",
                                type: "checkbox",
                                checked: settingsDatabase.get("HideAudioVideo"),
                                click: (item) => {
                                    if(item.checked) {
                                        settingsDatabase.set("HideAudioVideo", true)
                                        window.webContents.insertCSS(`.av.ytmusic-player-page {display: none !important;}`)
                                        log("applicationMenu: Audio/Video switcher - display: none !important;")
                                    } else {
                                        settingsDatabase.set("HideAudioVideo", false)
                                        window.webContents.insertCSS(`.av.ytmusic-player-page {display: flex !important;}`)
                                        log("applicationMenu: Audio/Video switcher - display: flex !important;")
                                    }
                                }
                            },
                            {
                                label: "Hide Miniplayer",
                                type: "checkbox",
                                checked: settingsDatabase.get("HideMiniplayer"),
                                click: (item) => {
                                    if(item.checked) {
                                        settingsDatabase.set("HideMiniplayer", true)
                                        window.webContents.insertCSS(`ytmusic-player[player-ui-state_=MINIPLAYER] { display: none !important}`)
                                        log("applicationMenu: Miniplayer - display: none !important;")
                                    } else {
                                        settingsDatabase.set("HideMiniplayer", false)
                                        window.webContents.insertCSS(`ytmusic-player[player-ui-state_=MINIPLAYER] { display: revert !important}`)
                                        log("applicationMenu: Miniplayer - display: revert !important;")
                                    }
                                }
                            },
                            {
                                label: "Hide \"Sign In\" button",
                                type: "checkbox",
                                checked: settingsDatabase.get("HideSignIn"),
                                click: (item) => {
                                    if(item.checked) {
                                        settingsDatabase.set("HideSignIn", true)
                                        window.webContents.insertCSS(`.sign-in-link.ytmusic-nav-bar { display: none !important}`)
                                        log("applicationMenu: Sign In button - display: none !important;")
                                    } else {
                                        settingsDatabase.set("HideSignIn", false)
                                        window.webContents.insertCSS(`.sign-in-link.ytmusic-nav-bar { display: revert !important}`)
                                        log("applicationMenu: Sign In button - display: revert !important;")
                                    }
                                }
                            }
                        ]
                    },
                    {
                        label: "Other",
                        type: "submenu",
                        submenu: [
                            {
                                label: "Reload",
                                accelerator: "Ctrl+R",
                                click: () => {
                                    window.webContents.loadURL("https://music.youtube.com/")
                                    log(`applicationMenu: Loading https://music.youtube.com`)
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
                                accelerator: "Ctrl+Shift+I",
                                click: () => {
                                    window.webContents.openDevTools({ mode: "detach" })
                                    log(`applicationMenu: Opened dev tools`)
                                }
                            },
                            {
                                label: "Fullscreen",
                                accelerator: "F11",
                                click: () => {
                                    if (window.isFullScreen()) {
                                        window.setFullScreen(false)
                                        log(`applicationMenu: Fullscreen: false`)
                                    } else {
                                        window.setFullScreen(true)
                                        log(`applicationMenu: Fullscreen: true`)
                                    }
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
                                label: "Download",
				accelerator: "Ctrl+D",
                                click: (item) => {
                                    download(window)
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    )
    log(`applicationMenu: Successfully set`)
    Menu.setApplicationMenu(menu)
}