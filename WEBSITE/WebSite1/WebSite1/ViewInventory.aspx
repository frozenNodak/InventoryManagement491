<%@ Page Title="View Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="ViewInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
        <h2><%: Title %>.</h2>
        <h3>Enter in the information you want to search with.</h3>
        <p>
            <asp:Label ID="lbl_warning" runat="server" Text="" ForeColor="red"></asp:Label></p>
    </div>

    <div class="row">
         <div class="column" style="float: left; width: 20%;">
             <asp:Label ID="lbl_TagNumber" runat="server" Text="Tag Number:"></asp:Label>
         </div>
         <div class="column" style="float: left; width: 20%;">
             <asp:TextBox ID="tb_TagNumber" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
         </div>
     </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_SerialNumber" runat="server" Text="Serial Number:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:TextBox ID="tb_SerialNumber" runat="server" Style="width:175px;" MaxLength="22"></asp:TextBox>
        </div>
    </div>

    <div class="row">
         <div class="column" style="float: left; width: 20%;">
             <asp:Label ID="lbl_Desciption" runat="server" Text="Item Description:"></asp:Label>
         </div>
         <div class="column" style="float: left; width: 20%;">
             <asp:TextBox ID="tb_Description" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
         </div>
     </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Location" runat="server" Text="Location: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:DropDownList ID="ddl_Location" Style="width:175px;" runat="server"  Width="125px" />  <%--TODO: Bind locations from DB--%>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Building" runat="server" Text="Building: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:DropDownList ID="ddl_Building" Style="width:175px;" runat="server"  Width="125px" />  <%--TODO: Bind Building from DB?--%>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_RoomNumber" runat="server" Text="Room Number: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:DropDownList ID="ddl_RoomNumber" Style="width:175px;" runat="server"  Width="125px" />  <%--TODO: Bind RoomNumbers from DB?--%>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Department" runat="server" Text="Department: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:DropDownList ID="ddl_Department" Style="width:175px;" runat="server"  Width="125px" />  <%--TODO: Bind locations from DB--%>
        </div>
    </div>

     <%-- 
    <asp:Label ID="lbl_EquipType" runat="server" Text="Equipment Type: "></asp:Label>
    <asp:DropDownList ID="ddl_EquipType" runat="server" >
        <asp:ListItem>Electrical</asp:ListItem>
        <asp:ListItem>Electric</asp:ListItem>
        <asp:ListItem>Analog</asp:ListItem>
        <asp:ListItem>Chair</asp:ListItem>
        <asp:ListItem>Table</asp:ListItem>
        <asp:ListItem>Other</asp:ListItem>
    </asp:DropDownList><br />

    <asp:Label ID="lbl_MoveDate" runat="server" Text="Equipment Moved Date: "></asp:Label>
    <asp:TextBox ID="tb_MoveDate" runat="server" TextMode="DateTime"></asp:TextBox><br />--%>

    <%-- when looking up by description, use the like, or contains function? --%>
   <%-- <asp:Label ID="lbl_Description" runat="server" Text="Equipment Description: "></asp:Label>
    <asp:TextBox ID="tb_Description" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_LocationID" runat="server" Text="Equipment Location: "></asp:Label>
    <asp:TextBox ID="tb_LocationID" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_ProjectID" runat="server" Text="Project ID: "></asp:Label>
    <asp:TextBox ID="tb_ProjectID" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_UserID" runat="server" Text="User ID: "></asp:Label>
    <asp:TextBox ID="tb_UserID" runat="server"></asp:TextBox><br />--%>

     <br />
    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Button ID="btn_Submit" runat="server" Text="Find Item(s)" OnClick="Btn_Submit_Click" />
        </div>
    </div>
    <br /><br /><br />
    <p>There will be a table to display contents of the search with the appropriate data  </p>
</asp:Content>
<%-- Possibly add a table to display the contents of the search. only display appropriate data --%>
