const express = require("express");
const app = express();
const port = 5000;
const bp = require("body-parser");
const qr = require("qrcode");

app.set("view engine", "ejs");
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());

app.get("/", (req,res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {
    const merchant = req.body.url;
    if (merchant.length === 0) res.send("Enter a Number!");
    var serversite = "https://software-red.au-syd.mybluemix.net/sitmein/test?merchant=";
    var url = serversite.concat(merchant);
    console.log(url);
    qr.toDataURL(url, (err,src) => {
        if(err) res.send("Error occured!");
        
        res.render("scan", {src});
    });

})

app.listen(port, () => console.log("Server at 5000"));
