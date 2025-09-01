import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Briefcase, TrendingUp } from 'lucide-react';

const JobFitTab = ({ uploadedData }: any) => {
  const jobFitData = {
    topMatches: [
      { role: 'Frontend Developer', match: 92, company: 'Tech Startup', salary: '$75-90k' },
      { role: 'Full Stack Developer', match: 87, company: 'Mid-size Company', salary: '$80-95k' },
      { role: 'React Developer', match: 89, company: 'Enterprise', salary: '$85-100k' }
    ],
    skillGaps: [
      'AWS Certification needed',
      'Docker experience recommended',
      'Unit testing skills'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Target className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-xl font-semibold">Job Fit Analysis</h3>
          <p className="text-text-secondary">Role matching and career recommendations</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Job Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobFitData.topMatches.map((job, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{job.role}</h4>
                  <Badge variant="default">{job.match}% match</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span>{job.company}</span>
                  <span>{job.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Gaps to Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {jobFitData.skillGaps.map((gap, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <span className="text-sm">{gap}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobFitTab;