const store = require("electron-store");
const {dialog} = require("electron");
module.exports.createDatabase = () => {
    const pkg = require("../../package.json")
    const store = require("electron-store")

    const db = new store()

    if(db.get("app.version") !== pkg.version || db.get("app.version") === undefined) {
        db.set("app.version", pkg.version)
        dialog.showMessageBox( { message: "Settings got moved. Now you can find them when you click on settings icon, or your profile icon and go to \"App Settings\" section.", title: "YouTube Music", buttons: ["OK"]})
    }

    return db
}

module.exports.get = (name) => {
    const store = require("electron-store")

    const db = new store()
    return db.get("app.plugins." + name) === true
}

module.exports.getJSON = () => {
    const store = require("electron-store")

    const db = new store()
    return db.store
}

module.exports.set = (name, value) => {
    const store = require("electron-store")

    const db = new store()
    return db.set("app.plugins." + name, value)
}

module.exports.getLastSongInfo = () => {
    const store = require("electron-store")

    const db = new store()
    return db.get("app.songInfo")
}

module.exports.setLastSongInfoDB = (value) => {
    const store = require("electron-store")

    const db = new store()
    return db.set("app.songInfo", value)
}

