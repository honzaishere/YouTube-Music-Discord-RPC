module.exports = (window) => {
    const code = [
        "document.querySelector('#player').removeAttribute('mini-player-required')",
        "document.querySelector('ytmusic-player-page').removeAttribute('mini-player-enabled')",
        "",
        "document.querySelector('#player > div.song-media-controls.style-scope.ytmusic-player > div > tp-yt-paper-icon-button.player-close-button.style-scope.ytmusic-player').onclick = () => {",
        "document.querySelector('#player').removeAttribute('player-ui-state')",
        "};0"
    ].join("\n")

    window.webContents.executeJavaScript(code)
}