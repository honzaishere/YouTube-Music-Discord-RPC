const DiscordRPC = require("discord-rpc")
const { songInfoDatabase, playerDatabase, discordDatabase } = require("./databaseManager")
const { log } = require("./logger")
const RPC = new DiscordRPC.Client({ transport: "ipc" })
let ConnectedRPC = null

module.exports.createConnection = () => {
    if (ConnectedRPC !== null) return this.updatePresence()
    RPC.connect("922907049170464809")
        .then(u => {
            ConnectedRPC = RPC;
            log(`discordManager: Created connection with ${u.user.username}#${u.user.discriminator}`)
            if (discordDatabase.get("pluginEnabled") == true) {
                log(`songInfoManager: Sending updatePresence packet to discordManager with this data:`)
                console.log(`Title: ${VideoDetails.title}`)
                console.log(`Author: ${VideoDetails.author}`)
                console.log(`Video ID: ${VideoDetails.videoId}`)
                console.log(`Length: ${VideoDetails.lengthSeconds} seconds`)
                console.log(`Thumbnail: ${VideoDetails.thumbnail.thumbnails[0].url.split("?")[0].split("=")[0]}`)
                console.log(`Progress: ${currentTime}`)
                console.log(`Player Status: ${PlayerData.playerState_ || "0"}`)
                this.updatePresence()
            }
        })
        .catch(e => {
            if (e) return log(`discordManager: Connection was not created`)
        })
}

module.exports.updatePresence = () => {
    if (discordDatabase.get("PluginEnabled") == false) return
    if (ConnectedRPC) {
        const title = discordDatabase.get("PrivacyMode") ? "Listening to Music" : songInfoDatabase.get("title")
        const author = discordDatabase.get("PrivacyMode") ? undefined : songInfoDatabase.get("author")
        const length = discordDatabase.get("TimeLeft") ? songInfoDatabase.get("length") : undefined
        const progress = discordDatabase.get("TimeLeft") ? songInfoDatabase.get("progress") : undefined
        const thumbnail = discordDatabase.get("PrivacyMode") ? "largebadge" : songInfoDatabase.get("thumbnail")
        const state = discordDatabase.get("PlaybackState") ? playerDatabase.get("state") : undefined
        const videoId = discordDatabase.get("WatchVideoButton") ? songInfoDatabase.get("videoId") : undefined

        if (discordDatabase.get("PluginEnabled") == true) {
            const package = require("../package.json")

            let smallImage = "none"
            let smallImageText = "none"
            let videoLink

            const startTime = Date.now() - progress * 1000
            const endTime = startTime + length * 1000

            if (state == 0 || state == undefined) {
                ConnectedRPC.setActivity(
                    {
                        smallImageKey: "idle",
                        smallImageText: "Idle",
                        largeImageKey: "largebadge",
                        largeImageText: `@honzawashere | ${package.version}`,
                        type: 4,
                        state: "Launched right now",
                        buttons: [
                            {
                                url: "https://github.com/iwillfightfordream/youtube-music-discord-rpc",
                                label: "Download from GitHub"
                            }
                        ]
                    }
                ).catch(e => {
                    if (e) return
                })
                return
            }
            if (state == 1) {
                smallImage = "play",
                    smallImageText = "Playing"
            }
            if (state == 2) {
                smallImage = "pause"
                smallImageText = "Paused"
            }
            if (state == 3) {
                ConnectedRPC.setActivity(
                    {
                        smallImageKey: "badge",
                        smallImageText: "Buffering...",
                        largeImageKey: "largebadge",
                        largeImageText: `@honzawashere | ${package.version}`,
                        type: 4,
                        state: "Buffering...",
                        buttons: [
                            {
                                url: "https://github.com/iwillfightfordream/youtube-music-discord-rpc",
                                label: "Download from GitHub"
                            }
                        ]
                    }
                )
                    .catch(e => {
                        if (e) return
                    })
                return
            }
            if (videoId) {
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
                .catch(e => {
                    if (e) return
                })
        }
    }
}

module.exports.wipePresence = () => {
    if (ConnectedRPC) {
        ConnectedRPC.setActivity(
            {
                smallImageKey: "badge",
                largeImageKey: "largebadge",
                largeImageText: `@honzawashere | ${package.version}`,
                type: 4,
                state: "Unknown",
                buttons: [
                    {
                        url: "https://github.com/iwillfightfordream/youtube-music-discord-rpc",
                        label: "Download from GitHub"
                    }
                ]
            }
        ).catch(e => {
            if (e) return ConnectedRPC = null; log(`discordManager: Wiped presence`)
        })
            .then(() => {
                log(`discordManager: Wiped presence`)
            })
        ConnectedRPC = null
        return
    }
}