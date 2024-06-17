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
    }
    
}
