import { useTranslations } from "next-intl";
import {
  Search,
  Database,
  GraduationCap,
  Brain,
  Lightbulb,
  Presentation,
  FileText,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SERVICE_KEYS = [
  { key: "systematicReviews", icon: Search },
  { key: "knowledgeManagement", icon: Database },
  { key: "learningDevelopment", icon: GraduationCap },
  { key: "medicalAI", icon: Brain },
  { key: "researchConsultation", icon: Lightbulb },
  { key: "training", icon: Presentation },
  { key: "scientificWriting", icon: FileText },
  { key: "aiIntegration", icon: Sparkles },
] as const;

export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-20">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_KEYS.map(({ key, icon: Icon }, i) => (
            <ScrollReveal key={key} delay={i * 0.08}>
              <Card
                icon={<Icon className="h-6 w-6" />}
                title={t(`${key}.title`)}
                description={t(`${key}.description`)}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
