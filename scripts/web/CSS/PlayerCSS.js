module.exports.info = {
    name: "PlayerCSS"
}

module.exports.load = (window) => {
    window.webContents.insertCSS(`
    ytmusic-app-layout > [slot=player-page] { transition: none !important; }
    ytmusic-player-bar { background-color: black !important; }
    .side-panel.ytmusic-player-page { height: 100% !important }
    ytmusic-player-queue-item { border-bottom: 0px solid transparent !important; }
    ytmusic-player-page[mini-player-enabled_][player-page-open_] #player.ytmusic-player-page, ytmusic-player-page[mini-player-enabled_]:not([player-page-open_]) #player.ytmusic-player-page { -webkit-animation: none !important; animation: none !important }
    .content.ytmusic-player-page { padding: 32px var(--ytmusic-player-page-horizontal-padding) 32px !important; }
    .description.ytmusic-description-shelf-renderer { font-size: 18px !important; font-weight: 500 !important }
    .video-disable-performance { width: 0px !important; height: 0px !important }
    .autoplay.ytmusic-player-queue { display: none !important }
    .ytp-player-content.ytp-iv-player-content { display: none !important }
    tp-yt-paper-tab tp-yt-paper-tab .tp-yt-paper-tab[style-target=tab-content], .tp-yt-paper-tab[style-target=tab-content] { text-transform: none; font-size: 15px; }
    ytmusic-app-layout[player-fullscreened] > [slot=player-bar] { width: 100% !important; }
    .ytp-chrome-top-buttons { display: none !important }
    #buttons.ytmusic-queue-header-renderer { margin-left: 10px !important }
    button.yt-spec-button-shape-next.yt-spec-button-shape-next--filled.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--size-m { margin-top: 10px !important }
    .song-media-controls.ytmusic-player { padding: 0px !important; position: absolute; top: 50% !important; left: 50% !important; transform: translate(-50%,-50%) !important }
    .top-row-buttons.ytmusic-player {margin-top: 8px !important; margin-right: 8px !important;}
    ytmusic-player-bar[player-fullscreened_] { --ytmusic-player-bar-height: 72px !important; --ytmusic-like-button-size: none !important; --ytmusic-menu-renderer-button-size: none !important; }
    .thumbnail-overlay.ytmusic-player-queue-item[play-button-state=loading], .thumbnail-overlay.ytmusic-player-queue-item[play-button-state=playing], .thumbnail-overlay.ytmusic-player-queue-item[play-button-state=paused] { opacity: 0 !important }
    ytmusic-app-layout > [slot=player-bar], #player-bar-background.ytmusic-app-layout { transition-duration: 50ms !important }
    .av.ytmusic-player-page { padding-bottom: 20px !important }
    ytmusic-av-toggle[playback-mode="ATV_PREFERRED"] .song-button.ytmusic-av-toggle, ytmusic-av-toggle[playback-mode="OMV_PREFERRED"] .video-button.ytmusic-av-toggle { background-color: white !important; color: var(--ytmusic-track-color1) !important}
    `)
}