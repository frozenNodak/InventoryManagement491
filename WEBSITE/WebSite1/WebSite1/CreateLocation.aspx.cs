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
                    // Set the connection of the command
                    Connection = connectionString,
                    // Set the command type, we use stored procedures
                    CommandType = System.Data.CommandType.StoredProcedure,
                    // Give the name of the command, we use the name of our stored procedure
                    CommandText = "IMS_Insert_Location"
                };
                // Pass parameter values     @ParameterName, Value.to.pass
                cmd.Parameters.AddWithValue("@Building", tb_Building.Text);
                cmd.Parameters.AddWithValue("@RoomNumber", tb_RoomNumber.Text);
                cmd.Parameters.AddWithValue("@Department", tb_Department.Text);
                // Execute the command
                cmd.ExecuteNonQuery();
                // Close the connection
                connectionString.Close();
                // Display a success message, since by this point it went through
                lbl_success.Text = "Location added successfully.";
                lbl_success.Visible = true;
            }

         }
        catch (Exception ex)
        {
            // Display the error message that we caught
            lbl_warning.Text = ex.Message;
            lbl_warning.Visible = true;
        }
    }
}