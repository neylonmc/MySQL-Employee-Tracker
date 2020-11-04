var mysql = require("mysql");
var inquirer = require("inquirer");
const Font = require('ascii-art-font');

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
    runSearch();
});


function runSearch() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Updated Employee Role",
            "Updated Employee Manager"
        ],
    }).then(function(answer) {
        switch (answer.action) {
            case "View All Employees":
                viewemployees();
                break;

            case "View All Employees By Department":
                viewDepartments();
                break;
    
            case "View All Employees By Manager":
                viewManagers();
                break;

            case "Add Employee":
                addEmployee();
                break;
    
            case "Remove Employee":
                removeEmployee();
                break;
        
            case "Updated Employee Manager":
                updatedManager();
                break;

        }
    });
};



//TO-DO RESEARCH MORE ON MYSQL JOINS. 
