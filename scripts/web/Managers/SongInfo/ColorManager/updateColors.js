module.exports = (window) => {
    const {setColors} = require("../ColorManager");

    window.webContents.executeJavaScript("document.querySelector(\"#player\").__data").then(currentPlayerInfo => {
        try {
            if (currentPlayerInfo.playerResponse.videoDetails === null) return
            setColors(window, currentPlayerInfo.videoMode, currentPlayerInfo)
        } catch (error) {
            return console.log(error)
        }
    })
}