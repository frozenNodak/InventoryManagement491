using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Spire;
using System.Data.SqlClient;
using System.Configuration;

public partial class About : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void Bt_TagNumber_Click(object sender, EventArgs e)
    {
        try
        {
            string[] datas = Spire.Barcode.BarcodeScanner.Scan(@"C:\Users\David\Documents\cs 492\WEBSITE\WebSite1\bc_M158566.png");
            tb_TagNumber.Text = datas[0];
        }
        catch (Exception ex)
        {
            tb_TagNumber.Text = "Error: " + ex.Message;
        }
    }

    protected void Bt_CreateBC_Click(object sender, EventArgs e)
    {
        //Spire.Barcode.BarCodeGenerator generator = new Spire.Barcode.BarCodeGenerator()
    }

    protected void Btn_Submit_Click(object sender, EventArgs e)
    {
        System.ArgumentNullException argEx = new ArgumentNullException();
        try
        {
            var costPer = tb_EquipmentCost.Text != string.Empty ? Convert.ToDecimal(tb_EquipmentCost.Text) : 0;
            var qty = tb_NumberPurchased.Text != string.Empty ? Convert.ToInt32(tb_NumberPurchased.Text) : 0;
            bool IsMinor = false;
            if (costPer < 5000)
            {
                IsMinor = true;
            }
            //build Equipment Object and convert types
            EquipObj newEquip = new EquipObj
            {
                TagNumber = tb_TagNumber.Text != string.Empty ? tb_TagNumber.Text : throw argEx,//this needs to be a required field
                SerialNumber = tb_SerialNumber.Text,
                Description = tb_Description.Text,
                Quantity = qty,
                DatePurchased = tb_PurchaseDate.Text != string.Empty ? Convert.ToDateTime(tb_PurchaseDate.Text) : DateTime.Now,
                CostPerItem = costPer,
                TotalCost = tb_EquipmentCost.Text != string.Empty ? Convert.ToDecimal(tb_EquipmentCost.Text) * qty : 0,
                ReplaceCostPerItem = tb_ReplasementCost.Text != string.Empty ? Convert.ToDecimal(tb_ReplasementCost.Text) : 0,
                TotalReplaceCost = tb_ReplasementCost.Text != string.Empty ? Convert.ToDecimal(tb_ReplasementCost.Text) * qty : 0,
                Minor = IsMinor,
                LocationID = ddl_Location.SelectedValue != string.Empty ? Convert.ToInt32(ddl_Location.SelectedValue) : 0
            };


            SqlConnection connectionString = new SqlConnection(ConfigurationManager.ConnectionStrings["IMSConnectionString"].ToString());

            using (connectionString)
            {
                connectionString.Open();
                SqlCommand cmd = new SqlCommand
                {
                    Connection = connectionString,
                    CommandType = System.Data.CommandType.StoredProcedure,
                    CommandText = "IMS_Insert_Equipment"
                };
                cmd.Parameters.AddWithValue("@TagNumber", newEquip.TagNumber);
                cmd.Parameters.AddWithValue("@SerialNumber", newEquip.SerialNumber);
                cmd.Parameters.AddWithValue("@Description", newEquip.Description);
                cmd.Parameters.AddWithValue("@NumberPurchased", newEquip.Quantity);
                cmd.Parameters.AddWithValue("@DatePurchased", newEquip.DatePurchased);
                cmd.Parameters.AddWithValue("@CostPerItem", newEquip.CostPerItem);
                cmd.Parameters.AddWithValue("@ReplacementCostPerItem", newEquip.ReplaceCostPerItem);
                cmd.Parameters.AddWithValue("@Minor", newEquip.Minor);
                cmd.Parameters.AddWithValue("@LocationID", newEquip.LocationID);

                cmd.ExecuteNonQuery();

                connectionString.Close();
            }
        }
        catch (ArgumentNullException agex)
        {
            lbl_warning.Text = agex.Message;
            lbl_warning.Visible = true;
        }
        catch (Exception ex)
        {
            lbl_warning.Text = ex.Message;
            lbl_warning.Visible = true;
        }
        //catch (Exception error)
        //{
        //    ClientScript.RegisterStartupScript(this.GetType(), error.Message.ToString(), "alert('" + error.Message.ToString() + "');", true);
        //}


    }
}