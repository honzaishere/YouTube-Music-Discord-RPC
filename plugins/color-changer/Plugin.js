const {get, set} = require("../../scripts/database/PluginManager")
const {updateColors, resetColors} = require("../../scripts/web/SongInfoManager");

module.exports.plugin = {
    name: "Color Changer",
    options: [
        {
            label: "Enabled",
            type: "checkbox",
            checked: get("color-changer"),
            click: (item) => {
                if (item.checked) {
                    this.turnOn()
                } else {
                    this.disable()
                }
            }
        }
    ]
}

module.exports.preload = () => { return }
module.exports.enable = () => { return }
module.exports.turnOn = () => { const { browserWindow } = require("../../Index"); set("color-changer", true); updateColors(browserWindow) }
module.exports.disable = () => { const { browserWindow } = require("../../Index"); set("color-changer", false); resetColors(browserWindow) }