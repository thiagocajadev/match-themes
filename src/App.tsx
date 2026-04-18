import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLocale } from '@/i18n/LocaleContext';

import { ColorsSection } from './features/colors/ColorsSection';
import { usePaletteController } from './features/colors/usePalette';
import { FooterSection } from './features/footer/FooterSection';
import { HeroSection } from './features/hero/HeroSection';
import { NavbarSection } from './features/navbar/NavbarSection';
import { ShowcaseSection } from './features/showcase/ShowcaseSection';

const SHOWCASE_ACCORDION_VALUE = 'showcase';

export function App() {
  const palette = usePaletteController();
  const { t } = useLocale();

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
                {t.showcase.accordionLabel}
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
