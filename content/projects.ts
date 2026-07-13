import type { ProjectCard } from "./types";

export const outrosProjetosTag = "Projetos em construção com clientes";

export const projects: ProjectCard[] = [
  {
    name: "Alma Creator",
    status: "projeto em construção · cliente",
    description:
      "Estúdio de direção visual, conteúdo e cobertura de eventos. Site construído com identidade forte e narrativa própria — cada serviço apresentado como uma 'cena'.",
    href: "https://alma-creator-nine.vercel.app",
    external: true,
    screenshots: [
      "/projects/alma-creator-1.png",
      "/projects/alma-creator-2.png",
      "/projects/alma-creator-3.png",
    ],
    differentiator:
      "Cada serviço vira uma 'cena' narrada, não um item de lista — a identidade visual carrega a apresentação sozinha.",
  },
  {
    name: "Olympia Gestão Esportiva",
    status: "projeto em construção · cliente",
    description:
      "Plataforma para gestão esportiva de condomínios em todo o estado de São Paulo — professores, grade de horários e operação completa, sem complicar a vida do síndico.",
    href: "https://olympia-site.vercel.app",
    external: true,
    screenshots: [
      "/projects/olympia-1.png",
      "/projects/olympia-2.png",
      "/projects/olympia-3.png",
    ],
    differentiator:
      "O síndico não gerencia nada — a operação (professores, grade, substituições) roda inteira por trás da plataforma.",
  },
];
