module.exports = (window) => {
    if (!window.webContents.getURL().startsWith("https://music.youtube.com/")) return
    // Player Bar modification
    window.webContents.insertCSS(`ytmusic-app-layout[player-visible_] > [slot=player-bar], ytmusic-app-layout[player-visible_] #player-bar-background.ytmusic-app-layout {transform: none}`)
    window.webContents.insertCSS(`ytmusic-app-layout > [slot=player-bar], #player-bar-background.ytmusic-app-layout {bottom: 0.5% !important;left: 50% !important;width: 90% !important;transform: translate(-50%) !important;border: 2px transparent;border-radius: 5px;}`)
    window.webContents.insertCSS(`.middle-controls.ytmusic-player-bar {justify-content:none !important;}`)
    window.webContents.insertCSS(`ytmusic-player-bar:hover #progress-bar.ytmusic-player-bar {--paper-slider-knob-color: #fff !important;--paper-slider-knob-start-color: #fff !important;--paper-slider-knob-start-border-color: #fff !important;}`)
    window.webContents.insertCSS(`#progress-bar.ytmusic-player-bar {--paper-slider-active-color:#fff !important}`)

    // Change "youtubered" to white
    window.webContents.insertCSS(`html {--ytmusic-color-youtubered: #fff !important;--ytmusic-play-button-loading-indicator-color: #fff !important;--ytmusic-setting-item-toggle-active: #fff !important}`)

    // Spinner bar color setting to white
    window.webContents.insertCSS(`.spinner-layer.tp-yt-paper-spinner-lite { color: #ffffff !important}`)

    // White logo
    window.webContents.executeJavaScript(`document.querySelector("#left-content > a > picture:nth-child(1) > source:nth-child(1)").srcset = 'https://music.youtube.com/img/white_logo.svg'`).catch(err => { if (err) return })
    window.webContents.executeJavaScript(`document.querySelector("#left-content > a > picture:nth-child(1) > source:nth-child(2)").srcset = 'https://music.youtube.com/img/white_logo.svg'`).catch(err => { if (err) return })
    window.webContents.executeJavaScript(`document.querySelector("#left-content > a > picture:nth-child(1) > img").src = 'https://music.youtube.com/img/white_logo.svg'`).catch(err => { if (err) return })

    // Set "Playback Speed" title to "Playback Speed [Experiment]"
    window.webContents.executeJavaScript('document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer").title = document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer").title + " [Experiment]"')

    // Fix queue songs by forcing them to be draggable and enabled
    window.webContents.insertCSS("ytmusic-player-queue:not([is-select-autoplay-item-enabled]) #automix-contents.ytmusic-player-queue {pointer-events: auto !important;}")

    // Button animations
    window.webContents.insertCSS("ytmusic-pivot-bar-item-renderer {transition: 0.3s ease;}")
    window.webContents.insertCSS("tp-yt-paper-icon-button.ytmusic-search-box, input.ytmusic-search-box, input.ytmusic-search-box::placeholder {transition: 0.3s ease;}")
    window.webContents.insertCSS("#placeholder.ytmusic-search-box {transition: 0.3s ease;}")
    window.webContents.insertCSS("ytmusic-search-suggestion {transition: 0.3s ease}")
    window.webContents.insertCSS("ytmusic-chip-cloud-chip-renderer:not([chip-style=STYLE_PRIMARY]):not([chip-style=STYLE_SECONDARY]):not([chip-style=STYLE_LARGE_TRANSLUCENT_AND_SELECTED_WHITE]):not([is-selected]):not([enable-bauhaus-style]) a.ytmusic-chip-cloud-chip-renderer, ytmusic-chip-cloud-chip-renderer[chip-style=STYLE_DEFAULT]:not([enable-bauhaus-style]) a.ytmusic-chip-cloud-chip-renderer {transition: 0.3s ease}")
    window.webContents.insertCSS(".sign-in-link.ytmusic-nav-bar {transition: 0.3s ease !important;}")
    window.webContents.insertCSS(".sign-in-link.ytmusic-nav-bar:hover {background:#ffffff80 !important;}")
    window.webContents.insertCSS("tp-yt-iron-icon {transition: 0.3s ease !important;}")
    window.webContents.insertCSS("tp-yt-iron-icon:hover {fill:white;}")
    window.webContents.insertCSS("tp-yt-paper-tab {transition: 0.3s ease}")
    window.webContents.insertCSS("tp-yt-paper-tab:hover {color:white !important;}")
    window.webContents.insertCSS("tp-yt-paper-iron-icon {transition: 0.3s ease !important;}")
    window.webContents.insertCSS("tp-yt-paper-iron-icon:hover {fill:#ffffff80;}")
    window.webContents.insertCSS(`document.querySelector("#left-content") {user-select:none;}`)
    window.webContents.insertCSS(`document.querySelector("#layout > ytmusic-nav-bar > div.center-content.style-scope.ytmusic-nav-bar > ytmusic-pivot-bar-renderer") {user-select:none;}`)
    window.webContents.insertCSS(`ytmusic-pivot-bar-item-renderer.ytmusic-pivot-bar-renderer {user-select:none;}`)

    // Player sidebar modification
    window.webContents.insertCSS(`.side-panel.ytmusic-player-page {border-radius:15px;background-color: var(--ytmusic-brand-background-solid);margin-bottom:1% !important}`)
    window.webContents.insertCSS(`.footer.ytmusic-description-shelf-renderer {display: none !important;}`)
    window.webContents.insertCSS(`.autoplay.ytmusic-tab-renderer {margin-left:4% !important}`)
    window.webContents.insertCSS(`ytmusic-player-queue.ytmusic-tab-renderer {margin-left:2%;margin-bottom:1%;}`)
    window.webContents.insertCSS(`.duration.ytmusic-player-queue-item {margin-right:2%}`)
    window.webContents.insertCSS(`#contents.ytmusic-section-list-renderer {margin-left:2%}`)

    // Menu popup rounded corners
    window.webContents.insertCSS(`tp-yt-paper-listbox.ytmusic-menu-popup-renderer {border-radius: 25px !important}`)

    // Account Management Recoloring
    window.webContents.insertCSS(`ytd-multi-page-menu-renderer.ytmusic-popup-container {--yt-spec-call-to-action: #ffffff80 !important;--yt-endpoint-hover-color: #ffffff80 !important;} `)

    // Account Menu changing
    window.webContents.insertCSS(`ytd-compact-link-renderer {transition:ease 0.3s}`)

    // Hover time disabling
    window.webContents.insertCSS(`#hover-time-info.ytmusic-player-bar {display:none !important}`)

    // Play/Pause controls recolor
    window.webContents.insertCSS(`.left-controls.ytmusic-player-bar tp-yt-paper-icon-button.ytmusic-player-bar, .left-controls.ytmusic-player-bar .spinner-container.ytmusic-player-bar, .toggle-player-page-button.ytmusic-player-bar`)

    // Make lyrics unselectable so they can't be copied etc...
    window.webContents.insertCSS("ytmusic-description-shelf-renderer:not([has-strapline_]) .description.non-expandable.ytmusic-description-shelf-renderer {user-select:none;}")

    // TV Cast Button remove
    window.webContents.executeJavaScript(`if(document.querySelector("#right-content > ytmusic-cast-button > tp-yt-paper-button")) {document.querySelector("#right-content > ytmusic-cast-button > tp-yt-paper-button").remove()}`).catch(err => { if (err) return })
    
    // Page Menu rewrite
    window.webContents.insertCSS(`ytd-multi-page-menu-renderer.ytmusic-popup-container {border:2px transparent;borderRadius:25px}`)
    window.webContents.insertCSS(`ytmusic-dialog {border: 2px solid #4e4e4e !important;border-radius: 25px !important;}`)
    window.webContents.insertCSS(`.category-menu-item.iron-selected.ytmusic-settings-page { background:#4e4e4e !important }`)
    window.webContents.insertCSS(`.category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:#4e4e4e !important }`)
    window.webContents.insertCSS(`ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid #4e4e4e !important }`)

    // FullScreen controls rewrite
    window.webContents.insertCSS(`ytmusic-app-layout[player-fullscreened_] > [slot=player-bar] {background:#00000096 !important}`)

    // Buttons
    window.webContents.insertCSS(`ytmusic-menu-renderer:not([enable-bauhaus-style]) yt-button-renderer.watch-button.ytmusic-menu-renderer { transition: 0.3s ease }`)
    window.webContents.insertCSS(`ytmusic-menu-renderer:not([enable-bauhaus-style]) yt-button-renderer.watch-button.ytmusic-menu-renderer:hover { background-color:#ffffff80 !important }`)

    window.webContents.insertCSS(`#top-level-buttons.ytmusic-menu-renderer>.ytmusic-menu-renderer:not(:first-child) { color: black !important;background-color:white !important;transition: 0.3s ease }`)
    window.webContents.insertCSS(`#top-level-buttons.ytmusic-menu-renderer>.ytmusic-menu-renderer:not(:first-child):hover { background-color:#ffffff80 !important; border: 1px solid #ffffff80 !important }`)
    window.webContents.insertCSS(`yt-button-renderer #button.yt-button-renderer {color: black !important}`)
    return
}