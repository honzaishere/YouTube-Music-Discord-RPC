const Discord = require("./discord")
const db = require("simpl.db")
const last = new db.Database({ dataFile: "./lastSongInfo.json" })

setInterval(() => {
    if(!document.URL.includes("https://music.youtube.com/")) return
    checkSongInfo()
}, 1000)

function checkSongInfo() {
    const title = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > yt-formatted-string").innerHTML
    const author = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)").innerHTML
    const photo = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.thumbnail-image-wrapper.style-scope.ytmusic-player-bar > img").src.split("=")[0]

    const last_video_title = last.get("title") || null
    const last_video_author = last.get("author") || null
    const last_video_photo = last.get("photo") || null
 
    if (title && author && photo) {
        if(last_video_title || last_video_author || last_video_photo) {
            if(title !== last_video_title && author !== last_video_author && photo !== last_video_photo) {
                const progress = document.querySelector("#progress-bar").ariaValueNow
                const fullLength = document.querySelector("#progress-bar").ariaValueMax
            
                let DiscordDB = new db.Database({ dataFile: "./discord.json" })
                let player = new db.Database({ dataFile: "./player.json" })
                console.log(DiscordDB.get("PluginEnabled"))
                if (DiscordDB.get("PluginEnabled")) {
                    const finalTitle = DiscordDB.get("ShowNameAndAuthor") ? title : "Listening to Music"
                    const finalAuthor = DiscordDB.get("ShowNameAndAuthor") ? author : ""
                    const finalPhoto = DiscordDB.get("ShowVideoImage") == true ? photo : "largebadge"
                    const finalProgress = DiscordDB.get("ShowTimeLeft") == true ? progress : undefined
                    const finalLength = DiscordDB.get("ShowTimeLeft") == true ? fullLength : undefined
                    const playbackState = DiscordDB.get("ShowPlaybackState") == true ? player.get("State") : "badge"
                    const realTitle = title
                    const realAuthor = author
                    const realPhoto = photo

                    Discord.setActivity(finalTitle, finalAuthor, finalPhoto, finalProgress, finalLength, realTitle, realAuthor, realPhoto, playbackState)
                }
            }
        } else {
            const progress = document.querySelector("#progress-bar").ariaValueNow
            const fullLength = document.querySelector("#progress-bar").ariaValueMax
            
            let DiscordDB = new db.Database({ dataFile: "./discord.json" })
            let player = new db.Database({ dataFile: "./player.json" })
            if (DiscordDB.get("PluginEnabled")) {
                const finalTitle = DiscordDB.get("ShowNameAndAuthor") ? title : "Listening to Music"
                const finalAuthor = DiscordDB.get("ShowNameAndAuthor") ? author : ""
                const finalPhoto = DiscordDB.get("ShowVideoImage") == true ? photo : "largebadge"
                const finalProgress = DiscordDB.get("ShowTimeLeft") == true ? progress : undefined
                const finalLength = DiscordDB.get("ShowTimeLeft") == true ? fullLength : undefined
                const playbackState = DiscordDB.get("ShowPlaybackState") == true ? player.get("State") : "badge"
                const realTitle = title
                const realAuthor = author
                const realPhoto = photo

                Discord.setActivity(finalTitle, finalAuthor, finalPhoto, finalProgress, finalLength, realTitle, realAuthor, realPhoto, playbackState)
            }
        }
    }
}