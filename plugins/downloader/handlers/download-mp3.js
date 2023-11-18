const downloadMP3 = require("../functions/downloadMP3")

module.exports = () => {
    const { browserWindow } = require("../../../Index")
    downloadMP3(browserWindow)
}