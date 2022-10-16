const { log } = require("./logger")

module.exports.didFirstLaunch = () => {
    const db = require("simpl.db")
    const fs = require("fs")

    fs.mkdir("./Database", (err) => {
        if (err) {
            const settings = new db.Database({ dataFile: "./Database/Settings.json" })
            const discord = new db.Database({ dataFile: "./Database/Discord.json" })
            const songInfo = new db.Database({ dataFile: "./Database/SongInfo.json" })
            const player = new db.Database({ dataFile: "./Database/Player.json" })
            const package = require("../package.json")
            if (settings.get("Version") !== package.version) {
                settings.set(`StartupLaunch`, false)
                settings.set(`DisableHardwareAcceleration`, false)
                settings.set(`DisableAutoplay`, false)
                settings.set(`ColorChanger`, true)
                settings.set(`Version`, package.version)
                settings.set(`SaveLastVideo`, false)
                settings.set(`HideAudioVideo`, false)
                settings.set(`HideMiniplayer`, false)
                settings.set(`HideSignIn`, false)

                discord.set(`PluginEnabled`, true)
                discord.set(`PrivacyMode`, false)
                discord.set(`WatchVideoButton`, true)
                discord.set(`TimeLeft`, true)
                discord.set(`PlaybackState`, true)

                songInfo.set(`title`, "")
                songInfo.set(`author`, "")
                songInfo.set(`private`, "")
                songInfo.set(`length`, "")
                songInfo.set(`videoType`, "")
                songInfo.set(`videoId`, "")
                songInfo.set("thumbnail", "")
                songInfo.set("progress", "")

                player.set(`state`, "")
                player.set(`videoMode`, ""),
                player.set(`lastSongColorChanged`, "")
                log(`firstLaunch: Recreated Databases due to version update`)
            }
            return
        }

        const package = require("../package.json")

        const settings = new db.Database({ dataFile: "./Database/Settings.json" })
        settings.set(`StartupLaunch`, false)
        settings.set(`DisableHardwareAcceleration`, false)
        settings.set(`DisableAutoplay`, false)
        settings.set(`ColorChanger`, true)
        settings.set(`Version`, package.version)
        settings.set(`SaveLastVideo`, false)
        settings.set(`HideAudioVideo`, false)

        const discord = new db.Database({ dataFile: "./Database/Discord.json" })
        discord.set(`PluginEnabled`, true)
        discord.set(`PrivacyMode`, false)
        discord.set(`WatchVideoButton`, true)
        discord.set(`TimeLeft`, true)
        discord.set(`PlaybackState`, true)

        const songInfo = new db.Database({ dataFile: "./Database/SongInfo.json" })
        songInfo.set(`title`, "")
        songInfo.set(`author`, "")
        songInfo.set(`private`, "")
        songInfo.set(`length`, "")
        songInfo.set(`videoType`, "")
        songInfo.set(`videoId`, "")
        songInfo.set("thumbnail", "")
        songInfo.set("progress", "")
        songInfo.set("lyrics")

        const player = new db.Database({ dataFile: "./Database/Player.json" })
        player.set(`state`, "")
        player.set(`videoMode`, ""),
        player.set(`lastSongColorChanged`, "")

        log(`firstLaunch: Created Databases due to first launch`)
    })
}