var/list/loadout_categories = list()
var/list/gear_datums = list()

/datum/preferences
	var/list/gear_list //Custom/fluff item loadouts.
	var/gear_slot = 1  //The current gear save slot
	var/datum/gear/trying_on_gear
	var/list/trying_on_tweaks = new

/datum/preferences/proc/Gear()
	return gear_list[gear_slot]

/datum/loadout_category
	var/category = ""
	var/list/gear = list()

/datum/loadout_category/New(cat)
	category = cat
	..()

/hook/startup/proc/populate_gear_list()

	//create a list of gear datums to sort
	for(var/geartype in typesof(/datum/gear)-/datum/gear)
		var/datum/gear/G = geartype
		if(!initial(G.display_name))
			continue
		if(GLOB.using_map.loadout_blacklist && (geartype in GLOB.using_map.loadout_blacklist))
			continue

		var/use_name = initial(G.display_name)
		var/use_category = initial(G.sort_category)

		if(!loadout_categories[use_category])
			loadout_categories[use_category] = new /datum/loadout_category(use_category)
		var/datum/loadout_category/LC = loadout_categories[use_category]
		gear_datums[use_name] = new geartype
		LC.gear[use_name] = gear_datums[use_name]

	loadout_categories = sortAssoc(loadout_categories)
	for(var/loadout_category in loadout_categories)
		var/datum/loadout_category/LC = loadout_categories[loadout_category]
		LC.gear = sortAssoc(LC.gear)
	return 1

/datum/category_item/player_setup_item/loadout
	name = "Loadout"
	sort_order = 1
	var/current_tab = "General"
	var/datum/gear/selected_gear
	var/list/selected_tweaks = new
	var/hide_unavailable_gear = 0
	var/flag_not_enough_opyxes = FALSE

/datum/category_item/player_setup_item/loadout/load_character(savefile/S)
	from_file(S["gear_list"], pref.gear_list)
	from_file(S["gear_slot"], pref.gear_slot)

/datum/category_item/player_setup_item/loadout/save_character(savefile/S)
	to_file(S["gear_list"], pref.gear_list)
	to_file(S["gear_slot"], pref.gear_slot)

/datum/category_item/player_setup_item/loadout/proc/valid_gear_choices(max_cost)
	. = list()
	var/mob/preference_mob = preference_mob()
	for(var/gear_name in gear_datums)
		var/datum/gear/G = gear_datums[gear_name]
		var/okay = 1
		if(G.whitelisted && preference_mob)
			okay = 0
			for(var/species in G.whitelisted)
				if(is_species_whitelisted(preference_mob, species))
					okay = 1
					break
		if(!okay)
			continue
		if(max_cost && G.cost > max_cost)
			continue
		. += gear_name

/datum/category_item/player_setup_item/loadout/sanitize_character()
	pref.gear_slot = sanitize_integer(pref.gear_slot, 1, config.loadout_slots, initial(pref.gear_slot))
	if(!islist(pref.gear_list)) pref.gear_list = list()

	if(pref.gear_list.len < config.loadout_slots)
		pref.gear_list.len = config.loadout_slots

	for(var/index = 1 to config.loadout_slots)
		var/list/gears = pref.gear_list[index]

		if(istype(gears))
			for(var/gear_name in gears)
				if(!(gear_name in gear_datums))
					gears -= gear_name

			var/total_cost = 0
			for(var/gear_name in gears)
				if(!gear_datums[gear_name])
					gears -= gear_name
				else if(!(gear_name in valid_gear_choices()))
					gears -= gear_name
				else
					var/datum/gear/G = gear_datums[gear_name]
					if(total_cost + G.cost > config.max_gear_cost)
						gears -= gear_name
					else
						total_cost += G.cost
		else
			pref.gear_list[index] = list()

/datum/category_item/player_setup_item/loadout/content(mob/user)
	. = list()
	if(!pref.preview_icon)
		pref.update_preview_icon()
	user << browse_rsc(pref.preview_icon, "previewicon.png")

	if(!user.client)
		return

	var/total_cost = 0
	var/list/gears = pref.gear_list[pref.gear_slot]
	for(var/i = 1; i <= gears.len; i++)
		var/datum/gear/G = gear_datums[gears[i]]
		if(G)
			total_cost += G.cost

	var/fcolor =  "#3366cc"
	if(total_cost < config.max_gear_cost)
		fcolor = "#e67300"

	. += "<table style='width: 100%;'><tr>"

	. += "<td>"
	. += "<b>Loadout Set #<a href='?src=\ref[src];prev_slot=1'>\<\<</a><b><font color = '[fcolor]'>\[[pref.gear_slot]\]</font> </b><a href='?src=\ref[src];next_slot=1'>\>\></a></b><br>"

	. += "<table><tr>"
	. += "<td><img src=previewicon.png width=[pref.preview_icon.Width()] height=[pref.preview_icon.Height()]></td>"

	. += "<td style=\"vertical-align: top;\">"
	if(config.max_gear_cost < INFINITY)
		. += "<font color = '[fcolor]'>[total_cost]/[config.max_gear_cost]</font> loadout points spent.<br>"
	. += "<a href='?src=\ref[src];clear_loadout=1'>Clear Loadout</a><br>"
	. += "<a href='?src=\ref[src];toggle_hiding=1'>[hide_unavailable_gear ? "Show all" : "Hide unavailable"]</a><br>"
	. += "</td>"

	. += "</tr></table>"
	. += "</td>"

	. += "<td style='width: 90%; text-align: right; vertical-align: top;'>"

	var/patron_tier = user.client.donator_info.get_full_patron_tier()
	if(!patron_tier)
		. += "<b>You are not a Patron yet.</b><br>"
	else
		. += "<b>Your Patreon tier is [patron_tier]</b><br>"
	var/current_opyxes = round(user.client.donator_info.opyxes)
	. += "<b>You have <font color='#e67300'>[current_opyxes]</font> opyx[current_opyxes != 1 ? "es" : ""].</b><br>"
	. += "</td>"

	. += "</tr></table>"

	. += "<table style='height: 100%;'>"

	. += "<tr>"
	. += "<td><b>Categories:</b></td>"
	. += "<td><b>Gears:</b></td>"
	if(selected_gear)
		. += "<td><b>Selected Item:</b></td>"
	. += "</tr>"

	. += "<tr style='vertical-align: top;'>"

	// Categories

	. += "<td style='white-space: nowrap; width: 40px;' class='block'><b>"
	for(var/category in loadout_categories)
		var/datum/loadout_category/LC = loadout_categories[category]
		var/category_cost = 0
		for(var/gear in LC.gear)
			if(gear in pref.gear_list[pref.gear_slot])
				var/datum/gear/G = LC.gear[gear]
				category_cost += G.cost

		if(category == current_tab)
			. += " <span class='linkOn'>[category] - [category_cost]</span> "
		else
			if(category_cost)
				. += " <a class='white' href='?src=\ref[src];select_category=[category]'>[category] - [category_cost]</a> "
			else
				. += " <a href='?src=\ref[src];select_category=[category]'>[category] - 0</a> "
		. += "<br>"

	. += "</b></td>"

	// Gears

	. += "<td style='white-space: nowrap; width: 40px;' class='block'>"
	. += "<table>"
	var/datum/loadout_category/LC = loadout_categories[current_tab]
	var/list/jobs = new
	if(job_master)
		for(var/job_title in (pref.job_medium|pref.job_low|pref.job_high))
			var/datum/job/J = job_master.occupations_by_title[job_title]
			if(J)
				dd_insertObjectList(jobs, J)

	var/list/purchased_gears = new
	var/list/paid_gears = new
	var/list/not_paid_gears = new
	for(var/gear_name in LC.gear)
		if(!(gear_name in valid_gear_choices()))
			continue
		var/datum/gear/G = LC.gear[gear_name]
		if(user.client.donator_info.has_item(G.type))
			purchased_gears.Add(G)
		else if(G.price)
			paid_gears.Add(G)
		else
			not_paid_gears.Add(G)

	for(var/datum/gear/G in purchased_gears + paid_gears + not_paid_gears)
		var/entry = ""
		var/ticked = (G.display_name in pref.gear_list[pref.gear_slot])
		var/display_class
		if(G != selected_gear)
			if(ticked)
				display_class = "white"
			else if(G.price)
				if(user.client.donator_info.has_item(G.type))
					display_class = null
				else
					display_class = "gold"
			else
				display_class = "gray"
		else
			display_class = "linkOn"
		entry += "<tr>"
		entry += "<td width=25%><a [display_class ? "class='[display_class]' " : ""]href='?src=\ref[src];select_gear=[html_encode(G.display_name)]'>[G.display_name]</a></td>"
		entry += "</td></tr>"

		var/allowed
		if(G.allowed_roles)
			var/good_job = FALSE
			var/bad_job = FALSE
			for(var/datum/job/J in jobs)
				if(J.type in G.allowed_roles)
					good_job = TRUE
				else
					bad_job = TRUE
			allowed = good_job || !bad_job

		if(!hide_unavailable_gear || allowed || ticked)
			. += entry
	. += "</table>"
	. += "</td>"

	// Selected gear

	if(selected_gear)
		var/ticked = (selected_gear.display_name in pref.gear_list[pref.gear_slot])

		var/datum/gear_data/gd = new(selected_gear.path)
		for(var/datum/gear_tweak/gt in selected_gear.gear_tweaks)
			gt.tweak_gear_data(selected_tweaks["[gt]"], gd)
		var/obj/gear_virtual_item = new gd.path
		for(var/datum/gear_tweak/gt in selected_gear.gear_tweaks)
			gt.tweak_item(gear_virtual_item, selected_tweaks["[gt]"])
		var/icon/I = icon(gear_virtual_item.icon, gear_virtual_item.icon_state)
		if(gear_virtual_item.color)
			I.Blend(gear_virtual_item.color, ICON_MULTIPLY)
		I.Scale(I.Width() * 2, I.Height() * 2)

		. += "<td style='width: 80%;' class='block'>"

		. += "<table><tr>"
		. += "<td>[icon2html(I, user)]</td>"
		. += "<td style='vertical-align: top;'><b>[selected_gear.display_name]</b></td>"
		. += "</tr></table>"

		if(selected_gear.slot)
			. += "<b>Slot:</b> [slot_to_description(selected_gear.slot)]<br>"
		. += "<b>Loadout Points:</b> [selected_gear.cost]<br>"

		if(selected_gear.allowed_roles)
			. += "<b>Has roles restrictions!</b>"
			if(jobs.len)
				. += "<br>"
				. += "<i>"
				var/ind = 0
				for(var/datum/job/J in jobs)
					++ind
					if(ind > 1)
						. += ", "
					if(J.type in selected_gear.allowed_roles)
						. += "<font color='#55cc55'>[J.title]</font>"
					else
						. += "<font color='#cc5555'>[J.title]</font>"
				. += "</i>"
			. += "<br>"

		var/desc = selected_gear.get_description(selected_tweaks)
		if(desc)
			. += "<br>"
			. += desc
			. += "<br>"

		if(selected_gear.price)
			. += "<br>"
			. += "<b>Price: [selected_gear.price] opyx[selected_gear.price != 1 ? "es" : ""]</b>"
			. += "<br>"

		// Tweaks
		if(selected_gear.gear_tweaks.len)
			. += "<br><b>Options:</b><br>"
			for(var/datum/gear_tweak/tweak in selected_gear.gear_tweaks)
				. += " <a href='?src=\ref[src];tweak=\ref[tweak]'>[tweak.get_contents(selected_tweaks["[tweak]"])]</a>"
				. += "<br>"

		. += "<br>"

		if(flag_not_enough_opyxes)
			flag_not_enough_opyxes = FALSE
			. += "<span class='notice'>You have not enough opyxes!</span><br>"

		if(!selected_gear.price || user.client.donator_info.has_item(selected_gear.type))
			. += "<a [ticked ? "class='linkOn' " : ""]href='?src=\ref[src];toggle_gear=[html_encode(selected_gear.display_name)]'>[ticked ? "Drop" : "Take"]</a>"
		else
			var/trying_on = (pref.trying_on_gear == selected_gear.display_name)
			. += "<a class='gold' href='?src=\ref[src];buy_gear=\ref[selected_gear]'>Buy</a> <a [trying_on ? "class='linkOn' " : ""]href='?src=\ref[src];try_on=1'>Try On</a>"
		. += "</td>"

	. += "</tr></table>"
	. = jointext(.,null)

