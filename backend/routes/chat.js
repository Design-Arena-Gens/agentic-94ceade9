import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const ayurvedicResponses = {
  greetings: [
    "Namaste! I'm your Ayurvedic wellness guide. How may I assist you today?",
    "Welcome to AnnapurnaAI! I'm here to help with ancient wisdom for modern health."
  ],
  diet: "In Ayurveda, diet should align with your dosha (body constitution). Vata types benefit from warm, moist foods. Pitta types need cooling foods. Kapha types thrive with light, warm, and spicy foods.",
  digestion: "Agni (digestive fire) is central in Ayurveda. To improve digestion: eat warm foods, avoid cold drinks during meals, include ginger and cumin, and maintain regular meal times.",
  stress: "For stress, Ayurveda recommends: Ashwagandha herb, Brahmi for mental clarity, daily meditation, abhyanga (oil massage), and pranayama (breathing exercises).",
  immunity: "Boost immunity with: Chyawanprash daily, turmeric milk, amla (Indian gooseberry), tulsi tea, and adequate sleep. Avoid cold foods and maintain routine.",
  sleep: "Ayurvedic tips for better sleep: warm milk with nutmeg, abhyanga before bed, avoid screens 1 hour before sleep, sleep by 10 PM, and practice meditation.",
};

router.post('/message', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const lowerMessage = message.toLowerCase();

    let response = "I can help you with Ayurvedic food recommendations, dosha balance, herbs, and wellness practices. Please ask about digestion, immunity, stress, diet, or specific health concerns.";

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
      response = ayurvedicResponses.greetings[Math.floor(Math.random() * ayurvedicResponses.greetings.length)];
    } else if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      response = ayurvedicResponses.diet;
    } else if (lowerMessage.includes('digest') || lowerMessage.includes('stomach') || lowerMessage.includes('acidity')) {
      response = ayurvedicResponses.digestion;
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('worry')) {
      response = ayurvedicResponses.stress;
    } else if (lowerMessage.includes('immun') || lowerMessage.includes('sick') || lowerMessage.includes('cold')) {
      response = ayurvedicResponses.immunity;
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      response = ayurvedicResponses.sleep;
    }

    res.json({
      message: response,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
