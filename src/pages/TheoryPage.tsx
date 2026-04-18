import { Link } from 'react-router-dom';
import { TheorySection } from '../features/theory/TheorySection';

export function TheoryPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="font-mono text-[11px] uppercase tracking-widest text-stone-400 hover:text-stone-600"
          >
            ← Match Themes
          </Link>
        </div>
      </header>

      <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <TheorySection />
        </div>
      </main>
    </div>
  );
}
