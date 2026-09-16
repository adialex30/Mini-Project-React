import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';

const bigramCache = new Map();

const getBigrams = (str) => {
    if (bigramCache.has(str)) return bigramCache.get(str);
    
    const bigrams = new Set();
    for (let i = 0; i < str.length - 1; i++) {
        bigrams.add(str.substring(i, i + 2));
    }
    bigramCache.set(str, bigrams);
    return bigrams;
};

const getSimilarity = (str1, str2) => {
    const s1 = str1.toLowerCase().replace(/\s+/g, '');
    const s2 = str2.toLowerCase().replace(/\s+/g, '');
    if (s1 === s2) return 1.0;
    if (s1.length < 2 || s2.length < 2) return 0.0;

    const bigrams1 = getBigrams(s1);
    const bigrams2 = getBigrams(s2);

    let intersection = 0;
    bigrams1.forEach((bigram) => {
        if (bigrams2.has(bigram)) intersection++;
    });

    return (2.0 * intersection) / (bigrams1.size + bigrams2.size);
};

const filterUniqueCategories = (rawCategories) => {
    const uniqueGroups = [];
    const SIMILARITY_THRESHOLD = 0.65;

    rawCategories.forEach((cat) => {
        const currentName = cat.name.trim();
        let matchedGroup = null;

        for (const group of uniqueGroups) {
            const similarity = getSimilarity(currentName, group.label);
            if (similarity >= SIMILARITY_THRESHOLD) {
                matchedGroup = group;
                break;
            }
        }

        if (matchedGroup) {
            matchedGroup.ids.push(cat.id);
            if (currentName.length < matchedGroup.label.length) {
                matchedGroup.label = currentName;
            }
        } else {
            uniqueGroups.push({ label: currentName, ids: [cat.id] });
        }
    });

    return uniqueGroups.map(group => ({
        id: group.ids.length === 1 ? group.ids[0] : group.ids,
        label: group.label.replace(/\s*\d+$/g, '').trim()
    }));
};

export function useProductCatalog() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([{ id: 'all', label: 'Semua Produk' }]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    // 1. State untuk teks input (instan)
    const [searchQuery, setSearchQuery] = useState('');
    // 2. State bayangan untuk memicu API (tertunda)
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    
    const [cartCount, setCartCount] = useState(0);
    const [fetchLoading, setFetchLoading] = useState(true);

    // Memuat Kategori saat pertama kali load
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesRes = await api.get('/categories');
                const rawCategoriesList = categoriesRes.data.data || categoriesRes.data;

                if (Array.isArray(rawCategoriesList)) {
                    const filteredUnique = filterUniqueCategories(rawCategoriesList);
                    setCategories([{ id: 'all', label: 'Semua Produk' }, ...filteredUnique]);
                }
            } catch (err) {
                console.error('Gagal memuat kategori:', err);
            }
        };
        fetchCategories();
    }, []);

    // 3. Masukkan Logika Debounce di sini untuk menjembatani searchQuery ke debouncedSearchQuery
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500); // Menunggu 500ms setelah user berhenti mengetik

        return () => clearTimeout(handler);
    }, [searchQuery]);

    // 4. Ubah trigger useEffect API agar hanya berjalan saat 'debouncedSearchQuery' berubah
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setFetchLoading(true);
                const response = await api.get('/products', { params: { search: debouncedSearchQuery } });
                const productsList = response.data.data || response.data;
                setProducts(Array.isArray(productsList) ? productsList : []);
            } catch (err) {
                console.error('Gagal mengambil data produk:', err);
            } finally {
                setFetchLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearchQuery]); // Hanya trigger ketika debounced query berubah

    const filteredProducts = useMemo(() => {
        const activeCategoryObj = selectedCategory !== 'all' 
            ? categories.find(cat => cat.id === selectedCategory) 
            : null;

        return products
            .map((product) => {
                let categoryName = 'Kategori';

                if (product.category && product.category.name) {
                    categoryName = product.category.name.trim();
                } else if (product.category_name) {
                    categoryName = product.category_name.trim();
                } else {
                    const prodCatId = product.category_id != null ? String(product.category_id).trim() : '';
                    const matchedCat = categories.find((cat) => {
                        if (Array.isArray(cat.id)) {
                            return cat.id.map(id => String(id).trim()).includes(prodCatId);
                        }
                        return String(cat.id).trim() === prodCatId;
                    });

                    if (matchedCat) {
                        categoryName = matchedCat.label.trim();
                    }
                }

                return {
                    ...product,
                    category_name: categoryName
                };
            })
            .filter((product) => {
                if (selectedCategory === 'all') return true;
                if (!activeCategoryObj) return false;
                
                const similarity = getSimilarity(product.category_name, activeCategoryObj.label);
                return similarity >= 0.60;
            });
    }, [products, categories, selectedCategory]);

    const handleAddToCart = (product, onSuccess) => {
        setCartCount(prev => prev + 1);
        if (typeof onSuccess === 'function') {
            onSuccess(product);
        }
    };

    return {
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,      // Tetap dilempar agar komponen input mendeteksi perubahan instan text
        setSearchQuery,   // Tetap dilempar agar komponen input bisa mengetik dengan lancar
        cartCount,
        fetchLoading,
        filteredProducts,
        handleAddToCart,
        setProducts
    };
}