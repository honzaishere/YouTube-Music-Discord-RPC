const Discord = require("./discord")
const db = require("simpl.db")

//require("@cliqz/adblocker-electron-preload/dist/preload.cjs");

const songInfo = new db.Database({ dataFile: "./json/songInfo.json" })

setInterval(() => {
    if (!document.URL.includes("https://music.youtube.com/")) return
    checkSongInfo()
    otherTweaks()
}, 1000)

function checkSongInfo() {
    if (document.querySelector("#layout > ytmusic-player-bar")) {
        try {
            const title = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > yt-formatted-string").innerHTML.replace("&amp;", "&").replace("&", "&") || null
            const author = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a").innerHTML.replace("&amp;", "&").replace("&", "&") || null
            const photo = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.thumbnail-image-wrapper.style-scope.ytmusic-player-bar > img").src.split("=")[0] || null
            const detail = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string").title.split("•") || null

            songInfo.set("title", title)
            songInfo.set("author", author)

            const details = `${detail[1]} • ${detail[2]}`

            if (title && author && photo) {
                const progress = document.querySelector("#progress-bar").ariaValueNow
                const fullLength = document.querySelector("#progress-bar").ariaValueMax

                const url = document.URL.split("/")
                if (url[3] !== "") {
                    const word = url[3].split("?")[0]
                    let DiscordDB = new db.Database({ dataFile: "./json/discord.json" })
                    if (DiscordDB.get("ShowSearchStatus") == true) {
                        if (word == "search") {
                            searching()
                        } else {
                            let DiscordDB = new db.Database({ dataFile: "./json/discord.json" })
                            const finalTitle = DiscordDB.get("ShowNameAndAuthor") ? title.replace("&amp;", "&") : "Listening to Music"
                            const finalAuthor = DiscordDB.get("ShowNameAndAuthor") ? author.replace("&amp;", "&") : ""
                            const finalPhoto = DiscordDB.get("ShowVideoImage") == true ? photo : "largebadge"
                            const finalProgress = DiscordDB.get("ShowTimeLeft") ? progress : undefined
                            const finalLength = DiscordDB.get("ShowTimeLeft") ? fullLength : undefined
                            const finalDetails = DiscordDB.get("ShowVideoImage") == true ? details : "YouTube Music"
                            const sendVideoId = DiscordDB.get("ShowWatchVideoButton") == true ? true : false || false

                            let loopState = "none"

                            if (DiscordDB.get("ShowRepeatText")) {
                                const repeatButton = document.querySelector("#right-controls > div > tp-yt-paper-icon-button.repeat.style-scope.ytmusic-player-bar").title

                                let loopState

                                if (repeatButton == "Repeat off") {
                                    loopState = "off"
                                }
                                if (repeatButton == "Repeat all") {
                                    loopState = "all"
                                }
                                if (repeatButton == "Repeat one") {
                                    loopState = "one"
                                }
                            }

                            let player = new db.Database({ dataFile: "./json/player.json" })
                            const playbackState = player.get("State")

                            songInfo.set("title", title)
                            songInfo.set("author", author)
                            songInfo.set("photo", photo)
                            songInfo.set("progress", progress)
                            songInfo.set("length", length)
                            songInfo.set("details", details)
                            songInfo.set("videoId", player.get("videoId"))

                            document.title = songInfo.get("title") + " — " + songInfo.get("author") + " - YouTube Music"

                            if (DiscordDB.get("PluginEnabled") == true) {
                                Discord.setActivity(finalTitle, finalAuthor, finalPhoto, finalProgress, finalLength, playbackState, finalDetails, sendVideoId, loopState)
                            }
                        }
                    } else {
                        let DiscordDB = new db.Database({ dataFile: "./json/discord.json" })
                        const finalTitle = DiscordDB.get("ShowNameAndAuthor") ? title.replace("&amp;", "&") : "Listening to Music"
                        const finalAuthor = DiscordDB.get("ShowNameAndAuthor") ? author.replace("&amp;", "&") : ""
                        const finalPhoto = DiscordDB.get("ShowVideoImage") == true ? photo : "largebadge"
                        const finalProgress = DiscordDB.get("ShowTimeLeft") ? progress : undefined
                        const finalLength = DiscordDB.get("ShowTimeLeft") ? fullLength : undefined
                        const finalDetails = DiscordDB.get("ShowVideoImage") == true ? details : "YouTube Music"
                        const sendVideoId = DiscordDB.get("ShowWatchVideoButton") == true ? true : false || false

                        let loopState = "none"

                        if (DiscordDB.get("ShowRepeatText")) {
                            const repeatButton = document.querySelector("#right-controls > div > tp-yt-paper-icon-button.repeat.style-scope.ytmusic-player-bar").title

                            let loopState

                            if (repeatButton == "Repeat off") {
                                loopState = "off"
                            }
                            if (repeatButton == "Repeat all") {
                                loopState = "all"
                            }
                            if (repeatButton == "Repeat one") {
                                loopState = "one"
                            }
                        }

                        let player = new db.Database({ dataFile: "./json/player.json" })
                        const playbackState = player.get("State")

                        songInfo.set("title", title)
                        songInfo.set("author", author)
                        songInfo.set("photo", photo)
                        songInfo.set("progress", progress)
                        songInfo.set("length", length)
                        songInfo.set("details", details)
                        songInfo.set("videoId", player.get("videoId"))

                        if (DiscordDB.get("PluginEnabled") == true) {
                            Discord.setActivity(finalTitle, finalAuthor, finalPhoto, finalProgress, finalLength, playbackState, finalDetails, sendVideoId, loopState)
                        }
                    }
                }
            }
        } catch (e) {
            const url = document.URL.split("/")
            if (url[3] !== "") {
                const word = url[3].split("?")[0]
                if (word == "search") {
                    searching()
                }
            }
        }
    } else {
        console.log("test")
    }
}

function searching() {
    let DiscordDB = new db.Database({ dataFile: "./json/discord.json" })
    if (DiscordDB.get("ShowSearchStatus") == true) {
        const query = document.querySelector("#suggestion-cell-0x0 > span").innerHTML

        if (!query) return
        if (DiscordDB.get("PluginEnabled") == true) {
            Discord.setSearchActivity(`\"${query}\"`)
        }
    }
}

function otherTweaks() {
    // Removing "Select favorite artists to improve recommendations"
    if (document.querySelector("#contents > ytmusic-tastebuilder-shelf-renderer")) {
        document.querySelector("#contents > ytmusic-tastebuilder-shelf-renderer").remove()
    }

    // Removing "START RADIO FROM A SONG"
    if (document.querySelector("#content-group > yt-formatted-string")) {
        document.querySelector("#content-group > yt-formatted-string").remove()
    }

    // Showing "Playback Speed" button
    if (document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer")) {
        document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer").hidden = false
    }
}