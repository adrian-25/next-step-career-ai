import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CAREER_SYSTEM_PROMPT = `You are an expert Career Mentor AI with deep knowledge in:

- Career development and progression strategies
- Resume optimization and ATS best practices  
- Interview preparation and techniques
- Skill development roadmaps for tech roles
- Salary negotiation and job market insights
- LinkedIn profile optimization
- Portfolio building and project guidance
- Networking and professional growth
- Industry trends and emerging technologies
- Work-life balance and career transitions

Your responses should be:
- Practical and actionable
- Encouraging yet realistic  
- Tailored to the user's experience level
- Focused on career growth and success
- Professional but approachable

Keep responses concise but comprehensive (2-4 paragraphs max). Always provide specific next steps when possible.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Build conversation with system prompt and recent history
    const messages = [
      { role: 'system', content: CAREER_SYSTEM_PROMPT },
      ...conversationHistory.slice(-6), // Keep last 3 exchanges (6 messages)
      { role: 'user', content: message }
    ];

    console.log('Sending request to OpenAI with messages:', messages.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages,
        max_completion_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Mentor response generated successfully');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      conversationHistory: [
        ...conversationHistory.slice(-4), // Keep last 2 exchanges
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      ]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-mentor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error',
      response: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});