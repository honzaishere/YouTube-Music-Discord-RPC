module.exports.info = {
    name: "PluginsMenuJS",
}

module.exports.load = (window) => {
    window.webContents.executeJavaScript(`
        const policy = trustedTypes.createPolicy("myPolicy", {
            createHTML: (string) => {
                return string;
            }
        })
        
        const div = document.createElement("div")
        const app_contents = document.getElementById("contents")
        div.classList.add("plugins-menu")
        div.classList.add("hidden")
        div.id = "plugins-menu"
        const div_title = document.createElement("div")
        div_title.id = "plugins-title"
        div_title.classList.add("plugins-title-menu")
        const div_content = document.createElement("div")
        div_content.classList.add("plugins-options")
        div_content.id = "plugins-options"
        div.appendChild(div_title)
        div.appendChild(div_content)
        const div_title_h1 = document.createElement("h1")
        div_title_h1.classList.add("plugins-title-menu")
        div_title_h1.innerHTML = policy.createHTML("App Settings")
        div_title.appendChild(div_title_h1)
        app_contents.appendChild(div)
    ;0`)
}