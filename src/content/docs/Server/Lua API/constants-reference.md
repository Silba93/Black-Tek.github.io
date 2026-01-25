---
title: Constants (Global)
---

# Lua Constants Reference

This document provides a complete reference of all constants available in BlackTek Server's Lua interface.

## Magic Effects (CONST_ME_*)

Visual effects displayed at a position.

```lua
position:sendMagicEffect(CONST_ME_TELEPORT)
```

| Constant | ID | Description |
|----------|-----|-------------|
| `CONST_ME_NONE` | 0 | No effect |
| `CONST_ME_DRAWBLOOD` | 1 | Blood splash |
| `CONST_ME_LOSEENERGY` | 2 | Energy loss |
| `CONST_ME_POFF` | 3 | Puff/smoke |
| `CONST_ME_BLOCKHIT` | 4 | Block hit |
| `CONST_ME_EXPLOSIONAREA` | 5 | Explosion area |
| `CONST_ME_EXPLOSIONHIT` | 6 | Explosion hit |
| `CONST_ME_FIREAREA` | 7 | Fire area |
| `CONST_ME_YELLOW_RINGS` | 8 | Yellow rings |
| `CONST_ME_GREEN_RINGS` | 9 | Green rings |
| `CONST_ME_HITAREA` | 10 | Hit area |
| `CONST_ME_TELEPORT` | 11 | Teleport |
| `CONST_ME_ENERGYHIT` | 12 | Energy hit |
| `CONST_ME_MAGIC_BLUE` | 13 | Blue magic |
| `CONST_ME_MAGIC_RED` | 14 | Red magic |
| `CONST_ME_MAGIC_GREEN` | 15 | Green magic |
| `CONST_ME_HITBYFIRE` | 16 | Hit by fire |
| `CONST_ME_HITBYPOISON` | 17 | Hit by poison |
| `CONST_ME_MORTAREA` | 18 | Death area |
| `CONST_ME_POISONAREA` | 21 | Poison area |
| `CONST_ME_BUBBLES` | 26 | Bubbles |
| `CONST_ME_STUN` | 32 | Stun effect |
| `CONST_ME_SLEEP` | 33 | Sleep effect |
| `CONST_ME_GROUNDSHAKER` | 35 | Ground shaker |
| `CONST_ME_HEARTS` | 36 | Hearts |
| `CONST_ME_FIREATTACK` | 37 | Fire attack |
| `CONST_ME_ENERGYAREA` | 38 | Energy area |
| `CONST_ME_HOLYDAMAGE` | 40 | Holy damage |
| `CONST_ME_ICEAREA` | 42 | Ice area |
| `CONST_ME_ICETORNADO` | 43 | Ice tornado |
| `CONST_ME_ICEATTACK` | 44 | Ice attack |
| `CONST_ME_STONES` | 45 | Stones |
| `CONST_ME_PURPLEENERGY` | 48 | Purple energy |
| `CONST_ME_HOLYAREA` | 50 | Holy area |
| `CONST_ME_GIANTICE` | 53 | Giant ice |
| `CONST_ME_WATERSPLASH` | 54 | Water splash |
| `CONST_ME_CRITICAL_DAMAGE` | 173 | Critical hit |

---

## Distance Effects (CONST_ANI_*)

Projectile animations between positions.

```lua
fromPos:sendDistanceEffect(toPos, CONST_ANI_FIRE)
```

| Constant | ID | Description |
|----------|-----|-------------|
| `CONST_ANI_NONE` | 0 | No animation |
| `CONST_ANI_SPEAR` | 1 | Spear |
| `CONST_ANI_BOLT` | 2 | Bolt |
| `CONST_ANI_ARROW` | 3 | Arrow |
| `CONST_ANI_FIRE` | 4 | Fire |
| `CONST_ANI_ENERGY` | 5 | Energy |
| `CONST_ANI_POISONARROW` | 6 | Poison arrow |
| `CONST_ANI_BURSTARROW` | 7 | Burst arrow |
| `CONST_ANI_THROWINGSTAR` | 8 | Throwing star |
| `CONST_ANI_THROWINGKNIFE` | 9 | Throwing knife |
| `CONST_ANI_SMALLSTONE` | 10 | Small stone |
| `CONST_ANI_DEATH` | 11 | Death |
| `CONST_ANI_LARGEROCK` | 12 | Large rock |
| `CONST_ANI_SNOWBALL` | 13 | Snowball |
| `CONST_ANI_POWERBOLT` | 14 | Power bolt |
| `CONST_ANI_POISON` | 15 | Poison |
| `CONST_ANI_ICE` | 29 | Ice |
| `CONST_ANI_EARTH` | 30 | Earth |
| `CONST_ANI_HOLY` | 31 | Holy |
| `CONST_ANI_SUDDENDEATH` | 32 | Sudden death |
| `CONST_ANI_EXPLOSION` | 41 | Explosion |

