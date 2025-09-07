import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIMentorSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Career Mentor. I\'m here to help you with career advice, resume tips, interview preparation, skill development, and more. What would you like to discuss today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to UI
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-mentor', {
        body: {
          message: userMessage,
          conversationHistory
        }
      });

      if (error) throw error;

      // Add AI response to UI
      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      // Update conversation history for context
      setConversationHistory(data.conversationHistory || []);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add AI response with error message for graceful handling
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm experiencing technical difficulties right now. Our AI mentor is busy helping other users. Please try again in a few moments, and I'll be happy to help with your career questions!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Issue",
        description: "Our AI mentor is busy. Please try again in a few seconds.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "How do I optimize my resume for ATS?",
    "What skills should I learn for software engineering?",
    "How do I prepare for FAANG interviews?",
    "What's the best way to negotiate salary?",
    "How do I build a strong LinkedIn profile?"
  ];

  return (
    <section className="py-20 px-6 lg:px-12 bg-neutral-light">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-glow-cyan"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-white animate-bounce-subtle" />
              </motion.div>
              <h2 className="font-heading text-4xl font-black gradient-text">
                AI Career Bestie
              </h2>
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-secondary to-neon-pink rounded-3xl flex items-center justify-center shadow-glow-pink"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="w-8 h-8 text-white animate-bounce-subtle" />
              </motion.div>
            </div>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto font-medium">
              Get personalized career advice, interview tips, and skill development guidance from your 
              <span className="text-primary font-bold"> AI bestie</span>! 
              She's here to help you <span className="text-secondary font-bold">glow up</span> professionally ✨
            </p>
          </motion.div>
        </div>

        <Card className="card-hover h-[600px] flex flex-col border-2 border-white/20 backdrop-blur-xl">
          <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-2xl border-b border-white/10">
            <CardTitle className="flex items-center gap-3 text-text-primary">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-neon"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="font-black text-xl">Career Bestie Chat 💬</div>
                <div className="text-sm font-normal text-text-secondary">Your AI career companion</div>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col gap-4 p-6 pt-0">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-4 max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <motion.div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                            message.role === 'user' 
                              ? 'bg-gradient-to-br from-primary to-secondary border-white/20 shadow-glow-cyan' 
                              : 'bg-gradient-to-br from-neutral-light to-white border-primary/20 shadow-card'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {message.role === 'user' ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              <Bot className="w-5 h-5 text-primary" />
                            </motion.div>
                          )}
                        </motion.div>
                        <div className={`rounded-3xl px-6 py-4 relative ${
                          message.role === 'user'
                            ? 'chat-bubble-user text-white'
                            : 'chat-bubble-bot text-text-primary bg-gradient-to-br from-white/90 to-neutral-light/80'
                        }`}>
                          <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                          <span className={`text-xs mt-2 block opacity-70 font-medium`}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          {/* Speech bubble tail */}
                          {message.role === 'user' ? (
                            <div className="absolute top-4 -right-2 w-4 h-4 bg-gradient-to-br from-primary to-secondary transform rotate-45 rounded-sm" />
                          ) : (
                            <div className="absolute top-4 -left-2 w-4 h-4 bg-gradient-to-br from-white/90 to-neutral-light/80 transform rotate-45 rounded-sm" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-neutral-light to-white border-2 border-primary/20 shadow-card flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Bot className="w-5 h-5 text-primary" />
                      </motion.div>
                      <div className="chat-bubble-bot bg-gradient-to-br from-white/90 to-neutral-light/80 px-6 py-4 relative">
                        <div className="flex gap-2">
                          <motion.div 
                            className="w-3 h-3 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div 
                            className="w-3 h-3 bg-secondary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div 
                            className="w-3 h-3 bg-neon-pink rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                        <div className="absolute top-4 -left-2 w-4 h-4 bg-gradient-to-br from-white/90 to-neutral-light/80 transform rotate-45 rounded-sm" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <p className="text-sm font-bold text-text-secondary flex items-center gap-2">
                  <span>💡</span> Try asking your AI bestie:
                </p>
                <div className="flex flex-wrap gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="text-xs bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-text-secondary hover:text-primary px-4 py-3 rounded-3xl transition-all duration-300 border border-white/20 backdrop-blur-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Area */}
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your AI bestie anything about your career... 💭"
                disabled={isLoading}
                className="flex-1 rounded-3xl bg-gradient-to-r from-white/90 to-neutral-light/80 backdrop-blur-sm border-2 border-white/20 focus:border-primary/50 px-6 py-3 font-medium placeholder:text-text-secondary/60"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                size="icon"
                className="btn-neon btn-scale w-12 h-12 rounded-full text-white shadow-glow-cyan"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIMentorSection;