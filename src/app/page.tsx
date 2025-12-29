import { Metadata } from "next";

import SocialBadge, { websites } from "../components/badges/SocialBadge";
import FancyHeading from "../components/FancyHeading/FancyHeading";
import ProjectList from "../components/home/ProjectList";
import Experience from "@/components/home/Experience";
import Collaborator from "../components/home/Collaborator";
import Page from "@/layouts/Page";

import "@/css/animations.css";
import "@/css/home.css";

export const metadata: Metadata = {
  title: "Wolfyxon | My website",
  description: "Hi, I'm Wolfyxon. I'm a guy who loves programming " +
               "and dealing with all kinds of software. " +
               "This is my website, where you can see my projects and other stuff I make."
}

const extraHead = <>
  <link 
    rel="preload"
    href="/assets/img/home/banner.webp"
    type="image/webp"
    as="image"
    fetchPriority="high" 
  />
</>

export default function Home() {
  return (
    <Page category="Home" head={extraHead}>
       <div id="banner" role="banner">
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

              <img src="/assets/img/Wolfyxon.webp" id="banner-logo" alt="Wolfyxon logo" fetchPriority="high" />
          </div>
      </div>
      
      <div id="projects">
          <FancyHeading>Featured projects</FancyHeading>

          <ProjectList />
          <a href="https://github.com/Wolfyxon?tab=repositories" className="important-link" target="_blank">
            See all my public projects on GitHub
            </a>
      </div>

      <FancyHeading>Experience</FancyHeading>
      <Experience />
      
      <div id="collaborators">
          <FancyHeading>People I collaborate with</FancyHeading>

          <div id="collaborators-list">
              <Collaborator 
                name="KaroleusPL" 
                description="Experienced artist, musician and beginner game developer. Also my best friend."
                thumbnail="/assets/img/people/karoleus_pl.webp"
                website="https://karoleuspl.github.io"
                >
                
                <SocialBadge site={websites.youtube} link="@KaroleusPL" />
                <SocialBadge site={websites.x} link="KaroleusPL" />
                <SocialBadge site={websites.soundcloud} link="karoleus-PL" />
                <SocialBadge site={websites.github} link="karoleuspl" />
                <SocialBadge site={websites.deviantart} link="karoleusyt" />
              </Collaborator>
          </div>
      </div>
    </Page>
  );
}
