
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatState, MoodType, Product } from '@/types/chat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import MoodSelector from './MoodSelector';
import ProductGrid from './ProductGrid';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { getIngredientsFromGemini, convertIngredientsToProducts } from '@/services/chatService';

const ChatBot: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    currentInput: '',
    currentQuestion: 'none',
    selectedMood: null,
    favoriteFood: null
  });
  
  const [products, setProducts] = useState<Product[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat with a welcome message
  useEffect(() => {
    setChatState(prev => ({
      ...prev,
      messages: [
        {
          id: uuidv4(),
          content: "Hello! How are you feeling today?",
          role: 'bot',
          timestamp: new Date()
        }
      ],
      currentQuestion: 'mood'
    }));
  }, []);
  
  // Scroll to bottom whenever messages change
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
    
    // Add user message
    addMessage(currentInput, 'user');
    
    // Handle user input based on current question
    if (currentQuestion === 'dish') {
      handleDishResponse(currentInput);
    } else {
      // Generic response for other inputs
      setBotResponse("I'm not sure how to respond to that right now.");
    }
  };
  
  const handleMoodSelection = (mood: MoodType): void => {
    setChatState(prev => ({
      ...prev,
      selectedMood: mood
    }));
    
    // Add user message indicating their mood
    addMessage(`I'm feeling ${mood}`, 'user');
    
    // If mood is hungry, ask about favorite food
    if (mood === 'hungry') {
      setTimeout(() => {
        setBotResponse("What are you craving? Tell me your favorite dish!");
        setChatState(prev => ({ ...prev, currentQuestion: 'dish' }));
      }, 500);
    } else {
      // Handle other moods with generic responses
      const responses: Record<MoodType, string> = {
        happy: "That's wonderful! I'm glad to hear you're happy.",
        sad: "I'm sorry to hear that. Maybe I can recommend something to cheer you up.",
        energetic: "Great! You have plenty of energy today.",
        relaxed: "Nice! It's good to feel relaxed.",
        hungry: "" // This case is handled separately above
      };
      
      setTimeout(() => {
        setBotResponse(responses[mood] || "Thanks for sharing how you feel!");
      }, 500);
    }
  };
  
  const handleDishResponse = async (dishName: string): Promise<void> => {
    setChatState(prev => ({
      ...prev,
      isLoading: true,
      favoriteFood: dishName,
      currentQuestion: 'none'
    }));
    
    setBotResponse(`I'll find the ingredients for ${dishName}. Just a moment...`);
    
    try {
      // Get ingredients from Gemini (mock service for now)
      const ingredients = await getIngredientsFromGemini(dishName);
      
      // Convert ingredients to products
      const newProducts = convertIngredientsToProducts(ingredients);
      setProducts(newProducts);
      
      // Respond with ingredient list
      const ingredientList = ingredients.join(', ');
      setBotResponse(`For ${dishName}, you'll need: ${ingredientList}. I've listed the products below!`);
    } catch (error) {
      console.error('Error getting ingredients:', error);
      setBotResponse("I'm having trouble finding ingredients right now. Please try again later.");
      toast.error("Failed to get ingredients");
    } finally {
      setChatState(prev => ({ ...prev, isLoading: false }));
    }
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
            {chatState.currentQuestion === 'mood' && (
              <div className="my-4 animate-fade-in">
                <MoodSelector onSelect={handleMoodSelection} />
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
        disabled={chatState.isLoading || chatState.currentQuestion === 'mood'}
        placeholder={
          chatState.currentQuestion === 'dish' 
            ? "Enter your favorite dish..." 
            : "Type your message..."
        }
      />
      
      {products.length > 0 && (
        <div className="mt-8">
          <ProductGrid 
            products={products} 
            title={`Ingredients for ${chatState.favoriteFood || 'Your Dish'}`} 
          />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
