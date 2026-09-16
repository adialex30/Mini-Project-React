import { useState } from 'react';
import { Trash2, ShoppingCart, AlertTriangle, X, Pencil, Eye, ImageOff } from 'lucide-react';

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4">
      <div className="animate-fade-up card w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2">
            {type === 'danger' ? (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            ) : (
              <Pencil className="h-5 w-5 text-neutral-900" />
            )}
            <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 transition-colors hover:text-neutral-600">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 text-left text-sm leading-relaxed text-neutral-600">
          {message}
        </div>
        <div className="flex justify-end gap-2 border-t border-neutral-200 bg-neutral-50 p-4">
          <button onClick={onClose} className="btn-secondary btn-sm">
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={type === 'danger' ? 'btn-danger btn-sm' : 'btn-primary btn-sm'}>
            {type === 'danger' ? 'Ya, Hapus' : 'Lanjutkan'}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailProductModal({ isOpen, onClose, product, formatRupiah, getImageUrl, userRole, onAddToCart }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4">
      <div className="animate-fade-up card flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <span className="badge-neutral">
            {product.category_name}
          </span>
          <button onClick={onClose} className="p-1 text-neutral-400 transition-colors hover:text-neutral-600">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-6 text-left">
          <div className="h-48 w-full overflow-hidden border border-neutral-200 bg-neutral-50">
            <img src={getImageUrl()} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h2 className="mb-1 text-xl font-bold text-neutral-900">{product.name}</h2>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-neutral-900">{formatRupiah(product.price)}</span>
              <span className={product.stock <= 0 ? 'badge-rose' : 'badge-outline'}>
                {product.stock <= 0 ? 'Stok Habis' : `Tersedia: ${product.stock} items`}
              </span>
            </div>
          </div>
          <hr className="border-neutral-200" />
          <div>
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-400">Deskripsi Lengkap Asset</h4>
            <p className="whitespace-pre-line border border-neutral-200 bg-neutral-50 p-3.5 text-sm leading-relaxed text-neutral-600">
              {product.description || 'Tidak ada deskripsi tambahan untuk produk ini.'}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-neutral-200 bg-neutral-50 p-4">
          <button onClick={onClose} className="btn-ghost btn-sm">
            Tutup Detail
          </button>
          {userRole === 'buyer' && (
            <button
              type="button"
              disabled={product.stock <= 0}
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="btn-primary flex-1"
            >
              <ShoppingCart className="h-4 w-4" />
              {product.stock > 0 ? 'Tambahkan Belanjaan' : 'Stok Habis'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductCard({ product, userData, onAddToCart, onEdit, onDelete }) {
  const userRole = userData?.role?.toLowerCase()?.trim();
  const [modalType, setModalType] = useState(null);

  const isLowStock = product.stock > 0 && product.stock < 5;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const getDummyImageUrl = () => {
    const digitalImages = [
      "1507238691740-187a5b1d37b8",
      "1581291518633-83b4ebd1d83e",
      "1551288049-bebda4e38f71",
      "1498050108023-c5249f4df085",
      "1460925895917-afdab827c52f",
      "1531403009284-440f080d1e12"
    ];

    const seed = product.id || (product.name ? product.name.length : 0);
    const imageIndex = seed % digitalImages.length;
    const photoId = digitalImages[imageIndex];
    return `https://images.unsplash.com/photo-${photoId}?w=600&h=400&fit=crop&auto=format&q=80`;
  };

  const stockBadgeClass = product.stock <= 0
    ? 'badge-rose'
    : isLowStock
      ? 'badge-amber'
      : 'badge-neutral';

  return (
    <>
      <div className="card group flex h-full flex-col justify-between overflow-hidden text-left transition-colors duration-200 hover:border-neutral-900">
        <div
          onClick={() => setModalType('detail')}
          className="flex flex-1 cursor-pointer flex-col justify-between"
        >
          <div>
            <div className="relative h-48 overflow-hidden border-b border-neutral-200 bg-neutral-50">
              <img
                src={getDummyImageUrl()}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 flex-col items-center justify-center gap-2 text-neutral-400">
                <ImageOff className="h-6 w-6" />
                <span className="text-xs font-medium">Aset Digital</span>
              </div>
              <span className="badge-outline absolute left-3 top-3 z-10 border-neutral-200 bg-white">
                {product.category_name}
              </span>
              <span className={`${stockBadgeClass} absolute right-3 top-3 z-10`}>
                {product.stock <= 0 ? 'Habis' : `Stok: ${product.stock}`}
              </span>
            </div>
            <div className="flex flex-col p-5">
              <h3 className="mb-1.5 flex items-center justify-between gap-2 text-base font-semibold text-neutral-900 transition-colors group-hover:text-red-600">
                <span className="line-clamp-1">{product.name}</span>
                <Eye className="h-4 w-4 shrink-0 text-neutral-300 opacity-0 transition-all group-hover:text-neutral-900 group-hover:opacity-100" />
              </h3>
              <p className="mb-4 min-h-[32px] line-clamp-2 text-sm leading-relaxed text-neutral-500">
                {product.description}
              </p>

              <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
                <div>
                  <span className="mb-0.5 block text-[11px] font-medium uppercase tracking-wide text-neutral-400">Harga</span>
                  <span className="text-lg font-bold text-neutral-900">{formatRupiah(product.price)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-auto flex justify-end gap-2 px-5 pb-5 pt-1">
          {userRole === 'seller' && (
            <div className="ml-auto flex w-full justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalType('edit')}
                className="btn-secondary btn-sm"
              >
                <Pencil className="h-3.5 w-3.5 text-neutral-400" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setModalType('delete')}
                className="btn-danger-soft btn-sm"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus
              </button>
            </div>
          )}

          {userRole === 'buyer' && (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              disabled={product.stock <= 0}
              className="btn-primary w-full"
            >
              <ShoppingCart className="h-4 w-4" />
              {product.stock > 0 ? 'Tambah Ke Keranjang' : 'Stok Habis'}
            </button>
          )}
        </div>
      </div>
      <DetailProductModal
        isOpen={modalType === 'detail'}
        onClose={() => setModalType(null)}
        product={product}
        formatRupiah={formatRupiah}
        getImageUrl={getDummyImageUrl}
        userRole={userRole}
        onAddToCart={onAddToCart}
      />
      <ConfirmationModal
        isOpen={modalType === 'delete'}
        onClose={() => setModalType(null)}
        onConfirm={() => {
          if (onDelete) onDelete(product.id);
        }}
        title="Hapus Produk dari Katalog"
        message={`Apakah Anda yakin ingin menghapus "${product.name}"? Data produk yang dihapus permanen tidak dapat dipulihkan kembali.`}
        type="danger"
      />
      <ConfirmationModal
        isOpen={modalType === 'edit'}
        onClose={() => setModalType(null)}
        onConfirm={() => {
          if (onEdit) onEdit(product);
        }}
        title="Edit Informasi Produk"
        message={`Apakah Anda ingin masuk ke mode pengeditan untuk memperbarui data "${product.name}"?`}
        type="info"
      />
    </>
  );
}
