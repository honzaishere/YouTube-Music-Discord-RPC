const {get, set} = require("../../scripts/database/PluginManager");
module.exports.plugin = {
    name: "Gamer Mode",
    options: [
        {
            label: "Enabled",
            type: "checkbox",
            checked: get("gamer-mode"),
            click: (item) => {
                if(item.checked) {
                    set("gamer-mode", true)
                    const electron = require("electron")
                    electron.dialog.showMessageBox({ title: "YouTube Music", message: "Relaunching of the app is recommended." })
                } else {
                    set("gamer-mode", false)
                }
            }
        },
        {
            label: "What is this?",
            click: (item) => {
                const electron = require("electron")
                electron.dialog.showMessageBox({ title: "YouTube Music", message: "Gamer mode: Disables color changer, hardware acceleration and when you minimize, everything on page gets hidden to free as much of resources in your computer possible, when you return everything gets back. You will still be able to listen to music!" })
            }
        }
    ]
}