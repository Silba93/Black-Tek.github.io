---
title: Stat
---

## Stat Class

Stats are custom point based attributes with current/max values and a system in place for handling stacks of different modifiers of the same and different types (multiplier, divider, adder, subtractor)

### Constructor

```lua
Stat(name)
```

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `id()` | number | Stat ID |
| `value()` | number | Current value |
| `max()` | number | Maximum value |
| `baseMax()` | number | Base maximum (no modifiers) |
| `increase(amount)` | - | Increase current value |
| `decrease(amount)` | - | Decrease current value |
| `increaseMax(amount)` | - | Increase maximum |
| `decreaseMax(amount)` | - | Decrease maximum |
| `addModifier(modifier)` | - | Add a stat modifier |
| `removeModifier(modifier)` | - | Remove a stat modifier |

---

## Giving Stats to Creatures/Items

### Creature Methods

```lua
-- Give a new stat
creature:giveStat(statName, params)

-- Remove stat
creature:removeStat(statName)

-- Increase/decrease stat
creature:increaseStat(statName, value)
creature:decreaseStat(statName, value)

-- Check if has stat
creature:hasStat(statName)  -- returns boolean

-- Get stat object
creature:getStat(statName)  -- returns Stat

-- Get all stats
creature:getStats()  -- returns table
```

### Item Methods

```lua
item:giveStat(statName, params)
item:removeStat(statName)
item:increaseStat(statName, value)
item:decreaseStat(statName, value)
item:hasStat(statName)
item:getStat(statName)
item:getStats()
```

---

## Stat Parameters

```lua
creature:giveStat("Hunger", {
    value = 100,      -- Current value
    max = 100,        -- Maximum value
    baseMax = 100     -- Base max before modifiers
})
```

---

## Examples

### Hunger System

```lua
-- Initialize hunger stat
local function initHunger(player)
    if not player:hasStat("Hunger") then
        player:giveStat("Hunger", {
            value = 100,
            max = 100
        })
    end
end

-- Decrease hunger over time
local hungerEvent = GlobalEvent("HungerTick")

function hungerEvent.onThink(interval)
    for _, player in ipairs(Game.getPlayers()) do
        if player:hasStat("Hunger") then
            player:decreaseStat("Hunger", 1)
            
            local stat = player:getStat("Hunger")
            if stat and stat:value() <= 0 then
                player:addHealth(-10)
                player:sendTextMessage(MESSAGE_STATUS_WARNING, "You are starving!")
            end
        end
    end
    return true
end

hungerEvent:interval(60000)  -- Every minute
hungerEvent:register()
```

### Food Item to Restore Hunger

```lua
local eatFood = Action()

function eatFood.onUse(player, item, fromPosition, target, toPosition, isHotkey)
    if not player:hasStat("Hunger") then
        return false
    end
    
    local stat = player:getStat("Hunger")
    local current = stat:value()
    local max = stat:max()
    
    if current >= max then
        player:sendCancelMessage("You are not hungry.")
        return true
    end
    
    player:increaseStat("Hunger", 25)
    item:remove(1)
    player:sendTextMessage(MESSAGE_INFO_DESCR, "You eat the food.")
    
    return true
end

eatFood:id(2666)  -- Meat
eatFood:register()
```

### Stamina-Like Custom Stat

```lua
local function initCustomStamina(player)
    player:giveStat("BattleStamina", {
        value = 1000,
        max = 1000
    })
end

local function useBattleStamina(player, amount)
    if not player:hasStat("BattleStamina") then
        return false
    end
    
    local stat = player:getStat("BattleStamina")
    if stat:value() < amount then
        return false
    end
    
    player:decreaseStat("BattleStamina", amount)
    return true
end
```
