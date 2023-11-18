const {changePlayState} = require("../../../../SongInfoManager");

module.exports.load = (ipcMain, window) => {
    ipcMain.on("seek", () => {
        changePlayState(window, 'play')
    })
}