
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg p-2 transform hover:scale-105 transition-transform">
        <BookOpen className="w-6 h-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">জ্ঞানবীথি</span>
        <span className="text-xs text-muted-foreground">AI Learning Platform</span>
      </div>
    </Link>
  );
};

export default Logo;
