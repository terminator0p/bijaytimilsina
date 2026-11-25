"use client";
import { useState } from "react";
import { Gamepad2, Play, Code2, Smartphone } from "lucide-react";
import { explorations } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  return (
    <section className="section projects-section" id="projects">
      <Reveal>
        <div data-reveal className="section-heading">
          <div>
            <p className="eyebrow">AN OPEN EXPLORATION</p>
            <h2>
              Code meets
              <br />
              <em>creative energy.</em>
            </h2>
          </div>
          <p>
            A window into my interests and practice, from building digital
            products to creating gaming content.
          </p>
        </div>
        <div
          data-reveal
          className="filter-bar"
          aria-label="Filter explorations"
        >
          {["All", "Development", "Creative"].map((item) => (
            <button
              key={item}
              aria-pressed={item === filter}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
          <span>INTERESTS & CREATIVE PRACTICE</span>
        </div>
        <div className="project-grid" aria-live="polite">
          {explorations
            .filter((p) => filter === "All" || p.category === filter)
            .map((project) => (
              <article
                data-reveal
                className={`project-card ${project.visual}`}
                key={project.title}
              >
                <div className="project-visual" aria-hidden="true">
                  {project.visual === "web" ? (
                    <div className="browser-art">
                      <div className="browser-dots">● ● ●</div>
                      <div className="browser-content">
                        <Code2 size={42} />
                        <div className="art-line" />
                        <div className="art-line short" />
                        <div className="art-blocks">
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                    </div>
                  ) : project.visual === "mobile" ? (
                    <div className="phone-art">
                      <span />
                      <Smartphone size={42} />
                      <div className="phone-wave" />
                      <i />
                      <i />
                    </div>
                  ) : (
                    <div className="gaming-art">
                      <Gamepad2 size={110} strokeWidth={1} />
                      <span>PRESS PLAY</span>
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.href && (
                    <a
                      className="text-link"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Play size={16} /> Visit my channel
                    </a>
                  )}
                </div>
              </article>
            ))}
        </div>
      </Reveal>
    </section>
  );
}
