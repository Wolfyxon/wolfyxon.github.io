const utils = {

    base64: {
        /**
         * Encodes text into Base64
         * @param {string} text 
         * @returns {string}
         */
        encode: (text) => {
            const bytes = new TextEncoder().encode(text);
            const binStr = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");

            return btoa(binStr);
        },

        /**
         * Decodes Base64
         * @param {string} base64 
         * @returns {string}
         */
        decode: (base64) => {
            const bytes = Uint8Array.from(atob(base64), (m) => m.codePointAt(0));
            
            return new TextDecoder().decode(bytes);
        }
    },

    /**
     * Sends an HTTP GET request and returns the body text
     * @param {string} url 
     * @returns {string}
     */
    httpGet: async (url) => {
        return new Promise(((resolve, _reject) => {
            let req = new XMLHttpRequest();
            req.open("GET", url, true)
            let res = null
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    if (req.status === 200 || req.status === 0) {
                        res = req.responseText
                        resolve(res)
                    }
                }
            }
            req.send(null)
        }));
    },

    /**
     * Returns the user's browser name
     * @returns {string}
     */
    getBrowserName: () => {
        // Edge
        if((!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) && (navigator.userAgent.indexOf("Edg") !== -1)) return "Edge";
        // Opera
        if((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) return "Opera";
        // Firefox
        if(typeof InstallTrigger !== 'undefined') return "Firefox";
        // Safari
        if(/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification))) return "Safari";
        // IE
        if(!!document.documentMode) return "Internet Explorer";
        // Chrome
        if((!!window.chrome || navigator.userAgent.indexOf("Chrome") !== -1) && (!!window.chrome.webstore || !!window.chrome.runtime)) return "Chrome";
        // Chromium
        if((!!window.chrome || navigator.userAgent.indexOf("Chrome") !== -1)) return "Chromium";
    },

    /**
     * Returns an URL to the icon image that matches the given social platform 
     * @param {string} url 
     * @returns {string}
     */
    getSocialIcon: (url) => {
        const dir = "/media/img/icons/social/";

        const icons = {
            "twitter.com": "x.png",
            "x.com": "x.png",
            "soundcloud.com": "soundcloud.png",
            "youtube.com": "youtube.png",
            "www.youtube.com": "youtube.png",
            "github.com": "github.png",
            "discord.com": "discord.svg",
            "discord.gg": "discord.svg"
        };

        url = url.replace("https://", "").replace("http://", "");

        for(const domain of Object.keys(icons)) {
            if(url.startsWith(domain)) {
                return dir + icons[domain];
            }
        }

        return "/media/img/icons/social/website.png";
    },

    /**
     * Returns the name of the given URL to a social platform
     * @param {string} url 
     * @returns {string}
     */
    getSocialName: (url) => {
        const names = {
            "twitter.com": "X / Twitter",
            "x.com": "X / Twitter",
            "soundcloud.com": "SoundCloud",
            "youtube.com": "YouTube",
            "www.youtube.com": "YouTube",
            "github.com": "GitHub",
            "discord.com": "Discord",
            "discord.gg": "Discord"
        };

        url = url.replace("https://", "").replace("http://", "");

        for(const domain of Object.keys(names)) {
            if(url.startsWith(domain)) {
                return dir + names[domain];
            }
        }
    },

    /**
     * Checks if a URL starts with a string, useful for validating domains
     * @param {string} url 
     * @param {string} start 
     * @returns {string}
     */
    urlStartsWith: (url, start) => {
        return url.replace("http://", "").replace("https://", "").startsWith(start);
    },

    /**
     * Escapes HTML to safely inject it into innerHTML without it being parsed
     * @param {string} html 
     * @returns {string}
     */
    escapeHTML: (html) => {
        return html
               .replaceAll("<", "&lt;")
               .replaceAll(">", "&gt;")
        ;
    }
    
}
