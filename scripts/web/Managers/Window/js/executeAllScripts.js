module.exports = (window) => {
    const TitlebarJS = require("../../../JS/TitlebarJS");
    const BackgroundJS = require("../../../JS/BackgroundJS");
    const BetterFullscreenJS = require("../../../JS/BetterFullscreenJS")

    const {get} = require("../../../../database/PluginManager");

    TitlebarJS.load(window);
    BackgroundJS.load(window);

    if (get("disable-better-fullscreen") === true) {
        BetterFullscreenJS.load(window)
    }
}