---
title: Condition
---

# Condition Class

Conditions represent status effects that can be applied to creatures (buffs, debuffs, damage over time, etc.).

## Constructor

```lua
Condition(conditionType, conditionId)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `conditionType` | number | Required | Condition type constant |
| `conditionId` | number | `CONDITIONID_COMBAT` | Condition ID |

---

## Condition Types

| Constant | Description |
|----------|-------------|
| `CONDITION_POISON` | Poison damage over time |
| `CONDITION_FIRE` | Fire damage over time |
| `CONDITION_ENERGY` | Energy damage over time |
| `CONDITION_BLEEDING` | Physical damage over time |
| `CONDITION_HASTE` | Increased speed |
| `CONDITION_PARALYZE` | Decreased speed |
| `CONDITION_OUTFIT` | Outfit change |
| `CONDITION_INVISIBLE` | Invisibility |
| `CONDITION_LIGHT` | Light source |
| `CONDITION_MANASHIELD` | Magic shield |
| `CONDITION_INFIGHT` | In combat |
| `CONDITION_DRUNK` | Drunk movement |
| `CONDITION_EXHAUST` | Exhaustion |
| `CONDITION_REGENERATION` | Health/mana regen |
| `CONDITION_SOUL` | Soul regeneration |
| `CONDITION_DROWN` | Drowning |
| `CONDITION_MUTED` | Cannot speak |
| `CONDITION_CHANNELMUTEDTICKS` | Channel muted |
| `CONDITION_YELLTICKS` | Cannot yell |
| `CONDITION_ATTRIBUTES` | Stat modifications |
| `CONDITION_FREEZING` | Ice damage over time |
| `CONDITION_DAZZLED` | Dazzled effect |
| `CONDITION_CURSED` | Cursed effect |
| `CONDITION_ROOTED` | Cannot move |
| `CONDITION_FEARED` | Fear effect |

---

## Condition IDs

| Constant | Description |
|----------|-------------|
| `CONDITIONID_DEFAULT` | Default ID |
| `CONDITIONID_COMBAT` | Combat condition |
| `CONDITIONID_HEAD` | Head slot |
| `CONDITIONID_NECKLACE` | Necklace slot |
| `CONDITIONID_BACKPACK` | Backpack slot |
| `CONDITIONID_ARMOR` | Armor slot |
| `CONDITIONID_RIGHT` | Right hand |
| `CONDITIONID_LEFT` | Left hand |
| `CONDITIONID_LEGS` | Legs slot |
| `CONDITIONID_FEET` | Feet slot |
| `CONDITIONID_RING` | Ring slot |
| `CONDITIONID_AMMO` | Ammo slot |

---

## Parameters

### `setParameter(key, value)`

| Key | Description |
|-----|-------------|
| `CONDITION_PARAM_TICKS` | Duration in milliseconds |
| `CONDITION_PARAM_HEALTHGAIN` | Health regeneration amount |
| `CONDITION_PARAM_HEALTHTICKS` | Health regen interval |
| `CONDITION_PARAM_MANAGAIN` | Mana regeneration amount |
| `CONDITION_PARAM_MANATICKS` | Mana regen interval |
| `CONDITION_PARAM_DELAYED` | Delayed effect |
| `CONDITION_PARAM_SPEED` | Speed modifier |
| `CONDITION_PARAM_LIGHT_LEVEL` | Light level |
| `CONDITION_PARAM_LIGHT_COLOR` | Light color |
| `CONDITION_PARAM_SOULGAIN` | Soul regeneration |
| `CONDITION_PARAM_SOULTICKS` | Soul regen interval |
| `CONDITION_PARAM_MINVALUE` | Minimum damage/heal |
| `CONDITION_PARAM_MAXVALUE` | Maximum damage/heal |
| `CONDITION_PARAM_STARTVALUE` | Starting value |
| `CONDITION_PARAM_TICKINTERVAL` | Tick interval |
| `CONDITION_PARAM_FORCEUPDATE` | Force update |
| `CONDITION_PARAM_SKILL_*` | Skill modifiers |
| `CONDITION_PARAM_STAT_*` | Stat modifiers |
| `CONDITION_PARAM_BUFF_SPELL` | Buff is spell |
| `CONDITION_PARAM_SUBID` | Sub-identifier |
| `CONDITION_PARAM_OWNER` | Condition owner |
| `CONDITION_PARAM_DISABLE_DEFENSE` | Disable defense |

---

## Outfit Methods

### `setOutfit(outfit)`
Set outfit for CONDITION_OUTFIT.

```lua
local condition = Condition(CONDITION_OUTFIT)
condition:setParameter(CONDITION_PARAM_TICKS, 60000)
condition:setOutfit({lookType = 130})
creature:addCondition(condition)
```

---

## Damage Formula

### `setFormula(mina, minb, maxa, maxb)`
Set damage formula for damage conditions.

```lua
local condition = Condition(CONDITION_FIRE)
condition:setParameter(CONDITION_PARAM_TICKS, 10000)
condition:setParameter(CONDITION_PARAM_TICKINTERVAL, 2000)
condition:setFormula(-1, -10, -1, -20)  -- -10 to -20 per tick
```

---

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Condition ID |
| `getSubId()` | number | Sub-identifier |
| `getType()` | number | Condition type |
| `getIcons()` | number | Client icons |
| `getEndTime()` | number | End timestamp |
| `getTicks()` | number | Remaining ticks |
| `setTicks(ticks)` | - | Set remaining ticks |
| `clone()` | Condition | Clone condition |

---

## Examples

### Haste Condition

```lua
local condition = Condition(CONDITION_HASTE)
condition:setParameter(CONDITION_PARAM_TICKS, 30000)  -- 30 seconds
condition:setParameter(CONDITION_PARAM_SPEED, 100)   -- +100 speed

