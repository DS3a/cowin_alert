const express = require("express");
const admin = require("firebase-admin");
const path = require("path");
const { body, validationResult } = require('express-validator');

var serviceAccount = require("./creds/serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const port = 3001 || process.env.PORT;
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

app.post('/sign_up',
        body('phone_number').isMobilePhone(),
        body('pin_code').isPostalCode("IN"),
        body('age').isNumeric(),
        body('email').isEmail().normalizeEmail(), 
        (req, res) => {
    const errors = validationResult(req);
    console.log(errors.array().length, errors.array());
    if (!errors.isEmpty()) {
        if (errors.array().length == 1 && errors.array()[0].param=='email') {
            db.collection('users').add({
                age: parseInt(req.body.age),
                phoneNumber: req.body.phone_number,
                pinCode: req.body.pin_code,
            });
            res.render(path.join(__dirname, '/pages/inner-page'), {
                summary: "Signed Up",
                message: "Signed Up Successfully, You can go back and add more Pincodes if you wish"
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
            message: msg
        });
    } else if (parseInt(req.body.age) < 18) {
        res.render(path.join(__dirname, '/pages/inner-page'), {
            summary: "Can't Sign Up",
            message: "Vaccines aren't available for people under 18 yet. If you made a mistake entering your age, please go back and change it."
        })
    } else {
        db.collection('users').add({
            age: parseInt(req.body.age),
            phoneNumber: req.body.phone_number,
            pinCode: req.body.pin_code,
            email: req.body.email
        });
        res.render(path.join(__dirname, '/pages/inner-page'), {
            summary: "Signed Up",
            message: "Signed Up Successfully, You can go back and add more Pincodes if you wish"
        });
    }
});

app.listen(port, () => {
    console.log(`Started webserver in http://localhost:${port}`);
});
