const electron = require("electron");
const path = require("path");

module.exports.load = (ipcMain, window) => {
    ipcMain.on("rate-limited", () => {
        electron.dialog.showMessageBox({
            title: "Oops...",
            message: "You are rate limited. The app should work well in next 100 seconds. You should prevent yourself from relaunching the app too much.",
            buttons: ["OK"],
            icon: path.join(__dirname, "..", "..", "..", "..", "..", "icons", "tray.png")
        })
    })
}