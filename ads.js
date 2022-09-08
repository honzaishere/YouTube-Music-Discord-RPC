const { ElectronBlocker } = require("@cliqz/adblocker-electron")
const fetch = require("node-fetch")

const path = require("path")
const { promises } = require("fs")

const urls = [
    "https://raw.githubusercontent.com/kbinani/adblock-youtube-ads/master/signed.txt",
	"https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt",
	"https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters-2021.txt",
	"https://secure.fanboy.co.nz/fanboy-annoyance_ubo.txt",
]

this.blocker = (
	session,
	cache = true,
	additionalBlockLists = [],
	disableDefaultLists = false
) => {
	const cachingOptions = { path: path.resolve(__dirname, "ad-blocker-engine.bin"), read: promises.readFile, write: promises.writeFile }

	ElectronBlocker.fromLists(
		fetch,
		urls,
		{
			loadNetworkFilters: session,
		},
		cachingOptions
	)
    .then((blocker) => blocker.enableBlockingInSession(session))
    .catch((err) => console.log("Error loading adBlocker engine", err));
    console.log("blocking ads")
};