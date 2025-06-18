
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookMarked, FileText, BookOpen, AlertCircle, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import { getMaterials, getCourseById } from '@/services/storageService';
import { GeneratedContent } from '@/services/aiService';

const Materials = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [materials, setMaterials] = useState<GeneratedContent[]>([]);
  const [course, setCourse] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Load materials from storage
    const allMaterials = getMaterials();
    
    // Filter by course if courseId is provided
    if (courseId) {
      const foundCourse = getCourseById(courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        setMaterials(allMaterials.filter(m => foundCourse.materials.includes(m.id)));
      } else {
        setMaterials([]);
      }
    } else {
      // Show all materials if no courseId
      setMaterials(allMaterials);
    }
  }, [courseId]);
  
  // Filter materials based on search query
  const filteredMaterials = searchQuery
    ? materials.filter(material => 
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : materials;

  // Group materials by type
  const outlines = filteredMaterials.filter(m => m.type === 'outline');
  const notes = filteredMaterials.filter(m => m.type === 'notes');
  const flashcards = filteredMaterials.filter(m => m.type === 'flashcards');
  const quizzes = filteredMaterials.filter(m => m.type === 'quiz');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {course ? `${course.title} - Study Materials` : 'All Study Materials'}
            </h1>
            <p className="text-muted-foreground">
              Browse and manage your study resources
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-9 w-full md:w-[260px]" 
                placeholder="Search materials..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {course && (
              <Button asChild variant="outline">
                <Link to={`/courses/${courseId}`}>
                  Back to Course
                </Link>
              </Button>
            )}
          </div>
        </div>

        {materials.length > 0 ? (
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
                {filteredMaterials.map((material) => (
                  <MaterialCard 
                    key={material.id} 
                    material={material} 
                    courseId={course?.id || ''} 
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
                      courseId={course?.id || ''} 
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-3 py-4">
                    No course outlines match your search criteria.
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
                      courseId={course?.id || ''} 
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-3 py-4">
                    No notes match your search criteria.
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
                      courseId={course?.id || ''} 
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-3 py-4">
                    No flashcards match your search criteria.
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
                      courseId={course?.id || ''} 
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-3 py-4">
                    No quizzes match your search criteria.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No materials found</h2>
            {course ? (
              <p className="text-muted-foreground mb-6">
                This course doesn't have any study materials yet
              </p>
            ) : (
              <p className="text-muted-foreground mb-6">
                You haven't created any study materials yet
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

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

export default Materials;
