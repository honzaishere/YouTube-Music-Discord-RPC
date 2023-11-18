const {setLastSongInfo} = require("../../../../SongInfoManager");
const electron = require("electron");

module.exports.load = (window) => {
    window.on("close", () => {
        window.webContents.executeJavaScript(`
            document.querySelector("#movie_player").getCurrentTime().toString().split(".")[0]
        `).then(time => {
            window.webContents.executeJavaScript(`document.querySelector("#movie_player").getVideoData()`).then(data => {
                setLastSongInfo(time, data.list || undefined)
                electron.app.quit()
            })
        })
    })
}