const {getSongInfo} = require("../../../scripts/web/SongInfoManager");
const path = require("path");

module.exports = (window) => {
    const ytdl = require("ytdl-core")
    const ffmpeg = require("fluent-ffmpeg")

    const ffmpegPath = require('ffmpeg-static').replace(
        'app.asar',
        'app.asar.unpacked'
    )

    ffmpeg.setFfmpegPath(ffmpegPath)

    const os = require("os")
    const songInfo = getSongInfo()

    if (!songInfo.details.videoId) {
        const electron = require("electron")
        electron.dialog.showMessageBox({
            title: "YouTube Music",
            message: "Please play some video to download.",
            icon: path.join(__dirname, "..", "..", "..", "icons", "tray.png")
        })
        return
    }
    if (songInfo.videoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
        const electron = require("electron")
        electron.dialog.showMessageBox({
            title: "YouTube Music",
            message: "This video is private (only for you). YouTube Music is not able to download this video.",
            icon: path.join(__dirname, "..", "..", "..", "icons", "tray.png")
        })
        return
    }

    window.setTitle(window.getTitle() + " - Downloading...")

    const stream = ytdl(songInfo.details.videoId, {
        filter: "audioonly",
        quality: "highestaudio"
    })

    const title = songInfo.details.title.replace(/[<>:"/\\|?*]/g, '')

    ffmpeg(stream)
        .audioBitrate(256)
        .save(os.homedir() + "/Downloads/" + `${title}.mp3`)
        .on("end", async () => {
            const fs = require("fs")
            const ID3Writer = require("browser-id3-writer")

            const writer = new ID3Writer(fs.readFileSync(os.homedir() + "/Downloads/" + `${title}.mp3`))

            writer.setFrame("TIT2", title)
            writer.setFrame("TPE1", [songInfo.details.author])
            writer.setFrame("WPAY", "https://music.youtube.com/watch?v=" + songInfo.details.videoId)

            let album = null;

            window.webContents.executeJavaScript("document.querySelector(\"#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)\").innerHTML").then(album => {
                writer.setFrame("TALB", album)

                window.webContents.executeJavaScript("document.querySelector(\"#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > span:nth-child(5)\").innerHTML").then(year => {
                    writer.setFrame("TYER", year)
                }).catch(e => {
                    if (e) return
                })
            }).catch(e => {
                if (e) return
            })

            const fetch = require("node-fetch")

            let findImage = await fetch(songInfo.details.thumbnail.thumbnails[0].url.split("?")[0].split("=")[0])
            let buff = Buffer.from(await findImage.arrayBuffer())

            writer.setFrame('APIC', {
                type: 3,
                data: buff,
                description: `${album === null ? '' : `${album}'s cover`}`
            });

            writer.addTag();

            window.setTitle(window.getTitle().replace("- Downloading...", "- Writing downloaded data..."))
            const finalBuffer = Buffer.from(writer.arrayBuffer)
            fs.writeFileSync(os.homedir() + "/Downloads/" + `${title}.mp3`, finalBuffer)
            window.setTitle(window.getTitle().replace(" - Writing downloaded data...", ""))
        })
}