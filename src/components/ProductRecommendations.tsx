
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { Product, CategoryType } from '@/types/chat';

interface ProductRecommendationsProps {
  products: Product[];
  favoriteFood: string | null;
  selectedCategory: CategoryType | null;
  onResubmit: () => void;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ 
  products, 
  favoriteFood,
  selectedCategory,
  onResubmit 
}) => {
  if (products.length === 0) return null;

  const getCategoryTitle = (): string => {
    switch (selectedCategory) {
      case 'food':
        return 'Food Recommendations';
      case 'clothes':
        return 'Clothing Recommendations';
      case 'shoes':
        return 'Footwear Recommendations';
      case 'mobiles':
        return 'Mobile Device Recommendations';
      case 'software':
        return 'Software Recommendations';
      default:
        return 'Product Recommendations';
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          {getCategoryTitle()} for {favoriteFood || 'Your Product'}
        </h3>
        
        <Button 
          onClick={onResubmit}
          variant="outline" 
          className="gap-2 text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
        >
          <RefreshCw className="h-4 w-4" />
          Suggest Another Product
        </Button>
      </div>
      
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductRecommendations;
