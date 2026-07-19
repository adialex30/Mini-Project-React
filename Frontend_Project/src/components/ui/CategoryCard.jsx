export default function CategoryCard({ img, alt, title, desc, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer text-left"
    >
      {/* Efek Sorot Cahaya Halus Saat Hover (Aksen Cerah) */}
      <div className="absolute -right-12 -top-12 -z-10 h-24 w-24 rounded-full bg-indigo-50 blur-2xl transition-all duration-500 group-hover:bg-indigo-100/70"></div>

      <div className="space-y-4">
        {/* Wadah Ikon/Gambar Kategori (Clean Gray ke Soft Indigo) */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 transition-colors duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50/50">
          <img 
            src={img} 
            alt={alt || title} 
            className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110" 
          />
        </div>

        {/* Konten Teks (Kontras Tinggi) */}
        <div className="space-y-1">
          <h3 className="text-sm font-black text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
            {title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {desc}
          </p>
        </div>
      </div>

      {/* Indikator Aksi Pojok Bawah */}
      <div className="mt-4 flex justify-end">
        <span className="text-xs font-bold text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-600 uppercase tracking-wider">
          Jelajahi →
        </span>
      </div>
    </div>
  );
}