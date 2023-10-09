module.exports.createDatabase = (window) => {
    const pkg = require("../../package.json")
    const fs = require("fs")
    fs.mkdir("./Database", (err) => {
        if(err) {console.log(`[Database] Database already exists, loading plugins`); return}
        const db = require("simpl.db")
        const Database = new db.Database({ dataFile: "./Database/Plugins.json" })

        if(Database.get("version") !== pkg.version) {
            Database.set("adblocker", false)
            Database.set("bypass-premium-restrictions", true)
            Database.set("color-changer", true)
            Database.set("disable-premium-upgrade", true)
            Database.set("disable-upgrade", true)
            Database.set("discord-rpc", false)
            Database.set("version", pkg.version)

            console.log(`[Database] Database created, loading plugins`);
            return
        }

        Database.set("adblocker", false)
        Database.set("bypass-premium-restrictions", true)
        Database.set("color-changer", true)
        Database.set("disable-premium-upgrade", true)
        Database.set("disable-upgrade", true)
        Database.set("discord-rpc", false)

        console.log(`[Database] Database created, loading plugins`);
    })
}

module.exports.get = (name) => {
    const db = require("simpl.db")
    const Database = new db.Database({ dataFile: "./database/Plugins.json" })

    return Database.get(name)
}

module.exports.set = (name, value) => {
    const db = require("simpl.db")
    const Database = new db.Database({ dataFile: "./database/Plugins.json" })

    return Database.set(name, value)
}
