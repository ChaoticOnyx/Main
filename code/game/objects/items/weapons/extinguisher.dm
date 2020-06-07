/obj/item/weapon/extinguisher
	name = "fire extinguisher"
	desc = "A traditional red fire extinguisher."
	icon = 'icons/obj/items.dmi'
	icon_state = "fire_extinguisher0"
	item_state = "fire_extinguisher"
	hitsound = 'sound/effects/fighting/smash.ogg'
	obj_flags = OBJ_FLAG_CONDUCTIBLE
	force = 15.0
	throwforce = 10
	mod_handy = 0.65
	mod_weight = 1.5
	mod_reach = 1.0
	w_class = ITEM_SIZE_NORMAL
	throw_speed = 2
	throw_range = 10
	matter = list(MATERIAL_STEEL = 90)
	attack_verb = list("slammed", "whacked", "bashed", "thunked", "battered", "bludgeoned", "thrashed")

	var/spray_particles = 3
	var/spray_amount = 120	//units of liquid per spray - 120 -> same as splashing them with a bucket per spray
	var/max_water = 2000
	var/last_use = 1.0
	var/safety = 1
	var/sprite_name = "fire_extinguisher"

/obj/item/weapon/extinguisher/mini
	name = "fire extinguisher"
	desc = "A light and compact fibreglass-framed model fire extinguisher."
	icon_state = "miniFE0"
	item_state = "miniFE"
	hitsound = null	//it is much lighter, after all.
	force = 6.5
	throwforce = 2
	mod_handy = 0.7
	mod_weight = 0.65
	mod_reach = 0.6
	w_class = ITEM_SIZE_SMALL
	spray_amount = 80
	max_water = 1000
	sprite_name = "miniFE"

/obj/item/weapon/extinguisher/borg
	name = "mounted extinguisher"
	desc = "A mounted fire extinguiser."
	icon_state = "fire_extinguisher_d0"
	sprite_name = "fire_extinguisher_d"
	force = 12.5
	mod_handy = 0.7
	mod_weight = 1.35
	max_water = 2500

/obj/item/weapon/extinguisher/borg/mini
	name = "mounted mini-extinguisher"
	desc = "A small-capacity fire extinguisher."
	force = 4.5
	mod_handy = 0.7
	mod_weight = 0.6
	mod_reach = 0.5
	max_water = 1000
	spray_amount = 80
	icon_state = "fire_extinguisher_dm0"
	sprite_name = "fire_extinguisher_dm"

/obj/item/weapon/extinguisher/New()
	create_reagents(max_water)
	reagents.add_reagent(/datum/reagent/water, max_water)
	..()

/obj/item/weapon/extinguisher/examine(mob/user)
	if(..(user, 0))
		to_chat(user, text("\icon[] [] contains [] units of water left!", src, src.name, src.reagents.total_volume))
	return

/obj/item/weapon/extinguisher/attack_self(mob/user as mob)
	safety = !safety
	src.icon_state = "[sprite_name][!safety]"
	src.desc = "The safety is [safety ? "on" : "off"]."
	to_chat(user, "The safety is [safety ? "on" : "off"].")
	return

/obj/item/weapon/extinguisher/attack(mob/living/M, mob/user)
	if(user.a_intent == I_HELP)
		if(src.safety || (world.time < src.last_use + 20)) // We still catch help intent to not randomly attack people
			return
		if(src.reagents.total_volume < 1)
			to_chat(user, "<span class='notice'>\The [src] is empty.</span>")
			return

		src.last_use = world.time
		reagents.splash(M, min(reagents.total_volume, spray_amount))

		user.visible_message("<span class='notice'>\The [user] sprays \the [M] with \the [src].</span>")
		playsound(src.loc, 'sound/effects/extinguish.ogg', 75, 1, -3)

		return 1 // No afterattack
	return ..()

/obj/item/weapon/extinguisher/proc/propel_object(obj/O, mob/user, movementdirection)
	if(O.anchored) return

	var/obj/structure/bed/chair/C
	if(istype(O, /obj/structure/bed/chair))
		C = O

	var/list/move_speed = list(1, 1, 1, 2, 2, 3)
	for(var/i in 1 to 6)
		if(C) C.propelled = (6-i)
		O.Move(get_step(user,movementdirection), movementdirection)
		sleep(move_speed[i])

	//additional movement
	for(var/i in 1 to 3)
		O.Move(get_step(user,movementdirection), movementdirection)
		sleep(3)

/obj/item/weapon/extinguisher/afterattack(atom/target, mob/user, flag)
	//TODO; Add support for reagents in water.

	if( istype(target, /obj/structure/reagent_dispensers/watertank) && flag)
		var/obj/o = target
		var/amount = o.reagents.trans_to_obj(src, 500)
		to_chat(user, "<span class='notice'>You fill [src] with [amount] units of the contents of [target].</span>")
		playsound(src.loc, 'sound/effects/refill.ogg', 50, 1, -6)
		return

	if (!safety)
		if (src.reagents.total_volume < 1)
			to_chat(usr, "<span class='notice'>\The [src] is empty.</span>")
			return

		if (world.time < src.last_use + 20)
			return

		src.last_use = world.time

		playsound(src.loc, 'sound/effects/extinguish.ogg', 75, 1, -3)

		var/direction = get_dir(src,target)

		if(user.buckled && isobj(user.buckled))
			spawn(0)
				propel_object(user.buckled, user, turn(direction,180))

		var/turf/T = get_turf(target)

		var/per_particle = min(spray_amount, reagents.total_volume)/spray_particles
		for(var/a = 1 to spray_particles)
			spawn(0)
				if(!src || !reagents.total_volume) return

				var/obj/effect/effect/water/W = new /obj/effect/effect/water(get_turf(src))
				W.create_reagents(per_particle)
				reagents.trans_to_obj(W, per_particle)
				W.set_color()
				W.set_up(T)

		if((istype(usr.loc, /turf/space)) || (usr.lastarea.has_gravity == 0))
			user.inertia_dir = get_dir(target, user)
			step(user, user.inertia_dir)
	else
		return ..()
	return
