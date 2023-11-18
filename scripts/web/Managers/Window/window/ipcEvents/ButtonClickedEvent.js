module.exports.load = (ipcMain) => {
    ipcMain.on("button-clicked", (e, [args]) => {
        handle(args)
    })

    function handle(args) {
        const data = args

        const plugin = require("../../../../../../plugins/" + data.plugin + "/Plugin")
        plugin.handle(data.for)
    }
}