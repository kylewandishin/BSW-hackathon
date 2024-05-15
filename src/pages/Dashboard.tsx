import React, { useState } from 'react';
import CircularProgressBarProps from '../components/circularrogressbar';

const Dashboard: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/call-bedrock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.answer);
    } catch (error) {
      console.error('Error fetching the API:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded"
          placeholder="Enter your prompt"
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
      {response && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-2xl font-semibold mb-2">Response:</h2>
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
      {/* circular progressbarprops with text val of 76 */}
      <CircularProgressBarProps value={76} text={'75%'} />
    </div>
  );
};

export default Dashboard;
