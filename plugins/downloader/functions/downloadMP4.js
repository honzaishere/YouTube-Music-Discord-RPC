const {getSongInfo} = require("../../../scripts/web/SongInfoManager");
const path = require("path");
const {join} = require("path");
const child_process = require("child_process");
const {rmSync} = require("fs");

module.exports.getCodecs = async (window) => {
    const ytdl = require("ytdl-core")
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

    const info = await ytdl.getInfo(songInfo.details.videoId)

    const codecs = info.formats
    const validCodecs = []

    codecs.forEach(codec => {
        if (codec.videoCodec !== "vp9" && codec.videoCodec !== null) {
            validCodecs.push(codec)
        }
    })

    createNewPrompt(validCodecs)
}

module.exports.downloadMP4 = async (window, codec) => {
    const ytdl = require("ytdl-core")
    const ffmpeg = require("fluent-ffmpeg")

    const ffmpegPath = require('ffmpeg-static').replace('app.asar', 'app.asar.unpacked')

    ffmpeg.setFfmpegPath(ffmpegPath)

    const songInfo = getSongInfo()

    const os = require("os")

    const stream = ytdl.chooseFormat(codec)

    const stream2 = ytdl(songInfo.details.videoId, {
        filter: "audioonly", quality: "highest"
    })

    const title = songInfo.details.title.replace(/[<>:"/\\|?*]/g, '')
    window.setTitle(window.getTitle() + " - Downloading and writing video data...")

    const videoId = songInfo.details.videoId

    ffmpeg(stream.url)
        .videoCodec("copy")
        .save(join(__dirname, "..", videoId + "-video.mp4"))
        .on("end", () => {
            ffmpeg(stream2)
                .audioCodec("aac")
                .save(join(__dirname, "..", videoId + "-audio.mp4"))
                .on("end", () => {
                    const ffmpegCommand = `"` + join(__dirname, "..", "ffmpeg.exe") + `"`;
                    const ffmpegArguments = ['-i', `"` + join(__dirname, "..", videoId + "-audio.mp4") + `"`, '-i', `"` + join(__dirname, "..", videoId + "-video.mp4") + `"`, `"` + os.homedir() + "/Downloads/" + `${title}.mp4` + `"`,];

                    const ffmpegProcess = child_process.spawn(ffmpegCommand, ffmpegArguments, {shell: true})

                    ffmpegProcess.stdout.on("data", (d) => {
                        console.log(d)
                    })

                    ffmpegProcess.on('error', (err) => {
                        console.error('Error executing ffmpeg: ' + err);
                    });

                    ffmpegProcess.on('exit', (code) => {
                        if (code === 0) {
                            console.log('Video and audio merged successfully.')
                            rmSync(join(__dirname, "..", videoId + "-audio.mp4"))
                            rmSync(join(__dirname, "..", videoId + "-video.mp4"))
                        } else {
                            console.error('Error during ffmpeg execution.')
                        }
                    });
                })
        })
}