const mysql = require('mysql');



const dbConn = mysql.createConnection({
    host: 'conviencestore.cw3crbgltbxe.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'eecs4413backend',
    database: 'ConviStore'
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully!');
})

module.exports = dbConn;

