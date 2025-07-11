import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, addToCart } from '../utils/api';
import useCart from '../hooks/useCart';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [colorCode, setColorCode] = useState('');
  const [storageCode, setStorageCode] = useState('');
  const { updateCartCount } = useCart();

  useEffect(() => {
    const load = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setColorCode(data.options.colors[0].code);
      setStorageCode(data.options.storages[0].code);
    };
    load();
  }, [id]);

  if (!product) return <p className="p-4">Cargando...</p>;

  const handleAddToCart = async () => {
    const res = await addToCart({ id: product.id, colorCode, storageCode });
    updateCartCount(res);
  };

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-600 underline">
        ← Volver al listado
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <img
            src={product.imgUrl}
            alt={product.model}
            className="w-full h-auto object-contain"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.brand} {product.model}</h1>
          <p className="text-xl text-blue-600 font-semibold mt-1">{product.price || 'Consultar'}</p>

          <ul className="mt-4 space-y-1 text-sm">
            <li><strong>CPU:</strong> {product.cpu}</li>
            <li><strong>RAM:</strong> {product.ram}</li>
            <li><strong>Sistema operativo:</strong> {product.os}</li>
            <li><strong>Resolución:</strong> {product.displayResolution}</li>
            <li><strong>Batería:</strong> {product.battery}</li>
            <li><strong>Cámaras:</strong> {product.primaryCamera} / {product.secondaryCmera}</li>
            <li><strong>Dimensiones:</strong> {product.dimentions}</li>
            <li><strong>Peso:</strong> {product.weight}</li>
          </ul>

          <div className="mt-6 space-y-3">
            <div>
              <label className="block mb-1 font-medium">Color</label>
              <select
                value={colorCode}
                onChange={(e) => setColorCode(e.target.value)}
                className="border p-2 rounded w-full"
              >
                {product.options.colors.map((color) => (
                  <option key={color.code} value={color.code}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Almacenamiento</label>
              <select
                value={storageCode}
                onChange={(e) => setStorageCode(e.target.value)}
                className="border p-2 rounded w-full"
              >
                {product.options.storages.map((storage) => (
                  <option key={storage.code} value={storage.code}>
                    {storage.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white font-bold px-4 py-2 rounded mt-2"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}