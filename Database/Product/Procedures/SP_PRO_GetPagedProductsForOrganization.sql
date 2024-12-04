CREATE PROCEDURE [Product].[SP_PRO_GetPagedProductsForOrganization]
    @PageNumber INT,
    @PageSize INT,
    @OrganizationID UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    DECLARE @StartRow INT = (@PageNumber - 1) * @PageSize + 1;
    DECLARE @EndRow INT = @PageNumber * @PageSize;

    BEGIN TRY
        BEGIN TRANSACTION;

        ;WITH ProductPaged AS (
            SELECT 
                PR_PK,
                PR_Name,
                PR_Price,
                OR_Name,
                COUNT(*) OVER () AS TotalProducts,
                (SELECT TOP 1 IM_ImageURL
                FROM Product.PRO_Images
                WHERE PRO_Images.IM_Product = PR_PK) as ImageURL,
                ROW_NUMBER() OVER (ORDER BY PR_PK) AS RowNum
            FROM [Product].PRO_Product p
            INNER JOIN [Organization].ORG_Organization o
            ON p.PR_Organization = o.OR_PK
            WHERE PR_Organization = @OrganizationID
        )

        SELECT 
            PR_PK,
            PR_Name,
            PR_Price,
            OR_NAME,
            TotalProducts,
            ImageURL
        FROM ProductPaged
        WHERE RowNum BETWEEN @StartRow AND @EndRow;

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

