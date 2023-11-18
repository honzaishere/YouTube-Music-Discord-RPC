const {updateColors} = require("../../../scripts/web/Managers/SongInfo/ColorManager");

module.exports = () => {
    const {browserWindow} = require("../../../Index");
    updateColors(browserWindow)
}