---

## Combat Types

Damage/healing types for combat.

| Constant | Description |
|----------|-------------|
| `COMBAT_NONE` | No combat type |
| `COMBAT_PHYSICALDAMAGE` | Physical damage |
| `COMBAT_ENERGYDAMAGE` | Energy damage |
| `COMBAT_EARTHDAMAGE` | Earth/poison damage |
| `COMBAT_FIREDAMAGE` | Fire damage |
| `COMBAT_UNDEFINEDDAMAGE` | Undefined damage |
| `COMBAT_LIFEDRAIN` | Life drain |
| `COMBAT_MANADRAIN` | Mana drain |
| `COMBAT_HEALING` | Healing |
| `COMBAT_DROWNDAMAGE` | Drowning damage |
| `COMBAT_ICEDAMAGE` | Ice damage |
| `COMBAT_HOLYDAMAGE` | Holy damage |
| `COMBAT_DEATHDAMAGE` | Death damage |

---

## Condition Types

Status effect types.

| Constant | Description |
|----------|-------------|
| `CONDITION_NONE` | No condition |
| `CONDITION_POISON` | Poison damage |
| `CONDITION_FIRE` | Fire damage |
| `CONDITION_ENERGY` | Energy damage |
| `CONDITION_BLEEDING` | Bleeding |
| `CONDITION_HASTE` | Speed increase |
| `CONDITION_PARALYZE` | Speed decrease |
| `CONDITION_OUTFIT` | Outfit change |
| `CONDITION_INVISIBLE` | Invisibility |
| `CONDITION_LIGHT` | Light source |
| `CONDITION_MANASHIELD` | Magic shield |
| `CONDITION_INFIGHT` | In combat |
| `CONDITION_DRUNK` | Drunk |
| `CONDITION_EXHAUST` | Exhausted |
| `CONDITION_REGENERATION` | Regeneration |
| `CONDITION_SOUL` | Soul regen |
| `CONDITION_DROWN` | Drowning |
| `CONDITION_MUTED` | Cannot speak |
| `CONDITION_ATTRIBUTES` | Stat modifiers |
| `CONDITION_FREEZING` | Ice damage |
| `CONDITION_DAZZLED` | Dazzled |
| `CONDITION_CURSED` | Cursed |
| `CONDITION_ROOTED` | Cannot move |
| `CONDITION_FEARED` | Fear |

---

## Skills

Player skill types.

| Constant | ID | Description |
|----------|-----|-------------|
| `SKILL_FIST` | 0 | Fist fighting |
| `SKILL_CLUB` | 1 | Club fighting |
| `SKILL_SWORD` | 2 | Sword fighting |
| `SKILL_AXE` | 3 | Axe fighting |
| `SKILL_DISTANCE` | 4 | Distance fighting |
| `SKILL_SHIELDING` | 5 | Shielding |
| `SKILL_FISHING` | 6 | Fishing |
| `SKILL_MAGLEVEL` | - | Magic level |
| `SKILL_LEVEL` | - | Experience level |

---

## Slots

Equipment slot constants.

| Constant | ID | Description |
|----------|-----|-------------|
| `CONST_SLOT_HEAD` | 1 | Head |
| `CONST_SLOT_NECKLACE` | 2 | Necklace |
| `CONST_SLOT_BACKPACK` | 3 | Backpack |
| `CONST_SLOT_ARMOR` | 4 | Armor |
| `CONST_SLOT_RIGHT` | 5 | Right hand |
| `CONST_SLOT_LEFT` | 6 | Left hand |
| `CONST_SLOT_LEGS` | 7 | Legs |
| `CONST_SLOT_FEET` | 8 | Feet |
| `CONST_SLOT_RING` | 9 | Ring |
| `CONST_SLOT_AMMO` | 10 | Ammunition |