/datum/category_item/player_setup_item/loadout/proc/get_gear_metadata(datum/gear/G)
	var/list/gear_items = pref.gear_list[pref.gear_slot]
	. = gear_items[G.display_name]
	if(!.)
		. = list()

/datum/category_item/player_setup_item/loadout/proc/get_tweak_metadata(datum/gear/G, datum/gear_tweak/tweak)
	var/list/metadata = get_gear_metadata(G)
	. = metadata["[tweak]"]
	if(!.)
		. = tweak.get_default()
		metadata["[tweak]"] = .

/datum/category_item/player_setup_item/loadout/proc/set_tweak_metadata(datum/gear/G, datum/gear_tweak/tweak, new_metadata)
	var/list/metadata = get_gear_metadata(G)
	metadata["[tweak]"] = new_metadata

/datum/category_item/player_setup_item/loadout/OnTopic(href, href_list, mob/user)
	ASSERT(istype(user))
	if(href_list["select_gear"])
		selected_gear = gear_datums[href_list["select_gear"]]
		selected_tweaks = pref.gear_list[pref.gear_slot][selected_gear.display_name]
		if(!selected_tweaks)
			selected_tweaks = new
			for(var/datum/gear_tweak/tweak in selected_gear.gear_tweaks)
				selected_tweaks["[tweak]"] = tweak.get_default()
		pref.trying_on_gear = null
		pref.trying_on_tweaks.Cut()
		return TOPIC_REFRESH_UPDATE_PREVIEW
	if(href_list["toggle_gear"])
		var/datum/gear/TG = gear_datums[href_list["toggle_gear"]]
		if(TG.display_name in pref.gear_list[pref.gear_slot])
			pref.gear_list[pref.gear_slot] -= TG.display_name
		else
			var/total_cost = 0
			for(var/gear_name in pref.gear_list[pref.gear_slot])
				var/datum/gear/G = gear_datums[gear_name]
				if(istype(G)) total_cost += G.cost
			if((total_cost+TG.cost) <= config.max_gear_cost)
				pref.gear_list[pref.gear_slot][TG.display_name] = selected_tweaks.Copy()
		return TOPIC_REFRESH_UPDATE_PREVIEW
	if(href_list["tweak"])
		var/datum/gear_tweak/tweak = locate(href_list["tweak"])
		if(!tweak || !istype(selected_gear) || !(tweak in selected_gear.gear_tweaks))
			return TOPIC_NOACTION
		var/metadata = tweak.get_metadata(user, get_tweak_metadata(selected_gear, tweak))
		if(!metadata || !CanUseTopic(user))
			return TOPIC_NOACTION
		selected_tweaks["[tweak]"] = metadata
		var/ticked = (selected_gear.display_name in pref.gear_list[pref.gear_slot])
		if(ticked)
			set_tweak_metadata(selected_gear, tweak, metadata)
		var/trying_on = (selected_gear.display_name == pref.trying_on_gear)
		if(trying_on)
			pref.trying_on_tweaks["[tweak]"] = metadata
		return TOPIC_REFRESH_UPDATE_PREVIEW
	if(href_list["buy_gear"])
		var/datum/gear/G = locate(href_list["buy_gear"])
		ASSERT(G.price)
		ASSERT(!user.client.donator_info.has_item(G.type))
		var/comment = "Donation store purchase: [G.type]"
		var/transaction = SSdonations.create_transaction(user.client, -G.price, DONATIONS_TRANSACTION_TYPE_PURCHASE, comment)
		if(transaction)
			SSdonations.give_item(user.client, G.type, transaction)
			pref.trying_on_gear = null
			pref.trying_on_tweaks.Cut()
		else
			flag_not_enough_opyxes = TRUE
		return TOPIC_REFRESH_UPDATE_PREVIEW
	if(href_list["try_on"])
		if(!istype(selected_gear))
			return TOPIC_NOACTION
		if(selected_gear.display_name == pref.trying_on_gear)
			pref.trying_on_gear = null
			pref.trying_on_tweaks.Cut()
		else
			pref.trying_on_gear = selected_gear.display_name
			pref.trying_on_tweaks = selected_tweaks.Copy()
		return TOPIC_REFRESH_UPDATE_PREVIEW
	if(href_list["next_slot"])
		pref.gear_slot = pref.gear_slot+1
		if(pref.gear_slot > config.loadout_slots)
			pref.gear_slot = 1
		selected_gear = null
		selected_tweaks.Cut()
		pref.trying_on_gear = null
		pref.trying_on_tweaks.Cut()
		return TOPIC_REFRESH_UPDATE_PREVIEW
	if(href_list["prev_slot"])
		pref.gear_slot = pref.gear_slot-1
		if(pref.gear_slot < 1)
			pref.gear_slot = config.loadout_slots
		selected_gear = null
		selected_tweaks.Cut()
		pref.trying_on_gear = null
		pref.trying_on_tweaks.Cut()
		return TOPIC_REFRESH_UPDATE_PREVIEW
	if(href_list["select_category"])
		current_tab = href_list["select_category"]
		selected_gear = null
		selected_tweaks.Cut()
		pref.trying_on_gear = null
		pref.trying_on_tweaks.Cut()
		return TOPIC_REFRESH_UPDATE_PREVIEW
	if(href_list["clear_loadout"])
		var/list/gear = pref.gear_list[pref.gear_slot]
		gear.Cut()
		selected_gear = null
		selected_tweaks.Cut()
		pref.trying_on_gear = null
		pref.trying_on_tweaks.Cut()
		return TOPIC_REFRESH_UPDATE_PREVIEW
	if(href_list["toggle_hiding"])
		hide_unavailable_gear = !hide_unavailable_gear
		return TOPIC_REFRESH
	return ..()

