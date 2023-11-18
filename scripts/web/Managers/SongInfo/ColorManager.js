const changeColors = require("./ColorManager/changeColors")
const resetColors = require("./ColorManager/resetColors")
const setColors = require("./ColorManager/setColors")
const updateColors = require("./ColorManager/updateColors")

module.exports.changeColors = (window, url) => { changeColors(window, url) }
module.exports.resetColors = (window) => { resetColors(window) }
module.exports.setColors = (window, videoMode, playerInfo) => { setColors(window, videoMode, playerInfo) }
module.exports.updateColors = (window) => { updateColors(window) }