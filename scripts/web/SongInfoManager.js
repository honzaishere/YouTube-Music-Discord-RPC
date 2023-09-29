const getPixels = require("get-pixels");
const {updatePresence} = require("../../plugins/discord-rpc/Plugin");
const chroma = require("chroma-js");
const {get} = require("../database/PluginManager");
let songInfo = {}
let lastCol = ""

module.exports.checkSongInfo = (window, playback) => {
    window.webContents.executeJavaScript("document.querySelector(\"#player\").__data").then(i => {
        const playerInfo = i
        console.log(`[SongInfo] Video changed: https://music.youtube.com/watch?v=${playerInfo.playerResponse.videoDetails.videoId}`)
        try {
            this.setColors(window, playerInfo.videoMode, playerInfo)
        } catch (e) {
            return
        }
    })
}

module.exports.updateColors = (window) => {
    this.setColors(window, songInfo.videoMode, songInfo)
}

module.exports.resetColors = (window) => {
    window.webContents.insertCSS(`html { --ytmusic-track-color1: black !important; --ytmusic-track-color2: black !important }`)
}

module.exports.setColors = (window, videoMode, playerInfo) => {
    if (videoMode) {
        if (get("color-changer") === true) {
            window.webContents.insertCSS(`html { --ytmusic-track-color1: black !important; --ytmusic-track-color2: black !important }`)
        }
        const videoDetails = playerInfo.playerResponse.videoDetails
        songInfo = {details: videoDetails, videoType: playerInfo.playerResponse.videoDetails.musicVideoType}

        if (get("discord-rpc") === true) {
            updatePresence()
        }
    } else {
        if (playerInfo.playerResponse.videoDetails.musicVideoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
            const videoDetails = playerInfo.playerResponse.videoDetails
            songInfo = {details: videoDetails, videoType: playerInfo.playerResponse.videoDetails.musicVideoType}

            if (get("color-changer") === true) {
                const getPixels = require("get-pixels")
                getPixels(playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[3].url, async (err, pixels) => {
                    if (err) return window.webContents.insertCSS(`html { --ytmusic-track-color1: black !important; }`)

                    const array = []
                    array.push(pixels.data[0])
                    array.push(pixels.data[1])
                    array.push(pixels.data[2])

                    const chroma = require("chroma-js")
                    const darkerColor = chroma(array[0], array[1], array[2]).darken(0.5).hex()

                    window.webContents.insertCSS(`html { --ytmusic-track-color1: rgb(${array[0]}, ${array[1]}, ${array[2]}) !important; --ytmusic-track-color2: ${darkerColor} !important }`)
                })
            }

            if (get("discord-rpc") === true) {
                updatePresence()
            }
            return
        }

        const videoDetails = playerInfo.playerResponse.videoDetails
        songInfo = {details: videoDetails}

        if (get("color-changer") === true) {
            const getPixels = require("get-pixels")
            getPixels(`https://i.ytimg.com/vi/${songInfo.details.videoId}/hq720.jpg`, async (err, pixels) => {
                if (err) return window.webContents.insertCSS(`html { --ytmusic-track-color1: black !important; }`)

                const array = []
                array.push(pixels.data[0])
                array.push(pixels.data[1])
                array.push(pixels.data[2])

                const chroma = require("chroma-js")
                const darkerColor = chroma(array[0], array[1], array[2]).darken(0.5).hex()

                window.webContents.insertCSS(`html { --ytmusic-track-color1: rgb(${array[0]}, ${array[1]}, ${array[2]}) !important; --ytmusic-track-color2: ${darkerColor} !important }`)
            })
        }

        if (get("discord-rpc") === true) {
            updatePresence()
        }
    }
}

module.exports.getSongInfo = () => {
    return songInfo
}

module.exports.changePlayState = (window, state) => {
    window.webContents.executeJavaScript("document.querySelector(\"#player\").getPlayer().getCurrentTime()").then(time => {
        updatePresence(state, time)
    })
}
