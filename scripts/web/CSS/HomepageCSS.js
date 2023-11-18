module.exports.info = {
    name: "HomepageCSS",
}

module.exports.load = (window) => {
    window.webContents.insertCSS(`ytmusic-nav-bar[is-bauhaus-sidenav-enabled] .right-content.ytmusic-nav-bar { padding-right: 30px !important }
    ytmusic-cast-button { display: none !important } ytmusic-nav-bar[is-bauhaus-sidenav-enabled] .right-content.ytmusic-nav-bar { right: 0px !important }
    ytmusic-app[is-bauhaus-sidenav-enabled] #guide-wrapper.ytmusic-app { background: transparent !important; border-right: 0px solid transparent !important }
    ytmusic-app-layout[is-bauhaus-sidenav-enabled] #nav-bar-background.ytmusic-app-layout { border-bottom: 0px solid transparent !important; transition: opacity 0s !important; }
    ytmusic-app-layout[is-bauhaus-sidenav-enabled] #nav-bar-divider.ytmusic-app-layout { border-top: 0px solid transparent !important }
    ytmusic-app-layout[is-bauhaus-sidenav-enabled] #mini-guide-background.ytmusic-app-layout {border-right: 0px solid transparent !important }
    ytmusic-guide-renderer[is-collapsed] { background: var(--ytmusic-nav-bar) }
    ytmusic-chip-cloud-chip-renderer[chip-style=STYLE_LARGE_TRANSLUCENT_AND_SELECTED_WHITE] {padding-top: 10px !important }
    .immersive-background.ytmusic-browse-response ytmusic-fullbleed-thumbnail-renderer.ytmusic-browse-response { opacity: 0 !important }
    .title.ytmusic-carousel-shelf-basic-header-renderer { font-size: 25px !important }
    #contents.ytmusic-section-list-renderer>ytmusic-carousel-shelf-renderer.ytmusic-section-list-renderer:not(:last-child), #contents.ytmusic-section-list-renderer>ytmusic-immersive-carousel-shelf-renderer.ytmusic-section-list-renderer:not(:last-child) { margin-bottom: 0px !important }
    ytmusic-mealbar-promo-renderer[dialog][dialog][dialog] { display: none !important }
    div#guide-content { background: transparent !important }
    tp-yt-paper-listbox.ytmusic-menu-popup-renderer { border: 1px solid transparent !important; border-radius: 8px !important }
    .yt-simple-endpoint, .logo.ytmusic-logo { -webkit-user-drag: none !important }
    ytmusic-app-layout[player-page-open] ytmusic-search-box[is-bauhaus-sidenav-enabled][opened] .search-box.ytmusic-search-box, ytmusic-app-layout[player-page-open] ytmusic-search-box[is-bauhaus-sidenav-enabled] #suggestion-list.ytmusic-search-box, ytmusic-app-layout[player-page-open] ytmusic-search-suggestion { background: var(--ytmusic-track-color1) !important }
    ytmusic-app-layout[player-page-open] ytmusic-search-box[is-bauhaus-sidenav-enabled] { --ytmusic-search-background: var(--ytmusic-track-color1) !important; }
    ytmusic-app-layout[player-page-open] tp-yt-iron-icon.style-scope.ytmusic-search-suggestion { fill: white !important }
    ytmusic-search-box[has-query] .search-container.ytmusic-search-box, ytmusic-search-box[opened] .search-container.ytmusic-search-box { box-shadow: none !important }
    
    yt-img-shadow[object-fit=CONTAIN] img.yt-img-shadow { object-fit: cover !important }
    #sections.ytmusic-guide-renderer { user-select: none !important; }
    img { -webkit-user-drag: none !important; user-select: none !important; }
    ::selection { background: var(--ytmusic-track-color1) !important; color: white !important }
    body { -webkit-user-drag: none !important; user-select: none !important; }
    .no-opacity { opacity: 0 !important }
    .content.ytmusic-tabbed-search-results-renderer { padding: 8px 0 0 !important }
    ytmusic-search-box { box-shadow: none !important; }
    .menu.ytmusic-player-bar { --iron-icon-fill-color: #ffffff !important; }
    ytd-multi-page-menu-renderer.ytmusic-popup-container { background: var(--ytmusic-track-color2) !important;--yt-spec-call-to-action: white !important;--yt-endpoint-hover-color: lightgrey !important; }
    yt-icon.style-scope.ytd-compact-link-renderer { color: white !important }
    ytmusic-app-layout[not-maximized] div#playlists {height: calc(100% - 75px);overflow-y: scroll;}
    ytmusic-nav-bar[is-bauhaus-sidenav-enabled][is-search-page] .center-content.ytmusic-nav-bar { width: 80% !important }
    .content.ytmusic-tabbed-search-results-renderer { margin: 0 0 !important }
    .tab-container.ytmusic-tabs { margin: 0 0 !important }
    #chips.ytmusic-chip-cloud-renderer { margin-left: 40px !important }
    ytmusic-tabs { margin-left: 40px; }
    ytmusic-chip-cloud-renderer.ytmusic-section-list-renderer { margin: 0 0 !important }
    .strapline.ytmusic-carousel-shelf-basic-header-renderer, .strapline.ytmusic-shelf-renderer { color: #ffffffb3 !important }
    .tab.ytmusic-tabs {text-transform: capitalize !important;}
    ytmusic-section-list-renderer[page-type=MUSIC_PAGE_TYPE_LIBRARY_CONTENT_LANDING_PAGE] ytmusic-side-aligned-item-renderer.ytmusic-section-list-renderer, ytmusic-section-list-renderer[page-type=MUSIC_PAGE_TYPE_DOWNLOADS_CONTENT_LANDING_PAGE] ytmusic-side-aligned-item-renderer.ytmusic-section-list-renderer, ytmusic-section-list-renderer[page-type=MUSIC_PAGE_TYPE_PRIVATELY_OWNED_CONTENT_LANDING_PAGE] ytmusic-side-aligned-item-renderer.ytmusic-section-list-renderer { margin: 26px 0 36px !important; }
    #container.ytmusic-multi-select-menu-renderer { border-radius: 16px !important; background: #0e0e0e !important}
    #items.ytmusic-multi-select-menu-renderer {background: #0e0e0e !important}
    `)
}