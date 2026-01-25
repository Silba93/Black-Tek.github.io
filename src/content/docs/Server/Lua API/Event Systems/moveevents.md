---
title: Move Events
---

# Move Events

Move Events are triggered by movement-related actions: stepping on tiles, equipping items, and adding/removing items from tiles.

## Event Types

| Type | Callback | Description |
|------|----------|-------------|
| `stepin` | `onStepIn` | Creature steps onto tile |
| `stepout` | `onStepOut` | Creature steps off tile |
| `equip` | `onEquip` | Player equips item |
| `deequip` | `onDeEquip` | Player unequips item |
| `additem` | `onAddItem` | Item added to tile |
| `removeitem` | `onRemoveItem` | Item removed from tile |

---

## Creating a Move Event

```lua
local myEvent = MoveEvent()

function myEvent.onStepIn(creature, item, position, fromPosition)
    return true
end

myEvent:type("stepin")
myEvent:id(1234)
myEvent:register()
```

---

## Methods

### `type(eventType)`
Sets the event type: `"stepin"`, `"stepout"`, `"equip"`, `"deequip"`, `"additem"`, `"removeitem"`

### `id(itemId, ...)`
Registers for item type IDs.

### `aid(actionId, ...)`
Registers for action IDs.

### `uid(uniqueId, ...)`
Registers for unique IDs.

### `position(pos, ...)`
Registers for specific positions.

### `slot(slotName)`
Sets the equipment slot for equip/deequip events.

**Slots:** `"head"`, `"necklace"`, `"backpack"`, `"armor"`, `"right-hand"`, `"left-hand"`, `"legs"`, `"feet"`, `"ring"`, `"ammo"`

### `level(level)`
Sets required player level.

### `magicLevel(level)`
Sets required magic level.

### `premium(isPremium)`
Sets premium requirement.

### `vocation(vocName, showInDescription)`
Adds vocation requirement.

### `tileItem(isTileItem)`
For additem/removeitem: whether to trigger on tile items.

### `register()`
Registers the event.

---

## Callback Signatures

### `onStepIn(creature, item, position, fromPosition)`
```lua
function myEvent.onStepIn(creature, item, position, fromPosition)
    return true  -- Allow step
end
```

### `onStepOut(creature, item, position, fromPosition)`
```lua
function myEvent.onStepOut(creature, item, position, fromPosition)
    return true
end
```

### `onEquip(player, item, slot, isCheck)`
```lua
function myEvent.onEquip(player, item, slot, isCheck)
    return true  -- Allow equip
end
```

**Note:** `isCheck` is `true` when checking if item can be equipped.

### `onDeEquip(player, item, slot)`
```lua
function myEvent.onDeEquip(player, item, slot)
    return true  -- Allow deequip
end
```

### `onAddItem(moveitem, tileitem, position)`
```lua
function myEvent.onAddItem(moveitem, tileitem, position)
    return true
end
```

### `onRemoveItem(moveitem, tileitem, position)`
```lua
function myEvent.onRemoveItem(moveitem, tileitem, position)
    return true
end
```

---

## Examples

### Teleport Tile

```lua
local teleportTile = MoveEvent()

function teleportTile.onStepIn(creature, item, position, fromPosition)
    if not creature:isPlayer() then
        return true
    end
    
    local destination = Position(1000, 1000, 7)
    creature:teleportTo(destination)
    destination:sendMagicEffect(CONST_ME_TELEPORT)
    
    return true
end

teleportTile:type("stepin")
teleportTile:aid(5000)  -- Action ID for teleport tiles
teleportTile:register()
```

### Level Door

```lua
local levelDoor = MoveEvent()

function levelDoor.onStepIn(creature, item, position, fromPosition)
    if not creature:isPlayer() then
        return false
    end
    
    local requiredLevel = item:getActionId() - 1000  -- AID 1100 = level 100
    
    if creature:getLevel() < requiredLevel then
        creature:sendTextMessage(MESSAGE_STATUS_SMALL, 
            "You need level " .. requiredLevel .. " to pass.")
        creature:teleportTo(fromPosition, true)
        return false
    end
    
    return true
end

levelDoor:type("stepin")
levelDoor:aid(1001, 1050, 1100, 1150, 1200)  -- Level doors
levelDoor:register()
```

### Equipment with Level Requirement

```lua
local fireArmor = MoveEvent()

function fireArmor.onEquip(player, item, slot, isCheck)
    if player:getLevel() < 50 then
        if not isCheck then
            player:sendCancelMessage("You need level 50 to wear this armor.")
        end
        return false
    end
    
    if not isCheck then
        player:sendTextMessage(MESSAGE_INFO_DESCR, "Fire protection activated!")
    end
    
    return true
end

function fireArmor.onDeEquip(player, item, slot)
    player:sendTextMessage(MESSAGE_INFO_DESCR, "Fire protection deactivated!")
    return true
end

fireArmor:type("equip")
fireArmor:id(2494)  -- Fire armor
fireArmor:level(50)
fireArmor:slot("armor")
fireArmor:register()
```

### Vocation-Restricted Equipment

```lua
local mageRobe = MoveEvent()

function mageRobe.onEquip(player, item, slot, isCheck)
    return true
end

mageRobe:type("equip")
mageRobe:id(2656)
mageRobe:slot("armor")
mageRobe:level(20)
mageRobe:vocation("sorcerer", true)
mageRobe:vocation("master sorcerer", true)
mageRobe:vocation("druid", true)
mageRobe:vocation("elder druid", true)
mageRobe:register()
```

### Damage Tile

```lua
local fireTile = MoveEvent()

function fireTile.onStepIn(creature, item, position, fromPosition)
    if creature:isPlayer() then
        local damage = math.random(10, 50)
        doTargetCombat(nil, creature, COMBAT_FIREDAMAGE, -damage, -damage, CONST_ME_HITBYFIRE)
    end
    return true
end

fireTile:type("stepin")
fireTile:id(1487, 1488, 1489)  -- Fire field IDs
fireTile:register()
```

---

## Return Values

| Return | Equip/DeEquip | StepIn/StepOut |
|--------|---------------|----------------|
| `true` | Allow action | Allow step |
| `false` | Deny action | Push back creature |

---

## File Location

```
data/scripts/movements/
```
