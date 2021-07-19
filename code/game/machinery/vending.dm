
/**
 *  A vending machine
 */
/obj/machinery/vending
	name = "Vendomat"
	desc = "A generic vending machine."
	icon = 'icons/obj/vending.dmi'
	icon_state = "generic"
	layer = BELOW_OBJ_LAYER
	anchored = 1
	density = 1
	obj_flags = OBJ_FLAG_ANCHORABLE
	clicksound = "button"
	clickvol = 40
	pull_slowdown = PULL_SLOWDOWN_HEAVY

	var/max_health = 100
	var/health = 100
	var/base_icon = "generic"
	var/use_vend_state = FALSE // whether to use "[base_icon]-vend" icon when vending
	var/diona_spawn_chance = 0.1
	var/use_alt_icons = FALSE
	var/alt_icons = list()

	// Power
	idle_power_usage = 10
	var/vend_power_usage = 150 //actuators and stuff

	// Vending-related
	var/active = 1 //No sales pitches if off!
	var/vend_ready = 1 //Are we ready to vend?? Is it time??
	var/vend_delay = 10 //How long does it take to vend?
	var/categories = CAT_NORMAL // Bitmask of cats we're currently showing
	var/datum/stored_items/vending_products/currently_vending = null // What we're requesting payment for right now
	var/status_message = "" // Status screen messages like "insufficient funds", displayed in NanoUI
	var/status_error = 0 // Set to 1 if status_message is an error

	/*
		Variables used to initialize the product list
		These are used for initialization only, and so are optional if
		product_records is specified
	*/

	var/list/prices = list() // Prices for each item, list(/type/path = price), items not in the list don't have a price.

	var/rand_amount = FALSE

	// Variables used to initialize advertising
	var/product_slogans = "" //String of slogans spoken out loud, separated by semicolons
	var/product_ads = "" //String of small ad messages in the vending screen

	var/list/ads_list = list()

	// Stuff relating vocalizations
	var/list/slogan_list = list()
	var/shut_up = 1 //Stop spouting those godawful pitches!
	var/vend_reply //Thank you for shopping!
	var/last_reply = 0
	var/last_slogan = 0 //When did we last pitch?
	var/slogan_delay = 6000 //How long until we can pitch again?

	// Things that can go wrong
	emagged = 0 //Ignores if somebody doesn't have card access to that machine.
	var/seconds_electrified = 0 //Shock customers like an airlock.
	var/shoot_inventory = 0 //Fire items at customers! We're broken!
	var/shooting_chance = 2 //The chance that items are being shot per tick

	var/cartridge
	var/obj/item/weapon/vendcart/V

	var/scan_id = 1
	var/obj/item/weapon/coin/coin
	var/datum/wires/vending/wires = null

/obj/machinery/vending/Initialize()
	. = ..()

	wires = new(src)

	component_parts = list()
	component_parts += new /obj/item/weapon/circuitboard/vendomat(src)
	component_parts += new /obj/item/weapon/stock_parts/matter_bin(src)
	component_parts += new /obj/item/weapon/stock_parts/matter_bin(src)
	component_parts += new cartridge(src)

	RefreshParts()

	if(product_slogans)
		slogan_list += splittext(product_slogans, ";")

		// So not all machines speak at the exact same time.
		// The first time this machine says something will be at slogantime + this random value,
		// so if slogantime is 10 minutes, it will say it at somewhere between 10 and 20 minutes after the machine is crated.
		last_slogan = world.time + rand(0, slogan_delay)

	if(product_ads)
		ads_list += splittext(product_ads, ";")

	set_prices()
	power_change()
	setup_icon_states()

/obj/machinery/vending/RefreshParts()
	V = locate() in component_parts

/obj/machinery/vending/examine(mob/user)
	. = ..()
	if(.)
		if(stat & BROKEN)
			to_chat(user, SPAN("warning", "It's broken."))
		else
			if(health <= 0.4 * max_health)
				to_chat(user, SPAN("warning", "It's heavily damaged!"))
			else if(health < max_health)
				to_chat(user, SPAN("warning", "It's showing signs of damage."))

/obj/machinery/vending/proc/take_damage(force)
	if(health > 0)
		health = max(health-force, 0)
		if(health == 0)
			set_broken(1)

/**
 *  Build src.produdct_records from the products lists
 *
 *  src.products, src.contraband, src.premium, and src.prices allow specifying
 *  products that the vending machine is to carry without manually populating
 *  src.product_records.
 */
/obj/machinery/vending/proc/set_prices()
	var/obj/item/weapon/vendcart/V = locate(/obj/item/weapon/vendcart) in component_parts
	for(var/datum/stored_items/vending_products/P in V.product_records)
		P.price = (P.item_path in prices) ? prices[P.item_path] : 0

/obj/machinery/vending/Destroy()
	qdel(wires)
	wires = null
	qdel(coin)
	coin = null
	. = ..()

/obj/machinery/vending/ex_act(severity)
	switch(severity)
		if(1.0)
			qdel(src)
			return
		if(2.0)
			if(prob(50))
				qdel(src)
				return
		if(3.0)
			if(prob(25))
				spawn(0)
					malfunction()
					return
				return
		else
	return

/obj/machinery/vending/emag_act(remaining_charges, mob/user)
	if(!emagged)
		playsound(loc, 'sound/effects/computer_emag.ogg', 25)
		emagged = 1
		to_chat(user, "You short out the product lock on \the [src]")
		return 1

/obj/machinery/vending/bullet_act(obj/item/projectile/Proj)
	var/damage = Proj.get_structure_damage()
	if(!damage)
		return

	..()
	take_damage(damage)
	return

