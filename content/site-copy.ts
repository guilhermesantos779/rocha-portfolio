import type {
  CaseStudyCopy,
  ContatoCopy,
  HeroCopy,
  PillarItem,
  SobreCopy,
} from "./types";

export const heroCopy: HeroCopy = {
  headline: "Eu construo produtos para quem cria.",
  subheadline:
    "Founder e desenvolvedor. Construo ferramentas e sites para criadores de conteúdo e marcas que precisam de estrutura pra crescer de verdade.",
  ctaPrimary: {
    label: "Conhecer o MultiClipHub",
    href: "#multiclip-case",
    kind: "anchor",
  },
  ctaSecondary: {
    label: "Falar com o Rocha",
    href: "#contato",
    kind: "anchor",
  },
};

export const sobreCopy: SobreCopy = {
  paragraphs: [
    "Sou o Rocha — founder e desenvolvedor.",
    "Comecei enxergando um problema de perto: um amigo próximo, hoje meu sócio, vive do universo de clipes e vídeos curtos de lives — e sentia na pele as dores de quem faz isso todo dia. Fomos atrás de entender o tamanho do problema, batemos em comunidades e descobrimos que não era só ele: o mercado inteiro de clipadores dependia de Discord e grupos soltos pra organizar o que deveria ser uma operação profissional.",
    "As ferramentas que existiam resolviam só metade do problema — todas apostavam em edição por IA, e ninguém tinha construído o essencial: um lugar único pra unificar a postagem em todas as plataformas, com um ambiente de comunidade e competição pra quem clipa.",
    "Foi aí que decidimos criar o MultiClipHub.",
    "Hoje divido meu tempo entre construir o produto e desenvolver sites e sistemas para outras marcas — porque no fim, é a mesma coisa: identificar um problema real e construir a solução certa pra ele.",
  ],
};

export const pillars: PillarItem[] = [
  {
    number: "01",
    title: "Produto",
    description:
      "Da dor real à solução no ar. Pesquisa de mercado, validação com comunidade, definição de escopo e construção do MVP — do zero ao lançamento.",
  },
  {
    number: "02",
    title: "Desenvolvimento",
    description:
      "Sites e sistemas construídos com HTML, CSS, JavaScript, TypeScript, React e Node.js. Interface pensada em UI/UX, não só em código que funciona.",
  },
  {
    number: "03",
    title: "Estratégia",
    description:
      "Presença digital com intenção — do posicionamento à execução, sempre com o mesmo raciocínio: entender o problema antes de sair construindo.",
  },
];

export const caseMultiClipHub: CaseStudyCopy = {
  tag: "Produto próprio · Em fase de lançamento",
  title: "MultiClipHub — a central dos clipadores",
  problema:
    "Criadores que trabalham com clipes de lives e vídeos curtos não tinham um lugar unificado pra postar em todas as plataformas de uma vez. Pior: tudo que existia no mercado era ferramenta de edição por IA — ninguém tinha resolvido a organização, a comunidade e a competição entre clipadores, que até hoje só acontece espalhada em Discords e grupos soltos.",
  solucao:
    "Construímos o MultiClipHub: uma plataforma que une postagem unificada com um espaço de comunidade e competição — o escritório e a rede social que o clipador nunca teve. Validado direto com a comunidade antes de escrever a primeira linha de código.",
  ondeEsta:
    "Em fase de lançamento, com uma promessa validada dentro de um nicho que hoje só se organiza de forma improvisada.",
  // já estamos na seção do case — o CTA aqui direciona pra conversa, não pra si mesma
  cta: {
    label: "Conhecer o MultiClipHub →",
    href: "#contato",
    kind: "anchor",
  },
  // métrica real de lançamento ainda não definida — Counter só renderiza quando este campo existir
  metric: undefined,
};

export const contatoCopy: ContatoCopy = {
  title: "Bora construir algo?",
  text: "Seja pra falar do MultiClipHub, seja pra tirar um projeto do papel — chama.",
};
