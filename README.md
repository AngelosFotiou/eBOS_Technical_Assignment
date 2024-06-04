# eBOS_Technical_Assignment

##Technical Requirements:

###DONE: 

    ◦ React Framework.
    ◦ API Development (Optional).	
    ◦ Bootstrap 5/Ant Design.		
    ◦ Routing:
    ◦ Internalization (i18n)
	
###Done Parsialy:

        ◦ Implement Redux for state management within the application.
        ◦ Set up actions, reducers, and the Redux store to manage data and application state. 
		◦ Define routes for the main album view and individual photo details view.
		
###Not ImpLimented:

		Dummy API Integration
		
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


