const Discord = require("./discord")
const db = require("simpl.db")


setInterval(() => {
    if (!document.URL.includes("https://music.youtube.com/")) return
    checkSongInfo()
}, 1000)

function checkSongInfo() {
    if (document.querySelector("#layout > ytmusic-player-bar")) {
        const title = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > yt-formatted-string").innerHTML
        const author = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)").innerHTML
        const photo = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.thumbnail-image-wrapper.style-scope.ytmusic-player-bar > img").src.split("=")[0]
        const detail = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string").title.split("•")

        const details = `${detail[1]} • ${detail[2]}`

        if (!title || !author || !photo) return

        if (title && author && photo) {
            const progress = document.querySelector("#progress-bar").ariaValueNow
            const fullLength = document.querySelector("#progress-bar").ariaValueMax

            let DiscordDB = new db.Database({ dataFile: "./discord.json" })
            const finalTitle = DiscordDB.get("ShowNameAndAuthor") ? title : "Listening to Music"
            const finalAuthor = DiscordDB.get("ShowNameAndAuthor") ? author : ""
            const finalPhoto = DiscordDB.get("ShowVideoImage") == true ? photo : "largebadge"
            const finalProgress = DiscordDB.get("ShowTimeLeft") == true ? progress : undefined
            const finalLength = DiscordDB.get("ShowTimeLeft") == true ? fullLength : undefined
            const finalDetails = DiscordDB.get("ShowVideoImage") == true ? details : "YouTube Music"

            let player = new db.Database({ dataFile: "./player.json" })
            const playbackState = player.get("State")

            Discord.setActivity(finalTitle, finalAuthor, finalPhoto, finalProgress, finalLength, playbackState, finalDetails)
        }
    }
}