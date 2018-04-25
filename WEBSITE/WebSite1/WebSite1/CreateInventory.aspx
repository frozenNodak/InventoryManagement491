<%@ Page Title="Create Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="CreateInventory.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="header" runat="server">
<div class="row">
        <h2>Create Inventory</h2>
        <h3>Scan in the barcode and/or enter in the necessary information.</h3>
        <p><asp:Label ID="lbl_warning" runat="server" Text="" ForeColor="red" Visible="false"></asp:Label></p>
        <p><asp:Label ID="lbl_success" runat="server" Text="" ForeColor="green" Visible="false"></asp:Label></p>
    </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_TagNumber" runat="server" Text="Tag Number:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_TagNumber" runat="server" MaxLength="7" Style="width:175px;"></asp:TextBox>
        </div>
        <div class="column" style="float: left; width: 10%;">
            <asp:Button ID="bt_TagNumber" runat="server" Text="Scan Barcode" OnClick="Bt_TagNumber_Click"></asp:Button>
        </div>
        <div class="column" style="float: left; width: 10%;">
            <asp:Button ID="bt_CreateBarcode" runat="server" Text="Create Barcode" OnClick="Bt_TagNumber_Click"></asp:Button>
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

<%--    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Minor" runat="server" Text="Is Equipment Minor?"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:CheckBox ID="cb_Minor" runat="server" Text=" Yes" />
        </div>
    </div>--%><%--Calculate minor by item cost--%>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Location" runat="server" Text="Location: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:DropDownList ID="ddl_Location" Style="width:175px;" runat="server"  Width="125px" DataSourceID="Select_Locations" DataTextField="Location" DataValueField="LocationID" />  <%--TODO: Bind locations from DB--%>
        </div>
    </div>

   <%-- <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Building" runat="server" Text="Building: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:DropDownList ID="ddl_Building" Style="width:175px;" runat="server"  Width="125px" />  
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_RoomNumber" runat="server" Text="Room Number: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:DropDownList ID="ddl_RoomNumber" Style="width:175px;" runat="server"  Width="125px" /> 
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Department" runat="server" Text="Department: "></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:DropDownList ID="ddl_Department" Style="width:175px;" runat="server"  Width="125px" />  
        </div>
    </div>--%>

    <br />
    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" OnClick="Btn_Submit_Click" />
        </div>
    </div>

    <asp:SqlDataSource ID="Select_Locations" runat="server" ConnectionString="<%$ ConnectionStrings:IMSConnectionString %>" SelectCommandType="StoredProcedure" SelectCommand="IMS_Select_Location"></asp:SqlDataSource>

</asp:Content>
