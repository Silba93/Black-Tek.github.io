---
title: Town
---

# Town Class

The Town class represents towns where players can set their home.

## Constructor

```lua
Town(id)
Town(name)
```

---

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Town ID |
| `getName()` | string | Town name |
| `getTemplePosition()` | Position | Temple position |

```lua
local town = Town("Thais")
if town then
    print("Temple: " .. town:getTemplePosition().x)
end

-- Set player's town
player:setTown(town)

-- Teleport to temple
player:teleportTo(town:getTemplePosition())
```

---