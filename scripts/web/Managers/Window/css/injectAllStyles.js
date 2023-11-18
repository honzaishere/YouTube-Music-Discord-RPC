module.exports = (window) => {
    const {get} = require("../../../../database/PluginManager");

    const AmbientModeCSS = require("../../../CSS/AmbientModeCSS")
    const ColorChangerCSS = require("../../../CSS/ColorChangerCSS");
    const HomepageCSS = require("../../../CSS/HomepageCSS");
    const PlayerCSS = require("../../../CSS/PlayerCSS");
    const PlaylistsCSS = require("../../../CSS/PlaylistsCSS");
    const PluginsMenuCSS = require("../../../CSS/PluginsMenuCSS");
    const TitlebarCSS = require("../../../CSS/TitlebarCSS");
    const WhiteColorCSS = require("../../../CSS/WhiteColorCSS");
    const YouTubeSansCSS = require("../../../CSS/YouTubeSansCSS");
    const GamerModeCSS = require("../../../CSS/GamerModeCSS");

    AmbientModeCSS.load(window)
    ColorChangerCSS.load(window);
    HomepageCSS.load(window);
    PlayerCSS.load(window);
    PlaylistsCSS.load(window);
    PluginsMenuCSS.load(window);
    TitlebarCSS.load(window);
    WhiteColorCSS.load(window);

    if (get("disable-yt-sans") === false) {
        YouTubeSansCSS.load(window);
    }

    GamerModeCSS.load(window);
}