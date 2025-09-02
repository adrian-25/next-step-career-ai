import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  User, 
  Briefcase, 
  Award,
  ArrowUp,
  ArrowDown,
  AlertTriangle
} from 'lucide-react';
import SkillRadarChart from '@/components/charts/SkillRadarChart';
import KeywordMatchChart from '@/components/charts/KeywordMatchChart';

interface DashboardSectionProps {
  uploadedData: {
    resume: any;
    linkedin: string;
    github: string;
  };
}

const DashboardSection = ({ uploadedData }: DashboardSectionProps) => {
  // Mock data - in real app, this would come from API
  const dashboardData = {
    atsScore: 87,
    profileStrength: 92,
    jobFitScore: 78,
    skillsMatched: 15,
    skillsTotal: 20,
    keywordMatches: 68,
    recommendations: [
      { type: 'critical', message: 'Add contact information to resume header' },
      { type: 'high', message: 'Include React certification' },
      { type: 'medium', message: 'Improve LinkedIn summary' }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  return (
    <section id="dashboard-preview" className="py-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Your Career Analysis Dashboard
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Get instant insights into your professional profile and discover areas for improvement.
          </p>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Key Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Row - Main Scores */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* ATS Score */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-text-secondary">ATS Score</CardTitle>
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className={`text-3xl font-bold ${getScoreColor(dashboardData.atsScore)}`}>
                        {dashboardData.atsScore}%
                      </div>
                      <Progress value={dashboardData.atsScore} className="h-2" />
                      <div className="flex items-center gap-1 text-xs">
                        <ArrowUp className="w-3 h-3 text-success" />
                        <span className="text-success">+12% this week</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Profile Strength */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-text-secondary">Profile Strength</CardTitle>
                      <User className="w-4 h-4 text-secondary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className={`text-3xl font-bold ${getScoreColor(dashboardData.profileStrength)}`}>
                        {dashboardData.profileStrength}%
                      </div>
                      <Progress value={dashboardData.profileStrength} className="h-2" />
                      <div className="flex items-center gap-1 text-xs">
                        <ArrowUp className="w-3 h-3 text-success" />
                        <span className="text-success">Strong profile</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Placement Predictor */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="card-hover bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-text-secondary">Placement Probability</CardTitle>
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-primary">74%</div>
                      <Progress value={74} className="h-2" />
                      <div className="flex items-center gap-1 text-xs">
                        <ArrowUp className="w-3 h-3 text-success" />
                        <span className="text-success">High success rate</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Skills Radar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Skills Coverage Analysis
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {dashboardData.skillsMatched}/{dashboardData.skillsTotal} skills
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <SkillRadarChart />
                </CardContent>
              </Card>
            </motion.div>

            {/* Keyword Matches */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-secondary" />
                    Keyword Match Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <KeywordMatchChart />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Recommendations & Quick Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Resume sections</span>
                    <span className="font-semibold">8/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">GitHub repos</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">LinkedIn connections</span>
                    <span className="font-semibold">340+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Job matches</span>
                    <span className="font-semibold">156</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    Top Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboardData.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-light">
                      <div className={`
                        w-2 h-2 rounded-full mt-2 flex-shrink-0
                        ${rec.type === 'critical' ? 'bg-destructive' : 
                          rec.type === 'high' ? 'bg-warning' : 'bg-primary'}
                      `} />
                      <div>
                        <p className="text-sm text-text-primary">{rec.message}</p>
                        <Badge 
                          variant="outline" 
                          className={`
                            text-xs mt-1
                            ${rec.type === 'critical' ? 'border-destructive text-destructive' : 
                              rec.type === 'high' ? 'border-warning text-warning' : 'border-primary text-primary'}
                          `}
                        >
                          {rec.type} priority
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Profile Completeness */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Completeness</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Resume</span>
                      <span className="text-success">Complete</span>
                    </div>
                    <Progress value={100} className="h-1" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>LinkedIn</span>
                      <span className={uploadedData.linkedin ? "text-success" : "text-warning"}>
                        {uploadedData.linkedin ? "Connected" : "Missing"}
                      </span>
                    </div>
                    <Progress value={uploadedData.linkedin ? 100 : 0} className="h-1" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>GitHub</span>
                      <span className={uploadedData.github ? "text-success" : "text-warning"}>
                        {uploadedData.github ? "Connected" : "Missing"}
                      </span>
                    </div>
                    <Progress value={uploadedData.github ? 100 : 0} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;