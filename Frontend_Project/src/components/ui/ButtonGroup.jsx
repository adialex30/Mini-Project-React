export default function ButtonGroup({ onClick, children, className = "", ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      // Desain diubah menjadi tema cerah, bersih, dan premium
      className={`inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm shadow-slate-100 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-indigo-100 ${className}`}
      {...props}
    >
      {/* Icon Plus Minimalis Modern (Indigo Cerah) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2.5} 
        stroke="currentColor" 
        className="h-3.5 w-3.5 text-indigo-600"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      
      {/* Menggunakan format huruf kapital agar serasi dengan tombol utama */}
      <span className="uppercase tracking-wider">{children || "Create New"}</span>
    </button>
  );
}