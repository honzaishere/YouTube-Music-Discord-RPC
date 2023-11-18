module.exports.load = (window) => {
    window.webContents.executeJavaScript(`
        // This creates our MutationObserver() which will get disconnected after receiving our playlist section and will set that section's id to "playlists"
        let PlaylistsObserver = new MutationObserver(() => {
            // If our playlist section exists, continue with the code
            if(document.querySelector("ytmusic-guide-renderer > #sections > ytmusic-guide-section-renderer:nth-child(2) > #items")) {
                // Disconnect our observer
                PlaylistsObserver.disconnect()
                
                // Set id of playlist container to "playlists" so we can edit it with div#playlists CSS
                document.querySelector("ytmusic-guide-renderer > #sections > ytmusic-guide-section-renderer:nth-child(2) > #items").id = "playlists"
            }
        })
        
        // This waits for an change occuring inside of guide renderer's sections so we can find then our guide-section-renderer
        PlaylistsObserver.observe(document.querySelector("ytmusic-guide-renderer > #sections"), { attributes: true, childList: true, subtree: true })
    `)
}