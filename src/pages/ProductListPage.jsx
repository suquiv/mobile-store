import { useEffect, useState } from 'react';
import { getProducts } from '../utils/api';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    load();
  }, []);

  const filtered = products.filter((p) =>
    `${p.brand} ${p.model}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      <SearchBar value={query} onChange={setQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}