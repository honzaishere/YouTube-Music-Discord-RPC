const {getSongInfo} = require("../../scripts/web/SongInfoManager");
const {join} = require("path");
const {rmSync} = require("fs");
const child_process = require("child_process");
const path = require("path");

module.exports = {
    handle: (option) => {
        const PluginOption = require("./handlers/" + option)
        PluginOption()
    },
    preload: () => {},
    enable: () => {},
    disable: () => {}
}