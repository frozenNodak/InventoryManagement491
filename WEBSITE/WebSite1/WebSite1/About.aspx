<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="About.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>Inventory System for Minor and Major Equipment</h3>
    <p>Departments at UND maintain major and minor inventory lists. Assets are tagged with barcoded stickers. Modern smart phones can take pictures which are high enough resolution to read the barcodes. I would like to leverage these facts to create an smartphone based (Android first, other phone OS’s could be added later) inventory system. We would need to have the data stored on a server and then 1 (or more) apps to manage the data. From a smartphone, I would want to be able to locate, verify, update, and/or move inventory. I would also want to be able to use my smartphone to create, view, update, disable, or remove other users (as an admin…Obviously regular users shouldn’t be able to do that), as well as check the logs for recent activity. The system will be live, so it will need authentication and be able to handle multiple, concurrent users. System will also need to produce Excel files (or CSV’s) as well as accept Excel files (or CSV’s) of the inventory items.</p>
</asp:Content>
