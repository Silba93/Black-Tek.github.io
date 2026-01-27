---
title: Creature
---

# Creature Class

The Creature class is the base class for all living entities in the game (Players, Monsters, NPCs). It provides common functionality shared by all creature types.

## Constructor

```lua
Creature(identifier)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `identifier` | number/string | Creature ID or name |

---

## Type Checking

| Method | Returns | Description |
|--------|---------|-------------|
| `isCreature()` | boolean | Is a creature |
| `isPlayer()` | boolean | Is a player |
| `isMonster()` | boolean | Is a monster |
| `isNpc()` | boolean | Is an NPC |
| `isRemoved()` | boolean | Has been removed from game |

```lua
if creature:isPlayer() then
    local player = creature:getPlayer()
elseif creature:isMonster() then
    local monster = creature:getMonster()
end
```

---

## Identity

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Unique creature ID |
| `getName()` | string | Creature name |
| `getDescription(distance)` | string | Look description |

---

## Position & Movement

| Method | Returns | Description |
|--------|---------|-------------|
| `getPosition()` | Position | Current position |
| `getTile()` | Tile | Current tile |
| `getDirection()` | number | Facing direction |
| `setDirection(direction)` | - | Set direction |
| `teleportTo(position, pushMovement)` | boolean | Teleport creature |
| `move(direction)` | boolean | Move one step |
| `getPathTo(position)` | table | Get path to position |

**Directions:** `DIRECTION_NORTH`, `DIRECTION_EAST`, `DIRECTION_SOUTH`, `DIRECTION_WEST`

```lua
-- Teleport to position
creature:teleportTo(Position(1000, 1000, 7))

-- Move north
creature:move(DIRECTION_NORTH)

-- Get path
local path = creature:getPathTo(targetPosition)
```

---

## Health

| Method | Returns | Description |
|--------|---------|-------------|
| `getHealth()` | number | Current health |
| `getMaxHealth()` | number | Maximum health |
| `setHealth(health)` | - | Set current health |
| `setMaxHealth(health)` | - | Set maximum health |
| `addHealth(amount)` | - | Add/subtract health |
| `setHiddenHealth(hidden)` | - | Hide health bar |
| `isHealthHidden()` | boolean | Is health hidden |

```lua
-- Heal to full
creature:setHealth(creature:getMaxHealth())

-- Damage creature
creature:addHealth(-100)
```

---

## Speed

| Method | Returns | Description |
|--------|---------|-------------|
| `getSpeed()` | number | Current speed |
| `getBaseSpeed()` | number | Base speed |
| `changeSpeed(delta)` | - | Modify speed |

---

## Target & Follow

| Method | Returns | Description |
|--------|---------|-------------|
| `getTarget()` | Creature | Attack target |
| `setTarget(creature)` | - | Set attack target |
| `getFollowCreature()` | Creature | Follow target |
| `setFollowCreature(creature)` | - | Set follow target |

---

## Master & Summons

| Method | Returns | Description |
|--------|---------|-------------|
| `getMaster()` | Creature | Master (if summon) |
| `setMaster(creature)` | - | Set master |
| `getSummons()` | table | List of summons |

---

## Light

| Method | Returns | Description |
|--------|---------|-------------|
| `getLight()` | level, color | Light info |
| `setLight(level, color)` | - | Set light |

```lua
-- Set bright light
creature:setLight(10, 215)
```

---

## Outfit

| Method | Returns | Description |
|--------|---------|-------------|
| `getOutfit()` | Outfit | Current outfit |
| `setOutfit(outfit)` | - | Set outfit |

```lua
local outfit = creature:getOutfit()
outfit.lookType = 130
creature:setOutfit(outfit)
```

---

## Skull

| Method | Returns | Description |
|--------|---------|-------------|
| `getSkull()` | number | Skull type |
| `setSkull(skull)` | - | Set skull |

**Skulls:** `SKULL_NONE`, `SKULL_YELLOW`, `SKULL_GREEN`, `SKULL_WHITE`, `SKULL_RED`, `SKULL_BLACK`, `SKULL_ORANGE`

---

## Conditions

| Method | Returns | Description |
|--------|---------|-------------|
| `getCondition(conditionType, conditionId, subId)` | Condition | Get condition |
| `addCondition(condition)` | - | Add condition |
| `removeCondition(conditionType, conditionId, subId, force)` | - | Remove condition |
| `hasCondition(conditionType, subId)` | boolean | Has condition |

```lua
-- Add poison
local condition = Condition(CONDITION_POISON)
condition:setParameter(CONDITION_PARAM_TICKS, 10000)
condition:setParameter(CONDITION_PARAM_MINVALUE, 10)
condition:setParameter(CONDITION_PARAM_MAXVALUE, 20)
creature:addCondition(condition)

