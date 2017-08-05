const express = require('express');
const router = express.Router();
const conversation = require('../models/conversation');

router.get('/', function (req, res) {
    const limit = req.params.limit;
    const startDate = req.params.startDate;
    const endDate = req.params;
    let filter = {};
    if (startDate && endDate) {
        filter = {
            $and: [{ created_at: { $lte: startDate } }, { created_at: { $gte: endDate } }]
        };
    }

    conversation.find(filter, (err, conversations) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(conversations);
    })
    .limit(limit)
    .sort({ created_at: 1 })
});

router.post('/', (req, res) => {
    const data = new conversation({
        transcript: req.body.transcript,
        documents: {
            score: req.body.documents.score
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