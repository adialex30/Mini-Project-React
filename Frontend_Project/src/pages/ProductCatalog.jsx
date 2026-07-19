import { useState } from 'react';
import ProductCard from "../components/ui/ProductCard";
import AddProductModal from "../components/ui/AddProductModal";
import { useProductCatalog } from '../hooks/useProductCatalog';
import ProductService from '../services/ProductService';
import { CheckCircle2, AlertCircle, X, Search, ShoppingBag } from 'lucide-react';

export default function ProductCatalog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const userRole = userData?.role;

  const {
    categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, cartCount, fetchLoading, filteredProducts, handleAddToCart, setProducts
  } = useProductCatalog();

  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await ProductService.deleteProduct(productId);
      if (res.success) {
        setProducts(prev => prev.filter(p => p.id !== productId));
        showNotification(res.message || "Produk berhasil dihapus!", 'success');
      } else {
        showNotification(res.message || "Gagal menghapus produk.", 'error');
      }
    } catch (error) {
      showNotification(error.response?.data?.message || "Terjadi kesalahan sistem.", 'error');
    }
  };

  const handleOpenAddModal = () => { setEditingProduct(null); setIsModalOpen(true); };
  const handleOpenEditModal = (product) => { setEditingProduct(product); setIsModalOpen(true); };

  const handleModalSubmit = async (formData) => {
    setModalLoading(true); setModalError('');
    try {
      if (editingProduct) {
        const updated = await ProductService.updateProduct(editingProduct.id, formData);
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
        showNotification("Produk berhasil diperbarui!", 'success');
      } else {
        const created = await ProductService.createProduct(formData);
        setProducts(prev => [created, ...prev]);
        showNotification("Produk berhasil ditambahkan!", 'success');
      }
      setIsModalOpen(false);
    } catch (err) {
      setModalError(err.response?.data?.message || Object.values(err.response?.data?.errors || {})[0]?.[0] || 'Gagal menyimpan.');
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 py-10 px-4 sm:px-6 lg:px-8 relative">
      
      {/* TOAST NOTIFICATION: Clean Pastel Floating Alert */}
      {toast.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-[fadeIn_0.2s_ease-out]">
          <div className={`flex items-center justify-between p-4 rounded-2xl shadow-xl border backdrop-blur-md ${
            toast.type === 'success' 
              ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800' 
              : 'bg-rose-50/95 border-rose-200 text-rose-800'
          }`}>
            <div className="flex items-center gap-3">
              {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
              <p className="text-xs font-black uppercase tracking-wider">{toast.message}</p>
            </div>
            <button onClick={() => setToast({ ...toast, show: false })} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* CATALOG HEADER CARD */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8 gap-4">
          <div className="text-left">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Digital Asset Store</h1>
            <p className="text-xs text-slate-500 mt-1">Temukan aset premium terbaik untuk produktivitas Anda</p>
          </div>
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
            {userRole !== 'buyer' && (
              <button 
                onClick={handleOpenAddModal} 
                className="w-full sm:w-auto bg-indigo-600 px-5 py-3 text-xs font-black text-white rounded-xl shadow-md shadow-indigo-600/10 transition-all hover:bg-indigo-700 uppercase tracking-wider active:scale-[0.98]"
              >
                + Tambah Produk
              </button>
            )}
            {userRole !== 'seller' && (
              <div className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-black px-4 py-3 rounded-xl text-xs flex items-center gap-2 uppercase tracking-wider">
                <ShoppingBag className="w-4 h-4 text-indigo-600" />
                {cartCount} Items
              </div>
            )}
          </div>
        </header>

        {/* FILTER & SEARCH BAR CONTAINER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id || (Array.isArray(cat.id) && cat.id.includes(selectedCategory));
              return (
                <button 
                  key={Array.isArray(cat.id) ? cat.id.join('-') : cat.id} 
                  onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }} 
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'bg-indigo-700 border-indigo-700 text-white shadow-sm' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
          
          {/* Clean Input Search */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari nama aset..." 
              value={searchQuery} 
              onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value !== '') setSelectedCategory('all'); }} 
              className="w-full text-xs bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all" 
            />
          </div>
        </div>

        {/* CATALOG GRID AREA */}
        {fetchLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            <p className="mt-4 text-xs text-slate-400 font-bold tracking-widest uppercase">Memuat katalog...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard 
                key={product.id || idx} 
                product={{ ...product, category_name: product.category_name || product.category?.name || 'Kategori' }} 
                userData={userData} 
                onAddToCart={handleAddToCart} 
                onEdit={handleOpenEditModal} 
                onDelete={handleDeleteProduct} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-28 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Aset digital tidak ditemukan atau kosong.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          categories={categories}
          editingProduct={editingProduct}
          loading={modalLoading}
          errorMsg={modalError}
          onSubmitForm={handleModalSubmit}
        />
      )}
    </div>
  );
}