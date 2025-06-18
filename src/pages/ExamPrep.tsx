import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { FileText, BookOpen, AlertCircle, Loader2, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Question {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  userAnswer?: string | number;
}

interface Exam {
  title: string;
  description: string;
  questions: Question[];
}

interface Note {
  title: string;
  content: string;
  summary: string;
  keyPoints: string[];
}

interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  incorrectQuestions: Question[];
}

const ExamPrep = () => {
  const [activeTab, setActiveTab] = useState<'exam' | 'notes' | 'quiz'>('exam');
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  // Common state
  const [topic, setTopic] = useState('');
  const [sourceMaterial, setSourceMaterial] = useState('');

  // Exam Generator State
  const [examDifficulty, setExamDifficulty] = useState('medium');
  const [examQuestionCount, setExamQuestionCount] = useState('10');
  const [examQuestionTypes, setExamQuestionTypes] = useState<string[]>(['multiple-choice']);
  const [generatedExam, setGeneratedExam] = useState<Exam | null>(null);
  const [examCurrentQuestion, setExamCurrentQuestion] = useState(0);
  const [examResults, setExamResults] = useState<QuizResult | null>(null);

  // Notes Generator State
  const [notesFormat, setNotesFormat] = useState('outline');
  const [notesFocus, setNotesFocus] = useState('key-concepts');
  const [generatedNotes, setGeneratedNotes] = useState<Note | null>(null);

  // Quiz Generator State
  const [quizQuestionCount, setQuizQuestionCount] = useState('10');
  const [quizQuestionTypes, setQuizQuestionTypes] = useState<string[]>(['multiple-choice']);
  const [generatedQuiz, setGeneratedQuiz] = useState<Question[] | null>(null);
  const [quizCurrentQuestion, setQuizCurrentQuestion] = useState(0);
  const [quizResults, setQuizResults] = useState<QuizResult | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // Gemini AI Setup
  const GEMINI_API_KEY = "AIzaSyBJdDfCa-CMkRRuwdy1Yp7ZnOyAiqglo-8";
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const generateContent = async (type: 'exam' | 'notes' | 'quiz') => {
  if (!topic.trim()) {
    toast({
      title: "Topic required",
      description: "Please enter a topic to continue",
      variant: "destructive",
    });
    return;
  }

  setIsGenerating(true);

  try {
    let prompt = '';
    let count = '10';
    let questionTypes = ['multiple-choice'];

    if (type === 'exam') {
      count = examQuestionCount;
      questionTypes = examQuestionTypes;
      prompt = `Generate a ${examDifficulty} difficulty exam on "${topic}" with:
      - ${count} questions
      - Question types: ${questionTypes.join(', ')}
      ${sourceMaterial ? `- Based on: ${sourceMaterial}` : ''}
      
      Return ONLY valid JSON in this exact format:
      {
        "title": "Exam title",
        "description": "Exam description",
        "questions": [
          {
            "id": 1,
            "question": "Question text",
            "options": ["Option 1", "Option 2"],
            "correctAnswer": 0,
            "explanation": "Explanation",
            "type": "question type"
          }
        ]
      }
      
      Do not include any additional text, explanations, or markdown syntax. Only the JSON object.`;
    } else if (type === 'notes') {
      prompt = `Generate study notes on "${topic}" with:
      - Format: ${notesFormat}
      - Focus: ${notesFocus}
      ${sourceMaterial ? `- Based on: ${sourceMaterial}` : ''}
      
      Return ONLY valid JSON in this exact format:
      {
        "title": "Notes title",
        "content": "Detailed notes content",
        "summary": "Brief summary",
        "keyPoints": ["Key point 1", "Key point 2"]
      }
      
      Do not include any additional text, explanations, or markdown syntax. Only the JSON object.`;
    } else if (type === 'quiz') {
      count = quizQuestionCount;
      questionTypes = quizQuestionTypes;
      prompt = `Generate a quiz on "${topic}" with:
      - ${count} questions
      - Question types: ${questionTypes.join(', ')}
      ${sourceMaterial ? `- Based on: ${sourceMaterial}` : ''}
      
      Return ONLY valid JSON as an array of questions in this exact format:
      [
        {
          "id": 1,
          "question": "Question text",
          "options": ["Option 1", "Option 2"],
          "correctAnswer": 0,
          "explanation": "Explanation",
          "type": "question type"
        }
      ]
      
      Do not include any additional text, explanations, or markdown syntax. Only the JSON array.`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean the response text
    text = text.trim();
    
    // Remove markdown code block syntax if present
    if (text.startsWith('```json')) {
      text = text.substring(7, text.length - 3).trim();
    } else if (text.startsWith('```')) {
      text = text.substring(3, text.length - 3).trim();
    }

    // Try to parse the JSON response
    try {
      const parsedResponse = JSON.parse(text);

      if (type === 'exam') {
        if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
          throw new Error("Invalid exam format - missing questions array");
        }
        setGeneratedExam(parsedResponse);
        setExamCurrentQuestion(0);
        setExamResults(null);
      } else if (type === 'notes') {
        setGeneratedNotes(parsedResponse);
      } else if (type === 'quiz') {
        if (!Array.isArray(parsedResponse)) {
          throw new Error("Quiz response should be an array of questions");
        }
        setGeneratedQuiz(parsedResponse);
        setQuizCurrentQuestion(0);
        setQuizResults(null);
        setQuizStarted(true);
      }

      toast({
        title: "Success",
        description: `Your ${type} has been generated successfully`,
      });
    } catch (parseError) {
      console.error('Failed to parse response:', parseError, 'Response text:', text);
      toast({
        title: "Parsing failed",
        description: `Could not parse the ${type} response. Please try again with a more specific prompt.`,
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error(`${type} generation failed:`, error);
    toast({
      title: "Generation failed",
      description: `Could not generate ${type}. Please try again.`,
      variant: "destructive",
    });
  } finally {
    setIsGenerating(false);
  }
};

  const handleAnswer = (type: 'exam' | 'quiz', answer: string | number) => {
    if (type === 'exam' && generatedExam) {
      const updatedQuestions = [...generatedExam.questions];
      updatedQuestions[examCurrentQuestion].userAnswer = answer;
      setGeneratedExam({ ...generatedExam, questions: updatedQuestions });
    } else if (type === 'quiz' && generatedQuiz) {
      const updatedQuestions = [...generatedQuiz];
      updatedQuestions[quizCurrentQuestion].userAnswer = answer;
      setGeneratedQuiz(updatedQuestions);
    }
  };

  const nextQuestion = (type: 'exam' | 'quiz') => {
    if (type === 'exam' && generatedExam) {
      if (examCurrentQuestion < generatedExam.questions.length - 1) {
        setExamCurrentQuestion(examCurrentQuestion + 1);
      }
    } else if (type === 'quiz' && generatedQuiz) {
      if (quizCurrentQuestion < generatedQuiz.length - 1) {
        setQuizCurrentQuestion(quizCurrentQuestion + 1);
      }
    }
  };

  const prevQuestion = (type: 'exam' | 'quiz') => {
    if (type === 'exam' && examCurrentQuestion > 0) {
      setExamCurrentQuestion(examCurrentQuestion - 1);
    } else if (type === 'quiz' && quizCurrentQuestion > 0) {
      setQuizCurrentQuestion(quizCurrentQuestion - 1);
    }
  };

  const submitExam = () => {
    if (!generatedExam) return;

    const correct = generatedExam.questions.filter(
      q => q.userAnswer !== undefined && q.userAnswer === q.correctAnswer
    ).length;

    const result = {
      score: correct,
      total: generatedExam.questions.length,
      percentage: Math.round((correct / generatedExam.questions.length) * 100),
      incorrectQuestions: generatedExam.questions.filter(
        q => q.userAnswer === undefined || q.userAnswer !== q.correctAnswer
      ),
    };

    setExamResults(result);
  };

  const submitQuiz = () => {
    if (!generatedQuiz) return;

    const correct = generatedQuiz.filter(
      q => q.userAnswer !== undefined && q.userAnswer === q.correctAnswer
    ).length;

    const result = {
      score: correct,
      total: generatedQuiz.length,
      percentage: Math.round((correct / generatedQuiz.length) * 100),
      incorrectQuestions: generatedQuiz.filter(
        q => q.userAnswer === undefined || q.userAnswer !== q.correctAnswer
      ),
    };

    setQuizResults(result);
    setQuizStarted(false);
  };

  const restartQuiz = () => {
    if (generatedQuiz) {
      const resetQuiz = generatedQuiz.map(q => ({ ...q, userAnswer: undefined }));
      setGeneratedQuiz(resetQuiz);
      setQuizCurrentQuestion(0);
      setQuizResults(null);
      setQuizStarted(true);
    }
  };

  const downloadNotes = () => {
    if (!generatedNotes) return;
    
    const content = `
${generatedNotes.title}

${generatedNotes.content}

Summary:
${generatedNotes.summary}

Key Points:
${generatedNotes.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedNotes.title.replace(/\s+/g, '_')}_Notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI-Powered Exam Prep</h1>
          <p className="text-muted-foreground">
            Generate personalized study materials to help you prepare for exams
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'exam' | 'notes' | 'quiz')}>
          <TabsList className="grid w-full max-w-xl grid-cols-3">
            <TabsTrigger value="exam">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Exam Generator</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="notes">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Notes Generator</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="quiz">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>Quiz Generator</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="exam">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  {!generatedExam || examResults ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>AI Exam Generator</CardTitle>
                        <CardDescription>
                          Create comprehensive exams with various question types
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Exam Topic*</label>
                          <Input
                            placeholder="e.g., React Fundamentals, Biology Cells"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Source Material (Optional)
                          </label>
                          <Textarea
                            placeholder="Paste textbook content, lecture notes, etc."
                            value={sourceMaterial}
                            onChange={(e) => setSourceMaterial(e.target.value)}
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Difficulty</label>
                            <Select
                              value={examDifficulty}
                              onValueChange={setExamDifficulty}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Question Count</label>
                            <Select
                              value={examQuestionCount}
                              onValueChange={setExamQuestionCount}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select count" />
                              </SelectTrigger>
                              <SelectContent>
                                {[5, 10, 15, 20].map(num => (
                                  <SelectItem key={num} value={String(num)}>
                                    {num} Questions
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Question Types</label>
                          <Select
                            value={examQuestionTypes.join(',')}
                            onValueChange={(v) => setExamQuestionTypes(v.split(','))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                              <SelectItem value="multiple-choice,true-false">Mixed Types</SelectItem>
                              <SelectItem value="multiple-choice,true-false,short-answer">All Types</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          className="w-full"
                          onClick={() => generateContent('exam')}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating Exam...
                            </>
                          ) : (
                            "Generate Exam"
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle>{generatedExam.title}</CardTitle>
                        <CardDescription>{generatedExam.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Question {examCurrentQuestion + 1} of {generatedExam.questions.length}
                          </h3>
                          <p>{generatedExam.questions[examCurrentQuestion].question}</p>

                          {generatedExam.questions[examCurrentQuestion].options && (
                            <div className="space-y-3">
                              {generatedExam.questions[examCurrentQuestion].options?.map(
                                (option, i) => (
                                  <Button
                                    key={i}
                                    variant={
                                      generatedExam.questions[examCurrentQuestion].userAnswer === i
                                        ? "default"
                                        : "outline"
                                    }
                                    className="w-full justify-start text-left"
                                    onClick={() => handleAnswer('exam', i)}
                                  >
                                    <span className="mr-2 font-medium">
                                      {String.fromCharCode(65 + i)}.
                                    </span>
                                    {option}
                                  </Button>
                                )
                              )}
                            </div>
                          )}

                          <div className="flex justify-between">
                            <Button
                              variant="outline"
                              onClick={() => prevQuestion('exam')}
                              disabled={examCurrentQuestion === 0}
                            >
                              <ChevronLeft className="h-4 w-4 mr-2" />
                              Previous
                            </Button>
                            {examCurrentQuestion < generatedExam.questions.length - 1 ? (
                              <Button onClick={() => nextQuestion('exam')}>
                                Next
                                <ChevronRight className="h-4 w-4 ml-2" />
                              </Button>
                            ) : (
                              <Button onClick={submitExam}>Submit Exam</Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {examResults && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Exam Results</CardTitle>
                        <CardDescription>
                          You scored {examResults.score} out of {examResults.total}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold mb-2">
                            {examResults.percentage >= 80
                              ? "Excellent Work!"
                              : examResults.percentage >= 60
                              ? "Good Job!"
                              : "Keep Practicing!"}
                          </h2>
                          <p className="text-lg">
                            Score: {examResults.score}/{examResults.total} ({examResults.percentage}%)
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold">Incorrect Answers</h3>
                          {examResults.incorrectQuestions.map((q) => (
                            <div key={q.id} className="border rounded-lg p-4 space-y-3">
                              <h4 className="font-medium">{q.question}</h4>
                              
                              {q.options && (
                                <div className="space-y-2 pl-4">
                                  {q.options.map((opt, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <div
                                        className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                          i === q.correctAnswer
                                            ? "bg-green-100 border-green-500"
                                            : q.userAnswer === i
                                            ? "bg-red-100 border-red-500"
                                            : "border-gray-300"
                                        }`}
                                      >
                                        {i === q.correctAnswer ? (
                                          <Check className="h-3 w-3 text-green-500" />
                                        ) : q.userAnswer === i ? (
                                          <X className="h-3 w-3 text-red-500" />
                                        ) : null}
                                      </div>
                                      <span>{opt}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <div className="bg-muted p-3 rounded text-sm">
                                <p className="font-medium">Explanation:</p>
                                <p>{q.explanation}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-center">
                          <Button
                            onClick={() => {
                              setGeneratedExam(null);
                              setExamResults(null);
                            }}
                          >
                            Create New Exam
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Exam Generator Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Use Source Material</h3>
                        <p className="text-sm text-muted-foreground">
                          Paste your study materials for more relevant exam questions.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Vary Question Types</h3>
                        <p className="text-sm text-muted-foreground">
                          Mix different question types to test different knowledge levels.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Review Mistakes</h3>
                        <p className="text-sm text-muted-foreground">
                          Carefully review incorrect answers to identify weak areas.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Notes Generator</CardTitle>
                      <CardDescription>
                        Create comprehensive study notes from your learning materials
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Topic*</label>
                        <Input
                          placeholder="e.g., React Hooks, Cellular Biology"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Source Material (Optional)
                        </label>
                        <Textarea
                          placeholder="Paste lecture slides, textbook excerpts, etc."
                          value={sourceMaterial}
                          onChange={(e) => setSourceMaterial(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Notes Format</label>
                          <Select
                            value={notesFormat}
                            onValueChange={setNotesFormat}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="outline">Outline</SelectItem>
                              <SelectItem value="cornell">Cornell Notes</SelectItem>
                              <SelectItem value="mindmap">Mind Map</SelectItem>
                              <SelectItem value="bullet">Bullet Points</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Focus</label>
                          <Select
                            value={notesFocus}
                            onValueChange={setNotesFocus}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select focus" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="key-concepts">Key Concepts</SelectItem>
                              <SelectItem value="detailed">Detailed</SelectItem>
                              <SelectItem value="exam-prep">Exam Preparation</SelectItem>
                              <SelectItem value="quick-review">Quick Review</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => generateContent('notes')}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating Notes...
                          </>
                        ) : (
                          "Generate Notes"
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {generatedNotes && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>{generatedNotes.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">
                          {generatedNotes.content}
                        </div>

                        <div className="bg-blue-50 p-4 rounded-md">
                          <h3 className="font-semibold mb-2">Summary</h3>
                          <p>{generatedNotes.summary}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Key Points</h3>
                          <ul className="space-y-2">
                            {generatedNotes.keyPoints.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-blue-500">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-end">
                          <Button onClick={downloadNotes}>
                            Download Notes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes Generator Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Use Source Material</h3>
                        <p className="text-sm text-muted-foreground">
                          For more accurate notes, paste your study materials.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Choose Appropriate Format</h3>
                        <p className="text-sm text-muted-foreground">
                          Different formats work better for different subjects.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Focus on Key Concepts</h3>
                        <p className="text-sm text-muted-foreground">
                          Identify and highlight the most important information.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="quiz">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  {!generatedQuiz || quizResults ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>AI Quiz Generator</CardTitle>
                        <CardDescription>
                          Create interactive quizzes to test your knowledge
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Quiz Topic*</label>
                          <Input
                            placeholder="e.g., JavaScript Basics, Organic Chemistry"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Source Material (Optional)
                          </label>
                          <Textarea
                            placeholder="Paste content from which the quiz should be generated"
                            value={sourceMaterial}
                            onChange={(e) => setSourceMaterial(e.target.value)}
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Question Count</label>
                            <Select
                              value={quizQuestionCount}
                              onValueChange={setQuizQuestionCount}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select count" />
                              </SelectTrigger>
                              <SelectContent>
                                {[5, 10, 15, 20].map(num => (
                                  <SelectItem key={num} value={String(num)}>
                                    {num} Questions
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Question Types</label>
                            <Select
                              value={quizQuestionTypes.join(',')}
                              onValueChange={(v) => setQuizQuestionTypes(v.split(','))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select types" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                <SelectItem value="multiple-choice,true-false">Mixed Types</SelectItem>
                                <SelectItem value="multiple-choice,true-false,short-answer">All Types</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          onClick={() => generateContent('quiz')}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating Quiz...
                            </>
                          ) : (
                            "Generate Quiz"
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle>Knowledge Check</CardTitle>
                        <CardDescription>
                          Test your knowledge of {topic}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Question {quizCurrentQuestion + 1} of {generatedQuiz.length}
                          </h3>
                          <p>{generatedQuiz[quizCurrentQuestion].question}</p>

                          {generatedQuiz[quizCurrentQuestion].options && (
                            <div className="space-y-3">
                              {generatedQuiz[quizCurrentQuestion].options?.map(
                                (option, i) => (
                                  <Button
                                    key={i}
                                    variant={
                                      generatedQuiz[quizCurrentQuestion].userAnswer === i
                                        ? "default"
                                        : "outline"
                                    }
                                    className="w-full justify-start text-left"
                                    onClick={() => handleAnswer('quiz', i)}
                                  >
                                    <span className="mr-2 font-medium">
                                      {String.fromCharCode(65 + i)}.
                                    </span>
                                    {option}
                                  </Button>
                                )
                              )}
                            </div>
                          )}

                          <div className="flex justify-between">
                            <Button
                              variant="outline"
                              onClick={() => prevQuestion('quiz')}
                              disabled={quizCurrentQuestion === 0}
                            >
                              <ChevronLeft className="h-4 w-4 mr-2" />
                              Previous
                            </Button>
                            {quizCurrentQuestion < generatedQuiz.length - 1 ? (
                              <Button onClick={() => nextQuestion('quiz')}>
                                Next
                                <ChevronRight className="h-4 w-4 ml-2" />
                              </Button>
                            ) : (
                              <Button onClick={submitQuiz}>Submit Quiz</Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {quizResults && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Quiz Results</CardTitle>
                        <CardDescription>
                          You scored {quizResults.score} out of {quizResults.total}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold mb-2">
                            {quizResults.percentage >= 80
                              ? "Excellent Work!"
                              : quizResults.percentage >= 60
                              ? "Good Job!"
                              : "Keep Practicing!"}
                          </h2>
                          <p className="text-lg">
                            Score: {quizResults.score}/{quizResults.total} ({quizResults.percentage}%)
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold">Incorrect Answers</h3>
                          {quizResults.incorrectQuestions.map((q) => (
                            <div key={q.id} className="border rounded-lg p-4 space-y-3">
                              <h4 className="font-medium">{q.question}</h4>
                              
                              {q.options && (
                                <div className="space-y-2 pl-4">
                                  {q.options.map((opt, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <div
                                        className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                          i === q.correctAnswer
                                            ? "bg-green-100 border-green-500"
                                            : q.userAnswer === i
                                            ? "bg-red-100 border-red-500"
                                            : "border-gray-300"
                                        }`}
                                      >
                                        {i === q.correctAnswer ? (
                                          <Check className="h-3 w-3 text-green-500" />
                                        ) : q.userAnswer === i ? (
                                          <X className="h-3 w-3 text-red-500" />
                                        ) : null}
                                      </div>
                                      <span>{opt}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="bg-muted p-3 rounded text-sm">
                                <p className="font-medium">Explanation:</p>
                                <p>{q.explanation}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-center gap-4">
                          <Button onClick={restartQuiz}>Retake Quiz</Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setGeneratedQuiz(null);
                              setQuizResults(null);
                            }}
                          >
                            New Quiz
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quiz Generator Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Test Frequently</h3>
                        <p className="text-sm text-muted-foreground">
                          Regular quizzing is one of the most effective study techniques.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Focus on Weak Areas</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate quizzes specifically for topics you're struggling with.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Use Source Material</h3>
                        <p className="text-sm text-muted-foreground">
                          Paste your study notes to create relevant practice questions.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Review Missed Questions</h3>
                        <p className="text-sm text-muted-foreground">
                          Pay special attention to questions you answered incorrectly.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ExamPrep;