/obj/machinery/vending/proc/pay(obj/item/weapon/W, mob/user)
	if(!W)
		return FALSE

	var/obj/item/weapon/card/id/I = W.GetIdCard()

	if(currently_vending && vendor_account && !vendor_account.suspended)
		var/paid = 0

		if(!vend_ready) // One thingy at a time!
			to_chat(user, SPAN("warning", "\The [src] is busy at the moment!"))
			return

		if(I) // For IDs and PDAs and wallets with IDs
			paid = pay_with_card(I, W)
		else if(istype(W, /obj/item/weapon/spacecash/ewallet))
			var/obj/item/weapon/spacecash/ewallet/C = W
			paid = pay_with_ewallet(C)
		else if(istype(W, /obj/item/weapon/spacecash/bundle))
			var/obj/item/weapon/spacecash/bundle/C = W
			paid = pay_with_cash(C)

		if(paid)
			vend(currently_vending, usr)
			return TRUE

	return FALSE

/obj/machinery/vending/attackby(obj/item/weapon/W, mob/user)
	if(pay(W, user))
		return

	else if(isScrewdriver(W))
		panel_open = !panel_open
		to_chat(user, "You [panel_open ? "open" : "close"] the maintenance panel.")
		overlays.Cut()
		if(panel_open)
			overlays += image(icon, "[base_icon]-panel")
		return

	else if(default_deconstruction_crowbar(user, W))
		return

	else if(isMultitool(W) || isWirecutter(W))
		if(panel_open)
			attack_hand(user)
		return

	else if(panel_open && istype(W, cartridge))
		to_chat(user, SPAN("notice", "You start replacing cartridge in \the [src]."))
		if(do_after(user, 20, src))
			to_chat(user, SPAN("notice", "You replace cartridge in \the [src]."))
			for(var/obj/item/weapon/vendcart/B in component_parts)
				var/mob/living/carbon/human/A = user
				A.remove_from_mob(W)
				component_parts -= B
				W.forceMove(src)
				component_parts += W
				A.put_in_hands(B)
				RefreshParts()
				return

	else if((obj_flags & OBJ_FLAG_ANCHORABLE) && isWrench(W))
		if(wrench_floor_bolts(user))
			update_standing_icon()
			power_change()
		return

	else if(istype(W, /obj/item/weapon/coin) && V.premium.len > 0)
		user.drop_item()
		W.forceMove(src)
		coin = W
		categories |= CAT_COIN
		to_chat(user, SPAN("notice", "You insert \the [W] into \the [src]."))
		return

	else if(istype(W, /obj/item/weapon/weldingtool))
		var/obj/item/weapon/weldingtool/WT = W
		if(!WT.isOn())
			return
		if(health == max_health)
			to_chat(user, SPAN("notice", "\The [src] is undamaged."))
			return
		if(!WT.remove_fuel(0, user))
			to_chat(user, SPAN("notice", "You need more welding fuel to complete this task."))
			return
		user.visible_message(SPAN("notice", "[user] is repairing \the [src]..."), \
				             SPAN("notice", "You start repairing the damage to [src]..."))
		playsound(src, 'sound/items/Welder.ogg', 100, 1)
		if(!do_after(user, 30, src) && WT && WT.isOn())
			return
		health = max_health
		set_broken(0)
		user.visible_message(SPAN("notice", "[user] repairs \the [src]."), \
				             SPAN("notice", "You repair \the [src]."))
		return

	else if(attempt_to_stock(W, user))
		return

	else if(W.force >= 10)
		take_damage(W.force)
		user.visible_message(SPAN("danger", "\The [src] has been [pick(W.attack_verb)] with [W] by [user]!"))
		user.setClickCooldown(W.update_attack_cooldown())
		user.do_attack_animation(src)
		obj_attack_sound(W)
		shake_animation(stime = 4)
		return
	..()

	if(W.mod_weight >= 0.75)
		shake_animation(stime = 2)
	return

/obj/machinery/vending/MouseDrop_T(obj/item/I as obj, mob/user as mob)
	if(!CanMouseDrop(I, user) || (I.loc != user))
		return
	return attempt_to_stock(I, user)

/obj/machinery/vending/proc/attempt_to_stock(obj/item/I as obj, mob/user as mob)
	var/obj/item/weapon/vendcart/V = locate() in component_parts
	for(var/datum/stored_items/vending_products/R in V.product_records)
		if(I.type == R.item_path)
			stock(I, R, user)
			return 1

/**
 *  Receive payment with cashmoney.
 */
/obj/machinery/vending/proc/pay_with_cash(obj/item/weapon/spacecash/bundle/cashmoney)
	if(currently_vending.price > cashmoney.worth)
		// This is not a status display message, since it's something the character
		// themselves is meant to see BEFORE putting the money in
		to_chat(usr, "\icon[cashmoney] <span class='warning'>That is not enough money.</span>")
		return 0

	visible_message(SPAN("info", "\The [usr] inserts some cash into \the [src]."))
	cashmoney.worth -= currently_vending.price

	if(cashmoney.worth <= 0)
		usr.drop_from_inventory(cashmoney)
		qdel(cashmoney)
	else
		cashmoney.update_icon()

	// Vending machines have no idea who paid with cash
	credit_purchase("(cash)")
	return 1

/**
 * Scan a chargecard and deduct payment from it.
 *
 * Takes payment for whatever is the currently_vending item. Returns 1 if
 * successful, 0 if failed.
 */
/obj/machinery/vending/proc/pay_with_ewallet(obj/item/weapon/spacecash/ewallet/wallet)
	visible_message(SPAN("info", "\The [usr] swipes \the [wallet] through \the [src]."))
	if(currently_vending.price > wallet.worth)
		status_message = "Insufficient funds on chargecard."
		status_error = 1
		return 0
	else
		wallet.worth -= currently_vending.price
		credit_purchase("[wallet.owner_name] (chargecard)")
		return 1

