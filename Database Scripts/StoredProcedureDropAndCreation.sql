USE [InventoryManagementSystem]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Update_Location]    Script Date: 2/28/2018 12:57:05 PM ******/
DROP PROCEDURE [dbo].[IMS_Update_Location]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Update_Equipment]    Script Date: 2/28/2018 12:57:05 PM ******/
DROP PROCEDURE [dbo].[IMS_Update_Equipment]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Select_Location]    Script Date: 2/28/2018 12:57:05 PM ******/
DROP PROCEDURE [dbo].[IMS_Select_Location]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Select_Equipment]    Script Date: 2/28/2018 12:57:05 PM ******/
DROP PROCEDURE [dbo].[IMS_Select_Equipment]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Insert_Location]    Script Date: 2/28/2018 12:57:05 PM ******/
DROP PROCEDURE [dbo].[IMS_Insert_Location]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Insert_Equipment]    Script Date: 2/28/2018 12:57:05 PM ******/
DROP PROCEDURE [dbo].[IMS_Insert_Equipment]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Get_Select_Location]    Script Date: 2/28/2018 12:57:05 PM ******/
DROP PROCEDURE [dbo].[IMS_Get_Select_Location]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Get_Select_Equipment]    Script Date: 2/28/2018 12:57:05 PM ******/
DROP PROCEDURE [dbo].[IMS_Get_Select_Equipment]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Delete_Location]    Script Date: 2/28/2018 12:57:05 PM ******/
DROP PROCEDURE [dbo].[IMS_Delete_Location]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Delete_Equipment]    Script Date: 2/28/2018 12:57:05 PM ******/
DROP PROCEDURE [dbo].[IMS_Delete_Equipment]
GO

