USE [InventoryManagementSystem]
GO

/****** Object:  Table [dbo].[Equipment]    Script Date: 2/28/2018 12:57:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Equipment](
	[EquipmentID] [int] NOT NULL,
	[TagNumber] [varchar](7) NULL,
	[SerialNumber] [varchar](25) NULL,
	[Description] [varchar](50) NULL,
	[NumberPurchased] [int] NULL,
	[DatePurchased] [date] NOT NULL,
	[CostPerItem] [money] NULL,
	[TotalOriginalCost] [money] NULL,
	[ReplacementCostPerItem] [money] NULL,
	[TotalReplacementCost] [money] NULL,
	[Minor] [bit] NOT NULL,
	[LocationID] [int] NOT NULL,
 CONSTRAINT [PK_Equipment] PRIMARY KEY CLUSTERED 
(
	[EquipmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Location]    Script Date: 2/28/2018 12:57:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Location](
	[LocationID] [int] IDENTITY(1,1) NOT NULL,
	[Building] [varchar](50) NOT NULL,
	[RoomNumber] [varchar](10) NOT NULL,
	[Department] [varchar](50) NULL,
 CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED 
(
	[LocationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Equipment]  WITH CHECK ADD  CONSTRAINT [FK_Equipment_Equipment] FOREIGN KEY([EquipmentID])
REFERENCES [dbo].[Equipment] ([EquipmentID])
GO

ALTER TABLE [dbo].[Equipment] CHECK CONSTRAINT [FK_Equipment_Equipment]
GO

ALTER TABLE [dbo].[Equipment]  WITH CHECK ADD  CONSTRAINT [FK_Equipment_Location] FOREIGN KEY([LocationID])
REFERENCES [dbo].[Location] ([LocationID])
GO

ALTER TABLE [dbo].[Equipment] CHECK CONSTRAINT [FK_Equipment_Location]
GO

