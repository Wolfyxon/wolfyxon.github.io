const utils = {

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

    getSocialIcon: (url) => {
        const dir = "/media/img/icons/social/";

        const icons = {
            "twitter.com": "x.png",
            "x.com": "x.png",
            "soundcloud.com": "soundcloud.png",
            "youtube.com": "youtube.png",
            "www.youtube.com": "youtube.png",
            "github.com": "github.png"
        };

        url = url.replace("https://", "").replace("http://", "");

        for(const domain of Object.keys(icons)) {
            if(url.startsWith(domain)) {
                return dir + icons[domain];
            }
        }
    },

    urlStartsWith: (url, start) => {
        return url.replace("http://", "").replace("https://").startsWith(start);
    }
    
}
