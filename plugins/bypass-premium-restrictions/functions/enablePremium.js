module.exports = (window) => {
    const code = [
        "document.querySelector(\"#items > ytmusic-guide-entry-renderer:nth-child(4) > tp-yt-paper-item\").setAttribute('hidden', '')",
        "document.querySelector(\"#right-content > ytmusic-settings-button\").onclick = () => {",
        "if(document.querySelector(\"#items > ytd-compact-link-renderer:nth-child(2) > a\").href === 'https://music.youtube.com/music_premium') {",
        "document.querySelector(\"#items > ytd-compact-link-renderer:nth-child(2)\").setAttribute('hidden', '')",
        "}",
        "};0"
    ].join("\n")

    window.webContents.executeJavaScript(code)
}