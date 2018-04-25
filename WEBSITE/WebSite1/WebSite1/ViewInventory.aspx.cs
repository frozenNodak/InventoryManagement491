using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class About : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void ddl_Location_SelectedIndexChanged(object sender, EventArgs e)
    {
        DropDownList ddl = (DropDownList)gvEquipment.Rows[0].FindControl("ddl_Location");
        lbl_LocationID.Text = ddl.SelectedValue.ToString();
        lbl_LocationID.Visible = true;
    }

    protected void tb_DatePurchased_TextChanged(object sender, EventArgs e)
    {
        TextBox txt = (TextBox)gvEquipment.Rows[0].FindControl("tb_DatePurchased");
        lbl_DatePurchased.Text = txt.Text;
        lbl_DatePurchased.Visible = true;
    }
}