import { Link } from 'react-router-dom'

const productLinks = [
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/problems', label: 'Problems' },
  { to: '/learn', label: 'Learn' },
  { to: '/social', label: 'Community' },
]

const resourceLinks = [
  { to: '/learn', label: 'About' },
  { to: '/learn', label: 'FAQ' },
  { to: '/learn', label: 'Blog' },
]

const connectLinks = [
  { to: '/social', label: 'Discord', external: false },
  { to: '/social', label: 'GitHub', external: false },
  { to: '/social', label: 'Twitter', external: false },
]

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-1 mb-3">
              <span className="text-accent-primary font-mono text-lg font-bold">&lt;/&gt;</span>
              <span className="text-white font-bold text-lg tracking-tight">Leet</span>
              <span className="text-accent-primary font-bold text-lg tracking-tight">Grammar</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Master Somali grammar through interactive, gamified lessons powered by graph technology.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-primary transition-all duration-200 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-primary transition-all duration-200 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-primary transition-all duration-200 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-border-subtle text-center">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} LeetGrammar. Built with care for Somali language learners everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
