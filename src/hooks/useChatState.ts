
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
    setChatState(prev => ({
      ...prev,
      isLoading: true,
      favoriteFood: productName,
      currentQuestion: 'none',
      hasSubmittedDish: true
    }));
    
    setBotResponse(`I'll find recommendations for ${productName}. Just a moment...`);
    
    try {
      const ingredients = await getIngredientsFromGemini(productName);
      
      const initialProducts = convertIngredientsToProducts(ingredients);
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
    
    setTimeout(() => {
      setBotResponse(`Great! What specific ${category} product are you looking for?`);
    }, 500);
  };

  const handleResubmit = (): void => {
    setChatState(prev => ({
      ...prev,
      currentQuestion: 'product',
      hasSubmittedDish: false
    }));
    
    setBotResponse("What other product would you like to try? Tell me another product!");
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
