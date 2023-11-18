const {get, set} = require("../../../scripts/database/PluginManager");

module.exports = () => {
    if (get("resume-playback-on-launch") === false) {
        set("resume-playback-on-launch", true)
    }
    if (get("resume-playback-on-launch") === true) {
        set("resume-playback-on-launch", false)
    }
}