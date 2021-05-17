const express = require("express");
const vaccines = require("./vaccines");
const admin = require("firebase-admin");
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

const token = process.env.TELEGRAM_AUTH_TOKEN;
const bot = new TelegramBot(token, {
    polling: true
 });
var serviceAccount = require("./creds/serviceAccount.json");
const track_changes = require("./track_changes");
const { send_message } = require("./send_message");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const INTERVAL_TO_CHECK = 900000; // milliseconds -> 15 minutes


const app = express();
app.use(express.json());
const port = 3000;

app.get('/check_vaccine', (req, res) => {
    let state = req.body.state;
    let district = req.body.district;
    let age = req.body.age; // Can be 18 or 45 only
    let html = vaccines.get_vaccine_data(age, state, district, (vaccines_dates, vaccines_centres) => {
        res.json({
            dates: vaccines_dates,
            centres: vaccines_centres
        });
    });
});

app.post('/add_user', (req, res) => {
    let state = req.body.state;
    let district = req.body.district;
    let age = parseInt(req.body.age);
    if (age >= 18 && age < 45) {
        age = 18;
    } else if (age >= 45) {
        age = 45;
    }

    let email = req.body.email;
    let otp = req.body.otp;
    console.log(`otp is ${otp}`);
    db.collection("users").add({
        state: state,
        district: district,
        age: age,
        email: email,
        telegramId: null,
        otp: otp
    }).then(async () => {
        let districtsRef = db.collection("districts");
        let query = districtsRef
            .where("state", "==", state)
            .where("district", "==", district)
            .where("age", "==", age);
        query.get()
        .then(async (snapShot) => {
            let found = false;
            (await snapShot).forEach((doc) => {
                if (doc.data().district == district) {
                    found = true;
                    console.log('found');
                }
            });
            if (!found) {
                db.collection("districts").add({
                    age: age,
                    state: state,
                    district: district,
                    dates: null,
                    centres: null
                }).then(() => {
                    track_changes.track_changes(age, state, district, db);
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    });

    res.send("added user To the database");
});

bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
        chatId,
        'Hi please enter the OTP you got from the website, in the format `/otp {YOUR OTP}` (curly braces not inclusive)',
    );
 });

 
 bot.onText(/\/otp/, (msg, match) => {
    const chatId = msg.chat.id;
    const otp = match.input.split(' ')[1];
    console.log(otp);
    console.log(msg.chat.username);
    console.log(chatId);
    let found_otp = false;
    db.collection("users").where("otp", "==", otp)
    .get().then(async (snapShot) => {
        (await snapShot).forEach((doc) => {
            console.log('found user with otp', otp);
            found_otp = true;
            console.log(doc.data());
            db.collection("users").doc(doc.id).set({
                age: doc.data().age,
                email: doc.data().email,
                state: doc.data().state,
                district: doc.data().district,
                telegramId: msg.chat.id,
            })
        });
    })
    .then(() => {
        console.log(found_otp);
        if (found_otp) {
            bot.sendMessage(
                chatId,
                `Great work ${msg.chat.first_name}! we'll take it from here
and notify you whenever a new slot opens`,
            );        
        } else {
            bot.sendMessage(
                chatId,
                `Uh oh! The OTP you've entered seems wrong
Do go back and check again. Or you can generate a new OTP by signing up again`,
            );        
        }
    });
 });


function repeat_run(func_to_run) {
    func_to_run();
    setTimeout(() => {
        func_to_run();
        repeat_run(func_to_run);
    }, INTERVAL_TO_CHECK);
}

app.listen(process.env.PORT || port, () => {
    console.log(`Listening on http://localhost:${port}`);
    repeat_run(() => {
        db.collection("districts").get().then(async (docs) => {
            docs.forEach(async (district) => {
                let district_data = district.data(); // Assuming that there's a change
                let changes = await track_changes.track_changes(district_data.age, 
                        district_data.state, 
                        district_data.district, 
                        district, db, async (changes) => {
                    console.log(`got changes ${changes}`);
                    let there_is_change = changes[0];
                    let type = changes[1];
                    console.log(there_is_change);
                    console.log(type);
    
                    if (there_is_change) {
                        let users = db.collection("users")
                        .where("age", "==", district_data.age)
                        .where("state", "==", district_data.state)
                        .where("district", "==", district_data.district).get().then(async (docs) => {
                            docs.forEach(async (user) => {
                                let user_data = user.data();
                                if (user_data.age == district_data.age && 
                                        user_data.state == district_data.state && 
                                        user_data.district == district_data.district) {
                                    send_message(
                                        user_data.telegramId, 
                                        user_data.email, 
                                        user_data.district, 
                                        type,
                                        bot);
                                    }
                            })
                        });
                    }
                });                
            });
        });
    });
});
