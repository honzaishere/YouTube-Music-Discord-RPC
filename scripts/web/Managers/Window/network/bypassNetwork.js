const {windows} = require("electron-is");
module.exports = (window) => {
    // User agents
    const oldUserAgent = window.webContents.userAgent;

    // User agents prepared for different OSes
    const userAgents = {
        windows: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    }

    const sec_ch_ua = `"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"`

    // Happens when our session is about to send request
    window.webContents.session.webRequest.onBeforeSendHeaders((details, cb) => {
        // If URL is for Google accounts
        if (window.webContents.getURL().startsWith('https://accounts.google.com') && details.url.startsWith('https://accounts.google.com')) {
            // Keep the old headers
            details.requestHeaders['User-Agent'] = oldUserAgent;
        } else {
            // If platform is Windows, change the headers (Linux and Mac not supported yet)
            if (windows()) {
                details.requestHeaders['User-Agent'] = userAgents["windows"]
                details.requestHeaders['Sec-Ch-Ua'] = sec_ch_ua
            }
        }

        // Send the callback
        cb({requestHeaders: details.requestHeaders});
    });
}