using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for EquipObj
/// </summary>
public class EquipObj
{
    public EquipObj()
    {
        
    }
    public string TagNumber { get; set; }   
    public string SerialNumber { get; set; }    
    public string Description { get; set; }
    public int Quantity { get; set; }
    public DateTime DatePurchased { get; set; }
    public decimal CostPerItem { get; set; }    
    public decimal TotalCost { get; set; }  
    public decimal ReplaceCostPerItem { get; set; }
    public decimal TotalReplaceCost { get; set; }
    public bool Minor { get; set; }
    public int LocationID { get; set; } 
    public string Building { get; set; }    
    public string RoomNumber { get; set; }
    public string Department { get; set; }
}