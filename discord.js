let rpcClient = null

module.exports.connect = () => {
    const rpc = require("discord-rpc")
    const client = new rpc.Client({ transport: 'ipc' })

    try {
        client.login({ clientId: "922907049170464809" })
        rpcClient = client
    } catch (e) {
        if (e) {
            const { dialog } = require("electron")
            options = {
                type: "error",
                message: "Discord RPC cannot be started",
                details: `Error: ${e}`,
                buttons: ["OK"],
                title: "Discord RPC"
            }
            dialog.showMessageBox(window, options)
            return
        }
    }
}

module.exports.close = () => {
    if (!rpcClient) return
    if (rpcClient) rpcClient.setActivity()
}

module.exports.setActivity = async (title, author, photo, progress, fullLength, realTitle, realAuthor, realPhoto, playbackState) => {
    if (!rpcClient) {
        this.connect()
        if (rpcClient) return
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

    if(photo == "largebadge") {
        if(playbackState == "badge") {
            playbackState = "none"
        }
    }

    const db = require("simpl.db")
    const last = new db.Database({ dataFile: "./lastSongInfo.json" })

    const startTime = Date.now() - progress * 1000
    const endTime = startTime + fullLength * 1000


    if (progress == undefined && fullLength == undefined) {
        if (author == "") {
            rpcClient.setActivity(
                {
                    smallImageText: state[playbackState],
                    smallImageKey: photos[playbackState],
                    largeImageText: "honzawashere",
                    type: 4,
                    details: title,
                    largeImageKey: photo
                }
            )
            return
        }
        rpcClient.setActivity(
            {
                smallImageText: state[playbackState],
                smallImageKey: photos[playbackState],
                largeImageText: "honzawashere",
                type: 4,
                details: title,
                state: author,
                largeImageKey: photo
            }
        )
    }

    if (progress && fullLength) {
        if (author == "") {
            rpcClient.setActivity(
                {
                    smallImageText: state[playbackState],
                    smallImageKey: photos[playbackState],
                    largeImageText: "honzawashere",
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
                largeImageText: "honzawashere",
                type: 4,
                details: title,
                state: author,
                startTimestamp: startTime,
                endTimestamp: endTime,
                largeImageKey: photo
            }
        )
    }


    last.set("title", realTitle)
    last.set("author", realAuthor)
    last.set("photo", realPhoto)
}