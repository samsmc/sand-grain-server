const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary");
const { find } = require("../models/user");
const Event = require("../models/event")

const User = require("../models/user");

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
} = require("../helpers/middlewares");


//ruta de User Account:
router.get('/', (req, res, next) => {
    res.render('/'); /* <-- para alterar */
});

router.post('/evolves', async (req, res, next) => {
    const idUser = req.userID;
    res.render('/'); /* <-- para alterar */
})

router.get('/userDetails', (req, res, next) => {
    res.render('/userDetails');
})

router.put('/userDetails/:id', async (req, res, next) => {
    let idUser = req.params.id;
    const { username, email, address, phone } = req.body;
    try {
        let updateUser = await User.findByIdAndUpdate(idUser, { username, email, address, phone, userPhoto: req.body.imgUrl }, { new: true });
        res.status(200).json(updateUser)
    } catch (err) {
        console.log(err)
    }
});

router.get('/userJoinedEvents', isLoggedIn(), async (req, res, next) => {

    const joinedUserId = req.session.currentUser._id

    try {
        const joinedEventsFound = await Event.find({ participants: joinedUserId })
            console.log(joinedEventsFound)
            res.status(200).json(joinedEventsFound)
        
    } catch (err) {
        console.log(err, "no events created");
    }
});

router.get('/userCreatedEvents', isLoggedIn(), async (req, res, next) => {

    const userId = req.session.currentUser._id

    try {
        const userEventsFound = await Event.find({ organizer: userId })
console.log(userEventsFound)
res.status(200).json(userEventsFound)
        
    } catch (err) {
        console.log(err, "no events created");
    }
});


module.exports = router; 