const {get, set} = require("../../scripts/database/PluginManager")
const {updateColors, resetColors, getSongInfo} = require("../../scripts/web/SongInfoManager");

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
                    set("color-changer", true)
                } else {
                    this.disable()
                    set("color-changer", false)
                }
            }
        },
        {
            label: "Change color for Songs",
            type: "checkbox",
            checked: get("color-changer-songs"),
            click: (item) => {
                if (item.checked) {
                    const i = getSongInfo()
                    set("color-changer-songs", true)
                    if(i.videoType === "MUSIC_VIDEO_TYPE_ATV") {
                        this.turnOn("song")
                    }
                } else {
                    const i = getSongInfo()
                    set("color-changer-songs", false)
                    if(i.videoType === "MUSIC_VIDEO_TYPE_ATV") {
                        this.disable()
                    }
                }
            }
        },
        {
            label: "Change color for videos (EXPERIMENT)",
            type: "checkbox",
            checked: get("color-changer-videos"),
            click: (item) => {
                if (item.checked) {
                    const i = getSongInfo()
                    set("color-changer-videos", true)
                    if(i.videoType !== "MUSIC_VIDEO_TYPE_ATV") {
                        if(i.videoType !== "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
                            this.turnOn("video")
                        }
                    }
                } else {
                    const i = getSongInfo()
                    set("color-changer-videos", false)
                    if(i.videoType !== "MUSIC_VIDEO_TYPE_ATV") {
                        if(i.videoType !== "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
                            this.disable()
                        }
                    }
                }
            }
        },
        {
            label: "Change color for private Songs",
            type: "checkbox",
            checked: get("color-changer-private-songs"),
            click: (item) => {
                if (item.checked) {
                    const i = getSongInfo()
                    set("color-changer-private-songs", true)
                    if(i.videoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
                        this.turnOn("private")
                    }
                } else {
                    const i = getSongInfo()
                    set("color-changer-private-songs", false)
                    if(i.videoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
                        this.disable()
                    }
                }
            }
        }
    ]
}

module.exports.preload = () => { return }
module.exports.enable = () => { return }
module.exports.turnOn = (type) => { const { browserWindow } = require("../../Index"); updateColors(browserWindow) }
module.exports.disable = () => { const { browserWindow } = require("../../Index"); resetColors(browserWindow) }