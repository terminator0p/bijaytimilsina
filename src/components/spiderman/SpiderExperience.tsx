"use client";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Play,
  X,
  Menu,
  Facebook,
  Instagram,
  Zap,
  RotateCcw,
  VolumeX,
  Volume2,
  Youtube,
} from "lucide-react";
import SpiderMark from "../SpiderMark";
import {
  profile,
  socials,
  skills,
  services,
  designer,
} from "@/data/portfolio";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const timer = setTimeout(onComplete, reduced ? 100 : 3200);
    return () => clearTimeout(timer);
  }, [onComplete, reduced]);
  return (
    <motion.div
      className="sp-intro"
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.7 }}
      aria-label="Portfolio introduction"
    >
      <div className="web-texture" />
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="intro-logo" aria-hidden="true">
          <img
            className="logo-base"
            src="/images/spiderman/spider-logo.png"
            alt=""
          />
          <span className="logo-fill" />
        </div>
        <p>BIJAY TIMILSINA</p>
        <span className="intro-caption">A NEW WORLD OF POSSIBILITIES</span>
        <div className="intro-track" aria-hidden="true">
          <span />
        </div>
      </motion.div>
    </motion.div>
  );
}
const menuContent: Record<string, { label: string; href: string }[]> = {
  ABOUT: [
    { label: "Meet Bijay", href: "#story" },
    { label: "Unleash the experience", href: "#experience" },
  ],
  SKILLS: [
    { label: "Frontend & design", href: "#skills" },
    { label: "Backend & mobile", href: "#skills" },
  ],
  SERVICES: services.map((s) => ({
    label: s.title,
    href: "#services",
  })),
  CONTACT: [
    { label: "Get in touch", href: "#contact" },
    { label: "Open contact card", href: "#hire" },
  ],
};
export function NavigationBar({ onHire }: { onHire: () => void }) {
  const [active, setActive] = useState<string | null>(null),
    [mobile, setMobile] = useState(false);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="sp-nav">
      <a href="#main" className="sp-logo" aria-label="Bijay Timilsina home">
        <SpiderMark />
      </a>
      <nav
        aria-label="Main navigation"
        className={mobile ? "nav-links is-open" : "nav-links"}
      >
        {Object.entries(menuContent).map(([name, links]) => (
          <div className="nav-group" key={name}>
            <button
              aria-expanded={active === name}
              onClick={() => setActive(active === name ? null : name)}
            >
              {name}
              <ChevronDown size={12} />
            </button>
            {active === name && (
              <div className="nav-dropdown">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => {
                      setActive(null);
                      setMobile(false);
                      if (l.href === "#hire") {
                        e.preventDefault();
                        onHire();
                      }
                    }}
                  >
                    {l.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <button className="store-button" onClick={onHire}>
        <Mail size={16} /> HIRE ME
      </button>
      <button
        className="mobile-toggle"
        aria-label="Toggle navigation"
        aria-expanded={mobile}
        onClick={() => setMobile(!mobile)}
      >
        {mobile ? <X /> : <Menu />}
      </button>
    </header>
  );
}
export function CharacterTransformation({ power }: { power: number }) {
  const partial = Math.min(1, power / 45),
    full = Math.max(0, (power - 40) / 60);
  return (
    <div
      className="character-stage"
      role="img"
      aria-label={
        power === 0
          ? "Bijay as a creator looking at his raised hand"
          : power === 100
            ? "Fully powered neighborhood creator in hero mode"
            : "Bijay transforming into hero mode"
      }
    >
      <div className="character-aura" />
      <div className="character-frame normal" />
      <motion.div
        className="character-frame partial"
        animate={{
          clipPath: `circle(${partial * 150}% at 26% 40%)`,
          opacity: power > 0 ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="character-frame super"
        animate={{
          clipPath: `circle(${full * 150}% at 26% 40%)`,
          opacity: full > 0 ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
      />
      <div
        className="hand-energy"
        style={{ opacity: power > 0 && power < 100 ? 1 : 0 }}
      />
      <div className="character-fade" />
    </div>
  );
}
export function PortfolioStats() {
  return (
    <section className="reviews" aria-label="Portfolio highlights">
      <h2>SPEC SHEET</h2>
      {[
        { name: "Projects", rating: "12+", quote: "Shipped & in progress" },
        { name: "Clients", rating: "5+", quote: "Happy collaborations" },
        { name: "Support", rating: "24", quote: "Hours when it counts" },
      ].map((r) => (
        <div className="review" key={r.name}>
          <div className="rating">
            {r.rating}
            {r.rating === "24" && <span>h</span>}
          </div>
          <div>
            <h3>{r.name}</h3>
            <p>{r.quote}</p>
          </div>
        </div>
      ))}
      <span className="concept-ratings">
        From Lakeside, Pokhara · Freelancer available
      </span>
    </section>
  );
}
export function ChannelPreview() {
  const youtube = socials.find((s) => s.label === "YouTube")?.url ?? socials[0].url;
  return (
    <section className="trailer-preview" id="trailer">
      <h2>WATCH CHANNEL</h2>
      <a
        href={youtube}
        target="_blank"
        rel="noreferrer"
        aria-label="Open BIZAY0P_HONI on YouTube"
      >
        <img
          src="/images/portrait.jpg"
          alt="BIZAY0P_HONI — gaming and digital content"
          loading="lazy"
        />
        <span className="play-circle">
          <Play fill="currentColor" size={19} />
        </span>
        <span className="trailer-caption">
          BIZAY0P_HONI <span>LIVE</span>
        </span>
      </a>
    </section>
  );
}
export function SocialLinks() {
  const icons: Record<string, React.ReactNode> = {
    Facebook: <Facebook size={17} />,
    Instagram: <Instagram size={18} />,
    YouTube: <Youtube size={18} />,
    "X / Twitter": (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.5 6.8L18.9 2ZM17.8 20h1.7L6.3 3.9H4.5L17.8 20Z" />
      </svg>
    ),
  };
  return (
    <div className="social-links">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
        >
          {icons[s.label] ?? s.label[0]}
        </a>
      ))}
      <span className="social-line" />
    </div>
  );
}
function ContactForm({ idPrefix = "contact" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      message: String(data.get("message")).trim(),
    };
    if (Object.values(payload).some((value) => !value)) {
      setStatus("error");
      setMessage("Please enter your name, email, and message.");
      return;
    }
    submitting.current = true;
    setStatus("sending");
    setMessage("Sending your message…");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(profile.contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok)
        throw new Error(
          response.status === 429
            ? "Too many messages. Please wait a moment and try again."
            : "Your message could not be sent. Please try again later.",
        );
      setStatus("success");
      setMessage("Thanks for reaching out! Your message has been sent.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof TypeError
          ? "Unable to connect. Check your connection or email me directly."
          : error instanceof Error && error.name === "AbortError"
            ? "The request timed out. Please try again or email me directly."
            : error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
      );
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  }

  return (
    <form
      onSubmit={submit}
      action={profile.contactEndpoint}
      method="post"
      aria-busy={status === "sending"}
      className="contact-form"
    >
      <label htmlFor={`${idPrefix}-name`}>Your name</label>
      <input
        id={`${idPrefix}-name`}
        name="name"
        autoComplete="name"
        placeholder="What should I call you?"
        maxLength={500}
        required
        disabled={status === "sending"}
      />
      <label htmlFor={`${idPrefix}-email`}>Email address</label>
      <input
        id={`${idPrefix}-email`}
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
        disabled={status === "sending"}
      />
      <label htmlFor={`${idPrefix}-message`}>What are you thinking?</label>
      <textarea
        id={`${idPrefix}-message`}
        name="message"
        rows={4}
        maxLength={5000}
        placeholder="A little about your idea…"
        required
        disabled={status === "sending"}
      />
      <button
        className="button primary"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p
        className={`form-status ${status}`}
        role={status === "error" ? "alert" : "status"}
      >
        {message}
      </p>
    </form>
  );
}

export function ActionModal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items = ref.current?.querySelectorAll<HTMLElement>(
          "button,a,input,textarea",
        );
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="sp-modal store-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Contact Bijay Timilsina"
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 30, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X />
        </button>
        <SpiderMark />
        <span className="eyebrow">LET&apos;S BUILD THE NEXT ONE</span>
        <h2>Hire Bijay Timilsina.</h2>
        <p>
          UI/UX designer & web developer from Pokhara. Available for freelance —
          websites, Android apps, and digital content.
        </p>
        <ContactForm idPrefix="hire" />
      </motion.div>
    </motion.div>
  );
}
export function HeroSection({
  power,
  setPower,
  onHire,
}: {
  power: number;
  setPower: React.Dispatch<React.SetStateAction<number>>;
  onHire: () => void;
}) {
  const [muted, setMuted] = useState(true);
  const isAutoRef = useRef(true);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const animation = useRef<number>(0);
  const powerRef = useRef(power);
  powerRef.current = power;
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let lastTime = performance.now();
    let direction = 1;
    let pauseUntil = performance.now() + 1800;

    const tick = (now: number) => {
      const delta = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (isAutoRef.current) {
        if (now >= pauseUntil) {
          const step = 33.3 * delta * direction;
          const current = powerRef.current;
          let next = current + step;

          if (direction === 1 && next >= 100) {
            next = 100;
            direction = -1;
            pauseUntil = now + 2400;
          } else if (direction === -1 && next <= 0) {
            next = 0;
            direction = 1;
            pauseUntil = now + 2400;
          }

          setPower(next);
        }
      }

      animation.current = requestAnimationFrame(tick);
    };

    animation.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animation.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [reduced, setPower]);

  const transform = () => {
    cancelAnimationFrame(animation.current);
    isAutoRef.current = false;
    if (idleTimer.current) clearTimeout(idleTimer.current);

    const from = powerRef.current;
    const to = from > 50 ? 0 : 100;
    const start = performance.now();

    if (reduced) {
      setPower(to);
      return;
    }

    const manualTick = (now: number) => {
      const t = Math.min(1, (now - start) / 2400);
      const eased = from + (to - from) * (t * t * (3 - 2 * t));
      setPower(t >= 1 ? to : eased);
      if (t < 1) {
        animation.current = requestAnimationFrame(manualTick);
      } else {
        idleTimer.current = setTimeout(() => {
          isAutoRef.current = true;
        }, 3500);
      }
    };
    animation.current = requestAnimationFrame(manualTick);
  };

  const handleSliderChange = (val: number) => {
    cancelAnimationFrame(animation.current);
    isAutoRef.current = false;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    setPower(val);
    idleTimer.current = setTimeout(() => {
      isAutoRef.current = true;
    }, 4000);
  };

  return (
    <section className="sp-hero" id="experience">
      <div className="web-texture" />
      <div className="hero-orbit" />
      <div className="background-word" aria-hidden="true">
        BE GREATER.
      </div>
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 19) % 100}%`,
              animationDelay: `-${i * 0.7}s`,
            }}
          />
        ))}
      </div>
      <CharacterTransformation power={power} />
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="hero-kicker">
          <span /> DESIGNER · DEVELOPER · CREATOR
        </div>
        <div className="marvel-mark">Computer Engineer</div>
        <h1>BIJAY</h1>
        <p className="hero-subtitle">TIMILSINA</p>
        <p className="hero-description">
          Crafting exceptional digital experiences through clean code and
          thoughtful design. Computer engineering student, freelancer, gamer,
          and Android developer — from Lakeside, Pokhara to the wider web.
        </p>
        <button className="primary-button" onClick={onHire}>
          LET&apos;S BUILD <ArrowRight size={19} />
        </button>
        <div className="platforms">
          <span className="ps-mark">BT</span>
          <span className="platform-divider" />
          <span>UI / UX</span>
          <span className="platform-note">PRESS POWER TO BOOT</span>
        </div>
      </motion.div>
      <motion.aside
        className="hero-aside"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <PortfolioStats />
        <ChannelPreview />
      </motion.aside>
      <div className="transform-controls" id="controls">
        <button onClick={transform} className="transform-button">
          {power > 50 ? <RotateCcw size={16} /> : <Zap size={16} />}{" "}
          {power > 50 ? "BACK TO HUMAN" : "UNLEASH YOUR POWER"}
          <span>{Math.round(power)}%</span>
        </button>
        <input
          aria-label="Transformation progress"
          type="range"
          min="0"
          max="100"
          value={Math.round(power)}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
        />
        <div className="transform-labels">
          <span className={power <= 35 ? "active" : ""}>CREATOR</span>
          <span className={power >= 65 ? "active" : ""}>HERO</span>
        </div>
      </div>
      <div className="hero-bottom">
        <SocialLinks />
        <a className="scroll-cue" href="#story">
          SCROLL TO DISCOVER <span>↓</span>
        </a>
        <button
          type="button"
          className="sound-label"
          onClick={() => setMuted((m) => !m)}
          aria-label={
            muted ? "Sound muted, click to unmute" : "Sound on, click to mute"
          }
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}{" "}
          {muted ? "SOUND OFF" : "SOUND ON"}
        </button>
      </div>
    </section>
  );
}
export default function SpiderExperience() {
  const [intro, setIntro] = useState(true),
    [power, setPower] = useState(0),
    [modal, setModal] = useState(false);
  const finish = useRef(() => setIntro(false)).current;
  const close = useRef(() => setModal(false)).current;
  return (
    <div className="sp-experience">
      <AnimatePresence>
        {intro && <IntroAnimation onComplete={finish} />}
      </AnimatePresence>
      <div inert={intro}>
        <NavigationBar onHire={() => setModal(true)} />
        <main id="main">
          <HeroSection
            power={power}
            setPower={setPower}
            onHire={() => setModal(true)}
          />
          <section className="story-section" id="story">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="eyebrow">BEHIND THE MASK</span>
              <h2>
                UI/UX designer &amp; web developer.
                <br />
                <em>Anyone can ship code. It&apos;s how you craft it.</em>
              </h2>
              <div className="story-bottom">
                <p>
                  I&apos;m Bijay Timilsina, pursuing a Bachelor&apos;s in
                  Computer Engineering. As a freelancer, gamer, YouTuber, and
                  Android developer, I harness technology to build impactful
                  applications and connect with a global audience through
                  gaming and digital media.
                </p>
                <button
                  onClick={() => {
                    setPower(0);
                    document
                      .getElementById("experience")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  EXPERIENCE THE TRANSFORMATION <ArrowUpRight size={20} />
                </button>
              </div>
            </motion.div>
            <SpiderMark />
          </section>
          <section className="story-section" id="skills">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="eyebrow">CORES · STACK</span>
              <h2>
                Skills that power the suit.
                <br />
                <em>React · Django · Android · WordPress</em>
              </h2>
              <div className="story-bottom">
                <p>
                  Proficient in Python, JavaScript, and Java, with experience in
                  React.js and Django. Skilled in Git, SQL databases, and Agile
                  methodologies — plus {skills.flatMap((g) => g.items).join(", ")}.
                </p>
                <a href="#contact">
                  START A PROJECT <ArrowUpRight size={20} />
                </a>
              </div>
            </motion.div>
            <SpiderMark />
          </section>
          <section className="story-section" id="services">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="eyebrow">ARCHITECTURE</span>
              <h2>
                What I build.
                <br />
                <em>Web · Mobile · Design · Content</em>
              </h2>
              <div className="story-bottom">
                <p>
                  {services.map((s) => s.title).join(" · ")}. Responsive
                  websites, Android apps, clear interfaces, and digital content
                  from Pokhara — remote OK.
                </p>
                <button onClick={() => setModal(true)}>
                  HIRE ME <ArrowUpRight size={20} />
                </button>
              </div>
            </motion.div>
            <SpiderMark />
          </section>
          <section className="story-section" id="contact">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className="eyebrow">GOOD THINGS START WITH A HELLO</span>
              <div className="contact-panel">
                <div className="contact-copy">
                  <h2>
                    Let&apos;s make
                    <br />
                    <em>something matter.</em>
                  </h2>
                  <p>
                    A project, a collaboration, or just a conversation.
                    <br />
                    I&apos;d love to hear what you have in mind.
                  </p>
                  <div className="contact-links">
                    <a href={`mailto:${profile.email}`}>
                      <Mail size={19} />
                      {profile.email}
                    </a>
                    <a href="tel:+9779806591081">
                      <Phone size={19} />
                      {profile.phone}
                    </a>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Lakeside+Pokhara+Nepal"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MapPin size={19} />
                      {profile.location}
                    </a>
                  </div>
                  <div className="social-list">
                    {socials.slice(0, 3).map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
                <ContactForm idPrefix="page-contact" />
              </div>
            </motion.div>
          </section>
        </main>
        <footer className="sp-footer" id="credits">
          <span>
            BIJAY <b>TIMILSINA</b>
          </span>
          <p>
            <a
              href={designer.url}
              target="_blank"
              rel="noreferrer"
              title="Designed by Kiran Dhakal"
            >
              Developer, designer &amp; digital creator
            </a>{" "}
            · {profile.location}
            <br />
            © {new Date().getFullYear()} ·{" "}
            <a
              className="designed-credit"
              href={designer.url}
              target="_blank"
              rel="noreferrer"
              title="Designed by Kiran Dhakal"
            >
              Designed
            </a>
          </p>
          <a href="#main">BACK TO TOP ↑</a>
        </footer>
      </div>
      <AnimatePresence>
        {modal && <ActionModal onClose={close} />}
      </AnimatePresence>
    </div>
  );
}
