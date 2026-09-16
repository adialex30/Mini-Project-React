import { useState } from 'react';
import { ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import ProductService from '../services/ProductService';
import InputGroup from '../components/ui/InputGroup';
import SelectGroup from '../components/ui/SelectGroup';

export default function Register({ onNavigateToLogin, onNavigateToLanding }) {
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
    <div className="flex min-h-screen items-center justify-center bg-white p-4 font-sans antialiased">
      <div className="card w-full max-w-md p-6 sm:p-8">
        <div className="w-full space-y-6">
          <button
            type="button"
            onClick={onNavigateToLanding}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-red-600"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
          </button>

          <div className="text-left">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Buat Akun Baru</h1>
            <p className="mt-1.5 text-sm text-neutral-500">Silakan isi data diri Anda untuk bergabung di DibiAssets.</p>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 rounded-sm border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}
          {successMessage && (
            <div className="flex items-start gap-2.5 rounded-sm border border-green-200 bg-green-50 p-3.5 text-sm font-medium text-green-800">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <InputGroup label="Nama Lengkap" type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama Lengkap" />
            <InputGroup label="Alamat Email" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="nama@email.com" />
            <InputGroup label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" />
            <InputGroup label="Konfirmasi Password" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleInputChange} placeholder="••••••••" />
            <SelectGroup
              label="Daftar Sebagai"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              options={[
                { value: 'buyer', label: 'Pembeli (Unduh Aset Digital)' },
                { value: 'seller', label: 'Kreator / Penjual (Jual Aset Digital)' }
              ]}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : "Daftar Sekarang"}
            </button>
          </form>

          <div className="border-t border-neutral-200 pt-4 text-center">
            <p className="text-sm text-neutral-500">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="font-semibold text-red-600 transition-colors hover:text-red-700"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
