const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create Bedrock service object
const bedrock = new AWS.BedrockRuntime();

app.post('/call-bedrock', async (req, res) => {
  const { prompt, formData } = req.body;

  const fullPrompt = `User question: ${prompt}\n\nRestaurant data: ${JSON.stringify(formData, null, 2)}\n\nGive me recommendations to be more sustainable based on the above information.`;

  const params = {
    modelId: 'anthropic.claude-v2',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      prompt: `\n\nHuman: ${fullPrompt}\n\nAssistant:`,
      max_tokens_to_sample: 100,
      temperature: 0.5,
      top_k: 250,
      top_p: 1,
      stop_sequences: ['\n\nHuman:'],
      anthropic_version: 'bedrock-2023-05-31',
    }),
  };

  try {
    console.log('Sending request to Bedrock with params:', params);
    const bedrockReturn = await bedrock.invokeModel(params).promise();
    const buffer = Buffer.from(bedrockReturn.body);
    const responseString = buffer.toString('utf-8');
    const responseJSON = JSON.parse(responseString);
    const answer = responseJSON.completion;
    console.log('Received response from Bedrock:', answer);
    res.json({ answer });
  } catch (error) {
    console.error('Error querying the AI model:', error);
    res.status(500).json({ error: 'Error querying the AI model' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});