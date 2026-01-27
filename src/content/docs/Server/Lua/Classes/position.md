---
title: Position
---

# Position Class

The Position class represents a coordinate in the game world (x, y, z).

## Constructor

```lua
Position(x, y, z)
Position(table)
```

```lua
local pos = Position(1000, 1000, 7)
local pos2 = Position({x = 1000, y = 1000, z = 7})
```

---

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `x` | number | X coordinate |
| `y` | number | Y coordinate |
| `z` | number | Z coordinate (floor) |

---

## Operators

| Operator | Description |
|----------|-------------|
| `pos1 + pos2` | Add positions |
| `pos1 - pos2` | Subtract positions |
| `pos1 == pos2` | Compare positions |

```lua
local offset = Position(1, 0, 0)
local newPos = position + offset  -- Move east
```

---

## Methods

### `getDistance(position)`
Get distance to another position.

```lua
local dist = pos1:getDistance(pos2)
```

### `isSightClear(position, sameFloor)`
Check if line of sight is clear.

```lua
if pos1:isSightClear(pos2, true) then
    -- Can see target
end
```

### `sendMagicEffect(effect, player)`
Send magic effect at position.

```lua
position:sendMagicEffect(CONST_ME_TELEPORT)
position:sendMagicEffect(CONST_ME_MAGIC_BLUE, player)  -- Only to player
```

### `sendDistanceEffect(position, effect)`
Send distance effect from this position to target.

```lua
casterPos:sendDistanceEffect(targetPos, CONST_ANI_FIRE)
```

### `getZones()`
Get zones at position.

### `hasZone(zone)`
Check if position has zone.

---

## Examples

### Get Direction

```lua
local function getDirection(from, to)
    local dx = to.x - from.x
    local dy = to.y - from.y
    
    if math.abs(dx) > math.abs(dy) then
        return dx > 0 and DIRECTION_EAST or DIRECTION_WEST
    else
        return dy > 0 and DIRECTION_SOUTH or DIRECTION_NORTH
    end
end
```

### Get Surrounding Positions

```lua
local function getSurrounding(pos)
    local positions = {}
    for x = -1, 1 do
        for y = -1, 1 do
            if x ~= 0 or y ~= 0 then
                table.insert(positions, Position(pos.x + x, pos.y + y, pos.z))
            end
        end
    end
    return positions
end
```

### Random Position in Area

```lua
local function randomPosition(center, radius)
    return Position(
        center.x + math.random(-radius, radius),
        center.y + math.random(-radius, radius),
        center.z
    )
end
```

### Convert to String

```lua
local function posToString(pos)
    return string.format("X: %d, Y: %d, Z: %d", pos.x, pos.y, pos.z)
end
```
