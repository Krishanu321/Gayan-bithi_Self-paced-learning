import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { BookOpen, PlusCircle, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import { getCourses, Course } from '@/services/storageService';

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Load courses from storage
    const loadedCourses = getCourses();
    setCourses(loadedCourses);
  }, []);
  
  // Filter courses based on search query
  const filteredCourses = searchQuery
    ? courses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courses;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Courses</h1>
            <p className="text-muted-foreground">Browse and manage your study courses</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-9 w-full md:w-[260px]" 
                placeholder="Search courses..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button asChild className="gap-2 whitespace-nowrap">
              <Link to="/courses/new">
                <PlusCircle className="w-4 h-4" /> New Course
              </Link>
            </Button>
          </div>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No courses yet</h2>
            <p className="text-muted-foreground mb-6">Get started by creating your first course</p>
            <Button asChild>
              <Link to="/courses/new">Create Course</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="pb-3">
        <CardTitle>{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center justify-between mb-1 text-sm">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <Progress value={course.progress} className="h-2" />
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4 mr-1" />
          <span>{course.materials.length} study materials</span>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/courses/${course.id}`}>
            Open Course
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Courses;
