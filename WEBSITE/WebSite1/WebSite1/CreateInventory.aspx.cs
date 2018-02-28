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
            
        }
        catch(Exception ex)
        {
        }
    }

    protected void bt_CreateBC_Click(object sender, EventArgs e)
    {
        //Spire.Barcode.BarCodeGenerator generator = new Spire.Barcode.BarCodeGenerator()
    }

    protected void Btn_Submit_Click(object sender, EventArgs e)
    {
        lbl_warning.Text = "";
        System.ArgumentNullException argEx = new ArgumentNullException();
        try
        {
            var costPer = tb_CostPer.Text != string.Empty ? Convert.ToDecimal(tb_CostPer.Text): 0;
            bool IsMinor = false;
            var errorSpot = "";
            if (costPer < 5000)
            {
                IsMinor = true;
            }
            //build Equipment Object and convert types
            EquipObj newEquip = new EquipObj
            {
                TagNumber = tb_TagNumber.Text != string.Empty ? tb_TagNumber.Text : throw argEx,//this needs to be a required field
                SerialNumber = tb_SerialNum.Text,
                Description = tb_Description.Text,
                Quantity = tb_Qty.Text != string.Empty ? Convert.ToInt32(tb_Qty.Text) : 0,
                DatePurchased = tb_AquisDate.Text != string.Empty ? Convert.ToDateTime(tb_AquisDate.Text) : DateTime.Now,
                CostPerItem = costPer,
                TotalCost = tb_OGEquipmentCost.Text != string.Empty ? Convert.ToInt32(tb_OGEquipmentCost.Text) : 0,
                ReplaceCostPerItem = tb_ReplaceCostPer.Text != string.Empty ? Convert.ToInt32(tb_ReplaceCostPer.Text) : 0,
                TotalReplaceCost = tb_TotalRepCostPer.Text != string.Empty ? Convert.ToInt32(tb_TotalRepCostPer.Text) : 0,
                Minor = IsMinor,
                LocationID = tb_LocationID.Text != string.Empty ? Convert.ToInt32(tb_LocationID.Text) : 0,
                Building = tb_Building.Text,
                RoomNumber = tb_RoomNum.Text,
                Department = tb_Department.Text
            };
        }
        catch(ArgumentNullException agex)
        {
            lbl_warning.Text = agex.Message;
        }
        catch(Exception ex)
        {
            lbl_warning.Text += ex.Message;
        }
        
       //This is where the DB call will go.

    }
}