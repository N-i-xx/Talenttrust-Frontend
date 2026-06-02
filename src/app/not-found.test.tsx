import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

describe('NotFound page', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('renders the h1 heading', () => {
    expect(
      screen.getByRole('heading', { level: 1, name: /page not found/i }),
    ).toBeInTheDocument();
  });

  it('renders the descriptive paragraph', () => {
    expect(
      screen.getByText(/this page doesn't exist or the link may have expired/i),
    ).toBeInTheDocument();
  });

  it('renders 404 as decorative and hidden from assistive technology', () => {
    const decorative = screen.getByText('404');
    expect(decorative).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the quick links nav with an accessible label', () => {
    expect(screen.getByRole('navigation', { name: /quick links/i })).toBeInTheDocument();
  });

  it('renders a link to /contracts', () => {
    expect(
      screen.getByRole('link', { name: /view contracts/i }),
    ).toHaveAttribute('href', '/contracts');
  });

  it('renders a link to /milestones', () => {
    expect(
      screen.getByRole('link', { name: /track milestones/i }),
    ).toHaveAttribute('href', '/milestones');
  });

  it('renders a link to /reputation', () => {
    expect(
      screen.getByRole('link', { name: /my reputation/i }),
    ).toHaveAttribute('href', '/reputation');
  });

  it('renders the Go Home link pointing to /', () => {
    expect(screen.getByRole('link', { name: /go home/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders the Contact Support link', () => {
    expect(
      screen.getByRole('link', { name: /contact support/i }),
    ).toHaveAttribute('href', 'mailto:support@talenttrust.io');
  });

  it('all links are keyboard reachable (rendered as anchor elements)', () => {
    const links = screen.getAllByRole('link');
    // Go Home, Contact Support + 3 quick links = 5
    expect(links.length).toBe(5);
    links.forEach((link) => {
      expect(link.tagName).toBe('A');
    });
  });

  it('matches snapshot', () => {
    const { container } = render(<NotFound />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
