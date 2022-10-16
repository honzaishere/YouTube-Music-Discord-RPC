const db = require("simpl.db")
const { log } = require("./logger")

this.settingsDatabase = new db.Database({ dataFile: "./Database/Settings.json"})
this.discordDatabase = new db.Database({ dataFile: "./Database/Discord.json"})
this.playerDatabase = new db.Database({ dataFile: "./Database/Player.json"})
this.songInfoDatabase = new db.Database({ dataFile: "./Database/SongInfo.json"})

module.exports.clearDB = () => {
    const fs = require("fs")
    fs.rm(`./Database/SongInfo.json`, (err) => {
        if(err) return log(`clearDB: Cannot delete "SongInfo.json": ${err}`)
        log(`clearDB: Deleted "SongInfo.json"`)
    })
    fs.rm(`./Database/Player.json`, (err) => {
        if(err) return log(`clearDB: Cannot delete "Player.json": ${err}`)
        log(`clearDB: Deleted "Player.json"`)
    })
}