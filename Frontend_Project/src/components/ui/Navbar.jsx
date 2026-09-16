import { LogOut } from 'lucide-react';

export default function Navbar({
  user,
  onLogout,
  roleBadgeStyles,
  getInitials = (name) => name?.slice(0, 2).toUpperCase() || '??',
  onNavigateToLogin,
  onNavigateToRegister
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <div className="flex cursor-pointer items-center gap-0">
          <div className="flex h-9 items-center bg-red-600 px-2.5">
            <span className="font-display text-sm font-black uppercase tracking-wide text-white">
              Dibi
            </span>
          </div>
          <span className="font-display text-sm font-black uppercase tracking-wide text-neutral-900">
            Assets
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-3 border border-neutral-200 py-1 pl-1 pr-3">
                <div className="flex h-8 w-8 items-center justify-center bg-neutral-900 text-xs font-semibold text-white">
                  {user?.avatar || getInitials(user?.name)}
                </div>
                <div className="hidden text-left leading-tight sm:block">
                  <div className="text-sm font-semibold text-neutral-900">
                    {user?.name || "-"}
                  </div>
                  <span className={`badge mt-0.5 ${roleBadgeStyles}`}>
                    {user?.role || "Guest"}
                  </span>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="btn-danger-soft btn-sm"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onNavigateToLogin}
                className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-neutral-700 transition-colors hover:text-red-600"
              >
                Masuk
              </button>
              <button
                onClick={onNavigateToRegister}
                className="btn-primary btn-sm"
              >
                Daftar
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
