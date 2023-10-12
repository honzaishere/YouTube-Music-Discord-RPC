const {updatePresence} = require("../../plugins/discord-rpc/Plugin");
const {get} = require("../database/PluginManager");
const Vibrant = require("node-vibrant");
const chroma = require("chroma-js");
const getImageColors = require("get-image-colors");
const getPixels = require("get-pixels");
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

            let r
            let g
            let b

            function isColorTooWhiteOrBlack(color, min = 40, threshold = 150) {
                let red = color[0]
                let green = color[1]
                let blue = color[2]

                const chroma = require("chroma-js")

                if(red <= threshold && red >= min && green <= threshold && green >= min && blue <= threshold && blue >= min) {
                    r = red
                    g = green
                    b = blue
                    return false;
                }

                if(red <= min || green <= min || blue <= min) {
                    const darker = chroma(red, green, blue).brighten(1).rgb()
                    r = darker[0]
                    g = darker[1]
                    b = darker[2]


                    if(r <= threshold && r >= min && g <= threshold && g >= min && b <= threshold && b >= min) return false;
                    return true;
                }
                if(red >= threshold || green >= threshold || blue >= threshold) {
                    const darker = chroma(red, green, blue).darken(1).rgb()
                    r = darker[0]
                    g = darker[1]
                    b = darker[2]

                    if(r <= threshold && r >= min && g <= threshold && g >= min && b <= threshold && b >= min) return false;
                    return true;
                }
            }


            const getImageColors = require("get-image-colors")
            getImageColors(playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[0].url.split("?")[0]).then(async colors => {
                const chroma = require("chroma-js")
                const isTooLightOrBlack = isColorTooWhiteOrBlack(chroma(colors[0]).rgb())
                console.log(`${isTooLightOrBlack === true ? "[ColorChanger] Using old method" : "[ColorChanger] Using new method"} | ${isTooLightOrBlack}`)
                if (isTooLightOrBlack) {
                    const Vibrant = require('node-vibrant')

                    Vibrant.from(playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[0].url.split("?")[0]).getPalette((err, palette) => {
                        const chroma = require("chroma-js")
                        const darkerVibrant = chroma(palette.DarkVibrant.hex).darken(0.5).hex()
                        window.webContents.insertCSS(`html { --ytmusic-track-color1: ${palette.DarkVibrant.hex} !important; --ytmusic-track-color2: ${darkerVibrant} !important }`)
                    })
                    return
                }
                if(!isTooLightOrBlack) {
                    const darkerColor = chroma(r, g, b).darken(0.5).hex()
                    window.webContents.insertCSS(`html { --ytmusic-track-color1: rgb(${r},${g},${b}) !important; --ytmusic-track-color2: ${darkerColor} !important }`)
                }
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
                let r
                let g
                let b

                function isColorTooWhiteOrBlack(color, min = 40, threshold = 150) {
                    let red = color[0]
                    let green = color[1]
                    let blue = color[2]

                    const chroma = require("chroma-js")

                    if(red <= threshold && red >= min && green <= threshold && green >= min && blue <= threshold && blue >= min) {
                        r = red
                        g = green
                        b = blue
                        return false;
                    }

                    if(red <= min || green <= min || blue <= min) {
                        const darker = chroma(red, green, blue).brighten(1).rgb()
                        r = darker[0]
                        g = darker[1]
                        b = darker[2]


                        if(r <= threshold && r >= min && g <= threshold && g >= min && b <= threshold && b >= min) return false;
                        return true;
                    }
                    if(red >= threshold || green >= threshold || blue >= threshold) {
                        const darker = chroma(red, green, blue).darken(1).rgb()
                        r = darker[0]
                        g = darker[1]
                        b = darker[2]

                        if(r <= threshold && r >= min && g <= threshold && g >= min && b <= threshold && b >= min) return false;
                        return true;
                    }
                }


                const getImageColors = require("get-image-colors")
                getImageColors(playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[3].url).then(async colors => {
                    const chroma = require("chroma-js")
                    const isTooLightOrBlack = isColorTooWhiteOrBlack(chroma(colors[0]).rgb())
                    console.log(`${isTooLightOrBlack === true ? "[ColorChanger] Using old method" : "[ColorChanger] Using new method"} | ${isTooLightOrBlack}`)
                    if (isTooLightOrBlack) {
                        const Vibrant = require('node-vibrant')

                        Vibrant.from(playerInfo.playerResponse.videoDetails.thumbnail.thumbnails[3].url).getPalette((err, palette) => {
                            const chroma = require("chroma-js")
                            const darkerVibrant = chroma(palette.DarkVibrant.hex).darken(0.5).hex()
                            window.webContents.insertCSS(`html { --ytmusic-track-color1: ${palette.DarkVibrant.hex} !important; --ytmusic-track-color2: ${darkerVibrant} !important }`)
                        })
                        return
                    }
                    if(!isTooLightOrBlack) {
                        const darkerColor = chroma(r, g, b).darken(0.5).hex()
                        window.webContents.insertCSS(`html { --ytmusic-track-color1: rgb(${r},${g},${b}) !important; --ytmusic-track-color2: ${darkerColor} !important }`)
                    }
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
            let r
            let g
            let b

            function isColorTooWhiteOrBlack(color, min = 40, threshold = 150) {
                let red = color[0]
                let green = color[1]
                let blue = color[2]

                const chroma = require("chroma-js")

                if(red <= threshold && red >= min && green <= threshold && green >= min && blue <= threshold && blue >= min) {
                    r = red
                    g = green
                    b = blue
                    return false;
                }

                if(red <= min || green <= min || blue <= min) {
                    const darker = chroma(red, green, blue).brighten(1).rgb()
                    r = darker[0]
                    g = darker[1]
                    b = darker[2]


                    if(r <= threshold && r >= min && g <= threshold && g >= min && b <= threshold && b >= min) return false;
                    return true;
                }
                if(red >= threshold || green >= threshold || blue >= threshold) {
                    const darker = chroma(red, green, blue).darken(1).rgb()
                    r = darker[0]
                    g = darker[1]
                    b = darker[2]

                    if(r <= threshold && r >= min && g <= threshold && g >= min && b <= threshold && b >= min) return false;
                    return true;
                }
            }


            const getImageColors = require("get-image-colors")
            getImageColors(playerInfo.thumbnail.thumbnails[0].url.split("?")[0]).then(async colors => {
                const chroma = require("chroma-js")
                const isTooLightOrBlack = isColorTooWhiteOrBlack(chroma(colors[0]).rgb())
                console.log(`${isTooLightOrBlack === true ? "[ColorChanger] Using old method" : "[ColorChanger] Using new method"} | ${isTooLightOrBlack}`)
                if (isTooLightOrBlack) {
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
                    return
                }
                if(!isTooLightOrBlack) {
                    const darkerColor = chroma(r, g, b).darken(0.5).hex()
                    window.webContents.insertCSS(`html { --ytmusic-track-color1: rgb(${r},${g},${b}) !important; --ytmusic-track-color2: ${darkerColor} !important }`)
                }
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
        if (get("discord-rpc") === true) {
            updatePresence(state, time)
        }
    })
}
