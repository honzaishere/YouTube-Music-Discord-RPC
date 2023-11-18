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
    .ytp-player-content.ytp-iv-player-content { display: none !important }
    tp-yt-paper-tab tp-yt-paper-tab .tp-yt-paper-tab[style-target=tab-content], .tp-yt-paper-tab[style-target=tab-content] { text-transform: none; font-size: 15px; }
    ytmusic-app-layout[player-fullscreened] > [slot=player-bar] { width: 100% !important; }
    .ytp-chrome-top-buttons { display: none !important }
    #buttons.ytmusic-queue-header-renderer { margin-left: 10px !important }
    button.yt-spec-button-shape-next.yt-spec-button-shape-next--filled.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--size-m { margin-top: 10px !important }
    .top-row-buttons.ytmusic-player {margin-top: 8px !important; margin-right: 8px !important;}
    ytmusic-player-bar[player-fullscreened_] { --ytmusic-player-bar-height: 72px !important; --ytmusic-like-button-size: none !important; --ytmusic-menu-renderer-button-size: none !important; }
    .thumbnail-overlay.ytmusic-player-queue-item[play-button-state=loading], .thumbnail-overlay.ytmusic-player-queue-item[play-button-state=playing], .thumbnail-overlay.ytmusic-player-queue-item[play-button-state=paused] { opacity: 0 !important }
    ytmusic-app-layout > [slot=player-bar], #player-bar-background.ytmusic-app-layout { transition-duration: 50ms !important }
    .av.ytmusic-player-page { padding-bottom: 20px !important }
    ytmusic-av-toggle[playback-mode="ATV_PREFERRED"] .song-button.ytmusic-av-toggle, ytmusic-av-toggle[playback-mode="OMV_PREFERRED"] .video-button.ytmusic-av-toggle { background-color: white !important; color: var(--ytmusic-track-color1) !important}
    .side-panel.modular.style-scope.ytmusic-player-page::-webkit-scrollbar { width: 0px }
    ytmusic-app-layout[player-fullscreened] > [slot=player-bar] {background: transparent !important;}
    ytmusic-app-layout[player-fullscreened] div#song-image {background: transparent;}
    ytmusic-app-layout[player-fullscreened] div#song-image > yt-img-shadow {filter:blur(32px);opacity:60%}
    ytmusic-app-layout[disable-better-fullscreen] div#song-image > yt-img-shadow {filter:blur(0px) !important;opacity:100% !important}
    ytmusic-app-layout[disable-better-fullscreen] .fullscreen-container {display:none !important}
    .fullscreen-container {position: fixed;top:0;left:0;width:100vw;height:100vh;display:none}
    .song-info-container {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);}
    .song-image-container {width: 300px;height: 300px}
    .song-image-container img {width: auto;height: 300px;border:1px solid transparent;border-radius:8px;position:absolute;left: 50%;transform:translate(-50%)}
    ytmusic-player {background-color: transparent !important}
    .song-data-container h1 {text-align: center;padding: 10px 0px 0px;font-size: 26px;font-weight: 400;}
    .song-data-container h3 {text-align: center;padding: 0px;font-size: 20px;font-weight: 400;color: #ffffffd8;}
    ytmusic-player-page[player-fullscreened_] .av.ytmusic-player-page { visibility: hidden !important }
    ytmusic-app-layout[player-fullscreened] div#fullscreen-container {display: block;}
    ytmusic-player-page[player-fullscreened] .side-panel.ytmusic-player-page {display: none;}
    .autoplay.ytmusic-player-queue .title.ytmusic-player-queue { opacity: 1 !important; color: white }
    ytmusic-app-layout[player-page-open] ytmusic-carousel-shelf-renderer { margin-left: 0px !important }
    ytmusic-app-layout[player-page-open] iron-selector#chips { margin-left: 0px !important; }
    `)
}