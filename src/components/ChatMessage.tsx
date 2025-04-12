
import React from 'react';
import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { Smile, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div 
      className={cn(
        "flex w-full mb-4 animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "flex gap-3 max-w-[80%]",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        <Avatar className={cn(
          "h-8 w-8 border",
          isUser ? "bg-food-orange" : "bg-food-teal"
        )}>
          {isUser ? <Smile className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
        </Avatar>
        <div 
          className={cn(
            "rounded-lg px-4 py-2 shadow-sm",
            isUser ? "bg-food-orange text-white" : "bg-white border border-gray-200"
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
