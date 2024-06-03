# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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


