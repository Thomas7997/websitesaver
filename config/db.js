const mysql = require('mysql2');
require('dotenv').config();

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password : process.env.DB_PASS,
    port : process.env.DB_PORT
});

con.connect(function(err) {
    if (err) throw err;
});

function handleError(err, res) {
    console.log(`error : ${err}`);
    res.status(500).json({
        success : false,
        error : err,
        msg : "Internal bug."
    })
}

function runSQLQuery (query) {
    let rs = null;

    return new Promise(function(resolve, reject) {
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            rs = { result };
            console.log(rs); // Log rs
            if (rs.result) resolve(result);
            else reject ("No data");
        });
    });
}

module.exports = { runSQLQuery, handleError };