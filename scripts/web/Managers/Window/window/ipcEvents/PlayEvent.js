const {changePlayState} = require("../../../../SongInfoManager");

module.exports.load = (ipcMain, window) => {
    ipcMain.on("play", () => {
        changePlayState(window, 'play')
    })
}