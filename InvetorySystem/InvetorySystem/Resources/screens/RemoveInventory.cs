using System;
using Android.App;
using Android.Content;
using Android.Widget;
using Android.OS;

namespace InvetorySystem
{
    [Activity(Label = "Inventory Management")]
    public class RemoveInventory : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);
            int qty = 0;
            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.RemoveInventory);
            Button b_rem = FindViewById<Button>(Resource.Id.RemInv_num);
            Button b_goHome = FindViewById<Button>(Resource.Id.GoHome);
            Button logout = FindViewById<Button>(Resource.Id.Logout);
            Button qtyPlus = FindViewById<Button>(Resource.Id.qtyPlus);
            Button qtyMinus = FindViewById<Button>(Resource.Id.qtyMinus);
            EditText in_qty = FindViewById<EditText>(Resource.Id.equipQty);
            TextView output = FindViewById<TextView>(Resource.Id.output);

            if(qtyPlus != null)
            {
                qtyPlus.Click += (sender, e) =>
                {
                    qty = System.Convert.ToInt16(in_qty.Text);
                    qty++;
                    in_qty.Text = qty.ToString();
                };
            }
            if (qtyMinus != null)
            {
                qtyMinus.Click += (sender, e) =>
                {
                    qty = System.Convert.ToInt16(in_qty.Text);
                    if(qty != 0)
                    {
                        qty--;
                        in_qty.Text = qty.ToString();
                    }
                };
            }
            if (b_rem != null)
            {
                b_rem.Click += (sender, e) =>
                {
                    //this would be the hook into the database
                    output.Text = "Inventory Removed";
                };
            }
            if (b_goHome != null)
            {
                b_goHome.Click += (sender, e) =>
                {
                    StartActivity(typeof(Home));
                };
            }
            if (logout != null)
            {
                logout.Click += (sender, e) =>
                {
                    StartActivity(typeof(LoginPage));
                };
            }

        }
    }
}

