var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

var oglasi = [
    {
        "id": 1,
        "kategorija": "kategorija",
        "datum": "2022-05-12",
        "cena": 100,
        "tekstOglasa": "Ovo je tekst oglasa1",
        "tag": ["tag1", "tag2"],
        "email": "email@gmail.com"
    },
    {
        "id": 2,
        "kategorija": "kategorija2",
        "datum": "2022-05-22",
        "cena": 150,
        "tekstOglasa": "Ovo je tekst oglasa2",
        "tag": ["tag2", "tag3"],
        "email": "email2@gmail.com"
    }
]

app.get('/oglasi', function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(oglasi);
});

app.get("/oglasi/:id", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    var oglas = oglasi.filter(x => x.id == req.params.id)[0];
    console.log(oglas);
    res.json(oglas);
});

app.post('/oglasi', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    var oglas = {};
    oglas["id"] = sledeciId();
    oglas["kategorija"] = req.body.kategorija;
    oglas["datum"] = req.body.datum;
    oglas["cena"] = req.body.cena;
    oglas["tekstOglasa"] = req.body.tekstOglasa;
    oglas["tag"] = req.body.tag;
    oglas["email"] = req.body.email;

    console.log(oglas);

    oglasi.push(oglas);

    res.end("OK");
});

app.put('/oglasi/:id', (req, res) => {
    oglasi.forEach(oglas => {
        if (oglas.id == req.params.id) {
            oglas["kategorija"] = req.body.kategorija;
            oglas["datum"] = req.body.datum;
            oglas["cena"] = req.body.cena;
            oglas["tekstOglasa"] = req.body.tekstOglasa;
            oglas["tag"] = req.body.tag;
            oglas["email"] = req.body.email;
        }
    });

    res.end('OK');
});

app.delete('/oglasi/:id', (req, res) => {
    oglasi = oglasi.filter(x => x.id != req.params.id);
    res.end('OK');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function sledeciId() {
    var id = oglasi[oglasi.length - 1].id + 1;
    return id;
}