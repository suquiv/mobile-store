import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="border p-4 rounded shadow hover:shadow-md transition">
        <img
          src={product.imgUrl}
          alt={product.model}
          className="w-full h-40 object-contain mb-2"
        />
        <h2 className="text-lg font-semibold">{product.brand}</h2>
        <p className="text-gray-600">{product.model}</p>
        <p className="text-blue-600 font-bold mt-2">{product.price || 'Consultar'}</p>
      </div>
    </Link>
  );
}