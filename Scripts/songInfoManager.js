const { app, dialog } = require("electron")
const { wipeColorsMusicVideo, changeColors, changeColorsForPrivateSong, wipeColors } = require("./colorChanger")
const { playerDatabase, songInfoDatabase, settingsDatabase, discordDatabase } = require("./databaseManager")
const { updatePresence } = require("./discordManager")
const { log } = require("./logger")
const { setIcons } = require("./playbackIconsManager")

module.exports.setupSongInfo = (window) => {
    let interval

    // Could by any different url and it's not going to work
    if (!window.webContents.getURL().startsWith("https://music.youtube.com/")) return

    if (interval !== undefined) return

    interval = setInterval(() => {
        window.webContents.executeJavaScript(`if(document.querySelector("#player")) { document.querySelector("#player").__data }`).then(videoData => {
            const PlayerData = videoData

            playerDatabase.set("videoMode", PlayerData.videoMode_ || false)
            if (PlayerData.playerState_) {
                playerDatabase.set("state", PlayerData.playerState_)

                if (PlayerData.playerState_ == -1) {
                    if(songInfoDatabase.get("title") !== "") {
                        songInfoDatabase.set("title", "")
                        songInfoDatabase.set("author", "")
                        songInfoDatabase.set("videoId", "")
                        songInfoDatabase.set("length", "")
                        songInfoDatabase.set("private", "")
                        songInfoDatabase.set("videoType", "")
                        songInfoDatabase.set("thumbnail", "")
                        songInfoDatabase.set("progress", "")
                        songInfoDatabase.set("private", "")
                        wipeColors(window)
                        log(`songInfoManager: Clean data because playerState_ is -1`)
                    }
                } // Seems like we have met an error with required login or we are offline

                window.webContents.executeJavaScript(`document.querySelector("#movie_player").getCurrentTime()`).then(currentTime => {
                    if (PlayerData.playerResponse_) {
                        const VideoDetails = PlayerData.playerResponse_.videoDetails

                        if (VideoDetails.videoId !== songInfoDatabase.get("videoId")) {
                            log(`songInfoManager: New song is playing: "${VideoDetails.title}" by ${VideoDetails.author} - https://music.youtube.com/watch?v=${VideoDetails.videoId}/`)
                            if (discordDatabase.get("pluginEnabled") == true) {
                                log(`songInfoManager: Sending updatePresence packet to discordManager with this data:`)
                                console.log(`Title: ${VideoDetails.title}`)
                                console.log(`Author: ${VideoDetails.author}`)
                                console.log(`Video ID: ${VideoDetails.videoId}`)
                                console.log(`Length: ${VideoDetails.lengthSeconds} seconds`)
                                console.log(`Thumbnail: ${VideoDetails.thumbnail.thumbnails[0].url.split("?")[0].split("=")[0]}`)
                                console.log(`Progress: ${currentTime}`)
                                console.log(`Player Status: ${PlayerData.playerState_ || "0"}`)
                            }
                        }

                        songInfoDatabase.set("title", VideoDetails.title)
                        songInfoDatabase.set("author", VideoDetails.author)
                        songInfoDatabase.set("videoId", VideoDetails.videoId)
                        songInfoDatabase.set("length", VideoDetails.lengthSeconds)
                        songInfoDatabase.set("private", VideoDetails.isPrivate || false)
                        songInfoDatabase.set("videoType", VideoDetails.musicVideoType)
                        songInfoDatabase.set("thumbnail", VideoDetails.thumbnail.thumbnails[0].url.split("?")[0].split("=")[0])
                        songInfoDatabase.set("progress", currentTime)

                        if (settingsDatabase.get("SaveLastVideo")) {
                            if (settingsDatabase.get("LastVideoId") !== VideoDetails.videoId) {
                                settingsDatabase.set(`LastVideoId`, VideoDetails.videoId)
                                log(`songInfoManager: Last Video ID: ${VideoDetails.videoId}`)
                                window.webContents.executeJavaScript(`document.querySelector("#movie_player").getVideoData()`).then(data => {
                                    if (settingsDatabase.get("LastVideoList") !== data.list && data.list !== undefined) {
                                        settingsDatabase.set(`LastVideoList`, data.list)
                                        log(`songInfoManager: Last Video Playlist saved: ${data.list}`)
                                    }
                                })
                            }
                        }

                        if (VideoDetails.musicVideoType == "MUSIC_VIDEO_TYPE_ATV") {
                            changeColors(window, false)
                            updatePresence()
                            setIcons(window)
                            return
                        }
                        if (VideoDetails.musicVideoType == "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
                            changeColorsForPrivateSong(window, false)
                            updatePresence()
                            setIcons(window)
                            return
                        }
                        if (VideoDetails.musicVideoType == "MUSIC_VIDEO_TYPE_OMV") {
                            wipeColorsMusicVideo(window, false)
                            updatePresence()
                            setIcons(window)
                            return
                        }
                        if (VideoDetails.musicVideoType == "MUSIC_VIDEO_TYPE_UGC") {
                            wipeColorsMusicVideo(window, false)
                            updatePresence()
                            setIcons(window)
                            return
                        }
                        wipeColorsMusicVideo(window, false)
                        updatePresence()
                        setIcons(window)
                        return
                    }
                })
            }
        }).catch(err => {
            if (err) {
                log(`songInfoManager: Error fetching data: ` + err)
                const fs = require("fs")
                fs.rm(`./Database/SongInfo.json`, (err) => {
                    if (err) return
                })
                fs.rm(`./Database/Player.json`, (err) => {
                    if (err) return
                })
                clearInterval(interval)
                interval = undefined
                if (!window.isVisible()) {
                    window.show()
                }
            }
        })
    }, 1000)
}

module.exports.decideColor = (window, launchedNow) => {
    if (songInfoDatabase.get("musicVideoType") == "MUSIC_VIDEO_TYPE_ATV") {
        changeColors(window, launchedNow)
        return
    }
    if (songInfoDatabase.get("musicVideoType") == "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
        changeColorsForPrivateSong(window, launchedNow)
        return
    }
    if (songInfoDatabase.get("musicVideoType") == "MUSIC_VIDEO_TYPE_OMV") {
        wipeColorsMusicVideo(window, launchedNow)
        return
    }
    if (songInfoDatabase.get("musicVideoType") == "MUSIC_VIDEO_TYPE_UGC") {
        wipeColorsMusicVideo(window, launchedNow)
        return
    }

    if (!window.isVisible()) {
        window.show()
    }
}