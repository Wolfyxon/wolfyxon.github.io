import Page from "@/layouts/Page";

import "./music.css";
import LargeBadge from "@/components/LargeBadge/LargeBadge";

export default function MusicPage() {
    return (
        <Page category="Music">
            <h1>Listen to my music on:</h1>
            
            <div id="links">
                <LargeBadge title="YouTube" icon="/assets/media/img/icons/social/youtube.png" url="https://www.youtube.com/playlist?list=PLtM1NLG1o7IidEvwmwbUCxkJnukupLA0Z" />
                <LargeBadge title="SoundCloud" icon="/assets/media/img/icons/social/soundcloud.png" url="https://soundcloud.com/wolfyxon" />
            </div>

            <h1>What I use to make music:</h1>

            <div>
                <LargeBadge title="LMMS" icon="/assets/media/img/icons/software/tools/lmms.png" url="https://lmms.io" />
            </div>
            
            <p>Page under construction eh</p>
        </Page>
    )
}