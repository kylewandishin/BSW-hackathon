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

app.post('/get-sustainability-score', async (req, res) => {
  const { formData } = req.body;

  const fullPrompt = `Restaurant data: ${JSON.stringify(formData, null, 2)}\n\nGenerate a sustainability score for the restaurant based on the above data. Only return a single number 0-100 so I can input it as an int into my graph. Do not include words only numbers, Put the final score in brackets \n
Categories and Criteria for generating the score:
Energy Usage and Efficiency (20 points)

Gas or Electric Stove (5 points)
Electric Stove: 5 points
Gas Stove: 0 points
Green Energy Usage (5 points)
100% Green Energy: 5 points
75-99% Green Energy: 4 points
50-74% Green Energy: 3 points
25-49% Green Energy: 2 points
1-24% Green Energy: 1 point
0% Green Energy: 0 points
Power Usage Efficiency (10 points)
≤ 0.25 kWh per customer per week: 10 points
0.26-0.35 kWh per customer per week: 7 points
0.36-0.45 kWh per customer per week: 4 points
0.45 kWh per customer per week: 0 points

Water Usage (10 points)

≤ 25 gallons per customer per week: 10 points
26-35 gallons per customer per week: 7 points
36-45 gallons per customer per week: 4 points
45 gallons per customer per week: 0 points

Waste Management (20 points)

  Food Waste Dealing (10 points)
  Has food waste management practices: 10 points
  No food waste management practices: 0 points
  Recycling (5 points)
  Recycles: 5 points
  Does not recycle: 0 points
  Takeout Containers and Utensils (5 points)
  Compostable containers and utensils: 5 points
  Non-compostable containers and utensils: 0 points
  Sourcing Practices (30 points)

  Locally Sourced Ingredients (10 points)
  75-100% locally sourced: 10 points
  50-74% locally sourced: 7 points
  25-49% locally sourced: 4 points
  1-24% locally sourced: 1 point
  0% locally sourced: 0 points
  Sustainable Supplier (10 points)
  All suppliers are sustainable: 10 points
  Most suppliers are sustainable: 7 points
  Some suppliers are sustainable: 4 points
  No sustainable suppliers: 0 points
  Animal Products Sourcing (10 points)
  Grass-fed/Organic meat: 10 points
  Conventional meat: 0 points
  Menu and Customer Options (20 points)

  Vegan/Vegetarian Options (10 points)
  Offers vegan/vegetarian options: 10 points
  Does not offer vegan/vegetarian options: 0 points
  Customer Awareness and Education (10 points)
  Provides sustainability information to customers: 10 points
  Does not provide sustainability information: 0 points`;

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
    const score = responseJSON.completion.match(/\[(\d+)\]/)[1]; // Extract the number from brackets
    console.log('Received response from Bedrock:', score);
    res.json({ score });
  } catch (error) {
    console.error('Error querying the AI model:', error);
    res.status(500).json({ error: 'Error querying the AI model' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
