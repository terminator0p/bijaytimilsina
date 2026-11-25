import Section from "@/components/sections/ServicesSection";
import PageShell from "@/components/PageShell";
import { metadataFor } from "@/utils/seo";
export const metadata = metadataFor("Services", "/services/");
export default function Page() {
  return (
    <PageShell label="Services" title="From an idea to an experience.">
      <Section />
    </PageShell>
  );
}
