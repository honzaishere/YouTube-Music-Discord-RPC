module.exports = (window, url) => {
    const PlaylistJS = require("../../../JS/PlaylistJS");
    const ChannelJS = require("../../../JS/ChannelJS");

    if (url.includes(PlaylistJS.info.include)) return PlaylistJS.load(window)
    if (!url.includes(PlaylistJS.info.include)) PlaylistJS.clear(window)
    if (url.includes(ChannelJS.info.include)) ChannelJS.load(window)
}