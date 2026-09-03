import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  Badge,
  BackendIcon,
  Button,
  CircleArrow,
  CloseIcon,
  DataIcon,
  FrontendIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MenuIcon,
  PillButton,
  SectionHeading,
  Tag,
  UserIcon,
} from "@/components/ui";
import { initLocale } from "@/i18n/locale";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "UI primitives",
  robots: { index: false },
};

/**
 * Internal visual/a11y reference for the typed UI primitives (PMB-010). Every
 * primitive appears here with its variants and states. `noindex`.
 */

const ICONS = [
  ["ArrowRight", <ArrowRightIcon key="ar" />],
  ["ArrowLeft", <ArrowLeftIcon key="al" />],
  ["ArrowUp", <ArrowUpIcon key="au" />],
  ["ArrowUpRight", <ArrowUpRightIcon key="aur" />],
  ["Menu", <MenuIcon key="me" />],
  ["Close", <CloseIcon key="cl" />],
  ["User", <UserIcon key="us" />],
  ["Frontend", <FrontendIcon key="fe" />],
  ["Backend", <BackendIcon key="be" />],
  ["Data", <DataIcon key="da" />],
  ["Github", <GithubIcon key="gh" />],
  ["Linkedin", <LinkedinIcon key="li" />],
  ["Mail", <MailIcon key="ma" />],
] as const;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      {children}
    </div>
  );
}

export default async function DevPage({ params }: PageProps<"/[locale]/dev">) {
  const { locale } = await params;
  initLocale(locale);

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Portfolio · PMB-010"
        title="UI primitives"
        subtitle="Cada primitivo con sus variantes y estados. Prueba hover, foco (Tab) y :active."
      />

      <Section title="Button — variants">
        {(["dark", "light", "outline", "link"] as const).map((variant) => (
          <Row key={variant} label={variant}>
            <Button variant={variant} size="sm">
              Size sm
            </Button>
            <Button variant={variant} size="md">
              Size md
            </Button>
            <Button variant={variant} as="a" href="#dev">
              As anchor
            </Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
          </Row>
        ))}
      </Section>

      <Section title="PillButton">
        <Row label="button">
          <PillButton>¿Tienes un proyecto en mente?</PillButton>
        </Row>
        <Row label="anchor">
          <PillButton as="a" href="#dev">
            Ver en LinkedIn
          </PillButton>
        </Row>
        <Row label="arrow sm/lg">
          <PillButton arrowSize="sm">Arrow sm</PillButton>
          <PillButton arrowSize="lg">Arrow lg</PillButton>
        </Row>
      </Section>

      <Section title="CircleArrow">
        <Row label="sizes">
          <CircleArrow size="sm" />
          <CircleArrow size="md" />
          <CircleArrow size="lg" />
        </Row>
        <Row label="icons">
          <CircleArrow icon={<ArrowUpRightIcon />} />
          <CircleArrow icon={<ArrowLeftIcon />} />
        </Row>
      </Section>

      <Section title="Badge">
        <Row label="default">
          <Badge>Miguel Barra</Badge>
          <Badge>Trabajo seleccionado</Badge>
        </Row>
        <div className={styles.dark}>
          <Row label="inverse">
            <Badge tone="inverse">Trabajo seleccionado</Badge>
          </Row>
        </div>
      </Section>

      <Section title="Tag">
        <Row label="default">
          {["Next.js 16", "React 19", "TypeScript", "SWR"].map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Row>
        <div className={styles.dark}>
          <Row label="inverse">
            {["Next.js 16", "Vercel"].map((tag) => (
              <Tag key={tag} tone="inverse">
                {tag}
              </Tag>
            ))}
          </Row>
        </div>
      </Section>

      <Section title="SectionHeading">
        <SectionHeading
          eyebrow={<Badge>Miguel Barra</Badge>}
          title="Integro frontend, backend e infraestructura"
          subtitle="No solo qué construyo, también cómo lo construyo y cómo lo pruebo."
        />
        <SectionHeading variant="ghost" title="Proyectos" as="h3" />
      </Section>

      <Section title="Icon set">
        <div className={styles.iconGrid}>
          {ICONS.map(([name, node]) => (
            <div key={name} className={styles.iconCell}>
              {node}
              <span>{name}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
