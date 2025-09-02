import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you learn about chronic disease prevention. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('diabetes') || input.includes('blood sugar')) {
      return "I can help you learn about diabetes prevention. Key steps include maintaining a healthy weight, eating a balanced diet, and staying physically active. Would you like to take our risk assessment?";
    }
    if (input.includes('heart') || input.includes('cardiovascular')) {
      return "Heart disease is preventable through lifestyle changes like regular exercise, healthy eating, not smoking, and managing stress. What specific aspect would you like to know more about?";
    }
    if (input.includes('obesity') || input.includes('weight')) {
      return "Weight management is crucial for preventing many chronic diseases. I can provide information about healthy eating patterns and physical activity recommendations. What would be most helpful?";
    }
    if (input.includes('asthma')) {
      return "Asthma management involves avoiding triggers, taking medications as prescribed, and having an action plan. Would you like information about asthma triggers or management strategies?";
    }
    if (input.includes('stroke')) {
      return "Stroke prevention includes controlling blood pressure, not smoking, maintaining a healthy diet, and staying active. Many risk factors are controllable. What would you like to learn about?";
    }
    if (input.includes('risk') || input.includes('assessment')) {
      return "Our risk assessment can help identify your personal risk factors for chronic diseases. It takes just a few minutes and provides personalized recommendations. Would you like to start the assessment?";
    }
    if (input.includes('help') || input.includes('start')) {
      return "I can help you with information about preventing chronic diseases like diabetes, heart disease, stroke, obesity, and asthma. You can also take risk assessments or find local programs. What interests you most?";
    }
    
    return "That's a great question! I'm here to help with chronic disease prevention information. You can ask me about specific conditions like diabetes, heart disease, or stroke, or I can guide you to our risk assessments and prevention programs.";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Am I at risk for diabetes?",
    "Heart disease prevention",
    "Take risk assessment",
    "Find local programs"
  ];

  const handleQuickAction = (action) => {
    setInputValue(action);
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? '0' : '100px',
          right: isMobile ? '0' : '20px',
          left: isMobile ? '0' : 'auto',
          width: isMobile ? '100%' : '350px',
          height: isMobile ? '100vh' : '500px',
          backgroundColor: 'white',
          borderRadius: isMobile ? '0' : '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#1e40af',
            color: 'white',
            padding: '16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#e0f2fe' }}>
                Prevention Assistant
              </h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9, color: '#bfdbfe' }}>
                Ask me about chronic disease prevention
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  backgroundColor: message.sender === 'user' ? '#1e40af' : '#f1f5f9',
                  color: message.sender === 'user' ? 'white' : '#334155',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  maxWidth: '80%',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  wordWrap: 'break-word'
                }}>
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  backgroundColor: '#f1f5f9',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  fontSize: '14px',
                  color: '#64748b'
                }}>
                  Typing...
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {messages.length === 1 && !isTyping && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '8px'
              }}>
                <p style={{
                  fontSize: '12px',
                  color: '#64748b',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Quick suggestions:
                </p>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '20px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      color: '#475569',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#f8fafc';
                      e.target.style.borderColor = '#cbd5e1';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.borderColor = '#e2e8f0';
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-end'
            }}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about prevention..."
                style={{
                  flex: 1,
                  border: '1px solid #d1d5db',
                  borderRadius: '20px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  resize: 'none',
                  minHeight: '20px',
                  maxHeight: '80px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                rows="1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                style={{
                  backgroundColor: inputValue.trim() ? '#1e40af' : '#94a3b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#1e40af',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          zIndex: 1001,
          transition: 'all 0.2s ease',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
        onMouseOver={(e) => {
          if (!isOpen) {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.backgroundColor = '#1e3a8a';
          }
        }}
        onMouseOut={(e) => {
          if (!isOpen) {
            e.target.style.transform = 'scale(1)';
            e.target.style.backgroundColor = '#1e40af';
          }
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        )}
      </button>
    </>
  );
};

export default Chatbot;
