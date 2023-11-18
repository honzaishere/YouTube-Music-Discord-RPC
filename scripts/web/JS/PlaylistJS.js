const Vibrant = require('node-vibrant')

module.exports.info = {
    include: "/playlist"
}

module.exports.load = (window) => {
    // Get URL of opened playlist's cover image
    window.webContents.executeJavaScript("if(document.querySelector(\"ytmusic-cropped-square-thumbnail-renderer > yt-img-shadow > img\")) { document.querySelector(\"ytmusic-cropped-square-thumbnail-renderer > yt-img-shadow > img\").src }").then(url => {
        // When the playlist image is blank
        if (url === undefined) { window.webContents.insertCSS(`html { --ytmusic-playlist-color: "#000000" !important }`) }
        if (url.includes("base64")) { window.webContents.insertCSS(`html { --ytmusic-playlist-color: "#000000" !important }`) }

        if (!url.includes("base64")) {
            // Get colors using node-vibrant
            Vibrant.from(url).getPalette((err, palette) => {
                try {
                    // Set the navigation bar color to DarkVibrant.hex and set our variable --ytmusic-playlist-color to DarkVibrant.hex
                    window.webContents.executeJavaScript(`document.querySelector('#nav-bar-background').style.background = '${palette.DarkVibrant.hex}'`)
                    window.webContents.insertCSS(`html { --ytmusic-playlist-color: ${palette.DarkVibrant.hex} !important }`)
                } catch (e) {
                    // When the palette was not successfully created and DarkVibrant.hex is undefined
                    if (e) {
                        // Clear the color of our navigation bar
                        window.webContents.insertCSS(`html { --ytmusic-playlist-color: "#000000" !important }`)
                    }
                }
            })
        }
    })
}

module.exports.clear = (window) => {
    // Clear the color of our navigation bar
    window.webContents.executeJavaScript("document.querySelector('#nav-bar-background').style.background = 'black'")
}