
import React from 'react';
import { Button } from '@/components/ui/button';

interface Chapter {
  id: string;
  title: string;
  duration?: string;
  completed?: boolean;
}

interface CourseChaptersProps {
  course: {
    id: string;
    title: string;
    chapters?: Chapter[];
  };
  activeChapter: number;
  onChapterClick: (index: number) => void;
}

const CourseChapters = ({ course, activeChapter, onChapterClick }: CourseChaptersProps) => {
  const chapters = course.chapters || [];
  
  if (chapters.length === 0) {
    // Display placeholder chapters if none exist
    const placeholderChapters = [
      { id: '1', title: 'What is SQL and Relational Databases?', duration: '15 minutes' },
      { id: '2', title: 'Basic SQL Commands: SELECT, WHERE, ORDER BY', duration: '25 minutes' },
      { id: '3', title: 'Data Manipulation: INSERT, UPDATE, DELETE', duration: '20 minutes' },
      { id: '4', title: 'Joins and Aggregations', duration: '15 minutes' },
      { id: '5', title: 'Practice Exercises and Project', duration: '15 minutes' }
    ];
    
    return (
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="bg-primary p-4">
          <h3 className="text-sm font-medium text-primary-foreground">
            Introduction to {course.title}
          </h3>
        </div>
        <div className="divide-y">
          {placeholderChapters.map((chapter, index) => (
            <Button
              key={chapter.id}
              variant="ghost"
              className={`w-full justify-start rounded-none py-4 px-4 h-auto ${
                activeChapter === index ? 'bg-muted' : ''
              }`}
              onClick={() => onChapterClick(index)}
            >
              <div className="flex gap-3 items-center w-full">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {index + 1}
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium">{chapter.title}</span>
                  {chapter.duration && (
                    <span className="text-xs text-muted-foreground">{chapter.duration}</span>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="bg-primary p-4">
        <h3 className="text-sm font-medium text-primary-foreground">
          Chapters
        </h3>
      </div>
      <div className="divide-y">
        {chapters.map((chapter, index) => (
          <Button
            key={chapter.id}
            variant="ghost"
            className={`w-full justify-start rounded-none py-4 px-4 h-auto ${
              activeChapter === index ? 'bg-muted' : ''
            }`}
            onClick={() => onChapterClick(index)}
          >
            <div className="flex gap-3 items-center w-full">
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                chapter.completed ? 'bg-green-500' : 'bg-primary'
              } text-xs text-white`}>
                {index + 1}
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium">{chapter.title}</span>
                {chapter.duration && (
                  <span className="text-xs text-muted-foreground">{chapter.duration}</span>
                )}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CourseChapters;
