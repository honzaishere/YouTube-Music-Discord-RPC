module.exports.load = (window) => {
    window.webContents.executeJavaScript(`
        const header = document.createElement("header")
        document.querySelector("ytmusic-app-layout").appendChild(header)
    
        header.id = "titlebar"
        header.classList.add("titlebar")
    
        const windowControls = document.createElement("div")
        header.appendChild(windowControls)
    
        windowControls.id = "window-controls"
    
        const windowControlsLeft = document.createElement("div")
        header.appendChild(windowControlsLeft)
    
        windowControlsLeft.id = "window-controls-left"
    
        const minButton = document.createElement("div")
        const maxButton = document.createElement("div")
        const restoreButton = document.createElement("div")
        const closeButton = document.createElement("div")
        const backButton = document.createElement("div")
    
        windowControls.appendChild(minButton)
        windowControls.appendChild(maxButton)
        windowControls.appendChild(restoreButton)
        windowControls.appendChild(closeButton)
    
        windowControlsLeft.appendChild(backButton)
    
        minButton.id = "min-button"
        minButton.classList.add("button")
        maxButton.id = "max-button"
        maxButton.classList.add("button")
        restoreButton.id = "restore-button"
        restoreButton.classList.add("button")
        closeButton.id = "close-button"
        closeButton.classList.add("button")
        closeButton.classList.add("close-button")
    
        backButton.id = "back-button"
        backButton.classList.add("button")
    
        const img = document.createElement("img")
        const img2 = document.createElement("img")
        const img3 = document.createElement("img")
        const img4 = document.createElement("img")
    
        const img5 = document.createElement("img")
    
        minButton.appendChild(img)
        maxButton.appendChild(img2)
        restoreButton.appendChild(img3)
        closeButton.appendChild(img4)
        backButton.appendChild(img5)
    
        img.draggable = false
        img2.draggable = false
        img3.draggable = false
        img4.draggable = false
        img5.draggable = false
    
        img.srcset = \`https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/min-w-10.png 1x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/min-w-12.png 1.25x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/min-w-15.png 1.5x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/min-w-15.png 1.75x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/min-w-20.png 2x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/min-w-20.png 2.25x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/min-w-24.png 2.5x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/min-w-30.png 3x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/min-w-30.png 3.5x\`
        img2.srcset = \`https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/max-w-10.png 1x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/max-w-12.png 1.25x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/max-w-15.png 1.5x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/max-w-15.png 1.75x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/max-w-20.png 2x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/max-w-20.png 2.25x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/max-w-24.png 2.5x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/max-w-30.png 3x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/max-w-30.png 3.5x\`
        img3.srcset = \`https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/restore-w-10.png 1x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/restore-w-12.png 1.25x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/restore-w-15.png 1.5x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/restore-w-15.png 1.75x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/restore-w-20.png 2x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/restore-w-20.png 2.25x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/restore-w-24.png 2.5x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/restore-w-30.png 3x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/restore-w-30.png 3.5x\`
        img4.srcset = \`https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/close-w-10.png 1x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/close-w-12.png 1.25x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/close-w-15.png 1.5x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/close-w-20.png 2x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/close-w-20.png 2.25x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/close-w-24.png 2.5x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/close-w-30.png 3x, https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/close-w-30.png 3.5x\`
        img5.srcset = \`https://raw.githubusercontent.com/honzawashere/YouTube-Music/new/icons/back.png\`
    `)
}