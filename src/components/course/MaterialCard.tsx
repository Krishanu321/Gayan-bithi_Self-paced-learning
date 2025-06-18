
import React from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, FileText, BookOpen, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GeneratedContent } from '@/services/aiService';

interface MaterialCardProps {
  material: GeneratedContent;
  courseId: string;
}

const MaterialCard = ({ material, courseId }: MaterialCardProps) => {
  const typeIcons = {
    outline: <BookMarked className="h-5 w-5" />,
    notes: <FileText className="h-5 w-5" />,
    flashcards: <BookOpen className="h-5 w-5" />,
    quiz: <AlertCircle className="h-5 w-5" />
  };
  
  const typeLabels = {
    outline: 'Course Outline',
    notes: 'Study Notes',
    flashcards: 'Flashcards',
    quiz: 'Quiz'
  };
  
  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {typeIcons[material.type as keyof typeof typeIcons]}
          <span className="text-sm font-medium text-muted-foreground">
            {typeLabels[material.type as keyof typeof typeLabels]}
          </span>
        </div>
        <CardTitle className="text-lg mt-2">{material.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground">
          Created on {new Date(material.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="pt-1">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/courses/${courseId}/materials/${material.id}`}>
            View Material
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaterialCard;
