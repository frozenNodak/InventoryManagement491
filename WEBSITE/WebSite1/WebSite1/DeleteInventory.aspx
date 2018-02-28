<%@ Page Title="Delete Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="DeleteInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
        <h2><%: Title %>.</h2>
        <h3>Scan in the barcode and/or enter in the necessary information.</h3>
        <p>The Tag Number is required. It will return the top matches with the information provided.</p>
        <p><asp:Label ID="lbl_warning" runat="server" Text="" ForeColor="red"></asp:Label></p>
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
            <asp:Label ID="lbl_SerialNumber" runat="server" Text="Serial Number:"></asp:Label>
        </div>
        <div class="column" style="float: left; width: 15%;">
            <asp:TextBox ID="tb_SerialNumber" runat="server" Style="width:175px;" MaxLength="22"></asp:TextBox>
        </div>
    </div>

    <div class="row">
         <div class="column" style="float: left; width: 20%;">
             <asp:Label ID="lbl_Desciption" runat="server" Text="Item Description:"></asp:Label>
         </div>
         <div class="column" style="float: left; width: 20%;">
             <asp:TextBox ID="tb_Description" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
         </div>
     </div>

   <%-- <div class="row">
         <div class="column" style="float: left; width: 20%;">
             <asp:Label ID="lbl_Reason" runat="server" Text="Reason for Deletion:"></asp:Label>
         </div>
         <div class="column" style="float: left; width: 20%;">
             <asp:TextBox ID="tb_reason" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
         </div>
     </div>--%>

    <div class="row">
         <div class="column" style="float: left; width: 20%;">
             <asp:Label ID="lbl_UserID" runat="server" Text="User ID:"></asp:Label>
         </div>
         <div class="column" style="float: left; width: 20%;">
             <asp:TextBox ID="tb_UserID" runat="server" MaxLength="7" Style="width: 175px;"></asp:TextBox>
         </div>
     </div>

   <%-- <asp:Label ID="lbl_TagID" runat="server" Text="Tag ID: " ></asp:Label>
    <asp:TextBox ID="tb_EquipmentID"  runat="server" MaxLength="9" CssClass="txtBox"></asp:TextBox><br /> 

    <asp:Label ID="lbl_Description" runat="server" Text="Equipment Description: "></asp:Label>
    <asp:TextBox ID="tb_Description"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_Reason" runat="server" Text="Reason for Deletion: "></asp:Label>
    <asp:TextBox ID="tb_reason"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_UserID" runat="server" Text="User ID: "></asp:Label>
    <asp:TextBox ID="tb_UserID" runat="server" CssClass="txtBox"></asp:TextBox><br />--%>

    <div class="row">
        <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" OnClick="Btn_Submit_Click"/>
    </div>
</asp:Content>
