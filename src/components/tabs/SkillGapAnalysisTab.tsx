import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, AlertTriangle, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const SkillGapAnalysisTab = ({ uploadedData }: any) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const mockAnalysis = {
    requiredSkills: [
      { skill: 'React.js', hasSkill: true, proficiency: 85, required: 90 },
      { skill: 'Node.js', hasSkill: true, proficiency: 70, required: 80 },
      { skill: 'TypeScript', hasSkill: false, proficiency: 0, required: 75 },
      { skill: 'AWS', hasSkill: false, proficiency: 0, required: 70 },
      { skill: 'Docker', hasSkill: false, proficiency: 0, required: 65 },
      { skill: 'GraphQL', hasSkill: true, proficiency: 60, required: 70 },
      { skill: 'Jest Testing', hasSkill: true, proficiency: 75, required: 80 },
      { skill: 'MongoDB', hasSkill: true, proficiency: 80, required: 75 }
    ],
    keywords: {
      matched: ['JavaScript', 'React', 'Frontend', 'API', 'Git'],
      missing: ['Microservices', 'CI/CD', 'Kubernetes', 'Agile', 'Scrum']
    },
    overallMatch: 68,
    criticalGaps: 3
  };

  const handleAnalyze = () => {
    if (jobDescription.trim()) {
      setAnalyzed(true);
    }
  };

  const getSkillStatus = (skill: any) => {
    if (!skill.hasSkill) return 'missing';
    if (skill.proficiency >= skill.required) return 'strong';
    return 'weak';
  };

  const getSkillColor = (status: string) => {
    switch (status) {
      case 'strong': return 'text-success';
      case 'weak': return 'text-warning';
      default: return 'text-destructive';
    }
  };

  const getSkillIcon = (status: string) => {
    switch (status) {
      case 'strong': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'weak': return <AlertTriangle className="w-4 h-4 text-warning" />;
      default: return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Search className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-xl font-semibold">Skill Gap Analysis</h3>
          <p className="text-text-secondary">Compare your skills against specific job requirements</p>
        </div>
      </div>

      {/* Job Description Input */}
      <Card>
        <CardHeader>
          <CardTitle>Job Description Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Paste Job Description or Requirements
            </label>
            <Textarea
              placeholder="Paste the job description here to analyze skill gaps and keyword matches..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
          <Button 
            onClick={handleAnalyze}
            disabled={!jobDescription.trim()}
            className="w-full btn-scale"
          >
            <Search className="w-4 h-4 mr-2" />
            Analyze Skill Gaps
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analyzed && (
        <>
          {/* Overview */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle>Analysis Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{mockAnalysis.overallMatch}%</div>
                  <p className="text-sm text-text-secondary">Overall Match</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning">{mockAnalysis.criticalGaps}</div>
                  <p className="text-sm text-text-secondary">Critical Gaps</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">{mockAnalysis.keywords.matched.length}</div>
                  <p className="text-sm text-text-secondary">Keywords Matched</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalysis.requiredSkills.map((skill, index) => {
                  const status = getSkillStatus(skill);
                  return (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getSkillIcon(status)}
                          <h4 className="font-medium">{skill.skill}</h4>
                        </div>
                        <Badge variant={status === 'strong' ? 'default' : status === 'weak' ? 'secondary' : 'destructive'}>
                          {status === 'missing' ? 'Missing' : `${skill.proficiency}% / ${skill.required}%`}
                        </Badge>
                      </div>
                      
                      {skill.hasSkill && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Your Level</span>
                            <span>Required Level</span>
                          </div>
                          <div className="relative">
                            <Progress value={skill.required} className="h-2 bg-muted" />
                            <Progress 
                              value={skill.proficiency} 
                              className={`h-2 absolute top-0 ${
                                skill.proficiency >= skill.required ? 'text-success' : 'text-warning'
                              }`} 
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="text-xs text-text-secondary">
                        {status === 'missing' && '• Consider learning this skill - high priority for this role'}
                        {status === 'weak' && '• Improve proficiency to meet job requirements'}
                        {status === 'strong' && '• Great match! This skill aligns well with requirements'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Keyword Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-success">Matched Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockAnalysis.keywords.matched.map((keyword, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-warning">Missing Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockAnalysis.keywords.missing.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Learning Path Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAnalysis.requiredSkills
                  .filter(skill => getSkillStatus(skill) !== 'strong')
                  .map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          getSkillStatus(skill) === 'missing' ? 'bg-destructive' : 'bg-warning'
                        }`} />
                        <span className="font-medium">{skill.skill}</span>
                        <Badge variant="outline" className="text-xs">
                          {getSkillStatus(skill) === 'missing' ? 'High Priority' : 'Improve'}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <ArrowRight className="w-3 h-3 mr-1" />
                        Learn
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button className="flex-1 btn-scale">Generate Learning Plan</Button>
            <Button variant="outline" className="flex-1 btn-scale">Export Analysis</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillGapAnalysisTab;