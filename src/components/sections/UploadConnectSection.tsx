import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Github, Linkedin, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface UploadConnectSectionProps {
  onDataUpload: (type: string, data: any) => void;
  uploadedData: {
    resume: any;
    linkedin: string;
    github: string;
  };
}

const UploadConnectSection = ({ onDataUpload, uploadedData }: UploadConnectSectionProps) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        onDataUpload('resume', file);
        toast({
          title: "Resume uploaded successfully!",
          description: "We're analyzing your resume now.",
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf'))) {
      onDataUpload('resume', file);
      toast({
        title: "Resume uploaded successfully!",
        description: "We're analyzing your resume now.",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleLinkedinSubmit = () => {
    if (linkedinUrl && linkedinUrl.includes('linkedin.com')) {
      onDataUpload('linkedin', linkedinUrl);
      toast({
        title: "LinkedIn profile connected!",
        description: "We're analyzing your profile now.",
      });
    } else {
      toast({
        title: "Invalid LinkedIn URL",
        description: "Please enter a valid LinkedIn profile URL.",
        variant: "destructive",
      });
    }
  };

  const handleGithubSubmit = () => {
    if (githubUrl && githubUrl.includes('github.com')) {
      onDataUpload('github', githubUrl);
      toast({
        title: "GitHub profile connected!",
        description: "We're analyzing your repositories now.",
      });
    } else {
      toast({
        title: "Invalid GitHub URL",
        description: "Please enter a valid GitHub profile URL.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="upload-section" className="py-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Connect Your Professional Profiles
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Upload your resume and connect your professional profiles to get personalized insights and recommendations.
          </p>
        </motion.div>

        {/* Upload Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Resume Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="card-hover h-full">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {uploadedData.resume ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <FileText className="w-6 h-6 text-primary" />
                  )}
                </div>
                <CardTitle className="text-xl">Resume Analysis</CardTitle>
                <p className="text-text-secondary text-sm">
                  Upload your resume for ATS scoring and optimization suggestions
                </p>
              </CardHeader>
              <CardContent>
                <div
                  className={`
                    border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300
                    ${isDragging 
                      ? 'border-primary bg-primary/5' 
                      : uploadedData.resume 
                        ? 'border-success bg-success/5' 
                        : 'border-border hover:border-primary/50'
                    }
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {uploadedData.resume ? (
                    <div className="space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-success mx-auto" />
                      <p className="text-success font-medium">Resume uploaded!</p>
                      <p className="text-text-secondary text-xs">{uploadedData.resume.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-8 h-8 text-text-secondary mx-auto" />
                      <div>
                        <p className="text-text-primary font-medium mb-1">
                          Drag & drop your resume here
                        </p>
                        <p className="text-text-secondary text-sm mb-3">or</p>
                        <label className="cursor-pointer">
                          <Button variant="outline" size="sm" className="btn-scale">
                            Browse Files
                          </Button>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-text-secondary">Supports PDF files only</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* LinkedIn Connection Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-hover h-full">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {uploadedData.linkedin ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <Linkedin className="w-6 h-6 text-secondary" />
                  )}
                </div>
                <CardTitle className="text-xl">LinkedIn Profile</CardTitle>
                <p className="text-text-secondary text-sm">
                  Connect your LinkedIn for professional network insights
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedData.linkedin ? (
                  <div className="text-center space-y-2 p-4 bg-success/5 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-success mx-auto" />
                    <p className="text-success font-medium">LinkedIn connected!</p>
                    <p className="text-text-secondary text-xs break-all">{uploadedData.linkedin}</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Input
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <Button
                      onClick={handleLinkedinSubmit}
                      className="w-full bg-secondary hover:bg-secondary-hover btn-scale"
                      disabled={!linkedinUrl}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Connect LinkedIn
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* GitHub Connection Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="card-hover h-full">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-text-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {uploadedData.github ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <Github className="w-6 h-6 text-text-primary" />
                  )}
                </div>
                <CardTitle className="text-xl">GitHub Profile</CardTitle>
                <p className="text-text-secondary text-sm">
                  Analyze your coding activity and project contributions
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedData.github ? (
                  <div className="text-center space-y-2 p-4 bg-success/5 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-success mx-auto" />
                    <p className="text-success font-medium">GitHub connected!</p>
                    <p className="text-text-secondary text-xs break-all">{uploadedData.github}</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Input
                        placeholder="https://github.com/yourusername"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <Button
                      onClick={handleGithubSubmit}
                      className="w-full bg-text-primary hover:bg-text-primary/90 btn-scale"
                      disabled={!githubUrl}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Connect GitHub
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        {(uploadedData.resume || uploadedData.linkedin || uploadedData.github) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <AlertCircle className="w-5 h-5" />
              </motion.div>
              <span className="font-medium">Analyzing your data...</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default UploadConnectSection;