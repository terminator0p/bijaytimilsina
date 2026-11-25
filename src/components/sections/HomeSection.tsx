import Link from "next/link";
import HeroPortrait from "@/components/HeroPortrait";
import SpiderIntro from "@/components/SpiderIntro";
import SpiderMark from "@/components/SpiderMark";
import OrbitalScene from "@/components/three/OrbitalScene";
export default function HomeSection() {
  return (
    <>
      <SpiderIntro />
      <section className="hero spider-hero" id="hero">
        <div className="hero-web" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="small-line" /> DEVELOPER · DESIGNER · CREATOR
          </div>
          <h1>
            BIJAY
            <br />
            <em>TIMILSINA.</em>
          </h1>
          <p className="hero-intro">
            I’m <strong>Bijay Timilsina.</strong> I turn ideas into digital
            experiences — and find a little adventure along the way.
          </p>
          <div className="hero-actions">
            <Link href="/projects/" className="button primary">
              Explore my world
            </Link>
            <Link href="/contact/" className="text-link">
              Let’s build something
            </Link>
          </div>
          <div className="hero-location">
            <span className="location-cross">✳</span>
            <div>
              BASED IN POKHARA, NEPAL
              <br />
              <span>28.2096° N · 83.9856° E</span>
            </div>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit-backdrop">
            <OrbitalScene />
          </div>
          <HeroPortrait />
          <div className="scene-caption">
            <span>YOUR FRIENDLY NEIGHBORHOOD CREATOR</span>
            <span>Move to explore</span>
          </div>
        </div>
        <aside className="hero-sidebar">
          <SpiderMark className="hero-spider-mark" />
          <p className="eyebrow">BEHIND THE MASK</p>
          <h2>
            Code.
            <br />
            Create.
            <br />
            <em>Repeat.</em>
          </h2>
          <p>
            A developer’s mind.
            <br />A creator’s instinct.
          </p>
          <a
            href="https://www.youtube.com/@BIZAY0P_HONI"
            target="_blank"
            rel="noreferrer"
            className="hero-channel"
          >
            BIZAY TERMINATOR<span>Explore my gaming world</span>
          </a>
        </aside>
        <div className="hero-bottom">
          <span>Independent thinking. Connected possibilities.</span>
          <a href="#about">
            Scroll to discover <span>↓</span>
          </a>
        </div>
      </section>
    </>
  );
}
