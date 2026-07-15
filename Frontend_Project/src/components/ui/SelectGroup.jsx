export default function SelectGroup({ label, name, value, onChange, options }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 text-left mb-1">
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white"
                required
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
