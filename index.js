const express = require("express");
const barang = require("./routes/barang");
const app = express();
const port = process.env.port || 3000;

require("dotenv").config();

app.use(express.urlencoded({extended:true}));
app.use("/api/barang", barang);

app.listen(port);
console.log("Listening...");