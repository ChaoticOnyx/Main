// Movement relayed to self handling
/datum/movement_handler/mob/relayed_movement
	var/prevent_host_move = FALSE
	var/list/allowed_movers

/datum/movement_handler/mob/relayed_movement/MayMove(var/mob/mover, var/is_external)
	if(is_external)
		return MOVEMENT_PROCEED
	if(mover == mob && !(prevent_host_move && LAZYLEN(allowed_movers) && !LAZYISIN(allowed_movers, mover)))
		return MOVEMENT_PROCEED
	if(LAZYISIN(allowed_movers, mover))
		return MOVEMENT_PROCEED

	return MOVEMENT_STOP

/datum/movement_handler/mob/relayed_movement/proc/AddAllowedMover(var/mover)
	LAZYDISTINCTADD(allowed_movers, mover)

/datum/movement_handler/mob/relayed_movement/proc/RemoveAllowedMover(var/mover)
	LAZYREMOVE(allowed_movers, mover)

// Admin object possession
/datum/movement_handler/mob/admin_possess/DoMove(var/direction)
	if(QDELETED(mob.control_object))
		return MOVEMENT_REMOVE

	. = MOVEMENT_HANDLED

	var/atom/movable/control_object = mob.control_object
	step(control_object, direction)
	if(QDELETED(control_object))
		. |= MOVEMENT_REMOVE
	else
		control_object.set_dir(direction)

// Death handling
/datum/movement_handler/mob/death/DoMove(var/direction, var/mob/mover)
	if(mob.stat != DEAD)
		return
	. = MOVEMENT_HANDLED
	if(!mob.client)
		if(mover != mob)
			. = MOVEMENT_PROCEED
		return
	mob.ghostize()

// Incorporeal/Ghost movement
/datum/movement_handler/mob/incorporeal/DoMove(var/direction)
	. = MOVEMENT_HANDLED
	direction = mob.AdjustMovementDirection(direction)

	var/turf/T = get_step(mob, direction)
	if(!mob.MayEnterTurf(T))
		return

	if(!mob.forceMove(T))
		return

	mob.set_dir(direction)
	mob.PostIncorporealMovement()

/mob/proc/PostIncorporealMovement()
	return

// Eye movement
/datum/movement_handler/mob/eye/DoMove(var/direction, var/mob/mover)
	if(IS_NOT_SELF(mover)) // We only care about direct movement
		return
	if(!mob.eyeobj)
		return
	mob.eyeobj.EyeMove(direction)
	return MOVEMENT_HANDLED

/datum/movement_handler/mob/eye/MayMove(var/mob/mover, var/is_external)
	if(IS_NOT_SELF(mover))
		return MOVEMENT_PROCEED
	if(is_external)
		return MOVEMENT_PROCEED
	if(!mob.eyeobj)
		return MOVEMENT_PROCEED
	return (MOVEMENT_PROCEED|MOVEMENT_HANDLED)

// Space movement
/datum/movement_handler/mob/space/DoMove(var/direction, var/mob/mover)
	if(!mob.check_solid_ground())
		var/allowmove = mob.Allow_Spacemove(0)
		if(!allowmove)
			return MOVEMENT_HANDLED
		else if(allowmove == -1 && mob.handle_spaceslipping()) //Check to see if we slipped
			return MOVEMENT_HANDLED
		else
			mob.inertia_dir = 0 //If not then we can reset inertia and move

/datum/movement_handler/mob/space/MayMove(var/mob/mover, var/is_external)
	if(IS_NOT_SELF(mover) && is_external)
		return MOVEMENT_PROCEED

	if(!mob.check_solid_ground())
		if(!mob.Allow_Spacemove(0))
			return MOVEMENT_STOP
	return MOVEMENT_PROCEED

