
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GeneratedContent } from '@/services/aiService';

interface MaterialsSummaryProps {
  courseId: string;
  materialsCount: number;
}

const MaterialsSummary = ({ courseId, materialsCount }: MaterialsSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Materials</CardTitle>
        <CardDescription>Study materials for this course</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{materialsCount} total</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/courses/${courseId}/materials`}>View All</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialsSummary;
