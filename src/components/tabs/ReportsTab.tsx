import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileOutput, Download, Share, FileText, Mail, Globe } from 'lucide-react';

const ReportsTab = ({ uploadedData }: any) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileOutput className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-xl font-semibold">Comprehensive Reports</h3>
          <p className="text-text-secondary">Export detailed analysis and recommendations</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Career Analysis Report
              <Badge variant="default" className="text-xs">Premium PDF</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-text-secondary text-sm">Complete 15-page analysis including ATS score, skill gaps, placement predictions, and actionable recommendations</p>
            <div className="space-y-2 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <FileText className="w-3 h-3" />
                <span>Resume optimization guide</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-3 h-3" />
                <span>Skills roadmap & learning path</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-3 h-3" />
                <span>Interview preparation checklist</span>
              </div>
            </div>
            <Button className="w-full btn-scale">
              <Download className="w-4 h-4 mr-2" />
              Download Complete Report (PDF)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Preparation Kit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-text-secondary text-sm">Personalized interview questions, answers guide, and company research based on your profile</p>
            <div className="space-y-2 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>50+ tailored interview questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" />
                <span>Company-specific insights</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-3 h-3" />
                <span>STAR method answer templates</span>
              </div>
            </div>
            <Button variant="outline" className="w-full btn-scale">
              <Share className="w-4 h-4 mr-2" />
              Generate Interview Kit
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <Button variant="outline" size="sm" className="btn-scale">
              <Download className="w-4 h-4 mr-2" />
              Skills Summary
            </Button>
            <Button variant="outline" size="sm" className="btn-scale">
              <Download className="w-4 h-4 mr-2" />
              ATS Report
            </Button>
            <Button variant="outline" size="sm" className="btn-scale">
              <Download className="w-4 h-4 mr-2" />
              Resume Tips
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;