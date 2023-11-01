module.exports.load = (window) => {
    window.webContents.insertCSS(`
        .hidden { display: none }
        .plugins-menu {top: 0;position: fixed;width: 100%;height: 100%;z-index: 103;background: #000000b3;}
        .plugins-dialog {position: fixed;top: 50%;left: 50%;width: 50%;height: 50%;background:var(--ytmusic-track-color1);transform: translate(-50%,-50%);border:1px solid transparent;border-radius: 8px;}
        .plugins-title {height: 15%; border-bottom: 1px solid white; padding: 0px 20px;padding-bottom: 0;height: 10%;}
        .plugins-title h1 {font-size: 20px !important;color:white;font-family: 'Roboto';font-weight: 400;position:relative;margin:0;color:white;border-bottom:white;width:fit-content;margin-top:15px}
        .close-menu {width: 24px;height: 24px;position: absolute;top:10px;right:20px}
        .plugins-options {color: white;font-family: 'Roboto';position: absolute;top: 15%;bottom: 0;width: 20%;border-right: 1px solid white}
        .option {width: 100%;margin: auto;height: 48px;}
        .option:hover {background: #ffffffb3;color:var(--ytmusic-track-color1);cursor: pointer;}
        .option-selected { background:#ffffffa6;color:var(--ytmusic-track-color1);}
        .option h1 {font-size: 15px;font-weight: 400;margin: 0;position: relative;top: 50%;transform: translate(20px,-50%);}
        .tab {position: absolute;top: 15%;bottom: 0;left: 20%;right: 0;}
        .tabc {padding: 0 20px !important;height: 100%;overflow-y: scroll;}
        .section h1 {color: white;border-bottom: 1px solid white;}
        .setting {color: white;position:relative;}
        .setting h1 {border-bottom: none;font-weight: 400;padding-bottom:5px;position:relative;width:fit-content}
        .setting h2 {border-bottom: none;font-weight: 400;position:relative;width:fit-content;max-width:80%}
        .toggle-line {background: var(--ytmusic-track-color2);width: 50px;height: 25px;border: 1px solid white;position: absolute;right:25px;border-radius:30px}
        .toggle-button:hover {cursor:pointer;}
        .close-menu:hover {cursor:pointer;}
        .toggle-button {position: relative;background:white;width: 25px;height: 25px;border-radius: 20px;left:0;}
        .toggle-button[enabled] {position: relative;left:25px}
        .section {padding-top: 20px;}
        .tabc::-webkit-scrollbar { width: 8px; background:var(--ytmusic-track-color1);}
        .tabc::-webkit-scrollbar-thumb {width: 8px;background:white;border:1px solid transparent;border-radius:20px}
        .clickable:hover { cursor: pointer; text-decoration: underline; }
        .premium-disabled { color: grey !important }
        .premium-disabled .toggle-line {display:none;}
        .premium-disabled .toggle-button {display:none;}
        .premium-disabled h1 {color: grey !important;}
        .close-menu img {position: relative;top: 50%;left: 50%;transform: translate(-50%,-50%);}
   `)
}