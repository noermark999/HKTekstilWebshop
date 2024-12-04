CREATE PROCEDURE [Product].[SP_PRO_AddColor]
    @ColorName NVARCHAR(MAX)
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Product].[PRO_Color] (CO_ColorName)
        OUTPUT inserted.CO_PK
        VALUES (@ColorName);

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
