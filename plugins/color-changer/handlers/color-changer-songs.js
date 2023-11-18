const {get, set} = require("../../../scripts/database/PluginManager");
const {getSongInfo} = require("../../../scripts/web/SongInfoManager");

module.exports = () => {
    if (get("color-changer-songs") === false) {
        const songInfo = getSongInfo()
        set("color-changer-songs", true)
        if (songInfo.videoType === "MUSIC_VIDEO_TYPE_ATV") {
            const {updateColors} = require("../functions/updateColors");
            updateColors()
        }
        return
    }
    if (get("color-changer-songs") === true) {
        const songInfo = getSongInfo()
        set("color-changer-songs", false)
        if (songInfo.videoType === "MUSIC_VIDEO_TYPE_ATV") {
            const {clearColors} = require("../functions/clearColors");
            clearColors()
        }
    }
}