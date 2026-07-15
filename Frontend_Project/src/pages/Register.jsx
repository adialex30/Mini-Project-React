import { useState } from 'react';
import api from "../services/api";
import InputGroup from '../components/ui/InputGroup';
import SelectGroup from '../components/ui/SelectGroup';

export default function Register({ onNavigateToLogin }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'buyer'
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const roleOptions = [
        { value: 'buyer', label: 'Pembeli (Buyer)' },
        { value: 'seller', label: 'Penjual (Seller)' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (formData.password !== formData.password_confirmation) {
            setError("Password dan Konfirmasi Password tidak cocok!");
            return;
        }

        setLoading(true);

        console.log("Mengirim payload registrasi lengkap ke API...");

        try {
            const response = await api.post("/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                role: formData.role
            });

            console.log("Respon API Registrasi Berhasil:", response.data);

            setSuccessMessage("Pendaftaran akun berhasil! Mengalihkan ke halaman masuk...");
            
            setTimeout(() => {
                onNavigateToLogin();
            }, 2000);

        } catch (err) {
            console.error("Terjadi kesalahan saat proses registrasi:", err);

            if (err.response) {
                console.log("Detail Error Server:", err.response.data);
                if (err.response.data.errors) {
                    const firstError = Object.values(err.response.data.errors)[0][0];
                    setError(firstError);
                } else {
                    setError(err.response.data.message || "Pendaftaran gagal. Periksa kembali data Anda.");
                }
            } else if (err.request) {
                setError("Gagal terhubung ke server. Pastikan server backend Anda sudah aktif.");
            } else {
                setError("Terjadi kesalahan konfigurasi aplikasi.");
            }
        } finally {
            setLoading(false);
        }
    };

    const cardStyle = {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        border: '1px solid #f1f5f9'
    };

    return (
        <div className="flex min-h-[90vh] items-center justify-center p-4">
            <div style={cardStyle} className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-indigo-600">Buat Akun Baru</h1>
                    <p className="mt-2 text-sm text-slate-500">Silakan isi data diri Anda untuk mendaftar</p>
                </div>

                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-left">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-left">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-5">
                    <InputGroup
                        label="Nama Lengkap"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nama Lengkap"
                    />

                    <InputGroup
                        label="Alamat Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="nama@email.com"
                    />

                    <InputGroup
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                    />

                    <InputGroup
                        label="Konfirmasi Password"
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                    />

                    <SelectGroup
                        label="Daftar Sebagai"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        options={roleOptions}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:bg-indigo-400"
                    >
                        {loading ? "Memproses..." : "Daftar"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-600">
                    Sudah punya akun?{' '}
                    <button
                        type="button"
                        onClick={onNavigateToLogin}
                        className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors bg-transparent border-none p-0 cursor-pointer">
                        Masuk di sini
                    </button>
                </div>
            </div>
        </div>
    );
}