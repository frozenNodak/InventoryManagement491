<%@ Page Title="Audit Report" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="AuditReport.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="rows">
        <h2><%: Title %>.</h2>
        <h3>Print off the Audit report. You can narrow down the report with the provide categories. </h3>
        <p></p>
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
            <asp:Label ID="lbl_LocationID" runat="server" Text="Location ID:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_LocationID" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_ProjectID" runat="server" Text="Project ID:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_ProjectID" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_UserID" runat="server" Text="User ID:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_UserID" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_forAll" runat="server" Text="Click for whole inventory:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:CheckBox ID="cb_forAll" runat="server" Style="width: 175px;"></asp:CheckBox>
        </div>
    </div>

    <div class="row">
        <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" />
    </div>
</asp:Content>
