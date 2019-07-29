//Skrell space gear. Sleek like a wetsuit.
/obj/item/clothing/head/helmet/space/skrell
	name = "Skrellian helmet"
	desc = "Smoothly contoured and polished to a shine. Still looks like a fishbowl."
	armor = list(melee = 20, bullet = 20, laser = 50,energy = 50, bomb = 50, bio = 100, rad = 100)
	max_heat_protection_temperature = SPACE_SUIT_MAX_HEAT_PROTECTION_TEMPERATURE
	species_restricted = list(SPECIES_SKRELL,SPECIES_HUMAN)

/obj/item/clothing/head/helmet/space/skrell/white
	icon_state = "skrell_helmet_white"

/obj/item/clothing/head/helmet/space/skrell/black
	icon_state = "skrell_helmet_black"

/obj/item/clothing/suit/space/skrell
	name = "Skrellian voidsuit"
	desc = "Seems like a wetsuit with reinforced plating seamlessly attached to it. Very chic."
	armor = list(melee = 20, bullet = 20, laser = 50,energy = 50, bomb = 50, bio = 100, rad = 100)
	allowed = list(/obj/item/device/flashlight,/obj/item/weapon/tank,/obj/item/weapon/storage/ore,/obj/item/device/t_scanner,/obj/item/weapon/pickaxe, /obj/item/weapon/rcd)
	heat_protection = UPPER_TORSO|LOWER_TORSO|LEGS|FEET|ARMS|HANDS
	max_heat_protection_temperature = SPACE_SUIT_MAX_HEAT_PROTECTION_TEMPERATURE
	species_restricted = list(SPECIES_SKRELL,SPECIES_HUMAN)

/obj/item/clothing/suit/space/skrell/white
	icon_state = "skrell_suit_white"

/obj/item/clothing/suit/space/skrell/black
	icon_state = "skrell_suit_black"

// Vox space gear (vaccuum suit, low pressure armour)
// Can't be equipped by any other species due to bone structure and vox cybernetics.
/obj/item/clothing/suit/space/vox
	w_class = ITEM_SIZE_NORMAL
	allowed = list(/obj/item/weapon/gun,/obj/item/ammo_magazine,/obj/item/ammo_casing,/obj/item/weapon/melee/baton,/obj/item/weapon/melee/energy/sword,/obj/item/weapon/handcuffs,/obj/item/weapon/tank)
	armor = list(melee = 60, bullet = 50, laser = 40,energy = 15, bomb = 30, bio = 30, rad = 30)
	siemens_coefficient = 0.6
	heat_protection = UPPER_TORSO|LOWER_TORSO|LEGS|FEET|ARMS|HANDS
	max_heat_protection_temperature = SPACE_SUIT_MAX_HEAT_PROTECTION_TEMPERATURE
	species_restricted = list(SPECIES_VOX)

/obj/item/clothing/suit/space/vox/New()
	..()
	slowdown_per_slot[slot_wear_suit] = 2

/obj/item/clothing/head/helmet/space/vox
	armor = list(melee = 60, bullet = 50, laser = 40, energy = 15, bomb = 30, bio = 30, rad = 30)
	siemens_coefficient = 0.6
	item_flags = ITEM_FLAG_STOPPRESSUREDAMAGE
	flags_inv = 0
	species_restricted = list(SPECIES_VOX)

/obj/item/clothing/head/helmet/space/vox/pressure
	name = "alien helmet"
	icon_state = "vox-pressure"
	desc = "Hey, wasn't this a prop in \'The Abyss\'?"
	armor = list(melee = 60, bullet = 50, laser = 40, energy = 30, bomb = 90, bio = 30, rad = 100)

/obj/item/clothing/suit/space/vox/pressure
	name = "alien pressure suit"
	icon_state = "vox-pressure"
	desc = "A huge, armoured, pressurized suit, designed for distinctly nonhuman proportions."
	action_button_name = "Enable Tool"
	armor = list(melee = 60, bullet = 50, laser = 40, energy = 30, bomb = 90, bio = 30, rad = 100)
	var/tool_delay = 120 SECONDS
	var/tool_use = 0

/obj/item/clothing/suit/space/vox/pressure/attack_self(mob/user)
	var/mob/living/carbon/human/H = user
	if(!istype(H))
		return
	if(!istype(H.head, /obj/item/clothing/head/helmet/space/vox/pressure))
		return
	if(!(world.time > (tool_use + tool_delay)))
		return
	tool_use = world.time
	tool(user)

