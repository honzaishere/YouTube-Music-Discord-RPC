require("@cliqz/adblocker-electron-preload/dist/preload.cjs")

const { ipcRenderer } = require("electron")
const {join} = require("path");
const $ = document.querySelector.bind(document);

ipcRenderer.send("preload-enabled")

document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        const api = $("#movie_player");
        if (api) {
            observer.disconnect();
            const video = $("video")

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

    document.querySelector("#content").classList.add("ytmusic-app-content")

    observer.observe(document.documentElement, { childList: true, subtree: true });

    window.onplay = () => {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: "YouTube Music",
            artwork: [
                { src: join(__dirname, "Icons", "icon.ico") }
            ]
        })
        navigator.mediaSession.playbackState = "playing"
    }
})