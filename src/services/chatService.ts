import { Product } from '@/types/chat';

// Simulate API call to Gemini
export async function getIngredientsFromGemini(productName: string, category?: string | null): Promise<string[]> {
  console.log(`Getting ingredients for: ${productName} in category: ${category}`);
  
  // This is a mockup - in a real implementation, you would call the Gemini API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Determine which response set to use based on category
      let responseSet = 'food'; // Default to food category
      
      if (category) {
        responseSet = category;
      }
      
      // Select the appropriate mock response based on category
      let mockResponses: Record<string, string[]>;
      
      switch(responseSet) {
        case 'clothes':
          mockResponses = clothesMockResponses;
          break;
        case 'shoes':
          mockResponses = shoesMockResponses;
          break;
        case 'mobiles':
          mockResponses = mobilesMockResponses;
          break;
        case 'software':
          mockResponses = softwareMockResponses;
          break;
        default:
          mockResponses = foodMockResponses;
      }
      
      // Utility function to get a close match
      const findBestMatch = (input: string, options: string[]): string | null => {
        const lowerInput = input.toLowerCase();
        // First try to find exact matches
        for (const option of options) {
          if (lowerInput.includes(option) || option.includes(lowerInput)) {
            return option;
          }
        }
        // Then try partial matches
        for (const option of options) {
          const words = option.split(' ');
          for (const word of words) {
            if (lowerInput.includes(word) && word.length > 3) { // Only match on significant words
              return option;
            }
          }
        }
        return null;
      };
      
      // Normalize product name for lookup
      const lowerProduct = productName.toLowerCase();
      
      // Try to find exact match first
      if (mockResponses[lowerProduct]) {
        resolve(mockResponses[lowerProduct]);
        return;
      }
      
      // Then try to find the best partial match
      const matchedProduct = findBestMatch(lowerProduct, Object.keys(mockResponses));
      
      if (matchedProduct) {
        resolve(mockResponses[matchedProduct]);
      } else {
        // Default response for unknown products in this category
        const defaultKey = `default_${responseSet}`;
        const defaultMockResponses = {
          default_food: ['Fresh Ingredients', 'Cooking Utensils', 'Spices', 'Cookware'],
          default_clothes: ['Casual Wear', 'Formal Wear', 'Sports Wear', 'Accessories'],
          default_shoes: ['Casual Shoes', 'Formal Shoes', 'Sports Shoes', 'Fashion Shoes'],
          default_mobiles: ['Smartphones', 'Tablets', 'Accessories', 'Gadgets'],
          default_software: ['Applications', 'Games', 'Utilities', 'Tools']
        };
        
        resolve(defaultMockResponses[defaultKey as keyof typeof defaultMockResponses] || defaultMockResponses.default_food);
      }
    }, 1500); // 1.5 seconds delay to simulate API call
  });
}

// Food category mock responses
const foodMockResponses: Record<string, string[]> = {
  'pasta': ['Pasta', 'Tomatoes', 'Garlic', 'Olive oil', 'Basil', 'Parmesan cheese', 'Onion', 'Red pepper flakes'],
  'spaghetti': ['Spaghetti pasta', 'Ground beef', 'Tomato sauce', 'Garlic', 'Onion', 'Italian herbs', 'Parmesan cheese'],
  'lasagna': ['Lasagna sheets', 'Ground beef', 'Ricotta cheese', 'Mozzarella cheese', 'Tomato sauce', 'Onion', 'Garlic', 'Italian herbs'],
  'pizza': ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Olive oil', 'Basil', 'Oregano', 'Toppings of choice'],
  'burger': ['Ground beef', 'Burger buns', 'Lettuce', 'Tomato', 'Onion', 'Cheese slices', 'Ketchup', 'Mustard', 'Pickles'],
  'sandwich': ['Bread', 'Cheese', 'Ham/Turkey', 'Lettuce', 'Tomato', 'Mayonnaise', 'Mustard'],
  'salad': ['Lettuce', 'Cucumber', 'Tomato', 'Bell pepper', 'Avocado', 'Olive oil', 'Vinegar', 'Salt', 'Pepper'],
  'caesar salad': ['Romaine lettuce', 'Croutons', 'Parmesan cheese', 'Caesar dressing', 'Grilled chicken', 'Black pepper'],
  'taco': ['Tortillas', 'Ground beef', 'Taco seasoning', 'Lettuce', 'Tomato', 'Cheese', 'Sour cream', 'Salsa'],
  'burrito': ['Large tortillas', 'Rice', 'Black beans', 'Ground beef/chicken', 'Cheese', 'Salsa', 'Guacamole', 'Sour cream']
};