/****** Object:  StoredProcedure [dbo].[IMS_Delete_Equipment]    Script Date: 2/28/2018 12:57:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Christian Hansen
-- Create date: 1/24/2018
-- Description:	Deletes equpiment from Equipment table
-- =============================================
CREATE PROCEDURE [dbo].[IMS_Delete_Equipment]
	@EquipmentID	INT
AS
SET NOCOUNT ON;

DELETE FROM dbo.Equipment
WHERE EquipmentID = @EquipmentID
GO

/****** Object:  StoredProcedure [dbo].[IMS_Delete_Location]    Script Date: 2/28/2018 12:57:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Christian Hansen
-- Create date: 1/24/2018
-- Description:	Deletes locations from Location table
-- =============================================
CREATE PROCEDURE [dbo].[IMS_Delete_Location]
	@LocationID	INT
AS
SET NOCOUNT ON;

DELETE FROM dbo.Location
WHERE LocationID = @LocationID
GO

/****** Object:  StoredProcedure [dbo].[IMS_Get_Select_Equipment]    Script Date: 2/28/2018 12:57:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Christian Hansen
-- Create date: 1/24/2018
-- Description:	Selects equpiment from Equipment table based on EquipmentID
-- =============================================
CREATE PROCEDURE [dbo].[IMS_Get_Select_Equipment]
	@EquipmentID	INT
AS
SET NOCOUNT ON;

SELECT
	EquipmentID,
	TagNumber,
	SerialNumber,
	Description,
	NumberPurchased,
	DatePurchased,
	CostPerItem,
	TotalOriginalCost,
	ReplacementCostPerItem,
	TotalReplacementCost,
	Minor,
	LocationID

FROM dbo.Equipment
WHERE EquipmentID = @EquipmentID
GO

/****** Object:  StoredProcedure [dbo].[IMS_Get_Select_Location]    Script Date: 2/28/2018 12:57:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Christian Hansen
-- Create date: 1/24/2018
-- Description:	Selects location from Location table based on LocationID
-- =============================================
CREATE PROCEDURE [dbo].[IMS_Get_Select_Location]
	@LocationID	INT
AS
SET NOCOUNT ON;

SELECT
	LocationID,
	Building,
	RoomNumber,
	Department

FROM dbo.Location
WHERE LocationID = @LocationID
GO

/****** Object:  StoredProcedure [dbo].[IMS_Insert_Equipment]    Script Date: 2/28/2018 12:57:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Christian Hansen
-- Create date: 1/24/2018
-- Description:	Inserts new equipment into the Equipment table
-- =============================================
CREATE PROCEDURE [dbo].[IMS_Insert_Equipment]
	@TagNumber				VARCHAR(7),
	@SerialNumber			VARCHAR(25),
	@Description			VARCHAR(50),
	@NumberPurchased		INT,
	@DatePurchased			DATE,
	@CostPerItem			MONEY,
	@ReplacementCostPerItem	MONEY,
	@Minor					BIT,
	@LocationID				INT
AS
SET NOCOUNT ON

DECLARE @EquipmentID INT;

INSERT INTO dbo.Equipment (
	TagNumber,
	SerialNumber,
	Description,
	NumberPurchased,
	DatePurchased,
	CostPerItem,
	TotalOriginalCost,
	ReplacementCostPerItem,
	TotalReplacementCost,
	Minor,
	LocationID
	)
VALUES (
	@TagNumber,
	@SerialNumber,
	@Description,
	@NumberPurchased,
	@DatePurchased,
	@CostPerItem,
	@CostPerItem * @NumberPurchased,
	@ReplacementCostPerItem,
	@ReplacementCostPerItem * @NumberPurchased,
	@Minor,
	@LocationID
	)

SET @EquipmentID = SCOPE_IDENTITY()
GO

/****** Object:  StoredProcedure [dbo].[IMS_Insert_Location]    Script Date: 2/28/2018 12:57:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Christian Hansen
-- Create date: 1/24/2018
-- Description:	Inserts locations from Location table
-- =============================================
CREATE PROCEDURE [dbo].[IMS_Insert_Location]
	@Building	VARCHAR(50),
	@RoomNumber	INT,
	@Department	VARCHAR(50)
AS
SET NOCOUNT ON;

DECLARE @LocationID	INT

INSERT INTO dbo.Location (
	Building,
	RoomNumber,
	Department
	)

VALUES (
	@Building,
	@RoomNumber,
	@Department
	)

SET @LocationID = SCOPE_IDENTITY()
GO

/****** Object:  StoredProcedure [dbo].[IMS_Select_Equipment]    Script Date: 2/28/2018 12:57:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Christian Hansen
-- Create date: 1/24/2018
-- Description:	Selects complete list of equpiment from Equipment table
-- =============================================
CREATE PROCEDURE [dbo].[IMS_Select_Equipment]
AS
SET NOCOUNT ON;

SELECT
	EquipmentID,
	TagNumber,
	SerialNumber,
	Description,
	NumberPurchased,
	DatePurchased,
	CostPerItem,
	TotalOriginalCost,
	ReplacementCostPerItem,
	TotalReplacementCost,
	Minor,
	LocationID

FROM dbo.Equipment
GO

/****** Object:  StoredProcedure [dbo].[IMS_Select_Location]    Script Date: 2/28/2018 12:57:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Christian Hansen
-- Create date: 1/24/2018
-- Description:	Selects complete list of locations from Location table
-- =============================================
CREATE PROCEDURE [dbo].[IMS_Select_Location]
AS
SET NOCOUNT ON;

SELECT
	LocationID,
	Building,
	RoomNumber,
	Department

FROM dbo.Location
GO

/****** Object:  StoredProcedure [dbo].[IMS_Update_Equipment]    Script Date: 2/28/2018 12:57:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Christian Hansen
-- Create date: 1/24/2018
-- Description:	Updates equipment in the Equipment table
-- =============================================
CREATE PROCEDURE [dbo].[IMS_Update_Equipment]
	@EquipmentID			INT,
	@TagNumber				VARCHAR(7),
	@SerialNumber			VARCHAR(25),
	@Description			VARCHAR(50),
	@NumberPurchased		INT,
	@DatePurchased			DATE,
	@CostPerItem			MONEY,
	@ReplacementCostPerItem	MONEY,
	@Minor					BIT,
	@LocationID				INT
AS
SET NOCOUNT ON

UPDATE dbo.Equipment
SET
	TagNumber = @TagNumber,
	SerialNumber = @SerialNumber,
	Description = @Description,
	NumberPurchased = @NumberPurchased,
	DatePurchased = @DatePurchased,
	CostPerItem = @CostPerItem,
	TotalOriginalCost = @CostPerItem * @NumberPurchased,
	ReplacementCostPerItem = @ReplacementCostPerItem,
	TotalReplacementCost = @ReplacementCostPerItem * @NumberPurchased,
	Minor = @Minor,
	LocationID = @LocationID

WHERE EquipmentID = @EquipmentID
GO

/****** Object:  StoredProcedure [dbo].[IMS_Update_Location]    Script Date: 2/28/2018 12:57:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Christian Hansen
-- Create date: 1/24/2018
-- Description:	Updates locations from Location table
-- =============================================
CREATE PROCEDURE [dbo].[IMS_Update_Location]
	@LocationID	INT,
	@Building	VARCHAR(50),
	@RoomNumber	INT,
	@Department	VARCHAR(50)
AS
SET NOCOUNT ON;

UPDATE dbo.Location
SET
	Building = @Building,
	RoomNumber = @RoomNumber,
	Department = @Department

WHERE LocationID = @LocationID
GO

