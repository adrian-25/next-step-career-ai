import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileOutput, Download, Share } from 'lucide-react';

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
            <CardTitle>Career Analysis Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-text-secondary text-sm">Complete analysis including ATS score, skill gaps, and recommendations</p>
            <Button className="w-full btn-scale">
              <Download className="w-4 h-4 mr-2" />
              Download PDF Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Preparation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-text-secondary text-sm">Personalized interview questions based on your profile and target roles</p>
            <Button variant="outline" className="w-full btn-scale">
              <Share className="w-4 h-4 mr-2" />
              Generate Questions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsTab;