[![Build Status](https://travis-ci.org/oleesir/banka.svg?branch=develop)](https://travis-ci.org/oleesir/banka) [![Maintainability](https://api.codeclimate.com/v1/badges/a43cf21efa411f6963bd/maintainability)](https://codeclimate.com/github/oleesir/banka/maintainability) 
[![Test Coverage](https://api.codeclimate.com/v1/badges/a43cf21efa411f6963bd/test_coverage)](https://codeclimate.com/github/oleesir/banka/test_coverage) 
[![codecov](https://codecov.io/gh/oleesir/banka/branch/develop/graph/badge.svg)](https://codecov.io/gh/oleesir/banka)
# banka
A banking application that helps users perform banking transactions.


# Table of Contents

1. <a href="#hosted-app">Hosted App</a>
2. <a href="#pivotal-tracker-board">Pivotal Tracker Board</a>
3. <a href="#api-documentation">API Documentation</a>
4. <a href="#built-with">Built With</a>
5. <a href="#supporting-packages">Supporting packages</a>
6. <a href="#application-features">Application Features</a>
7. <a href="#getting-started">Getting Started</a>
8. <a href="#running-tests">Running Tests</a>
9.  <a href="#api-endpoints">API endpoints</a>
10. <a href="#license">License</a>
11. <a href="#author">Author</a>

## Hosted App

coming soon

## Pivotal Tracker Board

https://www.pivotaltracker.com/n/projects/2320085

## API Documentation

coming soon

## Built With

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Html]()
* [CSS]()
* [Postgres](https://www.postgresql.org/)

## Supporting packages
#### Linter
  * [ESLint](https://eslint.org/)

#### Compiler
* [Babel](https://babeljs.io/)
  
#### Test Tools
  * [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests (Backend)
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
* [Supertest](https://www.npmjs.com/package/supertest) - Super-agent driven
  library for testing node.js HTTP servers

## Application Features
* User Registration
* Bank Account Creation
* Bank deposits and withdrawals
* Bank account management


## Getting Started
### Installation
* Install [NodeJS](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/) on your computer
* Clone this repository using `git@github.com:oleesir/banka.git`
* Use the `.env.example` file to setup your environmental variables and rename the file to `.env`
* Run `npm install` to install all dependencies
* Run `npm run build` to build the project
* Run `npm start` to start the server
* Navigate to [localhost:3000](http://localhost:3000/) in browser to access the application


## Running Tests

Dependencies to enable them work are included in the `package.json` file. To run unit tests, you can do the following:

```bash
# Enter the project's directory
$ cd banka/

# To run the available unit tests
$ npm run test
```

**Install nyc globally to generate and view coverage reports via the command line**

```bash
npm install -g nyc
```

**Using Postman**

If you have Postman installed, you can test routes listed below. An example response spec would be:

```bash
# on successful request to the sign in route /api/v1/auth/signin
{
  "status": 200,
  "data": [
    {
      "token": "jbhfuhbfhrb_r.iufnr3uinrufrf",
      "id", 8,
      "firstName": "olisa",
      "lastName": "Emodi",
      "email": "oleesir@gmail.com"
    }
  ]
}
```

```bash
# on errored request to the sign in route /api/v1/auth/signin
{
  "status": 404,
  "error": "User not found"
}
```


## API endpoints

| Method   |                    Endpoint                     |                Description                 |        Access         |
| :------- | :---------------------------------------------: | :----------------------------------------: | :-------------------: |
| `POST`   |              `/api/v1/auth/signup`              |       Register a new user on the app       |        Clients        |
| `POST`   |              `/api/v1/auth/signin`              |           Login an existing user           | Clients & Staff/Admin |
| `POST`   |               `/api/v1/accounts`                |             Create an account              |        Client         |
| `PATCH`  |       `/api/v1/accounts/<account-number>`       |          Edit an accounts status           |      Admin/Staff      |
| `DELETE` |       `/api/v1/account/<account-number>`        |             Delete an account              |      Admin/Staff      |
| `POST`   |  `/api/v1/transactions/<account-number>/debit`  |              Debit an account              |      Admin/Staff      |
| `POST`   | `/api/v1/transactions/<account-number>/credit`  |             Credit an account              |      Admin/Staff      |
| `GET`    |       `api/v1/accounts/<account-number>`        |      View aspecific account's details      | Clients & Admin/Staff |
| `GET`    |                `api/v1/accounts`                |      View a list of all bank accounts      |      Admin/Staff      |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author

 **Olisa Emodi**
