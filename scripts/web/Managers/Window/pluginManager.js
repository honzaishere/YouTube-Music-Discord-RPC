const loadPlugins = require("./plugins/loadPlugins")
const preloadPlugins = require("./plugins/preloadPlugins")

module.exports.loadPlugins = (window) => { loadPlugins(window) }
module.exports.preloadPlugins = (window) => { preloadPlugins(window) }