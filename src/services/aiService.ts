
// This is a mock service that would connect to an AI API
// In a real implementation, this would make API calls to OpenAI or another AI provider

export interface GeneratedContent {
  id: string;
  title: string;
  content: string;
  type: 'outline' | 'notes' | 'flashcards' | 'quiz';
  createdAt: Date;
}

// Mock function to simulate AI generation delay
const mockGenerateDelay = () => new Promise((resolve) => setTimeout(resolve, 1500));

// Generate course outline
export const generateCourseOutline = async (topic: string): Promise<GeneratedContent> => {
  await mockGenerateDelay();
  
  return {
    id: `outline-${Date.now()}`,
    title: `${topic} - Course Outline`,
    content: `
# ${topic} - Complete Course Outline

## 1. Introduction to ${topic}
- Overview and significance
- Historical context
- Modern applications

## 2. Fundamental Concepts
- Key terminology
- Core principles
- Theoretical frameworks

## 3. Advanced Topics
- Specialized techniques
- Current research areas
- Practical implementations

## 4. Case Studies
- Real-world examples
- Analysis methodology
- Result interpretation

## 5. Future Directions
- Emerging trends
- Potential challenges
- Opportunities for innovation
    `,
    type: 'outline',
    createdAt: new Date()
  };
};

// Generate detailed notes
export const generateNotes = async (topic: string, section: string): Promise<GeneratedContent> => {
  await mockGenerateDelay();
  
  return {
    id: `notes-${Date.now()}`,
    title: `${topic}: ${section} - Detailed Notes`,
    content: `
# ${section} - Comprehensive Notes

## Key Concepts
- First important concept: This explains the fundamental principles and provides a foundation for understanding.
- Second important concept: This builds on the first concept and introduces more complex ideas.
- Third important concept: This connects previous concepts and shows their practical applications.

## Important Formulas/Definitions
- Definition 1: A precise explanation with examples
- Definition 2: Another critical definition with context
- Formula 1: The mathematical representation with variables explained
- Formula 2: Another important equation with its applications

## Examples
1. Example situation demonstrating concept application
2. Step-by-step walkthrough of problem-solving
3. Real-world scenario illustrating practical usage

## Common Misconceptions
- Misconception 1: Why it's wrong and the correct understanding
- Misconception 2: Common error and its correction

## Remember
- Important point to remember for exams
- Critical insight that ties concepts together
- Practical tip for application
    `,
    type: 'notes',
    createdAt: new Date()
  };
};

// Generate flashcards
export const generateFlashcards = async (topic: string): Promise<GeneratedContent> => {
  await mockGenerateDelay();
  
  const flashcards = [
    { question: `What is the main purpose of ${topic}?`, answer: `The main purpose is to provide a systematic approach to understanding and solving problems in this domain.` },
    { question: `Name three key principles of ${topic}.`, answer: `1. Systematic analysis 2. Evidence-based reasoning 3. Practical application` },
    { question: `When was ${topic} first introduced?`, answer: `The concept was first formally introduced in the late 20th century, though its roots go back much further.` },
    { question: `What distinguishes ${topic} from related fields?`, answer: `Its unique integration of theoretical frameworks with practical methodologies sets it apart from related disciplines.` },
    { question: `How is ${topic} applied in modern contexts?`, answer: `It's widely applied in technology, education, business strategy, and problem-solving across various industries.` },
  ];
  
  const content = flashcards.map(card => 
    `Q: ${card.question}\nA: ${card.answer}\n\n`
  ).join('');
  
  return {
    id: `flashcards-${Date.now()}`,
    title: `${topic} - Flashcards`,
    content,
    type: 'flashcards',
    createdAt: new Date()
  };
};

// Generate quiz questions
export const generateQuiz = async (topic: string): Promise<GeneratedContent> => {
  await mockGenerateDelay();
  
  const quizQuestions = [
    {
      question: `Which of the following best describes ${topic}?`,
      options: [
        'A systematic approach to problem-solving',
        'A theoretical framework only',
        'A historical concept with no modern relevance',
        'A specialized technique for limited applications'
      ],
      correctAnswer: 0
    },
    {
      question: `What is NOT considered a core principle of ${topic}?`,
      options: [
        'Evidence-based reasoning',
        'Intuitive decision-making without data',
        'Systematic analysis',
        'Practical application'
      ],
      correctAnswer: 1
    },
    {
      question: `Which industry has seen the LEAST application of ${topic}?`,
      options: [
        'Healthcare',
        'Education',
        'Ancient history',
        'Technology'
      ],
      correctAnswer: 2
    },
    {
      question: `How does ${topic} contribute to innovation?`,
      options: [
        'By restricting creative thinking',
        'By providing frameworks for systematic exploration',
        'By eliminating the need for human input',
        'By focusing exclusively on theoretical aspects'
      ],
      correctAnswer: 1
    },
    {
      question: `What is the relationship between ${topic} and data analysis?`,
      options: [
        'They are completely unrelated',
        'They are identical concepts',
        '${topic} incorporates data analysis as one of its tools',
        'Data analysis has replaced ${topic} entirely'
      ],
      correctAnswer: 2
    }
  ];
  
  const content = JSON.stringify(quizQuestions);
  
  return {
    id: `quiz-${Date.now()}`,
    title: `${topic} - Quiz`,
    content,
    type: 'quiz',
    createdAt: new Date()
  };
};
