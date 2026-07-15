export function CategoryCard({ img, alt, title, desc }) {
  return (
    <div className="card border border-slate-100 p-6 rounded-2xl hover:shadow-lg transition-shadow space-y-3 bg-white">
      <div className="icon w-12 h-12 flex items-center justify-center bg-slate-50 rounded-xl">
        <img src={img} alt={alt} className="w-8 h-8" />
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}