const { ipcRenderer } = require("electron")
const $ = document.querySelector.bind(document);

ipcRenderer.send("preload-enabled")

document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        document.querySelector("#content").classList.add("ytmusic-app-content")

        const api = $("#movie_player");
        if (api) {
            observer.disconnect();
            const video = $("video")
            video.id = "video"

            observer2.observe(document.getElementById("video"), {attributes: true, childList: true, subtree: true});

            video.addEventListener("loadstart", () => {
                ipcRenderer.send("song-info")
            })
            video.addEventListener("play", () => {
                ipcRenderer.send("play")
            })
            video.addEventListener("pause", () => {
                ipcRenderer.send("pause")
            })
            video.addEventListener("seeked", () => {
                ipcRenderer.send("seek")
            })
        }
    })

    const observer2 = new MutationObserver(() => {
        const video = document.querySelector("#video")
        const data = document.querySelector("#player").getAttribute("video-mode")

        if (data === '') {
            const width = video.style.width
            const height = video.style.height

            const songControls = document.querySelector("#player > div.song-media-controls.style-scope.ytmusic-player")

            songControls.style.width = width
            songControls.style.height = height
            return
        }
        const songControls = document.querySelector("#player > div.song-media-controls.style-scope.ytmusic-player")
        songControls.style.width = "100%"
        songControls.style.height = "100%"
    })

    observer.observe(document.documentElement, {childList: true, subtree: true});

    window.onplay = () => {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: "YouTube Music",
            artwork: [
                {src: "https://raw.githubusercontent.com/honzawashere/YouTube-Music/new/icons/icon.ico"}
            ]
        })
        navigator.mediaSession.playbackState = "playing"
    }
})