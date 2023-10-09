const {updatePresence} = require("../../plugins/discord-rpc/Plugin");
const {get} = require("../database/PluginManager");
let songInfo = {}
let lastSongInfo = {}

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
    this.setColors(window, lastSongInfo.videoMode, lastSongInfo)
}

module.exports.resetColors = (window) => {
    window.webContents.insertCSS(`html { --ytmusic-track-color1: black !important; --ytmusic-track-color2: black !important }`)
}

module.exports.setColors = (window, videoMode, playerInfo) => {
    if (videoMode) {
        if (get("color-changer") === true && get("color-changer-videos") === true) {
            const Vibrant = require('node-vibrant')

            Vibrant.from(playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[0].url.split("?")[0]).getPalette((err, palette) => {
                const chroma = require("chroma-js")
                const darkerVibrant = chroma(palette.DarkVibrant.hex).darken(0.5).hex()
                window.webContents.insertCSS(`html { --ytmusic-track-color1: ${palette.DarkVibrant.hex} !important; --ytmusic-track-color2: ${darkerVibrant} !important }`)
            })
        } else {
            this.resetColors(window)
        }
        const videoDetails = playerInfo.playerResponse.videoDetails
        songInfo = {details: videoDetails, videoType: playerInfo.playerResponse.videoDetails.musicVideoType}
        lastSongInfo = playerInfo

        if (get("discord-rpc") === true) {
            updatePresence()
        }
    } else {
        if (playerInfo.playerResponse.videoDetails.musicVideoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK" && get("color-changer-private-songs") === true) {
            const videoDetails = playerInfo.playerResponse.videoDetails
            songInfo = {details: videoDetails, videoType: playerInfo.playerResponse.videoDetails.musicVideoType}

            if (get("color-changer") === true) {
                const Vibrant = require('node-vibrant')

                Vibrant.from(playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[3].url).getPalette((err, palette) => {
                    const chroma = require("chroma-js")
                    const darkerVibrant = chroma(palette.DarkVibrant.hex).darken(0.5).hex()
                    window.webContents.insertCSS(`html { --ytmusic-track-color1: ${palette.DarkVibrant.hex} !important; --ytmusic-track-color2: ${darkerVibrant} !important }`)
                })
            } else {
                this.resetColors(window)
            }

            if (get("discord-rpc") === true) {
                updatePresence()
            }
            return
        }

        const videoDetails = playerInfo.playerResponse.videoDetails
        songInfo = {details: videoDetails}
        lastSongInfo = playerInfo

        if (get("color-changer") === true && get("color-changer-songs") === true) {
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
        } else {
            this.resetColors(window)
        }

        if (get("discord-rpc") === true) {
            updatePresence()
        }
    }
}

module.exports.getSongInfo = () => {
    return songInfo
}

module.exports.getLastSongInfo = () => {
    return lastSongInfo
}

module.exports.changePlayState = (window, state) => {
    window.webContents.executeJavaScript("document.querySelector(\"#player\").getPlayer().getCurrentTime()").then(time => {
        if(get("discord-rpc") === true) {
            updatePresence(state, time)
        }
    })
}
