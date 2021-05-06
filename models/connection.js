const mysql = require("mysql");
const config = require("./../config");

const pool = mysql.createPool(config.database);

function getConn(){
    return new Promise(function (resolve, reject){
        pool.getConnection(function(err, result){
            if (err) reject(err);
            else resolve(result);
        })
    });
}

function doQuery(query, conn){
    return new Promise(function (resolve, reject){
        conn.query(query, function(err, result){
            if (err) reject(err);
            else resolve(result);
        });
    })
}

module.exports = {
    "executeQuery": doQuery,
    "getConnection": getConn
}