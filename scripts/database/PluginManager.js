module.exports.createDatabase = (window) => {
    const {loadPlugins} = require("../web/WebManager")
    const fs = require("fs")
    fs.mkdir("./Database", (err) => {
        if(err) {console.log(`[Database] Database already exists, loading plugins`); loadPlugins(window); return}
        const db = require("simpl.db")
        const Database = new db.Database({ dataFile: "./Database/Plugins.json" })

        Database.set("adblocker", true)
        Database.set("bypass-premium-restrictions", true)
        Database.set("color-changer", true)
        Database.set("disable-premium-upgrade", true)
        Database.set("disable-upgrade", true)
        Database.set("discord-rpc", false)

        console.log(`[Database] Database created, loading plugins`);
        loadPlugins(window)
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
