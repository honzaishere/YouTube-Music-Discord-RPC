module.exports.load = (window) => {

    window.webContents.executeJavaScript(`
        const policy = trustedTypes.createPolicy("myPolicy", {
            createHTML: (string) => {
                return string;
            }
        })
               
        const div = document.createElement("div")
        div.classList.add("plugins-menu")
        div.classList.add("hidden")
        div.id = "plugins-menu"

        const div_dialog = document.createElement("div")
        div_dialog.classList.add("plugins-dialog")
        div_dialog.id = "plugins-dialog"

        const div_title = document.createElement("div")
        div_title.classList.add("plugins-title")
        
        const div_close = document.createElement("div")
        div_close.classList.add("close-menu")
        
        div_close.onclick = () => {
            document.querySelector("#plugins-menu").classList.add("hidden")
        }
                
        const div_close1 = document.createElement("img")
        div_close1.setAttribute("height", "24")
        div_close1.setAttribute("width", "24")
        div_close1.setAttribute("src", "https://raw.githubusercontent.com/honzawashere/YouTube-Music/old/Icons/close.png")

        const div_title_h1 = document.createElement("h1")
        div_title_h1.innerHTML = policy.createHTML("App Settings")
        div_title.appendChild(div_title_h1)

        const div_content = document.createElement("div")
        div_content.classList.add("plugins-options")
        div_content.id = "plugins-options"

        const div_options = document.createElement("div")
        div_options.id = "options"
        div_options.classList.add("options")

        const option1 = document.createElement("div")
        option1.id = "option1"
        option1.classList.add("option")
        option1.classList.add("option-selected")

        const option1title = document.createElement("h1")
        option1title.innerHTML = policy.createHTML("Plugins")

        const option2 = document.createElement("div")
        option2.id = "option2"
        option2.classList.add("option")

        const option2title = document.createElement("h1")
        option2title.innerHTML = policy.createHTML("Developer")
        
        const tab1 = document.createElement("div")
        tab1.id = "tab1"
        tab1.classList.add("tab")
        
        const tab2 = document.createElement("div")
        tab2.id = "tab2"
        tab2.classList.add("tab")
        tab2.classList.add("hidden")
        
        const tab3 = document.createElement("div")
        tab3.id = "tab3"
        tab3.classList.add("tab")
        tab3.classList.add("hidden")
        
        const tab1c = document.createElement("div")
        tab1c.id = "tab1c"
        tab1c.classList.add("tabc")
        
        const tab2c = document.createElement("div")
        tab2c.id = "tab2c"
        tab2c.classList.add("tabc")
        
        const tab3c = document.createElement("div")
        tab3c.id = "tab3c"
        tab3c.classList.add("tabc")

        div.appendChild(div_dialog)
        div_dialog.appendChild(div_title)
        div_title.appendChild(div_close)
        div_close.appendChild(div_close1)
        div_dialog.appendChild(div_content)
        div_content.appendChild(div_options)
        div_options.appendChild(option1)
        div_options.appendChild(option2)
        option1.appendChild(option1title)
        option2.appendChild(option2title)
        div_dialog.appendChild(tab1)
        div_dialog.appendChild(tab2)
        div_dialog.appendChild(tab3)
        tab1.appendChild(tab1c)
        tab2.appendChild(tab2c)
        tab3.appendChild(tab3c)
        
        function createSection(tab, name, alias) {
            if(tab === "1") {
                const section = document.createElement("div")
                section.id = alias
                section.classList.add("section")
                
                const title = document.createElement("h1")
                title.innerHTML = policy.createHTML(name)
                
                const br = document.createElement("br")
                br.id = "br"
                
                tab1c.appendChild(section)
                section.appendChild(title)
                section.appendChild(br)
            }
            if(tab === "2") {
                const section = document.createElement("div")
                section.id = alias
                section.classList.add("section")
                
                const title = document.createElement("h1")
                title.innerHTML = policy.createHTML(name)
                
                const br = document.createElement("br")
                br.id = "br"
                
                tab2c.appendChild(section)
            }
            if(tab === "3") {
                const section = document.createElement("div")
                section.id = alias
                section.classList.add("section")    
                
                const title = document.createElement("h1")
                title.innerHTML = policy.createHTML(name)
                
                const br = document.createElement("br")
                br.id = "br"
                
                tab3c.appendChild(section)
                section.appendChild(title)
                section.appendChild(br)
            }
        }
        
        function createBr() {
            const br = document.createElement("br")
            br.id = "br"
            tab1c.appendChild(br)
        }
        
        function createSetting(section, name, alias, description, no_slider, require_premium, disable_premium) {
            const s = document.getElementById(section)
        
            const setting = document.createElement("div")
            setting.classList.add("setting")
            setting.id = "setting"
            
            const section_1 = document.createElement("div")
            section_1.id = alias + "_1"
                
            const section_2 = document.createElement("div")
            section_2.id = alias + "_2"
            section_2.classList.add("section-2")
            
            const title = document.createElement("h1")
            title.innerHTML = policy.createHTML(name)
            
            const d = document.createElement("h2")
            d.innerHTML = policy.createHTML(description)
            
            const br = document.createElement("br")
            br.id = "br"
            
            s.appendChild(setting)
            setting.appendChild(section_1)
            setting.appendChild(section_2)
            section_1.appendChild(title)
            section_2.appendChild(d)
            section_2.appendChild(br)
            
            const toggle_button = document.createElement("div")
            toggle_button.classList.add("toggle-button")
            toggle_button.id = "toggle_button"
            toggle_button.setAttribute("for", alias)
            
            const toggle_line = document.createElement("div")
            toggle_line.classList.add("toggle-line")
            toggle_line.id = alias
            
            if(!no_slider) {
                section_1.appendChild(toggle_line)
                toggle_line.appendChild(toggle_button)
            }
            if(no_slider) {
                setting.classList.add("clickable")
                setting.id = "clickable"
                setting.setAttribute("for", alias)
            }
            if(disable_premium) {
                setting.setAttribute("disable-premium", "")
                toggle_button.setAttribute("disable-premium", "")
            }
            if(require_premium) {
                setting.setAttribute("require-premium", "")
                toggle_button.setAttribute("require-premium", "")
            }
        }
        
        document.body.appendChild(div)
        
        createSection("1", "adBlocker", "adblocker")
        createSetting("adblocker", "Enabled", "adblocker", "This will block ads for you. If you are a Premium user, don't use this.", false, false, true)
        createSection("1", "Bypass Premium Restrictions", "bypass-premium-restrictions")
        createSetting("bypass-premium-restrictions", "Disable Miniplayer", "disable-miniplayer", "Disables Miniplayer for you. If you are a Premium user, you don't need this.", false, false, true)
        createSetting("bypass-premium-restrictions", "Disable Premium Upgrade", "disable-premium-upgrade", "Hides all Upgrade to Premium buttons. If you are a Premium user, you don't need this.", false, false, true)
        createSection("1", "Color Changer", "color-changer")
        createSetting("color-changer", "Enabled", "color-changer", "Enables Color Changer.")
        createSetting("color-changer", "Songs", "color-changer-songs", "Changes color for songs.")
        createSetting("color-changer", "Videos", "color-changer-videos", "Changes color for videos.")
        createSetting("color-changer", "Private Songs", "color-changer-private-songs", "Changes color for private songs.")
        createSection("1", "Discord Rich Presence", "discord-rpc")
        createSetting("discord-rpc", "Enabled", "discord-rpc", "Enables Discord Rich Presence (Playing YouTube Music).")
        createSection("1", "Downloader", "downloader")
        createSetting("downloader", "Download as mp3", "download-mp3", "Downloads current video as mp3.", true)
        createSetting("downloader", "Download as mp4", "download-mp4", "Downloads current video as mp4.", true)
        createSection("1", "Gaming Mode", "gaming-mode")
        createSetting("gaming-mode", "Enabled", "gamer-mode", "When you minimize this app or you leave it on background, it hides app's content to save as much resources as possible.")
        createSection("1", "Premium Features", "premium-features")
        createSetting("premium-features", "Show Premium Title", "show-premium-tag", "If you are a premium user, you will see 'Premium' on Discord Rich Presence and app's title. Only available for Premium users.", false, true)
        createSection("1", "Resume Playback On Launch", "resume-playback-on-launch")
        createSetting("resume-playback-on-launch", "Enabled", "resume-playback-on-launch", "Before closing, this saves last song you were playing before you close the app and opens it when you launch the app again.")
        createBr()
    
        document.querySelector("ytmusic-settings-button").onclick = () => {        
            const customSettings = document.createElement("ytd-compact-link-renderer")
            customSettings.id = "app-settings"
            const settingsPage = document.querySelector("yt-multi-page-menu-section-renderer > #items")
            settingsPage.appendChild(customSettings)
            const appSettings = document.querySelector("#app-settings > a > tp-yt-paper-item")
            const ytFormattedString = document.querySelector("#app-settings > a > tp-yt-paper-item > yt-formatted-string")
            const ytAttributedString = document.querySelector("#app-settings > a > tp-yt-paper-item > #primary-text-container > #label > yt-attributed-string")
        
            const ytSvg = document.createElement("svg")
            ytSvg.id = "appSettingsSvg"
            ytSvg.setAttribute("viewBox", "0 0 24 24")
            ytSvg.setAttribute("preserveAspectRatio", "xMidYMid meet")
            ytSvg.setAttribute("focusable", "false")
            ytSvg.setAttribute("class", "style-scope yt-icon")
            ytSvg.setAttribute("style", "pointer-events: none; display: block; width: 100%; height: 100%;")
        
            const ytG = document.createElement("g")
            ytG.id = "appSettingsG"
            ytG.setAttribute("class", "style-scope yt-icon")
        
            const ytPath = document.createElement("path")
            ytPath.setAttribute("d", policy.createHTML("M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,8c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4 S14.21,8,12,8L12,8z M13.22,3l0.55,2.2l0.13,0.51l0.5,0.18c0.61,0.23,1.19,0.56,1.72,0.98l0.4,0.32l0.5-0.14l2.17-0.62l1.22,2.11 l-1.63,1.59l-0.37,0.36l0.08,0.51c0.05,0.32,0.08,0.64,0.08,0.98s-0.03,0.66-0.08,0.98l-0.08,0.51l0.37,0.36l1.63,1.59l-1.22,2.11 l-2.17-0.62l-0.5-0.14l-0.4,0.32c-0.53,0.43-1.11,0.76-1.72,0.98l-0.5,0.18l-0.13,0.51L13.22,21h-2.44l-0.55-2.2l-0.13-0.51 l-0.5-0.18C9,17.88,8.42,17.55,7.88,17.12l-0.4-0.32l-0.5,0.14l-2.17,0.62L3.6,15.44l1.63-1.59l0.37-0.36l-0.08-0.51 C5.47,12.66,5.44,12.33,5.44,12s0.03-0.66,0.08-0.98l0.08-0.51l-0.37-0.36L3.6,8.56l1.22-2.11l2.17,0.62l0.5,0.14l0.4-0.32 C8.42,6.45,9,6.12,9.61,5.9l0.5-0.18l0.13-0.51L10.78,3H13.22 M14,2h-4L9.26,4.96c-0.73,0.27-1.4,0.66-2,1.14L4.34,5.27l-2,3.46 l2.19,2.13C4.47,11.23,4.44,11.61,4.44,12s0.03,0.77,0.09,1.14l-2.19,2.13l2,3.46l2.92-0.83c0.6,0.48,1.27,0.87,2,1.14L10,22h4 l0.74-2.96c0.73-0.27,1.4-0.66,2-1.14l2.92,0.83l2-3.46l-2.19-2.13c0.06-0.37,0.09-0.75,0.09-1.14s-0.03-0.77-0.09-1.14l2.19-2.13 l-2-3.46L16.74,6.1c-0.6-0.48-1.27-0.87-2-1.14L14,2L14,2z"))
            ytPath.setAttribute("class", "style-scope yt-icon")
        
            ytSvg.appendChild(ytG)
            ytG.appendChild(ytPath)
        
            const ytContentIcon = document.querySelector("#app-settings > a > tp-yt-paper-item > #content-icon > yt-icon")
            ytContentIcon.appendChild(ytSvg)
        
            const ytContentIconG = document.querySelector("#app-settings > a > tp-yt-paper-item > #content-icon > yt-icon > svg > g > path")
            const ytSecondaryString = document.querySelector("#app-settings > a > tp-yt-paper-item > #secondary-text")
            const ytContentSvg = document.querySelector("#app-settings > a > tp-yt-paper-item > #content-icon > yt-icon > svg")
        
            ytContentSvg.setAttribute("xmlns", policy.createHTML("http://www.w3.org/2000/svg"))
            ytFormattedString.removeAttribute("is-empty")
            ytAttributedString.innerHTML = policy.createHTML("App Settings")
            ytSecondaryString.setAttribute("hidden", "")
        
            document.querySelector("#app-settings > a").onclick = () => {
                document.querySelector("#plugins-menu").classList.remove("hidden")
            }
        }
    ;0`)
}