// Clothes category mock responses
const clothesMockResponses: Record<string, string[]> = {
  'shirt': ['Cotton T-Shirt', 'Button-Down Shirt', 'Polo Shirt', 'Henley Shirt', 'Oxford Shirt'],
  't-shirt': ['Crew Neck T-Shirt', 'V-Neck T-Shirt', 'Graphic T-Shirt', 'Long Sleeve T-Shirt', 'Pocket T-Shirt'],
  'jeans': ['Skinny Jeans', 'Straight Fit Jeans', 'Bootcut Jeans', 'Relaxed Fit Jeans', 'Distressed Jeans'],
  'dress': ['Cocktail Dress', 'Maxi Dress', 'Summer Dress', 'Evening Gown', 'Shift Dress'],
  'sweater': ['Crew Neck Sweater', 'V-Neck Sweater', 'Cardigan', 'Turtleneck Sweater', 'Quarter-Zip Pullover'],
  'jacket': ['Bomber Jacket', 'Leather Jacket', 'Denim Jacket', 'Puffer Jacket', 'Blazer']
};

// Shoes category mock responses
const shoesMockResponses: Record<string, string[]> = {
  'sneakers': ['Running Sneakers', 'Casual Sneakers', 'High-Top Sneakers', 'Canvas Sneakers', 'Performance Sneakers'],
  'boots': ['Ankle Boots', 'Combat Boots', 'Chelsea Boots', 'Winter Boots', 'Work Boots'],
  'sandals': ['Flip Flops', 'Slide Sandals', 'Strappy Sandals', 'Platform Sandals', 'Sport Sandals'],
  'heels': ['Stiletto Heels', 'Block Heels', 'Kitten Heels', 'Platform Heels', 'Wedge Heels'],
  'loafers': ['Penny Loafers', 'Tassel Loafers', 'Driving Loafers', 'Bit Loafers', 'Boat Shoes']
};

// Mobiles category mock responses
const mobilesMockResponses: Record<string, string[]> = {
  'iphone': ['iPhone 13 Pro', 'iPhone 13', 'iPhone SE', 'iPhone 12 Pro', 'iPhone 12'],
  'samsung': ['Samsung Galaxy S21', 'Samsung Galaxy Note 20', 'Samsung Galaxy A52', 'Samsung Galaxy Z Fold 3', 'Samsung Galaxy Z Flip 3'],
  'android': ['Google Pixel 6 Pro', 'OnePlus 9', 'Xiaomi Mi 11', 'Sony Xperia 1 III', 'Motorola Edge'],
  'accessories': ['Phone Case', 'Screen Protector', 'Wireless Charger', 'Power Bank', 'Phone Grip'],
  'tablet': ['iPad Pro', 'Samsung Galaxy Tab S7', 'Amazon Fire HD', 'Microsoft Surface', 'Lenovo Tab P11']
};

