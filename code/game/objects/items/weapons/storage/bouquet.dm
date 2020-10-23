/obj/item/weapon/storage/bouquet
	name = "bouquet"
	desc = "A great gift for your girlfriend. Shotgun to a bouquet should be bought separately."
	icon_state = "mixedbouquet"
	throw_speed = 1
	throw_range = 5
	force = 5
	w_class = ITEM_SIZE_LARGE
	max_w_class = ITEM_SIZE_NORMAL
	max_storage_space = 4


/obj/item/weapon/storage/bouquet/shotgun
	name = "bouquet"
	desc = "A great gift for your girlfriend. Now with a shotgun!"
	icon_state = "mixedbouquet"

	startswith = list(
		/obj/item/weapon/gun/projectile/shotgun/doublebarrel/sawn
		)

/obj/item/weapon/storage/bouquet/Initialize()
	. = ..()
	icon_state = pick("mixedbouquet", "sunbouquet", "poppybouquet")
