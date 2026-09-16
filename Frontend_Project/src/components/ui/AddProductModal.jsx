import { useState } from 'react';
import { X, PackagePlus, Save, AlertCircle, Loader2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4">
      <div className="animate-fade-up card w-full max-w-md p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2">
            <PackagePlus className="h-5 w-5 text-red-600" />
            <h3 className="text-sm font-semibold text-neutral-900">
              {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-neutral-400 transition-colors hover:text-neutral-600">
            <X className="h-4 w-4" />
          </button>
        </div>
        {errorMsg && (
          <div className="mb-4 flex items-start gap-2.5 rounded-sm border border-red-200 bg-red-50 p-3.5 text-left text-sm font-medium text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}
        <form onSubmit={(e) => { e.preventDefault(); onSubmitForm(formData); }} className="space-y-4 text-left">
          <div>
            <label className="field-label">Nama Produk</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="field-input"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="field-label">Kategori</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="field-select"
              disabled={loading}
              required>
              {categories.filter(cat => cat.id !== 'all').map(cat => (
                <option key={Array.isArray(cat.id) ? cat.id[0] : cat.id} value={Array.isArray(cat.id) ? cat.id[0] : cat.id} className="bg-white text-neutral-900">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="field-label">Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="field-input resize-none"
              required
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">Harga</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="field-input"
                required
                min="0"
                disabled={loading}
              />
            </div>
            <div>
              <label className="field-label">Stok</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="field-input"
                required
                min="0"
                disabled={loading}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-2 border-t border-neutral-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-secondary btn-sm">
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-sm">
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              {loading ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
