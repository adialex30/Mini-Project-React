import ProductCatalog from './ProductCatalog';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

export default function Dashboard({ user, onLogout }) {
  
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
  };

  const isSeller = user?.role?.toLowerCase() === 'seller';
  
  const roleBadgeStyles = isSeller 
    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
    : "bg-indigo-50 text-indigo-700 border-indigo-200";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-600 antialiased selection:bg-indigo-600 selection:text-white">
      
      <Navbar 
        user={user} 
        onLogout={onLogout} 
        roleBadgeStyles={roleBadgeStyles} 
        getInitials={getInitials} 
      />

      <main className="flex-grow">
        <ProductCatalog />
      </main>

      <Footer />
      
    </div>
  );
}