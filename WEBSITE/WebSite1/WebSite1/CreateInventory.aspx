<%@ Page Title="Create Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="CreateInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>Scan in the barcode and/or enter in the necessary information.</h3>
    <p> <asp:Label ID="lbl_warning" runat="server" Text="" ForeColor="Red"></asp:Label></p>

    <asp:Button ID="bt_EquipID" runat="server" Text="Scan Barcode" OnClick="bt_EquipID_Click"></asp:Button>
    <asp:Button ID="bt_CreateBarcode" runat="server" Text="Create Barcode" OnClick="bt_CreateBC_Click"></asp:Button><br />

    <asp:Label ID="lbl_TagNumber" runat="server" Text="Tag Number: " AssociatedControlID="tb_TagNumber"></asp:Label>
    <asp:TextBox ID="tb_TagNumber"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_SerialNum" runat="server" Text="Serial Number: " AssociatedControlID="tb_SerialNum"></asp:Label>
    <asp:TextBox ID="tb_SerialNum"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_Description" runat="server" Text="Equipment Description: " AssociatedControlID="tb_Description"></asp:Label>
    <asp:TextBox ID="tb_Description"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_Qty" runat="server" Text="Equipment Quantity: " AssociatedControlID="tb_Qty"></asp:Label>
    <asp:TextBox ID="tb_Qty"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_CostPer" runat="server" Text="Cost Per Item: $" AssociatedControlID="tb_CostPer"></asp:Label>
    <asp:TextBox ID="tb_CostPer"  runat="server" CssClass="txtBox"></asp:TextBox><br />
    <%--if cost per item is <5000 then it is minor --%>

    <asp:Label ID="lbl_OGEquipCost" runat="server" Text="Total Original Cost: $" AssociatedControlID="tb_OGEquipmentCost"></asp:Label>
    <asp:TextBox ID="tb_OGEquipmentCost"  runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_ReplaceCostPer" runat="server" Text="Replacement Cost Per Item: $" AssociatedControlID="tb_ReplaceCostPer"></asp:Label>
    <asp:TextBox ID="tb_ReplaceCostPer"  runat="server" CssClass="txtBox"></asp:TextBox><br />
    
    <asp:Label ID="lbl_TotalRepCostPer" runat="server" Text="Total Replacement Cost: $" AssociatedControlID="tb_TotalRepCostPer"></asp:Label>
    <asp:TextBox ID="tb_TotalRepCostPer"  runat="server" CssClass="txtBox"></asp:TextBox><br />
    
    <asp:Label ID="lbl_LocationID" runat="server" Text="Equipment LocationID: " AssociatedControlID="tb_LocationID"></asp:Label>
    <asp:TextBox ID="tb_LocationID"  runat="server" CssClass="txtBox"></asp:TextBox><br />
    
    <asp:Label ID="lbl_Building" runat="server" Text="Building: " AssociatedControlID="tb_Building"></asp:Label>
    <asp:TextBox ID="tb_Building"  runat="server" CssClass="txtBox"></asp:TextBox><br />
    
    <asp:Label ID="lbl_RoomNum" runat="server" Text="Room Number: " AssociatedControlID="tb_RoomNum"></asp:Label>
    <asp:TextBox ID="tb_RoomNum"  runat="server" CssClass="txtBox"></asp:TextBox><br />
    
    <asp:Label ID="lbl_Department" runat="server" Text="Department: " AssociatedControlID="tb_Department"></asp:Label>
    <asp:TextBox ID="tb_Department"  runat="server" CssClass="txtBox"></asp:TextBox><br />

   
    

    <asp:Label ID="lbl_AquisDate" runat="server" Text="Acquisition Date: " AssociatedControlID="tb_AquisDate"></asp:Label>
    <asp:TextBox ID="tb_AquisDate" runat="server" TextMode="DateTime" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_UserID" runat="server" Text="User ID: " AssociatedControlID="tb_UserID"></asp:Label>
    <asp:TextBox ID="tb_UserID" runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_UseRestrict" runat="server" Text="Usage Restriction: " AssociatedControlID="tb_UseRestrict"></asp:Label>
    <asp:TextBox ID="tb_UseRestrict"  runat="server" CssClass="txtBox"></asp:TextBox><br />


   <%-- <asp:Label ID="lbl_equiptype" runat="server" Text="equipment type: "></asp:Label>
    <asp:DropDownList ID="ddl_equiptype" Style="margin-left: 50px" runat="server" Height="19px" Width="125px" CssClass="txtbox">
        <asp:ListItem>electrical</asp:ListItem>
        <asp:ListItem>electric</asp:ListItem>
        <asp:ListItem>analog</asp:ListItem>
        <asp:ListItem>chair</asp:ListItem>
        <asp:ListItem>table</asp:ListItem>
        <asp:ListItem>other</asp:ListItem>
    </asp:DropDownList><br>


    <asp:Label ID="lbl_Admin" runat="server" Text="Administrator: "></asp:Label>
    <asp:TextBox ID="tb_Admin" runat="server" CssClass="txtBox"></asp:TextBox><br />

    <asp:Label ID="lbl_ProjectID" runat="server" Text="Project ID: "></asp:Label>
    <asp:TextBox ID="tb_ProjectID" runat="server" CssClass="txtBox"></asp:TextBox><br />



    <asp:Label ID="lbl_AdminName" runat="server" Text="Administrators Name: "></asp:Label>
    <asp:TextBox ID="tb_AdminName" runat="server" CssClass="txtBox"></asp:TextBox><br />--%>

    <asp:Button ID="btn_Submit" runat="server" Text="Submit Info" OnClick="Btn_Submit_Click" />
</asp:Content>
