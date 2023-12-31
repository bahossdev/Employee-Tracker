# Employee-Tracker
A command-line application for managing employees, roles, and departments.

## Description

This Node.js command-line application allows users to efficiently manage employees, roles, and departments within an organization. It provides a user-friendly interface with various features, including viewing all employees, adding new employees, updating employee roles, and more. The application is backed by a MySQL database, and interactions are facilitated through Inquirer prompts, Chalk, stripAnsi and console.table libraries.

npm install mysql2
chalk stripAnsi, inquirer, console.table

## Table of Contents
-----------------

*   [Features](#features)
*   [Installation](#installation)
*   [How to Use](#how-to-use)
*   [Built With](#built-with)
*   [Credits](#credits)
*   [License](#license)
*   [Walkthrough Video](#walkthrough-video)
*   [Repository](#repository)
*   [Questions](#questions)
*   [Screenshots](#screenshots)

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

*   JavaScript
*   [Node.js](https://nodejs.org/en)
*   [MySQL](https://www.mysql.com)
*   [npm](https://www.npmjs.com)
*   [mysql2 Package (v2.3.0)](https://www.npmjs.com/package/mysql2)
*   [Inquirer Package (v8.2.4)](https://www.npmjs.com/package/inquirer/v/8.2.4)

## Credits
-------

To create this application, the developer referenced documentation for MySQL, Node.js, npm, and Inquirer Package. Additionally, they drew insights from class activities and consulted resources on MDN, W3Schools, Stack Overflow, and similar educational platforms.

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

