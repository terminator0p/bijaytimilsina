import Reveal from "@/components/Reveal";
export default function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <Reveal className="about-grid">
        <div data-reveal className="portrait-wrap">
          <img
            src="/images/portrait.jpg"
            alt="Bijay Timilsina"
            width="600"
            height="700"
            loading="lazy"
          />
          <div className="portrait-label">A person behind the pixels.</div>
        </div>
        <div data-reveal className="about-copy">
          <p className="eyebrow">A LITTLE ABOUT ME</p>
          <h2>
            Many interests.
            <br />
            <em>One curious mind.</em>
          </h2>
          <p>
            I’m Bijay, a developer and digital creator from Lakeside, Pokhara.
            My background in Computer Engineering shapes how I approach
            problems; my creative side shapes how I bring them to life.
          </p>
          <p>
            From Android applications and web interfaces to gaming and YouTube,
            I enjoy making things that people can use, experience, and connect
            with.
          </p>
          <div className="about-details">
            <div>
              <span>HOME BASE</span>
              <strong>Pokhara, Nepal</strong>
            </div>
            <div>
              <span>MY APPROACH</span>
              <strong>Build. Learn. Repeat.</strong>
            </div>
          </div>
          <a className="text-link" href="/contact/">
            Have an idea? Let’s connect
          </a>
        </div>
      </Reveal>
    </section>
  );
}
