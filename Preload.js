require("@cliqz/adblocker-electron-preload/dist/preload.cjs")

const { ipcRenderer } = require("electron")
const $ = document.querySelector.bind(document);

ipcRenderer.send("preload-enabled")

const store = require("electron-store")
const {ipc} = require("discord-rpc/src/transports");
const s = new store()

function get(p) {
    return s.get("app.plugins." + p) || undefined
}

console.log(s.get("app"))

function isPremium() {
    return s.get("app.premium-user") === true
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#left-content > yt-icon-button").remove()

    const observer = new MutationObserver(() => {
        document.querySelector("#content").classList.add("ytmusic-app-content")
        const api = $("#movie_player");
        if (api) {
            observer.disconnect();
            const video = $("video")
            video.id = "video"

            observer2.observe(document.getElementById("video"), {attributes: true, childList: true, subtree: true});
            observer3.observe(document.getElementById("movie_player"), {attributes: true, childList: true, subtree: true});

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

    const observer3 = new MutationObserver(() => {
        if(document.querySelector("#movie_player")) {
            if(document.querySelector("#movie_player").classList.contains("buffering-mode")) {
                ipcRenderer.send("song-info")
            }
        }
    })

    const observer4 = new MutationObserver(() => {
        if(document.querySelector("#tab1c")) {
            document.querySelectorAll("#setting").forEach(b => {
                if(b.getAttribute("disable-premium") === "") {
                    if(isPremium()) {
                        b.classList.add("premium-disabled")
                    }
                }
                if(b.getAttribute("require-premium") === "") {
                    if(!isPremium()) {
                        b.classList.add("premium-disabled")
                    }
                }
            })
            document.querySelectorAll("#toggle_button").forEach(b => {
                if(get(b.getAttribute("for")) === true) {
                    b.setAttribute("enabled", "")
                }
                b.onclick = (e) => {
                    if(b.getAttribute("enabled") !== null) {
                        b.removeAttribute("enabled")
                        ipcRenderer.send("button-clicked", [b.getAttribute("for")])
                        return
                    }
                    b.setAttribute("enabled", "")
                    ipcRenderer.send("button-clicked", [b.getAttribute("for")])
                }
            })
            document.querySelectorAll("#clickable").forEach(b => {
                b.onclick = (e) => {
                    if(b.getAttribute("enabled") !== null) {
                        b.removeAttribute("enabled")
                        ipcRenderer.send("button-clicked", [b.getAttribute("for")])
                        return
                    }
                    b.setAttribute("enabled", "")
                    ipcRenderer.send("button-clicked", [b.getAttribute("for")])
                }
            })
            observer4.disconnect()
        }
    })

    observer.observe(document.documentElement, {childList: true, subtree: true});
    observer4.observe(document.documentElement, { childList: true, subtree: true })

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