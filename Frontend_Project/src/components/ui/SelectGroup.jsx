import { ChevronDown } from 'lucide-react';

export default function SelectGroup({ label, name, value, onChange, options, className = "" }) {
    return (
        <div className="w-full text-left">
            {label && (
                <label htmlFor={name} className="field-label">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    className={`field-select ${className}`}
                >
                    {options && options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-white text-neutral-900 py-2"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-neutral-400">
                    <ChevronDown className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
}
