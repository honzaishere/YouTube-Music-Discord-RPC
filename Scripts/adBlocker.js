const { log } = require("./logger")

module.exports.blockAds = async (window) => {
    const { ElectronBlocker, fullLists, Request } = require("@cliqz/adblocker-electron")
    const fetch = require("node-fetch")

    const blocker = await ElectronBlocker.fromLists(fetch, fullLists, {
        enableCompression: true
    })

    blocker.enableBlockingInSession(window.session.defaultSession)

    blocker.on("request-blocked", (event) => {
        log(`adBlocker: Blocked request: ${event.url}`)
    })

    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(window.session.defaultSession)
        return log(`adBlocker: Engines were loaded`)
    })
}