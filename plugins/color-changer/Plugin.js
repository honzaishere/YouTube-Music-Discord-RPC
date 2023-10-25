const {get, set} = require("../../scripts/database/PluginManager")
const {updateColors, resetColors, getSongInfo} = require("../../scripts/web/SongInfoManager");

module.exports.plugin = {
    name: "Color Changer"
}

module.exports.handle = () => {
    if (get("color-changer") === false) {
        set("color-changer", true)
        this.turnOn()
        return
    }
    if (get("color-changer") === true) {
        set("color-changer", false)
        this.disable()
    }
}

module.exports.handle_songs = () => {
    if (get("color-changer-songs") === false) {
        const i = getSongInfo()
        set("color-changer-songs", true)
        if (i.videoType === "MUSIC_VIDEO_TYPE_ATV") {
            this.turnOn()
        }
        return
    }
    if (get("color-changer-songs") === true) {
        const i = getSongInfo()
        set("color-changer-songs", false)
        if (i.videoType === "MUSIC_VIDEO_TYPE_ATV") {
            this.disable()
        }
    }
}

module.exports.handle_videos = () => {
    if (get("color-changer-videos") === false) {
        const i = getSongInfo()
        set("color-changer-videos", true)
        if (i.videoType !== "MUSIC_VIDEO_TYPE_ATV") {
            if (i.videoType !== "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
                this.turnOn()
            }
        }
        return
    }
    if (get("color-changer-videos") === true) {
        const i = getSongInfo()
        set("color-changer-videos", false)
        if (i.videoType !== "MUSIC_VIDEO_TYPE_ATV") {
            if (i.videoType !== "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
                this.disable()
            }
        }
    }
}

module.exports.handle_private = () => {
    if (get("color-changer-private-songs") === false) {
        const i = getSongInfo()
        set("color-changer-private-songs", true)
        if (i.videoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
            this.turnOn()
        }
        return
    }
    if (get("color-changer-private-songs") === true) {
        const i = getSongInfo()
        set("color-changer-private-songs", false)
        if (i.videoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
            this.disable()
        }
    }
}

module.exports.preload = () => {
    return
}
module.exports.enable = () => {
    return
}
module.exports.turnOn = () => {
    const {browserWindow} = require("../../Index");
    updateColors(browserWindow)
}
module.exports.disable = () => {
    const {browserWindow} = require("../../Index");
    resetColors(browserWindow)
}