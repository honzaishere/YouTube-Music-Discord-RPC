let app_tray = null

const electron = require("electron");
const path = require("path");
const {setLastSongInfo} = require("../../../SongInfoManager");

module.exports.addTray = (window) => {
    if(app_tray !== null) return

    const tray = new electron.Tray(path.join(__dirname, "..", "..", "..", "..", "..", "icons", "tray.png"))
    const menu = new electron.Menu.buildFromTemplate([
        {
            label: "Quit", click: () => {
                window.webContents.executeJavaScript(`
            document.querySelector("#movie_player").getCurrentTime().toString().split(".")[0]
        `).then(time => {
                    window.webContents.executeJavaScript(`document.querySelector("#movie_player").getVideoData()`).then(data => {
                        setLastSongInfo(time, data.list || undefined)
                        electron.app.quit()
                    })
                })
            }
        }
    ])

    tray.on("click", () => {
        window.show()
        window.focus()
    })

    tray.setContextMenu(menu)
    app_tray = tray
}

module.exports.destroyTray = () => {
    app_tray.destroy()
}