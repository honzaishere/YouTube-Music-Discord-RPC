const { reloadUnsuccessful } = require("../Scripts/handleOffline");

function offlineReload() {
    console.log("offlineReload() called")
    if(navigator.onLine == false) {
        reloadUnsuccessful()
    }
}