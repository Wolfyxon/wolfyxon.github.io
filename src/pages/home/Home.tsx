import LinkBadge from "./LinkBadge"

import "../../css/animations.css"
import "./home.css"
import FancyHeader from "../../misc/FancyHeader"
import Badge from "./Badge"

function Home() {
  return (
    <>
       <div id="banner">
                <div /*className="observing anim-obs-left"*/>
                    <div id="banner-text">
                        <h1>
                            Hi, I'm Wolfyxon
                        </h1>
                        <p>
                            Young passionate programmer, beginner musician and Linux enthusiast.
                        </p>
    
                        <div id="socials">
                            <LinkBadge url="https://github.com/Wolfyxon" icon="social/github.png" alt="GitHub" />
                            <LinkBadge url="https://youtube.com/@Wolfyxon" icon="social/youtube.png" alt="YouTube" />
                            <LinkBadge url="https://soundcloud.com/wolfyxon" icon="social/soundcloud.png" alt="SoundCloud" />
                            <LinkBadge url="https://discord.gg/RztUGCK" icon="social/discord.svg" alt="Discord" />
                            <LinkBadge url="https://x.com/Wolfyxon" icon="social/github.png" alt="X (Twitter)" />
                        </div>
                    </div>
    
                    <img src="/assets/img/Wolfyxon.png" id="banner-logo" alt="Wolfyxon logo" />
                </div>

                <div id="software">
                  <FancyHeader>Languages & tools</FancyHeader>
                  <h2>Languages</h2>

                  <div>
                    <Badge icon="software/lang/rust.png" alt="Rust" />
                    <Badge icon="software/lang/lua.png" alt="Lua" />
                    <Badge icon="software/lang/Luau.png" alt="Luau" />
                    <Badge icon="software/tools/godot.png" alt="GDScript" />
                    <Badge icon="software/lang/python.svg" alt="Python" />
                    <Badge icon="software/lang/js.png" alt="JavaScript" />
                    <Badge icon="software/lang/ts.png" alt="TypeScript" />                    
                  </div>

                </div>
            </div>
    </>
  )
}

export default Home
