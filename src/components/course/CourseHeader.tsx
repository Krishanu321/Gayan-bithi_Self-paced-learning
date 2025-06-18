
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CourseHeaderProps {
  title: string;
  description: string;
  onDelete: () => void;
}

const CourseHeader = ({ title, description, onDelete }: CourseHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" onClick={onDelete}>
          Delete Course
        </Button>
        <Button asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default CourseHeader;
