const {checkSongInfo} = require("../../../../SongInfoManager");

module.exports.load = (ipcMain, window) => {
    ipcMain.on("song-info", () => {
        checkSongInfo(window)
    })
}