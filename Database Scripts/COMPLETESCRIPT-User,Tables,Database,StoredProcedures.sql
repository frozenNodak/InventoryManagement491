USE [master]
GO
/****** Object:  Database [InventoryManagementSystem]    Script Date: 4/23/2018 7:45:18 PM ******/
CREATE DATABASE [InventoryManagementSystem]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'InventoryManagementSystem', FILENAME = N'E:\Programs\SQL Server\Install\MSSQL14.MSSQLSERVER\MSSQL\DATA\InventoryManagementSystem.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'InventoryManagementSystem_log', FILENAME = N'E:\Programs\SQL Server\Install\MSSQL14.MSSQLSERVER\MSSQL\DATA\InventoryManagementSystem_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [InventoryManagementSystem] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [InventoryManagementSystem].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [InventoryManagementSystem] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET ARITHABORT OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [InventoryManagementSystem] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [InventoryManagementSystem] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET  DISABLE_BROKER 
GO
ALTER DATABASE [InventoryManagementSystem] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [InventoryManagementSystem] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET RECOVERY FULL 
GO
ALTER DATABASE [InventoryManagementSystem] SET  MULTI_USER 
GO
ALTER DATABASE [InventoryManagementSystem] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [InventoryManagementSystem] SET DB_CHAINING OFF 
GO
ALTER DATABASE [InventoryManagementSystem] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [InventoryManagementSystem] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [InventoryManagementSystem] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [InventoryManagementSystem] SET QUERY_STORE = OFF
GO
USE [InventoryManagementSystem]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [InventoryManagementSystem]
GO
/****** Object:  User [IMSUser]    Script Date: 4/23/2018 7:45:18 PM ******/
CREATE USER [IMSUser] FOR LOGIN [IMSUser] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Equipment]    Script Date: 4/23/2018 7:45:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Equipment](
	[EquipmentID] [int] IDENTITY(1,1) NOT NULL,
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
/****** Object:  Table [dbo].[Location]    Script Date: 4/23/2018 7:45:19 PM ******/
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
ALTER TABLE [dbo].[Equipment]  WITH CHECK ADD  CONSTRAINT [FK_Equipment_Location] FOREIGN KEY([LocationID])
REFERENCES [dbo].[Location] ([LocationID])
GO
ALTER TABLE [dbo].[Equipment] CHECK CONSTRAINT [FK_Equipment_Location]
GO
/****** Object:  StoredProcedure [dbo].[IMS_Delete_Equipment]    Script Date: 4/23/2018 7:45:19 PM ******/
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
/****** Object:  StoredProcedure [dbo].[IMS_Delete_Location]    Script Date: 4/23/2018 7:45:19 PM ******/
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
/****** Object:  StoredProcedure [dbo].[IMS_Get_Select_Equipment]    Script Date: 4/23/2018 7:45:19 PM ******/
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
/****** Object:  StoredProcedure [dbo].[IMS_Get_Select_Location]    Script Date: 4/23/2018 7:45:19 PM ******/
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
/****** Object:  StoredProcedure [dbo].[IMS_Insert_Equipment]    Script Date: 4/23/2018 7:45:19 PM ******/
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
/****** Object:  StoredProcedure [dbo].[IMS_Insert_Location]    Script Date: 4/23/2018 7:45:19 PM ******/
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
/****** Object:  StoredProcedure [dbo].[IMS_Select_Equipment]    Script Date: 4/23/2018 7:45:19 PM ******/
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
/****** Object:  StoredProcedure [dbo].[IMS_Select_Location]    Script Date: 4/23/2018 7:45:19 PM ******/
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
	Building + ' ' + RoomNumber + ' ' + Department as Location

FROM dbo.Location
GO
/****** Object:  StoredProcedure [dbo].[IMS_Update_Equipment]    Script Date: 4/23/2018 7:45:19 PM ******/
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
/****** Object:  StoredProcedure [dbo].[IMS_Update_Location]    Script Date: 4/23/2018 7:45:19 PM ******/
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
USE [master]
GO
ALTER DATABASE [InventoryManagementSystem] SET  READ_WRITE 
GO
