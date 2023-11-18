const {get} = require("../../../scripts/database/PluginManager");
const {getConnectedPresence} = require("./ConnectPresence");

let lastProgress = 1
let lastState = ""

module.exports.updatePresence = (state, progress) => {
    let currentProgress;
    let currentThumbnailURL;
    let currentState;

    const {getSongInfo} = require("../../../scripts/web/SongInfoManager");
    const songInfo = getSongInfo()

    const connectedRPC = getConnectedPresence()

    if (connectedRPC === null) return
    if (songInfo.details === undefined) return

    let length = songInfo.details.lengthSeconds * 1000

    if (progress !== undefined) {
        currentProgress = progress
        lastProgress = progress
    } else {
        currentProgress = lastProgress
    }

    if (currentState !== undefined) {
        currentState = state
        lastState = state
    } else {
        currentState = lastState
    }

    let startTime = Date.now() - currentProgress * 1000
    let endTime = startTime + length

    if (songInfo.videoType !== "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
        currentThumbnailURL = songInfo.details.thumbnail.thumbnails[0].url.split("?")[0].split("=")[0]
    } else {
        currentThumbnailURL = songInfo.details.thumbnail.thumbnails[3].url
    }

    if (state === "pause") {
        connectedRPC.setActivity(
            {
                smallImageKey: get("discord-show-playback") === true ? "pause" : undefined,
                smallImageText: get("discord-show-playback") === true ? "Paused" : undefined,
                largeImageKey: get("discord-show-cover") === true ? currentThumbnailURL : "largebadge",
                largeImageText: "@honzawashere",
                type: 4,
                details: get("discord-show-songdata") === true ? songInfo.details.title : "Listening to Music",
                state: get("discord-show-songdata") === true ? songInfo.details.author : undefined,
            }
        ).catch(e => {
            if (e) console.log(e)
        })
    } else if (state === "play") {
        connectedRPC.setActivity(
            {
                smallImageKey: get("discord-show-playback") === true ? "play" : undefined,
                smallImageText: get("discord-show-playback") === true ? "Playing" : undefined,
                largeImageKey: get("discord-show-cover") === true ? currentThumbnailURL : "largebadge",
                largeImageText: "@honzawashere",
                type: 4,
                details: get("discord-show-songdata") === true ? songInfo.details.title : "Listening to Music",
                state: get("discord-show-songdata") === true ? songInfo.details.author : undefined,
                startTimestamp: get("discord-show-time") === true ? startTime : undefined,
                endTimestamp: get("discord-show-time") === true ? endTime : undefined
            }
        ).catch(e => {
            if (e) console.log(e)
        })
    } else {
        connectedRPC.setActivity(
            {
                smallImageKey: get("discord-show-playback") === true ? "play" : undefined,
                smallImageText: get("discord-show-playback") === true ? "Playing" : undefined,
                largeImageKey: get("discord-show-cover") === true ? currentThumbnailURL : "largebadge",
                largeImageText: "@honzawashere",
                type: 4,
                details: get("discord-show-songdata") === true ? songInfo.details.title : "Listening to Music",
                state: get("discord-show-songdata") === true ? songInfo.details.author : undefined,
                startTimestamp: get("discord-show-time") === true ? startTime : undefined,
                endTimestamp: get("discord-show-time") === true ? endTime : undefined
            }
        ).catch(e => {
            if (e) console.log(e)
        })
    }
}