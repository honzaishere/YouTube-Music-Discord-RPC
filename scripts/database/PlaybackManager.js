const fs = require("fs");
const db = require("simpl.db");
module.exports.createPlaybackDatabase = (window) => {
    fs.mkdir("./Database", (err) => {
        if (err) {
            console.log(`[Database] Playback database already exists, ignoring`);
            return
        }
        const db = require("simpl.db")
        const Database = new db.Database({dataFile: "./Database/Playback.json"})

        Database.set("songInfo", {})
    })
}

module.exports.getLastSongInfo = () => {
    const db = require("simpl.db")
    const Database = new db.Database({ dataFile: "./database/Playback.json" })

    return Database.get("songInfo")
}

module.exports.setLastSongInfo = (value) => {
    const db = require("simpl.db")
    const Database = new db.Database({ dataFile: "./database/Playback.json" })

    return Database.set("songInfo", value)
}
