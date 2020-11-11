var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require("chalk"); 
const cTable = require("console.table"); 
const figlet = require("figlet")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "5407354680",
    database: "employee_DB"
});
//Cool header for the user when they open the application
figlet('Ultimate Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

//Connection//
connection.connect(function(err) {
    if (err) throw err; 
    runSearch();
});

//Allows the user to pick what they would like to do
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

//Allows the user to view all the employees
function viewEmployees() {
    
     var query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, departments.department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN departments ON departments.id = roles.department_id ORDER BY employee.id";
     connection.query(query, function(err, res) {
        console.log("\n");
        console.table(chalk.yellow("All Employees"), res); 
        console.log(chalk.white("------------------------------------"));
         runSearch();
     })
};

//Allows the user to view all the departments
function viewDepartments() {
    var query = "SELECT department FROM departments";
     connection.query(query, function(err, res) {
        console.log("\n");
        console.table(chalk.yellow("All Departments"), res);
        console.log(chalk.white("------------------------------------"));
         runSearch();
     })
};

//Allows the user to view all the roles avaiable 
function viewRoles() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, departments.department FROM employee JOIN roles ON employee.role_id = roles.id JOIN departments ON departments.id = roles.department_id ORDER BY roles.title";
     connection.query(query, function(err, res) {
        console.log("\n");
        console.table(chalk.yellow("All Employees By Their Titles"), res);
        console.log(chalk.white("------------------------------------"));

         runSearch();
     })
};

//Allows the user to add employees to the mysql table 
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
        console.log("\n");
        console.log("Employee has been added"); 
        console.log(chalk.white("------------------------------------"));
    });
    runSearch();
});
} 

//allows the user to add a department 

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
            console.log("\n");
            console.log("Department has been added"); 
            console.log(chalk.white("------------------------------------"));
        });
        runSearch();
    });
    } 

//allows the user to add a new title for employees
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
        console.log("\n");
        console.log("The title has been added along with the salary"); 
        console.log(chalk.white("------------------------------------"));
        runSearch();
    });
    }

//allows the user to update an employees role which will then be present when the viewEmployees function is called
// 

function updateRole() {
    var employeeChoice = [];
      connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          var employeeList = res[i].name;
          employeeChoice.push(employeeList);
      };
      
      var roleChoice = [];
    connection.query("SELECT * FROM roles", function(err, title) {
      if (err) throw err;
      for (var i = 0; i < title.length; i++) {
        var titleList = title[i].title;
        roleChoice.push(titleList);
      };
  
      inquirer
      .prompt([
      {
        name: "employee_id",
        type: "rawlist",
        message: "Which employee would you like to update?",
        choices: employeeChoice
      },
      {
        name: "role_id",
        type: "rawlist",
        message: "Select employee's new role:",
        choices: roleChoice
      }
    ])
    .then(function(answer) {
  
      var chosenEmp;
          for (var i = 0; i < res.length; i++) {
            if (res[i].name === answer.employee_id) {
              chosenEmp = res[i];
          }
        };
  
      var chosenRole;
        for (var i = 0; i < title.length; i++) {
          if (title[i].title === answer.role_id) {
            chosenRole = title[i];
          }
        };
        connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [chosenRole.id, chosenEmp.id],
          function(err) {
            if (err) throw err;
            console.log("\n");
            console.log("Employee's role has been updated.")
            console.log(chalk.white("------------------------------------"));
            runSearch(); 
          }
        );
      })
     })
    })
  };
  