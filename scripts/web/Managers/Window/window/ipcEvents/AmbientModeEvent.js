const {get} = require("../../../../../database/PluginManager");

module.exports.load = (ipcMain, window) => {
    ipcMain.on("ambient-mode", () => {
        if(get("ambient-mode") === false) return
        const drawCanvas = require("../../../../../../plugins/ambient-mode/functions/drawCanvas")
        drawCanvas()
    })
}