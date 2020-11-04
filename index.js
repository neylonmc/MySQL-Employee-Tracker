var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "5407354680",
    database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err; 
    console.log("connect as id " + connection.threadId);
    connection.end();
});