---

## Message Types

Text message types for players.

| Constant | Description |
|----------|-------------|
| `MESSAGE_STATUS_CONSOLE_BLUE` | Blue console message |
| `MESSAGE_STATUS_CONSOLE_RED` | Red console message |
| `MESSAGE_STATUS_DEFAULT` | White bottom/console |
| `MESSAGE_STATUS_WARNING` | Red warning |
| `MESSAGE_STATUS_SMALL` | Small status |
| `MESSAGE_INFO_DESCR` | Green info |
| `MESSAGE_DAMAGE_DEALT` | Damage dealt |
| `MESSAGE_DAMAGE_RECEIVED` | Damage received |
| `MESSAGE_HEALED` | Healing received |
| `MESSAGE_EXPERIENCE` | Experience gained |
| `MESSAGE_EVENT_ADVANCE` | Level/skill advance |

---

## Talk Types

Speech types for creatures.

| Constant | Description |
|----------|-------------|
| `TALKTYPE_SAY` | Normal say |
| `TALKTYPE_WHISPER` | Whisper |
| `TALKTYPE_YELL` | Yell |
| `TALKTYPE_PRIVATE_FROM` | Private from |
| `TALKTYPE_PRIVATE_TO` | Private to |
| `TALKTYPE_CHANNEL_Y` | Yellow channel |
| `TALKTYPE_CHANNEL_O` | Orange channel |
| `TALKTYPE_BROADCAST` | Broadcast |
| `TALKTYPE_MONSTER_SAY` | Monster say |
| `TALKTYPE_MONSTER_YELL` | Monster yell |

---

## Skulls

PvP skull types.

| Constant | ID | Description |
|----------|-----|-------------|
| `SKULL_NONE` | 0 | No skull |
| `SKULL_YELLOW` | 1 | Yellow skull |
| `SKULL_GREEN` | 2 | Green skull |
| `SKULL_WHITE` | 3 | White skull |
| `SKULL_RED` | 4 | Red skull |
| `SKULL_BLACK` | 5 | Black skull |
| `SKULL_ORANGE` | 6 | Orange skull |

---

## Directions

Movement directions.

| Constant | ID | Description |
|----------|-----|-------------|
| `DIRECTION_NORTH` | 0 | North (up) |
| `DIRECTION_EAST` | 1 | East (right) |
| `DIRECTION_SOUTH` | 2 | South (down) |
| `DIRECTION_WEST` | 3 | West (left) |
| `DIRECTION_NORTHEAST` | 4 | Northeast |
| `DIRECTION_SOUTHEAST` | 5 | Southeast |
| `DIRECTION_SOUTHWEST` | 6 | Southwest |
| `DIRECTION_NORTHWEST` | 7 | Northwest |

---

## Return Values

Action return values.

