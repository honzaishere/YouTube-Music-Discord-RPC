module.exports.info = {
    name: "ColorChangerCSS"
}

module.exports.load = (window) => {
    window.webContents.insertCSS(`
    ytmusic-app-layout[player-page-open] ytmusic-app[is-bauhaus-sidenav-enabled] #guide-wrapper.ytmusic-app { background: var(--ytmusic-track-color2) !important }
    html { --ytmusic-track-color1: black; --ytmusic-track-color2: black; --ytmusic-playlist-color: black; }
    tp-yt-paper-toast { background: var(--ytmusic-track-color2) !important }
    ytmusic-app-layout[player-page-open] #nav-bar-background.ytmusic-app-layout { left: 0 !important }
    .html5-video-player:not(.ytp-transparent), .html5-video-player.unstarted-mode, .html5-video-player.ad-showing, .html5-video-player.ended-mode { background: transparent !important }
    ytmusic-player[player-ui-state="FULLSCREEN"] .html5-video-player, ytmusic-player[player-ui-state="MINIPLAYER"] .html5-video-player { background-color: transparent !important; }
    ytmusic-app-layout[player-visible] > [slot=player-bar], ytmusic-app-layout[player-visible] .ytmusic-menu-popup-renderer { --paper-listbox-background-color: var(--ytmusic-track-color2) !important }
    .duration.ytmusic-player-queue-item, .byline.ytmusic-player-queue-item { color: #ffffffb3 !important }
    .autoplay.ytmusic-tab-renderer .subtitle.ytmusic-tab-renderer { color: #ffffffb3 !important }
    .av-toggle.ytmusic-av-toggle { background: var(--ytmusic-track-color1) !important; }
    .song-button.ytmusic-av-toggle, .video-button.ytmusic-av-toggle { background: var(--ytmusic-track-color1) !important; }
    ytmusic-av-toggle[playback-mode=ATV_PREFERRED] .song-button.ytmusic-av-toggle, ytmusic-av-toggle[playback-mode=OMV_PREFERRED] .video-button.ytmusic-av-toggle { background-color: var(--ytmusic-av-toggle-active) !important; }
    
    ytmusic-app-layout[player-visible] #player-bar-background.ytmusic-app-layout { background: black !important; }
    ytmusic-app-layout[player-page-open] #player-bar-background.ytmusic-app-layout { background: transparent !important; }
    ytmusic-app-layout[player-visible] ytmusic-player-bar { background: black !important; }
    ytmusic-app-layout[player-page-open] ytmusic-player-bar { background: transparent !important; }
    
    ytmusic-guide-renderer { background: transparent !important; }
    
    ytmusic-app-layout[player-page-open] #nav-bar-background.ytmusic-app-layout { background: transparent !important }
    ytmusic-app-layout[is-bauhaus-sidenav-enabled] #mini-guide-background.ytmusic-app-layout { background: transparent !important }
    
    ytmusic-player-page { background: transparent !important }
    
    ytmusic-app-layout[player-page-open] { position: absolute; width: 100%; height: 100%; display: block; opacity: 1; background: linear-gradient(180deg,var(--ytmusic-track-color1) 0%, black 120%); overflow: hidden !important }
    `)
}