const request_promise = require("request-promise");
const express = require("express");
const math = require("math");
const vaccines = require("./vaccines");


const app = express();
app.use(express.json());
const port = 3000;
const user_agents = [
    {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'},
    {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'},
    {'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36'},
    {'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36'},
    {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 6P Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36'},
]

app.get('/check_vaccine', (req, res) => {
    let pincode = req.body.pincode;
    let age = req.body.age; // Can be 18 or 45 only
    let html = vaccines.get_vaccine_data(age, pincode, (vaccines_dates, vaccines_centres) => {
        res.json({
            dates: vaccines_dates,
            centres: vaccines_centres
        });
    });
});

app.listen(port, ()=>console.log(`Listening on http://localhost:${port}`));
