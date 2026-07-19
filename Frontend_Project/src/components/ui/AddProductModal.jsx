import { useState } from 'react';
import { X, PackagePlus, Save } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose, categories, editingProduct, loading, errorMsg, onSubmitForm }) {
  const getFirstValidCategoryId = () => {
    const validCat = categories?.find(cat => cat.id !== 'all');
    return validCat ? (Array.isArray(validCat.id) ? validCat.id[0] : validCat.id) : '';
  };

  const [formData, setFormData] = useState(() => editingProduct ? {
    category_id: Number(editingProduct.category_id || editingProduct.category?.id || getFirstValidCategoryId()),
    name: editingProduct.name || '',
    description: editingProduct.description || '',
    price: editingProduct.price ?? '',
    stock: editingProduct.stock ?? ''
  } : { category_id: getFirstValidCategoryId(), name: '', description: '', price: '', stock: '' });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: ['category_id', 'price', 'stock'].includes(name) ? Number(value) : value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      {/* KARTU MODAL UTAMA (Cerah & Bersih) */}
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <PackagePlus className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            disabled={loading} 
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert (Cerah) */}
        {errorMsg && (
          <div className="mb-4 text-xs font-bold bg-red-50 border border-red-200 p-3.5 rounded-xl text-red-600 text-left">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={(e) => { e.preventDefault(); onSubmitForm(formData); }} className="space-y-4 text-left">
          
          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nama Produk</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl p-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all" 
              required 
              disabled={loading} 
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Kategori</label>
            <select 
              name="category_id" 
              value={formData.category_id} 
              onChange={handleChange} 
              className="w-full text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl p-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all cursor-pointer" 
              disabled={loading} 
              required
            >
              {categories.filter(cat => cat.id !== 'all').map(cat => (
                <option key={Array.isArray(cat.id) ? cat.id[0] : cat.id} value={Array.isArray(cat.id) ? cat.id[0] : cat.id} className="bg-white text-slate-900">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Deskripsi</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="3" 
              className="w-full text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl p-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white resize-none transition-all" 
              required 
              disabled={loading} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Harga</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                className="w-full text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl p-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all" 
                required 
                min="0" 
                disabled={loading} 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Stok</label>
              <input 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
                className="w-full text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl p-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all" 
                required 
                min="0" 
                disabled={loading} 
              />
            </div>
          </div>

          {/* Bagian Tombol Aksi Akhir */}
          <div className="flex items-center justify-end gap-2 pt-5 border-t border-slate-100 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={loading} 
              className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 rounded-xl transition-all"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-xs font-black text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/10 transition-all uppercase tracking-wider"
            >
              <Save className="w-3.5 h-3.5" />
              {loading ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}