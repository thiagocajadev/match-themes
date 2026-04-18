import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLocale } from '@/i18n/LocaleContext';

import { THEORY_ENTRIES_EN } from './entries.en';
import { THEORY_ENTRIES_PT_BR } from './entries.pt-BR';
import { ColorWheel } from './ColorWheel';

const SECTION_ID = 'theory-heading';

export function TheorySection() {
  const { locale, t } = useLocale();
  const entries = locale === 'pt-BR' ? THEORY_ENTRIES_PT_BR : THEORY_ENTRIES_EN;

  return (
    <section aria-labelledby={SECTION_ID} className="flex w-full flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h2
          id={SECTION_ID}
          className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
        >
          {t.theory.pageTitle}
        </h2>
        <p className="max-w-3xl text-lg leading-relaxed text-stone-500 sm:text-xl">
          {t.theory.pageSubtitle}
        </p>

        <div className="mt-4 flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:gap-16">
          <ColorWheel size={260} className="shrink-0" />
          <div className="flex flex-col gap-4 pt-2 text-base leading-relaxed text-stone-500 sm:text-lg">
            <p>{t.theory.intro1}</p>
            <p>{t.theory.intro2}</p>
            <p>{t.theory.intro3}</p>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {entries.map((entry) => (
          <AccordionItem key={entry.id} value={entry.id}>
            <AccordionTrigger className="font-display py-5 text-lg font-semibold text-stone-800 hover:text-stone-600 hover:no-underline sm:text-2xl">
              {entry.trigger}
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-6 pt-2">{entry.body}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
