/obj/item/weapon/storage/bible
	name = "bible"
	desc = "Apply to head repeatedly."
	icon_state ="bible"
	throw_speed = 1
	throw_range = 5
	w_class = ITEM_SIZE_NORMAL
	max_w_class = ITEM_SIZE_SMALL
	max_storage_space = 4
	var/mob/affecting = null
	var/deity_name = "Christ"

/obj/item/weapon/storage/bible/booze
	name = "bible"
	desc = "To be applied to the head repeatedly."
	icon_state ="bible"

	startswith = list(
		/obj/item/weapon/reagent_containers/food/drinks/bottle/small/beer,
		/obj/item/weapon/spacecash/bundle/c50,
		/obj/item/weapon/spacecash/bundle/c50,
		)

/obj/item/weapon/storage/bible/afterattack(atom/target, mob/user as mob, proximity)
	if(!proximity)
		return
	if(user.mind && (user.mind.assigned_role == "Chaplain"))
		if (istype(target, /mob/living/carbon/human))
			var/mob/living/carbon/human/human_target = target
			if(prob(10))
				human_target.adjustBrainLoss(5)
				human_target << "<span class='warning'>You feel dumber.</span>"
				for(var/mob/O in viewers(human_target, null))
					O.show_message(text("<span class='warning'><B>[] beats [] over the head with []!</B></span>", user, human_target, src), 1)
			for(var/mob/O in viewers(human_target, null))
				O.show_message(text("<span class='warning'><B>[] heals [] with the power of [src.deity_name]!</B></span>", user, human_target), 1)
				human_target << "<span class='warning'>May the power of [src.deity_name] compel you to be healed!</span>"
				playsound(src.loc, "punch", 25, 1, -1)
			human_target.heal_overall_damage(20,20)
		else
			if(target.reagents && target.reagents.has_reagent(/datum/reagent/water)) //blesses all the water in the holder
				to_chat(user, "<span class='notice'>You bless \the [target].</span>") // I wish it was this easy in nethack
				var/water2holy = target.reagents.get_reagent_amount(/datum/reagent/water)
				target.reagents.del_reagent(/datum/reagent/water)
				target.reagents.add_reagent(/datum/reagent/water/holywater,water2holy)

/obj/item/weapon/storage/bible/attackby(obj/item/weapon/W as obj, mob/user as mob)
	if (src.use_sound)
		playsound(src.loc, src.use_sound, 50, 1, -5)
	return ..()