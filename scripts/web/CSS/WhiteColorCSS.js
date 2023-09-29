module.exports.info = {
    name: "WhiteColorCSS"
}
module.exports.load = (window) => {
    window.webContents.insertCSS(`
    #primaryProgress.tp-yt-paper-progress { background: white !important }
    .slider-knob-inner.tp-yt-paper-slider { border: 2px solid white !important; background: white !important }
    yt-page-navigation-progress.ytmusic-app { --yt-page-navigation-progress-color: white !important }
    tp-yt-paper-toggle-button[checked]:not([disabled]) .toggle-bar.tp-yt-paper-toggle-button { background-color: white !important }
    tp-yt-paper-toggle-button[checked]:not([disabled]) .toggle-button.tp-yt-paper-toggle-button { background-color: white !important }
    div#toggleButton:hover { cursor: pointer }
    .time-info.ytmusic-player-bar { color: white !important }
    `)
}