import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '#updates', label: 'Updates' },
  { href: '#download', label: 'Download' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMobileMenuOpen
          ? 'bg-background/95 backdrop-blur-xl border-b border-purple-500/10 shadow-lg shadow-purple-900/10'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/amethyst-logo.jpg"
                alt="Amethyst"
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-serif text-xl md:text-2xl font-bold text-gradient">
              Amethyst
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <a
              href="https://github.com/vitorpamplona/amethyst"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>

            <a href="#download" className="hidden md:block">
              <Button className="bg-amethyst-gradient hover:opacity-90 text-white font-semibold px-6">
                Download
              </Button>
            </a>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-500/20 bg-background/95 backdrop-blur-xl animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 px-4 py-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="flex-1"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
                <a
                  href="https://github.com/vitorpamplona/amethyst"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </a>
              </div>
              <a href="#download" className="px-4">
                <Button className="w-full bg-amethyst-gradient hover:opacity-90 text-white font-semibold">
                  Download Now
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
