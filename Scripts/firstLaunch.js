module.exports.didFirstLaunch = () => {
    const db = require("simpl.db")
    const fs = require("fs")

    fs.mkdir("./Database", (err) => {
        if (err) return

        console.log(`Applying first launch settings...`)

        const package = require("../package.json")

        const settings = new db.Database({ dataFile: "./Database/Settings.json" })
        settings.set(`StartupLaunch`, false)
        settings.set(`DisableHardwareAcceleration`, false)
        settings.set(`DisableAutoplay`, false)
        settings.set(`ColorChanger`, true)
        settings.set(`Version`, package.version)

        const discord = new db.Database({ dataFile: "./Database/Discord.json" })
        discord.set(`PluginEnabled`, true)
        discord.set(`PrivacyMode`, false)
        discord.set(`WatchVideoButton`, true)
        discord.set(`TimeLeft`, true)
        discord.set(`PlaybackState`, true)
        discord.set(`Searching`, true)
        discord.set(`Idling`, true)

        const songInfo = new db.Database({ dataFile: "./Database/SongInfo.json" })
        songInfo.set(`title`, "")
        songInfo.set(`author`, "")
        songInfo.set(`private`, "")
        songInfo.set(`length`, "")
        songInfo.set(`videoType`, "")
        songInfo.set(`videoId`, "")
        songInfo.set("thumbnail", "")
        songInfo.set("progress", "")

        const player = new db.Database({ dataFile: "./Database/Player.json" })
        player.set(`state`, "")
        player.set(`videoMode`, ""),
        player.set(`lastSongColorChanged`, "")
    })
}

module.exports.clearValues = () => {
    const db = require("simpl.db")
    const songInfo = new db.Database({ dataFile: "./Database/SongInfo.json" })
    songInfo.set(`title`, "")
    songInfo.set(`author`, "")
    songInfo.set(`private`, "")
    songInfo.set(`length`, "")
    songInfo.set(`videoType`, "")
    songInfo.set(`videoId`, "")
    songInfo.set("thumbnail", "")
    songInfo.set("progress", "")

    const player = new db.Database({ dataFile: "./Database/Player.json" })
    player.set(`state`, "")
    player.set(`videoMode`, "")
    player.set(`lastSongColorChanged`, "")
}