// Software category mock responses
const softwareMockResponses: Record<string, string[]> = {
  'office': ['Microsoft 365', 'Google Workspace', 'LibreOffice', 'Apple iWork', 'WPS Office'],
  'photo editing': ['Adobe Photoshop', 'GIMP', 'Affinity Photo', 'Capture One', 'Luminar AI'],
  'video editing': ['Adobe Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'iMovie', 'Filmora'],
  'games': ['Action Games', 'Strategy Games', 'Role-Playing Games', 'Simulation Games', 'Sports Games'],
  'antivirus': ['Norton 360', 'McAfee Total Protection', 'Bitdefender', 'Kaspersky', 'Avast Premium']
};

// Convert ingredients to products
export function convertIngredientsToProducts(ingredients: string[], category?: string | null): Product[] {
  return ingredients.map((ingredient, index) => {
    let description = '';
    let basePrice = 0;
    
    // Customize description and price based on category
    switch(category) {
      case 'clothes':
        description = `Stylish ${ingredient.toLowerCase()} for your wardrobe.`;
        basePrice = 19.99;
        break;
      case 'shoes':
        description = `Comfortable ${ingredient.toLowerCase()} for everyday wear.`;
        basePrice = 39.99;
        break;
      case 'mobiles':
        description = `Feature-rich ${ingredient.toLowerCase()} with the latest technology.`;
        basePrice = 299.99;
        break;
      case 'software':
        description = `Powerful ${ingredient.toLowerCase()} for your digital needs.`;
        basePrice = 49.99;
        break;
      default: // food category
        description = `Fresh ${ingredient.toLowerCase()} for your recipe.`;
        basePrice = 3.99;
    }
    
    return {
      id: `product-${index}`,
      name: ingredient,
      description: description,
      price: basePrice + (index * 0.5), // Simple formula to vary prices
      imageUrl: `/placeholder.svg`, // Default placeholder, will be replaced
      category: category || 'Ingredients',
      isImageLoading: true
    };
  });
}

// Fetch real images for ingredients
export async function fetchImagesForIngredients(products: Product[]): Promise<Product[]> {
  // Create a copy to avoid mutating the original array
  const updatedProducts = [...products];
  
  // Store current category in a global variable for the image fetcher to use
  if (products.length > 0) {
    (window as any).currentCategory = products[0].category.toLowerCase();
  }
  
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

// Enhanced image database with more specific ingredients
async function fetchIngredientImage(ingredientName: string): Promise<string> {
  // In a real app, you would use a real image API like Unsplash or Pexels
  // For this demo, we'll simulate fetching images
  return new Promise((resolve) => {
    setTimeout(() => {
      // Utility function to get a close match
      const findBestMatch = (input: string, options: string[]): string | null => {
        const lowerInput = input.toLowerCase();
        // First try to find exact matches
        for (const option of options) {
          if (lowerInput.includes(option) || option.includes(lowerInput)) {
            return option;
          }
        }
        // Then try partial matches
        for (const option of options) {
          const words = option.split(' ');
          for (const word of words) {
            if (lowerInput.includes(word) && word.length > 3) { // Only match on significant words
              return option;
            }
          }
        }
        return null;
      };
      
      // Enhanced image URL database with category-specific images
      const mockImageUrls: Record<string, string> = {
        // Food category images
        'pasta': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
        'spaghetti pasta': 'https://images.unsplash.com/photo-1627823202007-4e80a80006e3',
        'lasagna sheets': 'https://images.unsplash.com/photo-1633436375153-d7045cb93e46',
        'tomato sauce': 'https://images.unsplash.com/photo-1612119805122-2b33195bf338',
        'tomatoes': 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924',
        'tomato': 'https://images.unsplash.com/photo-1606588260160-0c2992a7e7c7',
        'garlic': 'https://images.unsplash.com/photo-1615477550927-6ec8445abaa6',
        'onion': 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae',
        'lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1',
        'cucumber': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e',
        'bell pepper': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83',
        'avocado': 'https://images.unsplash.com/photo-1632660668043-67a9b860ac8a',
        
        // Clothing items
        'cotton t-shirt': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        'polo shirt': 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99',
        'skinny jeans': 'https://images.unsplash.com/photo-1542272604-787c3835535d',
        'dress': 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956',
        'sweater': 'https://images.unsplash.com/photo-1580331452047-43fddaff8e18',
        'jacket': 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
        'button-down shirt': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
        'graphic t-shirt': 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd0',
        
        // Footwear
        'running sneakers': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        'boots': 'https://images.unsplash.com/photo-1608256246200-95e5b1e8e62c',
        'sandals': 'https://images.unsplash.com/photo-1603487742131-4160ec02f8ec',
        'heels': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
        'loafers': 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4',
        'casual shoes': 'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
        'sport shoes': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2',
        'formal shoes': 'https://images.unsplash.com/photo-1531310197839-ccf54634509e',
        
        // Electronics/Mobile devices
        'iphone': 'https://images.unsplash.com/photo-1556656793-08538906a9f8',
        'samsung': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c',
        'google pixel': 'https://images.unsplash.com/photo-1598327105854-c8735cb57527',
        'oneplus': 'https://images.unsplash.com/photo-1598815272841-a83934237e0c',
        'xiaomi': 'https://images.unsplash.com/photo-1591447493924-79f2171360c7',
        'phone case': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb',
        'screen protector': 'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f',
        'power bank': 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5',
        'tablet': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
        
        // Software
        'adobe_photoshop': 'https://images.unsplash.com/photo-1560158218-69ae5166d439',
        'ms_office': 'https://images.unsplash.com/photo-1650003747344-9920aeacac19',
        'photo editing': 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea',
        'video editing': 'https://images.unsplash.com/photo-1535016120720-40c646be5580',
        'games': 'https://images.unsplash.com/photo-1614294148960-9aa740f4100e',
        'antivirus': 'https://images.unsplash.com/photo-1592772874383-d08932d29db7',
        'office suite': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
        'utilities': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        'applications': 'https://images.unsplash.com/photo-1551650975-87deedd944c3'
      };
      
      // Category-specific fallback images
      const categoryFallbackImages: Record<string, string[]> = {
        'food': [
          'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1627485937980-936d240e5569?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1617692855027-33b14f061079?w=400&h=400&fit=crop'
        ],
        'clothes': [
          'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop'
        ],
        'shoes': [
          'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1549298916-f52d724204b4?w=400&h=400&fit=crop'
        ],
        'mobiles': [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop'
        ],
        'software': [
          'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop'
        ],
        'default': [
          'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1628682752758-ea9a82a1073c?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop'
        ]
      };
      
      // Normalize ingredient name for lookup
      const lowerIngredient = ingredientName.toLowerCase();
      
      // Try to find exact match first
      if (mockImageUrls[lowerIngredient]) {
        resolve(mockImageUrls[lowerIngredient] + '?w=400&h=400&fit=crop');
        return;
      }
      
      // Try to find a matching image with partial matching
      const matchedIngredient = Object.keys(mockImageUrls).find(
        ingredient => lowerIngredient.includes(ingredient) || ingredient.includes(lowerIngredient)
      );
      
      if (matchedIngredient) {
        resolve(mockImageUrls[matchedIngredient] + '?w=400&h=400&fit=crop');
      } else {
        // Get the category from the current context (or default to food)
        // This requires modifying the function signature to accept category
        const category = window.currentCategory || 'default'; // Fallback to default
        const fallbackImages = categoryFallbackImages[category] || categoryFallbackImages.default;
        resolve(fallbackImages[Math.floor(Math.random() * fallbackImages.length)]);
      }
    }, 800 + Math.random() * 1200); // Random delay between 800-2000ms to simulate network
  });
}