/datum/category_item/player_setup_item/loadout/update_setup(savefile/preferences, savefile/character)
	if(preferences["version"] < 14)
		var/list/old_gear = character["gear"]
		if(istype(old_gear)) // During updates data isn't sanitized yet, we have to do manual checks
			if(!istype(pref.gear_list)) pref.gear_list = list()
			if(!pref.gear_list.len) pref.gear_list.len++
			pref.gear_list[1] = old_gear
		return 1

	if(preferences["version"] < 15)
		if(istype(pref.gear_list))
			// Checks if the key of the pref.gear_list is a list.
			// If not the key is replaced with the corresponding value.
			// This will convert the loadout slot data to a reasonable and (more importantly) compatible format.
			// I.e. list("1" = loadout_data1, "2" = loadout_data2, "3" = loadout_data3) becomes list(loadout_data1, loadout_data2, loadaout_data3)
			for(var/index = 1 to pref.gear_list.len)
				var/key = pref.gear_list[index]
				if(islist(key))
					continue
				var/value = pref.gear_list[key]
				pref.gear_list[index] = value
		return 1

/datum/gear
	var/display_name       //Name/index. Must be unique.
	var/description        //Description of this gear. If left blank will default to the description of the pathed item.
	var/atom/path          //Path to item.
	var/cost = 1           //Number of points used. Items in general cost 1 point, storage/armor/gloves/special use costs 2 points.
	var/price              //Price of item, opyxes
	var/slot               //Slot to equip to.
	var/list/allowed_roles //Roles that can spawn with this item.
	var/whitelisted        //Term to check the whitelist for..
	var/sort_category = "General"
	var/flags              //Special tweaks in new
	var/category
	var/list/gear_tweaks = list() //List of datums which will alter the item after it has been spawned.

