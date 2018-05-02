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
 * Create Location
 * This page is used to create new location entries.
 * 
 */

public partial class About : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btn_Submit_Click(object sender, EventArgs e)
    {
        try
        {
            SqlConnection connectionString = new SqlConnection(ConfigurationManager.ConnectionStrings["IMSConnectionString"].ToString());

            using (connectionString)
            {
                connectionString.Open();
                SqlCommand cmd = new SqlCommand
                {
                    Connection = connectionString,
                    CommandType = System.Data.CommandType.StoredProcedure,
                    CommandText = "IMS_Insert_Location"
                };
                cmd.Parameters.AddWithValue("@Building", tb_Building.Text);
                cmd.Parameters.AddWithValue("@RoomNumber", tb_RoomNumber.Text);
                cmd.Parameters.AddWithValue("@Department", tb_Department.Text);

                cmd.ExecuteNonQuery();

                connectionString.Close();

                lbl_success.Text = "Location added successfully.";
                lbl_success.Visible = true;
            }

         }
        catch (Exception ex)
        {
            lbl_warning.Text = ex.Message;
            lbl_warning.Visible = true;
        }
    }
}