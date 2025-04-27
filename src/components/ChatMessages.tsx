
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import CategorySelector from './CategorySelector';
import { Message, CategoryType } from '@/types/chat';

interface ChatMessagesProps {
  messages: Message[];
  showCategorySelector: boolean;
  onCategorySelect: (category: CategoryType) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  showCategorySelector,
  onCategorySelect,
  messagesEndRef
}) => {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="flex flex-col p-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {showCategorySelector && (
          <div className="my-4 animate-fade-in">
            <CategorySelector onSelect={onCategorySelect} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
