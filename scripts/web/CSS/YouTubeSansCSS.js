module.exports.info = {
    name: "YouTubeSansCSS"
}

module.exports.load = (window) => {
    window.webContents.insertCSS(`
        .song-title.ytmusic-player-queue-item { font-size: 16px !important; font-family: "YouTube Sans","Roboto",sans-serif !important}
        .description.ytmusic-description-shelf-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .duration.ytmusic-player-queue-item, .byline.ytmusic-player-queue-item {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .time-info.ytmusic-player-bar {font-family: "YouTube Sans","Roboto",sans-serif !important; font-size:12px !important}
        tp-yt-paper-item {font-family: "YouTube Sans","Roboto",sans-serif !important}
        ytmusic-guide-entry-renderer:not([is-primary]) .title.ytmusic-guide-entry-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        ytmusic-guide-entry-renderer:not([is-primary]) .subtitle.ytmusic-guide-entry-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .yt-spec-button-shape-next {font-family: "YouTube Sans","Roboto",sans-serif !important}
        input.ytmusic-search-box, #placeholder.ytmusic-search-box {font-family: "YouTube Sans","Roboto",sans-serif !important}
        ytmusic-search-suggestion {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .title.ytmusic-two-row-item-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .content-info-wrapper.ytmusic-player-bar {font-family:"YouTube Sans","Roboto",sans-serif !important;}
        .content-info-wrapper.ytmusic-player-bar .title.ytmusic-player-bar {font-family:"YouTube Sans","Roboto",sans-serif !important;font-size:18px !important}
        .content-info-wrapper.ytmusic-player-bar .byline.ytmusic-player-bar {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .subtitle.ytmusic-two-row-item-renderer, .third-title.ytmusic-two-row-item-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .strapline.ytmusic-carousel-shelf-basic-header-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        ytmusic-chip-cloud-chip-renderer[enable-bauhaus-style][chip-style=STYLE_LARGE_TRANSLUCENT_AND_SELECTED_WHITE] a.ytmusic-chip-cloud-chip-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important; font-size:16px !important}
        .subtitle.ytmusic-detail-header-renderer, .second-subtitle.ytmusic-detail-header-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .title.ytmusic-responsive-list-item-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .secondary-flex-columns.ytmusic-responsive-list-item-renderer .flex-column.ytmusic-responsive-list-item-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .fixed-column.ytmusic-responsive-list-item-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .description.ytmusic-immersive-header-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .more-button.ytmusic-immersive-header-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        #hover-time-info.ytmusic-player-bar {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .footer.ytmusic-description-shelf-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .description.ytmusic-detail-header-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .text.ytmusic-menu-navigation-item-renderer, .text.ytmusic-menu-service-item-renderer, .text.ytmusic-toggle-menu-service-item-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        tp-yt-paper-toast.yt-notification-action-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .title.ytmusic-queue-header-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .subtitle.ytmusic-queue-header-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        tp-yt-paper-toast {font-family: "YouTube Sans","Roboto",sans-serif !important}
        ytmusic-chip-cloud-chip-renderer[chip-style=STYLE_TRANSPARENT] a.ytmusic-chip-cloud-chip-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        ytmusic-chip-cloud-chip-renderer[enable-bauhaus-style][chip-style=STYLE_UNKNOWN] a.ytmusic-chip-cloud-chip-renderer, ytmusic-chip-cloud-chip-renderer[enable-bauhaus-style][chip-style=STYLE_DEFAULT] a.ytmusic-chip-cloud-chip-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important}
        .text.ytmusic-message-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important; color: white !important; }
        .subtext.ytmusic-message-renderer {font-family: "YouTube Sans","Roboto",sans-serif !important; color: white !important; margin: 4px 0 0 !important}
        tp-yt-paper-tab {font-family: "YouTube Sans",sans-serif !important}
        .autoplay.ytmusic-tab-renderer .title.ytmusic-tab-renderer {font-family: "YouTube Sans",sans-serif !important}
        .autoplay.ytmusic-tab-renderer .subtitle.ytmusic-tab-renderer {font-family: "YouTube Sans",sans-serif !important}
        .song-button.ytmusic-av-toggle, .video-button.ytmusic-av-toggle {font-family: "YouTube Sans",sans-serif !important}
        #info.yt-player-error-message-renderer {font-family: "YouTube Sans",sans-serif !important}
        .song-data-container h1 {font-family: "YouTube Sans",sans-serif !important}}
        .song-data-container h3 {font-family: "YouTube Sans",sans-serif !important}}
    `)
}