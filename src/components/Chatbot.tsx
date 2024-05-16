import React, { useState } from 'react';
import { SiChatbot } from 'react-icons/si'; // Import the chatbot icon
import { FaExpand, FaCompress } from 'react-icons/fa'; // Import expand/compress icons

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLarge, setIsLarge] = useState(false); // State to manage the size of the chatbox
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { type: 'bot', text: 'Let me help you set some goals to improve your sustainability!' },
    { type: 'bot', text: 'Or ask me:\n - How do I reduce my water usage?\n - How can I reduce my food waste?\n - How do I begin composting?' }
  ]); // Initial message

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const toggleSize = () => {
    setIsLarge(!isLarge);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage: Message = { type: 'user', text: prompt };
    setChatHistory(prevHistory => [...prevHistory, userMessage]);
    setPrompt('');

    try {
      const res = await fetch('http://localhost:5001/call-bedrock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const botMessage: Message = { type: 'bot', text: data.answer };
      setChatHistory(prevHistory => [...prevHistory, botMessage]);
    } catch (error) {
      console.error('Error fetching the API:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleChatbox}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg focus:outline-none"
      >
        <SiChatbot size={30} />
      </button>
      {isOpen && (
        <div className={`bg-white p-4 rounded shadow-lg mt-2 ${isLarge ? 'w-160 h-192' : 'w-80 h-96'} flex flex-col`}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Chatbot</h2>
            <button onClick={toggleSize} className="text-gray-500 focus:outline-none">
              {isLarge ? <FaCompress size={20} /> : <FaExpand size={20} />}
            </button>
          </div>
          <div className="flex-grow overflow-y-auto mb-2">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded max-w-max ${
                  message.type === 'user' ? 'bg-blue-100 self-end text-right' : 'bg-gray-100 self-start text-left'
                }`}
                style={{ whiteSpace: 'pre-wrap' }} 
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="mt-auto">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              className="w-full p-2 border rounded"
              placeholder="Enter your prompt"
            />
            <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded w-full">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
