const {get, set} = require("../../scripts/database/PluginManager")

module.exports.plugin = {
    name: "Save Last Song",
    options: [
        {
            label: "Enabled",
            type: "checkbox",
            checked: get("resume-playback-on-launch"),
            click: (item) => {
                if (item.checked) {
                    set("resume-playback-on-launch", true)
                } else {
                    set("resume-playback-on-launch", false)
                }
            }
        }
    ]
}