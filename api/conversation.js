const express = require('express');
const router = express.Router();
const conversation = require('../models/conversation');

router.get('/', function(req, res) {
    conversation.find({}, (err, conversations) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(conversations);
    });
});

router.post('/', (req, res) => {
    const data = new conversation({
        transcript: req.body.transcript,
        score: req.body.score,
        sentiment: {
            pos: req.body.sentiment.pos,
            neg: req.body.sentiment.neg
        }
    });

    data.save((err, conversation) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(conversation);
    })
});

module.exports = router;