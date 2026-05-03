import { useTranslations } from "next-intl";
import {
  Search,
  Lightbulb,
  Presentation,
  FileText,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SERVICES, type ServiceKey } from "@/lib/constants";

const SERVICE_ICONS: Record<ServiceKey, typeof Search> = {
  systematicReviews: Search,
  researchConsultation: Lightbulb,
  training: Presentation,
  scientificWriting: FileText,
  aiIntegration: Sparkles,
};

export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-20">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("heading")}
            subtitle={t("subtitle")}
            fleuron
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ key, primary }, i) => {
            const Icon = SERVICE_ICONS[key];
            return (
              <ScrollReveal key={key} delay={i * 0.08}>
                <Card
                  icon={<Icon className="h-6 w-6" aria-hidden="true" />}
                  title={t(`${key}.title`)}
                  description={t(`${key}.description`)}
                  cta={t("contactCta")}
                  href="#contact"
                  primary={primary}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