// Buckle movement
/datum/movement_handler/mob/buckle_relay/DoMove(var/direction, var/mover)
	// TODO: Datumlize buckle-handling
	if(istype(mob.buckled, /obj/vehicle))
		//drunk driving
		if(mob.confused && prob(20)) //vehicles tend to keep moving in the same direction
			direction = turn(direction, pick(90, -90))
		mob.buckled.relaymove(mob, direction)
		return MOVEMENT_HANDLED

	if(mob.pulledby || mob.buckled) // Wheelchair driving!
		if(istype(mob.loc, /turf/space))
			return // No wheelchair driving in space
		if(istype(mob.buckled, /obj/structure/bed/chair/pedalgen))
			mob.buckled.relaymove(mob, direction)
			return MOVEMENT_HANDLED
		if(istype(mob.pulledby, /obj/structure/bed/chair/wheelchair))
			. = MOVEMENT_HANDLED
			mob.pulledby.DoMove(direction, mob)
		else if(istype(mob.buckled, /obj/structure/bed/chair/wheelchair))
			. = MOVEMENT_HANDLED
			if(ishuman(mob))
				var/mob/living/carbon/human/driver = mob
				var/obj/item/organ/external/l_hand = driver.get_organ(BP_L_HAND)
				var/obj/item/organ/external/r_hand = driver.get_organ(BP_R_HAND)
				if((!l_hand || l_hand.is_stump()) && (!r_hand || r_hand.is_stump()))
					return // No hands to drive your chair? Tough luck!
			//drunk wheelchair driving
			direction = mob.AdjustMovementDirection(direction)
			mob.buckled.DoMove(direction, mob)

/datum/movement_handler/mob/buckle_relay/MayMove(var/mover)
	if(mob.buckled)
		return mob.buckled.MayMove(mover, FALSE) ? (MOVEMENT_PROCEED|MOVEMENT_HANDLED) : MOVEMENT_STOP
	return MOVEMENT_PROCEED

// Movement delay
/datum/movement_handler/mob/delay
	var/next_move

/datum/movement_handler/mob/delay/DoMove(var/direction, var/mover, var/is_external)
	if(is_external)
		return
	next_move = world.time + max(1, mob.movement_delay())

/datum/movement_handler/mob/delay/MayMove(var/mover, var/is_external)
	if(IS_NOT_SELF(mover) && is_external)
		return MOVEMENT_PROCEED
	return ((mover && mover != mob) ||  world.time >= next_move) ? MOVEMENT_PROCEED : MOVEMENT_STOP

/datum/movement_handler/mob/delay/proc/SetDelay(var/delay)
	next_move = max(next_move, world.time + delay)

/datum/movement_handler/mob/delay/proc/AddDelay(var/delay)
	next_move += max(0, delay)

// Stop effect
/datum/movement_handler/mob/stop_effect/DoMove()
	if(MayMove() == MOVEMENT_STOP)
		return MOVEMENT_HANDLED

/datum/movement_handler/mob/stop_effect/MayMove()
	for(var/obj/effect/stop/S in mob.loc)
		if(S.victim == mob)
			return MOVEMENT_STOP
	return MOVEMENT_PROCEED

// Transformation
/datum/movement_handler/mob/transformation/MayMove()
	return MOVEMENT_STOP

// Consciousness - Is the entity trying to conduct the move conscious?
/datum/movement_handler/mob/conscious/MayMove(var/mob/mover)
	return (mover ? mover.stat == CONSCIOUS : mob.stat == CONSCIOUS) ? MOVEMENT_PROCEED : MOVEMENT_STOP

// Along with more physical checks
/datum/movement_handler/mob/physically_capable/MayMove(var/mob/mover)
	// We only check physical capability if the host mob tried to do the moving
	return ((mover && mover != mob) || !mob.incapacitated(INCAPACITATION_DISABLED & ~INCAPACITATION_FORCELYING)) ? MOVEMENT_PROCEED : MOVEMENT_STOP

// Is anything physically preventing movement?
/datum/movement_handler/mob/physically_restrained/MayMove(var/mob/mover)
	if(istype(mob.buckled) && !(mob.buckled.buckle_movable || mob.buckled.buckle_relaymove))
		if(mover == mob)
			to_chat(mob, SPAN("notice", "You're buckled to \the [mob.buckled]!"))
		return MOVEMENT_STOP

	if(LAZYLEN(mob.pinned))
		if(mover == mob)
			to_chat(mob, SPAN("notice", "You're pinned down by \a [mob.pinned[1]]!"))
		return MOVEMENT_STOP

	if(mob.anchored)
		if(mover == mob)
			to_chat(mob, SPAN("notice", "You're anchored down!"))
		return MOVEMENT_STOP

	for(var/obj/item/grab/G in mob.grabbed_by)
		if(G.stop_move())
			if(mover == mob)
				to_chat(mob, SPAN("notice", "You're stuck in a grab!"))
			mob.ProcessGrabs()
			return MOVEMENT_STOP

	if(mob.restrained())
		for(var/mob/M in range(mob, 1))
			if(M.pulling == mob)
				if(!M.incapacitated() && mob.Adjacent(M))
					if(mover == mob)
						to_chat(mob, SPAN("notice", "You're restrained! You can't move!"))
					return MOVEMENT_STOP
				else
					M.stop_pulling()

	return MOVEMENT_PROCEED


