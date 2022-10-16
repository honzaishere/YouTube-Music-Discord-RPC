module.exports.download = async (window) => {
    const ytdl = require("ytdl-core")
    const { songInfoDatabase } = require("./databaseManager")
    const { dialog } = require("electron")

    let videoId
    videoId = songInfoDatabase.get("videoId")

    if (songInfoDatabase.get("videoType") == "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
        dialog.showErrorBox("YouTube Music Downloader", `This video cannot be downloaded since it's private. Please try it with any different video!`)
        return
    }

    const title = songInfoDatabase.get("title")
    const author = songInfoDatabase.get("author")
    const thumbnailURL = songInfoDatabase.get("thumbnail")
    const ffmpeg = require("fluent-ffmpeg")
    ffmpeg.setFfmpegPath("./ffmpeg.exe")
    
    const stream = ytdl(videoId, {
        filter: "audioonly",
        quality: "highestaudio"
    })

    const os = require("os")

    ffmpeg(stream)
    .audioBitrate(256)
    .save(os.homedir() + "/Downloads/" + `${title}.mp3`)
    .on("end", async () => {
        const fs = require("fs")
        const ID3Writer = require("browser-id3-writer")
        const writer = new ID3Writer(fs.readFileSync(os.homedir() + "/Downloads/" + `${title}.mp3`))

        writer.setFrame("TIT2", title)
        writer.setFrame("TPE1", [author])
        
        const fetch = require("node-fetch")

        if(thumbnailURL.includes(".webp")) {
            let findImage = await fetch(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
            let buffer = Buffer.from(await findImage.arrayBuffer())
    
            writer.setFrame('APIC', {
                type: 3,
                data: buffer,
                description: ''
            });
            writer.addTag();
            
            const finalBuffer = Buffer.from(writer.arrayBuffer)
            fs.writeFileSync(os.homedir() + "/Downloads/" + `${title}.mp3`, finalBuffer)
        }

        let findImage = await fetch(thumbnailURL)
        let buffer = Buffer.from(await findImage.arrayBuffer())

        writer.setFrame('APIC', {
            type: 3,
            data: buffer,
            description: ''
        });
        writer.addTag();
        
        const finalBuffer = Buffer.from(writer.arrayBuffer)
        fs.writeFileSync(os.homedir() + "/Downloads/" + `${title}.mp3`, finalBuffer)
    })
}