export default function AuthHeader({ title, subtitle, className = "" }) {
    return (
        <div className={`text-left ${className}`}>
            {title && (
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                    {title}
                </h1>
            )}
            {subtitle && (
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
