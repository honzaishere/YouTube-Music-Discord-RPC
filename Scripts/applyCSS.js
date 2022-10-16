const { settingsDatabase } = require("./databaseManager")
const { log } = require("./logger")

module.exports.applyCSS = (window) => {
    window.webContents.insertCSS(`html, body {background: transparent !important; background-color:#0e0e0e !important; user-select:none !important}`)
    window.webContents.insertCSS(`.Ha17qf {background:#0e0e0e !important; border: 1px solid #1a1a1a !important}`)
    window.webContents.insertCSS(`.aMfydd .Tn0LBd {color: white !important}`)
    window.webContents.insertCSS(`.a2CQh {color: white !important}`)
    window.webContents.insertCSS(`.xyezD {color: white !important}`)
    window.webContents.insertCSS(`.BOs5fd {background: #0e0e0e !important; border: 1px solid #1a1a1a !important}`)
    window.webContents.insertCSS(`.FH0XAb {background: #0e0e0e !important}`)
    window.webContents.insertCSS(`.pYERqe { color: white !important}`)
    window.webContents.insertCSS(`.tXIHtc {background: #0e0e0e !important}`)
    window.webContents.insertCSS(`.tnNfDe {background: #0e0e0e !important;border: 1px solid #d5d5d5 !important }`)
    window.webContents.insertCSS(`.gu0k2c { color: white !important}`)
    window.webContents.insertCSS(`.G4njw {border: 1px solid #303030 !important}`)
    window.webContents.insertCSS(`.SGW9xe {color: white !important}`)
    window.webContents.insertCSS(`.cb7kab {color: white !important}`)
    window.webContents.insertCSS(`.Usd1Ac {background-color: #0e0e0e !important}`)
    window.webContents.insertCSS(`.SSPGKf {margin-top: 2% !important}`)
    
    if (settingsDatabase.get("HideAudioVideo")) {
        if (settingsDatabase.get("HideAudioVideo") == true) {
            window.webContents.insertCSS(`.av.ytmusic-player-page {display: none !important;}`)
            log("applyCSS: Audio/Video switcher - display: none !important;")
        }
    }

    if (settingsDatabase.get("HideMiniplayer")) {
        if (settingsDatabase.get("HideMiniplayer") == true) {
            window.webContents.insertCSS(`ytmusic-player[player-ui-state_=MINIPLAYER] { display: none !important}`)
            log("applyCSS: Miniplayer - display: none !important;")
        }
    }

    if (settingsDatabase.get("HideSignIn")) {
        if (settingsDatabase.get("HideSignIn") == true) {
            window.webContents.insertCSS(`.sign-in-link.ytmusic-nav-bar { display: none !important}`)
            log("applyCSS: Sign In button - display: none !important;")
        }
    }

    //
    // IMPORTANT CSS STARTS HERE
    //

    // Colors
    window.webContents.insertCSS(`body {background-color:#000000 !important} html {--ytmusic-brand-background-solid:#0e0e0e !important;--ytmusic-general-background-c:#000000 !important} ytmusic-tabs.stuck { background-color:#000000 !important;} ytmusic-dialog {background-color: #000000 !important;border: 2px solid #0e0e0e !important;border-radius: 25px !important;} .category-menu-item.iron-selected.ytmusic-settings-page { background:#0e0e0e !important } .category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:#0e0e0e !important } ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid #0e0e0e !important } ytmusic-app-layout[player-fullscreened_] > [slot=player-bar] {background:#0e0e0e !important} yt-confirm-dialog-renderer[dialog][dialog][dialog] {background:#0e0e0e !important;} tp-yt-paper-toast {background-color:#0e0e0e !important;} tp-yt-paper-dialog {background:#0e0e0e !important} ytmusic-nerd-stats { background-color: #0e0e0e !important}`)

    // Player Bar modification
    window.webContents.insertCSS(`ytmusic-app-layout[player-visible_] > [slot=player-bar], ytmusic-app-layout[player-visible_] #player-bar-background.ytmusic-app-layout {transform: none}`)
    window.webContents.insertCSS(`ytmusic-app-layout > [slot=player-bar], #player-bar-background.ytmusic-app-layout {bottom: 0.5% !important;left: 50% !important;width: 90% !important;transform: translate(-50%) !important;border: 2px transparent;border-radius: 5px;}`)
    window.webContents.insertCSS(`.middle-controls.ytmusic-player-bar {justify-content:none !important;}`)
    window.webContents.insertCSS(`ytmusic-player-bar:hover #progress-bar.ytmusic-player-bar {--paper-slider-knob-color: #fff !important;--paper-slider-knob-start-color: #fff !important;--paper-slider-knob-start-border-color: #fff !important;}`)
    window.webContents.insertCSS(`#progress-bar.ytmusic-player-bar {--paper-slider-active-color:#fff !important}`)
    window.webContents.insertCSS(`.slider-knob-inner.tp-yt-paper-slider { background-color: white !important; border: 2px solid white !important }`)
    window.webContents.insertCSS(`ytmusic-app-layout > [slot=player-bar], #player-bar-background.ytmusic-app-layout { bottom: 1% !important }`)
    window.webContents.insertCSS(`.time-info.ytmusic-player-bar { color: white !important }`)

    // Change "youtubered" to white
    window.webContents.insertCSS(`html {--ytmusic-color-youtubered: #fff !important;--ytmusic-play-button-loading-indicator-color: #fff !important;--ytmusic-setting-item-toggle-active: #fff !important}`)

    // Spinner bar color setting to white
    window.webContents.insertCSS(`.spinner-layer.tp-yt-paper-spinner-lite { color: #ffffff !important}`)

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
    window.webContents.insertCSS(`.side-panel.ytmusic-player-page {border-radius:15px;background-color: var(--ytmusic-brand-background-solid);margin-bottom:1.5% !important}`)
    window.webContents.insertCSS(`.footer.ytmusic-description-shelf-renderer {display: none !important;}`)
    window.webContents.insertCSS(`.autoplay.ytmusic-tab-renderer {margin-left:4% !important}`)
    window.webContents.insertCSS(`ytmusic-player-queue.ytmusic-tab-renderer {margin-left:2%;margin-bottom:1% !important;}`)
    window.webContents.insertCSS(`.duration.ytmusic-player-queue-item {margin-right:2% !important }`)
    window.webContents.insertCSS(`#contents.ytmusic-section-list-renderer {margin-left:2% !important}`)
    window.webContents.insertCSS(`.text.ytmusic-message-renderer, .subtext.ytmusic-message-renderer { color: #ffffffB3 !important;}`)
    window.webContents.insertCSS(`.duration.ytmusic-player-queue-item, .byline.ytmusic-player-queue-item { color: white !important;--yt-endpoint-color: white !important;--yt-endpoint-hover-color: white !important;}`)
    window.webContents.insertCSS(`.header-group.ytmusic-carousel-shelf-renderer {padding: 0px !important}`)
    window.webContents.insertCSS(`#contents.ytmusic-section-list-renderer>ytmusic-carousel-shelf-renderer.ytmusic-section-list-renderer:not(:last-child), #contents.ytmusic-section-list-renderer>ytmusic-immersive-carousel-shelf-renderer.ytmusic-section-list-renderer:not(:last-child) {margin-bottom: 0px !important}`)
    window.webContents.insertCSS(`.description.ytmusic-description-shelf-renderer {font-size: 15px !important;font-weight: 450 !important}`)

    // Lyrics
    window.webContents.insertCSS("ytmusic-description-shelf-renderer:not([has-strapline_]) .description.non-expandable.ytmusic-description-shelf-renderer {user-select: text; font-size: 16px !important; font-weight: 500 !important}")

    // Menu popup rounded corners
    window.webContents.insertCSS(`ytd-multi-page-menu-renderer {border-radius: 25px !important}`)
    window.webContents.insertCSS(`tp-yt-paper-listbox.ytmusic-menu-popup-renderer {border-radius: 25px !important}`)

    // Account menu icon
    window.webContents.insertCSS(`tp-yt-paper-icon-button.ytmusic-settings-button {width:30px !important;height:30px !important}`)

    // Account Management Recoloring
    window.webContents.insertCSS(`ytd-multi-page-menu-renderer.ytmusic-popup-container {--yt-spec-call-to-action: #ffffff80 !important;--yt-endpoint-hover-color: #ffffff80 !important;} `)

    // Account Menu changing
    window.webContents.insertCSS(`ytd-compact-link-renderer {transition:ease 0.3s}`)

    // Hover time disabling
    window.webContents.insertCSS(`#hover-time-info.ytmusic-player-bar {display:none !important}`)

    // TV Cast Button remove
    window.webContents.executeJavaScript(`if(document.querySelector("#right-content > ytmusic-cast-button > tp-yt-paper-button")) {document.querySelector("#right-content > ytmusic-cast-button > tp-yt-paper-button").remove()}`).catch(err => { if (err) return })

    // Page Menu rewrite
    window.webContents.insertCSS(`ytd-multi-page-menu-renderer.ytmusic-popup-container {border:2px transparent;borderRadius:25px}`)
    window.webContents.insertCSS(`ytmusic-dialog {border: 2px solid #4e4e4e !important;border-radius: 25px !important;}`)
    window.webContents.insertCSS(`.category-menu-item.iron-selected.ytmusic-settings-page { background:#4e4e4e !important }`)
    window.webContents.insertCSS(`.category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:#4e4e4e !important }`)
    window.webContents.insertCSS(`ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid #4e4e4e !important }`)
    window.webContents.insertCSS(`.dropdown-content.ytmusic-setting-single-option-menu-renderer {background: var(--ytmusic-general-background-c) !important}`)

    // FullScreen controls rewrite
    window.webContents.insertCSS(`ytmusic-app-layout[player-fullscreened_] > [slot=player-bar] {background:#00000096 !important}`)

    // Disable "Promo message asking you for buying Premium"
    window.webContents.insertCSS(`ytmusic-mealbar-promo-renderer[dialog][dialog][dialog] {display:none}`)

    // Confirm message style
    window.webContents.insertCSS(`yt-confirm-dialog-renderer[dialog][dialog][dialog] {color: white !important;}`)

    // Player
    window.webContents.insertCSS(`body {background-color:#000000 !important}`)
    window.webContents.insertCSS(`html {--ytmusic-brand-background-solid: rgb(12, 12, 12) !important;--ytmusic-general-background-c: #000000 !important;}`)
    window.webContents.insertCSS(`ytmusic-tabs.stuck { background-color:#000000 !important;}`)
    window.webContents.insertCSS(`ytmusic-dialog {background-color: #000000 !important;border: 2px solid transparent !important;border-radius: 25px !important;}`)
    window.webContents.insertCSS(`.category-menu-item.iron-selected.ytmusic-settings-page { background: #000000 !important}`)
    window.webContents.insertCSS(`.category-menu-item.ytmusic-settings-page:focus:not(.iron-selected) { background:#000000 !important }`)
    window.webContents.insertCSS(`ytmusic-setting-category-collection-renderer.ytmusic-settings-page { border-left: 1px solid #000000 !important }`)
    window.webContents.insertCSS(`.autoplay.ytmusic-player-queue {display: none;}`)

    // Texts/Featured buttons recolor if they are disabled
    window.webContents.insertCSS(`tp-yt-paper-tab.ytmusic-player-page[disabled] {color: #ffffff83 !important; cursor: pointer !important;}`)

    // Hide loading spinner
    window.webContents.insertCSS(`#spinnerContainer.cooldown.tp-yt-paper-spinner-lite {display: none !important;}`)
    window.webContents.insertCSS(`.loading-spinner.ytmusic-tab-renderer {display: none !important}`)

    // Make things unselectable
    window.webContents.insertCSS(`.header-group.ytmusic-carousel-shelf-renderer {user-select: none !important}`)
    window.webContents.insertCSS(`.carousel.ytmusic-carousel-shelf-renderer {user-select: none !important}`)
    window.webContents.insertCSS(`.content-info-wrapper.ytmusic-player-bar .byline.ytmusic-player-bar {user-select: none !important}`)
    window.webContents.insertCSS(`.content-info-wrapper.ytmusic-player-bar .title.ytmusic-player-bar {user-select: none !important}`)
    window.webContents.insertCSS(`.time-info.ytmusic-player-bar {user-select: none !important}`)
    window.webContents.insertCSS(`#main-panel.ytmusic-player-page {user-select: none !important}`)
    window.webContents.insertCSS(`.content.ytmusic-player-page {user-select: none !important}`)
    window.webContents.insertCSS(`.center-content.ytmusic-nav-bar {user-select: none !important}`)
    window.webContents.insertCSS(`ytmusic-app-layout { user-select: none }`)

    // Stats for nerds
    window.webContents.insertCSS(`ytmusic-player ytmusic-nerd-stats.ytmusic-player {transition: 0.3s ease !important; font-size: 14px; border: 1px solid transparent !important; border-radius: 15px !important; margin-top: 1% !important; margin-left: 1% !important; user-select: text !important; }`)
    window.webContents.insertCSS(`ytmusic-player ytmusic-nerd-stats.ytmusic-player:hover {opacity: 1}`)
    window.webContents.insertCSS(`ytmusic-nerd-stats .label.ytmusic-nerd-stats { width: 150px !important; font-weight: 750 !important }`)
    window.webContents.insertCSS(`ytmusic-nerd-stats .value.ytmusic-nerd-stats { width: 240px !important; }`)

    // Selection bars
    window.webContents.insertCSS(`.dropdown-content.ytmusic-dropdown-renderer {--paper-listbox-background-color:var(--ytmusic-general-background-c) !important}`)

    // Playlist form
    window.webContents.insertCSS(`ytmusic-playlist-form { border: 1px solid transparent; border-radius: 20px; }`)

    // Annoying elements in player
    window.webContents.insertCSS(`.ytp-chrome-top-buttons { display: none }`)
    window.webContents.insertCSS(`.ytp-autohide:not(.ytp-ad-overlay-open) .ytp-iv-player-content, .ytp-hide-controls .ytp-iv-player-content { display: none }`)

    // Artist page
    window.webContents.insertCSS(`.description.ytmusic-immersive-header-renderer {color: #ffffffb3 !important;font-weight: 500 !important}`)

    // Album / Playlist style
    window.webContents.insertCSS(`.fixed-column.ytmusic-responsive-list-item-renderer[size=MUSIC_RESPONSIVE_LIST_ITEM_FIXED_COLUMN_SIZE_SMALL] { text-align: center !important }`)
    window.webContents.insertCSS(`ytmusic-responsive-list-item-renderer[height-style_=MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_MEDIUM] { transition: 0.3s ease }`)
    window.webContents.insertCSS(`ytmusic-responsive-list-item-renderer[height-style_=MUSIC_RESPONSIVE_LIST_ITEM_HEIGHT_MEDIUM] { background: }`)

    // Text selection
    window.webContents.insertCSS(`::selection { color: white !important; background: var(--ytmusic-general-background-c) !important; }`)

    // Back button CSS
    window.webContents.insertCSS(`ytmusic-back-button {font-family: Roboto,Noto Naskh Arabic UI,Arial,sans-serif;font-size: 20px;line-height: var(--ytmusic-title-line-height);font-weight: 500;-yt-endpoint-color: #fff;--yt-endpoint-hover-color: #fff;--yt-endpoint-visited-color: #fff;display: inline-flex;align-items: center;color: rgba(255,255,255,0.5);cursor: pointer;margin: 0 22px;transition: 0.3s ease}`)
    window.webContents.insertCSS(`ytmusic-back-button:hover {color: #ffffff}`)

    // Playlist "Cancel" button fix
    window.webContents.insertCSS(`yt-button-renderer[dialog-dismiss] {margin-left: 1% !important;}`)

    // Margin all elements
    //window.webContents.insertCSS(`ytmusic-app-layout {margin-top: 2% !important}`)
    //window.webContents.insertCSS(`ytmusic-nav-bar {margin-top: 2% !important;background: var(--ytmusic-general-background-c) !important}`)
    //window.webContents.insertCSS(`#nav-bar-background.ytmusic-app-layout {margin-top: 32px !important;opacity: 1 !important}`)

    // Titlebar
    window.webContents.insertCSS(`header#titlebar {background: var(--ytmusic-general-background-c);top: 0%;height: 32px;width: 100%;position: fixed;app-region:drag;color: #fff;}`)
    window.webContents.insertCSS(`#window-controls {display: grid;grid-template-columns: repeat(3, 46px);position: absolute;top: 0;right: 0;height: 100%;} #window-controls .button {grid-row: 1 / span 1;display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;} #window-controls-left {display: grid;grid-template-columns: repeat(3, 46px);position: absolute;top: 0;left: 0;height: 100%;} #window-controls-left .button {grid-row: 1 / span 1;display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;} #min-button {grid-column: 1;} #max-button, #restore-button {grid-column: 2;} #close-button {grid-column: 3;}`)
    window.webContents.insertCSS(`@media (-webkit-device-pixel-ratio: 1.5), (device-pixel-ratio: 1.5),(-webkit-device-pixel-ratio: 2), (device-pixel-ratio: 2),(-webkit-device-pixel-ratio: 3), (device-pixel-ratio: 3) {#window-controls .icon {width: 10px;height: 10px;}}`)
    window.webContents.insertCSS(`#window-controls {-webkit-app-region: no-drag;} #window-controls .button {user-select: none;transition: 0.3s ease} #window-controls .button:hover {background: rgba(255,255,255,0.1) !important;} #window-controls .button:active {background: rgba(255,255,255,0.2);} #window-controls-left .button:active {background: rgba(255,255,255,0.2);} #close-button:hover {background: #E81123 !important;} #close-button:active {background: #F1707A !important;} #close-button:active .icon {filter: invert(1);} #restore-button {display: none !important;} #window-controls-left .button {user-select: none;transition: 0.3s ease} #window-controls-left .button:hover {background: rgba(255,255,255,0.1) !important;} #window-controls-left {app-region: no-drag;}`)
    window.webContents.insertCSS(`.maximized #titlebar {width: 100%;padding: 0;} .maximized #restore-button {display: flex !important;} .maximized #max-button {display: none;}`)

    // Pick artists to improve recommendations
    window.webContents.insertCSS(`.buttons.ytmusic-tastebuilder-renderer {background: var(--ytmusic-general-background-c) !important}`)

    // Audio Video switcher
    window.webContents.insertCSS(`.av-toggle.ytmusic-av-toggle {background: var(--ytmusic-general-background-c) !important}`)
    window.webContents.insertCSS(`.song-button.ytmusic-av-toggle, .video-button.ytmusic-av-toggle {background: var(--ytmusic-general-background-c) !important}`)
    window.webContents.insertCSS(`ytmusic-av-toggle[playback-mode=ATV_PREFERRED] .song-button.ytmusic-av-toggle {background: var(--ytmusic-brand-background-solid) !important}`)
    window.webContents.insertCSS(`ytmusic-av-toggle[playback-mode=OMV_PREFERRED] .video-button.ytmusic-av-toggle {background: var(--ytmusic-brand-background-solid) !important}`)

    // Main page "Same as" + "Start radio from"
    window.webContents.insertCSS(`.strapline.ytmusic-carousel-shelf-basic-header-renderer { color: white !important}`)

    // Rounded corners fixes
    window.webContents.insertCSS(`#items.ytmusic-menu-popup-renderer>.ytmusic-menu-popup-renderer:hover {border: 1px transparent; border-radius: 15px}`)

    // Custom settings for YouTube Music
    window.webContents.insertCSS(`custom-setting-boolean-renderer {display: block;padding: 20px 0;}`)
    window.webContents.insertCSS(`.items.ytmusic-setting-category-collection-renderer>*.ytmusic-setting-category-collection-renderer {border-bottom: 1px solid #4e4e4e;}`)

    // Keep fullscreen playbar shown
    window.webContents.insertCSS(`ytmusic-app-layout[player-fullscreened_] > [slot=player-bar] { opacity: 1 !important }`)

    log(`applyCSS: Applied YouTube Music page CSS`)
    return
}