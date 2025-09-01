import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileOutput, Download } from 'lucide-react';

const ReportsSection = ({ uploadedData }: any) => {
  return (
    <section className="py-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-3xl font-bold text-text-primary mb-8">
          Export Your Analysis
        </h2>
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <FileOutput className="w-5 h-5" />
              Professional Career Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="btn-scale">
              <Download className="w-5 h-5 mr-2" />
              Download Complete Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ReportsSection;