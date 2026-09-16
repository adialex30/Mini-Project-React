import { ArrowRight, Layers, ShieldCheck, Zap, Star } from 'lucide-react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

const features = [
  {
    icon: Layers,
    title: 'Lisensi Fleksibel',
    desc: 'Gunakan untuk proyek pribadi maupun komersial tanpa aturan yang rumit.',
  },
  {
    icon: ShieldCheck,
    title: 'Kualitas Terverifikasi',
    desc: 'Setiap aset melewati proses kurasi ketat untuk menjamin fungsionalitas dan kerapian.',
  },
  {
    icon: Zap,
    title: 'Unduh Instan',
    desc: 'Begitu transaksi selesai, aset digital langsung tersedia di dasbor untuk diunduh.',
  },
];

export default function LandingPage({ onNavigateToLogin, onNavigateToRegister }) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar
        user={null}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToRegister={onNavigateToRegister}
      />

      <main className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-20 text-center sm:pt-28">
        <div className="flex items-center gap-2">
          <span className="h-3 w-1 bg-red-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">
            Marketplace Aset Digital
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl">
          Akselerasi proyek Anda dengan aset digital terbaik
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-500">
          Temukan ribuan source code, template UI/UX, desain grafis, hingga model 3D siap pakai
          karya kreator profesional. Unduh instan dan tingkatkan efisiensi kerja Anda sekarang.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <button
            onClick={onNavigateToLogin}
            className="btn-primary group w-full px-8 py-4 sm:w-auto"
          >
            <span>Jelajahi Marketplace</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={onNavigateToRegister}
            className="btn-secondary w-full px-8 py-4 sm:w-auto"
          >
            Mulai Jual Karya
          </button>
        </div>

        {/* Features */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-px border border-neutral-200 bg-neutral-200 text-left sm:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="space-y-3 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center bg-neutral-900 text-white">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
              <p className="text-xs leading-relaxed text-neutral-500">{desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
