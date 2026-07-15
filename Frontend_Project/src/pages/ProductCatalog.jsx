import { useState } from 'react';
import ProductCard from './ProductCard';
import AddProductModal from '../components/ui/AddProductModal';
import { useProductCatalog } from '../hooks/useProductCatalog';

export default function ProductCatalog() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cartCount,
    fetchLoading,
    filteredProducts,
    handleAddToCart,
    setProducts
  } = useProductCatalog();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8 gap-4">
          <div className="flex justify-between items-center w-full sm:w-auto gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 text-left">Digital Asset Store</h1>
              <p className="text-sm text-slate-500 text-left">Temukan asset desain terbaik untuk menunjang produktivitas Anda</p>
            </div>
            <div className="bg-indigo-50 text-indigo-600 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2">
              🛒 {cartCount} Item
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-500 active:scale-[0.98]"
          >
            + Tambah Produk
          </button>
        </header>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex flex-wrap gap-1.5 text-left">
            {categories.map((cat) => {
              const isActive =
                (selectedCategory === 'all' && cat.id === 'all') ||
                (selectedCategory.toLowerCase().trim() === cat.label.toLowerCase().trim());

              return (
                <button
                  key={cat.label}
                  onClick={() => {
                    setSelectedCategory(cat.id === 'all' ? 'all' : cat.label);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Cari nama aset..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value !== '') setSelectedCategory('all');
              }}
              className="w-full text-sm bg-slate-50 border rounded-lg px-4 py-2 outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>
        </div>
        {fetchLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            <p className="mt-4 text-sm text-slate-500 font-medium">Memuat katalog... </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => {
              const finalCategoryName = product.category_name || product.category?.name || 'Kategori';

              return (
                <ProductCard
                  key={product.id || index}
                  product={{
                    ...product,
                    category_name: finalCategoryName
                  }}
                  onAddToCart={handleAddToCart}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">Aset digital tidak ditemukan.</p>
          </div>
        )}
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        onProductAdded={(newProduct) => setProducts((prev) => [newProduct, ...prev])}
      />
    </div>
  );
}