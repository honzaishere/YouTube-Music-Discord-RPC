let createdStore = null

module.exports.createPlaybackDatabase = (window) => {
    const store = require("electron-store")

    createdStore = new store()
}

module.exports.getLastSongInfo = () => {
    return createdStore.get("app.songInfo")
}

module.exports.setLastSongInfo = (value) => {
    return createdStore.set("app.songInfo", value)
}
