export default function InputGroup({ label, type, name, value, onChange, placeholder }) {

    const labelStyle = {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#334155',
        textAlign: 'left',
        marginBottom: '0.25rem'
    };

    return (
        <div>
            <label style={labelStyle}>
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
            />
        </div>
    );
}
