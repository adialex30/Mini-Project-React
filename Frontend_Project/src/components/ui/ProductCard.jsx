import { useState } from 'react';
import { Trash2, ShoppingCart, AlertTriangle, X, Pencil } from 'lucide-react';

// ================= COMPONENT 1: ConfirmationModal =================
function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      {/* Kartu Modal Cerah */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all scale-100 animate-[fadeIn_0.2s_ease-out]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {type === 'danger' ? (
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            ) : (
              <Pencil className="w-5 h-5 text-indigo-600" />
            )}
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 text-xs font-medium text-slate-600 text-left leading-relaxed">
          {message}
        </div>

        {/* Modal Footer / Action Buttons */}
        <div className="flex justify-end gap-2 p-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-5 py-2.5 text-xs font-black text-white rounded-xl transition-all active:scale-[0.98] uppercase tracking-wider ${
              type === 'danger' 
                ? 'bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/10' 
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/10'
            }`}
          >
            {type === 'danger' ? 'Ya, Hapus' : 'Lanjutkan'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= COMPONENT 2: Main ProductCard =================
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
    return `https://images.unsplash.com/photo-${photoId}?w=600&h=400&fit=cover&auto=format&q=80`;
  };

  return (
    <>
      {/* Container Utama Kartu Produk (Cerah & Premium) */}
      <div className="flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group h-full justify-between text-left overflow-hidden">
        
        <div>
          {/* Bagian Image & Badges */}
          <div className="h-48 bg-slate-50 flex items-center justify-center border-b border-slate-100 relative overflow-hidden">
            <img 
              src={getDummyImageUrl()} 
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.parentElement.innerHTML = `
                  <div class="flex flex-col items-center gap-2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    <span class="text-[10px] font-black uppercase tracking-wider text-slate-500">Asset Digital</span>
                  </div>
                `;
              }}
            />
            
            {/* Kategori Badge (Clean Glass Style) */}
            <span className="text-[10px] font-black tracking-widest text-slate-700 uppercase bg-white/90 px-2.5 py-1.5 rounded-xl shadow-sm border border-slate-200/60 backdrop-blur-md absolute top-3 left-3 z-10">
              {product.category_name}
            </span>

            {/* Stock Badge (Lebih Tegas di Layar Terang) */}
            <span className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase absolute top-3 right-3 z-10 shadow-sm backdrop-blur-md border ${
              product.stock <= 0 
                ? 'bg-rose-50 text-rose-600 border-rose-200' 
                : isLowStock 
                  ? 'bg-amber-50 text-amber-700 border-amber-200' 
                  : 'bg-indigo-50 text-indigo-600 border-indigo-200'
            }`}>
              {product.stock <= 0 ? 'Habis' : `Stok: ${product.stock}`}
            </span>
          </div>

          {/* Konten teks Produk */}
          <div className="flex flex-col p-5">
            <h3 className="font-black text-slate-950 text-base line-clamp-1 mb-1.5 group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4 min-h-[32px]">
              {product.description}
            </p>
            
            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Harga</span>
                <span className="text-lg font-black text-slate-900">{formatRupiah(product.price)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Tombol Aksi Bawah */}
        <div className="px-5 pb-5 pt-1 flex justify-end gap-2 mt-auto">
          
          {userRole === 'seller' && (
            <div className="flex gap-2 ml-auto w-full justify-end">
              <button
                type="button"
                onClick={() => setModalType('edit')}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.98]"
              >
                <Pencil className="w-3.5 h-3.5 text-slate-400" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setModalType('delete')}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all active:scale-[0.98]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus
              </button>
            </div>
          )}

          {userRole === 'buyer' && (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              disabled={product.stock <= 0}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-black text-white shadow-md shadow-indigo-600/10 transition-all hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:border disabled:border-slate-200 active:scale-[0.98] uppercase tracking-wider"
            >
              <ShoppingCart className="w-4 h-4" />
              {product.stock > 0 ? 'Tambah Ke Keranjang' : 'Stok Habis'}
            </button>
          )}

        </div>
      </div>

      {/* MODAL KONFIRMASI HAPUS */}
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

      {/* MODAL KONFIRMASI EDIT */}
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