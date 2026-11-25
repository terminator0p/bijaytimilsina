import { skills } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
export default function SkillsSection() {
  return (
    <section className="section skills-section" id="skills">
      <Reveal>
        <div data-reveal className="section-heading">
          <div>
            <p className="eyebrow">MY TOOLKIT</p>
            <h2>
              Tools for <em>the idea.</em>
            </h2>
          </div>
          <p>
            Different challenges call for different tools. Always learning,
            always experimenting.
          </p>
        </div>
        <div className="skill-rows">
          {skills.map((group) => (
            <div data-reveal className="skill-row" key={group.name}>
              <h3>{group.name}</h3>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
