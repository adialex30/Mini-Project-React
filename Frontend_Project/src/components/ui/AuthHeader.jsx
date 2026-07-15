export default function AuthHeader({ title, subtitle }) {
    return (
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-indigo-600">
                {title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
                {subtitle}
            </p>
        </div>
    );
}
