
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatState, CategoryType } from '@/types/chat';
import { toast } from 'sonner';
import { 
  getIngredientsFromGemini, 
  convertIngredientsToProducts,
  fetchImagesForIngredients
} from '@/services/chatService';

export function useChatState() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    currentInput: '',
    currentQuestion: 'none',
    selectedMood: null,
    selectedCategory: null,
    favoriteFood: null,
    hasSubmittedDish: false
  });
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setChatState(prev => ({
      ...prev,
      messages: [
        {
          id: uuidv4(),
          content: "Hello! What category are you interested in today?",
          role: 'bot',
          timestamp: new Date()
        }
      ],
      currentQuestion: 'category'
    }));
  }, []);

  const addMessage = (content: string, role: 'user' | 'bot'): void => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date()
    };
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      currentInput: ''
    }));
  };

  const setBotResponse = (content: string): void => {
    setTimeout(() => {
      addMessage(content, 'bot');
    }, 500);
  };

  const handleProductResponse = async (productName: string): Promise<void> => {
    const { selectedCategory } = chatState;
    
    setChatState(prev => ({
      ...prev,
      isLoading: true,
      favoriteFood: productName, // We'll use this field for all product types
      currentQuestion: 'none',
      hasSubmittedDish: true
    }));
    
    setBotResponse(`I'll find recommendations for ${productName}. Just a moment...`);
    
    try {
      // Pass the category to getIngredientsFromGemini so it can return appropriate items
      const ingredients = await getIngredientsFromGemini(productName, selectedCategory);
      
      const initialProducts = convertIngredientsToProducts(ingredients, selectedCategory);
      setProducts(initialProducts);
      
      setBotResponse(`Here are some ${productName} recommendations...`);
      
      fetchImagesForIngredients(initialProducts)
        .then(updatedProducts => {
          setProducts(updatedProducts);
          setBotResponse(`Here are detailed recommendations for ${productName}!`);
        })
        .catch(error => {
          console.error('Error fetching images:', error);
          toast.error("Some product images couldn't be loaded");
        });
    } catch (error) {
      console.error('Error getting product details:', error);
      setBotResponse("I'm having trouble finding product details right now. Please try again later.");
      toast.error("Failed to get product details");
    } finally {
      setChatState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleCategorySelection = (category: CategoryType): void => {
    setChatState(prev => ({
      ...prev,
      selectedCategory: category,
      currentQuestion: 'product'
    }));
    
    addMessage(`I'm interested in ${category}`, 'user');
    
    let responseText = "";
    switch(category) {
      case 'food':
        responseText = "Great! What specific food dish are you looking for?";
        break;
      case 'clothes':
        responseText = "Excellent! What type of clothing item are you looking for?";
        break;
      case 'shoes':
        responseText = "Perfect! What style of shoes are you interested in?";
        break;
      case 'mobiles':
        responseText = "Nice choice! What type of mobile device are you interested in?";
        break;
      case 'software':
        responseText = "Great! What kind of software or application are you looking for?";
        break;
      default:
        responseText = `Great! What specific ${category} product are you looking for?`;
    }
    
    setTimeout(() => {
      setBotResponse(responseText);
    }, 500);
  };

  const handleResubmit = (): void => {
    setChatState(prev => ({
      ...prev,
      currentQuestion: 'product',
      hasSubmittedDish: false
    }));
    
    const { selectedCategory } = chatState;
    let promptText = "";
    
    switch(selectedCategory) {
      case 'food':
        promptText = "What other dish would you like to try? Tell me another food!";
        break;
      case 'clothes':
        promptText = "What other clothing item would you like to see? Tell me another style!";
        break;
      case 'shoes':
        promptText = "What other footwear would you like to check out? Tell me another style!";
        break;
      case 'mobiles':
        promptText = "What other mobile device would you like to explore? Tell me another option!";
        break;
      case 'software':
        promptText = "What other software would you like to discover? Tell me another application!";
        break;
      default:
        promptText = "What other product would you like to try? Tell me another product!";
    }
    
    setBotResponse(promptText);
  };

  const handleInputChange = (value: string): void => {
    setChatState(prev => ({ ...prev, currentInput: value }));
  };

  const handleSendMessage = async (): Promise<void> => {
    const { currentInput, currentQuestion } = chatState;
    if (!currentInput.trim()) return;
    
    addMessage(currentInput, 'user');
    
    if (currentQuestion === 'product') {
      handleProductResponse(currentInput);
    } else {
      setBotResponse("I'm not sure how to respond to that right now.");
    }
  };

  return {
    chatState,
    products,
    handleInputChange,
    handleSendMessage,
    handleCategorySelection,
    handleResubmit
  };
}
