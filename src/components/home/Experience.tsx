import Badge from "../badges/Badge/Badge";
import Tag from "../badges/Tag/Tag";

export default function Experience() {
    return (
        <div id="experience" className="observing anim-obs-down">
        <div id="software">
          <h2>Languages</h2>
          <div className="observing anim-obs-down">
            <Badge icon="software/lang/rust.webp" alt="Rust" />
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
            <Badge icon="software/lang/mysql.webp" alt="MySQL" />
            <Badge icon="software/lang/sqlite.svg" alt="SQLite" />
            <Badge icon="software/lang/postgresql.svg" alt="PostgreSQL" />
            <Badge icon="software/lang/bash.svg" alt="Bash" />
          </div>

          <h2>Libraries, frameworks and engines</h2>
          <div className="observing anim-obs-down">
              <Badge icon="software/lib/react.svg" alt="React" />
              <Badge icon="software/framework/svelte.svg" alt="Svelte" />
              <Badge icon="software/framework/vite.svg" alt="Vite" />
              <Badge icon="software/framework/nextjs.webp" alt="NextJS" />
              <Badge icon="software/framework/nodejs.webp" alt="NodeJS" />
              <Badge icon="software/lib/discordjs.webp" alt="DiscordJS" />
              <Badge icon="software/lib/jquery.svg" alt="jQuery" />
              <Badge icon="software/framework/love2d.svg" alt="Love2D" />
              <Badge icon="software/framework/godot.svg" alt="Godot" />
              <Badge icon="software/framework/rbxstudio.svg" alt="Roblox Studio" />
              <Badge icon="arduino.svg" alt="Arduino" />
              <Badge icon="software/framework/ev3dev.webp" alt="ev3dev" />
          </div>
        </div>

        <div id="fields">
          <h2>Fields</h2>
          
          <div className="observing anim-obs-down">
            {
              [
                "Web APIs",
                "Backend",
                "Frontend",
                "Databases",
                "Website SEO & accessibility",
                "Command line",
                "Version control",
                "Low-level programming",
                "Game development",
                "Discord bots",
                "Networking",,
                "System administration",
                "Basic electronics",
                "Basic robotics",
                "Video & audio editing",
                "Digital graphics",
                "Digital music production"                
              ].map((name) => <Tag key={"field-" + name}>{name}</Tag>)
            }
          </div>
        </div>
      </div>
    )
}