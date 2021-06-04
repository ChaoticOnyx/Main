/*******************************
* Stealth and Camouflage Items *
*******************************/
/datum/uplink_item/item/stealth_items
	category = /datum/uplink_category/stealth_items

/datum/uplink_item/item/stealth_items/balaclava
	name = "Balaclava"
	item_cost = 1
	path = /obj/item/clothing/mask/balaclava

/datum/uplink_item/item/stealth_items/syndigaloshes
	name = "No-Slip Shoes"
	item_cost = 2
	path = /obj/item/clothing/shoes/syndigaloshes

/datum/uplink_item/item/stealth_items/spy
	name = "Bug Kit"
	item_cost = 2
	path = /obj/item/weapon/storage/box/syndie_kit/spy

/datum/uplink_item/item/stealth_items/spy/buy(obj/item/device/uplink/U)
	. = ..()
	if(.)
		var/obj/item/weapon/storage/box/syndie_kit/spy/B = .
		var/obj/item/device/spy_monitor/SM = locate() in B
		if(SM)
			SM.uplink = U

/datum/uplink_item/item/stealth_items/id
	name = "Agent ID card"
	item_cost = 1
	path = /obj/item/weapon/card/id/syndicate

/datum/uplink_item/item/stealth_items/chameleon_kit
	name = "Chameleon Kit"
	item_cost = 3
	path = /obj/item/weapon/storage/backpack/chameleon/sydie_kit

/datum/uplink_item/item/stealth_items/voice
	name = "Chameleon Mask/Voice Changer"
	item_cost = 3
	path = /obj/item/clothing/mask/chameleon/voice

/datum/uplink_item/item/stealth_items/smuggler_satchel
	name = "Smuggler's Satchel"
	item_cost = 3
	path = /obj/item/weapon/storage/backpack/satchel/flat

/datum/uplink_item/item/stealth_items/chameleon_projector
	name = "Chameleon Projector"
	desc = "Embedded with a hidden holographic cloaker, allowing it to change it's appearance."
	item_cost = 6
	path = /obj/item/device/chameleon

/*  Disabled until fixed
/datum/uplink_item/item/stealth_items/thermal
	name = "Chameleon Thermal Imaging Glasses"
	item_cost = 4
	path = /obj/item/clothing/glasses/thermal/syndi/chameleon
*/

/datum/uplink_item/item/stealth_items/thermal
	name = "Chameleon Thermal Imaging Goggles"
	desc = "These goggles contain a very special thermal imaging optical matrix that can change its color."
	item_cost = 5
	path = /obj/item/clothing/glasses/hud/standard/thermal/syndie

/datum/uplink_item/item/stealth_items/contortionist
	name = "Contortionist's Jumpsuit"
	desc = "A highly flexible jumpsuit that will help you navigate the ventilation loops of the station internally. Comes with pockets and ID slot, but can't be used without stripping off most gear, including backpack, belt, helmet, and exosuit. Free hands are also necessary to crawl around inside."
	path = /obj/item/clothing/under/contortionist
	item_cost = 9
