module.exports.info = {
    name: "PlaylistsCSS"
}

module.exports.load = (window) => {
    window.webContents.insertCSS([
        "#contents.ytmusic-shelf-renderer>*.ytmusic-shelf-renderer:not(:last-child) { border-bottom: 1px solid transparent !important }",
        "#contents.ytmusic-playlist-shelf-renderer>*.ytmusic-playlist-shelf-renderer:not(:last-child) { border-bottom: 1px solid transparent !important }",
        "ytmusic-app-layout[player-page-open] .ytmusic-app-content {display: none;}",
        "ytmusic-app-layout[player-page-open] ytmusic-app-layout > [slot=player-bar] {width: 100vw !important;}",
        "ytmusic-detail-header-renderer { background: linear-gradient(180deg, var(--ytmusic-playlist-color), transparent) !important }",
        "ytmusic-browse-response[is-bauhaus-sidenav-enabled] #header.ytmusic-browse-response ytmusic-header-renderer.ytmusic-browse-response, ytmusic-browse-response[is-bauhaus-sidenav-enabled] #header.ytmusic-browse-response ytmusic-detail-header-renderer.ytmusic-browse-response, ytmusic-browse-response[is-bauhaus-sidenav-enabled] #header.ytmusic-browse-response ytmusic-editable-playlist-detail-header-renderer.ytmusic-browse-response, ytmusic-browse-response[is-bauhaus-sidenav-enabled] #header.ytmusic-browse-response ytmusic-migration-header-renderer.ytmusic-browse-response {padding-left:0px !important;margin-left:var(--ytmusic-guide-width) !important}",
        "ytmusic-playlist-form { background: var(--ytmusic-playlist-color-darker) !important; border-radius: 16px !important }",
        ".content-container.ytmusic-detail-header-renderer { margin: var(--ytmusic-divider-height) 40px 0 !important}",
        "#contents.ytmusic-section-list-renderer>*.ytmusic-section-list-renderer:not(.fullbleed) { margin-left: 40px !important}",
        "ytmusic-carousel-shelf-renderer { margin-left: -100px; position: relative; }",
        ".image.ytmusic-visual-header-renderer { left: 240px }",
        "ytmusic-immersive-header-renderer[is-bauhaus-sidenav-enabled] .image.ytmusic-immersive-header-renderer { margin-left: 240px !important }",
        "ytmusic-carousel-shelf-renderer.style-scope.ytmusic-add-to-playlist-renderer { margin-left: 0 !important }",
        "ytmusic-carousel-shelf-renderer.ytmusic-add-to-playlist-renderer { padding: 0 20px !important }",
        "ytmusic-add-to-playlist-renderer.style-scope.ytmusic-popup-container { margin: 0 !important }",
        "yt-icon.ytmusic-playlist-add-to-option-renderer { color: white !important }",
        ".section-heading.ytmusic-add-to-playlist-renderer { font-size: 16px !important }",
        "ytmusic-add-to-playlist-renderer { background: #0e0e0e !important; border: 1px solid transparent !important; border-radius: 16px !important }",
        "tp-yt-paper-dialog { background: #0e0e0e !important; border-radius: 16px}"
    ].join("\n"))
}