# ABB-Report-app

# <img src="https://abb-retention-tool.piech.it/assets/ABB_logo-BWxHPGRE.svg" width=250px height=auto alt="Logo">

The application is designed for efficient data management, allowing the user to easily retrieve and view information from the database in a transparent manner.
In addition, the user has the ability to filter records using parameters such as Request ID, Requestor Name, E-mail, Request Opened Start and End Date, Request Closed Start and End Date, Country and Workflow Type.
The entire application was written in TypeScript. The backend of the application was implemented using the Node.js environment in combination with the Express.js framework, while the frontend was created using React.js.
The application uses a database based on SQL Server.

## Features

- Filterable request finder.
- Preview of request data at each step.

## Tech Stack

**Client:** React.js, StyledComponents

**Server:** Node.js, Express.js

**Database:** SQL Server

## Demo

https://abb-retention-tool.piech.it/

## Installation

To install this project you have to run both instances (Client side and Server API) in separate servers. Download whole repository and follow instructions:

1. **Server API**

```bash
  cd server
  npm i
```

Configure your **.env** file with your own data. .Env file must be created separately for both server and client parts

```bash
# Environment Variables
DB_SERVER="Database server adress"
DB_FILE_DB_ADRESS="Database name with files"
DB_REQUEST_DATA_DB_ADRESS="Database name with requests data"
DB_USER_NAME="Database user name"
DB_PASSWORD="Database user password"
DB_USER_DOMAIN="Domain od user"
PORT="Server startup port"
FRONTEND_URL="Adress to frontend for CORS policy" (e.g. http://localhost:5173/)
```

2. **Client side**

```bash
  cd frontend
  npm i
```

```bash
# Environment Variables
VITE_API=Adres for Local API (e.g. http://localhost:3000/api)
```

2. **Run application**

Run below comand in server and frontend folder.

```bash
npm start
```

## Screenshots

![Request Finder](https://github.com/dawidpiech/ABB-Report-app/blob/main/screenshots/finder.png)
![Preview of request data](https://github.com/dawidpiech/ABB-Report-app/blob/main/screenshots/preview.png)
