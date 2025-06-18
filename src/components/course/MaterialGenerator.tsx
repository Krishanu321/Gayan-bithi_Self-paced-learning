
import React from 'react';
import { BookMarked, FileText, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MaterialGeneratorProps {
  generatingType: string | null;
  onGenerate: (type: string) => void;
}

const MaterialGenerator = ({ generatingType, onGenerate }: MaterialGeneratorProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Generate Study Materials</h2>
      <p className="text-muted-foreground mb-4">
        Create AI-powered study materials for this course
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          size="lg"
          className="h-auto py-6 flex flex-col gap-2"
          onClick={() => onGenerate('outline')}
          disabled={!!generatingType}
        >
          {generatingType === 'outline' ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <BookMarked className="h-6 w-6" />
          )}
          <span>Generate Course Outline</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="h-auto py-6 flex flex-col gap-2"
          onClick={() => onGenerate('notes')}
          disabled={!!generatingType}
        >
          {generatingType === 'notes' ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <FileText className="h-6 w-6" />
          )}
          <span>Generate Notes</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="h-auto py-6 flex flex-col gap-2"
          onClick={() => onGenerate('flashcards')}
          disabled={!!generatingType}
        >
          {generatingType === 'flashcards' ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <BookOpen className="h-6 w-6" />
          )}
          <span>Generate Flashcards</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="h-auto py-6 flex flex-col gap-2"
          onClick={() => onGenerate('quiz')}
          disabled={!!generatingType}
        >
          {generatingType === 'quiz' ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <AlertCircle className="h-6 w-6" />
          )}
          <span>Generate Quiz</span>
        </Button>
      </div>
    </div>
  );
};

export default MaterialGenerator;
