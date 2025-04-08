import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { messages } = await request.json();
    
    // Get the API key from environment variables
    const apiKey = process.env.MISTRAL_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'Mistral API key is not configured' }, { status: 500 });
    }
    
    // Make a request to Mistral API
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small-latest', // Using a smaller model for faster responses
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    
    // Extract the assistant's response
    const assistantResponse = response.data.choices[0].message;
    
    return NextResponse.json({ message: assistantResponse });
  } catch (error) {
    console.error('Error calling Mistral API:', error.response?.data || error.message);
    
    return NextResponse.json(
      { error: 'Failed to communicate with Mistral AI' }, 
      { status: 500 }
    );
  }
} 