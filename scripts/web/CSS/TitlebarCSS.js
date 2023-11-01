module.exports.info = {
    name: "TitlebarCSS"
}

module.exports.load = (window) => {
    window.webContents.insertCSS(`
    .titlebar {background: transparent;top: 0%;height: 32px;width: 100%;position: fixed;app-region:drag;color: #fff}
    header {z-index: 104 !important}
    #window-controls {display: grid;grid-template-columns: repeat(3, 46px);position: absolute;top: 0;right: 0;height: 100%;}
    #window-controls .button {grid-row: 1 / span 1;display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;}
    #window-controls-left {display: grid;grid-template-columns: repeat(3, 46px);position: absolute;top: 0;left: 0;height: 100%;}
    #window-controls-left .button {grid-row: 1 / span 1;display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;}
    #min-button {grid-column: 1;}
    #max-button, #restore-button {grid-column: 2;}
    #close-button {grid-column: 3;}
    @media (-webkit-device-pixel-ratio: 1.5), (device-pixel-ratio: 1.5),(-webkit-device-pixel-ratio: 2), (device-pixel-ratio: 2),(-webkit-device-pixel-ratio: 3), (device-pixel-ratio: 3) { #window-controls .icon { width: 10px;height: 10px;} }
    #window-controls {-webkit-app-region: no-drag;}
    #window-controls .button {user-select: none;transition: 0.3s ease}
    #window-controls .button:hover {background: rgba(255,255,255,0.1);}
    #window-controls .button:active {background: rgba(255,255,255,0.2);}
    #window-controls-left .button:active {background: rgba(255,255,255,0.2);}
    #window-controls #close-button:hover {background: #E81123 !important;}
    #window-controls #close-button:active {background: #F1707A !important;}
    #window-controls #close-button:active .icon {filter: invert(1);}
    #restore-button {display: none !important;}
    #window-controls-left .button {user-select: none;transition: 0.3s ease}
    #window-controls-left .button:hover {background: rgba(255,255,255,0.1)}
    #window-controls-left {app-region: no-drag;}
    .maximized #titlebar {width: 100%;padding: 0;} .maximized #restore-button {display: flex !important;} .maximized #max-button {display: none;}
    
    #nav-bar-background.ytmusic-app-layout { height: 96px !important }
    ytmusic-nav-bar.style-scope.ytmusic-app { top: 32px !important }
    .av.ytmusic-player-page { margin-top: 5px; }
    ytmusic-section-list-renderer.style-scope.ytmusic-browse-response { margin-top: 32px; }
    div#sections { margin-top: 32px; }
    ytmusic-tabs#tabs { margin-top: 32px; }
    .content.style-scope.ytmusic-tabbed-search-results-renderer { margin-top: 32px; }
    div#back-button img { width: 16px; }
    ytmusic-header-renderer.style-scope.ytmusic-browse-response {margin-top: 32px;}
    ytd-multi-page-menu-renderer div#container > div#sections {margin-top: 0px !important;}
    #nav-bar-background.ytmusic-app-layout { left: var(--ytmusic-guide-width) !important;}
    `)
}