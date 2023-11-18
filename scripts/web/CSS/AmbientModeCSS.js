module.exports.load = (window) => {
    window.webContents.insertCSS(`
        .ambient-mode-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: block; filter: blur(100px); z-index: -2; }
    `)
}