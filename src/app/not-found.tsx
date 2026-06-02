import Link from 'next/link';

const quickLinks = [
  {
    href: '/contracts',
    label: 'View Contracts',
    description: 'Pick up where you left off',
  },
  {
    href: '/milestones',
    label: 'Track Milestones',
    description: 'See your project checkpoints',
  },
  {
    href: '/reputation',
    label: 'My Reputation',
    description: 'Check your work history',
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--background)]">
      <div className="max-w-md w-full text-center space-y-8">
        <div aria-hidden="true" className="text-6xl font-bold text-gray-200">
          404
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-gray-600">
            This page doesn&apos;t exist or the link may have expired. Here are
            a few places to get back on track.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="sr-only">Where would you like to go?</h2>
          <ul className="flex flex-col gap-3">
            {quickLinks.map(({ href, label, description }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-3 px-5 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                >
                  <span className="font-medium text-gray-900">{label}</span>
                  <span className="hidden sm:inline text-gray-400">—</span>
                  <span className="text-sm text-gray-500">{description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            Go Home
          </Link>
          <a
            href="mailto:support@talenttrust.io"
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}
