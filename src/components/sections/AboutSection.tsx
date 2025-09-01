import { Github, Linkedin, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section className="py-20 px-6 lg:px-12 bg-card">
      <div className="container mx-auto max-w-4xl text-center">
        <Card className="card-hover">
          <CardContent className="p-8">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
              Made by Adrian Dsouza
            </h2>
            <p className="text-text-secondary mb-2">Computer Science Student | Aspiring Software Developer</p>
            
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Passionate about building projects in Web Development, AI, and Open Source. 
              Exploring the intersection of technology and career growth with NextStep.
            </p>

            <div className="flex justify-center gap-6">
              <a 
                href="https://github.com/adrian-25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/adrian-dsouza-b19b4933b" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-secondary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a 
                href="mailto:adriandso212006@gmail.com"
                className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;