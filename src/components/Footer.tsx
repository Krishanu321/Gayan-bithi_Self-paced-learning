import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Github, Twitter, Instagram, Linkedin, Mail, FileText, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Krishanu321',
      icon: <Github className="h-5 w-5" />,
      color: 'hover:bg-gray-800 hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/003-lks/',
      icon: <Linkedin className="h-5 w-5" />,
      color: 'hover:bg-blue-600 hover:text-white'
    }
  ];

  return (
    <footer className="border-t py-12 mt-auto bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
          </p>
          
          {/* Social Media Links */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3 text-foreground">Connect With Us</h4>
            <div className="flex space-x-2">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full text-muted-foreground bg-muted ${link.color} transition-all duration-300`}
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Portfolio Section - Highlighted */}
        <div>
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-400/20 shadow-lg">
            <h4 className="text-sm font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              My Portfolio
            </h4>
            <a 
              href="https://krishanuportfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-md hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 border border-blue-400/30"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-foreground">Explore My Work</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <div className="mt-3">
              <a 
                href="mailto:youremail@example.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted/50 rounded"
              >
                <Mail className="h-4 w-4" />
                krisho.ca@gmail.com
              </a>
            </div>
          </div>
        </div>
        
        {/* Support Links */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-brand-purple">Support</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/help" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">Help Center</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">Contact Us</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-muted/30">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} জ্ঞানবীথি. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-1 text-xs text-muted-foreground">
            <span className="animate-pulse">❤️</span>
            <span>Made by Group 9</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;