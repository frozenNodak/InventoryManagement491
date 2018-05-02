<%@ Page Title="Create Location" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="CreateLocation.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="header" runat="server">
        <div class="row">
            <h2>Create Location</h2>
            <h3>Create locations to assign to inventory.</h3>
            <p><asp:Label ID="lbl_warning" runat="server" Text="" ForeColor="red" Visible="false"></asp:Label></p>
            <p><asp:Label ID="lbl_success" runat="server" Text="" ForeColor="green" Visible="false"></asp:Label></p>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Building" runat="server" Text="Building:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_Building" runat="server" MaxLength="50" Style="width:175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_RoomNumber" runat="server" Text="Room Number:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_RoomNumber" runat="server" MaxLength="10" Style="width:175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Label ID="lbl_Department" runat="server" Text="Department:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 20%;">
            <asp:TextBox ID="tb_Department" runat="server" MaxLength="50" Style="width:175px;"></asp:TextBox>
        </div>
    </div>

    <div class="row">
        <div class="column" style="float: left; width: 20%;">
            <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" OnClick="btn_Submit_Click" />
        </div>
    </div>
</asp:Content>