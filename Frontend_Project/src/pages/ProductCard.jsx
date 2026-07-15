export default function ProductCard({ product }) {
  const isLowStock = product.stock < 50;

  const stockBadgeStyle = {
    backgroundColor: isLowStock ? '#fee2e2' : '#e0f2fe',
    color: isLowStock ? '#ef4444' : '#0369a1',
    padding: '0.25rem 0.6rem',
    borderRadius: '0.375rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'inline-block'
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
            {product.category_name || 'Kategori'}
          </span>
          <span style={stockBadgeStyle}>
            Stok: {product.stock}
          </span>
        </div>
        <h3 className="text-base font-bold text-slate-800 line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 min-h-[40px] mb-4">
          {product.description}
        </p>
      </div>
      <div>
        <div className="text-lg font-black text-indigo-600 mb-4">
          {formatRupiah(product.price)}
        </div>
      </div>
    </div>
  );
}