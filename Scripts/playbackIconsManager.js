const { playerDatabase } = require("./databaseManager")
const path = require("path");
const { nativeImage } = require("electron");
const { log } = require("./logger");

module.exports.setIcons = (window) => {
	if(playerDatabase.get("state") == 1 || playerDatabase.get("state") == 2) {
		window.setThumbarButtons([
			{
				tooltip: 'Previous',
				icon: nativeImage.createFromPath(path.join(__dirname, "Icons", 'Backward.png')),
				click: () => { window.webContents.sendInputEvent({
					type: "keydown",
					keyCode: "k",
				})}
			}, {
				tooltip: 'Play/Pause',
				icon: playerDatabase.get("state") == 2 ? nativeImage.createFromPath(path.join(__dirname, "Icons", 'Play.png')) : nativeImage.createFromPath(path.join(__dirname, "Icons", 'Pause.png')),
				click: () => { window.webContents.sendInputEvent({
					type: "keydown",
					keyCode: ";",
				})}
			}, {
				tooltip: 'Next',
				icon: nativeImage.createFromPath(path.join(__dirname, "Icons", 'Forward.png')),
				click: () => { window.webContents.sendInputEvent({
					type: "keydown",
					keyCode: "j",
				})}
			}
		]);
	}
}