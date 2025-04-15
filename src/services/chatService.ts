
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
    imageUrl: `/placeholder.svg`, // Default placeholder, will be replaced
    category: 'Ingredients',
    isImageLoading: true
  }));
}

// Fetch real images for ingredients
export async function fetchImagesForIngredients(products: Product[]): Promise<Product[]> {
  // Create a copy to avoid mutating the original array
  const updatedProducts = [...products];
  
  // Process each product to get an image
  for (let i = 0; i < updatedProducts.length; i++) {
    const product = updatedProducts[i];
    try {
      const imageUrl = await fetchIngredientImage(product.name);
      updatedProducts[i] = {
        ...product,
        imageUrl: imageUrl || '/placeholder.svg',
        isImageLoading: false
      };
    } catch (error) {
      console.error(`Failed to fetch image for ${product.name}:`, error);
      updatedProducts[i] = {
        ...product,
        isImageLoading: false
      };
    }
  }
  
  return updatedProducts;
}

// Function to fetch a single ingredient image
async function fetchIngredientImage(ingredientName: string): Promise<string> {
  // In a real app, you would use a real image API like Unsplash or Pexels
  // For this demo, we'll simulate fetching images
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock image URLs based on common ingredients
      const mockImageUrls: Record<string, string> = {
        'pasta': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
        'tomatoes': 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924',
        'garlic': 'https://images.unsplash.com/photo-1615477550927-6ec8445abaa6',
        'olive oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
        'basil': 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc',
        'parmesan cheese': 'https://images.unsplash.com/photo-1634487359989-3e90c9432133',
        'flour': 'https://images.unsplash.com/photo-1603566541830-a1f7a23189e4',
        'yeast': 'https://images.unsplash.com/photo-1603251578711-3290ca6b66b8',
        'mozzarella cheese': 'https://images.unsplash.com/photo-1619860705586-25ee1e28a612',
        'ground beef': 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6',
        'buns': 'https://images.unsplash.com/photo-1600326145359-3a44909d1a39',
        'lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1',
        'tomato': 'https://images.unsplash.com/photo-1606588260160-0c2992a7e7c7',
        'onion': 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae',
        'cheese': 'https://images.unsplash.com/photo-1452195100486-9cc805987862',
        'ketchup': 'https://images.unsplash.com/photo-1613735788249-b52ea9252ad6',
        'cucumber': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e',
        'bell pepper': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83',
        'avocado': 'https://images.unsplash.com/photo-1632660668043-67a9b860ac8a',
        'rice': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6',
        'chicken': 'https://images.unsplash.com/photo-1587593810167-a84920ea0781',
        'curry powder': 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488',
        'coconut milk': 'https://images.unsplash.com/photo-1559710150-32394a163085',
        'ginger': 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25',
        'sugar': 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906',
        'salt': 'https://images.unsplash.com/photo-1519847094858-21121ac6ed38',
        'water': 'https://images.unsplash.com/photo-1603724805096-e599d0444bca',
        'spices': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757'
      };
      
      // Normalize ingredient name for lookup
      const lowerIngredient = ingredientName.toLowerCase();
      
      // Try to find a matching image
      const matchedIngredient = Object.keys(mockImageUrls).find(
        ingredient => lowerIngredient.includes(ingredient) || ingredient.includes(lowerIngredient)
      );
      
      if (matchedIngredient) {
        resolve(mockImageUrls[matchedIngredient] + '?w=400&h=400&fit=crop');
      } else {
        // Fallback to a random food image if no match
        const randomImages = [
          'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1627485937980-936d240e5569?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1617692855027-33b14f061079?w=400&h=400&fit=crop'
        ];
        resolve(randomImages[Math.floor(Math.random() * randomImages.length)]);
      }
    }, 800 + Math.random() * 1200); // Random delay between 800-2000ms to simulate network
  });
}
