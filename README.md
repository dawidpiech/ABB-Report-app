# ABB-Report-app

# <img src=https://abb-retention-tool.piech.it/assets/ABB_logo-BWxHPGRE.svg width=250px height=auto alt=Logo>

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
DB_SERVER=Database server adress
DB_FILE_DB_ADRESS=Database name with files
DB_REQUEST_DATA_DB_ADRESS=Database name with requests data
DB_USER_NAME=Database user name
DB_PASSWORD=Database user password
DB_USER_DOMAIN=Domain od user
PORT=Server startup port
FRONTEND_URL=Adress to frontend for CORS policy (e.g. http://localhost:5173/)
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

## API Endpoints

<div style="width: 100%; background-color: #beedd9; border: 1px #4cffb2 solid; padding: 5px 10px 5px 5px; border-radius: 5px; color: #5c5c5c; font-weight: 500; display: flex; align-items: center;"><div style="padding: 5px 15px; background-color: #3fcc8f; width: fit-content; border-radius: 3px; color: white; font-weight: 700">GET</div><div style="margin-left: 15px; font-weight: 700;">/list/getListOfRequests</div><div style="margin-left: 15px; color: #333333">Check if API works</div></div>

<h3>Response</h3>

```javascript
{
  message: string;
}
```

<br>

<div style="width: 100%; background-color: #beedd9; border: 1px #4cffb2 solid; padding: 5px 10px 5px 5px; border-radius: 5px; color: #5c5c5c; font-weight: 500; display: flex; align-items: center;"><div style="padding: 5px 15px; background-color: #3fcc8f; width: fit-content; border-radius: 3px; color: white; font-weight: 700">GET</div><div style="margin-left: 15px; font-weight: 700;">/list/getListOfRequests</div><div style="margin-left: 15px; color: #333333">Get the filtered list of requests</div></div>

<br>

| Parameter                | Type     | Description                               |
| :----------------------- | :------- | :---------------------------------------- |
| `id`                     | `string` | **Optional**. ID of request               |
| `requestorName`          | `string` | **Optional**. Requestor name              |
| `country`                | `string` | **Optional**. Country code                |
| `email`                  | `string` | **Optional**. E-mail adress of requestor  |
| `page`                   | `string` | **Optional**. Number of page              |
| `workflowType`           | `string` | **Optional**. ID of workflow type         |
| `requestOpenedStartDate` | `string` | **Optional**. Date of request opened from |
| `requestOpenedEndDate`   | `string` | **Optional**. Date of request opened to   |
| `requestClosedStartDate` | `string` | **Optional**. Date of request closed from |
| `requestClosedEndDate`   | `string` | **Optional**. Date of request closed to   |

<h3>Response</h3>

```javascript
{
    count: number,
    requests: [
        {
            ID: string,
            RequestID: number,
            WorkflowTypeID: number,
            SAPCode: string,
            WorkflowName: string,
            RequestTitle: string,
            CompanyName: string,
            RequestorName: string,
            RequestorEmail: string,
            OpenedAt: string | null,
            ClosedAt: string | null
        },
        ...
    ]
}

```

<br>

<div style="width: 100%; background-color: #beedd9; border: 1px #4cffb2 solid; padding: 5px 10px 5px 5px; border-radius: 5px; color: #5c5c5c; font-weight: 500; display: flex; align-items: center;"><div style="padding: 5px 15px; background-color: #3fcc8f; width: fit-content; border-radius: 3px; color: white; font-weight: 700">GET</div><div style="margin-left: 15px; font-weight: 700;">/list/getListOfSapCountry</div><div style="margin-left: 15px; color: #333333">Get the list of countries to the form</div></div>

<h3>Response</h3>

```javascript
[
    {
        CountryID: string,
        CountryName: string
    },
    ...
]

```

<br>

<div style="width: 100%; background-color: #beedd9; border: 1px #4cffb2 solid; padding: 5px 10px 5px 5px; border-radius: 5px; color: #5c5c5c; font-weight: 500; display: flex; align-items: center;"><div style="padding: 5px 15px; background-color: #3fcc8f; width: fit-content; border-radius: 3px; color: white; font-weight: 700">GET</div><div style="margin-left: 15px; font-weight: 700;">/list/getListOfWorkflows</div><div style="margin-left: 15px; color: #333333">Get the list of workflows to the form</div></div>

<h3>Response</h3>

```javascript
[
    {
        WorkflowID: string,
        NodeName: string
    },
    ...
]

```

<br>

<div style="width: 100%; background-color: #beedd9; border: 1px #4cffb2 solid; padding: 5px 10px 5px 5px; border-radius: 5px; color: #5c5c5c; font-weight: 500; display: flex; align-items: center;"><div style="padding: 5px 15px; background-color: #3fcc8f; width: fit-content; border-radius: 3px; color: white; font-weight: 700">GET</div><div style="margin-left: 15px; font-weight: 700;">/request/getListOfRequestSteps</div><div style="margin-left: 15px; color: #333333">Get the list of request steps to navigation</div></div>

<br>

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. ID of request |

<h3>Response</h3>

```javascript
[
    {
        RequestID: number,
        WorkflowID: string,
        WorkflowVariantID: string,
        WorkflowTransitionID: number,
        WorkflowTransitionName: string
    },
    ...
]

```

<br>

<div style="width: 100%; background-color: #beedd9; border: 1px #4cffb2 solid; padding: 5px 10px 5px 5px; border-radius: 5px; color: #5c5c5c; font-weight: 500; display: flex; align-items: center;"><div style="padding: 5px 15px; background-color: #3fcc8f; width: fit-content; border-radius: 3px; color: white; font-weight: 700">GET</div><div style="margin-left: 15px; font-weight: 700;">/request/getRequestData</div><div style="margin-left: 15px; color: #333333">Get the initial request data</div></div>

<br>

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. ID of request |

<h3>Response</h3>

```javascript
[
  {
    nameOfView: string,
    groups: [
      {
        nameOfGroup: string,
        sections: [
          {
            typeOfSection: string,
            nameOfSection: string,
            fields: [
              {
                typeOfField: string,
                nameOfField: string,
                values: [
                  {
                    value: string,
                  },
                  ...
                ],
              },
              ...
            ],
          },
          ...
        ],
      },
      ...
    ],
  },
  ...
];
```

<br>

<div style="width: 100%; background-color: #beedd9; border: 1px #4cffb2 solid; padding: 5px 10px 5px 5px; border-radius: 5px; color: #5c5c5c; font-weight: 500; display: flex; align-items: center;"><div style="padding: 5px 15px; background-color: #3fcc8f; width: fit-content; border-radius: 3px; color: white; font-weight: 700">GET</div><div style="margin-left: 15px; font-weight: 700;">/request/getRequestDataOnStep</div><div style="margin-left: 15px; color: #333333">Get the request data on selected step</div></div>

<br>

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. ID of request |
| `stepID`  | `string` | **Required**. ID of step    |

<h3>Response</h3>

```javascript
[
  {
    nameOfView: string,
    groups: [
      {
        nameOfGroup: string,
        sections: [
          {
            typeOfSection: string,
            nameOfSection: string,
            fields: [
              {
                typeOfField: string,
                nameOfField: string,
                values: [
                  {
                    value: string,
                  },
                  ...
                ],
              },
              ...
            ],
          },
          ...
        ],
      },
      ...
    ],
  },
  ...
];
```

<br>

<div style="width: 100%; background-color: #beedd9; border: 1px #4cffb2 solid; padding: 5px 10px 5px 5px; border-radius: 5px; color: #5c5c5c; font-weight: 500; display: flex; align-items: center;"><div style="padding: 5px 15px; background-color: #3fcc8f; width: fit-content; border-radius: 3px; color: white; font-weight: 700">GET</div><div style="margin-left: 15px; font-weight: 700;">/request/getRequestListOfFiles</div><div style="margin-left: 15px; color: #333333">Get the list of request attachments</div></div>

<br>

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. ID of request |

<h3>Response</h3>

```javascript
[
  {
    FileUUID: string,
    Filename: string,
  },
];
```

<br>

<div style="width: 100%; background-color: #beedd9; border: 1px #4cffb2 solid; padding: 5px 10px 5px 5px; border-radius: 5px; color: #5c5c5c; font-weight: 500; display: flex; align-items: center;"><div style="padding: 5px 15px; background-color: #3fcc8f; width: fit-content; border-radius: 3px; color: white; font-weight: 700">GET</div><div style="margin-left: 15px; font-weight: 700;">/request/getRequestFile</div><div style="margin-left: 15px; color: #333333">Get file data</div></div>

<br>

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. ID of file |

<h3>Response</h3>

```javascript
[
  {
    MimeType: string,
    File: {
      type: string,
      data: array,
    },
  },
];
```
