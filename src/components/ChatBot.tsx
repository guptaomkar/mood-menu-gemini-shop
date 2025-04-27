
import React, { useRef, useEffect } from 'react';
import { useChatState } from '@/hooks/useChatState';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import ProductRecommendations from './ProductRecommendations';

const ChatBot: React.FC = () => {
  const { 
    chatState, 
    products, 
    handleInputChange, 
    handleSendMessage, 
    handleCategorySelection,
    handleResubmit 
  } = useChatState();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow mb-4">
        <ChatMessages
          messages={chatState.messages}
          showCategorySelector={chatState.currentQuestion === 'category'}
          onCategorySelect={handleCategorySelection}
          messagesEndRef={messagesEndRef}
        />
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
        <ProductRecommendations
          products={products}
          favoriteFood={chatState.favoriteFood}
          selectedCategory={chatState.selectedCategory}
          onResubmit={handleResubmit}
        />
      )}
    </div>
  );
};

export default ChatBot;
