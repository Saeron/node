const express = require('express');

const queris = require('./states.queries');

const router = express.Router();

router.get('/', async (req, res) => {
    const states = await queris.find();
    res.json(states);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const state = await queris.get(parseInt(id) || 0);
        if (state) {
            return res.json(state);
        }
        return next();
    } catch (error) {
        next(error);
    }
});

module.exports = router;