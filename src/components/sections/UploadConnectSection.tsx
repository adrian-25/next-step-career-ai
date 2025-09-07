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

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
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
          className="text-center mb-16"
        >
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-3 h-3 bg-neon-pink rounded-full animate-glow-pulse" />
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-glow-pulse" style={{animationDelay: '0.2s'}} />
            <div className="w-4 h-4 bg-primary rounded-full animate-glow-pulse" style={{animationDelay: '0.4s'}} />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-text-primary mb-6">
            Connect Your <span className="gradient-text">Professional Vibes</span> ✨
          </h2>
          <p className="text-text-secondary text-xl max-w-2xl mx-auto font-medium">
            Upload your resume and connect your socials to get that 
            <span className="text-primary font-bold"> personalized glow-up</span> with 
            <span className="text-secondary font-bold"> fire recommendations</span>! 🔥
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
            <Card className="card-hover h-full border-2 border-white/20 backdrop-blur-xl">
              <CardHeader className="text-center pb-6">
                <motion.div 
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${
                    uploadedData.resume 
                      ? 'bg-gradient-to-br from-neon-green/20 to-success/20 shadow-glow-cyan' 
                      : 'bg-gradient-to-br from-primary/20 to-secondary/20 shadow-neon'
                  }`}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {uploadedData.resume ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-neon-green" />
                    </motion.div>
                  ) : (
                    <FileText className="w-10 h-10 text-primary animate-bounce-subtle" />
                  )}
                </motion.div>
                <CardTitle className="text-2xl font-black gradient-text">
                  {uploadedData.resume ? '📄 Resume Uploaded!' : '📄 Resume Analysis'}
                </CardTitle>
                <p className="text-text-secondary text-base font-medium">
                  {uploadedData.resume 
                    ? 'Your resume is looking fire! 🔥' 
                    : 'Upload your resume for ATS scoring and that optimization glow-up'
                  }
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div
                  className={`
                    file-drop-zone p-8 text-center transition-all duration-500 cursor-pointer
                    ${isDragging 
                      ? 'file-drop-active' 
                      : uploadedData.resume 
                        ? 'border-neon-green bg-gradient-to-br from-neon-green/10 to-success/10 shadow-glow-cyan' 
                        : 'border-primary/30 hover:border-primary'
                    }
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={!uploadedData.resume ? handleBrowseClick : undefined}
                >
                  {uploadedData.resume ? (
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle2 className="w-16 h-16 text-neon-green mx-auto" />
                      </motion.div>
                      <div>
                        <p className="text-neon-green font-black text-lg">Resume uploaded! 🎉</p>
                        <p className="text-text-secondary text-sm font-medium mt-2">{uploadedData.resume.name}</p>
                        <div className="mt-3 px-4 py-2 bg-gradient-to-r from-neon-green/20 to-success/20 rounded-2xl inline-block">
                          <span className="text-xs font-bold text-neon-green">Ready for analysis! ✨</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Upload className="w-16 h-16 text-primary mx-auto opacity-80" />
                      </motion.div>
                      <div>
                        <p className="text-text-primary font-black text-lg mb-2">
                          Drag & drop your resume here
                        </p>
                        <p className="text-text-secondary text-base mb-4 font-medium">or</p>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="btn-scale font-bold px-8 py-3 rounded-3xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                          onClick={handleBrowseClick}
                        >
                          🗂️ Browse Files
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full opacity-60" />
                        <p className="text-sm text-text-secondary font-medium">PDF files only</p>
                        <div className="w-2 h-2 bg-secondary rounded-full opacity-60" />
                      </div>
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