-- Check for haste
if creature:hasCondition(CONDITION_HASTE) then
    print("Has haste!")
end
```

---

## Vision

| Method | Returns | Description |
|--------|---------|-------------|
| `canSee(position)` | boolean | Can see position |
| `canSeeCreature(creature)` | boolean | Can see creature |
| `canSeeGhostMode(creature)` | boolean | Can see ghost |
| `canSeeInvisibility()` | boolean | Can see invisible |
| `isInGhostMode()` | boolean | Is in ghost mode |

---

## Immunity & Movement

| Method | Returns | Description |
|--------|---------|-------------|
| `isImmune(conditionType)` | boolean | Is immune |
| `isMovementBlocked()` | boolean | Movement blocked |
| `setMovementBlocked(blocked)` | - | Block movement |

---

## Combat

| Method | Returns | Description |
|--------|---------|-------------|
| `getDamageMap()` | table | Damage dealt/received |
| `setDropLoot(drop)` | - | Enable/disable loot |
| `setSkillLoss(loss)` | - | Enable/disable skill loss |

---

## Parent

| Method | Returns | Description |
|--------|---------|-------------|
| `getParent()` | Cylinder | Parent container/tile |
| `getZone()` | number | Current zone type |

**Zones:** `ZONE_PROTECTION`, `ZONE_NOPVP`, `ZONE_PVP`, `ZONE_NOLOGOUT`, `ZONE_NORMAL`

---

## Speech

| Method | Description |
|--------|-------------|
| `say(text, type, ghost, target, position)` | Say text |

```lua
creature:say("Hello!", TALKTYPE_MONSTER_SAY)
creature:say("*roars*", TALKTYPE_MONSTER_YELL)
```

---

## Events

| Method | Returns | Description |
|--------|---------|-------------|
| `getEvents(type)` | table | Registered events |
| `registerEvent(eventName)` | boolean | Register creature event |
| `unregisterEvent(eventName)` | boolean | Unregister event |

```lua
creature:registerEvent("OnDeath")
```

---

## Removal

| Method | Description |
|--------|-------------|
| `remove()` | Remove from game |

---

## Custom Skills & Stats

| Method | Returns | Description |
|--------|---------|-------------|
| `giveSkill(skillName, params)` | - | Give custom skill |
| `addSkill(skillName, levels)` | - | Add skill levels |
| `subtractSkill(skillName, levels)` | - | Remove skill levels |
| `removeSkill(skillName)` | - | Remove custom skill |
| `hasSkill(skillName)` | boolean | Has custom skill |
| `getSkillLevel(skillName)` | number | Custom skill level |
| `giveStat(statName, params)` | - | Give custom stat |
| `removeStat(statName)` | - | Remove custom stat |
| `hasStat(statName)` | boolean | Has custom stat |
| `getStat(statName)` | Stat | Get stat object |
| `getStats()` | table | All custom stats |

---

## Examples

### Distance Check

```lua
local function isNear(creature, target, range)
    local pos1 = creature:getPosition()
    local pos2 = target:getPosition()
    return pos1:getDistance(pos2) <= range
end
```

### Safe Teleport

```lua
local function safeTeleport(creature, destination)
    local tile = Tile(destination)
    if tile and not tile:hasProperty(CONST_PROP_BLOCKSOLID) then
        creature:teleportTo(destination)
        destination:sendMagicEffect(CONST_ME_TELEPORT)
        return true
    end
    return false
end
```
