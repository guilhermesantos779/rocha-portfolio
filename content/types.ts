export type CtaKind = "anchor" | "external";

export interface Cta {
  label: string;
  href: string;
  kind: CtaKind;
}

export interface HeroCopy {
  headline: string;
  subheadline: string;
  ctaPrimary: Cta;
  ctaSecondary: Cta;
}

export interface SobreCopy {
  paragraphs: string[];
}

export interface PillarItem {
  number: string;
  title: string;
  description: string;
}

export interface CaseMetric {
  value: number;
  label: string;
  suffix?: string;
}

export interface CaseStudyCopy {
  tag: string;
  title: string;
  problema: string;
  solucao: string;
  ondeEsta: string;
  cta: Cta;
  metric?: CaseMetric;
}

export interface ProjectCard {
  name: string;
  status: string;
  description: string;
  href: string;
  external: boolean;
  /** Real screenshots of the live site, shown in a device mockup. */
  screenshots: string[];
}

export interface StackItem {
  label: string;
}

export type SocialPlatform = "github" | "linkedin" | "instagram" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface ContatoCopy {
  title: string;
  text: string;
}
