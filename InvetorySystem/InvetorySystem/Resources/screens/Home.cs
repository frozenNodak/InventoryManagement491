using System;
using Android.App;
using Android.Content;
using Android.Widget;
using Android.OS;

namespace InvetorySystem
{
    [Activity(Label = "Inventory System")]
    public class Home : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.Home);
            Button b_AddInv = FindViewById<Button>(Resource.Id.AddInventory);
            Button b_RemoveInv = FindViewById<Button>(Resource.Id.RemoveInventory);
            Button b_UpdateInv = FindViewById<Button>(Resource.Id.UpdateInvInfo);
            Button b_Logout = FindViewById<Button>(Resource.Id.Logout);
            Button b_search = FindViewById<Button>(Resource.Id.Search);
            EditText e_output = FindViewById<EditText>(Resource.Id.output);
            e_output.Text = "";
            //var imageView = FindViewById<ImageView>(Resource.Id.demoImageView);
            //imageView.SetImageResource(Resource.Drawable.undlogo);

            //this is where we would add in the hook to the database
            //for now it will be preset
            if (b_AddInv != null)
            {
                b_AddInv.Click += (sender, e) =>
                {
                //take in the id and barcode scan and add to database
                e_output.Text = "Added Inventory";
                    StartActivity(typeof(AddInventory));
                };
            }
            if (b_RemoveInv != null)
            {
                b_RemoveInv.Click += (sender, e) =>
                {
                //take in the id and barcode scan and remove from database
                e_output.Text = "Removed Inventory";
                    StartActivity(typeof(RemoveInventory));
                };
            }
            if (b_UpdateInv != null)
            {
                b_UpdateInv.Click += (sender, e) =>
                {
                //take in the id and barcode scan and update database
                e_output.Text = "updated Inventory";
                    StartActivity(typeof(UpdateInventory));
                };
            }
            if (b_search != null)
            {
                b_search.Click += (sender, e) =>
                {

                    //search through the database by Id or barcode scan
                    e_output.Text = "searching";
                    StartActivity(typeof(SearchInventory));
                };
            }
            if (b_Logout != null)
            {
                b_Logout.Click += (sender, e) =>
                {
                //go back to home screen. make sure to reset text fields. 
                e_output.Text = "Loging out";
                StartActivity(typeof(LoginPage));
                };
            }
        }
    }
}

