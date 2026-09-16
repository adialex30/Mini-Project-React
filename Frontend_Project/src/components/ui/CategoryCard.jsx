import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ img, alt, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer flex-col justify-between border border-neutral-200 bg-white p-6 text-left transition-colors duration-200 hover:border-neutral-900">
      <div className="space-y-4">
        <div className="flex h-11 w-11 items-center justify-center border border-neutral-200 bg-neutral-50 transition-colors duration-200 group-hover:border-neutral-900 group-hover:bg-neutral-900">
          <img
            src={img}
            alt={alt || title}
            className="h-5 w-5 object-contain transition-all duration-200 group-hover:invert"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-neutral-900 transition-colors duration-200 group-hover:text-red-600">
            {title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500">
            {desc}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red-600">
          Jelajahi <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
