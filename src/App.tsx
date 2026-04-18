import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { ColorsSection } from './features/colors/ColorsSection';
import { usePaletteController } from './features/colors/usePalette';
import { FooterSection } from './features/footer/FooterSection';
import { HeroSection } from './features/hero/HeroSection';
import { NavbarSection } from './features/navbar/NavbarSection';
import { ShowcaseSection } from './features/showcase/ShowcaseSection';

const SHOWCASE_ACCORDION_VALUE = 'showcase';
const SHOWCASE_ACCORDION_LABEL = 'Showcase preview';

export function App() {
  const palette = usePaletteController();

  const view = (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <NavbarSection palette={palette} />

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <HeroSection palette={palette} />
          <ColorsSection palette={palette} />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={SHOWCASE_ACCORDION_VALUE}>
              <AccordionTrigger className="font-mono text-[11px] uppercase tracking-widest text-stone-500">
                {SHOWCASE_ACCORDION_LABEL}
              </AccordionTrigger>
              <AccordionContent>
                <ShowcaseSection palette={palette} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FooterSection />
        </div>
      </main>
    </div>
  );

  return view;
}
