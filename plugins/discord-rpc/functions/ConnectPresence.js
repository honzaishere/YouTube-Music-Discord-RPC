const DiscordRPC = require("discord-rpc")
const rpcClient = new DiscordRPC.Client({transport: "ipc"})

let connectedRPC = null
let reconnectInterval = null

module.exports.connectPresence = () => {
    if (connectedRPC !== null) return

    const electronStore = require("electron-store")
    const store = new electronStore()

    if (store.get("app.premium-user") === true) {
        rpcClient.connect("1163966541675638874").then(u => {
            connectedRPC = rpcClient
            if (reconnectInterval !== null) {
                clearInterval(reconnectInterval)
            }
        }).catch(e => {
            if (e) return
            reconnectInterval = setInterval(() => {
                this.connectPresence()
            }, 30000)
            connectedRPC = null
        })
    } else {
        rpcClient.connect("922907049170464809").then(u => {
            connectedRPC = rpcClient

            rpcClient.on("disconnect", () => {
                return connectedRPC = null
            })
            rpcClient.on("close", () => {
                return connectedRPC = null
            })

        }).catch(e => {
            if (e) return
            connectedRPC = null
        })
    }


    rpcClient.on("disconnect", () => {
        connectedRPC = null
    })
}

module.exports.getConnectedPresence = () => {
    return connectedRPC
}