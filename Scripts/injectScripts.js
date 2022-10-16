const { log } = require("./logger")

module.exports.injectScripts = (window) => {
    if (!window.webContents.getURL().startsWith("https://music.youtube.com/")) return

    // White logo
    window.webContents.executeJavaScript(`document.querySelector("#left-content > a > picture:nth-child(1) > source:nth-child(1)").srcset = 'https://music.youtube.com/img/white_logo.svg'`).catch(err => { if (err) return })
    window.webContents.executeJavaScript(`document.querySelector("#left-content > a > picture:nth-child(1) > source:nth-child(2)").srcset = 'https://music.youtube.com/img/white_logo.svg'`).catch(err => { if (err) return })
    window.webContents.executeJavaScript(`document.querySelector("#left-content > a > picture:nth-child(1) > img").src = 'https://music.youtube.com/img/white_logo.svg'`).catch(err => { if (err) return })

    // Set "Playback Speed" title to "Playback Speed [Experiment]"
    window.webContents.executeJavaScript('document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer").title = document.querySelector("#right-controls > div > ytmusic-playback-rate-renderer").title + " [Experiment]"')

    // Force to reset title to "YouTube Music"
    window.on("page-title-updated", () => {
        window.setTitle("YouTube Music")
    })

    window.on("enter-full-screen", () => {
        window.setMenuBarVisibility(false)
    })

    window.on("leave-full-screen", () => {
        window.setMenuBarVisibility(true)
    })
    log(`injectScripts: Injected scripts`)
}