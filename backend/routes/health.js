import express from 'express';
import HealthLog from '../models/HealthLog.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/log', authMiddleware, async (req, res) => {
  try {
    const { weight, waterIntake, caloriesConsumed, sleep, steps, mood } = req.body;

    const healthLog = new HealthLog({
      userId: req.userId,
      weight,
      waterIntake,
      caloriesConsumed,
      sleep,
      steps,
      mood
    });

    await healthLog.save();
    res.status(201).json(healthLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/logs', authMiddleware, async (req, res) => {
  try {
    const logs = await HealthLog.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(30);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayLog = await HealthLog.findOne({
      userId: req.userId,
      date: { $gte: today }
    });

    const weekLogs = await HealthLog.find({
      userId: req.userId,
      date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    res.json({
      today: todayLog,
      week: weekLogs
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
