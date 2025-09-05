import { Metadata } from "next";

import FancyHeading from "../components/FancyHeading/FancyHeading";
import ProjectList from "../components/home/ProjectList";
import Badge from "../components/Badge/Badge";
import Collaborator from "../components/home/Collaborator";
import SocialBadge, { websites } from "../components/SocialBadge";
import Page from "@/layouts/Page";

import "./css/animations.css";
import "./css/home.css";
import Tag from "@/components/Tag/Tag";

export const metadata: Metadata = {
  title: "Wolfyxon | My website"
}

export default function Home() {
  return (
    <Page category="Home">
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
                      <SocialBadge site={websites.github} link="Wolfyxon" />
                      <SocialBadge site={websites.youtube} link="@Wolfyxon" />
                      <SocialBadge site={websites.soundcloud} link="Wolfyxon" />
                      <SocialBadge site={websites.discord} link="RztUGCK" />
                      {/*<SocialBadge site={websites.x} link="Wolfyxon" />*/}
                  </div>
              </div>

              <img src="/assets/media/img/Wolfyxon.webp" id="banner-logo" alt="Wolfyxon logo" />
          </div>
      </div>
      
      <FancyHeading>Experience</FancyHeading>
      <div id="experience">
        <div id="software">
          <h2>Languages</h2>
          <div className="observing anim-obs-left">
            <Badge icon="software/lang/rust.png" alt="Rust" />
            <Badge icon="software/lang/lua.svg" alt="Lua" />
            <Badge icon="software/lang/luau.svg" alt="Luau" />
            <Badge icon="software/framework/godot.svg" alt="GDScript" />
            <Badge icon="software/lang/java.svg" alt="Java" />
            <Badge icon="software/lang/python.svg" alt="Python" />
            <Badge icon="software/lang/js.svg" alt="JavaScript" />
            <Badge icon="software/lang/ts.svg" alt="TypeScript" />
            <Badge icon="software/lang/html5.svg" alt="HTML5" />
            <Badge icon="software/lang/css3.svg" alt="CSS3" />
            <Badge icon="software/lang/go.svg" alt="Go" />
            <Badge icon="software/lang/php.svg" alt="PHP" />
            <Badge icon="software/lang/c.svg" alt="C" />
            <Badge icon="software/lang/cpp.svg" alt="C++" />
            <Badge icon="software/lang/csharp.svg" alt="C#" />
            <Badge icon="software/lang/mysql.png" alt="MySQL" />
            <Badge icon="software/lang/sqlite.svg" alt="SQLite" />
            <Badge icon="software/lang/postgresql.svg" alt="PostgreSQL" />
            <Badge icon="software/lang/bash.svg" alt="Bash" />
          </div>

          <h2>Libraries, frameworks and engines</h2>
          <div className="observing anim-obs-left">
              <Badge icon="software/lib/react.svg" alt="React" />
              <Badge icon="software/framework/vite.svg" alt="Vite" />
              <Badge icon="software/framework/nextjs.png" alt="NextJS" />
              <Badge icon="software/framework/nodejs.png" alt="NodeJS" />
              <Badge icon="software/lib/discordjs.png" alt="DiscordJS" />
              <Badge icon="software/lib/jquery.svg" alt="jQuery" />
              <Badge icon="software/framework/dotnet.svg" alt=".NET" />
              <Badge icon="software/framework/love2d.svg" alt="Love2D" />
              <Badge icon="software/framework/godot.svg" alt="Godot" />
              <Badge icon="software/framework/rbxstudio.svg" alt="Roblox Studio" />
              <Badge icon="arduino.svg" alt="Arduino" />
              <Badge icon="software/framework/ev3dev.webp" alt="ev3dev" />
          </div>

          <h2>Tools</h2>
          <div className="observing anim-obs-left">
            <Badge icon="software/tools/vscode.svg" alt="VS Code" />
            <Badge icon="software/tools/vs.svg" alt="Visual Studio" />
            <Badge icon="software/tools/IntelliJ_IDEA.svg" alt="IntellIJ IDEA" />
            <Badge icon="software/tools/android_studio.svg" alt="Android Studio" />
            <Badge icon="software/tools/git.svg" alt="Git" />
            <Badge icon="software/tools/linux.svg" alt="Linux" />
            <Badge icon="software/tools/krita.svg" alt="Krita" />
            <Badge icon="software/tools/audacity.svg" alt="Audacity" />
            <Badge icon="software/tools/lmms.svg" alt="LMMS" />
            <Badge icon="software/video/resolve.svg" alt="DaVinci Resolve" />
            <Badge icon="software/video/kdenlive.svg" alt="KDEnlive" />
          </div>
        </div>

        <div id="fields">
          <h2>Fields</h2>
          
          <div className="observing anim-obs-fade">
            {
              [
                "REST API usage & development",
                "Low-level programming",
                "Backend",
                "Frontend",
                "Databases",
                "SEO & Accessibility",
                "Tooling",
                "Command line",
                "Version control",
                "Game development",
                "Discord bots",
                "Networking & multiplayer",
                "Database management",
                "System administration",
                "Basic electronics",
                "Basic robotics",
                "Video & audio editing",
                "Digital graphics",
                "Digital music"
              ].map((name) => <Tag key={"field-" + name}>{name}</Tag>)
            }
          </div>
        </div>
      </div>

      <div id="projects">
          <FancyHeading>Featured projects</FancyHeading>

          <ProjectList />

          <a href="https://github.com/Wolfyxon?tab=repositories">See all my public projects on GitHub</a>
      </div>

      <div id="collaborators">
          <FancyHeading>People I collaborate with</FancyHeading>

          <div id="collaborators-list">
              <Collaborator 
                name="KaroleusPL" 
                description="Experienced artist, musician and beginner game developer. Also my best friend."
                thumbnail="/assets/media/img/people/karoleus_pl.webp"
                website="https://karoleuspl.github.io"
                >
                
                <SocialBadge site={websites.youtube} link="@KaroleusPL" />
                <SocialBadge site={websites.x} link="KaroleusPL" />
                <SocialBadge site={websites.soundcloud} link="karoleus-PL" />
                <SocialBadge site={websites.github} link="karoleuspl" />

              </Collaborator>
          </div>
      </div>
    </Page>
  );
}
