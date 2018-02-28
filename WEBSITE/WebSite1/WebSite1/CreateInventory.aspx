<%@ Page Title="Create Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="CreateInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>Scan in the barcode and/or enter in the necessary information.</h3>
    <p>(FOR NOW) If scanning is not available, enter in the necessary information manually.</p>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_TagNumber" runat="server" Text="Tag Number:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_TagNumber" runat="server" MaxLength="7" Style="width:175px;"></asp:TextBox>
        </div>
        <div class="column" style="float: left; width: 10%;">
            <asp:Button ID="bt_TagNumber" runat="server" Text="Scan Barcode" OnClick="bt_TagNumber_Click"></asp:Button>
        </div>
        <div class="column" style="float: left; width: 10%;">
            <asp:Button ID="bt_CreateBarcode" runat="server" Text="Create Barcode" OnClick="bt_TagNumber_Click"></asp:Button>
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
            <asp:Label ID="lbl_Description" runat="server" Text="Description:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 30%;">
            <asp:TextBox ID="tb_Description" runat="server" Style="width:175px;" MaxLength="50"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_NumberPurchased" runat="server" Text="Number Purchased:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 30%;">
            <asp:TextBox ID="tb_NumberPurchased" runat="server" Style="width:175px;" MaxLength="50"></asp:TextBox>
        </div>
    </div>

    <%--<div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_EquipType" runat="server" Text="Equipment Type: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:DropDownList ID="ddl_EquipType" Style="width:175px;" runat="server"  Width="125px">
                <asp:ListItem>Electrical</asp:ListItem>
                <asp:ListItem>Electric</asp:ListItem>
                <asp:ListItem>Analog</asp:ListItem>
                <asp:ListItem>Chair</asp:ListItem>
                <asp:ListItem>Table</asp:ListItem>
                <asp:ListItem>Other</asp:ListItem>
            </asp:DropDownList>

        </div>
    </div>--%>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_PurchaseDate" runat="server" Text="Purchase Date: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:TextBox ID="tb_PurchaseDate" runat="server" TextMode="DateTime" Style="width: 175px;"></asp:TextBox><%--TODO: Find a date picker to use instead--%>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_EquipCost" runat="server" Text="Equipment Cost:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:TextBox ID="tb_EquipmentCost" runat="server" Style="width:175px;"></asp:TextBox>
        </div>
    </div>

    

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_ReplacementCost" runat="server" Text="Replacement Cost Per Item: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:TextBox ID="tb_ReplasementCost" runat="server" TextMode="DateTime" Style="width: 175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Minor" runat="server" Text="Is Equipment Minor?"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:CheckBox ID="cb_Minor" runat="server" Text=" Yes" />
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

    <br />
    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" OnClick="btn_Submit_Click" />
        </div>
    </div>
</asp:Content>
