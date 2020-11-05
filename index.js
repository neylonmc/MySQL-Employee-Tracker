var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require("chalk"); 

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
                viewEmployees();
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

function viewEmployees() {
     var query = "SELECT employee.first_name, employee.last_name, roles.title, roles.salary FROM employee JOIN roles ON employee.role_id = roles.id";
     connection.query(query, [viewEmployees.start, viewEmployees.end], function(err, res) {
         for (var i = 0; i < res.length; i++) {
             console.log(
                 "First Name: " +
                 res[i].first_name +
                 " Last Name: " +
                 res[i].last_name +
                 "Title: " +
                 res[i].title +
                 "Salary: " +
                 res[i].salary
             );
         }
         runSearch();
     })
    };
//
//TO-DO HAVE NO COMMITED VIEWEMPLOYEE FUNCTION _ ENDED THERE 
//roles.title
//"Role: " +
//res[i].roles.title