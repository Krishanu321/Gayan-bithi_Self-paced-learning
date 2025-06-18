import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, Target, BarChart3, Users, Zap, ArrowRight, Play, Star, Award, TrendingUp, GraduationCap, MessageSquare, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Generate personalized courses and study materials using advanced AI technology",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Target,
      title: "Exam Preparation",
      description: "Practice with AI-generated questions tailored to your learning objectives",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Users,
      title: "Interview Prep",
      description: "Prepare for job interviews with realistic scenarios and expert feedback",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Track your learning journey with detailed insights and performance metrics",
      color: "from-orange-500 to-red-600"
    }
  ];

  const testimonials = [
    {
      name: "Dip Adak",
      role: "Computer Science Student",
      content: "জ্ঞানবীথির AI কোর্স জেনারেশন আমার পড়াশোনাকে অনেক সহজ করে দিয়েছে।",
      rating: 5
    },
    {
      name: "Soumita Das",
      role: "Job Seeker",
      content: "Interview preparation এর জন্য এই প্ল্যাটফর্মটি অসাধারণ। খুবই কার্যকর!",
      rating: 5
    },
    {
      name: "Sourav Mandal",
      role: "Professional Developer",
      content: "Personalized learning experience এবং detailed analytics খুবই ভালো লেগেছে।",
      rating: 4
    }
  ];

  const stats = [
    { label: "AI Courses", value: "1K+", icon: BookOpen },
    { label: "Students", value: "100+", icon: Users },
    { label: "Success Rate", value: "93%", icon: Award },
    { label: "Countries", value: "2+", icon: TrendingUp }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section with Enhanced Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.7)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`
              }}
            />
            {/* Floating Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
              <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
              <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
            </div>
          </div>

          {/* Enhanced Content */}
          <div className="relative z-10 text-center px-4 py-20 animate-fade-in">
            <div className="max-w-5xl mx-auto">
              {/* Logo with Animation */}
              <div className="flex items-center justify-center gap-4 mb-8 animate-scale-in">
                
                <div>
                  <h1 className="text-7xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
                    জ্ঞানবীথি
                  </h1>
                  <p className="text-2xl text-white/90 font-medium"> AI-Powered Learning Platform </p>
                </div>
              </div>

              {/* Hero Text with Gradient Animation */}
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Transform Your Learning
                <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  With AI Intelligence
                </span>
              </h2>
              
              <p className="text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                Experience personalized education with AI-generated courses, intelligent exam preparation, 
                and comprehensive analytics to accelerate your learning journey.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button
                  onClick={() => navigate("/auth/register")}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-black font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-yellow-500/25"
                >
                  Start Learning Free
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  size="lg"
                  className="border-3 border-white/40 text-white hover:bg-white/20 backdrop-blur-md px-12 py-6 text-xl rounded-full font-semibold hover:scale-105 transition-all duration-300"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Watch Demo
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center transform hover:scale-110 transition-all duration-300">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl">
                      <stat.icon className="h-8 w-8 text-white/80 mx-auto mb-3" />
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-white/80 text-sm font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-3 border-white/60 rounded-full flex justify-center hover:border-white transition-colors">
              <div className="w-2 h-4 bg-white/80 rounded-full mt-3 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <div className="flex items-center justify-center mb-6 bg-brand-purple/10 backdrop-blur-sm p-2 rounded-full border border-brand-purple/20 w-fit mx-auto">
                <Sparkles className="h-5 w-5 text-brand-purple mr-2" />
                <span className="text-sm font-medium">AI-Powered Learning Assistant</span>
              </div>
              
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Powerful Features for Modern Learning
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                Discover how our AI-powered platform revolutionizes education with cutting-edge technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 group">
                  <CardHeader>
                    <div className={`mx-auto bg-gradient-to-r ${feature.color} rounded-full p-6 w-20 h-20 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-4 group-hover:text-purple-700 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg text-gray-600 group-hover:text-gray-700">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced How it Works */}
        <section className="py-24 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                How জ্ঞানবীথি Works
              </h2>
              <p className="text-2xl text-gray-700">
                Simple steps to accelerate your learning journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  step: "01",
                  title: "Choose Your Topic",
                  description: "Select from various subjects or input your custom learning topic",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: "02", 
                  title: "AI Generates Content",
                  description: "Our AI creates personalized courses, exams, and study materials",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: "03",
                  title: "Learn and Progress",
                  description: "Study at your pace and track your progress with detailed analytics",
                  color: "from-green-500 to-emerald-500"
                }
              ].map((step, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className={`bg-gradient-to-r ${step.color} text-white text-3xl font-bold rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-6 group-hover:text-purple-700 transition-colors">{step.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials */}
        <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                What Our Students Say
              </h2>
              <p className="text-2xl text-gray-600">
                Join thousands of successful learners
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm hover:scale-105 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{testimonial.name}</div>
                        <div className="text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <div className="max-w-5xl mx-auto text-center px-4">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-2xl text-white/95 mb-12 leading-relaxed">
              Join জ্ঞানবীথি today and experience the future of personalized education
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => navigate("/auth/register")}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-12 py-6 text-xl rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
              >
                Get Started Free
                <Zap className="ml-3 h-6 w-6" />
              </Button>
              
              <Button
                onClick={() => navigate("/auth/login")}
                variant="outline"
                size="lg"
                className="border-3 border-white text-white hover:bg-white/20 px-12 py-6 text-xl rounded-full font-semibold hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;