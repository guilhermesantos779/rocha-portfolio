import { Hero } from "@/components/sections/Hero";
import { Sobre } from "@/components/sections/Sobre";
import { OQueEuFaco } from "@/components/sections/OQueEuFaco";
import { CaseMultiClipHub } from "@/components/sections/CaseMultiClipHub";
import { OutrosProjetos } from "@/components/sections/OutrosProjetos";
import { StackTecnica } from "@/components/sections/StackTecnica";
import { Contato } from "@/components/sections/Contato";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Sobre />
      <OQueEuFaco />
      <CaseMultiClipHub />
      <OutrosProjetos />
      <StackTecnica />
      <Contato />
    </main>
  );
}
