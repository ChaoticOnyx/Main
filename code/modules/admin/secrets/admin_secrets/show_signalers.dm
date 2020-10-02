/datum/admin_secret_item/admin_secret/show_signalers
	name = "Show Last Signalers"

/datum/admin_secret_item/admin_secret/show_signalers/name()
	return "Show Last [length(GLOB.lastsignalers)] Signaler\s"

/datum/admin_secret_item/admin_secret/show_signalers/execute(mob/user)
	. = ..()
	if(!.)
		return

	var/dat = "<meta charset=\"utf-8\"><B>Showing last [length(GLOB.lastsignalers)] signalers.</B><HR>"
	for(var/sig in GLOB.lastsignalers)
		dat += "[sig]<BR>"
	user << browse(dat, "window=lastsignalers;size=800x500")