| Constant | Description |
|----------|-------------|
| `RETURNVALUE_NOERROR` | Success |
| `RETURNVALUE_NOTPOSSIBLE` | Not possible |
| `RETURNVALUE_NOTENOUGHROOM` | Not enough room |
| `RETURNVALUE_PLAYERISPZLOCKED` | PZ locked |
| `RETURNVALUE_PLAYERISNOTINVITED` | Not invited |
| `RETURNVALUE_CANNOTTHROW` | Cannot throw |
| `RETURNVALUE_THEREISNOWAY` | No way |
| `RETURNVALUE_DESTINATIONOUTOFREACH` | Out of reach |
| `RETURNVALUE_CREATUREBLOCK` | Creature blocking |
| `RETURNVALUE_NOTMOVEABLE` | Not moveable |
| `RETURNVALUE_DROPTWOHANDEDITEM` | Drop two-handed |
| `RETURNVALUE_BOTHHANDSNEEDTOBEFREE` | Both hands needed |
| `RETURNVALUE_CANONLYUSEONEWEAPON` | One weapon only |
| `RETURNVALUE_NEEDEXCHANGE` | Need exchange |
| `RETURNVALUE_CANNOTBEDRESSED` | Cannot be dressed |
| `RETURNVALUE_PUTTHISOBJECTINYOURHAND` | Put in hand |
| `RETURNVALUE_PUTTHISOBJECTINBOTHHANDS` | Put in both hands |
| `RETURNVALUE_TOOFARAWAY` | Too far away |
| `RETURNVALUE_FIRSTGODOWNSTAIRS` | Go downstairs first |
| `RETURNVALUE_FIRSTGOUPSTAIRS` | Go upstairs first |
| `RETURNVALUE_CONTAINERNOTENOUGHROOM` | Container full |
| `RETURNVALUE_NOTENOUGHCAPACITY` | Not enough capacity |
| `RETURNVALUE_CANNOTPICKUP` | Cannot pick up |
| `RETURNVALUE_THISISIMPOSSIBLE` | Impossible |
| `RETURNVALUE_DEPOTISFULL` | Depot full |
| `RETURNVALUE_CREATUREDOESNOTEXIST` | Creature doesn't exist |
| `RETURNVALUE_CANNOTUSETHISOBJECT` | Cannot use object |
| `RETURNVALUE_PLAYERWITHTHISNAMEISNOTONLINE` | Player not online |
| `RETURNVALUE_NOTREQUIREDLEVELTOUSERUNE` | Level too low for rune |
| `RETURNVALUE_YOUAREALREADYTRADING` | Already trading |
| `RETURNVALUE_THISPLAYERISALREADYTRADING` | Player already trading |
| `RETURNVALUE_YOUMAYNOTLOGOUTDURINGAFIGHT` | Cannot logout in fight |
| `RETURNVALUE_DIRECTPLAYERSHOOT` | Direct player shoot |
| `RETURNVALUE_NOTENOUGHLEVEL` | Not enough level |
| `RETURNVALUE_NOTENOUGHMAGICLEVEL` | Not enough magic level |
| `RETURNVALUE_NOTENOUGHMANA` | Not enough mana |
| `RETURNVALUE_NOTENOUGHSOUL` | Not enough soul |
| `RETURNVALUE_YOUAREEXHAUSTED` | Exhausted |
| `RETURNVALUE_PLAYERISNOTREACHABLE` | Player not reachable |
| `RETURNVALUE_CANONLYUSETHISRUNEONCREATURES` | Rune only on creatures |
| `RETURNVALUE_ACTIONNOTPERMITTEDINPROTECTIONZONE` | PZ not allowed |
| `RETURNVALUE_YOUMAYNOTATTACKTHISPLAYER` | Cannot attack player |
| `RETURNVALUE_YOUMAYNOTATTACKTHISCREATURE` | Cannot attack creature |
| `RETURNVALUE_YOUMAYNOTATTACKAPERSONINPROTECTIONZONE` | Cannot attack in PZ |
| `RETURNVALUE_YOUMAYNOTATTACKAPERSONWHILEINPROTECTIONZONE` | In PZ cannot attack |
| `RETURNVALUE_YOUCANONLYUSEITONCREATURES` | Only on creatures |
| `RETURNVALUE_TURNSECUREMODETOATTACKUNMARKEDPLAYERS` | Secure mode |
| `RETURNVALUE_YOUNEEDPREMIUMACCOUNT` | Need premium |
| `RETURNVALUE_YOUNEEDTOLEARNTHISSPELL` | Need to learn spell |
| `RETURNVALUE_YOURVOCATIONCANNOTUSETHISSPELL` | Wrong vocation |
| `RETURNVALUE_YOUNEEDAWEAPONTOUSETHISSPELL` | Need weapon |
| `RETURNVALUE_PLAYERISPZLOCKEDLEAVEPVPZONE` | Leave PvP zone |
| `RETURNVALUE_PLAYERISPZLOCKEDENTERPVPZONE` | Enter PvP zone |
| `RETURNVALUE_ACTIONNOTPERMITTEDINANOPVPZONE` | No-PvP zone |
| `RETURNVALUE_YOUCANNOTLOGOUTHERE` | Cannot logout here |
| `RETURNVALUE_YOUNEEDAMAGICITEMTOCASTSPELL` | Need magic item |
| `RETURNVALUE_CANNOTCONJUREITEMHERE` | Cannot conjure here |
| `RETURNVALUE_NAMEISTOOAMBIGUOUS` | Name too ambiguous |
| `RETURNVALUE_CANONLYUSEONESHIELD` | One shield only |
| `RETURNVALUE_NOPARTYMEMBERSINRANGE` | No party in range |
| `RETURNVALUE_YOUARENOTTHEOWNER` | Not the owner |

