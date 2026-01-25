---
title: Actions
---

# Actions

Actions are events triggered when a player uses an item. This includes using items directly from inventory, using items on the ground, using items on creatures, or using items on other items.

## Overview

Actions are registered to respond to:
- **Item IDs** - Triggered when using a specific item type
- **Action IDs** - Triggered when using items with a specific action ID attribute
- **Unique IDs** - Triggered when using items with a specific unique ID attribute

## Creating an Action

### Basic Structure

```lua
local myAction = Action()

function myAction.onUse(player, item, fromPosition, target, toPosition, isHotkey)
    -- Your code here
    return true
end

myAction:id(1234)           -- Register for item ID 1234
myAction:register()
```

### Constructor

```lua
Action()
```

Creates a new Action object.

---

## Methods

### Registration Methods

#### `id(itemId)`
Registers the action for a specific item type ID.

```lua
myAction:id(2160)           -- Crystal coin
myAction:id(2148, 2152)     -- Multiple IDs: gold and platinum coins
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `itemId` | number | Item type ID |

**Note:** Can be called multiple times or with multiple arguments.

---

#### `aid(actionId)`
Registers the action for items with a specific action ID.

```lua
myAction:aid(1000)          -- Items with action ID 1000
myAction:aid(1000, 1001)    -- Multiple action IDs
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `actionId` | number | Action ID attribute |

---

#### `uid(uniqueId)`
Registers the action for items with a specific unique ID.

```lua
myAction:uid(5000)          -- Item with unique ID 5000
myAction:uid(5000, 5001)    -- Multiple unique IDs
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `uniqueId` | number | Unique ID attribute |

---

#### `register()`
Registers the action with the server.

```lua
myAction:register()
```

**Must be called after setting the callback and registration criteria.**

---

### Configuration Methods

#### `allowFarUse(allow)`
Sets whether the item can be used from a distance.

```lua
myAction:allowFarUse(true)  -- Can use from afar
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `allow` | boolean | `false` | Allow far use |

---

#### `blockWalls(block)`
Sets whether walls block the use of this item.

```lua
myAction:blockWalls(true)   -- Walls block usage
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `block` | boolean | `true` | Walls block line of sight |

---

#### `checkFloor(check)`
Sets whether floor difference blocks the use of this item.

```lua
myAction:checkFloor(false)  -- Don't check floor
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `check` | boolean | `true` | Check floor difference |

---

### Callback Methods

#### `onUse(callback)`
Sets the callback function for when the item is used.

```lua
myAction:onUse(function(player, item, fromPosition, target, toPosition, isHotkey)
    return true
end)
```

**Alternative syntax:**

```lua
function myAction.onUse(player, item, fromPosition, target, toPosition, isHotkey)
    return true
end
```

---

## Callback Parameters

The `onUse` callback receives the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | Player | The player using the item |
| `item` | Item | The item being used |
| `fromPosition` | Position | Position where the item is located |
| `target` | Thing/nil | The target of the use (creature, item, or nil) |
| `toPosition` | Position | Position of the target |
| `isHotkey` | boolean | Whether the item was used via hotkey |

### Return Value

| Return | Effect |
|--------|--------|
| `true` | Action was successful |
| `false` | Action failed (shows error message) |

---

## Examples

### Simple Item Use

```lua
-- Heal potion
local healPotion = Action()

function healPotion.onUse(player, item, fromPosition, target, toPosition, isHotkey)
    local health = math.random(100, 200)
    player:addHealth(health)
    player:say("Aaaah...", TALKTYPE_MONSTER_SAY)
    item:remove(1)
    return true
end

healPotion:id(7618)  -- Health potion ID
healPotion:register()
```

### Using Item on Target

