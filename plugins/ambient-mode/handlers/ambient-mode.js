const {get, set} = require("../../../scripts/database/PluginManager");

module.exports.handle = () => {
    if(get("ambient-mode") === false) {
        set("ambient-mode", true)
        const drawCanvas = require("../functions/drawCanvas")
        drawCanvas()
        return
    }
    if(get("ambient-mode") === true) {
        set("ambient-mode", false)
        const clearCanvas = require("../functions/clearCanvas")
        clearCanvas()
    }
}