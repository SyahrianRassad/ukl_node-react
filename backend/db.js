const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "ukl_spp"
})

db.connect(err =>{
    if(err)console.log(err.message)
    else console.log("Koneksi Berhasil")
})

module.exports = db;