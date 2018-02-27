<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="jumbotron">
        <h1>
            <asp:Image ID="UNDImage" runat="server" Height="350px" Width="430px" ImageUrl="~/InventManage.png" ImageAlign="Middle" /><br />
            Inventory Management System</h1>
        <p class="lead">I.M.S helps keep track of Major and Minor Equipment around UND</p>
    </div>

    <div class="row">
        <div class="col-md-4">
            <h2>Create Inventory</h2>
            <p>
                Create Inventory by entering the equipment information in the required fields. &nbsp;
            </p>
            <p>
                <a class="btn btn-default" href="CreateInventory.aspx">Create Inventory &raquo;</a>
            </p>
        </div>
        <div class="col-md-4">
            <h2>View Equipment</h2>
            <p>
                Equipment that the University has can be viewed by the ID number, Scan ID, or by equipment type.  
            </p>
            <p>
                <a class="btn btn-default" href="ViewInventory.aspx">View Equipment &raquo;</a>
            </p>
        </div>
        <div class="col-md-4">
            <h2>Delete Inventory</h2>
            <p>
                Equipment can be removed by providing the equipment ID, reason for removal, and proper authorization. 
            </p>
            <p>
                <a class="btn btn-default" href="DeleteInventory.aspx">Delete Inventory &raquo;</a>
            </p>
        </div>
         <div class="col-md-4">
            <h2>Update Inventory</h2>
            <p>
                Equipment can be Update with a scan of the barcode. Fields that can be updated are:Status, Location, and User. (ANYTHING ELSE?)
            </p>
            <p>
                <a class="btn btn-default" href="UpdateInventory.aspx">Update Inventory &raquo;</a>
            </p>
        </div>
         <div class="col-md-4">
            <h2>Locate Inventory</h2>
            <p>
                Equipment can be located by providing the Equipment ID, or through the search feature. 
            </p>
            <p>
                <a class="btn btn-default" href="LocateInventory.aspx">Locate Inventory &raquo;</a>
            </p>
        </div>
         <div class="col-md-4">
            <h2>Disable Inventory</h2>
            <p>
                Equipment can be disabled in the event of a malfunction. (IS THIS NECESSARY?) 
            </p>
            <p>
                <a class="btn btn-default" href="DisableInventory.aspx">Disable Inventory &raquo;</a>
            </p>
        </div>
         <div class="col-md-4">
            <h2>Print Audit Report</h2>
            <p>
                You are able to print out a report of the current status of the equipment.  (THIS WILL HAVE TO HAVE SPECIAL PERMISSIONS)
            </p>
            <p>
                <a class="btn btn-default" href="AuditReport.aspx">Print Report &raquo;</a>
            </p>
        </div>
    </div>
</asp:Content>
