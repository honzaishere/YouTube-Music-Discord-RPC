module.exports.load = (window) => {
    window.webContents.insertCSS(`
        .hidden { display: none }
    
        .plugins-menu {top: 0;position: fixed;width: 100%;height: 100%;background: black;}
        .plugins-title-menu {position: absolute;width: 100%;height: 10%;background: black}
        div#plugins-title {margin-top: 50px;}
        .plugins-title-menu h1 {position: relative;margin-left: 32px;top: 50%;transform: translate(-50%, 0%);font-size: 24px;font-family: "YouTube Sans";transform: translate(0, -50%);}
        div#plugins-options {position: absolute;top: 120px;width: 20%;height: 100%;background: black;}
    `)
}