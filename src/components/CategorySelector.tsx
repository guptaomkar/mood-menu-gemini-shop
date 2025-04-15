
import React from 'react';
import { CategoryType } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Utensils, Shirt, Headphones, Smartphone, Code } from 'lucide-react';

interface CategorySelectorProps {
  onSelect: (category: CategoryType) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect }) => {
  const categories: { type: CategoryType, label: string, icon: React.ReactNode }[] = [
    { type: 'food', label: 'Food', icon: <Utensils className="mr-2 h-4 w-4" /> },
    { type: 'clothes', label: 'Clothes', icon: <Shirt className="mr-2 h-4 w-4" /> },
    { type: 'shoes', label: 'Shoes', icon: <Headphones className="mr-2 h-4 w-4" /> },
    { type: 'mobiles', label: 'Mobiles', icon: <Smartphone className="mr-2 h-4 w-4" /> },
    { type: 'software', label: 'Software', icon: <Code className="mr-2 h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <Button
          key={category.type}
          variant="outline"
          className="border-food-teal text-food-dark hover:bg-food-mint hover:text-food-dark"
          onClick={() => onSelect(category.type)}
        >
          {category.icon}
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategorySelector;
