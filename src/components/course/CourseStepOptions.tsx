
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Loader2, Sparkles, Video } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface CourseStepOptionsProps {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  includeVideos: string;
  setIncludeVideos: (includeVideos: string) => void;
  chaptersCount: string;
  setChaptersCount: (count: string) => void;
  onGenerate: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

const CourseStepOptions = ({ 
  difficulty, 
  setDifficulty, 
  duration, 
  setDuration, 
  includeVideos, 
  setIncludeVideos,
  chaptersCount,
  setChaptersCount,
  onGenerate, 
  onBack,
  isGenerating 
}: CourseStepOptionsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> Difficulty Level
          </Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-full border-brand-purple/20">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> Course Duration
          </Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="w-full border-brand-purple/20">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 hour">1 Hour</SelectItem>
              <SelectItem value="2-3 hours">2-3 Hours</SelectItem>
              <SelectItem value="3-5 hours">3-5 Hours</SelectItem>
              <SelectItem value="5-10 hours">5-10 Hours</SelectItem>
              <SelectItem value="10+ hours">10+ Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <Video className="h-4 w-4" /> Add Video
          </Label>
          <Select value={includeVideos} onValueChange={setIncludeVideos}>
            <SelectTrigger className="w-full border-brand-purple/20">
              <SelectValue placeholder="Include videos?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>No of Chapters</Label>
          <Input
            type="number"
            value={chaptersCount}
            onChange={(e) => setChaptersCount(e.target.value)}
            min="1"
            max="20"
            placeholder="Number of chapters"
            className="border-brand-purple/20"
          />
        </div>
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
          onClick={onGenerate}
          className="bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Course...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Course Layout
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CourseStepOptions;
