# InventoryManagement491

----
## Set up instructions:
### 1. Software needed:
1. Microsoft Visual Studio 2017 (With ASP.NET, C#, and SQL integration)
2. Microsoft SQL Server
3. Microsoft SQL Server Management Studio 2017

### 2. Setting up SQL Server:
1. Log into SQL Server Management Studio after installing.
2. Open COMPLETESCRIPT-User,Tables,Database,StoredProcedures.sql in SQL Server Management Studio
3. Run the script
4. Open the Security > Logins folder in the Object Explorer
5. Change the password (Remember this password for step 6 in project setup)
6. To create new tables in the database, open Databases > InventoryManagementSystem, right click on the Tables folder, and select New Table
7. Stored Procedures are located in Databases > InventoryManagementSystem > Programmability > Stored Procedures, right click this folder to create new ones
8. To modify tables or stored procedures, right click the item to be modified and select Modify
9. When updating tables, Ctrl + S or clicking save will save the new table structure
10. When modifying stored procedures, F5 or clicking Run Script will save the new stored procedure

### 3. Setting up the project in Visual Studio
1. Download the project code from GitHub using either GitHub desktop or the .zip folder from the GitHub website itself.
2. Go to File > Open > Website
3. Open InventoryManagement491 > WEBSITE > WebSite1 > Website1 in Visual Studio
4. If there are errors due to missing packages, in the Solution Explorer, right click the top level Website1, and select Manage NuGet Packages
5. In the NuGet Window, install any updates it may ask you to install.
6. In the Web.config file, go to line 13 (IMSConnectionString) and change the Password field to what was entered during database setup (the connection string should be ready to go after this if you run the script when setting up the server)
7. Click the green play button or click Debug > Start Debugging to run the website in debug mode, this will help to catch errors
8. You DO NOT need to close the browser and click debug again after making changes, you can simply refresh the page to see them (Ctrl + refresh if making CSS changes to clear the cache)

### 4. List of NuGet Packages
1. Antlr by Sam Harwell, Terence Parr
2. AspNet.ScriptManager.bootstrap by Pranav Rastogi
3. AspNet.ScriptManager.jQuery by Damian Edwards
4. bootstrap by The Bootstrap Authors, Twitter Inc.
5. EntityFramework by Microsoft
6. FreeSpire.Barcode by E-iceblue
7. jQuery by jQuery Foundation, Inc.
8. Microsoft.AspNet.FriendlyUrls.Core by Microsoft
9. Microsoft.AspNet.Identity.Core by Microsoft
10. Microsoft.AspNet.Identity.EntityFramework by Microsoft
11. Microsoft.AspNet.Identity.Owin by Microsoft
12. Microsoft.AspNet.Providers.Core by Microsoft
13. Microsoft.AspNet.ScriptManager.MSAjax by Microsoft
14. Microsoft.AspNet.ScriptManager.WebForms by Microsoft
15. Microsoft.AspNet.Web.Optimization by Microsoft
16. Microsoft.AspNet.Web.Optimization.WebForms by Microsoft
17. Microsoft.CodeDom.Providers.DotNetCompilerPlatform by Microsoft
18. Microsoft.Net.Compilers by Microsoft
19. Microsoft.NETCore.Platforms by Microsoft
20. Microsoft.Owin by Microsoft
21. Microsoft.Owin.Host.SystemWeb by Microsoft
22. Microsoft.Owin.Security by Microsoft
23. Microsoft.Owin.Security.Cookies by Microsoft
24. Microsoft.Owin.Security.Facebook  by Microsoft
25. Microsoft.Owin.Security.Google by Microsoft
26. Microsoft.Owin.Security.MicrosoftAccount by Microsoft
27. Microsoft.Owin.Security.OAuth by Microsoft
28. Microsoft.Owin.Security.Twitter by Microsoft
29. Microsoft.Web.Infrastructure by Microsoft
30. Modernizr by Faruk Ates, Paul Irish, Alex Sexton
31. NETStandard.Library by Microsoft
32. Newtonsoft.Json by James Newton-King
33. Owin by OWIN startup components contributors
34. popper.js by FezVrasta
35. Respond by Scott Jehl, Paul Irish, Nicholas Zakas
36. Spire.Barcode by E-iceblue
37. WebGrease by webgrease@microsoft.com
