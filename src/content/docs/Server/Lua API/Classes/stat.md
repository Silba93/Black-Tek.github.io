---
title: Stat
---

# Stat Class

The Stat class represents custom point-based statistics with current/max values and support for modifiers.

## Constructor

```lua
Stat(id, maxPoints, currentPoints, proportionalScaling)
Stat(id, existingStat)  -- Deep copy from another stat
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | number | Required | Unique stat identifier |
| `maxPoints` | number | Required | Maximum value |
| `currentPoints` | number | maxPoints | Current value |
| `proportionalScaling` | boolean | true | Scale current when max changes |

```lua
-- Create a stat with ID 1, max 100, current 100
local health = Stat(1, 100, 100)

-- Create a stat with ID 2, max 50, current 25
local mana = Stat(2, 50, 25)

-- Deep copy an existing stat
local healthCopy = Stat(1, health)
```

### Using Constants for Stat IDs

Since stats use numeric IDs, define constants for readability:

```lua
-- Define stat ID constants
STAT_HUNGER = 1
STAT_THIRST = 2
STAT_STAMINA = 3
STAT_REPUTATION = 4

-- Use constants when creating stats
local hunger = Stat(STAT_HUNGER, 100, 100)
local thirst = Stat(STAT_THIRST, 100, 100)
```

---

## Methods

### Identity

| Method | Returns | Description |
|--------|---------|-------------|
| `id()` | number | Get stat ID |

### Values

| Method | Returns | Description |
|--------|---------|-------------|
| `value()` | number | Get current value |
| `max()` | number | Get maximum value |
| `baseMax()` | number | Get base max (before modifiers) |

### Modification

| Method | Returns | Description |
|--------|---------|-------------|
| `increase(amount)` | boolean | Increase current value |
| `decrease(amount)` | boolean | Decrease current value |
| `increaseMax(amount)` | boolean | Increase maximum value |
| `decreaseMax(amount)` | boolean | Decrease maximum value |

### Modifiers

| Method | Returns | Description |
|--------|---------|-------------|
| `addModifier(modifier)` | boolean | Add a stat modifier |
| `removeModifier(modifier)` | boolean | Remove a stat modifier |

---

## Examples

### Basic Usage

```lua
STAT_ENERGY = 1

local energy = Stat(STAT_ENERGY, 100, 100)

print("ID: " .. energy:id())           -- 1
print("Current: " .. energy:value())   -- 100
print("Max: " .. energy:max())         -- 100

energy:decrease(30)
print("After decrease: " .. energy:value())  -- 70

energy:increase(10)
print("After increase: " .. energy:value())  -- 80
```

### Modifying Maximum

```lua
local stat = Stat(1, 100, 100)

stat:increaseMax(50)
print("New max: " .. stat:max())  -- 150

stat:decreaseMax(25)
print("New max: " .. stat:max())  -- 125
```

---

# StatModifier Class

StatModifiers alter how stat values are calculated.

## Constructor

```lua
StatModifier(type, value)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | number | Modifier type constant |
| `value` | number | Modifier value |

## Modifier Types

| Constant | Value | Description |
|----------|-------|-------------|
| `STAT_MOD_NONE` | 0 | No modification |
| `STAT_MOD_MULTIPLY` | 1 | Multiply value |
| `STAT_MOD_DIVIDE` | 2 | Divide value |
| `STAT_MOD_ADD` | 3 | Add flat value |
| `STAT_MOD_SUBTRACT` | 4 | Subtract flat value |

**Note:** Define these constants in your Lua scripts:
```lua
STAT_MOD_NONE = 0
STAT_MOD_MULTIPLY = 1
STAT_MOD_DIVIDE = 2
STAT_MOD_ADD = 3
STAT_MOD_SUBTRACT = 4
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `type()` | number | Get modifier type |
| `type(newType)` | boolean | Set modifier type |
| `value()` | number | Get modifier value |
| `value(newValue)` | boolean | Set modifier value |

## Example

```lua
-- Create a +25 flat bonus modifier
local bonusModifier = StatModifier(STAT_MOD_ADD, 25)

-- Create a 50% increase modifier (multiply by 1.5)
local percentModifier = StatModifier(STAT_MOD_MULTIPLY, 150)  -- 150%

-- Add modifier to stat
local stat = Stat(1, 100, 100)
stat:addModifier(bonusModifier)

-- Remove modifier
stat:removeModifier(bonusModifier)
```

---

# Creature Stat Methods

Creatures (Players, Monsters, NPCs) can have stats attached to them.

| Method | Returns | Description |
|--------|---------|-------------|
| `creature:giveStat(id, maxPoints, currentPoints)` | boolean | Give stat to creature |
| `creature:giveStat(id, stat)` | boolean | Give stat (copy from existing) |
| `creature:removeStat(id)` | boolean | Remove stat by ID |
| `creature:hasStat(id)` | boolean | Check if has stat |
| `creature:getStat(id)` | Stat | Get stat by ID |
| `creature:getStats()` | table | Get all stats |

## Examples

### Initialize Player Stats

```lua
-- Stat ID constants
STAT_HUNGER = 1
STAT_THIRST = 2
STAT_ENERGY = 3

