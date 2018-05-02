using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Spire;
using System.Data.SqlClient;
using System.Configuration;
/*
 * Create Inventory
 * This page is used to create new inventory entries. 
 * 
 */
public partial class About : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //TextBoxName.Text = Convert.ToString(Request.QueryString["barcode"]);
        tb_TagNumber.Text = Convert.ToString(Request.QueryString["barcode"]);
    }

    protected void Bt_TagNumber_Click(object sender, EventArgs e)
    {
        try
        {
            Response.Redirect("http://zxing.appspot.com/scan?ret=http%3A%2F%2Flocalhost%3A4739%2FCreateInventory%3Fbarcode%3D%7BCODE%7D");
        }
        catch (Exception ex)
        {

            this.tb_TagNumber.Text = "Error: " + ex.Message;
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
            // If we have empty strings in these boxes which expect numbers, set the value to a number
            var costPer = tb_EquipmentCost.Text != string.Empty ? Convert.ToDecimal(tb_EquipmentCost.Text) : 0;
            var qty = tb_NumberPurchased.Text != string.Empty ? Convert.ToInt32(tb_NumberPurchased.Text) : 0;
            // Set if equipment is minor
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

            // Set our connection to the database to the connection string
            SqlConnection connectionString = new SqlConnection(ConfigurationManager.ConnectionStrings["IMSConnectionString"].ToString());
            // Using our new connection string
            using (connectionString)
            {
                // Open our connection
                connectionString.Open();
                // Set command details
                SqlCommand cmd = new SqlCommand
                {
                    Connection = connectionString,
                    CommandType = System.Data.CommandType.StoredProcedure,
                    CommandText = "IMS_Insert_Equipment"
                };
                // Pass parameter values     @ParameterName, Value.to.pass
                cmd.Parameters.AddWithValue("@TagNumber", newEquip.TagNumber);
                cmd.Parameters.AddWithValue("@SerialNumber", newEquip.SerialNumber);
                cmd.Parameters.AddWithValue("@Description", newEquip.Description);
                cmd.Parameters.AddWithValue("@NumberPurchased", newEquip.Quantity);
                cmd.Parameters.AddWithValue("@DatePurchased", newEquip.DatePurchased);
                cmd.Parameters.AddWithValue("@CostPerItem", newEquip.CostPerItem);
                cmd.Parameters.AddWithValue("@ReplacementCostPerItem", newEquip.ReplaceCostPerItem);
                cmd.Parameters.AddWithValue("@Minor", newEquip.Minor);
                cmd.Parameters.AddWithValue("@LocationID", newEquip.LocationID);
                // Execute the command
                cmd.ExecuteNonQuery();
                // Close the connection
                connectionString.Close();
                // Display a success message, since by this point it went through
                lbl_success.Text = "Inventory added successfully.";
                lbl_success.Visible = true;
            }
        }
        catch (ArgumentNullException agex)
        {
            // Display the error message that we caught
            lbl_warning.Text = agex.Message;
            lbl_warning.Visible = true;
        }
        catch (Exception ex)
        {
            // Display the error message that we caught
            lbl_warning.Text = ex.Message;
            lbl_warning.Visible = true;
        }
    }
}