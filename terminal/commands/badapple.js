registerCommand(
    new Command(["badapple"])
    .setDescription("Plays Bad Apple in the terminal as ASCII art")

    .addArg("char", "Custom character for the playback")

    .setCallback(async (ctx) => {
        /*
            How it works?
            Video plays -> Video is copied to the canvas for image processing -> Script cycles trough each pixel on the canvas and places chars
        */

        const char = ctx.getArg("char") || "##";
        
        echo("If the playback is frozen, the video is loading. Conversion from video to text happens in real time.");
        echo(" ");

        // Element preparation

        const videoSrc = document.createElement("source")
        videoSrc.type = "video/mp4";
        videoSrc.src = "/media/video/bad_apple.mp4";
        

        const video = document.createElement("video");
        video.style.display = "none";
        video.append(videoSrc);

        const canvas = document.createElement("canvas");
        canvas.style.display = "none";

        getConsole().append(video, canvas);

        const text = echo("Please wait...");

        // Rendering logic

        let active = true;
        video.play();

        const canvasCtx = canvas.getContext("2d");

        const updateItv = setInterval(() => {
            // Copy video frame to canvas
            const w = video.videoWidth / 6.5;
            const h = video.videoHeight / 8;

            if(w === 0 || h === 0) return;

            canvas.width = w;
            canvas.height = h;

            canvasCtx.drawImage(video, 0, 0, w, h);

            // Process image from canvas and convert to ASCII

            const data = canvasCtx.getImageData(0, 0, canvas.width, canvas.height).data;
            let ascii = "";

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const brightness = ( 3 * r + 4 * g + b) >>> 3;

                if (brightness > 51) {
                    ascii += char;
                } else {
                    ascii += " ".repeat(char.length);
                }
                if ((i / 4 + 1) % canvas.width === 0) {
                    ascii += "<br>";
                }
            }

            text.innerHTML = ascii;

        });

        function stop() {
            video.remove();
            canvas.remove();
            clearInterval(updateItv);
            active = false;
        }

        function wait() {
            return new Promise((resolve) => {
                if (!active || !ctx.running) {
                    stop();
                    return resolve();
                }

                setTimeout(async () => {
                    await wait();
                    resolve();
                }, 0);
            });
        }

        video.onended = stop;

        echo(" ");
        echo("Type ^C or press Ctr+C to stop");

        await wait();
    })
);