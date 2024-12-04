CREATE PROCEDURE [Product].[SP_PRO_GetProductDetails]
    @ProductID UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Retrieve basic product information
        DECLARE @ProductDetails TABLE (
            PR_PK UNIQUEIDENTIFIER,
            PR_Name NVARCHAR(MAX),
            PR_Description NVARCHAR(MAX),
            PR_Price FLOAT,
            OR_Name NVARCHAR(MAX)
        );

        INSERT INTO @ProductDetails
        SELECT 
            PR_PK,
            PR_Name,
            PR_Description,
            PR_Price,
            OR_Name
        FROM [Product].PRO_Product p
        INNER JOIN  [Organization].ORG_Organization o
        ON o.OR_PK = p.PR_Organization
        WHERE PR_PK = @ProductID;

        -- Retrieve colors associated with the product
        DECLARE @ColorList TABLE (
            CP_Color UNIQUEIDENTIFIER,
            CP_ColorName NVARCHAR(MAX)
        );

        INSERT INTO @ColorList
        SELECT 
            cp.CP_Color,
            c.CO_ColorName
        FROM [Product].PRO_ColorProduct cp
        INNER JOIN [Product].PRO_Color c ON cp.CP_Color = c.CO_PK
        WHERE cp.CP_Product = @ProductID;

        -- Retrieve sizes associated with the product
        DECLARE @SizeList TABLE (
            SP_Size UNIQUEIDENTIFIER,
            SP_SizeName NVARCHAR(MAX)
        );

        INSERT INTO @SizeList
        SELECT 
            sp.SP_Size,
            s.SI_Size 
        FROM [Product].PRO_SizeProduct sp
        INNER JOIN [Product].PRO_Size s ON sp.SP_Size = s.SI_PK
        WHERE sp.SP_Product = @ProductID;

        -- Retrieve extra choices and associated options for the product
        DECLARE @ExtraChoiceList TABLE (
            EP_ExtraChoice UNIQUEIDENTIFIER,
            ExtraChoiceTitle NVARCHAR(MAX)
        );

        INSERT INTO @ExtraChoiceList
        SELECT 
            ep.EP_ExtraChoice,
            ec.EC_Title
        FROM [Product].PRO_ExtraChoiceProduct ep
        INNER JOIN [Product].PRO_ExtraChoice ec ON ep.EP_ExtraChoice = ec.EC_PK
        WHERE ep.EP_Product = @ProductID;

        DECLARE @ExtraChoiceOptions TABLE (
            ExtraChoiceID UNIQUEIDENTIFIER,
            OptionID UNIQUEIDENTIFIER,
            OptionName NVARCHAR(MAX),
            OptionDescription NVARCHAR(MAX),
            OptionExtraPrice FLOAT
        );

        INSERT INTO @ExtraChoiceOptions
        SELECT 
            eco.EO_ExtraChoice, -- Extra choice ID
            eco.EO_PK,
            eco.EO_Name,
            eco.EO_Description,
            eco.EO_ExtraPrice
        FROM [Product].PRO_ExtraChoiceOption eco
        WHERE eco.EO_ExtraChoice IN (SELECT EP_ExtraChoice FROM @ExtraChoiceList);

        -- Retrieve image URLs associated with the product
        DECLARE @ImageList TABLE (
            IM_ImageURL NVARCHAR(MAX)
        );

        INSERT INTO @ImageList
        SELECT 
            IM_ImageURL
        FROM [Product].PRO_Images
        WHERE IM_Product = @ProductID;

        -- Select all results
        SELECT * FROM @ProductDetails;
        SELECT * FROM @ColorList;
        SELECT * FROM @SizeList;
        SELECT * FROM @ExtraChoiceList;
        SELECT * FROM @ExtraChoiceOptions;
        SELECT * FROM @ImageList;

        COMMIT;
    END TRY

    BEGIN CATCH
        SET @ErrorMsg = (SELECT ERROR_MESSAGE());
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END;
        THROW 50003, @ErrorMsg, 1;
    END CATCH;
END;
