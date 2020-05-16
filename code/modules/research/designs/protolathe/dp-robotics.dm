/datum/design/item/robot_scanner
	desc = "A hand-held scanner able to diagnose robotic injuries."
	id = "robot_scanner"
	req_tech = list(TECH_MAGNET = 3, TECH_BIO = 2, TECH_ENGINEERING = 3)
	materials = list(MATERIAL_STEEL = 500, MATERIAL_GLASS = 200)
	build_path = /obj/item/device/robotanalyzer
	sort_string = "MACFB"
	category_items = "Robotics"

/datum/design/item/synthstorage/intelicard
	name = "inteliCard"
	desc = "AI preservation and transportation system."
	id = "intelicard"
	req_tech = list(TECH_DATA = 4, TECH_MATERIAL = 4)
	materials = list(MATERIAL_GLASS = 1000, MATERIAL_GOLD = 200)
	build_path = /obj/item/weapon/aicard
	sort_string = "VACAA"

/datum/design/item/synthstorage/posibrain
	name = "Positronic brain"
	id = "posibrain"
	req_tech = list(TECH_ENGINEERING = 4, TECH_MATERIAL = 6, TECH_BLUESPACE = 2, TECH_DATA = 4)
	build_type = PROTOLATHE | MECHFAB
	materials = list(MATERIAL_STEEL = 2000, MATERIAL_GLASS = 1000, MATERIAL_SILVER = 1000, MATERIAL_GOLD = 500, MATERIAL_PHORON = 500, MATERIAL_DIAMOND = 100)
	build_path = /obj/item/organ/internal/posibrain
	category = "Misc"
	sort_string = "VACAB"

/datum/design/item/biostorage/mmi
	name = "man-machine interface"
	id = "mmi"
	req_tech = list(TECH_DATA = 2, TECH_BIO = 3)
	build_type = PROTOLATHE | MECHFAB
	materials = list(MATERIAL_STEEL = 1000, MATERIAL_GLASS = 500)
	build_path = /obj/item/device/mmi
	category = "Misc"
	sort_string = "VACCA"

/datum/design/item/biostorage/mmi_radio
	name = "radio-enabled man-machine interface"
	id = "mmi_radio"
	req_tech = list(TECH_DATA = 2, TECH_BIO = 4)
	build_type = PROTOLATHE | MECHFAB
	materials = list(MATERIAL_STEEL = 1200, MATERIAL_GLASS = 500)
	build_path = /obj/item/device/mmi/radio_enabled
	category = "Misc"
	sort_string = "VACCB"

/datum/design/item/device/ai_remote
	name = "radio-enabled man-machine interface"
	id = "ai_remote"
	req_tech = list(TECH_MAGNET = 3, TECH_ENGINEERING = 3, TECH_MATERIAL = 2)
	build_type = PROTOLATHE | MECHFAB
	materials = list(MATERIAL_STEEL = 2500, MATERIAL_GLASS = 1000)
	build_path = /obj/item/device/ai_remote
	category = "Robotics"
	sort_string = "VACCC"
