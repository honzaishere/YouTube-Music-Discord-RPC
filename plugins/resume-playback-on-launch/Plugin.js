const {get, set} = require("../../scripts/database/PluginManager")

module.exports.plugin = {
    name: "Save Last Song",
}

module.exports.handle = () => {
    if(get("resume-playback-on-launch") === false) {
        set("resume-playback-on-launch", true)
    } else {
        set("resume-playback-on-launch", false)
    }
}