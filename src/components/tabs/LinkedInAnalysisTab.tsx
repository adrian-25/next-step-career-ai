import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Users, TrendingUp, Award } from 'lucide-react';

const LinkedInAnalysisTab = ({ uploadedData }: any) => {
  const linkedinData = {
    connections: 340,
    profileViews: 125,
    postEngagement: 89,
    recommendations: 8,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
    strengths: [
      'Strong professional network',
      'Regular content engagement',
      'Industry-relevant skills'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Linkedin className="w-6 h-6 text-secondary" />
        <div>
          <h3 className="text-xl font-semibold">LinkedIn Analysis</h3>
          <p className="text-text-secondary">Professional network and profile insights</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold">{linkedinData.connections}</div>
            <div className="text-sm text-text-secondary">Connections</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{linkedinData.profileViews}</div>
            <div className="text-sm text-text-secondary">Profile Views</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{linkedinData.recommendations}</div>
            <div className="text-sm text-text-secondary">Recommendations</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Strengths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {linkedinData.strengths.map((strength, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkedInAnalysisTab;