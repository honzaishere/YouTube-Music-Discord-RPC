module.exports.info = {
    include: "/channel"
}

module.exports.load = (window) => {
    window.webContents.insertCSS(`ytmusic-visual-header-renderer[is-bauhaus-sidenav-enabled] .content-container.ytmusic-visual-header-renderer { padding-left: 120px !important }`)
    window.webContents.insertCSS(`.metadata.ytmusic-visual-header-renderer { display: block !important }`)
}

module.exports.clear = (window) => {
    window.webContents.insertCSS(`ytmusic-visual-header-renderer[is-bauhaus-sidenav-enabled] .content-container.ytmusic-visual-header-renderer { padding-left: 240px !important }`)
    window.webContents.insertCSS(`.metadata.ytmusic-visual-header-renderer { display: flex !important }`)
}