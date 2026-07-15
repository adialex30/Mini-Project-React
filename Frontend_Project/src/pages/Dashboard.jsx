import ProductCatalog from './ProductCatalog';

export default function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
    
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-indigo-600 text-white px-3 py-1.5 rounded-xl font-black text-xl tracking-wider">
              DT
            </div>
            <span className="font-bold text-xl text-slate-900">
              DibiTech
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#explore" className="hover:text-indigo-600 transition-colors">Explore</a>
            <a href="#categories" className="hover:text-indigo-600 transition-colors">Categories</a>
            <a href="#cart" className="hover:text-indigo-600 transition-colors">Cart</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 border-2 border-indigo-200 flex items-center justify-center font-bold text-sm">
                {user?.avatar || "AR"}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-bold text-slate-800 leading-tight">{user?.name}</div>
                <div className="text-xs text-indigo-600 font-medium">{user?.role}</div>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-slate-200"></div>

            <button
              onClick={onLogout}
              className="text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-xl transition-all duration-200"
            >
              Keluar
            </button>
          </div>

        </div>
      </header>
      <main className="flex-grow">
        <ProductCatalog />
      </main>
      <footer className="bg-white border-t border-slate-100 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
            <a href="#about" className="hover:text-indigo-600 transition-colors">About Us</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
            <a href="#terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
          </div>

          <div className="flex gap-4">
            <a href="#twitter" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 transition-all border border-slate-100">
              <img src="./image/Vector - 0.png" alt="Twitter" className="h-4 w-4" />
            </a>
            <a href="#instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 transition-all border border-slate-100">
              <img src="./image/Depth 8, Frame 0.png" alt="Instagram" className="h-4 w-4" />
            </a>
            <a href="#facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 transition-all border border-slate-100">
              <img src="./image/Vector - 2.png" alt="Facebook" className="h-4 w-4" />
            </a>
          </div>

        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          &copy; 2026 DibiTech. All rights reserved.
        </div>
      </footer>

    </div>
  );
}