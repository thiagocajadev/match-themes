import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { FooterSection } from './FooterSection';

const EXPECTED_LICENSE_TOKEN = /ISC/;
const GITHUB_LINK_NAME = /GitHub/i;
const EXPECTED_GITHUB_HOST = 'github.com';

describe('FooterSection', () => {
  it('should render the ISC license line', () => {
    render(<FooterSection />);

    const licenseLine = screen.getByText(EXPECTED_LICENSE_TOKEN);

    expect(licenseLine).toBeInTheDocument();
  });

  it('should render a GitHub link to the project repository', () => {
    render(<FooterSection />);

    const githubLink = screen.getByRole('link', { name: GITHUB_LINK_NAME });
    const actualHref = githubLink.getAttribute('href') ?? '';
    const hasGithubHost = actualHref.includes(EXPECTED_GITHUB_HOST);

    expect(hasGithubHost).toBe(true);
    expect(githubLink.getAttribute('rel')).toBe('noreferrer');
  });
});
