module.exports.info = {
    name: "PlaylistsCSS"
}

module.exports.load = (window) => {
    window.webContents.insertCSS([
        "#contents.ytmusic-shelf-renderer>*.ytmusic-shelf-renderer:not(:last-child) { border-bottom: 1px solid transparent !important }",
        "#contents.ytmusic-playlist-shelf-renderer>*.ytmusic-playlist-shelf-renderer:not(:last-child) { border-bottom: 1px solid transparent !important }",
        "ytmusic-app-layout[player-page-open] .ytmusic-app-content {display: none;}",
        "ytmusic-app-layout[player-page-open] ytmusic-app-layout > [slot=player-bar] {width: 100vw !important;}"
    ].join("\n"))
}