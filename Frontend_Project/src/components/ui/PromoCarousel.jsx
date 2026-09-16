import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const DUMMY_PROMOS = [
  {
    id: 1,
    title: "Diskon Kilat Aset Digital!",
    description: "Dapatkan potongan hingga 50% untuk seluruh source code dan template UI premium minggu ini.",
    code: "DIGITAL50",
    badge: "Limited Offer",
    bgClass: "bg-red-600"
  },
  {
    id: 2,
    title: "Spesial Pengguna Baru",
    description: "Tanpa minimal transaksi, klaim voucher pertama Anda untuk aset developer pilihan.",
    code: "STARTUPNEW",
    badge: "New Member",
    bgClass: "bg-neutral-900"
  },
  {
    id: 3,
    title: "Bundle Hemat Desainer",
    description: "Mulai dari 3D asset hingga kit icon premium dalam satu harga paket super hemat.",
    code: "DESIGNKIT",
    badge: "Mega Bundle",
    bgClass: "bg-neutral-800"
  }
];

export default function PromoCarousel({ promos = DUMMY_PROMOS, autoPlaySpeed = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? promos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === promos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, promos.length]);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, autoPlaySpeed);
    return () => clearInterval(slideInterval);
  }, [nextSlide, autoPlaySpeed]);

  if (!promos || promos.length === 0) return null;

  return (
    <div className="group relative mb-8 w-full overflow-hidden border border-neutral-200">

      <div className="relative h-60 w-full overflow-hidden sm:h-52">
        {promos.map((promo, idx) => (
          <div
            key={promo.id}
            className={`absolute inset-0 flex h-full w-full flex-col justify-between ${promo.bgClass} p-6 text-white transition-all duration-700 ease-in-out sm:p-8 ${
              idx === currentIndex
                ? 'translate-x-0 opacity-100'
                : 'pointer-events-none translate-x-6 opacity-0'
            }`}
          >
            <div className="max-w-xl text-left">
              <span className="mb-3 inline-block bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">
                {promo.badge}
              </span>
              <h2 className="mb-2 text-xl font-black tracking-tight sm:text-2xl text-white">
                {promo.title}
              </h2>
              <p className="line-clamp-2 text-sm font-medium leading-relaxed text-white/85">
                {promo.description}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 border border-white/25 bg-black/20 px-3.5 py-2">
                <span className="text-[11px] font-medium uppercase tracking-wide text-white/70">Kode:</span>
                <span className="text-xs font-bold uppercase tracking-wide">{promo.code}</span>
              </div>
              <button className="flex items-center gap-1.5 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-neutral-100 active:scale-[0.97]">
                Klaim Sekarang <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        aria-label="Slide sebelumnya"
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 border border-neutral-200 bg-white/90 p-2 text-neutral-700 opacity-0 transition-all hover:bg-white hover:text-red-600 group-hover:opacity-100 sm:block active:scale-95"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide berikutnya"
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 border border-neutral-200 bg-white/90 p-2 text-neutral-700 opacity-0 transition-all hover:bg-white hover:text-red-600 group-hover:opacity-100 sm:block active:scale-95"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {promos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
            }`}
            aria-label={`Ke slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
