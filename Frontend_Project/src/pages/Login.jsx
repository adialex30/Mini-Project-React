import { useState } from "react";
import api from "../services/api";
import AuthHeader from "../components/ui/AuthHeader";
import InputGroup from "../components/ui/InputGroup";

export default function Login({ onLoginSuccess, onNavigateToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
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
            if (response.data && response.data.data) {
                const token = response.data.data.token;
                const user = response.data.data.user;
                localStorage.setItem("token", token);                
                localStorage.setItem("user", JSON.stringify(user));
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
        <div className="flex min-h-screen bg-slate-50 font-sans antialiased p-4 items-center justify-center relative overflow-hidden">
            {/* Pendaran Warna Lembut di Latar Belakang */}
            <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-indigo-100/60 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-sky-100/60 blur-[120px] pointer-events-none"></div>

            {/* KARTU LOGIN UTAMA (Cerah & Bersih) */}
            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
                
                <div className="w-full space-y-6">
                    {/* Header Area */}
                    <div className="text-left [&_h2]:text-slate-900 [&_p]:text-slate-500 [&_h2]:text-xl [&_h2]:font-black">
                        <AuthHeader 
                            title="Selamat Datang Kembali!" 
                            subtitle="Silakan masukkan kredensial Anda untuk melanjutkan." 
                        />
                    </div>

                    {/* Error Alert (Cerah) */}
                    {error && (
                        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-bold text-red-600 text-left">
                            <span>⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Form Inputs */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="text-slate-700 text-left">
                            <InputGroup
                                label="Alamat Email"
                                type="email"
                                name="email"
                                value={email}
                                placeholder="nama@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="text-slate-700 text-left">
                            <InputGroup
                                label="Password"
                                type="password"
                                name="password"
                                value={password}
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer select-none">
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                Ingat Saya
                            </label>
                            <button 
                                type="button" 
                                className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors bg-transparent border-none p-0 cursor-pointer"
                            >
                                Lupa Password?
                            </button>
                        </div>

                        {/* Tombol Utama Utama (Indigo Solid Modern) */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 rounded-xl bg-indigo-600 py-3 text-xs font-black text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 uppercase tracking-wider"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Memverifikasi...
                                </div>
                            ) : "Masuk Aplikasi"}
                        </button>
                    </form>

                    {/* Link Registrasi */}
                    <div className="pt-4 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500">
                            Belum memiliki akun?{" "}
                            <button
                                type="button"
                                onClick={onNavigateToRegister}
                                className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors bg-transparent border-none p-0 cursor-pointer"
                            >
                                Daftar Sekarang
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}