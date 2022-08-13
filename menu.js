const { app, Menu, clipboard } = require("electron")
const db = require("simpl.db")
const { connect, setActivity, close } = require("./discord")
const plugins = new db.Database({ dataFile: "./plugins.json" })

const moment = require("moment")

async function debug(title, message) {
    console.log(`[${moment().format("DD/MM/YYYY-HH:mm:ss")}] [${title}] ${message}`)
}

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

    const menu = Menu.buildFromTemplate(
        [
            {
                label: "Options",
                submenu: [
                    {
                        label: "Reload Page",
                        click: () => {
                            const { BrowserWindow } = require(".")
                            BrowserWindow.webContents.reload()
                            debug("WebContents", "Reloading" + BrowserWindow.webContents.getURL())
                        }
                    },
                    {
                        label: "Copy URL",
                        click: () => {
                            const { BrowserWindow } = require(".")
                            clipboard.write(BrowserWindow.webContents.getURL())
                            debug("Clipboard", "Wrote to clipboard: " + BrowserWindow.webContents.getURL())
                        }
                    },
                    {
                        label: "Developer Tools",
                        checked: false,
                        type: "checkbox",
                        click: (item) => {
                            if(item.checked) {
                                const { BrowserWindow } = require(".")
                                BrowserWindow.webContents.openDevTools()
                            }
                            else {
                                const { BrowserWindow } = require(".")
                                BrowserWindow.webContents.closeDevTools()
                            }
                        }
                    },
                    {
                        label: "Discord RPC",
                        checked: plugins.get("discord") || false,
                        type: "submenu",
                        submenu: [
                            {
                                label: "Enabled",
                                type: "checkbox",
                                checked: plugins.get("discord") || false,
                                click: (item) => {
                                    if(item.checked) {
                                        plugins.set("discord", true)
                                        connect()
                                    } else {
                                        plugins.set("discord", false)
                                        close()
                                    }
                                }
                            },
                        ],
                    }
                ]
            }
        ]
    );
    Menu.setApplicationMenu(menu);
};