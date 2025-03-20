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
  title: "Wolfyxon's epic website"
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
                      <SocialBadge site={websites.x} link="Wolfyxon" />
                  </div>
              </div>

              <img src="/assets/media/img/Wolfyxon.png" id="banner-logo" alt="Wolfyxon logo" />
          </div>
      </div>
      
      <FancyHeading>Experience</FancyHeading>
      <div id="experience">
        <div id="software">
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
            <Badge icon="software/lang/bash.png" alt="Bash" />
          </div>

          <h2>Tools</h2>
          <div>
            <Badge icon="software/tools/vscode.png" alt="Visual Studio Code" />
            <Badge icon="software/tools/IntelliJ_IDEA.svg" alt="IntellIJ IDEA" />
            <Badge icon="software/tools/godot.png" alt="Godot" />
            <Badge icon="software/tools/rbxstudio.png" alt="Roblox Studio" />
            <Badge icon="software/tools/android_studio.png" alt="Android Studio" />
            <Badge icon="software/tools/git.png" alt="Git" />
            <Badge icon="software/tools/linux.svg" alt="Linux" />
          </div>

          <h2>Libraries and frameworks</h2>
          <div>
              <Badge icon="software/lib/react.png" alt="React" />
              <Badge icon="software/framework/vite.svg" alt="Vite" />
              <Badge icon="software/framework/nextjs.png" alt="NextJS" />
              <Badge icon="software/framework/nodejs.png" alt="NodeJS" />
              <Badge icon="software/framework/love2d.png" alt="Love2D" />
            <Badge icon="software/lib/discordjs.png" alt="DiscordJS" />
          </div>

        </div>

        <div id="fields">
          <h2>Fields</h2>
          
          <div>
            <Tag>REST API usage & creation</Tag>
            <Tag>Low-level programming</Tag>  
            <Tag>Backend</Tag>
            <Tag>Frontend</Tag>
            <Tag>Databases</Tag>
            <Tag>SEO & Accessibility</Tag>
            <Tag>Tooling</Tag>
            <Tag>Command line</Tag>
            <Tag>Version control</Tag>
            <Tag>Game development</Tag>
            <Tag>Discord bots</Tag>
            <Tag>Networking & multiplayer</Tag>
            <Tag>Database management</Tag>
            <Tag>System design</Tag>
            <Tag>Basic robotics</Tag>
            <Tag>Video & audio editing</Tag>
            <Tag>Digital graphics</Tag>
            <Tag>Digital music</Tag>
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
                thumbnail="/assets/media/img/people/karoleus_pl.png"
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
