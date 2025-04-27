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
      
      // Enhanced image URL database with more specific ingredient images
      const mockImageUrls: Record<string, string> = {
        // Pasta and Italian ingredients
        'pasta': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
        'spaghetti pasta': 'https://images.unsplash.com/photo-1627823202007-4e80a80006e3',
        'lasagna sheets': 'https://images.unsplash.com/photo-1633436375153-d7045cb93e46',
        'tomato sauce': 'https://images.unsplash.com/photo-1612119805122-2b33195bf338',
        
        // Vegetables and produce
        'tomatoes': 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924',
        'tomato': 'https://images.unsplash.com/photo-1606588260160-0c2992a7e7c7',
        'garlic': 'https://images.unsplash.com/photo-1615477550927-6ec8445abaa6',
        'onion': 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae',
        'onions': 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1',
        'lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1',
        'cucumber': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e',
        'bell pepper': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83',
        'avocado': 'https://images.unsplash.com/photo-1632660668043-67a9b860ac8a',
        'herbs': 'https://images.unsplash.com/photo-1620085229799-73082a0f4f50',
        'cilantro': 'https://images.unsplash.com/photo-1599219114440-80c7944f1c2b',
        'mint leaves': 'https://images.unsplash.com/photo-1628613779039-7a71f2467be8',
        'basil': 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc',
        
        // Other categories
        'cotton t-shirt': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        'polo shirt': 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99',
        'skinny jeans': 'https://images.unsplash.com/photo-1542272604-787c3835535d',
        'running sneakers': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        'boots': 'https://images.unsplash.com/photo-1608256246200-95e5b1e8e62c',
        'iphone': 'https://images.unsplash.com/photo-1556656793-08538906a9f8',
        'samsung': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c',
        'adobe photoshop': 'https://images.unsplash.com/photo-1560158218-69ae5166d439',
        'microsoft 365': 'https://images.unsplash.com/photo-1650003747344-9920aeacac19',
        
        // Vegetables and produce
        'tomatoes': 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924',
        'tomato': 'https://images.unsplash.com/photo-1606588260160-0c2992a7e7c7',
        'garlic': 'https://images.unsplash.com/photo-1615477550927-6ec8445abaa6',
        'onion': 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae',
        'onions': 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1',
        'lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1',
        'cucumber': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e',
        'bell pepper': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83',
        'avocado': 'https://images.unsplash.com/photo-1632660668043-67a9b860ac8a',
        'herbs': 'https://images.unsplash.com/photo-1620085229799-73082a0f4f50',
        'cilantro': 'https://images.unsplash.com/photo-1599219114440-80c7944f1c2b',
        'mint leaves': 'https://images.unsplash.com/photo-1628613779039-7a71f2467be8',
        'basil': 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc',
        
        // Oils and condiments
        'olive oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
        'sesame oil': 'https://images.unsplash.com/photo-1611349710229-da865ad6af1c',
        'vinegar': 'https://images.unsplash.com/photo-1592335584098-fb9caec6f11f',
        'mayonnaise': 'https://images.unsplash.com/photo-1642975260629-5d40ed1c7a31',
        'mustard': 'https://images.unsplash.com/photo-1528750717929-32d0e7cf2e48',
        'ketchup': 'https://images.unsplash.com/photo-1613735788249-b52ea9252ad6',
        'soy sauce': 'https://images.unsplash.com/photo-1589191600874-7697e255b731',
        
        // Dairy
        'cheese': 'https://images.unsplash.com/photo-1452195100486-9cc805987862',
        'cheese slices': 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a',
        'parmesan cheese': 'https://images.unsplash.com/photo-1634487359989-3e90c9432133',
        'mozzarella cheese': 'https://images.unsplash.com/photo-1619860705586-25ee1e28a612',
        'ricotta cheese': 'https://images.unsplash.com/photo-1633534486942-68c9be88cf38',
        'butter': 'https://images.unsplash.com/photo-1589985270958-a664e7e70162',
        'eggs': 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc',
        'milk': 'https://images.unsplash.com/photo-1563636619-e9143da7973b',
        'heavy cream': 'https://images.unsplash.com/photo-1590534247854-e97d5e3feac3',
        'yogurt': 'https://images.unsplash.com/photo-1562114808-b4b33281e960',
        'sour cream': 'https://images.unsplash.com/photo-1629159506702-e6e5448bf102',
        
        // Meats
        'ground beef': 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6',
        'chicken': 'https://images.unsplash.com/photo-1587593810167-a84920ea0781',
        'chicken pieces': 'https://images.unsplash.com/photo-1626082915404-be2788272da3',
        'whole chicken': 'https://images.unsplash.com/photo-1571597434900-41198666000e',
        'beef steak': 'https://images.unsplash.com/photo-1529694873984-bcf8899d8faa',
        'fish fillets': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
        
        // Bakery
        'bread': 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c',
        'burger buns': 'https://images.unsplash.com/photo-1600326145359-3a44ca2a8ca39',
        'tortillas': 'https://images.unsplash.com/photo-1616471838591-331b400bcbd1',
        'large tortillas': 'https://images.unsplash.com/photo-1651439309699-3cc7fedefc46',
        'pizza dough': 'https://images.unsplash.com/photo-1594007654729-407eedc4fe3f',
        
        // Grains and starches
        'rice': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6',
        'basmati rice': 'https://images.unsplash.com/photo-1584269600529-04373dcd9cdf',
        'noodles': 'https://images.unsplash.com/photo-1612927601601-6638404737ce',
        'flour': 'https://images.unsplash.com/photo-1603566541830-a1f7a23189e4',
        
        // Spices
        'salt': 'https://images.unsplash.com/photo-1519847094858-21121ac6ed38',
        'pepper': 'https://images.unsplash.com/photo-1600628960015-537a42ce0315',
        'black pepper': 'https://images.unsplash.com/photo-1588172305906-5699ae4b3d0e',
        'spices': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757',
        'curry powder': 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488',
        'taco seasoning': 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
        'biryani masala': 'https://images.unsplash.com/photo-1596797038530-2c107229654b',
        'italian herbs': 'https://images.unsplash.com/photo-1596473537018-312d6478a578',
        'ginger': 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25',
        
        // Fruits
        'lemon': 'https://images.unsplash.com/photo-1590502593747-42a996133562',
        'bananas': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
        'strawberries': 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9',
        'berries': 'https://images.unsplash.com/photo-1591287083773-9a5ae2d48b6a',
        
        // Sweets and desserts
        'sugar': 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906',
        'maple syrup': 'https://images.unsplash.com/photo-1643113231957-c9c01ec9fd49',
        'honey': 'https://images.unsplash.com/photo-1558642891-54be180ea339',
        'vanilla extract': 'https://images.unsplash.com/photo-1631788012423-83e4a3a2bb1c',
        'chocolate frosting': 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d',
        'frosting': 'https://images.unsplash.com/photo-1557925923-cd4648e211a0',
        
        // Miscellaneous
        'water': 'https://images.unsplash.com/photo-1603724805096-e599d0444bca',
        'baking powder': 'https://images.unsplash.com/photo-1637314883424-121e66409498',
        'saffron': 'https://images.unsplash.com/photo-1631206753348-db44968bd341',
        'coconut milk': 'https://images.unsplash.com/photo-1559710150-32394a163085',
        'ice': 'https://images.unsplash.com/photo-1531852691047-45f88b927268',
        'mixed vegetables': 'https://images.unsplash.com/photo-1557844352-761f2dab3a42',
        'wasabi': 'https://images.unsplash.com/photo-1552431713-b265f0645fba',
        'croutons': 'https://images.unsplash.com/photo-1600326876646-67b5ec152feb',
        'salsa': 'https://images.unsplash.com/photo-1618092388915-b29d156a14a5',
        'guacamole': 'https://images.unsplash.com/photo-1604352809968-3785a2b0da69',
        'bbq sauce': 'https://images.unsplash.com/photo-1593584785104-98801d22089d'
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
        // Fallback to a random image if no match
        const randomImages = [
          'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1627485937980-936d240e5569?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1617692855027-33b14f061079?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1628682752758-ea9a82a1073c?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop'
        ];
        resolve(randomImages[Math.floor(Math.random() * randomImages.length)]);
      }
    }, 800 + Math.random() * 1200); // Random delay between 800-2000ms to simulate network
  });
}
