<%@ Page Title="Location Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="LocateInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>Scan in the barcode and/or enter in the necessary information.</h3>
    <p>If scanning is not available, enter in the necessary information manually.</p>

    
    <asp:Label ID="lbl_EquipID" runat="server" Text="Equipment ID: " ></asp:Label>
    <asp:TextBox ID="tb_EquipmentID"  runat="server" MaxLength="9" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_EquipType" runat="server" Text="Equipment Type: "></asp:Label>
    <asp:DropDownList ID="ddl_EquipType" style="margin-left:50px" runat="server" Height="19px" Width="125px" CssClass="txtBox" >
        <asp:ListItem>Electrical</asp:ListItem>
        <asp:ListItem>Electric</asp:ListItem>
        <asp:ListItem>Analog</asp:ListItem>
        <asp:ListItem>Chair</asp:ListItem>
        <asp:ListItem>Table</asp:ListItem>
        <asp:ListItem>Other</asp:ListItem>
    </asp:DropDownList><br />

    <asp:Label ID="lbl_MoveDate" runat="server" Text="Equipment Moved Date: "></asp:Label>
    <asp:TextBox ID="tb_MoveDate"  runat="server" TextMode="DateTime" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_Description" runat="server" Text="Equipment Description: "></asp:Label>
    <asp:TextBox ID="tb_Description"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_LocationID" runat="server" Text="Equipment Location: "></asp:Label>
    <asp:TextBox ID="tb_LocationID"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_ProjectID" runat="server" Text="Project ID: "></asp:Label>
    <asp:TextBox ID="tb_ProjectID" runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_UserID" runat="server" Text="User ID: "></asp:Label>
    <asp:TextBox ID="tb_UserID" runat="server" CssClass="txtBox"></asp:TextBox><br /> 

    <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" />
</asp:Content>