/**
 * Scan a card and attempt to transfer payment from associated account.
 *
 * Takes payment for whatever is the currently_vending item. Returns 1 if
 * successful, 0 if failed
 */
/obj/machinery/vending/proc/pay_with_card(obj/item/weapon/card/id/I, obj/item/ID_container)
	if(I==ID_container || ID_container == null)
		visible_message(SPAN("info", "\The [usr] swipes \the [I] through \the [src]."))
	else
		visible_message(SPAN("info", "\The [usr] swipes \the [ID_container] through \the [src]."))
	var/datum/money_account/customer_account = get_account(I.associated_account_number)
	if(!customer_account)
		status_message = "Error: Unable to access account. Please contact technical support if problem persists."
		status_error = 1
		return 0

	if(customer_account.suspended)
		status_message = "Unable to access account: account suspended."
		status_error = 1
		return 0

	// Have the customer punch in the PIN before checking if there's enough money. Prevents people from figuring out acct is
	// empty at high security levels
	if(customer_account.security_level != 0) //If card requires pin authentication (ie seclevel 1 or 2)
		var/attempt_pin = input("Enter pin code", "Vendor transaction") as num
		customer_account = attempt_account_access(I.associated_account_number, attempt_pin, 2)

		if(!customer_account)
			status_message = "Unable to access account: incorrect credentials."
			status_error = 1
			return 0

	if(currently_vending.price > customer_account.money)
		status_message = "Insufficient funds in account."
		status_error = 1
		return 0
	else
		// Okay to move the money at this point
		var/datum/transaction/T = new("[vendor_account.owner_name] (via [name])", "Purchase of [currently_vending.item_name]", -currently_vending.price, name)

		customer_account.do_transaction(T)

		// Give the vendor the money. We use the account owner name, which means
		// that purchases made with stolen/borrowed card will look like the card
		// owner made them
		credit_purchase(customer_account.owner_name)
		return 1

/**
 *  Add money for current purchase to the vendor account.
 *
 *  Called after the money has already been taken from the customer.
 */
/obj/machinery/vending/proc/credit_purchase(target as text)
	vendor_account.money += currently_vending.price

	var/datum/transaction/T = new(target, "Purchase of [currently_vending.item_name]", currently_vending.price, name)
	vendor_account.do_transaction(T)

/obj/machinery/vending/attack_ai(mob/user as mob)
	return attack_hand(user)

/obj/machinery/vending/attack_hand(mob/user as mob)
	if(stat & (BROKEN|NOPOWER))
		return

	if(seconds_electrified != 0)
		if(shock(user, 100))
			return

	wires.Interact(user)
	tgui_interact(user)

/obj/machinery/vending/tgui_interact(mob/user, datum/tgui/ui)
	ui = SStgui.try_update_ui(user, src, ui)

	if(!ui)
		ui = new(user, src, "Vending")
		ui.open()

/obj/machinery/vending/tgui_data(mob/user)
	var/list/data = list(
		"name" = name,
		"mode" = 0,
		"ready" = vend_ready
	)

	if(currently_vending)
		data["mode"] = 1
		data["payment"] = list(
			"product" = currently_vending.item_name,
			"price" = currently_vending.price,
			"message_err" = 0,
			"message" = status_message,
			"message_err" = status_error,
			"icon" = icon2base64html(currently_vending.item_path)
		)

	var/list/listed_products = list()

	var/obj/item/weapon/vendcart/V = locate() in component_parts
	for(var/key = 1 to V.product_records.len)
		var/datum/stored_items/vending_products/I = V.product_records[key]

		if(!(I.category & categories))
			continue

		listed_products.Add(list(list(
			"key" = key,
			"name" = I.item_name,
			"price" = I.price,
			"color" = I.display_color,
			"amount" = I.get_amount(),
			"icon" = icon2base64html(I.item_path))))

	data["products"] = listed_products

	if(coin)
		data["coin"] = coin.name

	if(panel_open)
		data["panel"] = 1
		data["speaker"] = shut_up ? 0 : 1
	else
		data["panel"] = 0

	return data

/obj/machinery/vending/tgui_act(action, params)
	. = ..()

	if(.)
		return

	switch(action)
		if("remove_coin")
			if(istype(usr, /mob/living/silicon))
				return TRUE

			if(!coin)
				to_chat(usr, "There is no coin in this machine.")
				return TRUE

			coin.forceMove(loc)

			if(!usr.get_active_hand())
				usr.put_in_hands(coin)

			to_chat(usr, SPAN("notice", "You remove \the [coin] from \the [src]"))
			coin = null
			categories &= ~CAT_COIN

			return TRUE
		if("vend")
			if(!vend_ready || currently_vending)
				return TRUE

			if((!allowed(usr)) && !emagged && scan_id)	// For SECURE VENDING MACHINES YEAH
				to_chat(usr, SPAN("warning", "Access denied.")) // Unless emagged of course
				flick("[base_icon]-deny", src)
				return TRUE

			var/key = text2num(params["vend"])
			var/obj/item/weapon/vendcart/V = locate() in component_parts
			var/datum/stored_items/vending_products/R = V.product_records[key]

			// This should not happen unless the request from NanoUI was bad
			if(!(R.category & categories))
				return TRUE

			if(R.price <= 0)
				vend(R, usr)
			else if(istype(usr, /mob/living/silicon)) // If the item is not free, provide feedback if a synth is trying to buy something.
				to_chat(usr, SPAN("danger", "Artificial unit recognized.  Artificial units cannot complete this transaction.  Purchase canceled."))
				return TRUE
			else
				currently_vending = R
				if(!vendor_account || vendor_account.suspended)
					status_message = "This machine is currently unable to process payments due to problems with the associated account."
					status_error = 1
				else
					status_message = "Please swipe a card or insert cash to pay for the item."
					status_error = 0

		if("cancelpurchase")
			currently_vending = null
			return TRUE

		if("togglevoice")
			if(!panel_open)
				return TRUE

			shut_up = !shut_up
			return TRUE
		if("pay")
			pay(usr.get_active_hand(), usr) || pay(usr.get_inactive_hand(), usr)
			return TRUE

