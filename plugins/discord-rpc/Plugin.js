const {get, set} = require("../../scripts/database/PluginManager")

module.exports.plugin = {
    name: "Discord Rich Presence",
}

const DiscordRPC = require("discord-rpc")
const {browserWindow} = require("../../Index");
const RPC = new DiscordRPC.Client({transport: "ipc"})
let ConnectedRPC = null
let i = null

module.exports.handle = (m) => {
    if(m === "discord-rpc") {
        if (get("discord-rpc") === false) {
            set("discord-rpc", true)
            this.enable(browserWindow)
            return
        }
        if (get("discord-rpc") === true) {
            set("discord-rpc", false)
            this.disable()
        }
    }
    if(m === "discord-show-playback") {
        if (get("discord-show-playback") === false) {
            set("discord-show-playback", true)
            this.updatePresence()
            return
        }
        if (get("discord-show-playback") === true) {
            set("discord-show-playback", false)
            this.updatePresence()
        }
    }
    if(m === "discord-show-cover") {
        if (get("discord-show-cover") === false) {
            set("discord-show-cover", true)
            this.updatePresence()
            return
        }
        if (get("discord-show-cover") === true) {
            set("discord-show-cover", false)
            this.updatePresence()
        }
    }
    if(m === "discord-show-songdata") {
        if (get("discord-show-songdata") === false) {
            set("discord-show-songdata", true)
            this.updatePresence()
            return
        }
        if (get("discord-show-songdata") === true) {
            set("discord-show-songdata", false)
            this.updatePresence()
        }
    }
    if(m === "discord-show-time") {
        if (get("discord-show-time") === false) {
            set("discord-show-time", true)
            this.updatePresence()
            return
        }
        if (get("discord-show-time") === true) {
            set("discord-show-time", false)
            this.updatePresence()
        }
    }
}

module.exports.connectPresence = () => {
    if (ConnectedRPC !== null) return
    const s = require("electron-store")
    const st = new s()
    if (st.get("app.premium-user") === true) {
        RPC.connect("1163966541675638874").then(u => {
            ConnectedRPC = RPC
            if(i !== null) {
                console.log("[Discord] Interval will be cleared")
                clearInterval(i)
            }
            console.log(`[Discord] Connection created`)
        }).catch(e => {
            if (e) return console.log(`[Discord] Connection was not created - ${e}`)
            i = setInterval(() => {
                this.connectPresence()
            }, 30000)
            ConnectedRPC = null
        })
    } else {
        RPC.connect("922907049170464809").then(u => {
            ConnectedRPC = RPC
            console.log(`[Discord] Connection created`)

            RPC.on("message", (m) => {console.log(`[Discord] ${m}`) })
            RPC.on("disconnect", () => { return ConnectedRPC = null })
            RPC.on("close", () => { return ConnectedRPC = null })

        }).catch(e => {
            if (e) return console.log(`[Discord] Connection was not created - ${e}`)
            ConnectedRPC = null
        })
    }


    RPC.on("disconnect", () => {
        ConnectedRPC = null
    })
}

module.exports.updatePresence = (st, progress) => {
    let lastProgress = 1
    let lastState = ""

    let state;

    const songInfoManager = require("../../scripts/web/SongInfoManager")
    const songInfo = songInfoManager.getSongInfo()

    if (ConnectedRPC === null) return
    if (songInfo.details === undefined) return

    let length = songInfo.details.lengthSeconds * 1000

    let p
    let u

    if (progress !== undefined) {
        p = progress
        lastProgress = progress
    } else {
        p = lastProgress
    }

    if (st !== undefined) {
        state = st
        lastState = st
    } else {
        state = lastState
    }

    let startTime = Date.now() - p * 1000
    let endTime = startTime + length

    if (songInfo.videoType !== "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
        u = songInfo.details.thumbnail.thumbnails[0].url.split("?")[0].split("=")[0]
    } else {
        u = songInfo.details.thumbnail.thumbnails[3].url
    }

    if (st === "pause") {
        ConnectedRPC.setActivity(
            {
                smallImageKey: get("discord-show-playback") === true ? "pause" : undefined,
                smallImageText: get("discord-show-playback") === true ? "Paused" : undefined,
                largeImageKey: u,
                largeImageText: "@honzawashere",
                type: 4,
                details: get("discord-show-songdata") === true ? songInfo.details.title : "Listening to Music",
                state: get("discord-show-songdata") === true ? songInfo.details.author : undefined,
            }
        ).catch(e => {
            if (e) return console.log(e)
        })
    } else if (st === "play") {
        ConnectedRPC.setActivity(
            {
                smallImageKey: get("discord-show-playback") === true ? "play" : undefined,
                smallImageText: get("discord-show-playback") === true ? "Playing" : undefined,
                largeImageKey: get("discord-show-cover") === true ? u : "largebadge",
                largeImageText: "@honzawashere",
                type: 4,
                details: get("discord-show-songdata") === true ? songInfo.details.title : "Listening to Music",
                state: get("discord-show-songdata") === true ? songInfo.details.author : undefined,
                startTimestamp: get("discord-show-time") === true ? startTime : undefined,
                endTimestamp: get("discord-show-time") === true ? endTime : undefined
            }
        ).catch(e => {
            if (e) return console.log(e)
        })
    } else {
        ConnectedRPC.setActivity(
            {
                smallImageKey: get("discord-show-playback") === true ? "play" : undefined,
                smallImageText: get("discord-show-playback") === true ? "Playing" : undefined,
                largeImageKey: get("discord-show-cover") === true ? u : "largebadge",
                largeImageText: "@honzawashere",
                type: 4,
                details: get("discord-show-songdata") === true ? songInfo.details.title : "Listening to Music",
                state: get("discord-show-songdata") === true ? songInfo.details.author : undefined,
                startTimestamp: get("discord-show-time") === true ? startTime : undefined,
                endTimestamp: get("discord-show-time") === true ? endTime : undefined
            }
        ).catch(e => {
            if (e) return console.log(e)
        })
    }
}

module.exports.preload = () => {
    this.connectPresence()
}

module.exports.enable = (window) => {
    const {changePlayState} = require("../../scripts/web/SongInfoManager");
    this.connectPresence()
    changePlayState(window, "play")
}

module.exports.disable = () => {
    ConnectedRPC.clearActivity()
    return
}