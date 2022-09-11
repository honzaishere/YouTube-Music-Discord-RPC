module.exports.blockAds = async (window) => {
    const { ElectronBlocker, fullLists } = require("@cliqz/adblocker-electron")
    const fetch = require("node-fetch")

    const blocker = await ElectronBlocker.fromLists(fetch, fullLists, {
        enableCompression: true
    })

    blocker.enableBlockingInSession(window.webContents.session)
}