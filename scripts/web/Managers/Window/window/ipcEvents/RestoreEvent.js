module.exports.load = (ipcMain, window) => {
    ipcMain.on("restore", () => {
        window.unmaximize()
    })
}