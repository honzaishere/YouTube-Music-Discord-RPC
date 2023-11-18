const Vibrant = require('node-vibrant')

module.exports = (window, url) => {
    if(url.includes("base64")) {
        return
    }

    Vibrant.from(url).getPalette((err, palette) => {
        window.webContents.insertCSS(`html { --ytmusic-track-color1: ${palette.DarkVibrant.hex} !important; --ytmusic-track-color2: ${palette.DarkVibrant.hex} !important }`)
    })
}