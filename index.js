const express = require("express");
const app = express();
const port = process.env.port || 3000;

app.get("/budi", function(req, res){
	res.send("hai Budi!!!");
});

app.listen(port);
console.log("Ini lho bro.... "+port);