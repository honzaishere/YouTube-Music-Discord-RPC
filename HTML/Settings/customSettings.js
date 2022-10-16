module.exports.insertCustomSettings = () => {
    const categories = document.querySelector("#content > ytmusic-settings-page > div.content.style-scope.ytmusic-settings-page")
    const customSettings = document.createElement("custom-settings")
    categories.appendChild(customSettings)
    customSettings.classList.add("category-menu-item", "style-scope", "ytmusic-settings-page")
    customSettings.tabIndex = "-1"
    customSettings.ariaDisabled = false
    customSettings.setAttribute("style-target", "host")
}