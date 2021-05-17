const express = require("express");
const admin = require("firebase-admin");
const path = require("path");
const axios = require("axios");
const { body, validationResult } = require('express-validator');
const otp_generator = require('otp-generator')

var serviceAccount = require("./creds/serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const backend_url = "http://localhost:3000";
const port = 3001;
const db = admin.firestore();
const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '/pages/index.html'));
});

function add_user(user) {
    console.log("trying to add user");
    axios.post(backend_url+"/add_user", user).then((res) => {
        console.log(res);
    }).catch((e) => {
        console.error(e);
    });
}

app.post('/sign_up',
        body('age').isNumeric(),
        body('email').isEmail().normalizeEmail(), 
        (req, res) => {
    const errors = validationResult(req);
    try {
        req.body.district = req.body.district.slice(1, -1);
        console.log(req.body);
    } catch(e) {
        console.log(e);
    }
    let otp = otp_generator.generate(6, { upperCase: false, specialChars: false});
    if (!errors.isEmpty()) {
        if (errors.array().length == 1 && errors.array()[0].param=='email') {
            try {
                add_user({
                    age: parseInt(req.body.age),
                    otp: otp,
                    state: req.body.state,
                    email: null,
                    district: req.body.district    
                });
            } catch(e) {
                console.error(`Unable to communicate with the backend due to error ${e}`);
            }
            res.render(path.join(__dirname, '/pages/inner-page'), {
                summary: "Signed Up",
                message: "Signed Up Successfully.",
                link: "t.me/CowinAlerter_bot",
                otp: `/otp ${otp}`
            });
            return;        
        }
        let msg = "Invalid ";
        errors.array().forEach((error) => {
            msg += error.param;
            msg += ", "
        });
        msg += " Please go back and re-enter the values."
        res.render(path.join(__dirname, '/pages/inner-page'), {
            summary: "Failed To Sign Up",
            message: msg,
            link: null
        });
    } else if (parseInt(req.body.age) < 18) {
        res.render(path.join(__dirname, '/pages/inner-page'), {
            summary: "Can't Sign Up",
            message: "Vaccines aren't available for people under 18 yet. If you made a mistake entering your age, please go back and change it.",
            link: null,
        })
    } else {
        try {
            add_user({
                age: parseInt(req.body.age),
                otp: `/otp ${otp}`,
                state: req.body.state,
                email: req.body.email,
                district: req.body.district    
            });
        } catch(e) {
            console.error(`Unable to communicate witht the backend ${e}`);
        }
        res.render(path.join(__dirname, '/pages/inner-page'), {
            summary: "Signed Up",
            message: "Signed Up Successfully.",
            link: "t.me/CowinAlerter_bot",
            otp: `/otp ${otp}`
        });
    }
});

app.listen(process.env.PORT || port, () => {
    console.log(`Started webserver in http://localhost:${port}`);
});
