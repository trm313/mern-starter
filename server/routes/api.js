const express = require('express');

// Import data models
var Note = require('../models/note');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this dashboard"
    });
});

router.get('/notes/:id', (req, res) => {
    var userID = req.params.id;
    Note.find({ userID: userID }, function (err, notes) {
        if (err) return console.error(err);
        res.status(200).json(notes);
    });

});

router.post('/notes', (req, res) => {
    //console.log(req.body);
    var submission = new Note({
        userID: req.body.userID,
        note: req.body.note
    });
    //console.log(submission);

    submission.save(function (err, data) {
        if (err) return console.error(err);
        console.log(data);
    });
});

module.exports = router;