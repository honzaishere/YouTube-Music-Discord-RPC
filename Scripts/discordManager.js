const DiscordRPC = require("discord-rpc")
const { songInfoDatabase, playerDatabase, discordDatabase } = require("./databaseManager")
const RPC = new DiscordRPC.Client({ transport: "ipc" })
let ConnectedRPC = null

module.exports.createConnection = () => {
    RPC.connect("922907049170464809").then(() => {
        ConnectedRPC = RPC;

        this.updatePresence()
    })
}

module.exports.updatePresence = () => {
    if(!discordDatabase.get("PluginEnabled") || !discordDatabase.get("PluginEnabled") == true) return
    if(!ConnectedRPC) {
        this.createConnection()
    }
    if(ConnectedRPC) {
        const title = discordDatabase.get("PrivacyMode") ? "Listening to Music" : songInfoDatabase.get("title")
        const author = discordDatabase.get("PrivacyMode") ? undefined : songInfoDatabase.get("author")
        const length = discordDatabase.get("TimeLeft") ? songInfoDatabase.get("length") : undefined
        const progress = discordDatabase.get("TimeLeft") ? songInfoDatabase.get("progress") : undefined
        const thumbnail = discordDatabase.get("PrivacyMode") ? "largebadge" : songInfoDatabase.get("thumbnail")
        const state = discordDatabase.get("PlaybackState") ? playerDatabase.get("state") : undefined
        const videoId = discordDatabase.get("WatchVideoButton") ? songInfoDatabase.get("videoId") : undefined

        if(discordDatabase.get("PluginEnabled") && discordDatabase.get("PluginEnabled") == true) {
            const package = require("../package.json")

            let smallImage
            let smallImageText 
            let videoLink

            const startTime = Date.now() - progress * 1000
            const endTime = startTime + length * 1000

            if(state == 1) {
                smallImage = "play",
                smallImageText = "Playing"
            }
            if(state == 2) {
                smallImage = "pause"
                smallImageText = "Paused"
            }
            if(state == "undefined") {
                smallImage = "none"
                smallImageText = "none"
            }
            if(videoId) {
                videoLink = `https://music.youtube.com/watch?v=${videoId}`
            }
            ConnectedRPC.setActivity(
                {
                    smallImageKey: smallImage,
                    smallImageText: smallImageText,
                    largeImageKey: thumbnail,
                    largeImageText: `@honzawashere | ${package.version}`,
                    type: 4,
                    details: title,
                    state: author,
                    startTimestamp: playerDatabase.get("state") == 2 ? undefined : startTime,
                    endTimestamp: playerDatabase.get("state") == 2 ? undefined : endTime,
                    buttons: videoLink == undefined ? undefined : discordDatabase.get("PrivacyMode") == true ? [
                        {
                            url: "https://github.com/iwillfightfordream/youtube-music-discord-rpc",
                            label: "Download from GitHub"
                        }
                    ] : songInfoDatabase.get("private") ? [
                        {
                            url: "https://github.com/iwillfightfordream/youtube-music-discord-rpc",
                            label: "Download from GitHub"
                        }
                    ] : [
                        {
                            url: videoLink,
                            label: "Listen"
                        },
                        {
                            url: "https://github.com/iwillfightfordream/youtube-music-discord-rpc",
                            label: "Download from GitHub"
                        }
                    ]
                }
            )
        }
    }
}