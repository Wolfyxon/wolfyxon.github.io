window.onload = function (){
    var video = document.getElementById("vid");
    var canvas = document.getElementById('drawCanvas');
    var ctx = canvas.getContext('2d');
    var updateIntv = setInterval(update, 1000);

    function isPixelBlack(x,y){
        console.log(ctx.getImageData(x,y,canvas.width,canvas.height).color)
    }
    function clear(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }

    function update() {
        var w = canvas.width
        var h = canvas.height
        clear()
        var image = video
        ctx.drawImage(image,0,0,w,h)
        for(var hi=0;hi<w;hi++) {
            for (var wi = 0; wi < w; wi++) {
                isPixelBlack(wi, hi)
            }
        }
    }
}
