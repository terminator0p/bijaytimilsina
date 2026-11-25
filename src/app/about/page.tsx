import Section from "@/components/sections/AboutSection";
import PageShell from "@/components/PageShell";
import { metadataFor } from "@/utils/seo";
export const metadata = metadataFor("About", "/about/");
export default function Page() {
  return (
    <PageShell label="About" title="The person behind the pixels.">
      <Section />
    </PageShell>
  );
}
