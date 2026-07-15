import { useState } from 'react';
import api from '../../services/api';

export default function AddProductModal({ isOpen, onClose, categories, onProductAdded }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const getFirstValidCategoryId = () => {
    const firstRealCategory = categories.find(cat => cat.id !== 'all');
    if (firstRealCategory) {
      const firstId = firstRealCategory.id;
      return Array.isArray(firstId) ? firstId[0] : firstId;
    }
    return '';
  };

  const [formData, setFormData] = useState({
    category_id: getFirstValidCategoryId(),
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['category_id', 'price', 'stock'].includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await api.post('/products', formData);
      const createdProduct = response.data.data || response.data;
      
      onProductAdded(createdProduct);

      
      setFormData({ 
        category_id: getFirstValidCategoryId(), 
        name: '', 
        description: '', 
        price: '', 
        stock: '' 
      });
      onClose();
    } catch (err) {
      if (err.response?.status === 401) {
        setErrorMsg('Sesi Anda berakhir. Silakan login kembali.');
      } else if (err.response?.data?.errors) {
        setErrorMsg(Object.values(err.response.data.errors)[0][0]);
      } else {
        setErrorMsg(err.response?.data?.message || 'Gagal terhubung dengan server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">Tambah Produk Baru</h3>
          <button 
            onClick={onClose} 
            disabled={loading} 
            className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg"
          >
            ✕
          </button>
        </div>

        {errorMsg && <div className="mb-4 text-xs font-medium text-rose-600 bg-rose-50 p-3 rounded-lg text-left">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Produk</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full text-sm rounded-lg border p-2 outline-none focus:border-indigo-500" required disabled={loading} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full text-sm rounded-lg border p-2 outline-none focus:border-indigo-500" disabled={loading} required>
              {categories.filter(cat => cat.id !== 'all').map(cat => {
                const optVal = Array.isArray(cat.id) ? cat.id[0] : cat.id;
                return <option key={optVal} value={optVal}>{cat.label}</option>;
              })}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Produk</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full text-sm rounded-lg border p-2 outline-none focus:border-indigo-500 resize-none" required disabled={loading} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Harga (Rupiah)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full text-sm rounded-lg border p-2" required min="0" disabled={loading} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Stok</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full text-sm rounded-lg border p-2" required min="0" disabled={loading} />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6">
            <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 border rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">Batal</button>
            <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 disabled:bg-indigo-400">
              {loading ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}