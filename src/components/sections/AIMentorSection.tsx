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
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [lastFailedMessage, setLastFailedMessage] = useState<string>('');
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

  const handleSendMessage = async (messageToSend?: string, attempt = 1) => {
    const message = messageToSend || inputMessage.trim();
    if (!message || (isLoading && !messageToSend)) return;

    // Only clear input and add user message on first attempt
    if (attempt === 1) {
      setInputMessage('');
      
      const newUserMessage: Message = {
        role: 'user',
        content: message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newUserMessage]);
      setRetryCount(0);
      setLastFailedMessage(message);
    }
    
    setIsLoading(true);
    if (attempt > 1) {
      setIsRetrying(true);
    }

    try {
      const { data, error } = await supabase.functions.invoke('ai-mentor', {
        body: {
          message,
          conversationHistory
        }
      });

      if (error) throw error;

      // Success - add AI response
      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setConversationHistory(data.conversationHistory || []);
      
      // Reset retry state on success
      setRetryCount(0);
      setLastFailedMessage('');

    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      
      // Retry logic with exponential backoff (max 3 attempts)
      if (attempt < 3) {
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        setRetryCount(attempt);
        
        setTimeout(() => {
          handleSendMessage(message, attempt + 1);
        }, delay);
        
        return; // Don't show error message yet
      }

      // All retries failed - show error
      const errorMessages = [
        "Our AI bestie is recharging ⚡ Try again in a moment!",
        "Oops! Your AI mentor stepped away for coffee ☕ Give it another shot!",
        "Technical glow-down 😅 But don't worry, try again and we'll be back!",
        "AI mentor is having a moment 🤖💭 Refresh and let's chat!"
      ];
      
      const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      
      const errorMessage: Message = {
        role: 'assistant',
        content: randomErrorMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Issue 🔄",
        description: "Our AI mentor is recharging. Try the retry button below!",
        variant: "destructive"
      });
      
      setRetryCount(0);
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  };

  const handleSendClick = () => {
    handleSendMessage();
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
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
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-neutral-light to-white border-2 border-primary/20 shadow-glow-cyan flex items-center justify-center"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                          scale: { duration: 1.5, repeat: Infinity }
                        }}
                      >
                        <Bot className="w-5 h-5 text-primary" />
                      </motion.div>
                      <div className="chat-bubble-bot bg-gradient-to-br from-white/90 to-neutral-light/80 px-6 py-4 relative border border-primary/10 shadow-glow-subtle">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-2">
                            <motion.div 
                              className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div 
                              className="w-3 h-3 bg-gradient-to-r from-secondary to-neon-pink rounded-full"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div 
                              className="w-3 h-3 bg-gradient-to-r from-neon-pink to-primary rounded-full"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                          {isRetrying && retryCount > 0 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-2 text-xs"
                            >
                              <span className="text-primary font-bold">Retry {retryCount}/3</span>
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-3 h-3 border border-primary border-t-transparent rounded-full"
                              />
                            </motion.div>
                          )}
                        </div>
                        <div className="absolute top-4 -left-2 w-4 h-4 bg-gradient-to-br from-white/90 to-neutral-light/80 transform rotate-45 rounded-sm border-l border-t border-primary/10" />
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

            {/* Retry Button */}
            {lastFailedMessage && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  size="sm"
                  className="border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-primary hover:text-white transition-all duration-300 rounded-3xl px-6 py-2 font-bold shadow-glow-subtle"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    🔄
                  </motion.div>
                  Retry Last Message
                </Button>
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
                onClick={handleSendClick}
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