const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Event = require("../models/event");
const User = require("../models/user");

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
} = require("../helpers/middlewares");

// POST route => to create a new event
router.post("/add-event", isLoggedIn(), (req, res, next) => {
    Event.create({
        organizer: req.session.currentUser,
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        location: req.body.location,
        participantsLimit: req.body.participantsLimit,
        date: req.body.date,
        time: req.body.time,
        category: req.body.category,
        stars: req.body.stars,
    })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        });
});

// POST route => to create a new event
router.post("/add-participant-to-event", (req, res, next) => {
    let eventId = req.body.event;
    let user = req.body.user;

    console.log(`Event: ${eventId}  User: ${user}`)

    Event.findByIdAndUpdate(eventId,
        { $addToSet: { participants: user } }
    ).then(response => {
        res.json(response);
    })
    .catch(err => {
        res.json(err);
    });
});

// GET route => to get all the events
router.get('/', (req, res, next) => {
    Event.find().populate('organizer').populate('participants')
        .then(allTheEvents => {
            res.json(allTheEvents);
        })
        .catch(err => {
            res.json(err);
        })
});

// GET route => to get a specific event/detailed view
router.get('/:id', (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    // our projects have array of tasks' ids and
    // we can use .populate() method to get the whole task objects

    Event.findById(req.params.id).populate('participants')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.json(err);
        })
})

// PUT route => to update a specific event
router.put('/edit/:id', isLoggedIn(), (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Event.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.json({ message: `Event with ${req.params.id} is updated successfully.` });
        })
        .catch(err => {
            res.json(err);
        })
})

// DELETE route => to delete a specific event
router.delete('/delete/:id', isLoggedIn(), (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Event.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({ message: `Event with ${req.params.id} is removed successfully.` });
        })
        .catch(err => {
            res.json(err);
        })
});





module.exports = router;