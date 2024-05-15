import React, { useEffect, useState } from 'react';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import CircularProgressBar from '../components/circularrogressbar.tsx';

// bedrock accesskeys
// !should change this later to a method that can actually be deployed but will use this for now!
// Replace with aws rest api and lambda
const client = new BedrockRuntimeClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const Home: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const promptModel = async () => {
    // lil loading thing could replace with cool gif
    setLoading(true);
    const query = `Human: What color is the sky?\nAssistant:`;

    const params = {
      modelId: 'anthropic.claude-v2',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        prompt: query,
        max_tokens_to_sample: 100,
        temperature: 0.5,
        top_k: 250,
        top_p: 1,
        stop_sequences: ['\n\nHuman:'],
        anthropic_version: 'bedrock-2023-05-31',
      }),
    };

    try {
      // gets response and translates it from utf-8 to string
      const command = new InvokeModelCommand(params);
      const bedrockReturn = await client.send(command);

      const decoder = new TextDecoder('utf-8');
      const responseString = decoder.decode(bedrockReturn.body);

      const responseJSON = JSON.parse(responseString);
      const answer = responseJSON.completion;
      setResponse(answer);
      setLoading(false);
    } catch (err) {
      console.error('Error querying:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    promptModel();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6">
        <br></br>
        <br></br>
        {response ? (
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Response from CLAUDE!!!!
            </h2>
            <div className="bg-gray-100 p-4 rounded border overflow-x-auto">
              <pre className="whitespace-pre-wrap">{response}</pre>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No response yet.</p>
        )}
      </div>
      <CircularProgressBar value={75} text="75%" />
    </div>
  );
};

export default Home;
