import { useState } from "react";
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import api from "../services/api";
import AuthHeader from "../components/ui/AuthHeader";
import InputGroup from "../components/ui/InputGroup";

export default function Login({ onLoginSuccess, onNavigateToRegister, onNavigateToLanding }) {
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

                    <AuthHeader
                        title="Selamat Datang Kembali"
                        subtitle="Silakan masukkan kredensial Anda untuk melanjutkan."
                    />

                    {error && (
                        <div className="flex items-start gap-2.5 rounded-sm border border-red-200 bg-red-50 p-3.5 text-left text-sm font-medium text-red-700">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        <div className="flex items-center justify-between pt-1 text-sm">
                            <label className="flex select-none items-center gap-2 font-medium text-neutral-600">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 cursor-pointer rounded-sm border-neutral-300 text-red-600 focus:ring-red-500"
                                />
                                Ingat Saya
                            </label>
                            <button
                                type="button"
                                className="font-medium text-red-600 transition-colors hover:text-red-700"
                            >
                                Lupa Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Memverifikasi...
                                </>
                            ) : "Masuk Aplikasi"}
                        </button>
                    </form>

                    <div className="border-t border-neutral-200 pt-4 text-center">
                        <p className="text-sm text-neutral-500">
                            Belum memiliki akun?{" "}
                            <button
                                type="button"
                                onClick={onNavigateToRegister}
                                className="font-semibold text-red-600 transition-colors hover:text-red-700"
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
