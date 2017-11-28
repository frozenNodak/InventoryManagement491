using System;
using Android.App;
using Android.Content;
using Android.Widget;
using Android.OS;

namespace InvetorySystem
{
    [Activity(Label = "Inventory Management")]
    public class UpdateInventory : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);
            
            SetContentView(Resource.Layout.UpdateInventory);
            Button b_update = FindViewById<Button>(Resource.Id.UpdateInv_num);
            Button b_goHome = FindViewById<Button>(Resource.Id.GoHome);
            Button logout = FindViewById<Button>(Resource.Id.Logout);
            TextView output = FindViewById<TextView>(Resource.Id.output);

            if (b_update != null)
            {
                b_update.Click += (sender, e) =>
                {
                    //this would be the hook into the database
                    output.Text = "Inventory Updated";
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

