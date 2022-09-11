const { wipeColorsMusicVideo, changeColors, changeColorsForPrivateSong } = require("./colorChanger")
const { playerDatabase, songInfoDatabase, settingsDatabase } = require("./databaseManager")
const { updatePresence } = require("./discordManager")

module.exports.setupSongInfo = (window) => {
    setInterval(() => {
        window.webContents.executeJavaScript(`document.querySelector("#player").__data`).then(videoData => {
            const PlayerData = videoData

            playerDatabase.set("videoMode", PlayerData.videoMode_)
            if (PlayerData.playerState_) {
                playerDatabase.set("state", PlayerData.playerState_)

                window.webContents.executeJavaScript(`document.querySelector("#movie_player").getCurrentTime()`).then(currentTime => {
                    if (PlayerData.playerResponse_) {
                        const VideoDetails = PlayerData.playerResponse_.videoDetails

                        songInfoDatabase.set("title", VideoDetails.title)
                        songInfoDatabase.set("author", VideoDetails.author)
                        songInfoDatabase.set("videoId", VideoDetails.videoId)
                        songInfoDatabase.set("length", VideoDetails.lengthSeconds)
                        songInfoDatabase.set("private", VideoDetails.isPrivate || false)
                        songInfoDatabase.set("videoType", VideoDetails.musicVideoType)
                        songInfoDatabase.set("thumbnail", VideoDetails.thumbnail.thumbnails[0].url.split("?")[0])
                        songInfoDatabase.set("progress", currentTime)

                        if (settingsDatabase.get("SaveLastVideo")) {
                            settingsDatabase.set(`LastVideoId`, VideoDetails.videoId)
                        }

                        if (VideoDetails.musicVideoType == "MUSIC_VIDEO_TYPE_ATV") {
                            changeColors(window)
                            updatePresence()
                            return
                        }
                        if (VideoDetails.musicVideoType == "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
                            changeColorsForPrivateSong(window)
                            updatePresence()
                            return
                        }
                        wipeColorsMusicVideo(window)
                        updatePresence()
                        return
                    }
                })
            }
        })
    }, 1000)
}