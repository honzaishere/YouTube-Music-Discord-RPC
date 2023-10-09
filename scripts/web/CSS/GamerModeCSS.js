module.exports.info = {
    name: "GamerModeCSS"
}

module.exports.load = (window) => {
    window.webContents.insertCSS(`
        .gamer-mode { display: none !important; }
    `)
}