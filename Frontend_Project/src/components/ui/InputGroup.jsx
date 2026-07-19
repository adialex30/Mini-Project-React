export default function InputGroup({ label, type = "text", name, value, onChange, placeholder, isTextArea = false, children, ...props }) {
    return (
        <div className="w-full text-left">
            {label && (
                <label className="block text-xs font-bold text-slate-700 text-left mb-1.5 tracking-wider uppercase">
                    {label}
                </label>
            )}
            
            {/* Cek apakah komponen diatur sebagai select kustom, textarea, atau input biasa */}
            {children ? (
                <div className="relative">
                    {children}
                </div>
            ) : isTextArea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className={`w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white resize-none ${props.className || ''}`}
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className={`w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white ${props.className || ''}`}
                    {...props}
                />
            )}
        </div>
    );
}