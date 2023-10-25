const {getSongInfo} = require("../../scripts/web/SongInfoManager");
const {join} = require("path");
const {readFileSync, rmSync} = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const os = require("os");
const child_process = require("child_process");

module.exports.plugin = {
    name: "Downloader",
}

module.exports.preload = () => {
    return
}

module.exports.enable = () => {
    return
}

module.exports.downloadMp3 = (window) => {
    const ytdl = require("ytdl-core")
    const ffmpeg = require("fluent-ffmpeg")
    //const sharp = require("sharp")

    const ffmpegPath = require('ffmpeg-static').replace(
        'app.asar',
        'app.asar.unpacked'
    )

    ffmpeg.setFfmpegPath(ffmpegPath)

    const os = require("os")
    const songInfo = getSongInfo()

    if (!songInfo.details.videoId) {
        const electron = require("electron")
        electron.dialog.showMessageBox({title: "YouTube Music", message: "Please play some video to download."})
        return
    }
    if (songInfo.videoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
        const electron = require("electron")
        electron.dialog.showMessageBox({
            title: "YouTube Music",
            message: "This video is private (only for you). YouTube Music is not able to download this video."
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

            // const image = sharp(buff)
            //
            // image.metadata().then(metadata => {
            //     const { width, height } = metadata
            //
            //     let size
            //     if(width > height) {
            //         size = { width: height, height: height }
            //     } else {
            //         size = { width: width, height: width }
            //     }
            //
            //     return image.resize(size.width, size.height).toBuffer().then(img => {
            //         writer.setFrame('APIC', {
            //             type: 3,
            //             data: Buffer.from(img),
            //             description: `${album === null ? '' : `${album}'s cover`}`
            //         });
            //     }).catch(e => {
            //         if(e) return console.log(e)
            //     })
            // })

            writer.addTag();

            window.setTitle(window.getTitle().replace("- Downloading...", "- Writing downloaded data..."))
            const finalBuffer = Buffer.from(writer.arrayBuffer)
            fs.writeFileSync(os.homedir() + "/Downloads/" + `${title}.mp3`, finalBuffer)
            window.setTitle(window.getTitle().replace(" - Writing downloaded data...", ""))
        })
}

module.exports.downloadMp4 = (window) => {
    const ytdl = require("ytdl-core")
    const ffmpeg = require("fluent-ffmpeg")

    const ffmpegPath = require('ffmpeg-static').replace(
        'app.asar',
        'app.asar.unpacked'
    )

    ffmpeg.setFfmpegPath(ffmpegPath)

    const songInfo = getSongInfo()

    const os = require("os")

    if (!songInfo.details.videoId) {
        const electron = require("electron")
        electron.dialog.showMessageBox({title: "YouTube Music", message: "Please play some video to download."})
        return
    }
    if (songInfo.videoType === "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK") {
        const electron = require("electron")
        electron.dialog.showMessageBox({
            title: "YouTube Music",
            message: "This video is private (only for you). YouTube Music is not able to download this video."
        })
        return
    }

    const stream = ytdl(songInfo.details.videoId, {
        filter: "videoonly",
        quality: "highest"
    })

    const stream2 = ytdl(songInfo.details.videoId, {
        filter: "audioonly",
        quality: "highest"
    })

    const title = songInfo.details.title.replace(/[<>:"/\\|?*]/g, '')
    window.setTitle(window.getTitle() + " - Downloading and writing video data...")

    const videoId = songInfo.details.videoId

    ffmpeg(stream)
        .videoCodec("copy")
        .save(join(__dirname, videoId + "-video.mp4"))
        .on("end", () => {
            ffmpeg(stream2)
                .audioCodec("aac")
                .save(join(__dirname, videoId + "-audio.mp4"))
                .on("end", () => {
                    const ffmpegCommand = `"` + join(__dirname, "ffmpeg.exe") + `"`;
                    const ffmpegArguments = [
                        '-i', `"` + join(__dirname, videoId + "-audio.mp4") + `"`,
                        '-i', `"` + join(__dirname, videoId + "-video.mp4") + `"`,
                        `"` + os.homedir() + "/Downloads/" + `${title}.mp4` + `"`,
                    ];

                    const ffmpegProcess = child_process.spawn(ffmpegCommand, ffmpegArguments, { shell: true })

                    ffmpegProcess.stdout.on("data", (d) => {
                        console.log(d)
                    })

                    ffmpegProcess.on('error', (err) => {
                        console.error('Error executing ffmpeg: ' + err);
                    });

                    ffmpegProcess.on('exit', (code) => {
                        if (code === 0) {
                            console.log('Video and audio merged successfully.')
                            rmSync("./" + videoId + "-video.mp4")
                            rmSync("./" + videoId + "-audio.mp4")
                        } else {
                            console.error('Error during ffmpeg execution.')
                        }
                    });
                })
        })
}

//C:\ffmpeg\bin\