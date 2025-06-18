
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { getCourseById, getMaterialById, deleteMaterial } from '@/services/storageService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GeneratedContent } from '@/services/aiService';

const MaterialDetail = () => {
  const { courseId, materialId } = useParams<{ courseId: string, materialId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<any>(null);
  const [material, setMaterial] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId || !materialId) return;
    
    const loadData = () => {
      const foundCourse = getCourseById(courseId);
      const foundMaterial = getMaterialById(materialId);
      
      if (foundCourse && foundMaterial) {
        setCourse(foundCourse);
        setMaterial(foundMaterial);
      } else {
        toast({
          title: "Error",
          description: foundCourse ? "Material not found" : "Course not found",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
      
      setLoading(false);
    };
    
    loadData();
  }, [courseId, materialId, navigate, toast]);

  const handleDeleteMaterial = () => {
    if (!materialId || !courseId) return;
    
    if (window.confirm("Are you sure you want to delete this material? This action cannot be undone.")) {
      deleteMaterial(materialId);
      toast({
        title: "Material deleted",
        description: "The material has been successfully deleted.",
      });
      navigate(`/courses/${courseId}`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!course || !material) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {!course ? "Course not found." : "Material not found."}
              It may have been deleted.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button asChild>
              <Link to="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const renderContent = () => {
    switch (material.type) {
      case 'outline':
      case 'notes':
        // Render markdown-like content for outlines and notes
        return (
          <div className="prose prose-slate max-w-none dark:prose-invert">
            {material.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) {
                return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
              } else if (line.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-bold mt-5 mb-2">{line.substring(4)}</h3>;
              } else if (line.startsWith('- ')) {
                return <li key={i} className="ml-6 my-1">{line.substring(2)}</li>;
              } else if (line.trim() === '') {
                return <br key={i} />;
              } else {
                return <p key={i} className="my-3">{line}</p>;
              }
            })}
          </div>
        );
      
      case 'flashcards':
        // Display flashcards as Q&A format
        const cards = material.content
          .split('\n\n')
          .filter(card => card.trim())
          .map(card => {
            const parts = card.split('\n');
            const question = parts[0].replace('Q: ', '');
            const answer = parts[1]?.replace('A: ', '') || '';
            return { question, answer };
          });
        
        return (
          <div className="space-y-4">
            {cards.map((card, index) => (
              <Card key={index} className="p-4">
                <div className="font-medium mb-2">Question:</div>
                <p className="mb-4">{card.question}</p>
                <div className="font-medium mb-2">Answer:</div>
                <p>{card.answer}</p>
              </Card>
            ))}
          </div>
        );
      
      case 'quiz':
        // Parse quiz questions from JSON
        try {
          const questions = JSON.parse(material.content);
          return (
            <div className="space-y-6">
              {questions.map((q: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="font-medium mb-3">Question {index + 1}:</div>
                  <p className="mb-4">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option: string, i: number) => (
                      <div 
                        key={i} 
                        className={`p-3 border rounded-md ${i === q.correctAnswer ? 'bg-green-100 border-green-300 dark:bg-green-900/20 dark:border-green-800' : ''}`}
                      >
                        {option}
                        {i === q.correctAnswer && (
                          <span className="text-green-600 dark:text-green-400 ml-2">(Correct)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          );
        } catch (e) {
          return <p>Error parsing quiz data.</p>;
        }
      
      default:
        return <p>Unknown material type.</p>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="mb-2 -ml-2"
            >
              <Link to={`/courses/${courseId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{material.title}</h1>
            <p className="text-muted-foreground">
              {material.type.charAt(0).toUpperCase() + material.type.slice(1)} • 
              Created on {new Date(material.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleDeleteMaterial}>
              Delete Material
            </Button>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6 mb-8">
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default MaterialDetail;
