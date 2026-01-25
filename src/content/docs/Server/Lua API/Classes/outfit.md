---
title: Outfit
---

# Outfit Class

The Outfit class represents creature appearances (look types).

## Constructor

```lua
Outfit(lookType)
Outfit()  -- Creates empty outfit
```

## Structure

Outfits are typically represented as tables with these fields:

| Field | Type | Description |
|-------|------|-------------|
| `lookType` | number | Base outfit ID |
| `lookTypeEx` | number | Item look ID (alternative) |
| `lookHead` | number | Head color (0-132) |
| `lookBody` | number | Body color (0-132) |
| `lookLegs` | number | Legs color (0-132) |
| `lookFeet` | number | Feet color (0-132) |
| `lookAddons` | number | Addon flags (0-3) |
| `lookMount` | number | Mount ID |

---

## Usage with Creatures

### Get Outfit

```lua
local outfit = creature:getOutfit()
print("Look type: " .. outfit.lookType)
print("Head color: " .. outfit.lookHead)
```

### Set Outfit

```lua
local outfit = {
    lookType = 130,
    lookHead = 78,
    lookBody = 69,
    lookLegs = 58,
    lookFeet = 76,
    lookAddons = 0,
    lookMount = 0
}
creature:setOutfit(outfit)
```

---

## Examples

### Change Player Outfit

```lua
local function setPlayerOutfit(player, lookType, addons)
    local outfit = player:getOutfit()
    outfit.lookType = lookType
    outfit.lookAddons = addons or 0
    player:setOutfit(outfit)
end
```

### Transform to Monster

```lua
local function transformToMonster(player, monsterName, duration)
    local monsterType = MonsterType(monsterName)
    if not monsterType then
        return false
    end
    
    local monsterOutfit = monsterType:getOutfit()
    
    local condition = Condition(CONDITION_OUTFIT)
    condition:setParameter(CONDITION_PARAM_TICKS, duration)
    condition:setOutfit(monsterOutfit)
    
    player:addCondition(condition)
    return true
end

-- Usage
transformToMonster(player, "Dragon", 60000)  -- 1 minute
```

### Copy Outfit

```lua
local function copyOutfit(source, target)
    local outfit = source:getOutfit()
    target:setOutfit(outfit)
end
```

### Random Outfit Colors

```lua
local function randomizeColors(player)
    local outfit = player:getOutfit()
    outfit.lookHead = math.random(0, 132)
    outfit.lookBody = math.random(0, 132)
    outfit.lookLegs = math.random(0, 132)
    outfit.lookFeet = math.random(0, 132)
    player:setOutfit(outfit)
end
```

### Item Look (Statue/Object)

```lua
local function transformToItem(player, itemId, duration)
    local outfit = {
        lookTypeEx = itemId
    }
    
    local condition = Condition(CONDITION_OUTFIT)
    condition:setParameter(CONDITION_PARAM_TICKS, duration)
    condition:setOutfit(outfit)
    
    player:addCondition(condition)
end

-- Transform to tree
transformToItem(player, 2700, 30000)
```

---

