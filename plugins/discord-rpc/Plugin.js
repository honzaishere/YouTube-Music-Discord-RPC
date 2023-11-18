const {getConnectedPresence, connectPresence} = require("./functions/ConnectPresence");
const {updatePresence} = require("./functions/UpdatePresence");

module.exports = {
    name: "Discord Rich Presence",
    handle: (setting) => {
        const PluginSetting = require("./handlers/" + setting)
        PluginSetting()
    },
    enable: (window) => {
        if(getConnectedPresence() === null) {
            connectPresence()
        }

        const {changePlayState} = require("../../scripts/web/SongInfoManager");
        changePlayState(window, "play")
    },
    disable: () => {
        getConnectedPresence().clearActivity()
    },
    preload: () => {
        connectPresence()
    },
    updatePresence: (state, progress) => {
        updatePresence(state, progress)
    }
}