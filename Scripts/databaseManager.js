const db = require("simpl.db")

this.settingsDatabase = new db.Database({ dataFile: "./Database/Settings.json"})
this.discordDatabase = new db.Database({ dataFile: "./Database/Discord.json"})
this.playerDatabase = new db.Database({ dataFile: "./Database/Player.json"})
this.songInfoDatabase = new db.Database({ dataFile: "./Database/SongInfo.json"})