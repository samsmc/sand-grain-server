const express = require("express");
const router = express.Router();
const withAuth = require("../helpers/middleware");

const User = require("../models/user");

//ruta de User y User Account:
router.get('/user', withAuth, (req, res, next) => {
    res.render('/'); /* <-- para alterar */
});

router.post('/user/evolves', withAuth, async (req, res, next) => {
    let idUser = req.userID;
    const {name, email, address} = req.body;
    res.render('/'); /* <-- para alterar */
})

router.get('/userDetails', withAuth, (req, res, next) => {
    res.render('/userDetails');
})

router.post('/userDetails', withAuth, async (req, res, next) => {
    let idUser = req.userID;
    const {name, email, address, phone} = req.body;
    try{
      let updateUser = await User.findByIdAndUpdate(idUser, {name, email, address, phone}, {new:true});  
      res.redirect('/user');  
    } catch(err){
        console.log(err)
    }
});



module.exports = router; 