/obj/machinery/vending/proc/vend(datum/stored_items/vending_products/R, mob/user)
	if((!allowed(usr)) && !emagged && scan_id)	// For SECURE VENDING MACHINES YEAH
		to_chat(usr, SPAN("warning", "Access denied.")) // Unless emagged of course
		flick("[base_icon]-deny", src)
		return
	vend_ready = 0 // One thing at a time!!
	status_message = "Vending..."
	status_error = 0

	if(R.category & CAT_COIN)
		if(!coin)
			to_chat(user, SPAN("notice", "You need to insert a coin to get this item."))
			return
		if(coin.string_attached)
			if(prob(50))
				to_chat(user, SPAN("notice", "You successfully pull the coin out before \the [src] could swallow it."))
			else
				to_chat(user, SPAN("notice", "You weren't able to pull the coin out fast enough, the machine ate it, string and all."))
				qdel(coin)
				coin = null
				categories &= ~CAT_COIN
		else
			qdel(coin)
			coin = null
			categories &= ~CAT_COIN

	if(((last_reply + (vend_delay + 200)) <= world.time) && vend_reply)
		spawn(0)
			speak(vend_reply)
			last_reply = world.time

	use_power_oneoff(vend_power_usage)	//actuators and stuff
	if(use_vend_state) //Show the vending animation if needed
		flick("[base_icon]-vend", src)
	spawn(vend_delay) //Time to vend
		playsound(src, 'sound/effects/using/disposal/drop2.ogg', 40, TRUE)

		if(prob(diona_spawn_chance)) //Hehehe
			var/turf/T = get_turf(src)
			var/mob/living/carbon/alien/diona/S = new(T)
			visible_message(SPAN("notice", "\The [src] makes an odd grinding noise before coming to a halt as \a [S.name] slurmps out from the receptacle."))
		else //Just a normal vend, then
			R.get_product(get_turf(src))
			visible_message("\The [src] whirs as it vends \the [R.item_name].")
			if(prob(1)) //The vending gods look favorably upon you
				sleep(3)
				if(R.get_product(get_turf(src)))
					visible_message(SPAN("notice", "\The [src] clunks as it vends an additional [R.item_name]."))

		status_message = ""
		status_error = 0
		vend_ready = 1
		currently_vending = null

/**
 * Add item to the machine
 *
 * Checks if item is vendable in this machine should be performed before
 * calling. W is the item being inserted, R is the associated vending_product entry.
 */
/obj/machinery/vending/proc/stock(obj/item/weapon/W, datum/stored_items/vending_products/R, mob/user)
	if(!user.unEquip(W))
		return

	if(R.add_product(W))
		to_chat(user, SPAN("notice", "You insert \the [W] in the product receptor."))
		return 1

/obj/machinery/vending/Process()
	if(stat & (BROKEN|NOPOWER))
		return

	if(!active)
		return

	if(seconds_electrified > 0)
		seconds_electrified--

	//Pitch to the people!  Really sell it!
	if(((last_slogan + slogan_delay) <= world.time) && (slogan_list.len > 0) && (!shut_up) && prob(5))
		var/slogan = pick(slogan_list)
		speak(slogan)
		last_slogan = world.time

	if(shoot_inventory && prob(shooting_chance))
		throw_item()

	return

/obj/machinery/vending/proc/speak(message)
	if(stat & NOPOWER)
		return

	if(!message)
		return

	for(var/mob/O in hearers(src, null))
		O.show_message("<span class='game say'><span class='name'>\The [src]</span> beeps, \"[message]\"</span>", 2)
	return

/obj/machinery/vending/powered()
	return anchored && ..()

/obj/machinery/vending/update_icon()
	if(stat & BROKEN)
		icon_state = "[base_icon]-broken"
	else if( !(stat & NOPOWER) )
		icon_state = base_icon
	else
		icon_state = "[base_icon]-off"

/obj/machinery/vending/proc/setup_icon_states()
	if(use_alt_icons)
		base_icon = pick(alt_icons)
		update_icon()
	else
		base_icon = icon_state

/obj/machinery/vending/proc/update_standing_icon()
	if(!anchored)
		transform = turn(transform, -90)
		pixel_y = -3
	else
		transform = turn(transform, 90)
		pixel_y = initial(pixel_y)
	update_icon()

//Oh no we're malfunctioning!  Dump out some product and break.
/obj/machinery/vending/proc/malfunction()
	var/obj/item/weapon/vendcart/V = locate() in component_parts
	for(var/datum/stored_items/vending_products/R in V.product_records)
		while(R.get_amount()>0)
			R.get_product(loc)
		break
	set_broken(TRUE)

//Somebody cut an important wire and now we're following a new definition of "pitch."
/obj/machinery/vending/proc/throw_item()
	var/obj/throw_item = null
	var/mob/living/target = locate() in view(7, src)
	if(!target)
		return 0
	var/obj/item/weapon/vendcart/V = locate() in component_parts
	for(var/datum/stored_items/vending_products/R in shuffle(V.product_records))
		throw_item = R.get_product(loc)
		if(throw_item)
			break
	if(!throw_item)
		return 0
	spawn(0)
		throw_item.throw_at(target, rand(1, 2), 3, src)
	visible_message(SPAN("warning", "\The [src] launches \a [throw_item] at \the [target]!"))
	return 1