/obj/item/clothing/suit/space/vox/pressure/proc/tool(mob/user)
	var/mob/living/carbon/human/H = user
	if(H.l_hand && H.r_hand)
		to_chat(H, "<span class='danger'>Your hands are full.</span>")
		return

	var/obj/item/weapon/W = new /obj/item/weapon/alien_device(H)
	H.put_in_hands(W)
////////////RCD


/obj/item/weapon/alien_device
	name = "Strange device"
	var/charge = 3
	var/mob/living/creator //This is just like ninja swords, needed to make sure dumb shit that removes the sword doesn't make it stay around.
	icon = 'icons/obj/gun.dmi'
	icon_state = "voxrcd"
	desc = "A small device filled with biorobots."
	var/mode = 1 //We have 3 types of mode, 1 - deconstruct, 2 - construct, 3 - construct doors

/obj/item/weapon/alien_device/attack_self(mob/user)
	playsound(src, 'sound/voice/alien_roar_larva2.ogg', 30, 1)
	switch(mode)
		if(1)
			mode = 2
			to_chat(user, "<span class='notice'>Changed mode to construct</span>")
		if(2)
			mode = 3
			to_chat(user, "<span class='notice'>Changed mode to construct doors</span>")
		if(3)
			mode = 1
			to_chat(user, "<span class='notice'>Changed mode to deconstruct</span>")

/obj/item/weapon/alien_device/afterattack(var/atom/A, var/mob/user, var/proximity)
	if(!proximity)
		return
	if(charge == 0)
		visible_message("<span class='warning'>With a slight hiss, the [src] dissolves.</span>",
		"<span class='notice'>We turn off our device.</span>",
		"<span class='italics'>You hear a faint hiss.</span>")
		playsound(src, 'sound/effects/flare.ogg', 30, 1)
		spawn(1)
			if(src)
				qdel(src)
		return

	switch(mode)
		if(1)
			new /obj/effect/acid(get_turf(A), A)
			charge--
		if(2)
			if(!istype(A, /turf/simulated/floor))
				var/turf/T = A
				T.ChangeTurf(/turf/simulated/floor/misc/diona)
				charge--
			else
				if(istype(A.loc, /turf/simulated/wall) && istype(A.loc, /obj/machinery/door))
					return
				var/turf/T = A
				new /obj/structure/alien/resin/wall(get_turf(T), T)
				charge--
		if(3)
			if(istype(A, /turf/simulated/floor))
				if(istype(A.loc, /turf/simulated/wall) && istype(A.loc, /obj/machinery/door))
					return
				new /obj/machinery/door/unpowered/simple/resin(get_turf(A), A)
				charge--
	playsound(src, 'sound/effects/flare.ogg', 30, 1)
	if(charge == 0)
		visible_message("<span class='warning'>With a slight hiss, the [src] dissolves.</span>",
		"<span class='notice'>We turn off our device.</span>",
		"<span class='italics'>You hear a faint hiss.</span>")
		playsound(src, 'sound/effects/flare.ogg', 30, 1)
		spawn(1)
			if(src)
				qdel(src)
		return

/obj/item/weapon/alien_device/dropped(mob/user)
	visible_message("<span class='warning'>With a slight hiss, the [src] dissolves.</span>",
	"<span class='notice'>We turn off our device.</span>",
	"<span class='italics'>You hear a faint hiss.</span>")
	playsound(src, 'sound/effects/flare.ogg', 30, 1)
	spawn(1)
		if(src)
			qdel(src)
//RCD/////////////////////


/obj/item/clothing/head/helmet/space/vox/carapace
	name = "alien visor"
	icon_state = "vox-carapace"
	desc = "A glowing visor, perhaps stolen from a depressed Cylon."

/obj/item/clothing/suit/space/vox/carapace
	name = "alien carapace armour"
	icon_state = "vox-carapace"
	desc = "An armoured, segmented carapace with glowing purple lights. It looks pretty run-down."
	action_button_name = "Enable Protection"
	armor = list(melee = 60, bullet = 50, laser = 40, energy = 30, bomb = 40, bio = 30, rad = 30)
	var/protection = FALSE

/obj/item/clothing/suit/space/vox/carapace/attack_self(mob/user)
	var/mob/living/carbon/human/H = user
	if(!istype(H))
		return
	if(!istype(H.head, /obj/item/clothing/head/helmet/space/vox/carapace))
		return
	protection(user)

