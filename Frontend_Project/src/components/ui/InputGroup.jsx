export default function InputGroup({ label, type = "text", name, value, onChange, placeholder, isTextArea = false, children, ...props }) {
    return (
        <div className="w-full text-left">
            {label && (
                <label htmlFor={name} className="field-label">
                    {label}
                </label>
            )}

            {children ? (
                <div className="relative">
                    {children}
                </div>
            ) : isTextArea ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className={`field-input resize-none ${props.className || ''}`}
                    {...props}
                />
            ) : (
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className={`field-input ${props.className || ''}`}
                    {...props}
                />
            )}
        </div>
    );
}
