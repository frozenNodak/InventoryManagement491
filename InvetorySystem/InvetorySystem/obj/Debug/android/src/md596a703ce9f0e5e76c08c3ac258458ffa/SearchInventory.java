package md596a703ce9f0e5e76c08c3ac258458ffa;


public class SearchInventory
	extends android.app.Activity
	implements
		mono.android.IGCUserPeer
{
/** @hide */
	public static final String __md_methods;
	static {
		__md_methods = 
			"n_onCreate:(Landroid/os/Bundle;)V:GetOnCreate_Landroid_os_Bundle_Handler\n" +
			"";
		mono.android.Runtime.register ("InvetorySystem.SearchInventory, InvetorySystem, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", SearchInventory.class, __md_methods);
	}


	public SearchInventory ()
	{
		super ();
		if (getClass () == SearchInventory.class)
			mono.android.TypeManager.Activate ("InvetorySystem.SearchInventory, InvetorySystem, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "", this, new java.lang.Object[] {  });
	}


	public void onCreate (android.os.Bundle p0)
	{
		n_onCreate (p0);
	}

	private native void n_onCreate (android.os.Bundle p0);

	private java.util.ArrayList refList;
	public void monodroidAddReference (java.lang.Object obj)
	{
		if (refList == null)
			refList = new java.util.ArrayList ();
		refList.add (obj);
	}

	public void monodroidClearReferences ()
	{
		if (refList != null)
			refList.clear ();
	}
}