/obj/machinery/vending/set_broken(new_state)
	..()
	if(new_state)
		var/datum/effect/effect/system/spark_spread/spark_system = new /datum/effect/effect/system/spark_spread()
		spark_system.set_up(5, 0, loc)
		spark_system.start()
		playsound(loc, "spark", 50, 1)

/*
 * Vending machine types
 */

/*

/obj/machinery/vending/[vendors name here]   // --vending machine template   :)
	name = ""
	desc = ""
	icon = ''
	icon_state = ""
	vend_delay = 15
	products = list()
	contraband = list()
	premium = list()

*/

/obj/machinery/vending/boozeomat
	name = "Booze-O-Mat"
	desc = "A refrigerated vending unit for alcoholic beverages and alcoholic beverage accessories."
	icon_state = "boozeomat"
	use_vend_state = TRUE
	vend_delay = 15
	idle_power_usage = 211 //refrigerator - believe it or not, this is actually the average power consumption of a refrigerated vending machine according to NRCan.
	product_slogans = "I hope nobody asks me for a bloody cup o' tea...;Alcohol is humanity's friend. Would you abandon a friend?;Quite delighted to serve you!;Is nobody thirsty on this station?"
	product_ads = "Drink up!;Booze is good for you!;Alcohol is humanity's best friend.;Quite delighted to serve you!;Care for a nice, cold beer?;Nothing cures you like booze!;Have a sip!;Have a drink!;Have a beer!;Beer is good for you!;Only the finest alcohol!;Best quality booze since 2053!;Award-winning wine!;Maximum alcohol!;Man loves beer.;A toast for progress!"
	req_access = list(access_bar)
	cartridge = /obj/item/weapon/vendcart/boozeomat

/obj/machinery/vending/assist
	product_ads = "Only the finest!;Have some tools.;The most robust equipment.;The finest gear in space!"
	cartridge = /obj/item/weapon/vendcart/assist

/obj/machinery/vending/assist/antag
	name = "AntagCorpVend"
	cartridge = /obj/item/weapon/vendcart/antag

/obj/machinery/vending/coffee
	name = "Hot Drinks machine"
	desc = "A vending machine which dispenses hot drinks."
	product_ads = "Have a drink!;Drink up!;It's good for you!;Would you like a hot joe?;I'd kill for some coffee!;The best beans in the galaxy.;Only the finest brew for you.;Mmmm. Nothing like a coffee.;I like coffee, don't you?;Coffee helps you work!;Try some tea.;We hope you like the best!;Try our new chocolate!;Admin conspiracies"
	icon_state = "coffee"
	alt_icons = list("coffee", "coffee_alt")
	use_alt_icons = TRUE
	use_vend_state = TRUE
	vend_delay = 34
	idle_power_usage = 211 //refrigerator - believe it or not, this is actually the average power consumption of a refrigerated vending machine according to NRCan.
	vend_power_usage = 85000 //85 kJ to heat a 250 mL cup of coffee
	rand_amount = TRUE
	cartridge = /obj/item/weapon/vendcart/coffee

	prices = list(/obj/item/weapon/reagent_containers/food/drinks/coffee = 3,
			   	  /obj/item/weapon/reagent_containers/food/drinks/tea = 3,
			   	  /obj/item/weapon/reagent_containers/food/drinks/h_chocolate = 3)

/obj/machinery/vending/snack
	name = "Getmore Chocolate Corp"
	desc = "A snack machine courtesy of the Getmore Chocolate Corporation, based out of Mars."
	product_slogans = "Try our new nougat bar!;Twice the calories for half the price!"
	product_ads = "The healthiest!;Award-winning chocolate bars!;Mmm! So good!;Oh my god it's so juicy!;Have a snack.;Snacks are good for you!;Have some more Getmore!;Best quality snacks straight from mars.;We love chocolate!;Try our new jerky!"
	icon_state = "snack"
	use_vend_state = TRUE
	vend_delay = 25
	rand_amount = TRUE
	cartridge = /obj/item/weapon/vendcart/snack

	prices = list(/obj/item/weapon/reagent_containers/food/snacks/packaged/tweakers = 5,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/sweetroid = 5,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/sugarmatter = 5,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/jellaws = 5,
				  /obj/item/weapon/reagent_containers/food/drinks/dry_ramen = 10,
				  /obj/item/weapon/reagent_containers/food/drinks/chickensoup = 20,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/chips = 10,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/sosjerky = 20,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/no_raisin = 15,
				  /obj/item/weapon/reagent_containers/food/snacks/spacetwinkie = 5,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/cheesiehonkers = 10,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/tastybread = 10)

/obj/machinery/vending/snack/wallsnack
	name = "Getmore Chocolate Corp"
	desc = "A snack machine courtesy of the Getmore Chocolate Corporation, based out of Mars."
	product_slogans = "Try our new nougat bar!;Twice the calories for half the price!"
	product_ads = "The healthiest!;Award-winning chocolate bars!;Mmm! So good!;Oh my god it's so juicy!;Have a snack.;Snacks are good for you!;Have some more Getmore!;Best quality snacks straight from mars.;We love chocolate!;Try our new jerky!"
	icon_state = "snack_wall"
	use_vend_state = FALSE
	vend_delay = 25

