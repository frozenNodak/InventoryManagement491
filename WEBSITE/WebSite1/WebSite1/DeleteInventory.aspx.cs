﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class About : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        tb_TagNumber.Text = Convert.ToString(Request.QueryString["barcode"]);
        EquipObj loadEquip = new EquipObj();
        if (VerifyTagNum(tb_TagNumber.Text))
        {
            SqlConnection connectionString = new SqlConnection(WebConfigurationManager.ConnectionStrings["IMSConnectionString"].ToString());

            using (SqlConnection conn = new SqlConnection(connectionString.ToString()))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand
                {
                    Connection = conn,
                    CommandType = System.Data.CommandType.StoredProcedure,
                    CommandText = "IMS_Get_Select_Equipment"
                };
                cmd.Parameters.Add(new SqlParameter("@TagNumber", tb_TagNumber.Text));//should only return one row
                using (SqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        //query based on the tag number
                        loadEquip.TagNumber = rdr["TagNumber"].ToString();
                        loadEquip.SerialNumber = rdr["SerialNumber"].ToString();
                        loadEquip.Description = rdr["Description"].ToString();
                        loadEquip.Quantity = Convert.ToInt32(rdr["NumberPerchased"]);
                        loadEquip.DatePurchased = Convert.ToDateTime(rdr["DatePurchased"]);
                        loadEquip.CostPerItem = Convert.ToInt32(rdr["CostPerItem"]);
                        loadEquip.TotalCost = Convert.ToInt32(rdr["TotalOriginalCost"]);
                        loadEquip.ReplaceCostPerItem = Convert.ToInt32(rdr["ReplacementCostPerItem"]);
                        loadEquip.TotalReplaceCost = Convert.ToInt32(rdr["TotalReplacementCost"]);
                        loadEquip.Minor = Convert.ToBoolean(rdr["Minor"].ToString());
                        //add in something to get the location of the equip
                    }
                }
                conn.Close();
            }
            tb_SerialNumber.Text = loadEquip.TagNumber;
            tb_Description.Text = loadEquip.Description;
            //show the location of the equip
        }
    }

    protected bool VerifyTagNum(string tag)
    {
        if (tag.Any(ch => !char.IsLetterOrDigit(ch)))
        {
            return false;
        }
        if (!char.IsLetter(tag.FirstOrDefault()))
        {
            return false;
        }
        return true;
    }

    protected void Scan_function(object sender, EventArgs e)
    {
        try
        {
            Response.Redirect("http://zxing.appspot.com/scan?ret=http%3A%2F%2Flocalhost%3A4739%2FCreateInventory%3Fbarcode%3D%7BCODE%7D");
        }
        catch (Exception ex)
        {

            this.lbl_warning.Text = "Error: " + ex.Message;
        }
    }
    protected void Btn_Submit_Click(object sender, EventArgs e)
    {
        lbl_warning.Text = "";
        System.ArgumentNullException argEx = new ArgumentNullException();
        try
        {
            var UserID = tb_UserID.Text != string.Empty ? tb_UserID.Text : throw argEx;//required
            //build Equipment Object and convert types
            EquipObj newEquip = new EquipObj
            {
                TagNumber = tb_TagNumber.Text != string.Empty ? tb_TagNumber.Text : throw argEx,//this needs to be a required field
                SerialNumber = tb_SerialNumber.Text,
                Description = tb_Description.Text
            };
        }
        catch (ArgumentNullException agex)
        {
            lbl_warning.Text = agex.Message;
        }
        catch (Exception ex)
        {
            lbl_warning.Text += ex.Message;
        }
        SqlConnection connectionString = new SqlConnection(WebConfigurationManager.ConnectionStrings["ChristianDBConnectionString"].ConnectionString);

        try
        {
            //using (SqlConnection conn = new SqlConnection(connectionString.ToString()))
            //{
            //    SqlCommand cmd = new SqlCommand();
            //    cmd.Connection = conn;
            //    cmd.CommandType = System.Data.CommandType.StoredProcedure;
            //    cmd.CommandText = "IMS_Insert_Equipment";
            //    //cmd.Parameters.AddWithValue("@TagNumber", newEquip.TagNumber);
            //    //cmd.Parameters.AddWithValue("@SerialNumber", newEquip.SerialNumber);
            //    //cmd.Parameters.AddWithValue("@Description", newEquip.Description);
            //    //cmd.Parameters.AddWithValue("@NumberPurchased", newEquip.Quantity);
            //    //cmd.Parameters.AddWithValue("@DatePurchased", newEquip.DatePurchased);
            //    //cmd.Parameters.AddWithValue("@CostPerItem", newEquip.CostPerItem);
            //    //cmd.Parameters.AddWithValue("@TotalOriginalCost", newEquip.TotalCost);
            //    //cmd.Parameters.AddWithValue("@ReplacementCostPerItem", newEquip.ReplaceCostPerItem);
            //    //cmd.Parameters.AddWithValue("@TotalReplacementCost", newEquip.TotalReplaceCost);
            //    //cmd.Parameters.AddWithValue("@Minor", newEquip.Minor);
            //    //cmd.Parameters.AddWithValue("@LocationID", newEquip.LocationID);

            //    cmd.ExecuteNonQuery();

            //    conn.Close();
            //}

            //To Do: add a table to see the items they want before they delete them. just to verify.
        }
        catch (Exception error)
        {
            ClientScript.RegisterStartupScript(this.GetType(), error.Message.ToString(), "alert('" + error.Message.ToString() + "');", true);
        }


    }
}