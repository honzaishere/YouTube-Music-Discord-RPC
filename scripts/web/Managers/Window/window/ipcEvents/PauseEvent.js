const {changePlayState} = require("../../../../SongInfoManager");

module.exports.load = (ipcMain, window) => {
    ipcMain.on("pause", () => {
        changePlayState(window, 'pause')
    })
}