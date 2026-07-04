import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, AlertCircle, Bot, User, Trash2, PhoneCall, HelpCircle } from "lucide-react";
import { askGemini, ChatMessage } from "../gemini";
import { KENYAN_CONTACTS } from "../data";

export default function BlueprintAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Jambo! I am your C-MAX® Technical Sales Advisor. Ask me anything about structural specifications, load capacities, steel mesh density, or estimate how many panels you need for your project in Kenya. How can I help you build smarter today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasApiKeyError, setHasApiKeyError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompts for contractors
  const suggestedPrompts = [
    "How many panels for a 4-story apartment block in Ruiru?",
    "What is the concrete plaster thickness & class needed?",
    "Compare thermal U-Value of C-MAX vs brick.",
    "Is C-MAX certified by KEBS?"
  ];

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Check for API key on mount
  useEffect(() => {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key.trim() === "" || key.trim() === "YOUR_GEMINI_API_KEY_HERE") {
      setHasApiKeyError(true);
    }
  }, []);


  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setHasApiKeyError(false);

    // Auto-detect phone numbers or emails to capture as leads in our backend
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;

    const emailsFound = textToSend.match(emailRegex);
    const phonesFound = textToSend.match(phoneRegex);

    if (emailsFound || (phonesFound && phonesFound.some(p => p.replace(/\D/g, '').length >= 9))) {
      const email = emailsFound ? emailsFound[0] : '';
      const phone = phonesFound ? phonesFound[0] : '';
      
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Chatbot Contractor Lead',
          email: email || 'N/A',
          phone: phone || email,
          notes: `Lead automatically captured from Blueprint AI Assistant conversation: "${textToSend}"`,
          source: 'AI Assistant Chat'
        })
      })
        .then(res => res.json())
        .then(data => console.log('Chat lead automatically saved to local DB:', data))
        .catch(err => console.error('Failed to save chat lead:', err));
    }

    try {
      // Build conversation history (excluding the very first greeting to save tokens)
      const chatHistory = messages.slice(1);
      const responseText = await askGemini(textToSend, chatHistory);

      if (responseText.includes("Gemini API key is missing")) {
        setHasApiKeyError(true);
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Error: Something went wrong while connecting to the assistant. Please make sure your `GEMINI_API_KEY` is active." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'model',
        text: "Jambo! I am your C-MAX® Technical Sales Advisor. Ask me anything about structural specifications, load capacities, steel mesh density, or estimate how many panels you need for your project in Kenya. How can I help you build smarter today?"
      }
    ]);
    setHasApiKeyError(false);
  };

  return (
    <div className="bg-white border-2 border-industrial-charcoal rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto my-8 flex flex-col h-[650px] animate-fadeIn">
      {/* Header */}
      <div className="bg-industrial-charcoal p-4 text-white border-b-4 border-safety-orange flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-safety-orange text-white rounded-full animate-pulse">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-sans font-bold text-base uppercase tracking-tight flex items-center gap-2">
              AI Blueprint Assistant
              <span className="bg-safety-orange/20 text-safety-orange font-mono text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                Gemini Powered
              </span>
            </h3>
            <p className="font-mono text-[9px] text-surface-container-high tracking-wider uppercase mt-0.5">
              C-MAX® Technical Sales Advisor
            </p>
          </div>
        </div>
        <button
          onClick={handleClearChat}
          className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded transition-colors text-xs flex items-center gap-1 font-mono uppercase"
          title="Clear Conversation"
        >
          <Trash2 size={14} />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* API Key Banner Warning if applicable */}
      {hasApiKeyError && (
        <div className="bg-red-50 border-b border-red-200 p-3.5 flex items-start gap-3">
          <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={18} />
          <div className="text-xs text-red-800 leading-normal">
            <span className="font-bold">Missing Gemini API Key:</span> The chatbot is currently in offline demo mode. 
            To activate live structural estimations and architectural chat, please copy 
            <code className="bg-red-100 px-1 py-0.5 rounded mx-1 font-mono">.env.example</code> to 
            <code className="bg-red-100 px-1 py-0.5 rounded mx-1 font-mono">.env.local</code> and paste your active 
            Gemini key into the <code className="bg-red-100 px-1.5 py-0.5 rounded font-mono font-bold">GEMINI_API_KEY</code> field, then restart your dev server.
          </div>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-surface-container-low blueprint-grid space-y-4">
        {messages.map((msg, index) => {
          const isBot = msg.role === 'model';
          return (
            <div
              key={index}
              className={`flex items-start gap-3 max-w-[85%] ${
                isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              {/* Avatar */}
              <div
                className={`p-2 rounded-full flex-shrink-0 border ${
                  isBot
                    ? 'bg-industrial-charcoal border-industrial-charcoal text-safety-orange'
                    : 'bg-safety-orange border-safety-orange text-white'
                }`}
              >
                {isBot ? <Bot size={16} /> : <User size={16} />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1">
                <div
                  className={`p-4 rounded-lg shadow-sm border text-sm leading-relaxed whitespace-pre-wrap ${
                    isBot
                      ? 'bg-white border-surface-container-highest text-industrial-charcoal rounded-tl-none'
                      : 'bg-industrial-charcoal border-industrial-charcoal text-white rounded-tr-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="font-mono text-[9px] text-on-surface-variant/60 block px-1 text-right">
                  {isBot ? "Technical Advisor" : "Contractor"}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3 max-w-[80%] mr-auto">
            <div className="p-2 rounded-full bg-industrial-charcoal border border-industrial-charcoal text-safety-orange flex-shrink-0 animate-pulse">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-surface-container-highest p-4 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-safety-orange rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-safety-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-safety-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              <span className="text-xs font-mono text-on-surface-variant pl-1">Advisor is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Grid */}
      <div className="bg-white p-3 border-t border-surface-container-high flex flex-wrap gap-2 items-center">
        <span className="text-[10px] font-mono font-bold text-on-surface-variant/80 uppercase tracking-wider flex items-center gap-1">
          <HelpCircle size={12} />
          Suggested:
        </span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="text-xs px-2.5 py-1 bg-surface-container hover:bg-safety-orange/10 hover:text-safety-orange text-slate-blue border border-surface-container-highest rounded-full transition-all disabled:opacity-50 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="bg-surface-container p-4 border-t-2 border-industrial-charcoal flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask a technical or panel estimation question (e.g. '3-story block in Syokimau')..."
          disabled={loading}
          className="flex-1 bg-white border border-surface-container-highest rounded px-4 py-3 text-sm focus:border-safety-orange focus:outline-none transition-colors disabled:opacity-50 text-industrial-charcoal font-sans"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim() || loading}
          className="bg-safety-orange hover:bg-safety-orange-hover disabled:bg-surface-container-highest text-white p-3 rounded shadow transition-all active:scale-95 flex items-center justify-center flex-shrink-0 cursor-pointer"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Lead Capture Sticky Note */}
      <div className="bg-surface-container-highest px-4 py-2 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-on-surface-variant gap-2">
        <span>Need a stamped engineering drawing quote? Leave your contact details in chat.</span>
        <span className="flex items-center gap-1 font-bold text-safety-orange">
          <PhoneCall size={10} />
          Office: {KENYAN_CONTACTS.phone}
        </span>
      </div>
    </div>
  );
}
