export default function AuthHeader({ title, subtitle, className = "" }) {
    return (
        <div className={`text-left mb-6 ${className}`}>
            {title && (
                <h1 className="text-2xl font-black tracking-tight text-slate-900">
                    {title}
                </h1>
            )}
            {subtitle && (
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
}