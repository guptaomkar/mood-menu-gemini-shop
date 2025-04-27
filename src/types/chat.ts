
export type MessageRole = 'user' | 'bot' | 'system';

export type CategoryType = 'food' | 'clothes' | 'shoes' | 'mobiles' | 'software';

export type CurrentQuestion = 'category' | 'product' | 'none';

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentInput: string;
  currentQuestion: CurrentQuestion;
  selectedMood: MoodType | null;
  favoriteFood: string | null;
  hasSubmittedDish: boolean;
  selectedCategory: CategoryType | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isImageLoading?: boolean;
}

export type MoodType = 'hungry' | 'happy' | 'sad' | 'energetic' | 'relaxed';

