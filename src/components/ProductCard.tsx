
import React, { useState } from 'react';
import { Product } from '@/types/chat';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md border-gray-200 animate-fade-in">
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        {product.isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-4 border-food-teal border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={imageError ? "/placeholder.svg" : product.imageUrl} 
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-300 hover:scale-105 ${product.isImageLoading ? 'opacity-0' : 'opacity-100'}`}
          onError={() => setImageError(true)}
          onLoad={() => product.isImageLoading = false}
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0">
        <p className="font-semibold text-food-dark">${product.price.toFixed(2)}</p>
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-food-teal text-white hover:bg-food-teal/90"
        >
          <ShoppingCart className="h-4 w-4 mr-1" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