/obj/machinery/vending/snack/medbay
	name = "Getmore Healthy Snacks"
	desc = "A snack machine manufactured by Getmore Chocolate Corporation, specifically for hospitals."
	product_slogans = "Try our new Hema-2-Gen bar!;Twice the health for half the price!"
	product_ads = "The healthiest!;Award-winning chocolate bars!;Mmm! So good!;Oh my god it's so juicy!;Have a snack.;Snacks are good for you!;Have some more Getmore!;Best quality snacks straight from mars.;We love chocolate!;Try our new jerky!"
	icon_state = "snackmed"
	use_vend_state = TRUE
	vend_delay = 25
	cartridge = /obj/item/weapon/vendcart/medbay

	prices = list(/obj/item/weapon/reagent_containers/food/snacks/grown/apple = 1,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/hematogen = 10,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/nutribar = 5,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/no_raisin = 1,
				  /obj/item/weapon/reagent_containers/food/snacks/grown/orange = 1,
				  /obj/item/weapon/reagent_containers/food/snacks/packaged/tastybread = 3)



/obj/machinery/vending/cola
	name = "Robust Softdrinks"
	desc = "A softdrink vendor provided by Robust Industries, LLC."
	icon_state = "Cola_Machine"
	alt_icons = list("Cola_Machine", "Cola_Machine_red")
	use_alt_icons = TRUE
	use_vend_state = TRUE
	vend_delay = 11
	product_slogans = "Robust Softdrinks: More robust than a toolbox to the head!"
	product_ads = "Refreshing!;Hope you're thirsty!;Over 1 million drinks sold!;Thirsty? Why not cola?;Please, have a drink!;Drink up!;The best drinks in space."
	rand_amount = TRUE
	cartridge = /obj/item/weapon/vendcart/cola

	prices = list(/obj/item/weapon/reagent_containers/food/drinks/cans/cola = 5,
				  /obj/item/weapon/reagent_containers/food/drinks/cans/colavanilla = 8,
				  /obj/item/weapon/reagent_containers/food/drinks/cans/colacherry = 8,
				  /obj/item/weapon/reagent_containers/food/drinks/cans/space_mountain_wind = 5,
				  /obj/item/weapon/reagent_containers/food/drinks/cans/dr_gibb = 5,
				  /obj/item/weapon/reagent_containers/food/drinks/cans/starkist = 5,
				  /obj/item/weapon/reagent_containers/food/drinks/cans/waterbottle = 3,
				  /obj/item/weapon/reagent_containers/food/drinks/cans/space_up = 5,
				  /obj/item/weapon/reagent_containers/food/drinks/cans/iced_tea = 8,
				  /obj/item/weapon/reagent_containers/food/drinks/cans/grape_juice = 5,
				  /obj/item/weapon/reagent_containers/food/drinks/cans/red_mule = 15)

	idle_power_usage = 211 //refrigerator - believe it or not, this is actually the average power consumption of a refrigerated vending machine according to NRCan.

/obj/machinery/vending/fitness
	name = "SweatMAX"
	desc = "An exercise aid and nutrition supplement vendor that preys on your inadequacy."
	product_slogans = "SweatMAX, get robust!"
	product_ads = "Pain is just weakness leaving the body!;Run! Your fat is catching up to you;Never forget leg day!;Push out!;This is the only break you get today.;Don't cry, sweat!;Healthy is an outfit that looks good on everybody."
	icon_state = "fitness"
	use_vend_state = TRUE
	vend_delay = 6
	rand_amount = TRUE
	cartridge = /obj/item/weapon/vendcart/fitness

	prices = list(/obj/item/weapon/reagent_containers/food/drinks/milk/smallcarton = 3,
					/obj/item/weapon/reagent_containers/food/drinks/milk/smallcarton/chocolate = 3,
					/obj/item/weapon/reagent_containers/food/drinks/glass2/fitnessflask/proteinshake = 20,
					/obj/item/weapon/reagent_containers/food/drinks/glass2/fitnessflask = 5,
					/obj/item/weapon/reagent_containers/food/snacks/packaged/nutribar = 5,
					/obj/item/weapon/reagent_containers/food/snacks/liquidfood = 5,
					/obj/item/weapon/reagent_containers/pill/diet = 25,
					/obj/item/weapon/towel/random = 40)

