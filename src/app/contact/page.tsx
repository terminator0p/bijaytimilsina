import Section from "@/components/sections/ContactSection";
import PageShell from "@/components/PageShell";
import { metadataFor } from "@/utils/seo";
export const metadata = metadataFor("Contact", "/contact/");
export default function Page() {
  return (
    <PageShell label="Contact" title="Every idea starts somewhere.">
      <Section />
    </PageShell>
  );
}
