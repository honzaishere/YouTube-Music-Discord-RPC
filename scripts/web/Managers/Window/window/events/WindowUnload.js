module.exports.load = (window) => {
    window.webContents.on("will-prevent-unload", (event) => {
        event.preventDefault()
    })
}