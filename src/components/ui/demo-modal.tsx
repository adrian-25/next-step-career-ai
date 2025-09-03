import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, TrendingUp, FileText, Github, Linkedin, Target, Zap, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Upload & Connect",
      description: "Connect your professional profiles",
      component: <UploadDemo />
    },
    {
      title: "AI Analysis",
      description: "Our AI analyzes your data",
      component: <AnalysisDemo />
    },
    {
      title: "Your Results",
      description: "Get actionable insights",
      component: <ResultsDemo />
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">NextStep Demo</DialogTitle>
                <p className="text-text-secondary mt-1">See how NextStep analyzes your career profile</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {demoSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${index <= currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-neutral-light text-text-secondary'
                    }
                  `}>
                    {index < currentStep ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < demoSteps.length - 1 && (
                    <div className={`
                      w-12 h-0.5 mx-2
                      ${index < currentStep ? 'bg-primary' : 'bg-neutral-light'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {demoSteps[currentStep].title}
                  </h3>
                  <p className="text-text-secondary">
                    {demoSteps[currentStep].description}
                  </p>
                </div>
                
                {demoSteps[currentStep].component}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentStep === demoSteps.length - 1 ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetDemo}>
                    Restart Demo
                  </Button>
                  <Button onClick={onClose} className="bg-primary hover:bg-primary-hover">
                    Get Started
                  </Button>
                </div>
              ) : (
                <Button onClick={nextStep} className="bg-primary hover:bg-primary-hover">
                  Next Step
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Demo Components
const UploadDemo = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { icon: FileText, title: 'Resume Upload', status: 'uploaded', color: 'text-primary' },
        { icon: Linkedin, title: 'LinkedIn Profile', status: 'connected', color: 'text-blue-600' },
        { icon: Github, title: 'GitHub Profile', status: 'connected', color: 'text-gray-700' }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card className="text-center p-4">
            <div className={`w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3`}>
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <h4 className="font-medium text-text-primary mb-1">{item.title}</h4>
            <Badge variant="default" className="bg-success/10 text-success">
              {item.status}
            </Badge>
          </Card>
        </motion.div>
      ))}
    </div>
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full"
      >
        <Zap className="w-4 h-4" />
        Ready for analysis!
      </motion.div>
    </div>
  </div>
);

const AnalysisDemo = () => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
      />
      <p className="text-text-secondary">Analyzing your professional profile...</p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-4">
      {[
        { label: 'Resume Parsing', progress: 100 },
        { label: 'ATS Compatibility', progress: 85 },
        { label: 'Skill Extraction', progress: 92 },
        { label: 'Job Matching', progress: 78 }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.3 }}
          className="space-y-2"
        >
          <div className="flex justify-between text-sm">
            <span className="text-text-primary">{item.label}</span>
            <span className="text-text-secondary">{item.progress}%</span>
          </div>
          <Progress value={item.progress} className="h-2" />
        </motion.div>
      ))}
    </div>
  </div>
);

const ResultsDemo = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      {/* Overall Score */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Overall Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">87%</div>
          <p className="text-text-secondary text-sm">Excellent career readiness</p>
          <div className="flex justify-center mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-warning fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { text: 'Strong technical skills', color: 'text-success' },
              { text: 'Great project portfolio', color: 'text-success' },
              { text: 'Resume needs ATS optimization', color: 'text-warning' },
              { text: 'Add more leadership experience', color: 'text-warning' }
            ].map((insight, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${insight.color.replace('text-', 'bg-')}`} />
                <span className={`text-sm ${insight.color}`}>{insight.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 bg-success/10 text-success px-6 py-3 rounded-full"
      >
        <CheckCircle2 className="w-5 h-5" />
        Analysis Complete! Ready to boost your career?
      </motion.div>
    </div>
  </div>
);

export default DemoModal;