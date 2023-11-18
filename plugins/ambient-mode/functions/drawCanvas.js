module.exports = () => {
    const {browserWindow} = require("../../../Index")

    browserWindow.webContents.executeJavaScript(`
    function drawToCanvas() {
        if (document.querySelector("ytmusic-player-page").getAttribute("video-mode") === null) {
            let ambientCanvas = document.querySelector("canvas")
            let ambientContext = ambientCanvas.getContext("2d")
            ambientContext.drawImage(document.querySelector("#song-image > yt-img-shadow > img"), 0,0, 800, 800)
        } else {
            let ambientCanvas = document.querySelector("canvas")
            let ambientContext = ambientCanvas.getContext("2d")
            ambientContext.drawImage(document.querySelector("video"), 0,0, 800, 800)
            requestAnimationFrame(drawToCanvas)
        }
    }
    
    drawToCanvas()
    `)
}