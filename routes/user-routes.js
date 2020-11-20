const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary");


const User = require("../models/user");

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

router.post('/userDetails/:id', async (req, res, next) => {
    let idUser = req.params.id;
    const { username, email, address, phone } = req.body;
        try {
        let updateUser = await User.findByIdAndUpdate(idUser, { username, email, address, phone }, { new: true });
        res.status(200).json(updateUser)
    } catch (err) {
        console.log(err)
    }
});

router.get('/userJoinedEvents', (req, res, next) => {

    try {
        res.redirect('/user/userJoinedEvents');
    } catch (err) {
        console.log(err, "no events joined");
    }
});

router.get('/userCreatedEvents', (req, res, next) => {

    try {
        res.redirect('/user/userCreatedEvents');
    } catch (err) {
        console.log(err, "no events created");
    }
});


module.exports = router; 