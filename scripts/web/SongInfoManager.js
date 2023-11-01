const {updatePresence} = require("../../plugins/discord-rpc/Plugin");
const {get} = require("../database/PluginManager");
const {setLastSongInfoDB} = require("../database/PluginManager");
const getImageColors = require("get-image-colors");
const chroma = require("chroma-js");
const getPixels = require("get-pixels");

let lastVideoId
let songInfo = {}

module.exports.checkSongInfo = (window, playback) => {
    window.webContents.executeJavaScript("document.querySelector(\"#player\").__data").then(i => {
        const playerInfo = i
        try {
            if (i.playerResponse.videoDetails.videoId === lastVideoId) return
            this.setColors(window, playerInfo.videoMode, playerInfo)
            this.updateFullscreenMetadata(window, playerInfo)

            lastVideoId = i.playerResponse.videoDetails.videoId
        } catch (e) {
            return
        }
    })
}

module.exports.updateColors = (window) => {
    window.webContents.executeJavaScript("document.querySelector(\"#player\").__data").then(i => {
        try {
            if (i.playerResponse.videoDetails === null) return
            this.setColors(window, i.videoMode, i)
        } catch (e) {
            return console.log(e)
        }
    })
}

module.exports.updateFullscreenMetadata = (window, info) => {
    window.webContents.executeJavaScript(`
        var trusted_policy = trustedTypes.createPolicy("myPolicy", {
            createHTML: (string) => {
                return string;
            }
        })
    
        document.querySelector("#fullscreen_img").setAttribute("src", document.querySelector("#song-image > yt-img-shadow > img").src)
        document.querySelector("#song_title_fullscreen").innerHTML = trusted_policy.createHTML("${info.playerResponse.videoDetails.title}")
        document.querySelector("#song_author_fullscreen").innerHTML = trusted_policy.createHTML("${info.playerResponse.videoDetails.author}")
    `)
}

module.exports.resetColors = (window) => {
    window.webContents.insertCSS(`html { --ytmusic-track-color1: black !important; --ytmusic-track-color2: black !important }`)
}

module.exports.updateImage = (window, playerInfo) => {
    let coverURL
    if (playerInfo.playerResponse.videoDetails.musicVideoType === "MUSIC_VIDEO_TYPE_ATV") {
        coverURL = playerInfo.thumbnail.thumbnails[3].url.split("?")[0]
    } else {
        if (playerInfo.playerResponse.videoDetails.musicVideoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
            coverURL = playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[3].url
        } else {
            const thumb = playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[playerInfo.playerResponse.videoDetails.thumbnail.thumbnails.length - 1]
            if (thumb.url.includes("sddefault.jpg")) {
                coverURL = "https://i.ytimg.com/vi/" + playerInfo.playerResponse.videoDetails.videoId + "/sddefault.jpg"
                return
            }
            coverURL = "https://i.ytimg.com/vi/" + playerInfo.playerResponse.videoDetails.videoId + "/hq720.jpg"
        }
    }
}

module.exports.setColors = (window, videoMode, playerInfo) => {
    if (videoMode) {
        if (get("color-changer") === true && get("color-changer-videos") === true) {
            this.changeColors(window, playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[0].url.split("?")[0], false)
        } else {
            this.resetColors(window)
        }
        const videoDetails = playerInfo.playerResponse.videoDetails
        songInfo = {details: videoDetails, videoType: playerInfo.playerResponse.videoDetails.musicVideoType}

        if (get("discord-rpc") === true) {
            updatePresence()
        }
    } else {
        const videoDetails = playerInfo.playerResponse.videoDetails
        songInfo = {details: videoDetails, videoType: playerInfo.playerResponse.videoDetails.musicVideoType}

        if (playerInfo.playerResponse.videoDetails.musicVideoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK" && get("color-changer-private-songs") === true) {
            if (get("color-changer") === true) {
                this.changeColors(window, playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[3].url, false)
            } else {
                this.resetColors(window)
            }

            if (get("discord-rpc") === true) {
                updatePresence()
            }
            return
        }

        if (get("color-changer") === true && get("color-changer-songs") === true) {
            this.changeColors(window, `https://i.ytimg.com/vi/${playerInfo.playerResponse.videoDetails.videoId}/hq720.jpg`, true)
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

module.exports.setLastSongInfo = (time, list) => {
    setLastSongInfoDB(songInfo, time, list)
    console.log(`[SongInfo] Saved last SongInfo: ${songInfo.details.videoId}, ${time}s, ${list}`)
}

module.exports.changePlayState = (window, state) => {
    window.webContents.executeJavaScript("document.querySelector(\"#player\").getPlayer().getCurrentTime()").then(time => {
        if (get("discord-rpc") === true) {
            updatePresence(state, time)
        }
    })
}

module.exports.changeAudioImage = (window) => {
    window.webContents.executeJavaScript(`
        if(document.querySelector("#player").getAttribute("video-mode") === '') {
            document.querySelector("#song-image > yt-img-shadow > img").setAttribute("src", "https://i.ytimg.com/vi/" + document.querySelector("#player").__data.playerResponse.videoDetails.videoId + "/maxresdefault.jpg")
        }
    `)
}

module.exports.changeColors = (window, url, song) => {
    if (song) {
        const getPixels = require("get-pixels")
        getPixels(url, async (err, pixels) => {
            if (err) return window.webContents.insertCSS(`html { --ytmusic-track-color1: black !important; }`)

            const array = []
            array.push(pixels.data[0])
            array.push(pixels.data[1])
            array.push(pixels.data[2])

            const chroma = require("chroma-js")
            const darkerColor = chroma(array[0], array[1], array[2]).darken(0.5).hex()

            window.webContents.insertCSS(`html { --ytmusic-track-color1: rgb(${array[0]}, ${array[1]}, ${array[2]}) !important; --ytmusic-track-color2: ${darkerColor} !important }`)
        })
        return
    }

    const getImageColors = require("get-image-colors")
    getImageColors(url).then(async colors => {
        const chroma = require("chroma-js")
        const c1 = chroma(colors[0]).darken(0.5).hex()
        const c2 = chroma(colors[0]).darken(0.2).hex()
        window.webContents.insertCSS(`html { --ytmusic-track-color1: ${c1} !important; --ytmusic-track-color2: ${c2} !important }`)
    })
}