```lua
-- Magic rope (use on rope spot)
local magicRope = Action()

function magicRope.onUse(player, item, fromPosition, target, toPosition, isHotkey)
    local tile = Tile(toPosition)
    if not tile then
        return false
    end
    
    local ropeSpot = tile:getItemById(386)  -- Rope spot ID
    if not ropeSpot then
        player:sendTextMessage(MESSAGE_STATUS_SMALL, "You cannot use this here.")
        return true
    end
    
    local newPos = Position(toPosition.x, toPosition.y + 1, toPosition.z - 1)
    player:teleportTo(newPos)
    return true
end

magicRope:id(3003)  -- Rope ID
magicRope:allowFarUse(true)
magicRope:register()
```

### Using Item on Creature

```lua
-- Poison bomb (throw at creature)
local poisonBomb = Action()

function poisonBomb.onUse(player, item, fromPosition, target, toPosition, isHotkey)
    if not target or not target:isCreature() then
        player:sendCancelMessage("You need a target.")
        return true
    end
    
    local creature = target:getCreature()
    if not creature then
        return false
    end
    
    -- Add poison condition
    local condition = Condition(CONDITION_POISON)
    condition:setParameter(CONDITION_PARAM_TICKS, 60000)
    condition:setParameter(CONDITION_PARAM_MINVALUE, 10)
    condition:setParameter(CONDITION_PARAM_MAXVALUE, 20)
    condition:setParameter(CONDITION_PARAM_TICKINTERVAL, 4000)
    creature:addCondition(condition)
    
    -- Effects
    toPosition:sendMagicEffect(CONST_ME_POISONAREA)
    item:remove(1)
    return true
end

poisonBomb:id(8922)
poisonBomb:allowFarUse(true)
poisonBomb:blockWalls(true)
poisonBomb:register()
```

### Action ID Example

```lua
-- Quest lever with action ID
local questLever = Action()

function questLever.onUse(player, item, fromPosition, target, toPosition, isHotkey)
    if player:getStorageValue(1000) == 1 then
        player:sendTextMessage(MESSAGE_INFO_DESCR, "You already completed this quest.")
        return true
    end
    
    player:setStorageValue(1000, 1)
    player:addItem(2160, 10)  -- Reward: 10 crystal coins
    player:sendTextMessage(MESSAGE_INFO_DESCR, "You received 10 crystal coins!")
    
    -- Switch lever
    if item:getId() == 1945 then
        item:transform(1946)
    else
        item:transform(1945)
    end
    
    return true
end

questLever:aid(5000)  -- Action ID set in map editor
questLever:register()
```

### Multiple IDs

```lua
-- All food items
local eatFood = Action()

function eatFood.onUse(player, item, fromPosition, target, toPosition, isHotkey)
    local foodValues = {
        [2666] = 180,  -- Meat
        [2667] = 120,  -- Fish
        [2668] = 60,   -- Salmon
        [2669] = 200,  -- Ham
    }
    
    local value = foodValues[item:getId()]
    if not value then
        return false
    end
    
    local condition = player:getCondition(CONDITION_REGENERATION, CONDITIONID_DEFAULT)
    if condition then
        local currentTicks = condition:getTicks()
        if currentTicks + value * 1000 > 1200000 then
            player:sendTextMessage(MESSAGE_STATUS_SMALL, "You are full.")
            return true
        end
    end
    
    player:feed(value * 1000)
    item:remove(1)
    return true
end

eatFood:id(2666, 2667, 2668, 2669)
eatFood:register()
```

---

## Best Practices

1. **Always return a value** - Return `true` on success, even if just to suppress default messages.

2. **Validate targets** - Check if target exists and is the expected type before using it.

3. **Use appropriate error messages** - Use `sendCancelMessage` for action failures, `sendTextMessage` for informational messages.

4. **Consider hotkey usage** - The `isHotkey` parameter lets you handle hotkey use differently if needed.

5. **Remove consumables** - Don't forget to remove consumable items after use with `item:remove(1)`.

6. **Check distances** - If using `allowFarUse(true)`, you may want to add your own distance checks.

---

## File Location

Action scripts are typically placed in:
```
data/scripts/actions/
```

Or in the legacy location:
```
data/actions/scripts/
```

With XML registration in `data/actions/actions.xml` for legacy format.