/obj/item/clothing/suit/space/vox/carapace/proc/protection(mob/user)
	var/mob/living/carbon/human/H = user
	if(protection)
		to_chat(H, "<span class='notice'>We deactivate the protection mode.</span>")
		armor = list(melee = 60, bullet = 50, laser = 40, energy = 30, bomb = 60, bio = 30, rad = 30)
		siemens_coefficient = 0.6
		if(istype(H.head, /obj/item/clothing/head/helmet/space/vox/carapace))
			H.head.armor = list(melee = 60, bullet = 50, laser = 40, energy = 40, bomb = 60, bio = 30, rad = 30)
			H.head.siemens_coefficient = 0.6
			H.head.icon_state = "vox-carapace"
		slowdown_per_slot[slot_wear_suit] = 3
		icon_state = "vox-carapace"
	else
		to_chat(H, "<span class='notice'>We activate the protection mode.</span>")
		armor = list(melee = 80, bullet = 80, laser = 80, energy = 80, bomb = 60, bio = 60, rad = 60)
		siemens_coefficient = 2
		if(istype(H.head, /obj/item/clothing/head/helmet/space/vox/carapace))
			H.head.armor = list(melee = 80, bullet = 80, laser = 80, energy = 80, bomb = 60, bio = 60, rad = 60)
			H.head.siemens_coefficient = 2
			H.head.icon_state = "vox-carapace-active"
		slowdown_per_slot[slot_wear_suit] = 20
		icon_state = "vox-carapace-active"
	protection = !protection

/obj/item/clothing/head/helmet/space/vox/stealth
	name = "alien stealth helmet"
	icon_state = "vox-stealth"
	desc = "A smoothly contoured, matte-black alien helmet."
	siemens_coefficient = 0
	armor = list(melee = 25, bullet = 40, laser = 65, energy = 40, bomb = 20, bio = 30, rad = 30)

/obj/item/clothing/suit/space/vox/stealth
	name = "alien stealth suit"
	icon_state = "vox-stealth"
	desc = "A sleek black suit. It seems to have a tail, and is very light."
	action_button_name = "Enable Cloak"
	siemens_coefficient = 0
	armor = list(melee = 25, bullet = 30, laser = 65, energy = 30, bomb = 20, bio = 30, rad = 30)
	var/cloak = FALSE

/obj/item/clothing/suit/space/vox/stealth/New()
	..()
	slowdown_per_slot[slot_wear_suit] = 0

/obj/item/clothing/suit/space/vox/stealth/attack_self(mob/user)
	var/mob/living/carbon/human/H = user
	if(!istype(H))
		return
	if(!istype(H.head, /obj/item/clothing/head/helmet/space/vox/stealth))
		return
	cloak(user)

/obj/item/clothing/suit/space/vox/stealth/proc/cloak(mob/user)
	var/mob/living/carbon/human/H = user

	if(cloak)
		cloak = FALSE
		return 1

	to_chat(H, "<span class='notice'>We vanish from sight, and will remain hidden, so long as we move carefully.</span>")
	cloak = TRUE
	animate(H,alpha = 255, alpha = 20, time = 10)

	var/remain_cloaked = TRUE
	while(remain_cloaked) //This loop will keep going until the player uncloaks.
		sleep(1 SECOND) // Sleep at the start so that if something invalidates a cloak, it will drop immediately after the check and not in one second.
		if(!cloak)
			remain_cloaked = 0
		if(H.stat) // Dead or unconscious lings can't stay cloaked.
			remain_cloaked = 0
		if(H.stat) // Dead or unconscious lings can't stay cloaked.
			remain_cloaked = 0
		if(!istype(H.head, /obj/item/clothing/head/helmet/space/vox/stealth))
			remain_cloaked = 0
	H.invisibility = initial(H.invisibility)
	H.visible_message("<span class='warning'>[H] suddenly fades in, seemingly from nowhere!</span>",
	"<span class='notice'>We revert our camouflage, revealing ourselves.</span>")
	cloak = FALSE

	animate(H,alpha = 20, alpha = 255, time = 10)

/obj/item/clothing/head/helmet/space/vox/medic
	name = "alien goggled helmet"
	icon_state = "vox-medic"
	desc = "An alien helmet with enormous goggled lenses."
	armor = list(melee = 60, bullet = 50, laser = 40,energy = 15, bomb = 30, bio = 100, rad = 100)
	siemens_coefficient = 0.3

/obj/item/clothing/suit/space/vox/medic
	name = "alien armour"
	icon_state = "vox-medic"
	desc = "An almost organic looking nonhuman pressure suit."
	siemens_coefficient = 0.3
	armor = list(melee = 60, bullet = 50, laser = 40,energy = 15, bomb = 30, bio = 100, rad = 100)
	action_button_name = "Enable Nanobots"
	var/nanobots = FALSE

