const {get, set} = require("../../scripts/database/PluginManager")

module.exports.plugin = {
    name: "Discord Rich Presence",
    options: [
        {
            label: "Enabled",
            type: "checkbox",
            checked: get("discord-rpc"),
            click: (item) => {
                const { browserWindow } = require("../../Index")
                if (item.checked) {
                    set("discord-rpc", true)
                    this.enable(browserWindow)
                } else {
                    set("discord-rpc", false)
                    this.disable()
                }
            }
        }
    ]
}

const DiscordRPC = require("discord-rpc")
const songInfoManager = require("../../scripts/web/SongInfoManager");
const RPC = new DiscordRPC.Client({transport: "ipc"})
let ConnectedRPC = null

module.exports.connectPresence = () => {
    if (ConnectedRPC !== null) return
    RPC.connect("922907049170464809").then(u => {
        ConnectedRPC = RPC
        console.log(`[Discord] Connection created`)
    }).catch(e => {
        if (e) return console.log(`[Discord] Connection was not created - ${e}`)
    })

    RPC.on("disconnect", () => {
        ConnectedRPC = null
    })
}

module.exports.updatePresence = (st, progress) => {
    console.log(`[Discord] Presence updated`)

    const songInfoManager = require("../../scripts/web/SongInfoManager")
    const songInfo = songInfoManager.getSongInfo()

    if(ConnectedRPC === null) return

    let length = songInfo.details.lengthSeconds * 1000

    let p
    let u

    if(progress) {
        p = progress
    } else {
        p = 1
    }

    let startTime = Date.now() - p * 1000
    let endTime = startTime + length

    if (songInfo.videoType !== "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
        u = songInfo.details.thumbnail.thumbnails[0].url.split("?")[0].split("=")[0]
    } else {
        u = songInfo.details.thumbnail.thumbnails[3].url
    }

    if(st === "pause") {
        ConnectedRPC.setActivity(
            {
                smallImageKey: "pause",
                smallImageText: "Paused",
                largeImageKey: u,
                largeImageText: "@honzawashere",
                type: 4,
                details: songInfo.details.title,
                state: songInfo.details.author,
            }
        ).catch(e => {
            if(e) return console.log(e)
        })
    }
    else if(st === "play") {
        ConnectedRPC.setActivity(
            {
                smallImageKey: "play",
                smallImageText: "Playing",
                largeImageKey: u,
                largeImageText: "@honzawashere",
                type: 4,
                details: songInfo.details.title,
                state: songInfo.details.author,
                startTimestamp: startTime,
                endTimestamp: endTime
            }
        ).catch(e => {
            if(e) return console.log(e)
        })
    } else {
        ConnectedRPC.setActivity(
            {
                smallImageKey: "play",
                smallImageText: "Playing",
                largeImageKey: u,
                largeImageText: "@honzawashere",
                type: 4,
                details: songInfo.details.title,
                state: songInfo.details.author,
                startTimestamp: startTime,
                endTimestamp: endTime
            }
        ).catch(e => {
            if(e) return console.log(e)
        })
    }
}

module.exports.preload = () => {
    this.connectPresence()
}

module.exports.enable = (window) => {
    const {changePlayState} = require("../../scripts/web/SongInfoManager");
    changePlayState(window, "play")
}

module.exports.disable = () => {
    ConnectedRPC.clearActivity()
    return
}