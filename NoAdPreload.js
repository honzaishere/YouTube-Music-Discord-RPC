const {ipcRenderer} = require("electron")
const $ = document.querySelector.bind(document);

ipcRenderer.send("preload-enabled")

const store = require("electron-store")
const s = new store()

function get(p) {
    return s.get("app.plugins." + p) || undefined
}

console.log(s.get("app"))

function isPremium() {
    return s.get("app.premium-user") === true
}

function listenTitlebar() {
    document.querySelector("#min-button").onclick = () => {
        ipcRenderer.send("minimize")
    }

    document.querySelector("#max-button").onclick = () => {
        ipcRenderer.send("maximize")
    }

    document.querySelector("#restore-button").onclick = () => {
        ipcRenderer.send("restore")
    }

    document.querySelector("#close-button").onclick = () => {
        ipcRenderer.send("close")
    }

    document.querySelector("#back-button").onclick = () => {
        ipcRenderer.send("navigate-page-back")
    }
}

function createFullscreen() {
    const container = document.createElement("div")
    container.classList.add("fullscreen-container")
    container.id = "fullscreen-container"

    const song_info = document.createElement("div")
    song_info.classList.add("song-info-container")
    song_info.id = "song_info_container"

    const song_image = document.createElement("div")
    song_image.classList.add("song-image-container")

    const song_data = document.createElement("div")
    song_data.classList.add("song-data-container")

    const title = document.createElement("h1")
    title.classList.add("song-data-container")
    title.id = "song_title_fullscreen"

    const author = document.createElement("h3")
    author.classList.add("song-data-container")
    author.id = "song_author_fullscreen"

    const img = document.createElement("img")
    img.classList.add("fullscreen-image")
    img.id = "fullscreen_img"

    song_info.appendChild(song_image)
    song_info.appendChild(song_data)
    song_image.appendChild(img)
    song_data.appendChild(title)
    song_data.appendChild(author)
    container.appendChild(song_info)

    document.querySelector("#song-image").appendChild(container)
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#left-content > yt-icon-button").remove()
    createFullscreen()

    const observer = new MutationObserver(() => {
        document.querySelector("#content").classList.add("ytmusic-app-content")
        const api = $("#movie_player");
        if (api) {
            observer.disconnect();
            const video = $("video")
            video.id = "video"

            observer2.observe(document.getElementById("video"), {attributes: true, childList: true, subtree: true});
            observer3.observe(document.getElementById("movie_player"), {
                attributes: true,
                childList: true,
                subtree: true
            });

            video.addEventListener("play", () => {
                ipcRenderer.send("play")

                setTimeout(() => {
                    if(document.querySelector("ytmusic-app-layout").getAttribute("player-visible") !== "") {
                        ipcRenderer.send("rate-limited")
                        document.querySelector("ytmusic-app-layout").setAttribute("player-visible", "")
                    }
                }, 1000)
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
        if (document.querySelector("#movie_player")) {
            if (document.querySelector("#movie_player").classList.contains("buffering-mode")) {
                ipcRenderer.send("song-info")

                try {
                    document.querySelector("#movie_player").setPlaybackQualityRange("1080p")
                    document.querySelector("#movie_player").setPlaybackQuality("1080p")
                } catch (e) {
                    return
                }
            }
        }
    })

    const observer4 = new MutationObserver(() => {
        if (document.querySelector("#tab1c")) {
            document.querySelectorAll("#setting").forEach(b => {
                if (b.getAttribute("disable-premium") === "") {
                    if (isPremium()) {
                        b.classList.add("premium-disabled")
                    }
                }
                if (b.getAttribute("require-premium") === "") {
                    if (!isPremium()) {
                        b.classList.add("premium-disabled")
                    }
                }
            })
            document.querySelectorAll("#toggle_button").forEach(b => {
                if (get(b.getAttribute("for")) === true) {
                    b.setAttribute("enabled", "")
                }
                b.onclick = (e) => {
                    if (b.getAttribute("enabled") !== null) {
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
                    if (b.getAttribute("enabled") !== null) {
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

    const observer5 = new MutationObserver(() => {
        if (document.querySelector("#av-id > ytmusic-av-toggle").getAttribute("playback-mode") === "ATV_PREFFERED") {
            ipcRenderer.send("av-clicked", ["audio"])
        } else {
            ipcRenderer.send("av-clicked", ["video"])
        }
    })

    const observer6 = new MutationObserver(() => {
        if (document.querySelector("#titlebar")) {
            observer6.disconnect()
            listenTitlebar()
        }
    })

    observer.observe(document.documentElement, {childList: true, subtree: true})
    observer4.observe(document.documentElement, {childList: true, subtree: true})
    observer6.observe(document.documentElement, {childList: true, subtree: true})

    if(document.querySelector("#av-id > ytmusic-av-toggle")) {
        observer5.observe(document.querySelector("#av-id > ytmusic-av-toggle"), {childList: true, subtree: true})
    }

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