
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface CourseStepCategoryProps {
  category: string;
  setCategory: (category: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const CourseStepCategory = ({ 
  category, 
  setCategory, 
  onNext, 
  onBack 
}: CourseStepCategoryProps) => {
  const { toast } = useToast();

  const handleNext = () => {
    if (!category) {
      toast({
        title: "Category required",
        description: "Please select a course category to continue.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category">Course Category*</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full border-brand-purple/20">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="programming">Programming</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="language">Language</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="arts">Arts</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancel
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

export default CourseStepCategory;
