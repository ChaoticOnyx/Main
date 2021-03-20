/obj/item/modular_computer/console
	name = "console"
	desc = "A stationary computer."
	icon = 'icons/obj/modular_console.dmi'
	icon_state = "console"
	icon_state_unpowered = "console"
	icon_state_screensaver = "standby"
	icon_state_menu = "menu"
	hardware_flag = PROGRAM_CONSOLE
	anchored = TRUE
	density = 1
	base_idle_power_usage = 100
	base_active_power_usage = 500
	max_hardware_size = 3
	steel_sheet_cost = 20
	light_strength = 4
	max_damage = 300
	broken_damage = 150
	atom_flags = ATOM_FLAG_CLIMBABLE
	beepsounds = "device_trr"

/obj/item/modular_computer/console/CouldUseTopic(mob/user)
	..()
	if(istype(user, /mob/living/carbon))
		playsound(src, 'sound/effects/using/console/press7.ogg', 50, 1)