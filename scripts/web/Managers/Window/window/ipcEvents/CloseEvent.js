const {get} = require("../../../../../database/PluginManager");
const {setLastSongInfo} = require("../../../../SongInfoManager");
const electron = require("electron")

module.exports.load = (ipcMain, window) => {
    ipcMain.on("close", () => {
        if (get("close-background") === true) {
            window.hide()
        } else {
            window.webContents.executeJavaScript(`
            document.querySelector("#movie_player").getCurrentTime().toString().split(".")[0]
        `).then(time => {
                window.webContents.executeJavaScript(`document.querySelector("#movie_player").getVideoData()`).then(data => {
                    setLastSongInfo(time, data.list || undefined)
                    electron.app.quit()
                })
            })
        }
    })
}