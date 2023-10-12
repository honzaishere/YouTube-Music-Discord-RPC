module.exports.createDatabase = () => {
    const pkg = require("../../package.json")
    const store = require("electron-store")

    const db = new store()

    if(db.get("app.version") !== pkg.version || db.get("app.version") === undefined) {
        db.set("app.version", pkg.version)
    }

    return db
}

module.exports.get = (name) => {
    const store = require("electron-store")

    const db = new store()
    return db.get("app.plugins." + name) || undefined
}

module.exports.set = (name, value) => {
    const store = require("electron-store")

    const db = new store()
    return db.set("app.plugins." + name, value)
}
