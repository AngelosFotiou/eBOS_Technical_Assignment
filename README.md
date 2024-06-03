# eBOS_Technical_Assignment

# React + Vite
This is literaly the first time doing react so have that in mind.
So i took the tempate as provieded in visual studio 2022.



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

   ``powershell
   # Delete Migration Files
   Remove-Item -Path Migrations\* -Force

   # Add New Migration
   dotnet ef migrations add InitialCreate

   # Update Database
   dotnet ef database update


