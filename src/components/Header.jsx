import { Link, useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart';

export default function Header() {
  const location = useLocation();
  const { cartCount } = useCart();

  const getBreadcrumb = () => {
    if (location.pathname === '/') return 'Inicio';
    if (location.pathname.includes('/product/')) return 'Detalles';
    return '';
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          📱 Mobile Store
        </Link>
        <span className="text-gray-500">/ {getBreadcrumb()}</span>
      </div>
      <div className="text-sm text-gray-700">
        🛒 {cartCount} producto(s) en el carrito
      </div>
    </header>
  );
}