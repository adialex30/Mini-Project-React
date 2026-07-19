import { useState } from 'react';
import ProductService from '../services/ProductService';
import InputGroup from '../components/ui/InputGroup';
import SelectGroup from '../components/ui/SelectGroup';

export default function Register({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '', role: 'buyer' });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccessMessage("");

    if (formData.password !== formData.password_confirmation) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    setLoading(true);
    try {
      await ProductService.register(formData);
      setSuccessMessage("Pendaftaran akun berhasil! Mengalihkan ke halaman masuk...");
      setTimeout(() => onNavigateToLogin(), 2000);
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors)[0][0]);
      } else {
        setError(err.response?.data?.message || "Gagal terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 items-center justify-center p-4 text-left">
      <div className="w-full max-w-md bg-slate-900/40 border border-slate-900 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8"><h1 className="text-2xl font-black text-white">Buat Akun Baru</h1><p className="mt-1.5 text-xs text-slate-400">Silakan isi data diri Anda untuk mendaftar</p></div>
        {error && <div className="mb-4 text-xs font-bold bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-rose-400">{error}</div>}
        {successMessage && <div className="mb-4 text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-400">{successMessage}</div>}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <InputGroup label="Nama Lengkap" type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama Lengkap" />
          <InputGroup label="Alamat Email" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="nama@email.com" />
          <InputGroup label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" />
          <InputGroup label="Konfirmasi Password" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleInputChange} placeholder="••••••••" />
          <SelectGroup label="Daftar Sebagai" name="role" value={formData.role} onChange={handleInputChange} options={[{ value: 'buyer', label: 'Pembeli (Buyer)' }, { value: 'seller', label: 'Penjual (Seller)' }]} />
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-white py-3 text-xs font-black text-slate-950 hover:bg-slate-100 shadow-md transition-all uppercase tracking-widest mt-2">{loading ? "Memproses..." : "Daftar Sekarang"}</button>
        </form>
        <div className="mt-8 pt-5 border-t border-slate-900 text-center text-xs text-slate-400">Sudah punya akun? <button type="button" onClick={onNavigateToLogin} className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Masuk di sini</button></div>
      </div>
    </div>
  );
}