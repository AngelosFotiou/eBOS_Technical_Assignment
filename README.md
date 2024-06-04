# eBOS_Technical_Assignment

##Technical Requirements:
    1. React Framework:
        ◦ Utilize React.js to build the frontend of the photo album application. **DONE**
		
	2.  ~~Dummy API Integration~~
	
    3. API Development (Optional):
        ◦ Develop and Connect the API with the Front-End application (GraphQL, Rest API) **DONE**
		
    4. Bootstrap 5/Ant Design:
        ◦ Integrate Bootstrap 5/Ant Design framework for responsive and mobile-first design. **DONE**
        ◦ Utilize Bootstrap/Ant Design components and utilities for styling and layout.**DONE**
		
    5. Redux State Management (Optional):
        ◦ Implement Redux for state management within the application.
        ◦ Set up actions, reducers, and the Redux store to manage data and application state. **DONE PARSIALY**
		
    6. Routing:
        ◦ Implement client-side routing using react-router-dom to navigate between different views/pages within the application. **DONE**
        ◦ Define routes for the main album view and individual photo details view.
		
    7. Internalization (i18n):
        ◦ Support internalization (i18n) for the application to be localized in multiple languages. **DONE**
        ◦ Utilize react-intl or similar libraries to manage translations and language switching. **DONE**


# React + Vite
This is literaly the first time doing react so have that in mind.
So i took the tempate as provieded in visual studio 2022.
i proxy the server url in order to avoid cors.



# Project Backend Setup Instructions

## SQL Server Setup

1. **Install SQL Server**: Download and install SQL Server from the [official Microsoft website](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).

2. **Start SQL Server**: Launch SQL Server Management Studio (SSMS) and connect to your SQL Server instance.

3. **Create Database**: Create a new database for your project in SSMS.

4. **Configure Connection String**: Note down the server name and database name for use in the connection string. 

5. . **Change The Connection String**: Change in file appsettings.Development.json the connection string for LocalSqlServer with yours. 


## Database Reset Script

1. **Create PowerShell Script**: Open a text editor and create a new file named `ResetDatabase.ps1`.

2. **Write Script**: Copy the following script into `ResetDatabase.ps1`:

##Powershell
   ###Delete Migration Files
   Remove-Item -Path Migrations\* -Force

   ### Add New Migration
   dotnet ef migrations add InitialCreate

   ### Update Database
   dotnet ef database update


