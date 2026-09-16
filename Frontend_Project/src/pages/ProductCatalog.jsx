import { useState } from 'react';
import ProductCard from "../components/ui/ProductCard";
import AddProductModal from "../components/ui/AddProductModal";
import { useProductCatalog } from '../hooks/useProductCatalog';
import ProductService from '../services/ProductService';
import PromoCarousel from "../components/ui/PromoCarousel";
import { CheckCircle2, AlertCircle, X, Search, ShoppingBag, PackageSearch } from 'lucide-react';

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

  const handleAddToCartWithToast = (product) => {
    handleAddToCart(product, (p) => showNotification(`"${p.name}" ditambahkan ke keranjang!`, 'success'));
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
    <div className="relative min-h-screen bg-white px-4 py-10 text-neutral-600 sm:px-6 lg:px-8">

      {toast.show && (
        <div className="animate-fade-in fixed top-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4">
          <div className={`flex items-center justify-between rounded-sm border p-4 shadow-lg ${
            toast.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-900'
              : 'border-red-200 bg-red-50 text-red-900'
          }`}>
            <div className="flex items-center gap-3">
              {toast.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-green-700" /> : <AlertCircle className="h-5 w-5 text-red-600" />}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button onClick={() => setToast({ ...toast, show: false })} className="text-neutral-400 hover:text-neutral-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        {userRole !== 'seller' && (
          <PromoCarousel autoPlaySpeed={6000} />
        )}
        <header className="mb-8 flex flex-col items-start justify-between gap-4 border border-neutral-200 bg-white p-6 sm:flex-row sm:items-center">
          <div className="text-left">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Digital Asset Store</h1>
            <p className="mt-1 text-sm text-neutral-500">Temukan aset premium terbaik untuk produktivitas Anda</p>
          </div>
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            {userRole !== 'buyer' && (
              <button
                onClick={handleOpenAddModal}
                className="btn-primary w-full sm:w-auto"
              >
                + Tambah Produk
              </button>
            )}
            {userRole !== 'seller' && (
              <div className="badge-outline px-4 py-2.5 text-xs">
                <ShoppingBag className="h-4 w-4" />
                {cartCount} Items
              </div>
            )}
          </div>
        </header>

        {/* FILTER & SEARCH BAR */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 border border-neutral-200 bg-white p-4 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id || (Array.isArray(cat.id) && cat.id.includes(selectedCategory));
              return (
                <button
                  key={Array.isArray(cat.id) ? cat.id.join('-') : cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }}
                  className={`border px-3.5 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${isActive
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Cari nama aset..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value !== '' && selectedCategory !== 'all') {
                  setSelectedCategory('all');
                }
              }}
              className="field-input pl-10"
            />
          </div>
        </div>

        {fetchLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="h-48 animate-pulse bg-neutral-100" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-3/4 animate-pulse bg-neutral-100" />
                  <div className="h-3 w-full animate-pulse bg-neutral-100" />
                  <div className="h-3 w-2/3 animate-pulse bg-neutral-100" />
                  <div className="h-6 w-1/2 animate-pulse bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id || idx}
                product={{ ...product, category_name: product.category_name || product.category?.name || 'Kategori' }}
                userData={userData}
                onAddToCart={handleAddToCartWithToast}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-neutral-300 bg-white py-24 text-center">
            <PackageSearch className="mx-auto mb-3 h-8 w-8 text-neutral-300" />
            <p className="text-sm font-medium text-neutral-400">Aset digital tidak ditemukan atau kosong.</p>
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
