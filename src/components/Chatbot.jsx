import React, { useState, useRef, useEffect } from 'react';

const Chatbot = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you learn about chronic disease prevention. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // State management for personalization and routing
  const [userState, setUserState] = useState({
    userName: null,
    careRecipientName: null,
    assessmentType: null, // 'self', 'caregiver', 'curious'
    conversationContext: []
  });

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

  // Helper function to extract names and context from user input
  const extractUserContext = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Detect names (simple pattern matching)
    const namePatterns = [
      /my name is (\w+)/i,
      /i'm (\w+)/i,
      /call me (\w+)/i,
      /i am (\w+)/i
    ];
    
    const carePatterns = [
      /my (\w+) (\w+)/i, // "my mom Sarah", "my dad John"
      /(\w+) is my (\w+)/i, // "Sarah is my mom"
      /caring for (\w+)/i,
      /worried about (\w+)/i,
      /(\w+)'s health/i
    ];

    let detectedUserName = userState.userName;
    let detectedCareRecipient = userState.careRecipientName;
    let detectedAssessmentType = userState.assessmentType;

    // Extract user name
    for (const pattern of namePatterns) {
      const match = userInput.match(pattern);
      if (match && match[1]) {
        detectedUserName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
        break;
      }
    }

    // Extract care recipient name and determine assessment type
    for (const pattern of carePatterns) {
      const match = userInput.match(pattern);
      if (match) {
        if (pattern.toString().includes('my (\\\w+) (\\\w+)')) {
          // "my mom Sarah" format
          detectedCareRecipient = match[2].charAt(0).toUpperCase() + match[2].slice(1);
          detectedAssessmentType = 'caregiver';
        } else if (pattern.toString().includes('(\\\w+) is my')) {
          // "Sarah is my mom" format
          detectedCareRecipient = match[1].charAt(0).toUpperCase() + match[1].slice(1);
          detectedAssessmentType = 'caregiver';
        } else {
          detectedCareRecipient = match[1].charAt(0).toUpperCase() + match[1].slice(1);
          detectedAssessmentType = 'caregiver';
        }
        break;
      }
    }

    // Detect assessment intent
    if (input.includes('myself') || input.includes('my health') || input.includes('my risk')) {
      detectedAssessmentType = 'self';
    } else if (input.includes('just curious') || input.includes('general information') || input.includes('learning about')) {
      detectedAssessmentType = 'curious';
    }

    return {
      userName: detectedUserName,
      careRecipientName: detectedCareRecipient,
      assessmentType: detectedAssessmentType
    };
  };

  // Check if user wants to take assessment (more specific now)
  const shouldRouteToAssessment = (userInput) => {
    const directAssessmentKeywords = [
      'take assessment', 'take the assessment', 'take the risk assessment', 'start assessment', 'start the assessment',
      'i want to take', 'begin assessment', 'do the assessment', 'answer questions',
      'answer some questions', 'take test', 'start test','quiz', 'take quiz','test', 'start test', 'take test'
    ];
    
    return directAssessmentKeywords.some(keyword => 
      userInput.toLowerCase().includes(keyword)
    );
  };

  // Check if user wants assessment for someone else
  const isAssessmentForOthers = (userInput) => {
    const input = userInput.toLowerCase();
    const forOthersKeywords = [
      'assessment for', 'take it for', 'for my', 'for someone', 'for a family member',
      'for my mom', 'for my dad', 'for my husband', 'for my wife', 'for my parent',
      'for my child', 'for my partner', 'on behalf of', 'help someone else',
      'someone i care about', 'family member', 'loved one'
    ];
    
    return forOthersKeywords.some(keyword => input.includes(keyword));
  };

  // Check if user is asking about risk (but not requesting assessment)
  const isRiskInquiry = (userInput) => {
    const riskKeywords = [
      'am i at risk', 'my risk', 'risk for', 'check my risk', 'evaluate my risk'
    ];
    
    return riskKeywords.some(keyword => 
      userInput.toLowerCase().includes(keyword)
    ) && !shouldRouteToAssessment(userInput);
  };

  // Check if user wants to find lifestyle programs
  const shouldRouteToPrograms = (userInput) => {
    const programKeywords = [
      'find prevention programs', 'find programs', 'lifestyle programs',
      'prevention programs', 'local programs', 'find a program', 'program near me',
      'diabetes prevention program', 'lifestyle change program'
    ];
    
    return programKeywords.some(keyword => 
      userInput.toLowerCase().includes(keyword)
    );
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
    
    // Extract context and update user state
    const contextUpdate = extractUserContext(inputValue);
    setUserState(prev => ({
      ...prev,
      ...contextUpdate,
      conversationContext: [...prev.conversationContext, inputValue]
    }));

    // Check if user wants to take assessment for someone else
    if (isAssessmentForOthers(inputValue)) {
      setIsTyping(true);
      const caregiverMessage = {
        id: Date.now() + 1,
        text: `That's wonderful that you're looking out for ${contextUpdate.careRecipientName || 'someone you care about'}${contextUpdate.userName ? `, ${contextUpdate.userName}` : ''}! Taking an assessment on behalf of a family member or loved one shows how much you care about their health.`,
        sender: 'bot',
        timestamp: new Date(),
        quickOptions: ["Take assessment for them", "Learn about caregiver resources", "Tell me more about their health"]
      };
      setMessages(prev => [...prev, caregiverMessage]);
      setIsTyping(false);
      setInputValue('');
      return;
    }

    // Check if user wants to take assessment
    if (shouldRouteToAssessment(inputValue)) {
      setIsTyping(true);
      
      // Determine context for routing message
      const isForOthers = contextUpdate.assessmentType === 'caregiver' || contextUpdate.careRecipientName;
      const recipientName = contextUpdate.careRecipientName;
      
      // First message - announce the routing
      const routingMessage1 = {
        id: Date.now() + 1,
        text: `Excellent!${contextUpdate.userName ? ` ${contextUpdate.userName}, ` : ' '}I'll take you to our risk assessment page where you can get a ${isForOthers ? `personalized evaluation for ${recipientName || 'your loved one'}` : 'personalized evaluation'}.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, routingMessage1]);
      
      // Add a pause and second message
      setTimeout(() => {
        const routingMessage2 = {
          id: Date.now() + 2,
          text: isForOthers ? 
            `Taking you there now... The assessment will help us understand ${recipientName ? `${recipientName}'s` : 'their'} specific situation and provide tailored recommendations for their care.` :
            "Taking you there now... The assessment will help us understand your specific situation and provide tailored recommendations.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, routingMessage2]);
        setIsTyping(false);
        
        // Route to assessment page after longer delay but keep chat open
        setTimeout(() => {
          if (onNavigate) {
            console.log('Chatbot: Attempting to navigate to risk-assessment page');
            onNavigate('risk-assessment');
            // Scroll to the assessment selection section
            setTimeout(() => {
              const element = document.getElementById('assessment-selection');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          } else {
            console.error('Chatbot: onNavigate function not available');
          }
        }, 3000);
      }, 2000);
      
      setInputValue('');
      return;
    }

    // Check if user wants to find programs
    if (shouldRouteToPrograms(inputValue)) {
      setIsTyping(true);
      
      // First message - announce the routing
      const routingMessage1 = {
        id: Date.now() + 1,
        text: `Great idea${contextUpdate.userName ? `, ${contextUpdate.userName}` : ''}! I'll take you to our lifestyle change programs page where you can find CDC-recognized programs in your area.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, routingMessage1]);
      
      // Add a pause and second message
      setTimeout(() => {
        const routingMessage2 = {
          id: Date.now() + 2,
          text: "Taking you there now... You'll be able to search for programs by location and choose between in-person, virtual, or on-demand options.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, routingMessage2]);
        setIsTyping(false);
        
        // Route to programs page after longer delay but keep chat open
        setTimeout(() => {
          if (onNavigate) {
            console.log('Chatbot: Attempting to navigate to lifestyle-programs page');
            onNavigate('lifestyle-programs');
            // Scroll to top for programs page
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          } else {
            console.error('Chatbot: onNavigate function not available for programs');
          }
        }, 3000);
      }, 2000);
      
      setInputValue('');
      return;
    }

    // Check if user is asking about risk (provide guidance instead of immediate routing)
    if (isRiskInquiry(inputValue)) {
      setIsTyping(true);
      const riskGuidanceMessage = {
        id: Date.now() + 1,
        text: `That's a great question${contextUpdate.userName ? `, ${contextUpdate.userName}` : ''}! Understanding your personal risk factors is important. I'd recommend taking our risk assessment to get personalized insights. Would you like to get started?`,
        sender: 'bot',
        timestamp: new Date(),
        quickOptions: ["Answer some questions", "Learn more about diabetes", "Tell me about prevention"]
      };
      setMessages(prev => [...prev, riskGuidanceMessage]);
      setIsTyping(false);
      setInputValue('');
      return;
    }

    setInputValue('');
    setIsTyping(true);

    // Get AI response with context
    try {
      const botResponseText = await getBotResponse(inputValue, contextUpdate);
      const botResponse = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try asking your question again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);
    }
  };

  const getBotResponse = async (userInput, contextUpdate = null) => {
    try {
      // Build personalized context
      const currentState = contextUpdate || userState;
      const personalContext = [];
      
      if (currentState.userName) {
        personalContext.push(`User's name: ${currentState.userName}`);
      }
      if (currentState.careRecipientName) {
        personalContext.push(`Care recipient: ${currentState.careRecipientName}`);
      }
      if (currentState.assessmentType) {
        personalContext.push(`Assessment context: ${currentState.assessmentType}`);
      }

      const contextString = personalContext.length > 0 ? 
        `\n\nPersonal Context: ${personalContext.join(', ')}` : '';

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a Chronic Disease Prevention Assistant for the CDC: Path2Prevention program. You help people learn about preventing chronic diseases including diabetes, heart disease, stroke, COPD, and obesity.${contextString}

Key guidelines:
- Provide evidence-based health information
- Keep responses concise and helpful (2-3 sentences max)
- Utilize plain language and avoid using jargon
- Always suggest taking risk assessment when appropriate
- Mention lifestyle changes like diet, exercise, and avoiding tobacco
- Be encouraging and supportive
- If asked about medical advice, remind users to consult healthcare providers
- Focus on prevention strategies and CDC resources
- Use a professional but friendly tone appropriate for a government health website
- If you know the user's name, use it occasionally to personalize the conversation
- If they mention someone they care for, remember their name and ask about them
- If someone asks about taking an assessment or mentions risk evaluation, encourage them to take the risk assessment
- Be attentive to whether they're asking for themselves, someone they care about, or just general information
- When someone wants to take an assessment for a family member or loved one, acknowledge their caring role and provide caregiver-focused guidance
- Use names of care recipients when known (e.g., "Sarah's health", "your mom's risk factors")
- Be supportive of caregivers and recognize the challenges of advocating for someone else's health

Available resources to mention:
- The risk assessment on this website for various chronic diseases
- Local lifestyle change programs (CDC-recognized programs that reduce diabetes risk by 58%)
- Educational videos and interactive tools
- CDC prevention guidelines and recommendations
- In-person, hybrid,virtual, and on-demand program options`
            },
            {
              role: 'user',
              content: userInput
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      // Fallback to basic responses if API fails
      const input = userInput.toLowerCase();
      
      if (input.includes('diabetes')) {
        return "I can help you learn about diabetes prevention. Key steps include maintaining a healthy weight, eating a balanced diet, and staying physically active. Would you like to take our risk assessment?";
      }
      if (input.includes('heart')) {
        return "Heart disease is preventable through lifestyle changes like regular exercise, healthy eating, not smoking, and managing stress. What specific aspect would you like to know more about?";
      }
      if (input.includes('risk') || input.includes('assessment')) {
        return "Our risk assessment can help identify your personal risk factors for chronic diseases. It takes just a few minutes and provides personalized recommendations. Would you like to try it out?";
      }
      
      return "I'm here to help with chronic disease prevention information. You can ask me about diabetes, heart disease, stroke and obesity prevention strategies.";
    }
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
    "Take the risk assessment",
    "Find a program"
  ];

  const handleQuickAction = async (action) => {
    const userMessage = {
      id: Date.now(),
      text: action,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Check if this action is caregiver-specific
    if (action === "Take assessment for them") {
      setIsTyping(true);
      
      // First message - announce the routing for caregiver
      const routingMessage1 = {
        id: Date.now() + 1,
        text: `Perfect! I'll take you to our risk assessment page where you can complete an evaluation for ${userState.careRecipientName || 'your loved one'}.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, routingMessage1]);
      
      // Add a pause and second message
      setTimeout(() => {
        const routingMessage2 = {
          id: Date.now() + 2,
          text: `Navigating to the assessment now... This will help create a prevention plan tailored for ${userState.careRecipientName ? `${userState.careRecipientName}'s` : 'their'} specific needs.`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, routingMessage2]);
        setIsTyping(false);
        
        // Route to assessment page after longer delay but keep chat open
        setTimeout(() => {
          if (onNavigate) {
            onNavigate('risk-assessment');
            // Scroll to the assessment selection section
            setTimeout(() => {
              const element = document.getElementById('assessment-selection');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          }
        }, 3000);
      }, 2000);
      return;
    }

    // Check if this action should route to programs
    if (shouldRouteToPrograms(action)) {
      setIsTyping(true);
      
      // First message - announce the routing to programs
      const routingMessage1 = {
        id: Date.now() + 1,
        text: "Perfect! I'll take you to our lifestyle change programs page where you can find CDC-recognized programs in your area.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, routingMessage1]);
      
      // Add a pause and second message
      setTimeout(() => {
        const routingMessage2 = {
          id: Date.now() + 2,
          text: "Taking you there now... You'll find programs available in-person, virtually, or on-demand to fit your schedule and preferences.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, routingMessage2]);
        setIsTyping(false);
        
        // Route to programs page after longer delay but keep chat open
        setTimeout(() => {
          if (onNavigate) {
            onNavigate('lifestyle-programs');
            // Scroll to top for programs page
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          }
        }, 3000);
      }, 2000);
      return;
    }

    // Check if this action should route to assessment
    if (shouldRouteToAssessment(action)) {
      setIsTyping(true);
      
      // Determine context for routing message
      const isForOthers = userState.assessmentType === 'caregiver' || userState.careRecipientName;
      const recipientName = userState.careRecipientName;
      
      // First message - announce the routing
      const routingMessage1 = {
        id: Date.now() + 1,
        text: `Perfect! Let me take you to our risk assessment page where you can get a ${isForOthers ? `personalized evaluation for ${recipientName || 'your loved one'}` : 'personalized evaluation'}.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, routingMessage1]);
      
      // Add a pause and second message
      setTimeout(() => {
        const routingMessage2 = {
          id: Date.now() + 2,
          text: isForOthers ? 
            `Navigating to the assessment now... This will help create a prevention plan tailored for ${recipientName ? `${recipientName}'s` : 'their'} specific needs.` :
            "Navigating to the assessment now... This will help us create a prevention plan tailored just for you!",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, routingMessage2]);
        setIsTyping(false);
        
        // Route to assessment page after longer delay but keep chat open
        setTimeout(() => {
          if (onNavigate) {
            onNavigate('risk-assessment');
            // Scroll to the assessment selection section
            setTimeout(() => {
              const element = document.getElementById('assessment-selection');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          }
        }, 3000);
      }, 2000);
      return;
    }

    setIsTyping(true);

    try {
      const botResponseText = await getBotResponse(action);
      const botResponse = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try asking your question again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);
    }
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
            backgroundColor: 'var(--mood-dark-navy)',
            color: 'white',
            padding: '16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'white' }}>
                Prevention Assistant
              </h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, color: 'white' }}>
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
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
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
              <div key={message.id}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    backgroundColor: message.sender === 'user' ? 'var(--mood-dark-navy)' : '#f1f5f9',
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
                {/* Quick Options for this message */}
                {message.quickOptions && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    marginTop: '8px',
                    marginLeft: '8px'
                  }}>
                    {message.quickOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(option)}
                        style={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '15px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          color: '#475569',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          alignSelf: 'flex-start'
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
                        {option}
                      </button>
                    ))}
                  </div>
                )}
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
                  backgroundColor: inputValue.trim() ? 'var(--mood-dark-navy)' : '#94a3b8',
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
          backgroundColor: 'var(--mood-dark-navy)',
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
            e.target.style.filter = 'brightness(1.1)';
          }
        }}
        onMouseOut={(e) => {
          if (!isOpen) {
            e.target.style.transform = 'scale(1)';
            e.target.style.filter = 'brightness(1)';
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
