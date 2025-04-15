
import React from 'react';
import { Product } from '@/types/chat';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string; // Make title optional
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-8 mb-4">
      {title && <h2 className="text-2xl font-semibold mb-4 text-food-dark">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