/obj/machinery/vending/cigarette
	name = "Cigarette machine"
	desc = "A specialized vending machine designed to contribute to your slow and uncomfortable death."
	product_slogans = "There's no better time to start smokin'.;\
		Smoke now, and win the adoration of your peers.;\
		They beat cancer centuries ago, so smoke away.;\
		If you're not smoking, you must be joking."
	product_ads = "Probably not bad for you!;\
		Don't believe the scientists!;\
		It's good for you!;\
		Don't quit, buy more!;\
		Smoke!;\
		Nicotine heaven.;\
		Best cigarettes since 2150.;\
		Award-winning cigarettes, all the best brands.;\
		Feeling temperamental? Try a Temperamento!;\
		Carcinoma Angels - go fuck yerself!;\
		Don't be so hard on yourself, kid. Smoke a Lucky Star!;\
		We understand the depressed, alcoholic cowboy in you. That's why we also smoke Jericho.;\
		Professionals. Better cigarettes for better people. Yes, better people.;\
		StarLing - look cool 'till you drool!"
	vend_delay = 30
	icon_state = "cigs"
	alt_icons = list("cigs", "cigs_alt")
	use_alt_icons = TRUE
	use_vend_state = TRUE
	rand_amount = TRUE
	cartridge = /obj/item/weapon/vendcart/cigarette

	prices = list(/obj/item/weapon/storage/fancy/cigarettes = 45,
					/obj/item/weapon/storage/fancy/cigarettes/luckystars = 50,
					/obj/item/weapon/storage/fancy/cigarettes/jerichos = 65,
					/obj/item/weapon/storage/fancy/cigarettes/menthols = 55,
					/obj/item/weapon/storage/fancy/cigarettes/carcinomas = 65,
					/obj/item/weapon/storage/fancy/cigarettes/professionals = 70,
					/obj/item/weapon/storage/fancy/cigarettes/cigarello = 85,
					/obj/item/weapon/storage/fancy/cigarettes/cigarello/mint = 85,
					/obj/item/weapon/storage/fancy/cigarettes/cigarello/variety = 85,
					/obj/item/weapon/storage/box/matches = 3,
					/obj/item/weapon/flame/lighter/random = 10,
					/obj/item/weapon/storage/fancy/rollingpapers = 20,
					/obj/item/weapon/storage/fancy/rollingpapers/good = 35,
					/obj/item/weapon/storage/tobaccopack/generic = 35,
					/obj/item/weapon/storage/tobaccopack/menthol = 40,
					/obj/item/weapon/storage/tobaccopack/cherry = 50,
					/obj/item/weapon/storage/tobaccopack/chocolate = 50,
					/obj/item/clothing/mask/smokable/ecig/simple = 50,
					/obj/item/clothing/mask/smokable/ecig/util = 100,
					/obj/item/clothing/mask/smokable/ecig/deluxe = 250,
					/obj/item/weapon/reagent_containers/ecig_cartridge/med_nicotine = 15,
					/obj/item/weapon/reagent_containers/ecig_cartridge/high_nicotine = 15,
					/obj/item/weapon/reagent_containers/ecig_cartridge/orange = 15,
					/obj/item/weapon/reagent_containers/ecig_cartridge/mint = 15,
					/obj/item/weapon/reagent_containers/ecig_cartridge/watermelon = 15,
					/obj/item/weapon/reagent_containers/ecig_cartridge/grape = 15,
					/obj/item/weapon/reagent_containers/ecig_cartridge/lemonlime = 15,
					/obj/item/weapon/reagent_containers/ecig_cartridge/coffee = 15,
					/obj/item/weapon/reagent_containers/ecig_cartridge/blanknico = 15)

/obj/machinery/vending/cigarette/cigars
	name = "Cigars midcentury machine"
	desc = "Classy vending machine designed to contribute to your slow and uncomfortable death with style."
	vend_delay = 21
	icon_state = "cigars"
	use_vend_state = TRUE

/obj/machinery/vending/cigarette/wallcigs
	density = 0
	vend_delay = 18
	icon_state = "cigs_wall"
	use_vend_state = TRUE

/obj/machinery/vending/medical
	name = "NanoMed Plus"
	desc = "Medical drug dispenser."
	icon_state = "med"
	use_vend_state = TRUE
	vend_delay = 18
	product_ads = "Go save some lives!;The best stuff for your medbay.;Only the finest tools.;Natural chemicals!;This stuff saves lives.;Don't you want some?;Ping!"
	req_access = list(access_medical_equip)
	cartridge = /obj/item/weapon/vendcart/medical

	idle_power_usage = 211 //refrigerator - believe it or not, this is actually the average power consumption of a refrigerated vending machine according to NRCan.


//This one's from bay12
/obj/machinery/vending/plasmaresearch
	name = "Toximate 3000"
	desc = "All the fine parts you need in one vending machine!"
	cartridge = /obj/item/weapon/vendcart/plasmaresearch

/obj/machinery/vending/wallmed1
	name = "NanoMed"
	desc = "A wall-mounted version of the NanoMed."
	product_ads = "Go save some lives!;The best stuff for your medbay.;Only the finest tools.;Natural chemicals!;This stuff saves lives.;Don't you want some?"
	icon_state = "wallmed"
	density = 0 //It is wall-mounted, and thus, not dense. --Superxpdude
	cartridge = /obj/item/weapon/vendcart/wallmed1

/obj/machinery/vending/wallmed2
	name = "NanoMed Mini"
	desc = "A wall-mounted version of the NanoMed, containing only vital first aid equipment."
	product_ads = "Go save some lives!;The best stuff for your medbay.;Only the finest tools.;Natural chemicals!;This stuff saves lives.;Don't you want some?"
	icon_state = "wallmed"
	density = 0 //It is wall-mounted, and thus, not dense. --Superxpdude
	cartridge = /obj/item/weapon/vendcart/wallmed2

/obj/machinery/vending/security
	name = "SecTech"
	desc = "A security equipment vendor."
	product_ads = "Crack capitalist skulls!;Beat some heads in!;Don't forget - harm is good!;Your weapons are right here.;Handcuffs!;Freeze, scumbag!;Don't tase me bro!;Tase them, bro.;Why not have a donut?"
	icon_state = "sec"
	alt_icons = list("sec", "sec_alt")
	use_alt_icons = TRUE
	use_vend_state = TRUE
	vend_delay = 20
	req_access = list(access_security)
	cartridge = /obj/item/weapon/vendcart/security

/obj/machinery/vending/hydronutrients
	name = "NutriMax"
	desc = "A plant nutrients vendor."
	product_slogans = "Aren't you glad you don't have to fertilize the natural way?;Now with 50% less stink!;Plants are people too!"
	product_ads = "We like plants!;Don't you want some?;The greenest thumbs ever.;We like big plants.;Soft soil..."
	icon_state = "nutri"
	use_vend_state = TRUE
	vend_delay = 26
	idle_power_usage = 211 //refrigerator - believe it or not, this is actually the average power consumption of a refrigerated vending machine according to NRCan.
	cartridge = /obj/item/weapon/vendcart/hydronutrients

