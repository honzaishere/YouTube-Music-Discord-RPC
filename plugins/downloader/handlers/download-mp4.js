const downloadMP4 = require("../functions/downloadMP4")

module.exports = () => {
    const { browserWindow } = require("../../../Index")
    downloadMP4.getCodecs(browserWindow)
}