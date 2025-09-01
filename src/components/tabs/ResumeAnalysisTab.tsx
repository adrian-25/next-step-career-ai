import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, FileText } from 'lucide-react';

const ResumeAnalysisTab = ({ uploadedData }: any) => {
  const resumeData = {
    atsScore: 87,
    sections: [
      { name: 'Contact Info', score: 100, status: 'complete' },
      { name: 'Professional Summary', score: 85, status: 'good' },
      { name: 'Work Experience', score: 90, status: 'complete' },
      { name: 'Skills', score: 75, status: 'needs-work' },
      { name: 'Education', score: 100, status: 'complete' }
    ],
    keywords: ['React', 'JavaScript', 'Node.js', 'Python', 'AWS'],
    recommendations: [
      'Add more quantified achievements',
      'Include relevant certifications',
      'Optimize keywords for ATS'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-xl font-semibold">Resume Analysis</h3>
          <p className="text-text-secondary">ATS optimization and formatting insights</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ATS Compatibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{resumeData.atsScore}%</div>
                <Progress value={resumeData.atsScore} className="mb-2" />
                <p className="text-sm text-text-secondary">Your resume is ATS-friendly</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Section Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resumeData.sections.map((section, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{section.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={section.status === 'complete' ? 'default' : 'secondary'}>
                      {section.score}%
                    </Badge>
                    {section.status === 'complete' ? 
                      <CheckCircle2 className="w-4 h-4 text-success" /> :
                      <AlertCircle className="w-4 h-4 text-warning" />
                    }
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeAnalysisTab;