const {resetColors} = require("../../../scripts/web/Managers/SongInfo/ColorManager");

module.exports = () => {
    const {browserWindow} = require("../../../Index");
    resetColors(browserWindow)
}