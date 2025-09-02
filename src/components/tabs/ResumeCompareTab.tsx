import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, GitCompare, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

const ResumeCompareTab = ({ uploadedData }: any) => {
  const comparison = {
    current: {
      name: 'Your Resume',
      atsScore: 87,
      sections: 8,
      keywords: 24,
      experience: '2 years',
      skills: 15
    },
    target: {
      name: 'Industry Standard',
      atsScore: 92,
      sections: 10,
      keywords: 32,
      experience: '2+ years',
      skills: 18
    }
  };

  const detailedComparison = [
    { 
      category: 'ATS Compatibility', 
      current: 87, 
      target: 92, 
      status: 'good',
      gap: 'Add more industry keywords'
    },
    { 
      category: 'Skills Section', 
      current: 75, 
      target: 90, 
      status: 'needs-improvement',
      gap: 'Include 3 more technical skills'
    },
    { 
      category: 'Experience Format', 
      current: 95, 
      target: 95, 
      status: 'excellent',
      gap: 'Perfect formatting'
    },
    { 
      category: 'Education Section', 
      current: 90, 
      target: 85, 
      status: 'excellent',
      gap: 'Above standard'
    },
    { 
      category: 'Projects Section', 
      current: 80, 
      target: 88, 
      status: 'good',
      gap: 'Add quantified achievements'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'good':
        return <CheckCircle2 className="w-4 h-4 text-primary" />;
      default:
        return <AlertCircle className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-success';
      case 'good':
        return 'text-primary';
      default:
        return 'text-warning';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <GitCompare className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-xl font-semibold">Resume Comparison</h3>
          <p className="text-text-secondary">Compare your resume against industry standards</p>
        </div>
      </div>

      {/* Upload Another Resume */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Compare With Another Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center space-y-3">
            <Upload className="w-8 h-8 text-text-secondary mx-auto" />
            <div>
              <p className="text-sm text-text-secondary">Upload a second resume or job description</p>
              <p className="text-xs text-text-secondary">Supported formats: PDF, DOC, DOCX</p>
            </div>
            <Button variant="outline" className="btn-scale">
              Choose File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">{comparison.current.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{comparison.current.atsScore}%</div>
              <p className="text-sm text-text-secondary">ATS Score</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sections</span>
                <span>{comparison.current.sections}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Keywords</span>
                <span>{comparison.current.keywords}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Experience</span>
                <span>{comparison.current.experience}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Skills Listed</span>
                <span>{comparison.current.skills}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">{comparison.target.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-success">{comparison.target.atsScore}%</div>
              <p className="text-sm text-text-secondary">ATS Score</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sections</span>
                <span>{comparison.target.sections}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Keywords</span>
                <span>{comparison.target.keywords}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Experience</span>
                <span>{comparison.target.experience}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Skills Listed</span>
                <span>{comparison.target.skills}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Section Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detailedComparison.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    {item.category}
                  </h4>
                  <Badge variant={item.status === 'excellent' ? 'default' : 'secondary'}>
                    {item.current}% vs {item.target}%
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-xs">Your Score</div>
                    <Progress value={item.current} className="flex-1 h-2" />
                    <span className={`text-sm ${getStatusColor(item.status)}`}>{item.current}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-xs">Target</div>
                    <Progress value={item.target} className="flex-1 h-2" />
                    <span className="text-sm text-success">{item.target}%</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <ArrowRight className="w-3 h-3" />
                  <span>{item.gap}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button className="flex-1 btn-scale">Apply Recommendations</Button>
        <Button variant="outline" className="flex-1 btn-scale">Export Comparison</Button>
      </div>
    </div>
  );
};

export default ResumeCompareTab;