using System;
using Android.App;
using Android.Content;
using Android.Widget;
using Android.OS;

namespace InvetorySystem
{
    [Activity(Label = "Inventory Management")]
    public class SearchInventory : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            SetContentView(Resource.Layout.SearchInv);
            Button b_search = FindViewById<Button>(Resource.Id.SearchInv_num);
            Button b_goHome = FindViewById<Button>(Resource.Id.GoHome);
            Button logout = FindViewById<Button>(Resource.Id.Logout);
            EditText uquipID = FindViewById<EditText>(Resource.Id.IDnum);
            TextView output = FindViewById<TextView>(Resource.Id.output);

            if (b_search != null)
            {
                b_search.Click += (sender, e) =>
                {
                    //this would be the hook into the database
                    output.Text = "Running Database search for this";
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

