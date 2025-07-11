// TODO: Migrate to react

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
    },

    /**
     * Returns the descendants of an element
     * @param {HTMLElement} element 
     * @returns {HTMLElement[]}
     */
    getDescendants: (element) => {
        let res = [];

        for(const elm of element.children) {
            res.push(elm);

            utils.getDescendants(elm).forEach(sub => {
                res.push(sub);
            });
        }

        return res;
    }    
}
