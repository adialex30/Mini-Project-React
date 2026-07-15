import { useState } from "react";
import api from "../services/api";
import AuthHeader from "../components/ui/AuthHeader";
import InputGroup from "../components/ui/InputGroup";

export default function Login({ onLoginSuccess, onNavigateToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/login", {
                email: email,
                password: password,
            });

            if (response.data && response.data.data && response.data.data.token) {
                const token = response.data.data.token;
                localStorage.setItem("token", token);
            }

            onLoginSuccess(response.data.data); 

        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Email atau password salah.");
            } else if (err.request) {
                setError("Gagal terhubung ke server. Pastikan server backend Anda sudah aktif.");
            } else {
                setError("Terjadi kesalahan konfigurasi aplikasi.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[90vh] items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
                
                <AuthHeader 
                    title="Selamat Datang" 
                    subtitle="Silakan masuk ke akun Anda" 
                />

                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 text-left">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <InputGroup
                        label="Alamat Email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="nama@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputGroup
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:bg-indigo-400"
                    >
                        {loading ? "Memproses..." : "Masuk"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-600">
                    Belum punya akun?{' '}
                    <button
                        type="button"
                        onClick={onNavigateToRegister}
                        className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors bg-transparent border-none p-0 cursor-pointer"
                    >
                        Daftar Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}