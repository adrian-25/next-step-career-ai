import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DemoModal from '@/components/ui/demo-modal';

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm text-primary px-6 py-3 rounded-3xl text-sm font-bold mb-6 border border-white/20"
          >
            <Sparkles className="w-5 h-5 animate-bounce-subtle" />
            ✨ AI-Powered Career Glow-Up
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-text-primary mb-6 leading-tight"
          >
            Level Up Your{' '}
            <span className="gradient-text font-rounded text-6xl md:text-7xl lg:text-8xl animate-glow-pulse">
              Career Game
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
          >
            Get <span className="text-primary font-bold">AI-powered insights</span> on your resume, GitHub, and career potential. 
            Discover opportunities and <span className="text-secondary font-bold">vibe check</span> your professional brand! 💯
          </motion.p>

          {/* Feature Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-8 justify-center lg:justify-start mb-10"
          >
            {[
              { icon: Target, text: 'ATS Score Boost', color: 'text-neon-pink' },
              { icon: TrendingUp, text: 'Skill Gap Insights', color: 'text-primary' },
              { icon: Sparkles, text: 'Job Fit Magic', color: 'text-secondary' }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-3 text-text-secondary group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:shadow-neon transition-all duration-300">
                  <feature.icon className={`w-6 h-6 ${feature.color} group-hover:animate-bounce-subtle`} />
                </div>
                <span className="text-base font-bold group-hover:text-primary transition-colors">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <Button
              onClick={scrollToUpload}
              size="lg"
              className="btn-neon btn-scale font-black px-12 py-4 text-lg rounded-3xl text-white relative overflow-hidden group"
            >
              <span className="relative z-10">🚀 Analyze My Vibe</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform relative z-10" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column - Dashboard Preview Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative float-animation"
        >
          <Card className="p-8 card-hover border-2 border-white/20 backdrop-blur-xl">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-black text-text-primary">
                  ✨ Career Dashboard Preview
                </h3>
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-neon-green rounded-full animate-glow-pulse" />
                  <div className="w-4 h-4 bg-neon-yellow rounded-full animate-glow-pulse" style={{animationDelay: '0.2s'}} />
                  <div className="w-4 h-4 bg-neon-pink rounded-full animate-glow-pulse" style={{animationDelay: '0.4s'}} />
                </div>
              </div>

              {/* Mock Dashboard Elements */}
              <div className="grid grid-cols-2 gap-4">
                {/* ATS Score */}
                <motion.div 
                  className="bg-gradient-to-br from-primary/20 to-primary/10 p-6 rounded-3xl border border-white/20 backdrop-blur-sm hover:shadow-glow-cyan transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs font-bold text-text-secondary mb-2">ATS Score</div>
                  <div className="text-4xl font-black gradient-text">87%</div>
                  <div className="text-xs text-neon-green font-bold">+12% fire! 🔥</div>
                </motion.div>

                {/* Skill Match */}
                <motion.div 
                  className="bg-gradient-to-br from-secondary/20 to-secondary/10 p-6 rounded-3xl border border-white/20 backdrop-blur-sm hover:shadow-glow-pink transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs font-bold text-text-secondary mb-2">Skill Match</div>
                  <div className="text-4xl font-black text-secondary">92%</div>
                  <div className="text-xs text-neon-green font-bold">Perfect vibe ✨</div>
                </motion.div>
              </div>

              {/* Mock Chart Area */}
              <div className="bg-gradient-to-br from-neutral-light/50 to-neutral-light/30 p-6 rounded-3xl backdrop-blur-sm border border-white/10">
                <div className="text-sm font-bold text-text-secondary mb-4">Skills Radar 🎯</div>
                <div className="h-32 bg-gradient-to-r from-primary/30 via-secondary/30 to-neon-pink/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-sm font-bold text-text-secondary">Interactive Chart Preview</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>

              {/* Mock Recommendations */}
              <div className="space-y-3">
                <div className="text-sm font-bold text-text-secondary">🎯 Top Recommendations</div>
                {['Add React certification 💻', 'Improve LinkedIn glow-up ✨', 'GitHub activity boost 🚀'].map((rec, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-3 text-sm p-3 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-white/10"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-2 h-2 bg-gradient-neon rounded-full animate-glow-pulse" />
                    <span className="font-medium text-text-secondary">{rec}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-neon-pink to-primary rounded-full opacity-60"
          />
          <motion.div
            animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-secondary to-neon-blue rounded-full opacity-60"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;