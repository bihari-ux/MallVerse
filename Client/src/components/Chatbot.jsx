import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (messageText) => {
    try {
      const response = await fetch(
        "https://n8n-latest-oztq.onrender.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: messageText }),
        }
      );

      const data = await response.json();
      console.log(data);
      return data.output || "Sorry, I didn't get that.";
    } catch (error) {
      console.error("Error sending message:", error);
      return "Oops! Something went wrong while connecting to the server. Please ensure your production URL is correct.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    const botResponse = await sendMessage(userMessage);

    setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button 
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          borderRadius: '50%',
          width: '65px',
          height: '65px',
          zIndex: 1050,
          boxShadow: '0 6px 15px rgba(0, 123, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          background: 'linear-gradient(135deg, #007bff, #0056b3)',
          border: 'none'
        }}
        className="rounded-circle text-white"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 123, 255, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 123, 255, 0.4)';
        }}
      >
        {isOpen ? (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card style={{
          position: 'fixed',
          bottom: '105px',
          right: '30px',
          width: '380px',
          height: '550px',
          zIndex: 1050,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '15px',
          overflow: 'hidden',
          border: 'none',
          fontFamily: "'Inter', 'Roboto', sans-serif"
        }}>
          {/* Header */}
          <Card.Header className="text-white d-flex justify-content-between align-items-center py-3" style={{ background: '#007bff', border: 'none', borderRadius: '15px 15px 0 0' }}>
            <div className="d-flex align-items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <strong style={{ fontSize: '18px', fontWeight: '600' }}>Support Chat</strong>
            </div>
            <Button variant="close" onClick={toggleChat} style={{ filter: 'invert(1)', opacity: 0.8 }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.8}></Button>
          </Card.Header>
          
          {/* Body */}
          <Card.Body style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#f4f7f6', padding: '20px' }}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? '#007bff' : '#ffffff',
                  color: msg.sender === 'user' ? 'white' : '#333',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  maxWidth: '85%',
                  fontSize: '15px',
                  lineHeight: '1.5',
                  wordBreak: 'break-word',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  border: msg.sender === 'bot' ? '1px solid #eaeaea' : 'none'
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{ 
                alignSelf: 'flex-start', 
                backgroundColor: '#ffffff', 
                padding: '12px 16px', 
                borderRadius: '18px 18px 18px 4px', 
                border: '1px solid #eaeaea', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '5px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}>
                <span className="spinner-grow spinner-grow-sm" style={{ width: '6px', height: '6px', backgroundColor: '#aaa' }} role="status"></span>
                <span className="spinner-grow spinner-grow-sm" style={{ width: '6px', height: '6px', backgroundColor: '#aaa', animationDelay: '0.2s' }} role="status"></span>
                <span className="spinner-grow spinner-grow-sm" style={{ width: '6px', height: '6px', backgroundColor: '#aaa', animationDelay: '0.4s' }} role="status"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </Card.Body>

          {/* Footer */}
          <Card.Footer className="bg-white p-3" style={{ borderTop: '1px solid #eaeaea' }}>
            <Form onSubmit={handleSend} className="d-flex align-items-center gap-2">
              <Form.Control 
                type="text" 
                placeholder="Type your message..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                style={{ 
                  borderRadius: '25px', 
                  padding: '12px 18px', 
                  border: '1px solid #ddd', 
                  boxShadow: 'none', 
                  fontSize: '15px',
                  backgroundColor: '#f9f9f9'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#007bff'; e.target.style.backgroundColor = '#ffffff'; }}
                onBlur={(e) => { e.target.style.borderColor = '#ddd'; e.target.style.backgroundColor = '#f9f9f9'; }}
              />
              <button 
                type="submit" 
                disabled={loading || !input.trim()}
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '50%', 
                  backgroundColor: (input.trim() && !loading) ? '#007bff' : '#b0c4de', 
                  color: 'white', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background-color 0.2s, transform 0.2s',
                  cursor: (input.trim() && !loading) ? 'pointer' : 'not-allowed',
                  transform: (input.trim() && !loading) ? 'scale(1)' : 'scale(1)'
                }}
                onMouseEnter={(e) => { if(input.trim() && !loading) e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ transform: 'translateX(1px)' }}>
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                </svg>
              </button>
            </Form>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
