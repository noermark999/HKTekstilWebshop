exec Product.SP_PRO_AddCategory @Name = 'Jakke', @Description = 'Kategori for jakker'
'87F41983-B860-43AE-A4E2-18E226F8B51C'

exec Product.SP_PRO_AddColor @ColorName = 'Grå'
'8055914A-E4B9-4898-AAB6-2D6EC30B18B4'

exec Product.SP_PRO_AddColor @ColorName = 'Sort'
'871C468B-AEA1-4D1E-AEC1-7D4C766D731E'

exec Product.SP_PRO_AddColor @ColorName = 'Blå'
'D4FB8EE8-6290-435F-8B74-32CA9310CE69'

declare @OptionList1 [Product].[PRO_ExtraChoiceOptionTableType]

insert into @OptionList1 (Name, Description)
values
	('Venstre Bryst', 'Tilgængeligt på alt tøj'), 'B3644E06-ACF4-4D36-ABD2-74602E4483DD'
	('Højre Ærme', 'Ikke tilgængeligt på T-Shirt og Polo'), 'DF0A544C-0513-42A5-BCDB-BD2088781A72'
	('Vesntre Ærme', 'Ikke tilgængeligt på T-Shirt og Polo') 'AEFB58F0-EFC8-4DDF-8148-8AB8E5BB297D'

exec Product.SP_PRO_AddExtraChoice
	@Title = 'Placering af broderi',
	@OptionList = @OptionList1
'EE7102CF-8A15-44C1-8E76-C50447032FA5'

select * from [User].USE_User '15C9F0F1-3A59-4F68-B1CD-6F7380BF2EEE'

exec Product.SP_PRO_AddStatus
	@StatusName = 'Open'
'5D755ADB-4976-4705-9157-D6D497771468'

DECLARE @OrderDate DATETIME = GETDATE();

exec Product.SP_PRO_AddOrder
	@OrderDate = @OrderDate,
	@StatusID = '5D755ADB-4976-4705-9157-D6D497771468',
	@UserID = '15C9F0F1-3A59-4F68-B1CD-6F7380BF2EEE'
'4A0B1CCD-4874-4811-88D4-239961FDD719'

exec Product.SP_PRO_AddSize
	@Size = 'S'
'38DFEBA5-FD23-41F1-9747-3A6340D7DF72'

exec Product.SP_PRO_AddSize
	@Size = 'M'
'AD1251D5-0BA1-4333-8A5D-3E918B5F8086'

exec Product.SP_PRO_AddSize
	@Size = 'L'
'0625752D-66C0-4339-AC7B-CD249DDE7E9B'

'Org'
'05A3194D-B869-4A3A-990E-4FBF37DC1F96'

declare @ColorList1 Product.PRO_ColorTableType

insert into @ColorList1 (ColorID)
values
	('8055914A-E4B9-4898-AAB6-2D6EC30B18B4'),
	('871C468B-AEA1-4D1E-AEC1-7D4C766D731E'),
	('D4FB8EE8-6290-435F-8B74-32CA9310CE69')

declare @SizeList1 Product.PRO_SizeTableType

insert into @SizeList1 (SizeID)
values
	('38DFEBA5-FD23-41F1-9747-3A6340D7DF72'),
	('AD1251D5-0BA1-4333-8A5D-3E918B5F8086'),
	('0625752D-66C0-4339-AC7B-CD249DDE7E9B')

declare @ExtraChoiceList1 Product.PRO_ExtraChoiceTableType

insert into @ExtraChoiceList1 (ExtraChoiceID)
values
	('EE7102CF-8A15-44C1-8E76-C50447032FA5')

declare @ImageURLs1 Product.PRO_ImageTableType

insert into @ImageURLs1 (ImageURL)
values
	('\Resources\Products\Designa\Designa_SoftshellJakke.jpg'),
	('\Resources\Products\Designa\Designa_SoftshellJakke.jpg'),
	('\Resources\Products\Designa\Designa_SoftshellJakke.jpg'),
	('\Resources\Products\Designa\Designa_SoftshellJakke.jpg')

exec Product.SP_PRO_AddProduct
	@Name = 'Softshell Jakker u. Hætte (Herrer)',
	@Description = 'Lækker softshell jakke uden hætte til herrer',
	@Price = 580.75,
	@CategoryID = '87F41983-B860-43AE-A4E2-18E226F8B51C',
	@OrganizationID = '05A3194D-B869-4A3A-990E-4FBF37DC1F96',
	@ColorList = @ColorList1,
	@SizeList = @SizeList1,
	@ExtraChoiceList = @ExtraChoiceList1,
	@ImageURLs = @ImageURLs1

select * from Product.PRO_Product
'1E142954-B126-4665-A11A-0409D8B729A0'

declare @ExtraChoiceOptionList1 [Product].[PRO_ExtraChoiceOptionTableType]

insert into @ExtraChoiceOptionList1 (ExtraChoiceOptionID)
values
	('B3644E06-ACF4-4D36-ABD2-74602E4483DD')

exec Product.SP_PRO_AddOrderItem
	@Quantity = 1,
	@ProductID = '1E142954-B126-4665-A11A-0409D8B729A0',
	@OrderID = '4A0B1CCD-4874-4811-88D4-239961FDD719',
	@ColorID = '8055914A-E4B9-4898-AAB6-2D6EC30B18B4',
	@SizeID = 'AD1251D5-0BA1-4333-8A5D-3E918B5F8086',
	@ExtraChoiceOptionList = @ExtraChoiceOptionList1

select * from Product.PRO_OrderItem