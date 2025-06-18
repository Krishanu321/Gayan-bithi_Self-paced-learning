
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface CourseStepDetailsProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const CourseStepDetails = ({ 
  title, 
  setTitle, 
  description, 
  setDescription, 
  onNext, 
  onBack 
}: CourseStepDetailsProps) => {
  const { toast } = useToast();

  const handleNext = () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please provide a course title to continue.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Course Topic*</Label>
        <Input
          id="title"
          placeholder="e.g., JavaScript Fundamentals, Machine Learning Basics"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-brand-purple/20"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Additional Details (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Any specific areas you want the course to cover..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-brand-purple/20"
          rows={4}
        />
      </div>
      
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

export default CourseStepDetails;
