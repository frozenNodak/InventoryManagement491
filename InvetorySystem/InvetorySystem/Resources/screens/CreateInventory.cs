using System;
using Android.App;
using Android.Content;
using Android.Widget;
using Android.OS;
using Android.Util;

namespace InvetorySystem
{
    [Activity(Label = "Inventory Management")]
    public class AddInventory : Activity
    {
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.CreateInventory);
            Button b_add = FindViewById<Button>(Resource.Id.AddInv_num);
            Button b_goHome = FindViewById<Button>(Resource.Id.GoHome);
            Button logout = FindViewById<Button>(Resource.Id.Logout);
            Button aquisSelecButton = FindViewById<Button>(Resource.Id.acquiDatButton);
            Button moveDateButton = FindViewById<Button>(Resource.Id.moveDatButton);
            TextView output = FindViewById<TextView>(Resource.Id.output);
            EditText equipID = FindViewById<EditText>(Resource.Id.IDnum);
            EditText equipType = FindViewById<EditText>(Resource.Id.EquipmentType);
            EditText usageRestrict = FindViewById<EditText>(Resource.Id.UsageRestriction);
            EditText in_aquisDate = FindViewById<EditText>(Resource.Id.AquisDate);//datedisplay
            CalendarView calendar1 = FindViewById<CalendarView>(Resource.Id.calendarView1);
            EditText equipDesc = FindViewById<EditText>(Resource.Id.EquipDescription);
            EditText in_moveDate = FindViewById<EditText>(Resource.Id.MoveDate);
            DateTime aquisDate;
            DateTime moveDate;


            if (in_aquisDate.CallOnClick())
            {
                calendar1.Visibility = Android.Views.ViewStates.Visible;
                calendar1.DateChange += CalendarOnDateChange;
                var date = System.Convert.ToDateTime(calendar1.Date);
                aquisDate = new DateTime(date.Month, date.Day, date.Year);
                calendar1.Visibility = Android.Views.ViewStates.Gone;
            }
            if (in_moveDate.CallOnClick())
            {
                calendar1.Visibility = Android.Views.ViewStates.Visible;
                calendar1.DateChange += CalendarOnDateChange;
                var date = System.Convert.ToDateTime(calendar1.Date);
                moveDate = new DateTime(date.Month, date.Day, date.Year);
                calendar1.Visibility = Android.Views.ViewStates.Gone;
            }
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
        private void CalendarOnDateChange(object sender, CalendarView.DateChangeEventArgs args)
        {
            var newdatetime = new DateTime(args.Year, args.Month, args.DayOfMonth);
        }
    }
}