player:addCondition(condition)
```

### Poison Condition

```lua
local condition = Condition(CONDITION_POISON)
condition:setParameter(CONDITION_PARAM_TICKS, 60000)  -- 60 seconds
condition:setParameter(CONDITION_PARAM_MINVALUE, 5)
condition:setParameter(CONDITION_PARAM_MAXVALUE, 10)
condition:setParameter(CONDITION_PARAM_STARTVALUE, 10)
condition:setParameter(CONDITION_PARAM_TICKINTERVAL, 4000)

creature:addCondition(condition)
```

### Regeneration Condition

```lua
local condition = Condition(CONDITION_REGENERATION)
condition:setParameter(CONDITION_PARAM_TICKS, -1)  -- Infinite
condition:setParameter(CONDITION_PARAM_HEALTHGAIN, 10)
condition:setParameter(CONDITION_PARAM_HEALTHTICKS, 1000)
condition:setParameter(CONDITION_PARAM_MANAGAIN, 5)
condition:setParameter(CONDITION_PARAM_MANATICKS, 1000)

player:addCondition(condition)
```

### Light Condition

```lua
local condition = Condition(CONDITION_LIGHT)
condition:setParameter(CONDITION_PARAM_TICKS, 600000)  -- 10 minutes
condition:setParameter(CONDITION_PARAM_LIGHT_LEVEL, 8)
condition:setParameter(CONDITION_PARAM_LIGHT_COLOR, 215)

player:addCondition(condition)
```

### Attribute Boost

```lua
local condition = Condition(CONDITION_ATTRIBUTES)
condition:setParameter(CONDITION_PARAM_TICKS, 300000)  -- 5 minutes
condition:setParameter(CONDITION_PARAM_SKILL_MELEE, 10)  -- +10 melee skills
condition:setParameter(CONDITION_PARAM_STAT_MAXHITPOINTS, 100)  -- +100 max HP

player:addCondition(condition)
```

### Paralyze Condition

```lua
local condition = Condition(CONDITION_PARALYZE)
condition:setParameter(CONDITION_PARAM_TICKS, 20000)
condition:setParameter(CONDITION_PARAM_SPEED, -50)  -- -50 speed

creature:addCondition(condition)
```

### Outfit Condition (Transform)

```lua
local condition = Condition(CONDITION_OUTFIT)
condition:setParameter(CONDITION_PARAM_TICKS, 120000)  -- 2 minutes
condition:setOutfit({lookType = 35})  -- Rat outfit

player:addCondition(condition)
```

---

## Checking Conditions

```lua
-- Check if has condition type
if creature:hasCondition(CONDITION_HASTE) then
    print("Has haste")
end

-- Get specific condition
local condition = creature:getCondition(CONDITION_POISON, CONDITIONID_COMBAT)
if condition then
    local remaining = condition:getTicks()
    print("Poison remaining: " .. remaining .. "ms")
end

-- Remove condition
creature:removeCondition(CONDITION_PARALYZE)
```

---

## Stat Parameters

| Parameter | Description |
|-----------|-------------|
| `CONDITION_PARAM_STAT_MAXHITPOINTS` | Max HP |
| `CONDITION_PARAM_STAT_MAXMANAPOINTS` | Max MP |
| `CONDITION_PARAM_STAT_MAGICPOINTS` | Magic level |
| `CONDITION_PARAM_STAT_MAXHITPOINTSPERCENT` | Max HP % |
| `CONDITION_PARAM_STAT_MAXMANAPOINTSPERCENT` | Max MP % |
| `CONDITION_PARAM_STAT_MAGICPOINTSPERCENT` | Magic % |

## Skill Parameters

| Parameter | Description |
|-----------|-------------|
| `CONDITION_PARAM_SKILL_MELEE` | All melee skills |
| `CONDITION_PARAM_SKILL_FIST` | Fist fighting |
| `CONDITION_PARAM_SKILL_CLUB` | Club fighting |
| `CONDITION_PARAM_SKILL_SWORD` | Sword fighting |
| `CONDITION_PARAM_SKILL_AXE` | Axe fighting |
| `CONDITION_PARAM_SKILL_DISTANCE` | Distance fighting |
| `CONDITION_PARAM_SKILL_SHIELD` | Shielding |
| `CONDITION_PARAM_SKILL_FISHING` | Fishing |
