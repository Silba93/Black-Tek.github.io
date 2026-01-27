---
title: Zone
---

# Zone Class

Zones are named map areas that can be queried for creatures, items, and tiles.

## Constructor

```lua
Zone(name)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | Zone name |

## Global Function

```lua
Zones()  -- Returns table of all zones
```

---

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Zone ID |
| `getCreatures()` | table | All creatures in zone |
| `getItems()` | table | All items in zone |
| `getTiles()` | table | All tiles in zone |
| `getGrounds()` | table | All ground items |
| `getCreatureCount()` | number | Number of creatures |
| `getItemCount()` | number | Number of items |
| `getTileCount()` | number | Number of tiles |

---

## Examples

### Get Zone Info

```lua
local function getZoneInfo(zoneName)
    local zone = Zone(zoneName)
    if not zone then
        return nil
    end
    
    return {
        id = zone:getId(),
        creatures = zone:getCreatureCount(),
        items = zone:getItemCount(),
        tiles = zone:getTileCount()
    }
end
```

### List All Zones

```lua
local function listZones()
    local zones = Zones()
    for _, zone in ipairs(zones) do
        print(string.format("Zone %d: %d creatures, %d items, %d tiles",
            zone:getId(),
            zone:getCreatureCount(),
            zone:getItemCount(),
            zone:getTileCount()
        ))
    end
end
```

### Get Players in Zone

```lua
local function getPlayersInZone(zoneName)
    local zone = Zone(zoneName)
    if not zone then
        return {}
    end
    
    local players = {}
    for _, creature in ipairs(zone:getCreatures()) do
        if creature:isPlayer() then
            table.insert(players, creature:getPlayer())
        end
    end
    
    return players
end
```

### Zone Event System

```lua
-- Broadcast to all players in a zone
local function zoneAnnounce(zoneName, message)
    local players = getPlayersInZone(zoneName)
    for _, player in ipairs(players) do
        player:sendTextMessage(MESSAGE_STATUS_WARNING, message)
    end
end

-- Check if position is in zone
local function isInZone(position, zoneName)
    local tile = Tile(position)
    if not tile then
        return false
    end
    
    return tile:hasZone(Zone(zoneName))
end
```

### Monster Count in Zone

```lua
local function getMonstersInZone(zoneName)
    local zone = Zone(zoneName)
    if not zone then
        return {}
    end
    
    local monsters = {}
    for _, creature in ipairs(zone:getCreatures()) do
        if creature:isMonster() then
            table.insert(monsters, creature:getMonster())
        end
    end
    
    return monsters
end

local function countMonstersByType(zoneName)
    local monsters = getMonstersInZone(zoneName)
    local counts = {}
    
    for _, monster in ipairs(monsters) do
        local name = monster:getName()
        counts[name] = (counts[name] or 0) + 1
    end
    
    return counts
end
```

### Clear Zone Items

```lua
local function clearZoneItems(zoneName, itemId)
    local zone = Zone(zoneName)
    if not zone then
        return 0
    end
    
    local removed = 0
    for _, item in ipairs(zone:getItems()) do
        if not itemId or item:getId() == itemId then
            item:remove()
            removed = removed + 1
        end
    end
    
    return removed
end
```

### Zone-Based Event

```lua
local zoneEvent = GlobalEvent("ZoneCheck")

function zoneEvent.onThink(interval)
    local arenaZone = Zone("pvp_arena")
    if not arenaZone then
        return true
    end
    
    -- Heal all players in arena every minute
    for _, creature in ipairs(arenaZone:getCreatures()) do
        if creature:isPlayer() then
            local player = creature:getPlayer()
            player:addHealth(player:getMaxHealth() * 0.1)
            player:addMana(player:getMaxMana() * 0.1)
        end
    end
    
    return true
end

zoneEvent:interval(60000)
zoneEvent:register()
```
