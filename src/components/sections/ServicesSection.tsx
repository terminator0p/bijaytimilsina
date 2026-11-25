import { Code2, Smartphone, PenTool, Gamepad2 } from "lucide-react";
import { services } from "@/data/portfolio";
import Reveal from "@/components/Reveal";
const icons = {
  web: Code2,
  mobile: Smartphone,
  design: PenTool,
  content: Gamepad2,
};
export default function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <Reveal>
        <div data-reveal className="section-heading">
          <div>
            <p className="eyebrow">WHAT I BRING TO THE TABLE</p>
            <h2>
              Ideas into
              <br />
              <em>experiences.</em>
            </h2>
          </div>
          <p>
            A blend of technical thinking and creative instinct. Here’s where I
            can help.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <article data-reveal className="service-card" key={service.title}>
                <Icon size={30} strokeWidth={1.3} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-tags">{service.tags}</span>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
