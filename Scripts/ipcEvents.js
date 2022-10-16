const { navigatePageBack } = require("./Events/navigatePageBack")
const { log } = require("./logger")

module.exports.setupIPCRemote = () => {
    navigatePageBack()

    log(`ipcEvents: ipcRemote has been started`)
}