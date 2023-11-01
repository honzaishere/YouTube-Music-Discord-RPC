module.exports.info = {
    include: "/playlist"
}
module.exports.load = (window) => {
    window.webContents.executeJavaScript("document.querySelector(\"ytmusic-cropped-square-thumbnail-renderer > yt-img-shadow > img\").src").then(url => {
        const Vibrant = require('node-vibrant')

        Vibrant.from(url).getPalette((err, palette) => {
            try {
                window.webContents.executeJavaScript(`document.querySelector('#nav-bar-background').style.background = '${palette.DarkVibrant.hex}'`)
                window.webContents.insertCSS(`html { --ytmusic-playlist-color: ${palette.DarkVibrant.hex} !important }`)
            } catch(e) {
                if(e) return
            }
        })
    })
}

module.exports.clear = (window) => {
    window.webContents.executeJavaScript("document.querySelector('#nav-bar-background').style.background = 'black'")
}