const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = (req, res) =>{
    bcrypt.hash(req.body.password,10)
    .then((hash)=>{
        const user = new User({
            email : req.body.email,
            password : hash
        });
        user.save()
        .then((result) =>{
            res.status(202).json({
                message : "User Created"
                
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Internal Server Error"
            });
        });
    });

};



const login = (req, res) => {
    let fetchedUser;

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth Failed, Email not Exists!",
                });
            }
            fetchedUser = user;

            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth Failed, Invalid Password!",
                });
            }

            const expiresIn = 3600; // Expiry in seconds (1 hour)
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                "kuncisi5bpaw",
                { expiresIn: expiresIn }
            );

            // Hitung tanggal kedaluwarsa
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresIn * 1000);

            // Kirim token dan expirationDate ke frontend
            res.status(200).json({
                token: token,
                expiresIn: expiresIn,
                expirationDate: expirationDate.toISOString(), // Format ISO
            });
        })
        .catch((err) => {
            return res.status(401).json({
                message: "Auth Failed!",
            });
        });
};


module.exports = {signUp, login}