import Section from "@/components/sections/ProjectsSection";
import PageShell from "@/components/PageShell";
import { metadataFor } from "@/utils/seo";
export const metadata = metadataFor("Projects", "/projects/");
export default function Page() {
  return (
    <PageShell label="Projects" title="A world of possibilities.">
      <Section />
    </PageShell>
  );
}
