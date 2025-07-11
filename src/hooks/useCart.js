import { useState, useEffect } from 'react';

export default function useCart() {
  const [cartCount, setCartCount] = useState(
    Number(localStorage.getItem('cartCount')) || 0
  );

  const updateCartCount = (count) => {
    setCartCount(count);
    localStorage.setItem('cartCount', count);
  };

  return { cartCount, updateCartCount };
}