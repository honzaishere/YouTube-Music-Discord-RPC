const pkg = require("../../package.json")
const store = require("electron-store")

module.exports.createDatabase = () => {
    const db = new store()

    if(db.get("app.version") !== pkg.version || db.get("app.version") === undefined) {
        db.set("app.version", pkg.version)
    }

    return db
}

module.exports.get = (name) => {
    const db = new store()
    return db.get("app.plugins." + name) === true
}

module.exports.getJSON = () => {
    const db = new store()
    return db.store
}

module.exports.set = (name, value) => {
    const db = new store()
    return db.set("app.plugins." + name, value)
}

module.exports.getLastSongInfo = () => {
    const db = new store()
    return db.get("app.songInfo")
}

module.exports.setLastSongInfoDB = (songInfo, time, list) => {
    const info = { info: songInfo, time: time, list: list }

    const db = new store()
    return db.set("app.songInfo", info)
}

