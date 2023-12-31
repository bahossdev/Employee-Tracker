# Employee-Tracker
     
A command-line application for managing employees, roles, and departments.

## Description

This Node.js command-line application allows users to efficiently manage employees, roles, and departments within an organization. It provides a user-friendly interface with various features, including viewing all employees, adding new employees, updating employee roles, and more. The application is backed by a MySQL database, and interactions are facilitated through Inquirer prompts, Chalk, stripAnsi and console.table libraries.

## Table of Contents
-----------------

- [Employee-Tracker](#employee-tracker)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [How to Use](#how-to-use)
  - [Built With](#built-with)
  - [Credits](#credits)
  - [License](#license)
  - [Walkthrough Video](#walkthrough-video)
  - [Repository](#repository)
  - [Questions](#questions)
  - [Screenshots](#screenshots)

## Features
--------

*   **Employee Management:** Add, view, update, and delete employees with ease.
*   **Role Assignment:** Assign roles to employees and update them as needed.
*   **Department Management:** View all departments and their budgets.
*   **Enhanced Interface:** Utilizes Inquirer for intuitive interaction.
*   **MySQL Database:** Persists data in a MySQL database for reliability.

*   **Ensure smooth employee management with this versatile command-line application!**

## Installation

Follow these steps to set up and use the Employee Management System on your local machine:
<pre>
- git clone https://github.com/bahossdev/Employee-Tracker.git 
</pre>
Install the required libraries:
<pre>
- npm i mysql2@2.3.0 
- npm i inquirer@8.2.4
- npm i chalk
- npm i stripAnsi
- npm i console.table
</pre>
- Create a MySQL database using the provided schema.sql file. 
- Configure your database connection in the main.js and employee.js files. 
- Run the app using:
<pre>
- node index.js
</pre>

Now, you're ready to efficiently manage your employees, roles, and departments!

## How to Use
----------

1.  Run the application using `node index.js`.
2.  Choose from various options in the main menu:
    *   View All Employees
    *   Add/Delete an Employee
    *   Update Employee Role
    *   Update Employee Manager
    *   View All Roles
    *   Add/Delete a Role
    *   View All Departments
    *   Add/Delete a Department
    *   View Department Budget
3.  Follow the prompts to perform desired actions.
4.  View and manage your employees, roles, and departments seamlessly.

**NOTE** In case of any errors or if you'd like to cancel a task press `ctrl+c (^C)`.

## Built With
----------

*   [<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />](https://www.javascript.com)
*   [<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />](https://nodejs.org/en)
*   [<img src="https://img.shields.io/badge/MySQL2 v2.3.0-005C84?style=for-the-badge&logo=mysql&logoColor=white" />](https://www.npmjs.com/package/mysql2)
*   [<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />](https://www.npmjs.com)
    *   [Inquirer Package (v8.2.4) <img src = "https://raw.githubusercontent.com/SBoudrias/Inquirer.js/master/assets/inquirer_readme.svg" width = '30' />](https://www.npmjs.com/package/inquirer/v/8.2.4)
    *   [<img src = "https://nodei.co/npm/console.table.png?downloads=true" height = '38'/>](https://www.npmjs.com/package/console.table)
    *   [<img src = "https://raw.githubusercontent.com/chalk/chalk/HEAD/media/logo.svg" width = '70' />](https://www.npmjs.com/package/chalk)
    *   [strip-ansi](https://www.npmjs.com/package/strip-ansi)

## Credits
-------

To create this application, I referenced documentation for MySQL, Node.js, npm, chalk, strip-ansi, console.table and Inquirer Package. Additionally, I drew insights from class activities and consulted resources on MDN, W3Schools, Stack Overflow, and similar educational platforms.

## License
-------
Please refer to the LICENSE in the repo.

## Walkthrough Video

Link to Walkthrough Video demonstrating the functionality of the Employee-Tracker:

- [Watch Walkthrough]()

## Repository

https://github.com/bahossdev/Employee-Tracker

## Questions

If you have any questions or need further assistance, feel free to reach out @[bahoss.dev@gmail.com](mailto:bahoss.dev@gmail.com).

## Screenshots

