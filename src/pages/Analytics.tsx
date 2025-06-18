
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Book, BookOpen, CheckCircle2, Clock, FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import { getCourses, getMaterials } from '@/services/storageService';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Analytics = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  
  useEffect(() => {
    // Load data from storage
    const loadedCourses = getCourses();
    const loadedMaterials = getMaterials();
    
    setCourses(loadedCourses);
    setMaterials(loadedMaterials);
  }, []);

  // Calculate total progress
  const totalProgress = courses.length > 0
    ? Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)
    : 0;
  
  // Count materials by type
  const countByType = {
    outline: materials.filter(m => m.type === 'outline').length,
    notes: materials.filter(m => m.type === 'notes').length,
    flashcards: materials.filter(m => m.type === 'flashcards').length,
    quiz: materials.filter(m => m.type === 'quiz').length,
  };
  
  // Material distribution data for pie chart
  const materialTypeData = [
    { name: 'Outlines', value: countByType.outline, color: '#4361EE' },
    { name: 'Notes', value: countByType.notes, color: '#7B61FF' },
    { name: 'Flashcards', value: countByType.flashcards, color: '#3A0CA3' },
    { name: 'Quizzes', value: countByType.quiz, color: '#4CC9F0' },
  ];
  
  // Weekly progress data (mock data for now)
  const weeklyProgressData = [
    { name: 'Mon', progress: 15 },
    { name: 'Tue', progress: 25 },
    { name: 'Wed', progress: 40 },
    { name: 'Thu', progress: 30 },
    { name: 'Fri', progress: 50 },
    { name: 'Sat', progress: 35 },
    { name: 'Sun', progress: 45 },
  ];
  
  // Course progress data
  const courseProgressData = courses.map(course => ({
    name: course.title.length > 15 ? course.title.substring(0, 15) + '...' : course.title,
    progress: course.progress,
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your study progress and performance</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Book className="h-5 w-5 mr-2 text-brand-blue" />
                <div className="text-2xl font-bold">{courses.length}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Study Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-brand-purple" />
                <div className="text-2xl font-bold">{materials.length}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                <div className="text-2xl font-bold">{totalProgress}%</div>
              </div>
              <Progress value={totalProgress} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-amber-500" />
                <div className="text-2xl font-bold">4.5h</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Study Progress</CardTitle>
              <CardDescription>Your progress throughout the week</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={weeklyProgressData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#4361EE" 
                    fill="url(#progressGradient)" 
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4361EE" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4361EE" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Material Distribution</CardTitle>
              <CardDescription>Types of study materials created</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={materialTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {materialTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Completion rate for each course</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={courseProgressData}
                margin={{ top: 5, right: 20, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="#7B61FF" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