/obj/machinery/vending/magivend
	name = "MagiVend"
	desc = "A magic vending machine."
	icon_state = "MagiVend"
	product_slogans = "Sling spells the proper way with MagiVend!;Be your own Houdini! Use MagiVend!"
	vend_delay = 15
	vend_reply = "Have an enchanted evening!"
	product_ads = "FJKLFJSD;AJKFLBJAKL;1234 LOONIES LOL!;>MFW;Kill them fuckers!;GET DAT FUKKEN DISK;HONK!;EI NATH;Down with Central!;Admin conspiracies since forever!;Space-time bending hardware!"
	cartridge = /obj/item/weapon/vendcart/magivend

/obj/machinery/vending/dinnerware
	name = "Dinnerware"
	desc = "A kitchen and restaurant equipment vendor."
	product_ads = "Mm, food stuffs!;Food and food accessories.;Get your plates!;You like forks?;I like forks.;Woo, utensils.;You don't really need these..."
	icon_state = "dinnerware"
	use_vend_state = TRUE
	cartridge = /obj/item/weapon/vendcart/dinnerware

/obj/machinery/vending/sovietsoda
	name = "BODA"
	desc = "An old soda vending machine. How could this have got here?"
	icon_state = "sovietsoda"
	use_vend_state = TRUE
	product_ads = "For Tsar and Country.;Have you fulfilled your nutrition quota today?;Very nice!;We are simple people, for this is all we eat.;If there is a person, there is a problem. If there is no person, then there is no problem."
	rand_amount = TRUE
	idle_power_usage = 211 //refrigerator - believe it or not, this is actually the average power consumption of a refrigerated vending machine according to NRCan.
	cartridge = /obj/item/weapon/vendcart/sovietsoda

/obj/machinery/vending/tool
	name = "YouTool"
	desc = "Tools for tools."
	icon_state = "tool"
	use_vend_state = TRUE
	vend_delay = 11
	//req_access = list(access_maint_tunnels) //Maintenance access
	cartridge = /obj/item/weapon/vendcart/tool

/obj/machinery/vending/engivend
	name = "Engi-Vend"
	desc = "Spare tool vending. What? Did you expect some witty description?"
	icon_state = "engivend"
	use_vend_state = TRUE
	vend_delay = 21
	req_one_access = list(access_atmospherics, access_engine_equip)
	cartridge = /obj/item/weapon/vendcart/engivend

//This one's from bay12
/obj/machinery/vending/engineering
	name = "Robco Tool Maker"
	desc = "Everything you need for do-it-yourself repair."
	icon_state = "engi"
	req_one_access = list(access_atmospherics, access_engine_equip)
	cartridge = /obj/item/weapon/vendcart/engineering

//This one's from bay12
/obj/machinery/vending/robotics
	name = "Robotech Deluxe"
	desc = "All the tools you need to create your own robot army."
	icon_state = "robotics"
	req_access = list(access_robotics)
	cartridge = /obj/item/weapon/vendcart/robotics

//FOR ACTORS GUILD - mainly props that cannot be spawned otherwise
/obj/machinery/vending/props
	name = "prop dispenser"
	desc = "All the props an actor could need. Probably."
	icon_state = "Theater"
	cartridge = /obj/item/weapon/vendcart/props

//FOR ACTORS GUILD - Containers
/obj/machinery/vending/containers
	name = "container dispenser"
	desc = "A container that dispenses containers."
	icon_state = "robotics"
	cartridge = /obj/item/weapon/vendcart/containers

/obj/machinery/vending/fashionvend
	name = "Smashing Fashions"
	desc = "For all your cheap knockoff needs."
	product_slogans = "Look smashing for your darling!;Be rich! Dress rich!"
	icon_state = "Theater"
	vend_delay = 15
	vend_reply = "Absolutely smashing!"
	product_ads = "Impress the love of your life!;Don't look poor, look rich!;100% authentic designers!;All sales are final!;Lowest prices guaranteed!"
	cartridge = /obj/item/weapon/vendcart/fashionvend

	prices = list(/obj/item/weapon/mirror = 60,
				  /obj/item/weapon/haircomb = 40,
				  /obj/item/clothing/glasses/monocle = 700,
				  /obj/item/clothing/glasses/sunglasses = 500,
				  /obj/item/weapon/lipstick = 100,
				  /obj/item/weapon/lipstick/black = 100,
				  /obj/item/weapon/lipstick/purple = 100,
				  /obj/item/weapon/lipstick/jade = 100,
				  /obj/item/weapon/storage/bouquet = 800,
				  /obj/item/weapon/storage/wallet/poly = 600
					)
// eliza's attempt at a new vending machine
/obj/machinery/vending/games
	name = "Good Clean Fun"
	desc = "Vends things that the CO and SEA are probably not going to appreciate you fiddling with instead of your job..."
	vend_delay = 15
	product_slogans = "Escape to a fantasy world!;Fuel your gambling addiction!;Ruin your friendships!"
	product_ads = "Elves and dwarves!;Totally not satanic!;Fun times forever!"
	icon_state = "games"
	cartridge = /obj/item/weapon/vendcart/games

	prices = list(/obj/item/toy/blink = 3,
				  /obj/item/toy/spinningtoy = 10,
				  /obj/item/weapon/deck/tarot = 3,
				  /obj/item/weapon/deck/cards = 3,
				  /obj/item/weapon/pack/cardemon = 5,
				  /obj/item/weapon/pack/spaceball = 5,
				  /obj/item/weapon/storage/pill_bottle/dice_nerd = 6,
				  /obj/item/weapon/storage/pill_bottle/dice = 6,
				  /obj/item/weapon/storage/box/checkers = 10,
				  /obj/item/weapon/storage/box/checkers/chess/red = 10,
				  /obj/item/weapon/storage/box/checkers/chess = 10)
