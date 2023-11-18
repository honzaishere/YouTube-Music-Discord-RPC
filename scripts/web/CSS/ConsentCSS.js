module.exports.info = {
    name: "ConsentCSS"
}

module.exports.load = (window) => {
    window.webContents.insertCSS(`
    body#yDmH0d { background: #0e0e0e !important}
    .fBCs6c.nCP5yc { background: #0e0e0e !important }
    .gOOQJb { border: 0px solid transparent !important }
    .nYaTff, .BUCRj, .BUCRj>ul>p, .vrGRNc, .QawdBf { color: white !important }
    `)
}