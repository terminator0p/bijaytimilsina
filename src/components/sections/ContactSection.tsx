"use client";
import { useRef, useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { profile, socials } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
export default function ContactSection() {
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
    <section className="section contact-section" id="contact">
      <Reveal className="contact-grid">
        <div data-reveal className="contact-copy">
          <p className="eyebrow">GOOD THINGS START WITH A HELLO</p>
          <h2>
            Let’s make
            <br />
            <em>something matter.</em>
          </h2>
          <p>
            A project, a collaboration, or just a conversation.
            <br />
            I’d love to hear what you have in mind.
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
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <form
          onSubmit={submit}
          action={profile.contactEndpoint}
          method="post"
          aria-busy={status === "sending"}
          data-reveal
          className="contact-form"
        >
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="What should I call you?"
            maxLength={500}
            required
            disabled={status === "sending"}
          />
          <label htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            disabled={status === "sending"}
          />
          <label htmlFor="contact-message">What are you thinking?</label>
          <textarea
            id="contact-message"
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
      </Reveal>
    </section>
  );
}
