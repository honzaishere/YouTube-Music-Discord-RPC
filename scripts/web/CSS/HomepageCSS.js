module.exports.info = {
    name: "HomePageCSS",
}

module.exports.load = (window) => {
    window.webContents.insertCSS(`ytmusic-nav-bar[is-bauhaus-sidenav-enabled] .right-content.ytmusic-nav-bar { padding-right: 30px !important }
    ytmusic-cast-button { display: none !important } ytmusic-nav-bar[is-bauhaus-sidenav-enabled] .right-content.ytmusic-nav-bar { right: 0px !important }
    ytmusic-app[is-bauhaus-sidenav-enabled] #guide-wrapper.ytmusic-app { background: var(--ytmusic-nav-bar) !important; border-right: 0px solid transparent !important }
    ytmusic-app-layout[is-bauhaus-sidenav-enabled] #nav-bar-background.ytmusic-app-layout { border-bottom: 0px solid transparent !important; transition: opacity 0s !important; }
    ytmusic-app-layout[is-bauhaus-sidenav-enabled] #nav-bar-divider.ytmusic-app-layout { border-top: 0px solid transparent !important }
    ytmusic-app-layout[is-bauhaus-sidenav-enabled] #mini-guide-background.ytmusic-app-layout {border-right: 0px solid transparent !important }
    ytmusic-guide-renderer[is-collapsed] { background: var(--ytmusic-nav-bar) }
    ytmusic-chip-cloud-chip-renderer[chip-style=STYLE_LARGE_TRANSLUCENT_AND_SELECTED_WHITE] {padding-top: 10px !important }
    .immersive-background.ytmusic-browse-response ytmusic-fullbleed-thumbnail-renderer.ytmusic-browse-response { opacity: 0 !important }
    .title.ytmusic-carousel-shelf-basic-header-renderer { font-size: 25px !important }
    #contents.ytmusic-section-list-renderer>ytmusic-carousel-shelf-renderer.ytmusic-section-list-renderer:not(:last-child), #contents.ytmusic-section-list-renderer>ytmusic-immersive-carousel-shelf-renderer.ytmusic-section-list-renderer:not(:last-child) { margin-bottom: 0px !important }
    ytmusic-mealbar-promo-renderer[dialog][dialog][dialog] { display: none !important }
    div#guide-content { background: black !important }
    tp-yt-paper-listbox.ytmusic-menu-popup-renderer { border: 1px solid transparent !important; border-radius: 8px !important }
    .yt-simple-endpoint, .logo.ytmusic-logo { -webkit-user-drag: none !important }
    `)
}