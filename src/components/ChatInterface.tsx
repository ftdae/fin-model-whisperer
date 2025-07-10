
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, TrendingUp, DollarSign, Clock, Users } from 'lucide-react';

interface ChatInterfaceProps {
  modelData: any;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: any;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ modelData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hi! I've analyzed your financial model "${modelData.fileName}". I can help you understand your numbers, run scenarios, and answer questions about your business. Try asking me something like "What's our current runway?" or "How does our CAC compare to ARPU?"`,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "What's our current runway?",
    "How much do we need to charge to maintain 40% profit margin?",
    "What's our CAC trend vs ARPU?",
    "What if we reduce churn by 20%?",
    "Show me our revenue breakdown"
  ];

  const simulateAIResponse = (userQuestion: string): string => {
    const lowerQuestion = userQuestion.toLowerCase();
    
    if (lowerQuestion.includes('runway')) {
      return `Based on your current model, you have approximately **${modelData.keyMetrics.runway} months of runway** remaining. This is calculated from your current burn rate of $${modelData.keyMetrics.burn.toLocaleString()}/month against your available cash. Your runway is in a healthy range for a startup at your stage.`;
    } else if (lowerQuestion.includes('cac') || lowerQuestion.includes('arpu')) {
      return `Your Customer Acquisition Cost (CAC) is **$${modelData.keyMetrics.cac}** while your Average Revenue Per User (ARPU) is **$${modelData.keyMetrics.arpu}/month**. This gives you a CAC payback period of approximately 2.4 months, which is excellent for a SaaS business.`;
    } else if (lowerQuestion.includes('revenue')) {
      return `Your current annual revenue run rate is **$${modelData.keyMetrics.revenue.toLocaleString()}**. Based on your model, this breaks down into subscription revenue (85%), one-time setup fees (10%), and professional services (5%). Growth rate is tracking at 15% month-over-month.`;
    } else if (lowerQuestion.includes('churn')) {
      return `If you reduce churn by 20%, your LTV would increase from $1,960 to $2,450 (a 25% improvement). This would also extend your runway by approximately 3.2 months due to improved cash generation from existing customers.`;
    } else if (lowerQuestion.includes('margin') || lowerQuestion.includes('profit')) {
      return `To maintain a 40% profit margin, you'd need to price your main product at **$65/month** (up from current $49). This represents a 33% price increase, which might impact conversion rates but would significantly improve unit economics.`;
    } else {
      return `I can see from your financial model that you're tracking ${modelData.sheets.length} key sheets. Your business appears to be in good financial health with strong unit economics. Could you be more specific about what aspect of your model you'd like to analyze?`;
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: simulateAIResponse(content),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="border-b p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Bot className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Financial Model Assistant</h3>
            <p className="text-sm text-gray-500">Ask me anything about your model</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' ? 'bg-blue-600' : 'bg-gray-100'
              }`}>
                {message.type === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-gray-600" />
                )}
              </div>
              <div className={`rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="prose prose-sm max-w-none">
                  {message.content.split('**').map((part, index) => 
                    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
                <Bot className="h-4 w-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="border-t p-4">
          <p className="text-sm text-gray-600 mb-3">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex space-x-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about your financial model..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
