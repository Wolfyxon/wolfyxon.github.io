import { Metadata } from "next";

import FancyHeading from "../components/FancyHeading/FancyHeading";
import ProjectList from "../components/home/ProjectList";
import Experience from "@/components/home/Experience";
import Collaborator from "../components/home/Collaborator";
import SocialBadge, { websites } from "../components/badges/SocialBadge";
import Page from "@/layouts/Page";

import "@/css/animations.css";
import "@/css/home.css";

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
                  <p id="banner-text-about">
                      I'm a guy who loves programming and dealing with all kinds of software.
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
      
      <div id="projects">
          <FancyHeading>Featured projects</FancyHeading>

          <ProjectList />
          <a href="https://github.com/Wolfyxon?tab=repositories" className="important-link">See all my public projects on GitHub</a>
      </div>

      <FancyHeading>Experience</FancyHeading>
      <Experience />

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
