import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Flame, Gem, Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/problems', label: 'Problems' },
  { to: '/learn', label: 'Learn' },
  { to: '/social', label: 'Community' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  return (
    <nav
      className={
        'fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ease-out border-b ' +
        (scrolled
          ? 'bg-bg-primary/90 backdrop-blur-md border-border-default'
          : 'bg-transparent border-transparent')
      }
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <span className="text-accent-primary font-mono text-xl font-bold">&lt;/&gt;</span>
          <span className="text-white font-bold text-xl tracking-tight">Leet</span>
          <span className="text-accent-primary font-bold text-xl tracking-tight">Grammar</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                'px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ' +
                (isActive(link.to)
                  ? 'text-text-primary border-b-2 border-accent-primary'
                  : 'text-text-secondary hover:text-text-primary')
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors text-sm bg-bg-tertiary hover:bg-bg-elevated rounded-lg px-3 py-1.5 border border-border-default"
          >
            <Search className="w-4 h-4" />
            <span className="text-text-muted text-xs">Ctrl K</span>
          </button>

          <div className="flex items-center gap-1 text-accent-primary">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-semibold">12</span>
          </div>

          <div className="flex items-center gap-1 text-diamond">
            <Gem className="w-4 h-4" />
            <span className="text-sm font-semibold">342</span>
          </div>

          <Link
            to="/profile"
            className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold border border-border-default text-text-primary hover:bg-bg-tertiary transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-text-secondary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-bg-primary/95 backdrop-blur-md border-b border-border-default md:hidden z-50">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  'px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ' +
                  (isActive(link.to)
                    ? 'text-accent-primary bg-bg-tertiary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary')
                }
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 px-3 py-2 border-t border-border-subtle mt-2 pt-2">
              <div className="flex items-center gap-1 text-accent-primary">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-semibold">12</span>
              </div>
              <div className="flex items-center gap-1 text-diamond">
                <Gem className="w-4 h-4" />
                <span className="text-sm font-semibold">342</span>
              </div>
              <Link
                to="/profile"
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-border-default text-text-primary ml-auto"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
