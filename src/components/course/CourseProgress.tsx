
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CourseProgressProps {
  progress: number;
}

const CourseProgress = ({ progress }: CourseProgressProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
        <CardDescription>Your course completion status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <Progress value={progress} />
        </div>
        <p className="text-sm text-muted-foreground">
          {progress}% complete
        </p>
      </CardContent>
    </Card>
  );
};

export default CourseProgress;
