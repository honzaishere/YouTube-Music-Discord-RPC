const {get} = require("../../../../database/PluginManager");

module.exports = (window, videoMode, playerInfo) => {
    const {changeColors, resetColors} = require("../ColorManager");

    // If videoMode is true
    if (videoMode) {
        // If color-changer is enabled for videos and enabled globally
        if (get("color-changer") === true && get("color-changer-videos") === true) {
            // Change colors
            changeColors(window, playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[0].url.split("?")[0])
        }

        // If color-changer is not enabled for videos or not enabled globally
        if (get("color-changer") !== true || get("color-changer-videos") !== true) {
            // Reset colors
            resetColors(window)
        }
    }

    // If videoMode is false
    if (!videoMode) {
        // If musicVideoType is "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK", color-changer is enabled for private songs and is enabled globally
        if (playerInfo.playerResponse.videoDetails.musicVideoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK" && get("color-changer-private-songs") === true && get("color-changer") === true) {
            // Change colors
            changeColors(window, playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[3].url)
        } else {
            // Reset colors
            resetColors(window)
        }

        // If color-changer is enabled globally and is enabled for songs
        if (get("color-changer") === true && get("color-changer-songs") === true) {
            // Change colors
            changeColors(window, playerInfo.thumbnail.thumbnails[2].url)
        } else {
            // Reset colors
            resetColors(window)
        }
    }
}