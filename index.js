const express = require("express");
const app = express();
const port = process.env.PORT  || 3000;

app.get("/budi", function(req, res){
	res.send("hai Budi!!!");
});

app.listen(port, function(){
	console.log("listening "+port);
});
