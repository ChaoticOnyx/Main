/obj/item/weapon/pen/crayon/red
	icon_state = "crayonred"
	colour = "#da0000"
	shadeColour = "#810c0c"
	colourName = "red"
	color_description = "red crayon"

/obj/item/weapon/pen/crayon/orange
	icon_state = "crayonorange"
	colour = "#ff9300"
	shadeColour = "#a55403"
	colourName = "orange"
	color_description = "orange crayon"

/obj/item/weapon/pen/crayon/yellow
	icon_state = "crayonyellow"
	colour = "#fff200"
	shadeColour = "#886422"
	colourName = "yellow"
	color_description = "yellow crayon"

/obj/item/weapon/pen/crayon/green
	icon_state = "crayongreen"
	colour = "#a8e61d"
	shadeColour = "#61840f"
	colourName = "green"
	color_description = "green crayon"

/obj/item/weapon/pen/crayon/blue
	icon_state = "crayonblue"
	colour = "#00b7ef"
	shadeColour = "#0082a8"
	colourName = "blue"
	color_description = "blue crayon"

/obj/item/weapon/pen/crayon/purple
	icon_state = "crayonpurple"
	colour = "#da00ff"
	shadeColour = "#810cff"
	colourName = "purple"
	color_description = "purple crayon"

/obj/item/weapon/pen/crayon/chalk
	icon_state = "chalk"
	colour = "#ffffff"
	shadeColour = "#f2f2f2"
	colourName = "white"
	color_description = "white chalk"

	New()
		..()
		name = "white chalk"
		desc = "A piece of regular white chalk. What else did you expect to see?"

/obj/item/weapon/pen/crayon/random/Initialize()
	..()
	var/crayon_type = pick(subtypesof(/obj/item/weapon/pen/crayon) - /obj/item/weapon/pen/crayon/random)
	new crayon_type(loc)
	return INITIALIZE_HINT_QDEL

/obj/item/weapon/pen/crayon/mime
	icon_state = "crayonmime"
	desc = "A very sad-looking crayon."
	colour = "#ffffff"
	shadeColour = "#000000"
	colourName = "mime"
	color_description = "white crayon"
	uses = 0

/obj/item/weapon/pen/crayon/mime/attack_self(mob/living/user as mob) //inversion
	if(colour != "#ffffff" && shadeColour != "#000000")
		colour = "#ffffff"
		shadeColour = "#000000"
		to_chat(user, "You will now draw in white and black with this crayon.")
	else
		colour = "#000000"
		shadeColour = "#ffffff"
		to_chat(user, "You will now draw in black and white with this crayon.")
	return

/obj/item/weapon/pen/crayon/rainbow
	icon_state = "crayonrainbow"
	colour = "#fff000"
	shadeColour = "#000fff"
	colourName = "rainbow"
	color_description = "rainbow crayon"
	uses = 0

/obj/item/weapon/pen/crayon/rainbow/attack_self(mob/living/user as mob)
	colour = input(user, "Please select the main colour.", "Crayon colour") as color
	shadeColour = input(user, "Please select the shade colour.", "Crayon colour") as color
	update_popup(user)
	return

/obj/item/weapon/pen/crayon
	var/datum/browser/popup
	var/turf/last_target

