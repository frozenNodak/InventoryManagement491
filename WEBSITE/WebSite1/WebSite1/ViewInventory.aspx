<%@ Page Title="View Inventory" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="ViewInventory.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
        <h2>View and Edit Inventory</h2>
        <p>
            <asp:Label ID="lbl_warning" runat="server" Text="" ForeColor="red"></asp:Label></p>
    </div>

    <div class="row">
        <asp:GridView ID="gvEquipment" runat="server" AllowPaging="true" AllowSorting="true" DataSourceID="Select_Equipment" AutoGenerateColumns="false" AutoGenerateEditButton="true">
            <Columns>
                
                <asp:TemplateField HeaderText="Tag Number" SortExpression="TagNumber">
                    <ItemTemplate>
                        <%#Eval("TagNumber") %>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="tb_TagNumber" runat="server" MaxLength="7" Text='<%#Eval("TagNumber") %>'></asp:TextBox>
                        <asp:RequiredFieldValidator ID="rfv_TagNumber" runat="server" ControlToValidate="tb_TagNumber" Display="Dynamic" Text="Please enter a tag number." ForeColor="Red"></asp:RequiredFieldValidator>
                    </EditItemTemplate>
                </asp:TemplateField>

                <asp:TemplateField HeaderText="Serial Number" SortExpression="SerialNumber">
                    <ItemTemplate>
                        <%#Eval("SerialNumber") %>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="tb_SerialNumber" runat="server" MaxLength="25" Text='<%#Eval("SerialNumber") %>'></asp:TextBox>
                        <asp:RequiredFieldValidator ID="rfv_SerialNumber" runat="server" ControlToValidate="tb_SerialNumber" Display="Dynamic" Text="Please enter a serial number." ForeColor="Red"></asp:RequiredFieldValidator>
                    </EditItemTemplate>
                </asp:TemplateField>

                <asp:TemplateField HeaderText="Description" SortExpression="Description">
                    <ItemTemplate>
                        <%#Eval("Description") %>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="tb_Description" runat="server" MaxLength="50" Text='<%#Eval("Description") %>'></asp:TextBox>
                        <asp:RequiredFieldValidator ID="rfv_Description" runat="server" ControlToValidate="tb_Description" Display="Dynamic" Text="Please enter a description number." ForeColor="Red"></asp:RequiredFieldValidator>
                    </EditItemTemplate>
                </asp:TemplateField>

                <asp:TemplateField HeaderText="Number Purchased" SortExpression="NumberPurchased">
                    <ItemTemplate>
                        <%#Eval("NumberPurchased") %>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="tb_NumberPurchased" runat="server" Text='<%#Eval("NumberPurchased") %>' Type="number"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="rfv_NumberPurchased" runat="server" ControlToValidate="tb_NumberPurchased" Display="Dynamic" Text="Please enter number purchased." ForeColor="Red"></asp:RequiredFieldValidator>
                    </EditItemTemplate>
                </asp:TemplateField>

                <asp:TemplateField HeaderText="Date Purchased" SortExpression="DatePurchased">
                    <ItemTemplate>
                        <%#Eval("DatePurchased") %>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:Textbox ID="tb_DatePurchased" runat="server" Text='<%#Eval("DatePurchased") %>' Type="date" ></asp:Textbox>
                        <asp:RequiredFieldValidator ID="rfv_DatePurchased" runat="server" ControlToValidate="tb_DatePurchased" Display="Dynamic" Text="Please enter date purchased." ForeColor="Red"></asp:RequiredFieldValidator>
                    </EditItemTemplate>
                </asp:TemplateField>

                <asp:TemplateField HeaderText="Cost Per Item" SortExpression="CostPerItem">
                    <ItemTemplate>
                        <%#Eval("CostPerItem") %>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="tb_CostPerItem" runat="server" Text='<%#Eval("CostPerItem") %>' Type="number"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="rfv_CostPerItem" runat="server" ControlToValidate="tb_CostPerItem" Display="Dynamic" Text="Please enter cost per item." ForeColor="Red"></asp:RequiredFieldValidator>
                    </EditItemTemplate>
                </asp:TemplateField>

                <asp:TemplateField HeaderText="Replacement Cost Per Item" SortExpression="ReplacementCostPerItem">
                    <ItemTemplate>
                        <%#Eval("ReplacementCostPerItem") %>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="tb_ReplacementCostPerItem" runat="server" Text='<%#Eval("ReplacementCostPerItem") %>' Type="number"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="rfv_ReplacementCostPerItem" runat="server" ControlToValidate="tb_ReplacementCostPerItem" Display="Dynamic" Text="Please enter replacement cost per item." ForeColor="Red"></asp:RequiredFieldValidator>
                    </EditItemTemplate>
                </asp:TemplateField>

                <asp:CheckBoxField DataField="Minor" HeaderText="Minor?" ReadOnly="true"  SortExpression="Minor"/>

                <asp:TemplateField HeaderText="Location" SortExpression="Location">
                    <ItemTemplate>
                        <%#Eval("Location") %>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:DropDownList ID="ddl_Location" runat="server" SelectedIndex='<%#Eval("LocationID") %>' DataSourceID="Select_Locations" DataTextField="Location" DataValueField="LocationID"></asp:DropDownList>
                        <asp:RequiredFieldValidator ID="rfv_Location" runat="server" ControlToValidate="ddl_Location" Display="Dynamic" Text="Please enter location." ForeColor="Red"></asp:RequiredFieldValidator>
                    </EditItemTemplate>
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>

    <asp:SqlDataSource ID="Select_Equipment" runat="server" ConnectionString="<%$ ConnectionStrings:IMSConnectionString %>"
        SelectCommandType="StoredProcedure" SelectCommand="IMS_Select_Equipment" UpdateCommandType="StoredProcedure" UpdateCommand="IMS_Update_Equipment"
        DeleteCommandType="StoredProcedure" DeleteCommand="IMS_Delete_Equipment" >
        <UpdateParameters>
            <asp:ControlParameter runat="server" ControlID="lbl_EquipmentID" PropertyName="Text" Name="EquipmentID"/>
        </UpdateParameters>
    </asp:SqlDataSource>

    <asp:SqlDataSource ID="Select_Locations" runat="server" ConnectionString="<%$ ConnectionStrings:IMSConnectionString %>" SelectCommandType="StoredProcedure" SelectCommand="IMS_Select_Location"></asp:SqlDataSource>
</asp:Content>
