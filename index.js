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
            "View All Departments",
            "View All Employees By Their Titles",
            "Add Employee",
            "Add A Department",
            "Add A Title",
            "Update an Employee Role"
        ],
    }).then(function(answer) {
        switch (answer.action) {
            case "View All Employees":
                viewEmployees();
                break;

            case "View All Departments":
                viewDepartments();
                break;
    
            case "View All Employees By Their Titles":
                viewRoles();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add A Department":
                addDepartment();
                break;
                
            case "Add A Title":
                addTitle();
                break;

            case "Update an Employee Role":
                updateRole();
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
    var query = "SELECT department FROM departments";
     connection.query(query, function(err, res) {
        console.log("\n");
        console.table(chalk.yellow("All Departments"), res);
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

function addEmployee() {
inquirer.prompt([
    {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
    },
    {
        type: "list",
        name: "role_id",
        message: "What is the employee's title?",
        choices:
            [1, 2, 3, 4, 5]
    },

]).then(function(res) {
    const query = connection.query("INSERT INTO employee SET ?", res,
    function(err, res) {
        if (err) throw err; 
        console.log("Employee has been added"); 
    });
    runSearch();
});
} 

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What department would you like to add?"
        },
    ]).then(function(res) {
        const query = connection.query("INSERT INTO departments SET ?", res,
        function(err, res) {
            if (err) throw err; 
            console.log("Department has been added"); 
        });
        runSearch();
    });
    } 

function addTitle() {
    connection.query("SELECT roles.title AS title, roles.salary AS salary from roles")
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What title would you like to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the titles salary?"
        },
    ]).then(function(res) {
        const query = connection.query("INSERT INTO roles SET ?", res,
        function(err, res) {
            if (err) throw err; 
        });
        console.log("The title has been added along with the salary"); 
        runSearch();
    });
    }

function updateRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Which employee would you like to update? (Please use first name only)"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role ID? (ID numbers can be found in the View All Employees table)",
            choices:
                [1, 2, 3, 4, 5, 6 , 7]
        }
    ])
    .then(function (answer) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [answer.role_id, answer.first_name], function (err, data) {
            console.log("The employee has been updated.");
        });
        runSearch(); 
})
}; 