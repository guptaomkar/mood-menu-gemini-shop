
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatState, CategoryType, Product } from '@/types/chat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import CategorySelector from './CategorySelector';
import ProductGrid from './ProductGrid';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { 
  getIngredientsFromGemini, 
  convertIngredientsToProducts,
  fetchImagesForIngredients
} from '@/services/chatService';

const ChatBot: React.FC = () => {
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
  
  const [products, setProducts] = useState<Product[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);
  
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
  
  const handleCategorySelection = (category: CategoryType): void => {
    setChatState(prev => ({
      ...prev,
      selectedCategory: category
    }));
    
    addMessage(`I'm interested in ${category}`, 'user');
    
    setTimeout(() => {
      setBotResponse(`Great! What specific ${category} product are you looking for?`);
      setChatState(prev => ({
        ...prev,
        currentQuestion: 'product'
      }));
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
  
  const handleResubmit = (): void => {
    setChatState(prev => ({
      ...prev,
      currentQuestion: 'product',
      hasSubmittedDish: false
    }));
    
    setBotResponse("What other product would you like to try? Tell me another product!");
  };
  
  const setBotResponse = (content: string): void => {
    setTimeout(() => {
      addMessage(content, 'bot');
    }, 500);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow mb-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="flex flex-col p-4">
            {chatState.messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {chatState.currentQuestion === 'category' && (
              <div className="my-4 animate-fade-in">
                <CategorySelector onSelect={handleCategorySelection} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
      
      <ChatInput
        value={chatState.currentInput}
        onChange={handleInputChange}
        onSend={handleSendMessage}
        disabled={chatState.isLoading || chatState.currentQuestion === 'category'}
        placeholder={
          chatState.currentQuestion === 'product' 
            ? "Enter a specific product..." 
            : "Type your message..."
        }
      />
      
      {products.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              Recommendations for {chatState.favoriteFood || 'Your Product'}
            </h3>
            
            <Button 
              onClick={handleResubmit}
              variant="outline" 
              className="gap-2 text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
            >
              <RefreshCw className="h-4 w-4" />
              Suggest Another Product
            </Button>
          </div>
          
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
};

export default ChatBot;

