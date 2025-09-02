import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Play, RotateCcw, BookOpen, Clock } from 'lucide-react';
import { useState } from 'react';

const MockInterviewTab = ({ uploadedData }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const [showQuestions, setShowQuestions] = useState(false);

  const interviewCategories = [
    { 
      id: 'technical', 
      name: 'Technical Questions', 
      description: 'Based on your skills and projects',
      count: 12,
      difficulty: 'Mixed'
    },
    { 
      id: 'behavioral', 
      name: 'Behavioral Questions', 
      description: 'Soft skills and experience-based',
      count: 8,
      difficulty: 'Medium'
    },
    { 
      id: 'company', 
      name: 'Company-Specific', 
      description: 'Role and industry focused',
      count: 6,
      difficulty: 'High'
    }
  ];

  const mockQuestions = {
    technical: [
      {
        question: "Explain the concept of React hooks and how you've used useState and useEffect in your projects.",
        difficulty: 'Medium',
        category: 'React',
        hint: 'Mention your GitHub projects that use hooks',
        expectedAnswer: 'Discuss functional components, state management, and lifecycle methods'
      },
      {
        question: "How would you optimize the performance of a React application?",
        difficulty: 'Hard',
        category: 'Performance',
        hint: 'Think about code splitting, memoization, and bundling',
        expectedAnswer: 'Cover React.memo, useMemo, lazy loading, and bundle analysis'
      },
      {
        question: "Describe your experience with RESTful APIs and how you handle error responses.",
        difficulty: 'Medium',
        category: 'API Integration',
        hint: 'Reference your backend projects',
        expectedAnswer: 'Discuss HTTP methods, status codes, and error handling strategies'
      }
    ],
    behavioral: [
      {
        question: "Tell me about a challenging project you worked on and how you overcame obstacles.",
        difficulty: 'Medium',
        category: 'Problem Solving',
        hint: 'Use your GitHub projects as examples',
        expectedAnswer: 'Use STAR method - Situation, Task, Action, Result'
      },
      {
        question: "How do you stay updated with the latest technology trends?",
        difficulty: 'Easy',
        category: 'Learning',
        hint: 'Mention your continuous learning approach',
        expectedAnswer: 'Discuss blogs, documentation, courses, and hands-on practice'
      }
    ],
    company: [
      {
        question: "Why are you interested in a frontend developer position at our company?",
        difficulty: 'Medium',
        category: 'Motivation',
        hint: 'Connect your skills with company needs',
        expectedAnswer: 'Show research about the company and align with career goals'
      }
    ]
  };

  const generateQuestions = () => {
    setShowQuestions(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'hard': return 'bg-destructive/10 text-destructive';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageCircle className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-xl font-semibold">Mock Interview Generator</h3>
          <p className="text-text-secondary">Personalized questions based on your resume and GitHub</p>
        </div>
      </div>

      {/* Interview Categories */}
      <div className="grid md:grid-cols-3 gap-4">
        {interviewCategories.map((category) => (
          <Card 
            key={category.id}
            className={`card-hover cursor-pointer transition-all ${
              selectedCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{category.name}</CardTitle>
              <p className="text-sm text-text-secondary">{category.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {category.count} questions
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${getDifficultyColor(category.difficulty)}`}>
                    {category.difficulty}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generate Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Session</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">
                {interviewCategories.find(cat => cat.id === selectedCategory)?.name}
              </h4>
              <p className="text-sm text-text-secondary">
                Personalized questions from your profile analysis
              </p>
            </div>
            <Button onClick={generateQuestions} className="btn-scale">
              <Play className="w-4 h-4 mr-2" />
              Start Interview
            </Button>
          </div>

          {showQuestions && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <Badge variant="default">
                  {mockQuestions[selectedCategory as keyof typeof mockQuestions]?.length} Questions Generated
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => setShowQuestions(false)}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>

              <Separator />

              <div className="space-y-6">
                {mockQuestions[selectedCategory as keyof typeof mockQuestions]?.map((q, index) => (
                  <Card key={index} className="bg-neutral-light/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base mb-2">Question {index + 1}</CardTitle>
                          <p className="text-text-primary">{q.question}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Badge variant="outline" className={getDifficultyColor(q.difficulty)}>
                            {q.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {q.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <h5 className="text-sm font-medium mb-1 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            Hint
                          </h5>
                          <p className="text-xs text-text-secondary">{q.hint}</p>
                        </div>
                        
                        <div className="p-3 bg-success/5 rounded-lg">
                          <h5 className="text-sm font-medium mb-1">Key Points to Cover</h5>
                          <p className="text-xs text-text-secondary">{q.expectedAnswer}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="btn-scale">
                            <Clock className="w-3 h-3 mr-1" />
                            Practice (2 min)
                          </Button>
                          <Button variant="ghost" size="sm">
                            Skip Question
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interview Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">Technical Questions</h5>
              <ul className="space-y-1 text-text-secondary">
                <li>• Explain your thought process clearly</li>
                <li>• Reference specific projects from your GitHub</li>
                <li>• Discuss trade-offs and alternatives</li>
                <li>• Ask clarifying questions when needed</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Behavioral Questions</h5>
              <ul className="space-y-1 text-text-secondary">
                <li>• Use the STAR method</li>
                <li>• Provide concrete examples</li>
                <li>• Show learning and growth</li>
                <li>• Be honest about challenges</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockInterviewTab;