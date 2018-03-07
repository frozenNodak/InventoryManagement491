<%@ Page Title="Update Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="UpdateInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
        <h2><%: Title %>.</h2>
        <h3>Scan in the barcode and/or enter in the necessary information.</h3>
        <p>If scanning is not available, enter in the necessary information manually. Fields that can be updated are: Status, Location, and User</p>
        <p>
            <asp:Label ID="lbl_warning" runat="server" Text="" ForeColor="red"></asp:Label></p>
    </div>

    <div class="row">
         <div class="column" style="float: left; width: 20%;">
             <asp:Label ID="lbl_TagNumber" runat="server" Text="Tag Number:"></asp:Label>
         </div>
         <div class="column" style="float: left; width: 20%;">
             <asp:TextBox ID="tb_TagNumber" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
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

    <div class="row">
         <div class="column" style="float: left; width: 20%;">
             <asp:Label ID="lbl_UserID" runat="server" Text="User ID:"></asp:Label>
         </div>
         <div class="column" style="float: left; width: 20%;">
             <asp:TextBox ID="tb_UserID" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
         </div>
     </div>

    <%--<asp:Label ID="lbl_EquipStatus" runat="server" Text="Equipment Status: "></asp:Label>
    <asp:TextBox ID="tb_EquipStatus" runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_LocationID" runat="server" Text="Equipment Location: "></asp:Label>
    <asp:TextBox ID="tb_LocationID" runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_UserID" runat="server" Text="User ID: "></asp:Label>
    <asp:TextBox ID="tb_UserID" runat="server" CssClass="txtBox"></asp:TextBox><br />--%>

    <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" />
</asp:Content>
