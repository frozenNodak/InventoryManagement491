<%@ Page Title="Delete Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="DeleteInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>Scan in the barcode and/or enter in the necessary information.</h3>
    <p>If scanning is not available, enter in the necessary information manually. User must have the proper authorization to remove inventory</p>

    
    <asp:Label ID="lbl_EquipID" runat="server" Text="Equipment ID: " ></asp:Label>
    <asp:TextBox ID="tb_EquipmentID"  runat="server" MaxLength="9" CssClass="txtBox"></asp:TextBox><br /> 

    <asp:Label ID="lbl_Description" runat="server" Text="Equipment Description: "></asp:Label>
    <asp:TextBox ID="tb_Description"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_Reason" runat="server" Text="Reason for Deletion: "></asp:Label>
    <asp:TextBox ID="tb_reason"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_UserID" runat="server" Text="User ID: "></asp:Label>
    <asp:TextBox ID="tb_UserID" runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" />
</asp:Content>
