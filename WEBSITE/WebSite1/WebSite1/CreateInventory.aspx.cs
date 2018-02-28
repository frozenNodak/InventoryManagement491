using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Web.Configuration;
using Spire;

public partial class About : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void bt_TagNumber_Click(object sender, EventArgs e)
    {
        try
        {
            string[] datas = Spire.Barcode.BarcodeScanner.Scan(@"C:\Users\David\Documents\cs 492\WEBSITE\WebSite1\bc_M158566.png");
            this.tb_TagNumber.Text = datas[0];
        }
        catch(Exception ex)
        {
            this.tb_TagNumber.Text = "Error: " + ex.Message;
        }
    }

    

    protected void bt_CreateBC_Click(object sender, EventArgs e)
    {
        //Spire.Barcode.BarCodeGenerator generator = new Spire.Barcode.BarCodeGenerator()
    }

    protected void btn_Submit_Click(object sender, EventArgs e)
    {
        SqlConnection connectionString = new SqlConnection(WebConfigurationManager.ConnectionStrings["ChristianDBConnectionString"].ConnectionString);

        try
        {
            using (SqlConnection conn = new SqlConnection(connectionString.ToString()))
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "IMS_Insert_Equipment";
                //cmd.Parameters.AddWithValue("@TagNumber", );
                //cmd.Parameters.AddWithValue("@SerialNumber", );
                //cmd.Parameters.AddWithValue("@Description", );
                //cmd.Parameters.AddWithValue("@NumberPurchased", );
                //cmd.Parameters.AddWithValue("@DatePurchased", );
                //cmd.Parameters.AddWithValue("@CostPerItem", );
                //cmd.Parameters.AddWithValue("@ReplacementCostPerItem", );
                //cmd.Parameters.AddWithValue("@Minor", );
                //cmd.Parameters.AddWithValue("@LocationID", );

                cmd.ExecuteNonQuery();

                conn.Close();
            }
        }
        catch(Exception error)
        {  
            ClientScript.RegisterStartupScript(this.GetType(), error.Message.ToString(), "alert('" + error.Message.ToString() + "');", true);
        }
    }
}