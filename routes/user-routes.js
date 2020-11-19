const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary");


const User = require("../models/user");

//ruta de User Account:
router.get('/user', (req, res, next) => {
    res.render('/user'); /* <-- para alterar */
});

router.post('/user/evolves', async (req, res, next) => {
    const idUser = req.userID;
    res.render('/'); /* <-- para alterar */
})

router.get('/user/userDetails', (req, res, next) => {
    res.render('/userDetails');
})

router.post('/user/userDetails', uploadCloud.single("userPhoto"), async (req, res, next) => {
    let idUser = req.userID;
    const { name, email, address, phone } = req.body;
    const userPhoto = req.file.url;
    try {
        let updateUser = await User.findByIdAndUpdate(idUser, { name, email, address, phone, userPhoto }, { new: true });
        res.redirect('/user/userDetails');
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