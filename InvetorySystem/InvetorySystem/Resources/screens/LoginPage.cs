using System;
using Android.App;
using Android.Content;
using Android.Widget;
using Android.OS;

namespace InvetorySystem
{
    [Activity(Label = "Inventory Management", MainLauncher = true)]
    public class LoginPage : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);
            string username = "";
            string password = "";
            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.Main);
            EditText username_in = FindViewById <EditText>(Resource.Id.UsernameText);
            EditText password_in = FindViewById<EditText>(Resource.Id.PasswordText);
            TextView loginresult = FindViewById<TextView>(Resource.Id.LoginResult);
            Button LoginButton = FindViewById<Button>(Resource.Id.LoginButton);
            loginresult.Visibility = Android.Views.ViewStates.Invisible;
            //var imageView = FindViewById<ImageView>(Resource.Id.demoImageView);
            //imageView.SetImageResource(Resource.Drawable.undlogo);

            //this is where we would add in the hook to the database
            //for now it will be preset
            LoginButton.Click += (sender, e) =>
            {
                username = username_in.Text.Trim();
                password = password_in.Text.Trim();
                //we should add some password and username guidelines and validate them. 
                if (username.Equals("Master") && password.Equals("swordfish"))
                {
                    loginresult.Text = "Login Granted";
                    loginresult.Visibility = Android.Views.ViewStates.Visible;
                    StartActivity(typeof(Home));

                }
                else
                {
                    loginresult.Text = "Login Failed";
                    loginresult.Visibility = Android.Views.ViewStates.Visible;
                }
            };
        }
    }
}

