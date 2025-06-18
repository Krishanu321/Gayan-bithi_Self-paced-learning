
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Plus, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Chapter {
  id: string;
  title: string;
  content?: string;
  duration?: string;
}

interface CourseStepChaptersProps {
  chapters: Chapter[];
  setChapters: (chapters: Chapter[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const CourseStepChapters = ({ 
  chapters, 
  setChapters, 
  onNext, 
  onBack 
}: CourseStepChaptersProps) => {
  const { toast } = useToast();

  const updateChapterTitle = (index: number, newTitle: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].title = newTitle;
    setChapters(updatedChapters);
  };

  const addChapter = () => {
    setChapters([...chapters, { 
      id: `chapter-${Date.now()}`,
      title: ''
    }]);
  };

  const removeChapter = (index: number) => {
    if (chapters.length <= 1) {
      toast({
        title: "Cannot remove chapter",
        description: "A course must have at least one chapter.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedChapters = [...chapters];
    updatedChapters.splice(index, 1);
    setChapters(updatedChapters);
  };

  const handleNext = () => {
    const emptyChapters = chapters.filter(chapter => !chapter.title);
    if (emptyChapters.length > 0) {
      toast({
        title: "Chapter titles required",
        description: "Please provide a title for each chapter.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-white">
              {index + 1}
            </div>
            <Input
              placeholder={`Chapter ${index + 1} title`}
              value={chapter.title}
              onChange={(e) => updateChapterTitle(index, e.target.value)}
              className="border-brand-purple/20 flex-grow"
              required
            />
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => removeChapter(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2"
        onClick={addChapter}
      >
        <Plus className="h-4 w-4" />
        Add Chapter
      </Button>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90"
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CourseStepChapters;
