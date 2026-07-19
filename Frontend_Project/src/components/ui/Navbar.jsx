export default function Navbar({ user, onLogout, roleBadgeStyles, getInitials }) {
  return (
    <header className="bg-white/80 border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        {/* Logo Brand */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="bg-slate-950 text-white px-3 py-1.5 rounded-xl font-black text-xl tracking-wider transition-transform group-hover:scale-105">
            DT
          </div>
          <span className="font-black text-xl text-slate-900 tracking-tight">
            Dibi<span className="text-indigo-600">Tech</span>
          </span>
        </div>

        {/* Sisi Kanan: Profil & Tombol Keluar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-3 py-1.5 rounded-2xl shadow-sm">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-500/10">
              {user?.avatar || getInitials(user?.name)}
            </div>
            <div className="text-left hidden sm:block">
              {/* NOTE: Mengoreksi typo utility class dari 'from-indigo-500' ke warna text solid 'text-slate-900' */}
              <div className="text-sm font-bold text-slate-900 leading-tight">
                {user?.name || "-"}
              </div>
              <div className="mt-1 flex items-center">
                <span className={`text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded-md border ${roleBadgeStyles}`}>
                  {user?.role || "Guest"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="h-6 w-[1px] bg-slate-200"></div>
          
          <button 
            onClick={onLogout} 
            className="text-sm font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-4 py-2.5 rounded-xl transition-all border border-rose-200 hover:border-transparent active:scale-95"
          >
            Keluar
          </button>
        </div>

      </div>
    </header>
  );
}