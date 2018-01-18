<%@ Page Title="Create Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="CreateInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>Scan in the barcode and/or enter in the necessary information.</h3>
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

    <asp:Label ID="lbl_EquipCost" runat="server" Text="Equipment Cost: $"></asp:Label>
    <asp:TextBox ID="tb_EquipmentCost" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_AquisDate" runat="server" Text="Acquisition Date: "></asp:Label>
    <asp:TextBox ID="tb_AquisDate" runat="server" TextMode="DateTime"></asp:TextBox><br />

    <asp:Label ID="lbl_MoveDate" runat="server" Text="Equipment Moved Date: "></asp:Label>
    <asp:TextBox ID="tb_MoveDate" runat="server" TextMode="DateTime"></asp:TextBox><br />

    <asp:Label ID="lbl_UseRestrict" runat="server" Text="Usage Restriction: "></asp:Label>
    <asp:TextBox ID="tb_UseRestrict" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_Description" runat="server" Text="Equipment Description: "></asp:Label>
    <asp:TextBox ID="tb_Description" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_LocationID" runat="server" Text="Equipment Location: "></asp:Label>
    <asp:TextBox ID="tb_LocationID" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_Admin" runat="server" Text="Administrator: "></asp:Label>
    <asp:TextBox ID="tb_Admin" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_ProjectID" runat="server" Text="Project ID: "></asp:Label>
    <asp:TextBox ID="tb_ProjectID" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_UserID" runat="server" Text="User ID: "></asp:Label>
    <asp:TextBox ID="tb_UserID" runat="server"></asp:TextBox><br />

    <asp:Label ID="lbl_AdminName" runat="server" Text="Administrators Name: "></asp:Label>
    <asp:TextBox ID="tb_AdminName" runat="server"></asp:TextBox><br />

    <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" />
</asp:Content>
