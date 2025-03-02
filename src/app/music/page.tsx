import Page from "@/layouts/Page";

import "./music.css";

import LargeBadge from "@/components/LargeBadge/LargeBadge";
import Tag from "@/components/Tag/Tag";

export default function MusicPage() {
    return (
        <Page category="Music">
            <h1>Listen to my music on:</h1>
            
            <div className="cards">
                <LargeBadge title="YouTube" icon="/assets/media/img/icons/social/youtube.png" url="https://www.youtube.com/playlist?list=PLtM1NLG1o7IidEvwmwbUCxkJnukupLA0Z" />
                <LargeBadge title="SoundCloud" icon="/assets/media/img/icons/social/soundcloud.png" url="https://soundcloud.com/wolfyxon" />
            </div>

            <h1>What I use to make music:</h1>

            <div className="cards">
                <LargeBadge title="LMMS" icon="/assets/media/img/icons/software/tools/lmms.png" url="https://lmms.io" />
            </div>

            <h2>SoundFonts</h2>
            <div>
                <Tag url="https://schristiancollins.com/generaluser.php">GeneralUser GS</Tag>
                <Tag url="https://member.keymusician.com/Member/FluidR3_GM/index.html">FluidR3_GM</Tag>
                <Tag>TimGM6mb</Tag>
                <Tag url="https://musical-artifacts.com/artifacts/974">AmenBreak</Tag>
            </div>

            <p>Page under construction eh</p>
        </Page>
    )
}