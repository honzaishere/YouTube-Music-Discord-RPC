let rpcClient = null

const db = require("simpl.db")
const plugins = new db.Database({ dataFile: "./plugins.json" })

const moment = require("moment")

async function debug(title, message) {
    console.log(`[${moment().format("DD/MM/YYYY-HH:mm:ss")}] [${title}] ${message}`)
}

module.exports.connect = () => {
    const rpc = require("discord-rpc")
    const client = new rpc.Client({ transport: 'ipc' })

    try {
        client.login({ clientId: "922907049170464809" })
        rpcClient = client
        debug("Discord", "Logged in")
    } catch (e) {
        if (e) {
            const { dialog } = require("electron")
            options = {
                type: "error",
                message: "Well, Discord RPC cannot be started",
                details: `Error: ${e}`,
                buttons: ["OK"],
                title: "Discord RPC"
            }
            dialog.showMessageBox(window, options)
            return
        }
        debug("Discord", "Not logged in")
    }
}

module.exports.close = () => {
    rpcClient.clearActivity()
}

module.exports.setActivity = async (title, author, photo, progress, fullLength) => {
    if (!rpcClient) {
        this.connect()
        if(rpcClient) return
    }

    const db = require("simpl.db")
    const last = new db.Database({ dataFile: "./lastSongInfo.json" })
    
    const startTime = Date.now() - progress * 1000
    const endTime = startTime + fullLength * 1000
    
    rpcClient.setActivity(
        {
            smallImageText: "YouTube Music",
            smallImageKey: "badge",
            largeImageKey: "honzawashere",
            startTimestamp: startTime,
            endTimestamp: endTime,
            type: 4,
            details: title,
            state: author,
            largeImageKey: photo
        }
    )

    last.set("title", title)
    last.set("author", author)
    last.set("photo", photo)
}