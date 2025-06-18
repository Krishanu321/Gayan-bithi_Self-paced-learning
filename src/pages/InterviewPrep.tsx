
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Camera, Mic, MicOff, Video, VideoOff, Send, Loader2, Play, Pause, Target, CheckCircle, Home, ChevronDown } from 'lucide-react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const InterviewPrep = () => {
  // State
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [interviewStage, setInterviewStage] = useState<'initial' | 'setup' | 'interview' | 'feedback'>('initial');
  const [jobTitle, setJobTitle] = useState('');
  const [techStack, setTechStack] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [questions, setQuestions] = useState<string[]>([
    "Describe your experience with React.js, highlighting any specific projects or components you've developed.",
    "Explain the differences between Spring Boot and Node.js and why you might choose one over the other for a specific project.",
    "What is your approach to debugging complex issues in a full-stack application?",
    "Describe a challenging project you worked on and how you overcame the obstacles.",
    "How do you stay updated with the latest technologies and frameworks in your field?"
  ]);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<{
    overall: number,
    questionFeedback: {[key: number]: {
      rating: number,
      answer: string,
      correctAnswer: string,
      feedback: string
    }}
  }>({
    overall: 0,
    questionFeedback: {}
  });
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const { toast } = useToast();

  // Handle camera toggle
  const toggleCamera = async () => {
    if (cameraEnabled) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          if (track.kind === 'video') {
            track.stop();
          }
        });
      }
      setCameraEnabled(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        if (streamRef.current) {
          // Add video tracks to existing stream
          stream.getVideoTracks().forEach(track => {
            streamRef.current?.addTrack(track);
          });
        } else {
          streamRef.current = stream;
        }
        
        setCameraEnabled(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Access Denied",
        description: "Please grant camera permissions to use this feature.",
        variant: "destructive",
      });
    }
  };

  // Handle microphone toggle
  const toggleMic = async () => {
    if (micEnabled) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          if (track.kind === 'audio') {
            track.stop();
          }
        });
      }
      setMicEnabled(false);
      return;
    }

    try {
      let stream;
      
      if (streamRef.current) {
        // Add audio track to existing stream
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioTrack = audioStream.getAudioTracks()[0];
        streamRef.current.addTrack(audioTrack);
      } else {
        // Create new stream with audio
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
      }
      
      setMicEnabled(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone Access Denied",
        description: "Please grant microphone permissions to use this feature.",
        variant: "destructive",
      });
    }
  };

  // Job dialog handlers
  const openJobDialog = () => {
    setShowJobDialog(true);
  };

  const closeJobDialog = () => {
    setShowJobDialog(false);
  };

  const startInterview = () => {
    if (!jobTitle) {
      toast({
        title: "Job Title Required",
        description: "Please enter a job title to continue.",
        variant: "destructive",
      });
      return;
    }

    closeJobDialog();
    setInterviewStage('setup');
  };

  const beginInterviewQuestions = () => {
    if (!cameraEnabled && !micEnabled) {
      toast({
        title: "Camera or Microphone Required",
        description: "Please enable either your camera or microphone to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setInterviewStage('interview');
    setCurrentQuestion(1);
  };

  const recordAnswer = () => {
    setIsRecording(true);
    // Simulate recording for 5 seconds
    setTimeout(() => {
      setIsRecording(false);
      
      // Mock recording an answer
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: "you can record the answer whatever you speak"
      }));
      
      if (currentQuestion < questions.length) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        // Generate feedback when all questions are answered
        generateFeedback();
      }
    }, 3000);
  };

  const generateFeedback = () => {
    // Simulate generating feedback
    const mockFeedback = {
      overall: 7,
      questionFeedback: {
        1: {
          rating: 2,
          answer: "you can record the answer whatever you speak",
          correctAnswer: "A good answer would discuss your experience with React components, state management, hooks, and specific projects.",
          feedback: "While you've mentioned React.js, your answer lacks concrete details. Explain specific strengths and weaknesses of React.js, such as its virtual DOM and component-based architecture."
        },
        2: {
          rating: 2,
          answer: "you can record the answer whatever you speak",
          correctAnswer: "Spring Boot is a Java-based framework for building microservices and web applications, while Node.js is a JavaScript runtime environment. Spring Boot excels in enterprise-level applications with strong security and data management features, while Node.js is ideal for real-time applications, API development, and projects requiring high scalability.",
          feedback: "While you've mentioned Spring Boot and Node.js, your answer lacks concrete details. Explain specific strengths and weaknesses of each technology, such as Spring Boot's enterprise features and Node.js's real-time capabilities. Provide an example scenario where you'd choose one over the other based on project requirements."
        }
      }
    };
    
    setFeedback(mockFeedback);
    setInterviewStage('feedback');
  };

  const goHome = () => {
    // Reset everything
    setInterviewStage('initial');
    setJobTitle('');
    setTechStack('');
    setYearsExperience('');
    setCameraEnabled(false);
    setMicEnabled(false);
    setCurrentQuestion(1);
    setAnswers({});
    setFeedback({
      overall: 0,
      questionFeedback: {}
    });
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {interviewStage === 'initial' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">AI Interview Preparation</h1>
              <p className="text-muted-foreground">Practice technical interviews with AI-generated questions and feedback</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
              <p className="mb-4">Create and Start your AI Mock Interviews</p>
              
              <Button 
                onClick={openJobDialog} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                + Add New Interview
              </Button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Previous Mock Interviews</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-lg text-blue-600">Full Stack Frontend Developer</h4>
                    <p className="text-sm text-muted-foreground">3 Years of Experience</p>
                    <p className="text-xs text-muted-foreground mb-4">Created at 06-05-2024</p>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Feedback
                      </Button>
                      <Button size="sm">
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-lg text-blue-600">Full Stack Developer</h4>
                    <p className="text-sm text-muted-foreground">5 Years of Experience</p>
                    <p className="text-xs text-muted-foreground mb-4">Created at 01-05-2024</p>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Feedback
                      </Button>
                      <Button size="sm">
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        
        {interviewStage === 'setup' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Let's Get Started</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="font-semibold">Job Role/Job Position:</p>
                    <p>{jobTitle}</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Job Description/Tech Stack:</p>
                    <p>{techStack || "React, Java, Spring Boot, NodeJS, MySQL"}</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Years of Experience:</p>
                    <p>{yearsExperience || "2"}</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex gap-2 items-start">
                      <div className="bg-amber-100 text-amber-700 rounded-full p-1">
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-amber-800">Information</h3>
                        <p className="text-sm text-amber-700">
                          Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview. It Has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Enable Web Cam and Microphone</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={cameraEnabled ? "default" : "outline"} 
                      onClick={toggleCamera}
                      size="sm"
                    >
                      {cameraEnabled ? <VideoOff className="h-4 w-4 mr-2" /> : <Video className="h-4 w-4 mr-2" />}
                      {cameraEnabled ? "Disable Camera" : "Enable Camera"}
                    </Button>
                    
                    <Button 
                      variant={micEnabled ? "default" : "outline"} 
                      onClick={toggleMic}
                      size="sm"
                    >
                      {micEnabled ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                      {micEnabled ? "Disable Mic" : "Enable Mic"}
                    </Button>
                  </div>
                </div>
                
                {(cameraEnabled || micEnabled) && (
                  <div className="aspect-video bg-black rounded-md overflow-hidden relative">
                    {cameraEnabled ? (
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="border-4 border-white rounded-full p-4">
                          <Target className="h-20 w-20 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button 
                    onClick={beginInterviewQuestions} 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!cameraEnabled && !micEnabled}
                  >
                    Start Interview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {interviewStage === 'interview' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                {questions.map((_, index) => (
                  <Button 
                    key={index}
                    variant={currentQuestion === index + 1 ? "default" : "outline"}
                    className={`rounded-full ${
                      currentQuestion === index + 1 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : ""
                    }`}
                  >
                    Question #{index + 1}
                  </Button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="mb-4">
                    <p className="text-lg">{questions[currentQuestion - 1]}</p>
                  </div>
                  
                  <Button
                    onClick={recordAnswer}
                    disabled={isRecording}
                    variant="outline"
                    className="gap-2"
                  >
                    {isRecording ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Recording...
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4" />
                        Record Answer
                      </>
                    )}
                  </Button>
                  
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                      <div className="flex gap-2 items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full p-1">
                          <Target className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-800">Note:</h3>
                          <p className="text-sm text-blue-700">
                            Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to compare it.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="aspect-video bg-black rounded-md overflow-hidden relative">
                  {cameraEnabled ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      muted 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="border-4 border-white rounded-full p-4">
                        <Target className="h-20 w-20 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {interviewStage === 'feedback' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-green-600">Congratulation!</h1>
              <h2 className="text-xl font-semibold">Here is your interview feedback</h2>
              
              <div className="my-4">
                <p className="text-blue-600 font-medium">Your overall interview rating: {feedback.overall}/10</p>
                <p className="text-sm text-muted-foreground">Find below interview question with correct answer, Your answer and feedback for improvement</p>
              </div>
              
              <div className="space-y-4">
                {Object.entries(feedback.questionFeedback).map(([questionNum, data]) => (
                  <Accordion type="single" collapsible key={questionNum}>
                    <AccordionItem value={`item-${questionNum}`}>
                      <AccordionTrigger className="text-left">
                        {questions[parseInt(questionNum) - 1]}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="bg-red-50 p-3 rounded-md">
                            <p className="text-sm font-semibold">Rating: {data.rating}</p>
                          </div>
                          
                          <div className="bg-pink-50 p-3 rounded-md">
                            <p className="text-sm font-semibold">Your Answer:</p>
                            <p className="text-sm">{data.answer}</p>
                          </div>
                          
                          <div className="bg-green-50 p-3 rounded-md">
                            <p className="text-sm font-semibold">Correct Answer:</p>
                            <p className="text-sm">{data.correctAnswer}</p>
                          </div>
                          
                          <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-sm font-semibold">Feedback:</p>
                            <p className="text-sm">{data.feedback}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={goHome}
                  className="bg-blue-600 hover:bg-blue-700 gap-2"
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Tell us more about your job interviewing</DialogTitle>
            <p className="text-sm text-muted-foreground">Add Details about your job position/role, Job description and years of experience</p>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="text-sm font-medium">
                Job Role/Job Position
              </label>
              <Input
                id="jobTitle"
                placeholder="e.g., Full Stack Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="techStack" className="text-sm font-medium">
                Job Description/ Tech Stack (In Short)
              </label>
              <Textarea
                id="techStack"
                placeholder="e.g., React, Angular, NodeJs, MySQL etc"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="experience" className="text-sm font-medium">
                Years of experience
              </label>
              <Input
                id="experience"
                placeholder="e.g., 5"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeJobDialog}>
              Cancel
            </Button>
            <Button onClick={startInterview} className="bg-blue-600 hover:bg-blue-700">
              Start Interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default InterviewPrep;
