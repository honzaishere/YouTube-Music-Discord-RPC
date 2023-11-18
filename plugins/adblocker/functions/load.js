module.exports = (window) => {
    const {ElectronBlocker} = require("@cliqz/adblocker-electron");
    const {fetch} = require("node-fetch");
    const fs = require("fs/promises");
    const blocker = ElectronBlocker.fromPrebuiltAdsAndTracking(fetch, {
        path: 'adblocker.bin',
        read: fs.readFile,
        write: fs.writeFile,
    }).then((blocker) => {
        blocker.enableBlockingInSession(window.webContents.session);
    })
}