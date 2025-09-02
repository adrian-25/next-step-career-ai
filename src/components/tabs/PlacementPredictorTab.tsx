import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, Brain, Star, ArrowUp } from 'lucide-react';

const PlacementPredictorTab = ({ uploadedData }: any) => {
  const predictions = [
    { 
      role: 'Frontend Developer Internship', 
      probability: 72, 
      company: 'Tech Startups',
      factors: { ats: 87, skills: 78, github: 65, linkedin: 82 },
      recommendations: ['Add 2 more React projects', 'Complete JavaScript certification']
    },
    { 
      role: 'Full Stack Developer', 
      probability: 68, 
      company: 'Mid-size Companies',
      factors: { ats: 87, skills: 68, github: 70, linkedin: 82 },
      recommendations: ['Learn backend frameworks', 'Improve database skills']
    },
    { 
      role: 'Software Engineer Trainee', 
      probability: 85, 
      company: 'Large Enterprises',
      factors: { ats: 87, skills: 82, github: 75, linkedin: 82 },
      recommendations: ['Strong profile', 'Add system design projects']
    }
  ];

  const getProbabilityColor = (prob: number) => {
    if (prob >= 75) return 'text-success';
    if (prob >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProbabilityBg = (prob: number) => {
    if (prob >= 75) return 'bg-success/10';
    if (prob >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-xl font-semibold">Placement Success Predictor</h3>
          <p className="text-text-secondary">AI-powered probability analysis for job success</p>
        </div>
      </div>

      {/* Overall Placement Score */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Overall Placement Probability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">74%</div>
            <p className="text-text-secondary">High chance of securing an internship/job</p>
            <div className="flex justify-center gap-2">
              <Badge variant="default">Strong Profile</Badge>
              <Badge variant="secondary">Ready to Apply</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role-Specific Predictions */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Role-Specific Analysis
        </h4>
        
        {predictions.map((prediction, index) => (
          <Card key={index} className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{prediction.role}</CardTitle>
                  <p className="text-sm text-text-secondary">{prediction.company}</p>
                </div>
                <div className={`text-right ${getProbabilityBg(prediction.probability)} px-3 py-1 rounded-lg`}>
                  <div className={`text-2xl font-bold ${getProbabilityColor(prediction.probability)}`}>
                    {prediction.probability}%
                  </div>
                  <p className="text-xs text-text-secondary">Success Rate</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Factor Breakdown */}
                <div>
                  <h5 className="text-sm font-medium mb-3">Contributing Factors</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>ATS Score</span>
                        <span>{prediction.factors.ats}%</span>
                      </div>
                      <Progress value={prediction.factors.ats} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Skills Match</span>
                        <span>{prediction.factors.skills}%</span>
                      </div>
                      <Progress value={prediction.factors.skills} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>GitHub Activity</span>
                        <span>{prediction.factors.github}%</span>
                      </div>
                      <Progress value={prediction.factors.github} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>LinkedIn Strength</span>
                        <span>{prediction.factors.linkedin}%</span>
                      </div>
                      <Progress value={prediction.factors.linkedin} className="h-1" />
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    Improvement Suggestions
                  </h5>
                  <div className="space-y-1">
                    {prediction.recommendations.map((rec, idx) => (
                      <div key={idx} className="text-xs text-text-secondary bg-neutral-light px-2 py-1 rounded">
                        • {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1 btn-scale">
          <Star className="w-4 h-4 mr-2" />
          Improve Prediction
        </Button>
        <Button variant="outline" className="flex-1 btn-scale">
          View Similar Profiles
        </Button>
      </div>
    </div>
  );
};

export default PlacementPredictorTab;