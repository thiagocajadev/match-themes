const GITHUB_REPO_URL = 'https://github.com/thiagocajadev/match-themes';
const PROJECT_NAME = 'Match Themes';
const LICENSE_LABEL = 'ISC';
const TECH_CREDIT = 'Built with Vite · React · Tailwind v4 · OKLCH';
const GITHUB_LINK_LABEL = 'GitHub';
const COPYRIGHT_YEAR = new Date().getFullYear();

export function FooterSection() {
  const copyrightLine = `© ${COPYRIGHT_YEAR} ${PROJECT_NAME} · ${LICENSE_LABEL}`;

  const view = (
    <footer
      aria-label="Site footer"
      className="flex w-full flex-col gap-3 border-t border-stone-200 pt-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="font-mono text-xs uppercase tracking-widest">{copyrightLine}</p>

      <div className="flex flex-wrap items-center gap-4">
        <span className="italic">{TECH_CREDIT}</span>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-stone-700 underline-offset-4 hover:underline"
        >
          {GITHUB_LINK_LABEL}
        </a>
      </div>
    </footer>
  );

  return view;
}
