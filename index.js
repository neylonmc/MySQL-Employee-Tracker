var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require("chalk"); 
const cTable = require("console.table"); 

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
            "View All Employees By Their Titles",
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
    
            case "View All Employees By Their Titles":
                viewRoles();
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
    
     var query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, departments.department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN departments ON departments.id = roles.department_id ORDER BY employee.id";
     connection.query(query, function(err, res) {
        console.log("\n");
        console.table(chalk.yellow("All Employees"), res); 
        console.log(chalk.white("------------------------------------"));
         runSearch();
     })
};

function viewDepartments() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, departments.department FROM employee JOIN roles ON employee.role_id = roles.id JOIN departments ON departments.id = roles.department_id ORDER BY departments.department";
     connection.query(query, function(err, res) {
        console.log("\n");
        console.table(chalk.yellow("All Employees By Department"), res);
        console.log(chalk.white("------------------------------------"));
         runSearch();
     })
};

function viewRoles() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, departments.department FROM employee JOIN roles ON employee.role_id = roles.id JOIN departments ON departments.id = roles.department_id ORDER BY roles.title";
     connection.query(query, function(err, res) {
        console.log("\n");
        console.table(chalk.yellow("All Employees By Their Titles"), res);
        console.log(chalk.white("------------------------------------"));

         runSearch();
     })
};
//
//TO-DO STOPPED HERE

//roles.title
//"Role: " +
//res[i].roles.title