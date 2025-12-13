import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Terminal, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Tech Stack', href: '#tech' },
  { name: 'Experience', href: '#experience' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/DeadmanLabs',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/michael-magahey-5b76b41a0/',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/KronosKorpse',
    icon: Twitter,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <motion.a
                href="#"
                className="flex items-center gap-2 text-primary font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Terminal className="w-5 h-5" />
                <span className="font-mono">Michael Magahey</span>
              </motion.a>
              <p className="text-sm text-muted-foreground max-w-xs">
                Software Developer & Cyber Security Enthusiast building secure,
                scalable applications.
              </p>
              <div className="flex gap-2">
                {socialLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9"
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                    >
                      <link.icon className="w-4 h-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <nav className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <a
                    href="mailto:mmagahey@proton.me"
                    className="hover:text-primary transition-colors"
                  >
                    mmagahey@proton.me
                  </a>
                </p>
                <p>Toronto, Canada</p>
                <p className="text-xs mt-4">
                  Open to freelance projects and opportunities
                </p>
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              &copy; {currentYear} Michael Magahey. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using
              React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
