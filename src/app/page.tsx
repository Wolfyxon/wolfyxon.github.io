import LinkBadge from "./components/LinkBadge";
import FancyHeading from "./components/FancyHeading";
import Badge from "./components/Badge";
import ProjectList from "./components/home/ProjectList";

import "./css/animations.css";
import "./css/home.css";

export default function Home() {
  return (
    <>
       <div id="banner">
          <div className="observing anim-obs-left">
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

              <img src="/assets/media/img/Wolfyxon.png" id="banner-logo" alt="Wolfyxon logo" />
          </div>
      </div>
      <div id="software">
        <FancyHeading>Languages & tools</FancyHeading>

        <h2>Languages</h2>
        <div>
          <Badge icon="software/lang/rust.png" alt="Rust" />
          <Badge icon="software/lang/lua.png" alt="Lua" />
          <Badge icon="software/lang/Luau.png" alt="Luau" />
          <Badge icon="software/tools/godot.png" alt="GDScript" />
          <Badge icon="software/lang/java.svg" alt="Java" />
          <Badge icon="software/lang/python.svg" alt="Python" />
          <Badge icon="software/lang/js.png" alt="JavaScript" />
          <Badge icon="software/lang/ts.png" alt="TypeScript" />
          <Badge icon="software/lang/html5.svg" alt="HTML5" />
          <Badge icon="software/lang/css3.svg" alt="CSS3" />
          <Badge icon="software/lang/c.svg" alt="C" />
          <Badge icon="software/lang/cpp.svg" alt="C++" />
          <Badge icon="software/lang/csharp.svg" alt="C#" />
          <Badge icon="software/lang/mysql.png" alt="MySQL" />
          <Badge icon="software/lang/sqlite.png" alt="SQLite" />
          <Badge icon="software/lang/postgresql.png" alt="PostgreSQL" />
        </div>

        <h2>Tools</h2>
        <div>
          <Badge icon="software/tools/vscode.png" alt="Visual Studio Code" />
          <Badge icon="software/tools/godot.png" alt="Godot" />
          <Badge icon="software/tools/rbxstudio.png" alt="Roblox Studio" />
          <Badge icon="software/tools/git.png" alt="Git" />
        </div>
      </div>

      <div id="projects">
          <FancyHeading>My public projects</FancyHeading>

          <ProjectList />

          <a href="https://github.com/Wolfyxon?tab=repositories">See all my public projects on GitHub</a>
      </div>
    </>
  );
}