/obj/item/clothing/suit/space/vox/medic/New()
	..()
	slowdown_per_slot[slot_wear_suit] = 1

/obj/item/clothing/suit/space/vox/medic/attack_self(mob/user)
	var/mob/living/carbon/human/H = user
	if(!istype(H))
		return
	if(!istype(H.head, /obj/item/clothing/head/helmet/space/vox/medic))
		return
	nanobots(user)

/obj/item/clothing/suit/space/vox/medic/proc/nanobots(mob/user)
	var/mob/living/carbon/human/H = user

	if(nanobots)
		nanobots = FALSE
		return 1

	to_chat(H, "<span class='notice'>Nanobots activated.</span>")
	nanobots = TRUE
	animate(src,alpha = 255, alpha = 10, time = 10)
	icon_state = "vox-medic-active"
	var/remain_nanobots = TRUE
	slowdown_per_slot[slot_wear_suit] = 100
	while(remain_nanobots) //This loop will keep going until the player uncloaks.
		anim(get_turf(H), H, 'icons/effects/effects.dmi', "electricity",null,20,null)
		sleep(1 SECOND) // Sleep at the start so that if something invalidates a cloak, it will drop immediately after the check and not in one second.
		if(!nanobots)
			remain_nanobots = 0
		if(H.stat) // Dead or unconscious lings can't stay cloaked.
			remain_nanobots = 0
		if(H.stat) // Dead or unconscious lings can't stay cloaked.
			remain_nanobots = 0
		if(!istype(H.head, /obj/item/clothing/head/helmet/space/vox/medic))
			remain_nanobots = 0
		spawn(0.5 SECONDS)
			for(var/mob/living/carbon/human/vox/V in range(H, 2))
				for(var/obj/item/organ/regen_organ in V.organs)
					regen_organ.damage = max(regen_organ.damage - 5, 0)
				if(V.getBruteLoss())
					V.adjustBruteLoss(-10 * config.organ_regeneration_multiplier)	//Heal brute better than other ouchies.
				if(V.getFireLoss())
					V.adjustFireLoss(-10 * config.organ_regeneration_multiplier)
				if(V.getToxLoss())
					V.adjustToxLoss(-10 * config.organ_regeneration_multiplier)
	to_chat(H, "<span class='notice'>Nanobots deactivated.</span>")
	nanobots = FALSE
	icon_state = "vox-medic"
	slowdown_per_slot[slot_wear_suit] = 1

/obj/item/clothing/suit/space/vox/medic/Initialize()
	. = ..()
	START_PROCESSING(SSobj, src)

/obj/item/clothing/suit/space/vox/medic/Destroy()
	STOP_PROCESSING(SSobj, src)
	. = ..()

/obj/item/clothing/suit/space/vox/medic/Process()
	for(var/mob/living/carbon/human/vox/V in range(src.loc, 1))
		if(V.getBruteLoss())
			V.adjustBruteLoss(-2 * config.organ_regeneration_multiplier)	//Heal brute better than other ouchies.
		if(V.getFireLoss())
			V.adjustFireLoss(-2 * config.organ_regeneration_multiplier)
		if(V.getToxLoss())
			V.adjustToxLoss(-2 * config.organ_regeneration_multiplier)

