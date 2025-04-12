
import React from 'react';
import ChatBot from '@/components/ChatBot';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-food-teal text-white py-4 px-6 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Food Mood Shop</h1>
          <p className="text-food-mint">Tell us how you're feeling, get food recommendations</p>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto border-gray-200 shadow-sm p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-food-dark">Chat with our Food Assistant</h2>
            <p className="text-sm text-gray-500">Tell us your mood and favorite dishes, and we'll suggest ingredients!</p>
          </div>
          
          <ChatBot />
        </Card>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 Food Mood Shop. All ingredients sourced from quality suppliers.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
