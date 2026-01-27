---
title: Game
---

# Game Class

The Game class provides global functions for interacting with the game world. Unlike other classes, Game methods are called statically (e.g., `Game.getPlayers()`).

## Player & Creature Access

| Method | Returns | Description |
|--------|---------|-------------|
| `Game.getPlayers()` | table | All online players |
| `Game.getPlayerCount()` | number | Online player count |
| `Game.getMonsters()` | table | All monsters |
| `Game.getMonsterCount()` | number | Monster count |
| `Game.getNpcs()` | table | All NPCs |
| `Game.getNpcCount()` | number | NPC count |
| `Game.getSpectators(pos, multifloor, onlyPlayers, minX, maxX, minY, maxY)` | table | Creatures in area |

```lua
-- Get all players
for _, player in ipairs(Game.getPlayers()) do
    player:sendTextMessage(MESSAGE_STATUS_WARNING, "Server message!")
end

-- Get spectators in 7x7 area
local spectators = Game.getSpectators(position, false, false, 3, 3, 3, 3)
```

---

## Creation Functions

| Method | Returns | Description |
|--------|---------|-------------|
| `Game.createItem(itemId, count, position)` | Item | Create item on map |
| `Game.createContainer(itemId, size, position)` | Container | Create container |
| `Game.createMonster(name, position, extended, force)` | Monster | Spawn monster |
| `Game.createNpc(name, position, extended, force)` | Npc | Spawn NPC |
| `Game.createTile(position, isDynamic)` | Tile | Create map tile |
| `Game.createMonsterType(name)` | MonsterType | Create monster type |

```lua
-- Create item
local item = Game.createItem(2160, 10, Position(1000, 1000, 7))

-- Spawn monster
local monster = Game.createMonster("Dragon", Position(1000, 1000, 7), true, true)
```

---

## Game State

| Method | Returns | Description |
|--------|---------|-------------|
| `Game.getGameState()` | number | Current game state |
| `Game.setGameState(state)` | - | Set game state |
| `Game.getWorldType()` | number | World type (PvP/no-PvP) |
| `Game.setWorldType(type)` | - | Set world type |

**Game States:**
- `GAME_STATE_STARTUP` (0)
- `GAME_STATE_INIT` (1)
- `GAME_STATE_NORMAL` (2)
- `GAME_STATE_CLOSED` (3)
- `GAME_STATE_SHUTDOWN` (4)
- `GAME_STATE_CLOSING` (5)
- `GAME_STATE_MAINTAIN` (6)

**World Types:**
- `WORLD_TYPE_NO_PVP` (1)
- `WORLD_TYPE_PVP` (2)
- `WORLD_TYPE_PVP_ENFORCED` (3)

---

## Data Access

| Method | Returns | Description |
|--------|---------|-------------|
| `Game.getTowns()` | table | All towns |
| `Game.getHouses()` | table | All houses |
| `Game.getOutfits(sex)` | table | Available outfits |
| `Game.getMounts()` | table | Available mounts |
| `Game.getVocations()` | table | All vocations |
| `Game.getMonsterTypes()` | table | All monster types |
| `Game.getCurrencyItems()` | table | Currency items |

```lua
-- List all towns
for _, town in ipairs(Game.getTowns()) do
    print(town:getName())
end
```

---

## Experience & Level

| Method | Returns | Description |
|--------|---------|-------------|
| `Game.getExperienceStage(level)` | number | Experience multiplier for level |
| `Game.getExperienceForLevel(level)` | number | Total exp needed for level |

```lua
local expNeeded = Game.getExperienceForLevel(100)
print("Exp for level 100: " .. expNeeded)
```

---

## Storage

| Method | Returns | Description |
|--------|---------|-------------|
| `Game.getAccountStorageValue(accountId, key)` | number | Account storage value |
| `Game.setAccountStorageValue(accountId, key, value)` | - | Set account storage |
| `Game.saveAccountStorageValues()` | - | Force save storage |

---

## Utility

| Method | Returns | Description |
|--------|---------|-------------|
| `Game.getItemAttributeByName(name)` | number | Item attribute type |
| `Game.getReturnMessage(returnValue)` | string | Error message for return value |
| `Game.getClientVersion()` | table | Client version info |
| `Game.reload(reloadType)` | boolean | Reload game data |
| `Game.startRaid(raidName)` | boolean | Start a raid |
| `Game.loadMap(path)` | - | Load additional map |

**Reload Types:**
- `RELOAD_TYPE_ALL`
- `RELOAD_TYPE_ACTIONS`
- `RELOAD_TYPE_MONSTERS`
- `RELOAD_TYPE_NPCS`
- `RELOAD_TYPE_SPELLS`
- etc.

```lua
-- Reload monsters
Game.reload(RELOAD_TYPE_MONSTERS)

-- Start raid
Game.startRaid("dragon_raid")
```

---

## Discord Integration

| Method | Description |
|--------|-------------|
| `Game.sendDiscordMessage(webhookUrl, message)` | Send Discord webhook |

```lua
Game.sendDiscordMessage(
    "https://discord.com/api/webhooks/...",
    "Server event started!"
)
```

---

## Examples

### Broadcast Message

```lua
local function broadcastMessage(message)
    for _, player in ipairs(Game.getPlayers()) do
        player:sendTextMessage(MESSAGE_STATUS_WARNING, message)
    end
end
```

### Find Player by Name

```lua
local function findPlayer(name)
    for _, player in ipairs(Game.getPlayers()) do
        if player:getName():lower() == name:lower() then
            return player
        end
    end
    return nil
end
```

### Spawn Wave of Monsters

```lua
local function spawnWave(centerPos, monsterName, count, radius)
    for i = 1, count do
        local x = centerPos.x + math.random(-radius, radius)
        local y = centerPos.y + math.random(-radius, radius)
        Game.createMonster(monsterName, Position(x, y, centerPos.z), true, true)
    end
end
```
