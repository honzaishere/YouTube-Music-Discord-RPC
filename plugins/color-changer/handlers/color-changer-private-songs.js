const {get, set} = require("../../../scripts/database/PluginManager");
const {getSongInfo} = require("../../../scripts/web/SongInfoManager");

module.exports = () => {
    if (get("color-changer-private-songs") === false) {
        const songInfo = getSongInfo()
        set("color-changer-private-songs", true)
        if (songInfo.videoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
            const {updateColors} = require("../functions/updateColors");
            updateColors()
        }
        return
    }
    if (get("color-changer-private-songs") === true) {
        const songInfo = getSongInfo()
        set("color-changer-private-songs", false)
        if (songInfo.videoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
            const {clearColors} = require("../functions/clearColors")
            clearColors()
        }
    }
}