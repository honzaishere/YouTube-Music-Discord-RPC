setInterval(() => {
    // Removing "Select favorite artists to improve recommendations"
    if (document.querySelector("#contents > ytmusic-tastebuilder-shelf-renderer")) {
        document.querySelector("#contents > ytmusic-tastebuilder-shelf-renderer").remove()
    }

    // Removing "START RADIO FROM A SONG"
    if (document.querySelector("#content-group > yt-formatted-string")) {
        document.querySelector("#content-group > yt-formatted-string").remove()
    }

    // Showing "Playback Speed" button
    if (document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer")) {
        document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer").hidden = false
    }
}, 1000)