/obj/item/weapon/storage/belt/vox
	name = "Vox belt"
	desc = "High-tech belt with mounts for any objects."
	icon_state = "voxbelt"
	storage_slots = 9
	item_state = "voxbelt"
	can_hold = list(
		/obj/item/weapon/crowbar,
		/obj/item/weapon/screwdriver,
		/obj/item/weapon/weldingtool,
		/obj/item/weapon/wirecutters,
		/obj/item/weapon/wrench,
		/obj/item/device/multitool,
		/obj/item/device/flashlight,
		/obj/item/stack/cable_coil,
		/obj/item/device/t_scanner,
		/obj/item/device/analyzer,
		/obj/item/taperoll,
		/obj/item/device/robotanalyzer,
		/obj/item/weapon/material/minihoe,
		/obj/item/weapon/material/hatchet,
		/obj/item/device/analyzer/plant_analyzer,
		/obj/item/taperoll,
		/obj/item/weapon/extinguisher/mini,
		/obj/item/weapon/marshalling_wand,
		/obj/item/weapon/combotool/advtool,
		/obj/item/weapon/grenade,
		/obj/item/weapon/handcuffs,
		/obj/item/device/flash,
		/obj/item/clothing/glasses,
		/obj/item/ammo_casing/shotgun,
		/obj/item/ammo_magazine,
		/obj/item/weapon/melee/baton,
		/obj/item/device/pda,
		/obj/item/device/radio/headset,
		/obj/item/weapon/melee,
		/obj/item/weapon/shield/energy,
		/obj/item/weapon/pinpointer,
		/obj/item/weapon/plastique,
		/obj/item/weapon/gun/projectile/pistol,
		/obj/item/weapon/gun/energy/crossbow,
		/obj/item/ammo_casing/a145,
		/obj/item/device/radio/uplink,
		/obj/item/weapon/card/emag,
		/obj/item/device/multitool/hacktool,
		/obj/item/stack/telecrystal,
		/obj/item/weapon/reagent_containers/spray,
		/obj/item/weapon/soap,
		/obj/item/weapon/storage/bag/trash,
		/obj/item/weapon/resonator,
		/obj/item/weapon/oreportal,
		/obj/item/weapon/oremagnet,
		/obj/item/weapon/ore_radar,
		/obj/item/weapon/magnetic_ammo,
		/obj/item/weapon/gun/energy/taser,
		/obj/item/weapon/gun/energy/stunrevolver,
		/obj/item/clothing/glasses,
		/obj/item/device/healthanalyzer,
		/obj/item/weapon/reagent_containers
		)


/obj/item/clothing/under/vox
	has_sensor = 0
	species_restricted = list(SPECIES_VOX)

/obj/item/clothing/under/vox/vox_casual
	name = "alien clothing"
	desc = "This doesn't look very comfortable."
	icon_state = "vox-casual-1"
	item_state = "vox-casual-1"
	body_parts_covered = LEGS

/obj/item/clothing/under/vox/vox_robes
	name = "alien robes"
	desc = "Weird and flowing!"
	icon_state = "vox-casual-2"
	item_state = "vox-casual-2"

/obj/item/clothing/gloves/vox
	desc = "These bizarre gauntlets seem to be fitted for... bird claws?"
	name = "insulated gauntlets"
	icon_state = "gloves-vox"
	item_state = "gloves-vox"
	siemens_coefficient = 0
	permeability_coefficient = 0.05
	species_restricted = list(SPECIES_VOX)

/obj/item/clothing/shoes/magboots/vox

	desc = "A pair of heavy, jagged armoured foot pieces, seemingly suitable for a velociraptor."
	name = "vox magclaws"
	item_state = "boots-vox"
	icon_state = "boots-vox"
	species_restricted = list(SPECIES_VOX)

	action_button_name = "Toggle the magclaws"

/obj/item/clothing/shoes/magboots/vox/attack_self(mob/user)
	if(src.magpulse)
		item_flags &= ~ITEM_FLAG_NOSLIP
		magpulse = 0
		canremove = 1
		to_chat(user, "You relax your deathgrip on the flooring.")
	else
		//make sure these can only be used when equipped.
		if(!ishuman(user))
			return
		var/mob/living/carbon/human/H = user
		if (H.shoes != src)
			to_chat(user, "You will have to put on the [src] before you can do that.")
			return

		item_flags |= ITEM_FLAG_NOSLIP
		magpulse = 1
		canremove = 0	//kinda hard to take off magclaws when you are gripping them tightly.
		to_chat(user, "You dig your claws deeply into the flooring, bracing yourself.")
		to_chat(user, "It would be hard to take off the [src] without relaxing your grip first.")
	user.update_action_buttons()

//In case they somehow come off while enabled.
/obj/item/clothing/shoes/magboots/vox/dropped(mob/user as mob)
	..()
	if(src.magpulse)
		user.visible_message("The [src] go limp as they are removed from [usr]'s feet.", "The [src] go limp as they are removed from your feet.")
		item_flags &= ~ITEM_FLAG_NOSLIP
		magpulse = 0
		canremove = 1

/obj/item/clothing/shoes/magboots/vox/examine(mob/user)
	. = ..(user)
	if (magpulse)
		to_chat(user, "It would be hard to take these off without relaxing your grip first.")//theoretically this message should only be seen by the wearer when the claws are equipped.


/obj/item/clothing/gloves/nabber
	desc = "These insulated gloves have only three fingers."
	name = "three-fingered insulated gloves"
	icon_state = "white-glove-nabber"
	color = COLOR_YELLOW
	siemens_coefficient = 0
	permeability_coefficient = 0.05
	species_restricted = list(SPECIES_NABBER)
