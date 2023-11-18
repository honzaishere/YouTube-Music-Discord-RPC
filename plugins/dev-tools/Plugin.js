const { browserWindow } = require("../../Index")

module.exports = {
    handle: (setting) => {
        browserWindow.webContents.openDevTools({mode: "detach"})
    },
}