
import { Product } from '@/types/chat';

// Simulate API call to Gemini
export async function getIngredientsFromGemini(dishName: string): Promise<string[]> {
  console.log("Getting ingredients for:", dishName);
  
  // This is a mockup - in a real implementation, you would call the Gemini API
  // We'll use a timeout to simulate API latency
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock responses based on common dishes
      const mockResponses: Record<string, string[]> = {
        'pasta': ['Pasta', 'Tomatoes', 'Garlic', 'Olive oil', 'Basil', 'Parmesan cheese'],
        'pizza': ['Flour', 'Yeast', 'Tomatoes', 'Mozzarella cheese', 'Olive oil', 'Basil'],
        'burger': ['Ground beef', 'Buns', 'Lettuce', 'Tomato', 'Onion', 'Cheese', 'Ketchup'],
        'salad': ['Lettuce', 'Cucumber', 'Tomato', 'Bell pepper', 'Avocado', 'Olive oil'],
        'curry': ['Rice', 'Chicken', 'Curry powder', 'Coconut milk', 'Onion', 'Garlic', 'Ginger'],
      };
      
      // Find a matching dish or return a default set of ingredients
      const lowerDish = dishName.toLowerCase();
      const matchedDish = Object.keys(mockResponses).find(dish => lowerDish.includes(dish));
      
      if (matchedDish) {
        resolve(mockResponses[matchedDish]);
      } else {
        // Default ingredients for unknown dishes
        resolve(['Flour', 'Sugar', 'Salt', 'Olive oil', 'Water', 'Spices']);
      }
    }, 1500); // 1.5 seconds delay to simulate API call
  });
}

// Convert ingredients to products
export function convertIngredientsToProducts(ingredients: string[]): Product[] {
  return ingredients.map((ingredient, index) => ({
    id: `product-${index}`,
    name: ingredient,
    description: `Fresh ${ingredient.toLowerCase()} for your recipe.`,
    price: 3.99 + (index * 0.5), // Just a simple formula to vary prices
    imageUrl: `/placeholder.svg`, // In a real app, this would be a real image URL
    category: 'Ingredients'
  }));
}
