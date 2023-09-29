const { ipcRenderer } = require("electron")
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
            document.querySelector("#contents > ytmusic-description-shelf-renderer").setAttribute("expanded", "")
        }
    })

    observer.observe(document.documentElement, { childList: true, subtree: true });
})