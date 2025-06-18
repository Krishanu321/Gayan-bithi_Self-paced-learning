
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { getCourseById } from '@/services/storageService';
import { CourseHeader, CourseProgress, LastUpdated } from '@/components/course';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import CourseChapters from '@/components/course/CourseChapters';
import CourseContent from '@/components/course/CourseContent';
import { Play, BookOpen } from 'lucide-react';
import YouTubeEmbed from '@/components/YouTubeEmbed';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  
  useEffect(() => {
    if (id) {
      const foundCourse = getCourseById(id);
      setCourse(foundCourse);
    }
  }, [id]);

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading course...</p>
        </div>
      </Layout>
    );
  }

  const handleChapterClick = (index: number) => {
    setActiveChapter(index);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <CourseHeader title={course.title} category={course.category} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2">
              <CourseProgress progress={course.progress || 0} />
            </div>
            <div className="flex justify-end items-center">
              <LastUpdated date={course.updatedAt} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar - Course Chapters */}
          <div className="lg:col-span-3">
            <CourseChapters 
              course={course} 
              activeChapter={activeChapter} 
              onChapterClick={handleChapterClick} 
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9">
            <Card className="overflow-hidden">
              <Tabs defaultValue="content" className="w-full">
                <div className="px-6 pt-6">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="content" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Course Content
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Video Lecture
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <Separator />
                
                <TabsContent value="content" className="m-0 p-6">
                  <CourseContent course={course} activeChapter={activeChapter} />
                </TabsContent>
                
                <TabsContent value="video" className="m-0 p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">
                      {course.chapters && course.chapters[activeChapter] ? 
                        course.chapters[activeChapter].title : 
                        'Chapter Video'}
                    </h3>
                    
                    {course.chapters && course.chapters[activeChapter]?.videoId ? (
                      <YouTubeEmbed 
                        videoId={course.chapters[activeChapter].videoId} 
                        title={course.chapters[activeChapter].title}
                      />
                    ) : (
                      <div className="bg-muted rounded-md p-6 text-center">
                        <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No video available</h3>
                        <p className="text-muted-foreground">
                          This chapter does not have a video lecture yet
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
