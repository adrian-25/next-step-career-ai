import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const HeroSection = () => {
  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDashboard = () => {
    document.getElementById('dashboard-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
      
      <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Career Analysis
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
          >
            Take Your{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Next Step
            </span>{' '}
            in Career Growth
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            Get AI-powered insights on your resume, GitHub profile, and career potential. 
            Understand how recruiters see you and discover your next career opportunity.
          </motion.p>

          {/* Feature Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8"
          >
            {[
              { icon: Target, text: 'ATS Score Analysis' },
              { icon: TrendingUp, text: 'Skill Gap Insights' },
              { icon: Sparkles, text: 'Job Fit Matching' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-text-secondary">
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              onClick={scrollToUpload}
              size="lg"
              className="bg-primary hover:bg-primary-hover text-primary-foreground btn-scale font-medium px-8 py-3 text-base"
            >
              Analyze My Profile
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={scrollToDashboard}
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary/10 btn-scale font-medium px-8 py-3 text-base"
            >
              Preview Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column - Dashboard Preview Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <Card className="p-6 bg-card shadow-hover card-hover">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-text-primary">
                  Career Dashboard Preview
                </h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <div className="w-3 h-3 bg-warning rounded-full" />
                  <div className="w-3 h-3 bg-destructive rounded-full" />
                </div>
              </div>

              {/* Mock Dashboard Elements */}
              <div className="grid grid-cols-2 gap-3">
                {/* ATS Score */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl">
                  <div className="text-xs text-text-secondary mb-1">ATS Score</div>
                  <div className="text-2xl font-bold text-primary">87%</div>
                  <div className="text-xs text-success">+12% improved</div>
                </div>

                {/* Skill Match */}
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-xl">
                  <div className="text-xs text-text-secondary mb-1">Skill Match</div>
                  <div className="text-2xl font-bold text-secondary">92%</div>
                  <div className="text-xs text-success">Strong fit</div>
                </div>
              </div>

              {/* Mock Chart Area */}
              <div className="bg-neutral-light p-4 rounded-xl">
                <div className="text-xs text-text-secondary mb-3">Skills Radar</div>
                <div className="h-24 bg-gradient-to-r from-primary/20 via-secondary/20 to-success/20 rounded-lg flex items-center justify-center">
                  <div className="text-xs text-text-secondary">Interactive Chart Preview</div>
                </div>
              </div>

              {/* Mock Recommendations */}
              <div className="space-y-2">
                <div className="text-xs text-text-secondary">Top Recommendations</div>
                {['Add React certification', 'Improve LinkedIn summary', 'GitHub activity boost'].map((rec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span className="text-text-secondary">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full"
          />
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;