/datum/gear/New()
	if(FLAGS_EQUALS(flags, GEAR_HAS_TYPE_SELECTION|GEAR_HAS_SUBTYPE_SELECTION))
		CRASH("May not have both type and subtype selection tweaks")
	if(!description)
		var/obj/O = path
		description = initial(O.desc)
	if(flags & GEAR_HAS_COLOR_SELECTION)
		gear_tweaks += gear_tweak_free_color_choice()
	if(flags & GEAR_HAS_TYPE_SELECTION)
		gear_tweaks += new /datum/gear_tweak/path/type(path)
	if(flags & GEAR_HAS_SUBTYPE_SELECTION)
		gear_tweaks += new /datum/gear_tweak/path/subtype(path)
		
/datum/gear/proc/get_description(metadata)
	. = description
	for(var/datum/gear_tweak/gt in gear_tweaks)
		. = gt.tweak_description(., metadata["[gt]"])

/datum/gear_data
	var/path
	var/location

/datum/gear_data/New(path, location)
	src.path = path
	src.location = location

/datum/gear/proc/spawn_item(location, metadata)
	var/datum/gear_data/gd = new(path, location)
	for(var/datum/gear_tweak/gt in gear_tweaks)
		gt.tweak_gear_data(metadata["[gt]"], gd)
	var/item = new gd.path(gd.location)
	for(var/datum/gear_tweak/gt in gear_tweaks)
		gt.tweak_item(item, metadata["[gt]"])
	return item

/datum/gear/proc/spawn_on_mob(mob/living/carbon/human/H, metadata)
	var/obj/item/item = spawn_item(H, metadata)

	if(H.equip_to_slot_if_possible(item, slot, del_on_fail = 1, force = 1))
		to_chat(H, "<span class='notice'>Equipping you with \the [item]!</span>")
		return TRUE

	return FALSE

/datum/gear/proc/spawn_as_accessory_on_mob(mob/living/carbon/human/H, metadata)
	var/obj/item/item = spawn_item(H, metadata)

	if(H.equip_to_slot_or_del(item, slot_tie))
		return TRUE

	return FALSE

/datum/gear/proc/spawn_in_storage_or_drop(mob/living/carbon/human/H, metadata)
	var/obj/item/item = spawn_item(H, metadata)

	var/atom/placed_in = H.equip_to_storage(item)
	if(placed_in)
		to_chat(H, "<span class='notice'>Placing \the [item] in your [placed_in.name]!</span>")
	else if(H.equip_to_appropriate_slot(item))
		to_chat(H, "<span class='notice'>Placing \the [item] in your inventory!</span>")
	else if(H.put_in_hands(item))
		to_chat(H, "<span class='notice'>Placing \the [item] in your hands!</span>")
	else
		to_chat(H, "<span class='danger'>Dropping \the [item] on the ground!</span>")
		item.forceMove(get_turf(H))
		item.add_fingerprint(H)
