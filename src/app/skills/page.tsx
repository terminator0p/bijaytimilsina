import Section from "@/components/sections/SkillsSection";
import PageShell from "@/components/PageShell";
import { metadataFor } from "@/utils/seo";
export const metadata = metadataFor("Skills", "/skills/");
export default function Page() {
  return (
    <PageShell label="Skills" title="A toolkit that keeps growing.">
      <Section />
    </PageShell>
  );
}
