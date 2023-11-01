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
        div_close1.setAttribute("src", "https://raw.githubusercontent.com/binaryfunt/electron-seamless-titlebar-tutorial/master/src/icons/close-w-10.png")

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
        option1title.innerHTML = policy.createHTML("Visual")

        const option2 = document.createElement("div")
        option2.id = "option2"
        option2.classList.add("option")

        const option2title = document.createElement("h1")
        option2title.innerHTML = policy.createHTML("Plugins")
        
        const option3 = document.createElement("div")
        option3.id = "option2"
        option3.classList.add("option")

        const option3title = document.createElement("h1")
        option3title.innerHTML = policy.createHTML("Developer")
        
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
        
        option1.onclick = () => {
            option1.classList.add("option-selected")
            option2.classList.remove("option-selected")
            option3.classList.remove("option-selected")
            tab1.classList.remove("hidden")
            tab2.classList.add("hidden")
            tab3.classList.add("hidden")
        }
        
        option2.onclick = () => {
            option1.classList.remove("option-selected")
            option2.classList.add("option-selected")
            option3.classList.remove("option-selected")
            tab1.classList.add("hidden")
            tab2.classList.remove("hidden")
            tab3.classList.add("hidden")
        }
        
        option3.onclick = () => {
            option1.classList.remove("option-selected")
            option2.classList.remove("option-selected")
            option3.classList.add("option-selected")
            tab1.classList.add("hidden")
            tab2.classList.add("hidden")
            tab3.classList.remove("hidden")
        }

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
            if(tab === 1) {
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
            if(tab === 2) {
                const section = document.createElement("div")
                section.id = alias
                section.classList.add("section")
                
                const title = document.createElement("h1")
                title.innerHTML = policy.createHTML(name)
                
                const br = document.createElement("br")
                br.id = "br"
                
                tab2c.appendChild(section)
                section.appendChild(title)
                section.appendChild(br)
            }
            if(tab === 3) {
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
        
        createSection(1, "YouTube Sans", "youtubeSans")
        createSetting("youtubeSans", "Disable YouTube Sans", "disable-yt-sans", "This will disable the YouTube Sans font and replace it by default font (Requires app reload)")
        createSection(1, "Improved Fullscreen", "improvedFullscreen")
        createSetting("improvedFullscreen", "Disable Improved Fullscreen", "disable-better-fullscreen", "This will disable redesigned fullscreen")
        createSection(1, "Tray", "trayConfig")
        createSetting("trayConfig", "Disable Tray", "disable-tray", "This will hide icon in tray")
        createSetting("trayConfig", "Stay in background after closing", "close-background", "When you close the app, it will stay in background")
        createSection(2, "adBlocker", "adblocker")
        createSetting("adblocker", "Enabled", "adblocker", "This will block ads for you. If you are a Premium user, don't use this.", false, false, true)
        createSection(2, "Bypass Premium Restrictions", "bypass-premium-restrictions")
        createSetting("bypass-premium-restrictions", "Disable Miniplayer", "disable-miniplayer", "Disables Miniplayer for you. If you are a Premium user, you don't need this.", false, false, true)
        createSetting("bypass-premium-restrictions", "Disable Premium Upgrade", "disable-premium-upgrade", "Hides all Upgrade to Premium buttons. If you are a Premium user, you don't need this.", false, false, true)
        createSection(2, "Color Changer", "color-changer")
        createSetting("color-changer", "Enabled", "color-changer", "Enables Color Changer.")
        createSetting("color-changer", "Songs", "color-changer-songs", "Changes color for songs.")
        createSetting("color-changer", "Videos", "color-changer-videos", "Changes color for videos.")
        createSetting("color-changer", "Private Songs", "color-changer-private-songs", "Changes color for private songs.")
        createSection(2, "Discord Rich Presence", "discord-rpc")
        createSetting("discord-rpc", "Enabled", "discord-rpc", "Enables Discord Rich Presence (Playing YouTube Music).")
        createSetting("discord-rpc", "Playback", "discord-show-playback", "Should presence contain Playing/Paused status?")
        createSetting("discord-rpc", "Cover", "discord-show-cover", "Should presence contain track cover or YouTube Music logo?")
        createSetting("discord-rpc", "Song Data", "discord-show-songdata", "Should presence contain song data or no?")
        createSetting("discord-rpc", "Left Time", "discord-show-time", "Should presence show left time?")
        createSection(2, "Downloader", "downloader")
        createSetting("downloader", "Download as mp3", "download-mp3", "Downloads current video as mp3.", true)
        createSetting("downloader", "Download as mp4", "download-mp4", "Downloads current video as mp4.", true)
        createSection(2, "Gaming Mode", "gaming-mode")
        createSetting("gaming-mode", "Enabled", "gamer-mode", "When you minimize this app or you leave it on background, it hides app's content to save as much resources as possible.")
        createSection(2, "Premium Features", "premium-features")
        createSetting("premium-features", "Show Premium Title", "show-premium-tag", "If you are a premium user, you will see 'Premium' on Discord Rich Presence and app's title. Only available for Premium users.", false, true)
        createSection(2, "Resume Playback On Launch", "resume-playback-on-launch")
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
        
            const ytImg = document.createElement("img")
            ytImg.setAttribute("draggable", false)
            ytImg.src = "https://raw.githubusercontent.com/honzawashere/YouTube-Music/new/icons/settings.png"
            ytImg.style.width = "24px"
            ytImg.style.height = "24px"
        
            const ytContentIcon = document.querySelector("#app-settings > a > tp-yt-paper-item > #content-icon > yt-icon")
            ytContentIcon.appendChild(ytImg)
        
            const ytSecondaryString = document.querySelector("#app-settings > a > tp-yt-paper-item > #secondary-text")
            const ytContentSvg = document.querySelector("#app-settings > a > tp-yt-paper-item > #content-icon > yt-icon > svg")
        
            ytFormattedString.removeAttribute("is-empty")
            ytAttributedString.innerHTML = policy.createHTML("App Settings")
            ytSecondaryString.setAttribute("hidden", "")
        
            document.querySelector("#app-settings > a").onclick = () => {
                document.querySelector("#plugins-menu").classList.remove("hidden")
                document.querySelector("body > ytmusic-app > ytmusic-popup-container > tp-yt-iron-dropdown:nth-child(2)").style.display = "none"
                document.querySelector("body > ytmusic-app > ytmusic-popup-container > tp-yt-iron-dropdown:nth-child(2)").setAttribute("aria-hidden", true)
            }
        }
    ;0`)
}