const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const modelBarang = require("./../models/barang");

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads")
    }, filename: function(req, file, cb){
        let namaFile = req.body.id;
        let extension = file.originalname.split(".")[1];
        cb(null, namaFile + "." + extension);
    }
});

var upload = multer({storage: storage});

router.get("/", async function(req, res){
    let hasil = await modelBarang.get();
    if (hasil.length > 0) return res.status(200).send(hasil);
    else return res.status(400).send("No data selected");
});

router.get("/:id", async function(req, res){
    let hasil = await modelBarang.getId(req.params.id);
    if (hasil.length > 0) return res.status(200).send(hasil[0]);
    else return res.status(400).send("No data selected");
})

router.get("/:id/:base", async function(req, res){
    let hasil = await modelBarang.getId(req.params.id);
    if (hasil.length <= 0) return res.status(400).send("No data selected");
    else {
        const rates = await axios.get("https://api.ratesapi.io/api/latest?base=IDR");

        //let hargaSaatIni = hasil[0]["barang_harga"] * rates.data["rates"][req.params.base];
        //let kembalian = hasil[0]["barang_harga"] + " -- " + hargaSaatIni;

        hasil[0]["barang_harga"] = hasil[0]["barang_harga"] * rates.data["rates"][req.params.base];

        return res.status(200).send(hasil[0]);
        
    }        
})

router.post("/", upload.single("image"), async function(req, res){
    let param = {
        id: req.body.id,
        nama: req.body.nama,
        stok: req.body.stok,
        harga: req.body.harga 
    }

    let hasil = await modelBarang.add(param);
    if (hasil != "") res.status(200).send(hasil);
    else res.status(400).send("Insert failed!");
})

router.put("/", upload.single("image"), async function(req, res){
    var kecuali = "." + req.file.originalname.split(".")[1];        

    var tipeFile = [".png", ".jpeg", ".jpg", ".gif"];
    for (i=0; i<tipeFile.length; i++){
        try {
            if (tipeFile[i] != kecuali) fs.unlinkSync("./uploads/" + req.body.id + tipeFile[i]);
        } catch (error) {
            
        }
    }

    let param = {
        id: req.body.id,
        nama: req.body.nama,
        stok: req.body.stok,
        harga: req.body.harga 
    }    

    let hasil = await modelBarang.put(param);

    if (hasil != "") res.status(200).send(hasil);
    else res.status(400).send("Update failed!");
});



module.exports = router;

