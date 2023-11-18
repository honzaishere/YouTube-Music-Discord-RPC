const injectAllStyles = require("./css/injectAllStyles")
const injectConsentStyles = require("./css/injectConsentStyles")

module.exports.injectAllStyles = (window) => { injectAllStyles(window) }
module.exports.injectConsentStyles = (window) => { injectConsentStyles(window) }