import axios from 'axios';
import { getCachedData, setCachedData } from './cache';

const BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export async function getProducts() {
  const cache = getCachedData('products');
  if (cache) return cache;

  const res = await axios.get(`${BASE_URL}/product`);
  setCachedData('products', res.data);
  return res.data;
}

export async function getProductById(id) {
  const cache = getCachedData(`product-${id}`);
  if (cache) return cache;

  const res = await axios.get(`${BASE_URL}/product/${id}`);
  setCachedData(`product-${id}`, res.data);
  return res.data;
}

export async function addToCart({ id, colorCode, storageCode }) {
  const res = await axios.post(`${BASE_URL}/cart`, {
    id,
    colorCode,
    storageCode
  });
  return res.data.count;
}