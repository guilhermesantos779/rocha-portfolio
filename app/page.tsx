import { IntroSequence } from "@/components/sections/IntroSequence";
import { CaseMultiClipHubComposition } from "@/components/sections/CaseMultiClipHubComposition";
import { OutrosProjetos } from "@/components/sections/OutrosProjetos";
import { StackTecnica } from "@/components/sections/StackTecnica";
import { Contato } from "@/components/sections/Contato";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <IntroSequence />
      <CaseMultiClipHubComposition />
      <OutrosProjetos />
      <StackTecnica />
      <Contato />
    </main>
  );
}
