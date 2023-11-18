const {updatePresence} = require("../../plugins/discord-rpc/Plugin");
const {get} = require("../database/PluginManager");
const {setLastSongInfoDB} = require("../database/PluginManager");

// Define lastVideoId and songInfo which we will use to store data
let lastVideoId
let songInfo = {}

module.exports.checkSongInfo = (window) => {
    const {updateFullscreenMetadata} = require("./Managers/SongInfo/FullscreenManager");
    const {setColors} = require("./Managers/SongInfo/ColorManager");

    // Get the player's data
    window.webContents.executeJavaScript("document.querySelector(\"#player\").__data").then(currentPlayerInfo => {
        try {
            // If videoId has same value as lastVideoId, ignore it
            if (currentPlayerInfo.playerResponse.videoDetails.videoId === lastVideoId) {
                return
            }

            // If videoId is different, update the colors and fullscreen metadata
            setColors(window, currentPlayerInfo.videoMode, currentPlayerInfo)
            updateFullscreenMetadata(window, currentPlayerInfo)

            // Finally set the new songInfo
            this.setSongInfo(currentPlayerInfo)
        } catch (error) {
            // This happens only when playerData is undefined
            if(error) {
                lastVideoId = ""
            }
        }
    })
}

module.exports.setSongInfo = (currentPlayerInfo) => {
    songInfo = {details: currentPlayerInfo.playerResponse.videoDetails, videoType: currentPlayerInfo.playerResponse.videoDetails.musicVideoType}
    lastVideoId = currentPlayerInfo.playerResponse.videoDetails.videoId

    this.updateDiscordPresence()
}

module.exports.getSongInfo = () => {
    // Return songInfo
    return songInfo
}

module.exports.updateDiscordPresence = () => {
    if (get("discord-rpc") === true) {
        updatePresence()
        return
    }
}

module.exports.setLastSongInfo = (elapsedTime, currentPlaylistId) => {
    // When details include videoId
    if(songInfo.details.videoId) {
        // Set the SongInfo to DB
        setLastSongInfoDB(songInfo, elapsedTime, currentPlaylistId)
    }
}

module.exports.changePlayState = (window, playbackState) => {
    // Get current elapsed time from video
    window.webContents.executeJavaScript("document.querySelector(\"#player\").getPlayer().getCurrentTime()").then(elapsedTime => {
        // When Discord-RPC is enabled
        if (get("discord-rpc") === true) {
            // Update the presence
            updatePresence(playbackState, elapsedTime)
        }
        return
    })
}