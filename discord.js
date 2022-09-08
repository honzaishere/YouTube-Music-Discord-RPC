let rpcClient = null
const { dev } = require("electron-is")

module.exports.connect = () => {
    const rpc = require("discord-rpc")
    const client = new rpc.Client({ transport: 'ipc' })

    client.login({ clientId: "922907049170464809" })

    client.on("ready", () => {
        rpcClient = client
        return
    })

    client.on("disconnected", () => {
        rpcClient = null
        return
    })
}

module.exports.close = () => {
    if (rpcClient == null) return
    if (rpcClient !== null) {
        rpcClient.setActivity(null)
        rpcClient = null
    }
}

module.exports.setActivity = async (title, author, photo, progress, fullLength, playbackState, finalDetails, videoId) => {
    if (rpcClient == null) {
        if (rpcClient !== null) return
        this.connect()
    }

    const state = {
        true: "Playing",
        false: "Paused",
        badge: "YouTube Music",
        none: "no"
    }

    const photos = {
        badge: "badge",
        true: "play",
        false: "pause",
        none: "no"
    }

    if (photo == "largebadge") {
        if (playbackState == "badge") {
            playbackState = "none"
        }
    }

    const db = require("simpl.db")

    let videoLink
    let player = new db.Database({ dataFile: "./json/player.json" })

    if (player.get("videoId") !== "") {
        if (videoId = true) {
            videoLink = "https://music.youtube.com/watch?v=" + player.get("videoId")
        }
    }

    const startTime = Date.now() - progress * 1000
    const endTime = startTime + fullLength * 1000

    if (playbackState == false) {
        if (videoLink) {
            if (author == "") {
                rpcClient.setActivity(
                    {
                        smallImageText: state[playbackState],
                        smallImageKey: photos[playbackState],
                        largeImageText: finalDetails,
                        type: 4,
                        details: title,
                        largeImageKey: photo,
                        buttons: [
                            {
                                url: videoLink,
                                label: "Play Video"
                            },
                            {
                                url: "https://github.com/iwillfightfordream/youtube-music-discord-rpc",
                                label: "Download from GitHub"
                            }
                        ]
                    }
                )
                return
            }
            rpcClient.setActivity(
                {
                    smallImageText: state[playbackState],
                    smallImageKey: photos[playbackState],
                    largeImageText: finalDetails,
                    type: 4,
                    details: title,
                    state: author,
                    largeImageKey: photo,
                    buttons: [
                        {
                            url: videoLink,
                            label: "Play Video"
                        },
                        {
                            url: "https://github.com/iwillfightfordream/youtube-music-discord-rpc",
                            label: "Download from GitHub"
                        }
                    ]
                }
            )
            return
        }
        if (author == "") {
            rpcClient.setActivity(
                {
                    smallImageText: state[playbackState],
                    smallImageKey: photos[playbackState],
                    largeImageText: finalDetails,
                    type: 4,
                    details: title,
                    largeImageKey: photo,
                }
            )
            return
        }
        rpcClient.setActivity(
            {
                smallImageText: state[playbackState],
                smallImageKey: photos[playbackState],
                largeImageText: finalDetails,
                type: 4,
                details: title,
                state: author,
                largeImageKey: photo
            }
        )
        return
    }

    // Playing
    if (videoLink) {
        if (author == "") {
            rpcClient.setActivity(
                {
                    smallImageText: state[playbackState],
                    smallImageKey: photos[playbackState],
                    largeImageText: finalDetails,
                    type: 4,
                    details: title,
                    startTimestamp: startTime,
                    endTimestamp: endTime,
                    largeImageKey: photo,
                    buttons: [
                        {
                            url: videoLink,
                            label: "Play Video"
                        },
                        {
                            url: "https://github.com/iwillfightfordream/youtube-music-discord-rpc",
                            label: "Download from GitHub"
                        }
                    ]
                }
            )
            return
        }
        rpcClient.setActivity(
            {
                smallImageText: state[playbackState],
                smallImageKey: photos[playbackState],
                largeImageText: finalDetails,
                type: 4,
                details: title,
                state: author,
                startTimestamp: startTime,
                endTimestamp: endTime,
                largeImageKey: photo,
                buttons: [
                    {
                        url: videoLink,
                        label: "Play Video"
                    },
                    {
                        url: "https://github.com/iwillfightfordream/youtube-music-discord-rpc",
                        label: "Download from GitHub"
                    }
                ]
            }
        )
        return
    }
    if (author == "") {
        rpcClient.setActivity(
            {
                smallImageText: state[playbackState],
                smallImageKey: photos[playbackState],
                largeImageText: finalDetails,
                type: 4,
                details: title,
                startTimestamp: startTime,
                endTimestamp: endTime,
                largeImageKey: photo
            }
        )
        return
    }
    rpcClient.setActivity(
        {
            smallImageText: state[playbackState],
            smallImageKey: photos[playbackState],
            largeImageText: finalDetails,
            type: 4,
            details: title,
            state: author,
            startTimestamp: startTime,
            endTimestamp: endTime,
            largeImageKey: photo
        }
    )
    return
}

module.exports.setSearchActivity = (query) => {
    if (rpcClient == null) {
        if (rpcClient !== null) return
        this.connect()
    }

    const startTime = Date.now() - progress * 1000

    rpcClient.setActivity(
        {
            smallImageText: "Searching",
            smallImageKey: "search",
            largeImageText: "YouTube Music",
            type: 4,
            details: "Searching on YouTube Music",
            state: query,
            startTimestamp: startTime,
            largeImageKey: "largebadge"
        }
    )
    return
}