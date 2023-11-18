module.exports.load = (ipcMain, window) => {
    ipcMain.on("navigate-page-back", () => {
        window.webContents.executeJavaScript(`
            if(navigation.canGoBack) {
                navigation.back()
            }
        `)
    })
}