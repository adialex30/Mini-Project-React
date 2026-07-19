import api from './api';

class ProductService {
  async register(payload) {
    const response = await api.post("/register", payload);
    return response.data;
  }

  async getAllProducts() {
    const response = await api.get('/products');
    return response.data;
  }

  async createProduct(formData) {
    const response = await api.post('/products', formData);
    return response.data.data || response.data;
  }

  async updateProduct(id, formData) {
    const response = await api.put(`/products/${id}`, formData);
    return response.data.data || response.data;
  }

  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
}

export default new ProductService();