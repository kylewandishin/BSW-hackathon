const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create Bedrock service object
const bedrock = new AWS.BedrockRuntime();

app.post('/call-bedrock', async (req, res) => {
  const { prompt } = req.body;

  const params = {
    modelId: 'anthropic.claude-v2',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
      max_tokens_to_sample: 100,
      temperature: 0.5,
      top_k: 250,
      top_p: 1,
      stop_sequences: ['\n\nHuman:'],
      anthropic_version: 'bedrock-2023-05-31'
    })
  };

  try {
    const bedrockReturn = await bedrock.invokeModel(params).promise();
    const buffer = Buffer.from(bedrockReturn.body);
    const responseString = buffer.toString('utf-8');
    const responseJSON = JSON.parse(responseString);
    const answer = responseJSON.completion;
    res.json({ answer });
  } catch (error) {
    console.error('Error querying the AI model:', error);
    res.status(500).json({ error: 'Error querying the AI model' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
