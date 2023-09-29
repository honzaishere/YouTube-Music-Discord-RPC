module.exports.info = {
    name: "PlayerCSS"
}

module.exports.load = (window) => {
    window.webContents.insertCSS(`
    ytmusic-app-layout > [slot=player-page] { transition: none !important; }
    ytmusic-player-bar { background-color: black !important; }
    .side-panel.ytmusic-player-page { height: 750px !important }
    ytmusic-player-queue-item { border-bottom: 0px solid transparent !important; }
    ytmusic-player-page[mini-player-enabled_][player-page-open_] #player.ytmusic-player-page, ytmusic-player-page[mini-player-enabled_]:not([player-page-open_]) #player.ytmusic-player-page { -webkit-animation: none !important; animation: none !important }
    .content.ytmusic-player-page { padding: var(--ytmusic-player-page-vertical-padding) var(--ytmusic-player-page-horizontal-padding) 20px !important; }
    .description.ytmusic-description-shelf-renderer { font-size: 18px !important; font-weight: 500 !important }
    .video-disable-performance { width: 0px !important; height: 0px !important }
    .autoplay.ytmusic-player-queue { display: none !important }
    .ytp-player-content.ytp-iv-player-content { display: none !important }
    tp-yt-paper-tab tp-yt-paper-tab .tp-yt-paper-tab[style-target=tab-content], .tp-yt-paper-tab[style-target=tab-content] { text-transform: none; font-size: 15px; }
    ytmusic-app-layout[player-fullscreened] > [slot=player-bar] { width: 100% !important; }
    ytp-chrome-top-buttons { display: none !important }
    #buttons.ytmusic-queue-header-renderer { margin-left: 10px !important }
    `)
}