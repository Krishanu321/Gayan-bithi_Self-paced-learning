
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { GeneratedContent } from '@/services/aiService';
import MaterialCard from './MaterialCard';

interface MaterialListProps {
  materials: GeneratedContent[];
  courseId: string;
}

const MaterialList = ({ materials, courseId }: MaterialListProps) => {
  // Group materials by type
  const outlines = materials.filter(m => m.type === 'outline');
  const notes = materials.filter(m => m.type === 'notes');
  const flashcards = materials.filter(m => m.type === 'flashcards');
  const quizzes = materials.filter(m => m.type === 'quiz');

  if (materials.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No materials yet</h3>
            <p className="text-muted-foreground mb-6">
              Generate your first study material using the buttons above
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Materials</TabsTrigger>
        <TabsTrigger value="outlines">Outlines</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <MaterialCard 
              key={material.id} 
              material={material} 
              courseId={courseId}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="outlines" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outlines.length > 0 ? (
            outlines.map((material) => (
              <MaterialCard 
                key={material.id} 
                material={material} 
                courseId={courseId} 
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-3 py-4">
              No course outlines have been generated yet.
            </p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="notes" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.length > 0 ? (
            notes.map((material) => (
              <MaterialCard 
                key={material.id} 
                material={material} 
                courseId={courseId} 
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-3 py-4">
              No notes have been generated yet.
            </p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="flashcards" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.length > 0 ? (
            flashcards.map((material) => (
              <MaterialCard 
                key={material.id} 
                material={material} 
                courseId={courseId} 
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-3 py-4">
              No flashcards have been generated yet.
            </p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="quizzes" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.length > 0 ? (
            quizzes.map((material) => (
              <MaterialCard 
                key={material.id} 
                material={material} 
                courseId={courseId} 
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-3 py-4">
              No quizzes have been generated yet.
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MaterialList;
