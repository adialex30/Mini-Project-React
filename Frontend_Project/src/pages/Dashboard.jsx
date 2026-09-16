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
    ? "border-neutral-300 bg-neutral-100 text-neutral-800"
    : "border-red-200 bg-red-50 text-red-700";

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-neutral-600 antialiased">

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
