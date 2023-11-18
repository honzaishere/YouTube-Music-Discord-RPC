const {addTray, destroyTray} = require("./window/tray");
const handleURLChange = require("./window/urlChange")

module.exports.addTray = (window) => { addTray(window) }
module.exports.destroyTray = () => { destroyTray() }
module.exports.handleURLChange = (window, url) => { handleURLChange(window, url) }