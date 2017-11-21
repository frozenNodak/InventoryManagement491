using System;
using Android.App;
using Android.Content;
using Android.Widget;
using Android.OS;

namespace InvetorySystem
{
    [Activity(Label = "Inventory System")]
    public class AddInventory : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.AddInventory);
            Button b_add = FindViewById<Button>(Resource.Id.AddInv_num);
            Button b_goHome = FindViewById<Button>(Resource.Id.GoHome);
            Button logout = FindViewById<Button>(Resource.Id.Logout);
            TextView output = FindViewById<TextView>(Resource.Id.output);

            if (b_add != null)
            {
                b_add.Click += (sender, e) =>
                {
                    //this would be the hook into the database
                    output.Text = "Inventory Added";
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

