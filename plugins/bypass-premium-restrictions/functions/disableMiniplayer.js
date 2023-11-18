module.exports = (window) => {
    const code = [
        "document.querySelector('#player').setAttribute('mini-player-required', '')",
        "",
        "document.querySelector('#player').setAttribute('player-ui-state', 'MINIPLAYER')",
        "document.querySelector('#player > div.song-media-controls.style-scope.ytmusic-player > div > tp-yt-paper-icon-button.player-close-button.style-scope.ytmusic-player').onclick = () => {",
        "return",
        "};0"
    ].join("\n")

    window.webContents.executeJavaScript(code)
}