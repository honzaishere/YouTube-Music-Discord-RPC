module.exports = () => {
    const {browserWindow} = require("../../../Index")

    browserWindow.webContents.executeJavaScript(`
    function clearCanvas() {
        let ambientCanvas = document.querySelector("canvas")
        let ambientContext = ambientCanvas.getContext("2d")
        ambientContext.clearRect(0, 0, 800, 800)
    }
    
    clearCanvas()
    `)
}