/obj/item/weapon/pen/crayon/proc/update_popup(mob/user)
	if(!user)
		user = usr
	var/dat = "Write russian: "
	var/list/rus_alphabet = list("А","Б","В","Г","Д","Е","Ё","Ж","З","И","Й",
							"К","Л","М","Н","О","П","Р","С","Т","У","Ф",
							"Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"
							)
	for(var/letter_num = 1, letter_num <= rus_alphabet.len, letter_num++)
		dat += "<a href='?\ref[src];drawtype=rus[letter_num]'>[rus_alphabet[letter_num]]</a> "

	dat += "<hr>Write english: "
	for(var/letter_num in text2ascii("a") to text2ascii("z"))
		dat += "<a href='?\ref[src];drawtype=[ascii2text(letter_num)]'>[uppertext(ascii2text(letter_num))]</a> "

	dat += "<hr><a href='?\ref[src];drawtype=rune'>Draw rune</a>"

	dat += "<hr>Show direction: "
	var/list/arrows = list("left" = "&larr;", "right" = "&rarr;", "up" = "&uarr;", "down" = "&darr;")
	for(var/drawtype in arrows)
		dat += "<a href='?\ref[src];drawtype=[drawtype]'>[arrows[drawtype]]</a> "

	dat += "<hr>Draw graffiti: "
	for(var/drawtype in list("amyjon","face","matt","revolution","engie","guy","end","dwarf","uboa","xyu","stayhigh","fuckxenos","help","cheesy","ghost","godleft"))
		dat += "<a href='?\ref[src];drawtype=[drawtype]'><img src=\"[get_preview(usr, drawtype)]\" style=\"width: 32px; height: 32px;\"></a> "

	if(!popup || popup.user != user)
		popup = new /datum/browser(user, "crayon", "Choose drawing", 960, 230)
		popup.set_content(dat)
	else
		popup.set_content(dat)
		popup.update()

/obj/item/weapon/pen/crayon/proc/get_preview(mob/receiver, type = "rune1")
	var/icon/mainOverlay = new /icon('icons/effects/crayondecal.dmi',"[type]",2.1)
	var/icon/shadeOverlay = new /icon('icons/effects/crayondecal.dmi',"[type]s",2.1)
	mainOverlay.Blend(colour,ICON_ADD)
	shadeOverlay.Blend(shadeColour,ICON_ADD)
	mainOverlay.Blend(shadeOverlay, ICON_OVERLAY)

	if(!receiver)
		return mainOverlay
	else
		var/resourse_name = "[type]-crayon-[copytext(colour,2)]-[copytext(shadeColour,2)].png"
		receiver << browse(mainOverlay, "file=[resourse_name];display=0")
		return resourse_name

/obj/item/weapon/pen/crayon/afterattack(atom/target, mob/user as mob, proximity)
	if(!proximity) return
	if(istype(target,/turf/simulated/floor) || istype(target,/turf/simulated/wall))
		last_target = target
		update_popup(usr)
		popup.open()
	return

/obj/item/weapon/pen/crayon/Topic(href, href_list, state = GLOB.physical_state)
	. = ..()
	if(!last_target.Adjacent(usr))
		to_chat(usr, SPAN_WARNING("You moved too far away!"))
		popup.close()
		return
	if(usr.incapacitated()) // Clown can draw dicks if conscious...
		return
	var/drawtype = href_list["drawtype"] ? href_list["drawtype"] : "rune"
	popup.close()
	if(instant || do_after(usr, 50))
		if(!last_target)
			last_target = get_turf(usr)
		new /obj/effect/decal/cleanable/crayon(last_target,colour,shadeColour,drawtype)
		to_chat(usr, "You finish drawing.")
		last_target.add_fingerprint(usr)
		reduce_uses()

/obj/item/weapon/pen/crayon/attack(mob/living/carbon/M as mob, mob/user as mob)
	if(istype(M) && M == user)
		to_chat(M, "You take a bite of the [src.name] and swallow it.")
		M.nutrition += 1
		M.reagents.add_reagent(/datum/reagent/crayon_dust,min(5,uses)/3)
		reduce_uses(5)
	else if(istype(M,/mob/living/carbon/human) && M.lying)
		to_chat(user, "You start outlining [M.name].")
		if(do_after(user, 50))
			to_chat(user, "You finish outlining [M.name].")
			new /obj/effect/decal/cleanable/crayon(M.loc,colour,shadeColour,"body outline")
			reduce_uses()
	else
		..()

/obj/item/weapon/pen/crayon/dropped()
	. = ..()
	if(popup)
		popup.close() // ...but he can't, if you disable his hands

/obj/item/weapon/pen/crayon/proc/reduce_uses(amount = 1)
	if(uses)
		uses -= amount
		if(uses <= 0)
			to_chat(usr, SPAN_WARNING("You used up your [src.name]!"))
			qdel(src)