---

## Account Types

| Constant | ID | Description |
|----------|-----|-------------|
| `ACCOUNT_TYPE_NORMAL` | 1 | Normal player |
| `ACCOUNT_TYPE_TUTOR` | 2 | Tutor |
| `ACCOUNT_TYPE_SENIORTUTOR` | 3 | Senior tutor |
| `ACCOUNT_TYPE_GAMEMASTER` | 4 | Gamemaster |
| `ACCOUNT_TYPE_COMMUNITYMANAGER` | 5 | Community manager |
| `ACCOUNT_TYPE_GOD` | 6 | God/Admin |

---

## Game States

| Constant | ID | Description |
|----------|-----|-------------|
| `GAME_STATE_STARTUP` | 0 | Starting up |
| `GAME_STATE_INIT` | 1 | Initializing |
| `GAME_STATE_NORMAL` | 2 | Running normally |
| `GAME_STATE_CLOSED` | 3 | Closed |
| `GAME_STATE_SHUTDOWN` | 4 | Shutting down |
| `GAME_STATE_CLOSING` | 5 | Closing |
| `GAME_STATE_MAINTAIN` | 6 | Maintenance |

---

## World Types

| Constant | ID | Description |
|----------|-----|-------------|
| `WORLD_TYPE_NO_PVP` | 1 | No PvP |
| `WORLD_TYPE_PVP` | 2 | Open PvP |
| `WORLD_TYPE_PVP_ENFORCED` | 3 | Hardcore PvP |

---

## Item Attributes

| Constant | Description |
|----------|-------------|
| `ITEM_ATTRIBUTE_NONE` | No attribute |
| `ITEM_ATTRIBUTE_ACTIONID` | Action ID |
| `ITEM_ATTRIBUTE_UNIQUEID` | Unique ID |
| `ITEM_ATTRIBUTE_DESCRIPTION` | Description |
| `ITEM_ATTRIBUTE_TEXT` | Written text |
| `ITEM_ATTRIBUTE_DATE` | Date |
| `ITEM_ATTRIBUTE_WRITER` | Writer name |
| `ITEM_ATTRIBUTE_NAME` | Custom name |
| `ITEM_ATTRIBUTE_ARTICLE` | Article |
| `ITEM_ATTRIBUTE_PLURALNAME` | Plural name |
| `ITEM_ATTRIBUTE_WEIGHT` | Weight |
| `ITEM_ATTRIBUTE_ATTACK` | Attack value |
| `ITEM_ATTRIBUTE_DEFENSE` | Defense value |
| `ITEM_ATTRIBUTE_EXTRADEFENSE` | Extra defense |
| `ITEM_ATTRIBUTE_ARMOR` | Armor value |
| `ITEM_ATTRIBUTE_HITCHANCE` | Hit chance |
| `ITEM_ATTRIBUTE_SHOOTRANGE` | Shoot range |
| `ITEM_ATTRIBUTE_OWNER` | Owner |
| `ITEM_ATTRIBUTE_DURATION` | Duration |
| `ITEM_ATTRIBUTE_DECAYSTATE` | Decay state |
| `ITEM_ATTRIBUTE_CORPSEOWNER` | Corpse owner |
| `ITEM_ATTRIBUTE_CHARGES` | Charges |
| `ITEM_ATTRIBUTE_FLUIDTYPE` | Fluid type |
| `ITEM_ATTRIBUTE_DOORID` | Door ID |

---

## Zones

| Constant | Description |
|----------|-------------|
| `ZONE_PROTECTION` | Protection zone |
| `ZONE_NOPVP` | No-PvP zone |
| `ZONE_PVP` | PvP zone |
| `ZONE_NOLOGOUT` | No logout zone |
| `ZONE_NORMAL` | Normal zone |

---

## Tile Flags

| Constant | Description |
|----------|-------------|
| `TILESTATE_PROTECTIONZONE` | Protection zone |
| `TILESTATE_NOPVPZONE` | No-PvP zone |
| `TILESTATE_PVPZONE` | PvP zone |
| `TILESTATE_NOLOGOUT` | No logout |
| `TILESTATE_REFRESH` | Refresh |
| `TILESTATE_HOUSE` | House tile |
