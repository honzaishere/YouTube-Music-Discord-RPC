module.exports.info = {
    name: "ColorChangerCSS"
}
module.exports.load = (window) => {
    window.webContents.insertCSS(`
    ytmusic-app-layout[player-page-open] #nav-bar-background.ytmusic-app-layout { background: var(--ytmusic-track-color1) !important }
    ytmusic-player-page { background: var(--ytmusic-track-color1) !important }
    ytmusic-app-layout[player-page-open] ytmusic-app[is-bauhaus-sidenav-enabled] #guide-wrapper.ytmusic-app { background: var(--ytmusic-track-color1) !important }
    html { --ytmusic-track-color1: black; --ytmusic-track-color2: black }
    ytmusic-app-layout[player-page-open] #nav-bar-background.ytmusic-app-layout { background: var(--ytmusic-track-color1) !important }
    tp-yt-paper-toast { background: var(--ytmusic-track-color1) !important }
    ytmusic-app-layout[player-page-open] ytmusic-guide-renderer { background: var(--ytmusic-track-color1) !important }
    ytmusic-app-layout[player-visible] > [slot=player-bar], ytmusic-app-layout[player-visible] #player-bar-background.ytmusic-app-layout { background: var(--ytmusic-track-color2) !important; }
    `)
}