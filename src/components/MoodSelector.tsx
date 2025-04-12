
import React from 'react';
import { MoodType } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Coffee, Utensils, Smile, Frown, Zap, Leaf } from 'lucide-react';

interface MoodSelectorProps {
  onSelect: (mood: MoodType) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect }) => {
  const moods: { type: MoodType, label: string, icon: React.ReactNode }[] = [
    { type: 'hungry', label: 'Hungry', icon: <Utensils className="mr-2 h-4 w-4" /> },
    { type: 'happy', label: 'Happy', icon: <Smile className="mr-2 h-4 w-4" /> },
    { type: 'sad', label: 'Sad', icon: <Frown className="mr-2 h-4 w-4" /> },
    { type: 'energetic', label: 'Energetic', icon: <Zap className="mr-2 h-4 w-4" /> },
    { type: 'relaxed', label: 'Relaxed', icon: <Leaf className="mr-2 h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {moods.map((mood) => (
        <Button
          key={mood.type}
          variant="outline"
          className="border-food-teal text-food-dark hover:bg-food-mint hover:text-food-dark"
          onClick={() => onSelect(mood.type)}
        >
          {mood.icon}
          {mood.label}
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
