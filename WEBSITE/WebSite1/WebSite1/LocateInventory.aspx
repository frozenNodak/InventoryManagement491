<%@ Page Title="Location Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="LocateInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
        <h2>Locate Inventory</h2>
        <h3>Scan in the barcode and/or enter in the necessary information.</h3>
        <p>This locator will return a list of matching inventory.</p>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_TagNumber" runat="server" Text="Tag Number:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_TagNumber" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
        </div>
    </div>

    <%--    <asp:Label ID="lbl_EquipType" runat="server" Text="Equipment Type: "></asp:Label>
    <asp:DropDownList ID="ddl_EquipType" style="margin-left:50px" runat="server" Height="19px" Width="125px" CssClass="txtBox" >
        <asp:ListItem>Electrical</asp:ListItem>
        <asp:ListItem>Electric</asp:ListItem>
        <asp:ListItem>Analog</asp:ListItem>
        <asp:ListItem>Chair</asp:ListItem>
        <asp:ListItem>Table</asp:ListItem>
        <asp:ListItem>Other</asp:ListItem>
    </asp:DropDownList><br />--%>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_MoveDate" runat="server" Text="Last Move Date:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_MoveDate" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Description" runat="server" Text="Equipment Description: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_Description" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_LocationID" runat="server" Text="Equipment Description: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_LocationID" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_ProjectID" runat="server" Text="Project ID: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_ProjectID" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_UserID" runat="server" Text="User ID: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_UserID" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" />
    </div>
</asp:Content>
