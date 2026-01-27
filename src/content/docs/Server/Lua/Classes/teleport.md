---
title: Teleport
---

# Teleport Class

The Teleport class represents teleport items on the map. It inherits from Item.

## Constructor

```lua
Teleport(uid)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `uid` | number | Unique item ID |

---

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getDestination()` | Position | Get teleport destination |
| `setDestination(position)` | boolean | Set teleport destination |

---

## Examples

### Get Teleport Destination

```lua
local function getTeleportInfo(position)
    local tile = Tile(position)
    if not tile then
        return nil
    end
    
    -- Find teleport item on tile
    local items = tile:getItems()
    for _, item in ipairs(items) do
        local itemType = ItemType(item:getId())
        if itemType:getGroup() == ITEM_GROUP_TELEPORT then
            local teleport = Teleport(item:getUniqueId())
            if teleport then
                return {
                    position = position,
                    destination = teleport:getDestination()
                }
            end
        end
    end
    
    return nil
end
```

### Set Teleport Destination

```lua
local function createTeleport(position, destination)
    -- Create teleport item (ID may vary)
    local teleportItem = Game.createItem(1387, 1, position)
    if not teleportItem then
        return false
    end
    
    local teleport = Teleport(teleportItem:getUniqueId())
    if teleport then
        teleport:setDestination(destination)
        return true
    end
    
    return false
end
```

### Dynamic Teleport System

```lua
-- Change teleport destination based on time
local function updateEventTeleport(teleportPos, destinations)
    local tile = Tile(teleportPos)
    if not tile then
        return
    end
    
    local items = tile:getItems()
    for _, item in ipairs(items) do
        local teleport = Teleport(item:getUniqueId())
        if teleport then
            local hour = os.date("*t").hour
            local destIndex = (hour % #destinations) + 1
            teleport:setDestination(destinations[destIndex])
            return true
        end
    end
    
    return false
end

-- Usage
local destinations = {
    Position(1000, 1000, 7),  -- Morning destination
    Position(2000, 2000, 7),  -- Afternoon destination
    Position(3000, 3000, 7),  -- Evening destination
}

updateEventTeleport(Position(500, 500, 7), destinations)
```

### Teleport with Entry Effect

```lua
local teleportMove = MoveEvent()

function teleportMove.onStepIn(creature, item, position, fromPosition)
    local teleport = Teleport(item:getUniqueId())
    if not teleport then
        return true
    end
    
    local destination = teleport:getDestination()
    
    -- Teleport with effects
    position:sendMagicEffect(CONST_ME_TELEPORT)
    creature:teleportTo(destination)
    destination:sendMagicEffect(CONST_ME_TELEPORT)
    
    if creature:isPlayer() then
        creature:sendTextMessage(MESSAGE_INFO_DESCR, "Whoosh!")
    end
    
    return true
end

teleportMove:type("stepin")
teleportMove:id(1387)  -- Teleport item ID
teleportMove:register()
```
