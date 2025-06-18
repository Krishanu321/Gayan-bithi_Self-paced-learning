
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, BookOpen, Timer, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getCourses, Course } from '@/services/storageService';

const Dashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Load courses from storage
    const loadedCourses = getCourses();
    setCourses(loadedCourses);
  }, []);

  // Filter courses based on active tab
  const filteredCourses = activeTab === 'all' 
    ? courses 
    : activeTab === 'inprogress' 
      ? courses.filter(course => course.progress > 0 && course.progress < 100)
      : courses.filter(course => course.progress === 100);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and study materials</p>
          </div>
          
          <div className="flex gap-3">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/analytics">
                <BarChart className="w-4 h-4" /> Analytics
              </Link>
            </Button>
            <Button asChild className="gap-2">
              <Link to="/courses/new">
                <PlusCircle className="w-4 h-4" /> New Course
              </Link>
            </Button>
          </div>
        </div>

        {courses.length > 0 ? (
          <>
            <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="inprogress" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
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

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Study Time</CardTitle>
                  <CardDescription>Your study activity this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">4.5 hours</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">+1.2 hours from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Materials Created</CardTitle>
                  <CardDescription>AI-generated study assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{courses.reduce((acc, course) => acc + course.materials.length, 0)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Across {courses.length} courses</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Overall Progress</CardTitle>
                  <CardDescription>All courses combined</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <Progress value={courses.reduce((acc, course) => acc + course.progress, 0) / courses.length} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}% complete
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p className="text-muted-foreground">No activity to display yet.</p>
          )}
        </div>
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

export default Dashboard;