local function initializeStats(player)
    if not player:hasStat(STAT_HUNGER) then
        player:giveStat(STAT_HUNGER, 100, 100)
    end
    if not player:hasStat(STAT_THIRST) then
        player:giveStat(STAT_THIRST, 100, 100)
    end
    if not player:hasStat(STAT_ENERGY) then
        player:giveStat(STAT_ENERGY, 100, 100)
    end
end
```

### Modify Player Stat

```lua
local function decreaseHunger(player, amount)
    if not player:hasStat(STAT_HUNGER) then
        return false
    end
    
    local hunger = player:getStat(STAT_HUNGER)
    hunger:decrease(amount)
    
    if hunger:value() <= 0 then
        player:sendTextMessage(MESSAGE_STATUS_WARNING, "You are starving!")
        player:addHealth(-10)
    end
    
    return true
end
```

### Display All Stats

```lua
local function showStats(player)
    local stats = player:getStats()
    
    for id, stat in pairs(stats) do
        player:sendTextMessage(MESSAGE_INFO_DESCR,
            string.format("Stat %d: %d / %d", 
                stat:id(), 
                stat:value(), 
                stat:max()
            )
        )
    end
end
```

---

# Item Stat Methods

Items can also have stats attached.

| Method | Returns | Description |
|--------|---------|-------------|
| `item:giveStat(id, maxPoints, currentPoints)` | boolean | Give stat to item |
| `item:giveStat(id, stat)` | boolean | Give stat (copy) |
| `item:removeStat(id)` | boolean | Remove stat by ID |
| `item:hasStat(id)` | boolean | Check if has stat |
| `item:getStat(id)` | Stat | Get stat by ID |
| `item:getStats()` | table | Get all stats |

## Example: Item Durability

```lua
STAT_DURABILITY = 100

local function initItemDurability(item, maxDurability)
    if not item:hasStat(STAT_DURABILITY) then
        item:giveStat(STAT_DURABILITY, maxDurability, maxDurability)
    end
end

local function damageItem(item, amount)
    if not item:hasStat(STAT_DURABILITY) then
        return
    end
    
    local durability = item:getStat(STAT_DURABILITY)
    durability:decrease(amount)
    
    if durability:value() <= 0 then
        item:remove()
        return true  -- Item broke
    end
    
    return false
end

local function repairItem(item, amount)
    if not item:hasStat(STAT_DURABILITY) then
        return false
    end
    
    local durability = item:getStat(STAT_DURABILITY)
    durability:increase(amount)
    return true
end
```

---

## Complete Example: Survival System

```lua
-- Stat IDs
STAT_HUNGER = 1
STAT_THIRST = 2
STAT_FATIGUE = 3

-- Modifier types
STAT_MOD_ADD = 3
STAT_MOD_SUBTRACT = 4

-- Initialize on login
local loginEvent = CreatureEvent("SurvivalLogin")

function loginEvent.onLogin(player)
    -- Initialize stats if not present
    if not player:hasStat(STAT_HUNGER) then
        player:giveStat(STAT_HUNGER, 100, 100)
    end
    if not player:hasStat(STAT_THIRST) then
        player:giveStat(STAT_THIRST, 100, 100)
    end
    if not player:hasStat(STAT_FATIGUE) then
        player:giveStat(STAT_FATIGUE, 100, 100)
    end
    return true
end

loginEvent:register()

-- Decrease stats over time
local survivalTick = GlobalEvent("SurvivalTick")

function survivalTick.onThink(interval)
    for _, player in ipairs(Game.getPlayers()) do
        -- Decrease hunger
        if player:hasStat(STAT_HUNGER) then
            local hunger = player:getStat(STAT_HUNGER)
            hunger:decrease(1)
            
            if hunger:value() <= 20 then
                player:sendTextMessage(MESSAGE_STATUS_WARNING, "You are getting hungry!")
            end
            if hunger:value() <= 0 then
                player:addHealth(-5)
            end
        end
        
        -- Decrease thirst
        if player:hasStat(STAT_THIRST) then
            local thirst = player:getStat(STAT_THIRST)
            thirst:decrease(2)
            
            if thirst:value() <= 20 then
                player:sendTextMessage(MESSAGE_STATUS_WARNING, "You are getting thirsty!")
            end
            if thirst:value() <= 0 then
                player:addHealth(-10)
            end
        end
    end
    return true
end

survivalTick:interval(60000)  -- Every minute
survivalTick:register()

-- Food action to restore hunger
local eatFood = Action()

function eatFood.onUse(player, item, fromPosition, target, toPosition, isHotkey)
    if not player:hasStat(STAT_HUNGER) then
        return false
    end
    
    local hunger = player:getStat(STAT_HUNGER)
    
    if hunger:value() >= hunger:max() then
        player:sendCancelMessage("You are not hungry.")
        return true
    end
    
    hunger:increase(25)
    item:remove(1)
    player:sendTextMessage(MESSAGE_INFO_DESCR, "You eat the food and feel less hungry.")
    
    return true
end

eatFood:id(2666)  -- Meat
eatFood:register()
```
