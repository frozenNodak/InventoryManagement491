<%@ Page Title="View Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="ViewInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>Enter in the information you want to search by.</h3>
    <p>(FOR NOW) If scanning is not available, enter in the necessary information manually.</p>

    <asp:Label ID="lbl_EquipID" runat="server" Text="Equipment ID: " ></asp:Label>
    <asp:TextBox ID="tb_EquipmentID" runat="server" MaxLength="9" ></asp:TextBox><br />

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
    <asp:TextBox ID="tb_MoveDate" runat="server" TextMode="DateTime"></asp:TextBox><br />

    <%-- when looking up by description, use the like, or contains function? --%>
    <asp:Label ID="lbl_Description" runat="server" Text="Equipment Description: "></asp:Label>
    <asp:TextBox ID="tb_Description" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_LocationID" runat="server" Text="Equipment Location: "></asp:Label>
    <asp:TextBox ID="tb_LocationID" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_ProjectID" runat="server" Text="Project ID: "></asp:Label>
    <asp:TextBox ID="tb_ProjectID" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_UserID" runat="server" Text="User ID: "></asp:Label>
    <asp:TextBox ID="tb_UserID" runat="server"></asp:TextBox><br />

    <asp:Button ID="btn_Search" runat="server" Text="Find Inventory" />
</asp:Content>
<%-- Possibly add a table to display the contents of the search. only display appropriate data --%>
