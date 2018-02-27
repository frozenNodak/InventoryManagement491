<%@ Page Title="Update Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="UpdateInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>Scan in the barcode and/or enter in the necessary information.</h3>
    <p>If scanning is not available, enter in the necessary information manually. Fields that can be updated are: Status, Location, and User</p>

    <asp:Label ID="lbl_EquipStatus" runat="server" Text="Equipment Status: "></asp:Label>
    <asp:TextBox ID="tb_EquipStatus" runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_EquipID" runat="server" Text="Equipment ID: "></asp:Label>
    <asp:TextBox ID="tb_EquipmentID" runat="server" MaxLength="9" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_LocationID" runat="server" Text="Equipment Location: "></asp:Label>
    <asp:TextBox ID="tb_LocationID" runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_UserID" runat="server" Text="User ID: "></asp:Label>
    <asp:TextBox ID="tb_UserID" runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" />
</asp:Content>