/mob/living/ProcessGrabs()
	//if we are being grabbed
	if(grabbed_by.len)
		resist() //shortcut for resisting grabs

/mob/proc/ProcessGrabs()
	return


// Finally.. the last of the mob movement junk
/datum/movement_handler/mob/movement/DoMove(var/direction, var/mob/mover)
	. = MOVEMENT_HANDLED
	if(mob.moving)
		return

	if(!mob.lastarea)
		mob.lastarea = get_area(mob.loc)

	//We are now going to move
	mob.moving = 1

	direction = mob.AdjustMovementDirection(direction)
	var/old_turf = get_turf(mob)

	if(direction & (UP|DOWN))
		var/txt_dir = direction & UP ? "upwards" : "downwards"
		mob.visible_message(SPAN("notice", "[mob] moves [txt_dir]."))
		if(mob.pulling)
			mob.zPull(direction)

	step(mob, direction)

	if(!mob)
		return // If the mob gets deleted on move (e.g. Entered, whatever), it wipes this reference on us in Destroy (and we should be aborting all action anyway).
	// Something with pulling things
	var/extra_delay = HandleGrabs(direction, old_turf)
	mob.addMoveCooldown(extra_delay)

	for(var/obj/item/grab/G in mob)
		if(G.assailant_reverse_facing())
			mob.set_dir(GLOB.reverse_dir[direction])
		G.assailant_moved()
	for(var/obj/item/grab/G in mob.grabbed_by)
		G.adjust_position()

	mob.moving = 0

/datum/movement_handler/mob/movement/MayMove(var/mob/mover)
	return IS_SELF(mover) && mob.moving ? MOVEMENT_STOP : MOVEMENT_PROCEED

/datum/movement_handler/mob/movement/proc/HandleGrabs(var/direction, var/old_turf)
	. = 0
	// TODO: Look into making grabs use movement events instead, this is a mess.
	for(var/obj/item/grab/G in mob)
		. = max(., G.grab_slowdown())
		var/list/L = mob.ret_grab()
		if(istype(L, /list))
			if(L.len == 2)
				L -= mob
				var/mob/M = L[1]
				if(M)
					if(get_dist(old_turf, M) <= 1)
						if(isturf(M.loc) && isturf(mob.loc))
							if(mob.loc != old_turf && M.loc != mob.loc)
								step(M, get_dir(M.loc, old_turf))
			else
				for(var/mob/M in L)
					M.other_mobs = 1
					if(mob != M)
						M.animate_movement = 3
				for(var/mob/M in L)
					spawn(0)
						step(M, direction)
						return
					spawn(1)
						M.other_mobs = null
						M.animate_movement = 2
						return
			G.adjust_position()

/datum/movement_handler/mob/friend
	var/mob/living/imaginary_friend/friend
	var/mob/living/carbon/human/friend_host

/datum/movement_handler/mob/friend/New(mob/observer/imaginary_friend/friend)
	src.friend = friend
	friend_host = friend.host

/datum/movement_handler/mob/friend/DoMove(direction, mob/mover, is_external)
	if(!QDELETED(friend_host) && !QDELETED(friend))
		return MOVEMENT_HANDLED

/datum/movement_handler/mob/friend/MayMove(mob/mover, is_external)
	var/dist = get_dist(get_turf(friend), get_turf(friend_host))
	if(friend && friend_host && dist+1 < 9)
		return MOVEMENT_PROCEED

// Misc. helpers
/mob/proc/MayEnterTurf(var/turf/T)
	return T && !((mob_flags & MOB_FLAG_HOLY_BAD) && check_is_holy_turf(T))

/mob/proc/AdjustMovementDirection(var/direction)
	. = direction
	if(!confused)
		return

	if(lying)
		return

	switch(m_intent)
		if(M_RUN)
			if(prob(25))
				return
		if(M_WALK)
			if(prob(75))
				return

	return prob(50) ? GLOB.cw_dir[.] : GLOB.ccw_dir[.]
