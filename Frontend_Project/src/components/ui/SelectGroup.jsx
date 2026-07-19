export default function SelectGroup({ label, name, value, onChange, options, className = "" }) {
    return (
        <div className="w-full text-left">
            {label && (
                <label className="block text-xs font-bold text-slate-700 text-left mb-1.5 tracking-wider uppercase">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    // Diselaraskan sempurna dengan gaya cerah premium dari InputGroup
                    className={`w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white appearance-none cursor-pointer ${className}`}
                >
                    {options && options.map((option) => (
                        <option 
                            key={option.value} 
                            value={option.value}
                            className="bg-white text-slate-900 py-2" // Menyelaraskan background opsi saat dropdown terbuka
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                
                {/* Custom Arrow Icon (Ikon panah kustom yang disesuaikan untuk layar terang) */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}