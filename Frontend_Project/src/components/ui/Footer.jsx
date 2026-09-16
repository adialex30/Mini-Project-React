import { Globe, Mail, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: Globe, href: '#website', label: 'Website' },
  { icon: MessageCircle, href: '#community', label: 'Komunitas' },
  { icon: Mail, href: 'mailto:hello@dibiassets.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <div className="mb-3 flex items-center justify-center gap-0 md:justify-start">
              <div className="flex h-8 items-center bg-red-600 px-2">
                <span className="font-display text-xs font-black uppercase tracking-wide text-white">Dibi</span>
              </div>
              <span className="font-display text-xs font-black uppercase tracking-wide text-neutral-900">Assets</span>
            </div>
            <p className="max-w-xs text-sm text-neutral-500">
              Marketplace aset digital untuk developer &amp; kreator profesional.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-neutral-500 md:justify-end">
            <a href="#about" className="transition-colors hover:text-red-600">Tentang Kami</a>
            <a href="#contact" className="transition-colors hover:text-red-600">Kontak</a>
            <a href="#terms" className="transition-colors hover:text-red-600">Syarat Layanan</a>
            <a href="#privacy" className="transition-colors hover:text-red-600">Kebijakan Privasi</a>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-neutral-200 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} DibiTech. All rights reserved.
          </p>
          <div className="flex gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center border border-neutral-200 text-neutral-500 transition-all hover:border-neutral-900 hover:text-neutral-900"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
