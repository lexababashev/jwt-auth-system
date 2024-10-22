const express = require('express');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();
const User = require('../models/User');

// Пример защищенного маршрута
router.get('/profile', protect, async (req, res) => {
    res.json({ message: 'Profile data', user: req.user });
});

// Получение всех пользователей
router.get('/allusers', protect, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Получаем всех пользователей без пароля

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error }); 
    }
});

// Пример маршрута только для администраторов
router.get('/admin', protect, admin, async (req, res) => {
    res.json({ message: 'Admin data' });
});

module.exports = router;