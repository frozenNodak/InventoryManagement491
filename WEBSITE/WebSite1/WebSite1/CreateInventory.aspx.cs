using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Spire;

public partial class About : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void bt_EquipID_Click(object sender, EventArgs e)
    {
        try
        {
            string[] datas = Spire.Barcode.BarcodeScanner.Scan(@"C:\Users\David\Documents\cs 492\WEBSITE\WebSite1\bc_M158566.png");
            this.tb_EquipmentID.Text = datas[0];
        }
        catch(Exception ex)
        {
            this.tb_EquipmentID.Text = "Error: " + ex.Message;
        }
    }

    protected void bt_CreateBC_Click(object sender, EventArgs e)
    {
        //Spire.Barcode.BarCodeGenerator generator = new Spire.Barcode.BarCodeGenerator()
    }
}