module.exports = (window, playerInfo) => {
    window.webContents.executeJavaScript(`
        var trusted_policy = trustedTypes.createPolicy("myPolicy", {
            createHTML: (string) => {
                return string;
            }
        })
    
        document.querySelector("#fullscreen_img").setAttribute("src", document.querySelector("#song-image > yt-img-shadow > img").src)
        document.querySelector("#song_title_fullscreen").innerHTML = trusted_policy.createHTML("${playerInfo.playerResponse.videoDetails.title}")
        document.querySelector("#song_author_fullscreen").innerHTML = trusted_policy.createHTML("${playerInfo.playerResponse.videoDetails.author}")
    `)
}