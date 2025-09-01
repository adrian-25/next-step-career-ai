import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Github, 
  Linkedin, 
  Target, 
  FileOutput,
  Calendar,
  Code,
  Users,
  Award
} from 'lucide-react';
import ResumeAnalysisTab from '@/components/tabs/ResumeAnalysisTab';
import GitHubAnalysisTab from '@/components/tabs/GitHubAnalysisTab';
import LinkedInAnalysisTab from '@/components/tabs/LinkedInAnalysisTab';
import JobFitTab from '@/components/tabs/JobFitTab';
import ReportsTab from '@/components/tabs/ReportsTab';

interface DetailedTabsSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  uploadedData: {
    resume: any;
    linkedin: string;
    github: boolean;
  };
}

const DetailedTabsSection = ({ activeTab, setActiveTab, uploadedData }: DetailedTabsSectionProps) => {
  const tabs = [
    {
      id: 'resume',
      label: 'Resume',
      icon: FileText,
      description: 'ATS analysis and optimization',
      available: !!uploadedData.resume
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      description: 'Code analysis and activity',
      available: uploadedData.github
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      description: 'Professional network insights',
      available: !!uploadedData.linkedin
    },
    {
      id: 'jobfit',
      label: 'Job Fit',
      icon: Target,
      description: 'Role matching and recommendations',
      available: true
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileOutput,
      description: 'Comprehensive analysis reports',
      available: true
    }
  ];

  return (
    <section className="py-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Detailed Analysis
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Dive deep into each aspect of your professional profile with comprehensive insights and actionable recommendations.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Tab List */}
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-2 bg-neutral-light">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      disabled={!tab.available}
                      className={`
                        flex flex-col gap-2 p-4 h-auto text-left transition-all duration-200
                        ${tab.available 
                          ? 'data-[state=active]:bg-card data-[state=active]:shadow-sm hover:bg-card/50' 
                          : 'opacity-50 cursor-not-allowed'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${tab.available ? 'text-primary' : 'text-text-secondary'}`} />
                        <span className="font-medium text-sm">{tab.label}</span>
                      </div>
                      <p className="text-xs text-text-secondary text-left">
                        {tab.description}
                      </p>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* Tab Content */}
              <CardContent className="p-6">
                <TabsContent value="resume" className="mt-0">
                  <ResumeAnalysisTab uploadedData={uploadedData} />
                </TabsContent>

                <TabsContent value="github" className="mt-0">
                  <GitHubAnalysisTab uploadedData={uploadedData} />
                </TabsContent>

                <TabsContent value="linkedin" className="mt-0">
                  <LinkedInAnalysisTab uploadedData={uploadedData} />
                </TabsContent>

                <TabsContent value="jobfit" className="mt-0">
                  <JobFitTab uploadedData={uploadedData} />
                </TabsContent>

                <TabsContent value="reports" className="mt-0">
                  <ReportsTab uploadedData={uploadedData} />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DetailedTabsSection;