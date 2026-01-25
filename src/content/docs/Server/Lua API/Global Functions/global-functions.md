---
title: Global Functions
---

# Global Functions

BlackTek Server provides numerous global functions that can be called from anywhere in Lua scripts.

## Event Scheduling

### `addEvent(callback, delay, ...)`
Schedule a function to run after a delay.

```lua
local eventId = addEvent(function(param1, param2)
    print(param1, param2)
end, 5000, "Hello", "World")
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | function | Function to execute |
| `delay` | number | Delay in milliseconds |
| `...` | any | Parameters passed to callback |

**Returns:** Event ID

### `stopEvent(eventId)`
Cancel a scheduled event.

```lua
local eventId = addEvent(myFunction, 5000)
stopEvent(eventId)  -- Cancel before it runs
```

---

## Combat Functions

### `doTargetCombat(caster, target, combatType, min, max, effect, origin)`
Deal damage to a target.

```lua
doTargetCombat(player, target, COMBAT_PHYSICALDAMAGE, -100, -200, CONST_ME_HITAREA)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `caster` | Creature/nil | Damage source |
| `target` | Creature | Damage target |
| `combatType` | number | COMBAT_* type |
| `min` | number | Minimum damage (negative) |
| `max` | number | Maximum damage (negative) |
| `effect` | number | CONST_ME_* effect |
| `origin` | number | Combat origin (optional) |

### `doAreaCombat(caster, combatType, pos, area, min, max, effect, origin)`
Deal area damage.

```lua
local area = createCombatArea({{1,1,1},{1,3,1},{1,1,1}})
doAreaCombat(player, COMBAT_FIREDAMAGE, targetPos, area, -50, -100, CONST_ME_FIREAREA)
```

---

## Area Creation

### `createCombatArea(matrix)`
Create a combat area from a matrix.

```lua
local area = createCombatArea({
    {0, 1, 0},
    {1, 3, 1},  -- 3 = center
    {0, 1, 0}
})
```

**Matrix values:**
- `0` = No effect
- `1` = Effect area
- `2` = Alternative area  
- `3` = Center point

---

## Database Functions

### `db.query(query)`
Execute a database query.

```lua
db.query("UPDATE players SET level = 100 WHERE name = 'Admin'")
```

### `db.storeQuery(query)`
Execute a query and store results.

```lua
local result = db.storeQuery("SELECT * FROM players WHERE level > 100")
if result then
    repeat
        local name = result:getString("name")
        local level = result:getNumber("level")
        print(name, level)
    until not result:next()
    result:free()
end
```

### `db.escapeString(string)`
Escape a string for SQL.

```lua
local safeName = db.escapeString(playerName)
db.query("SELECT * FROM players WHERE name = " .. safeName)
```

### `db.escapeBlob(data, length)`
Escape binary data for SQL.

### `db.lastInsertId()`
Get the last auto-increment ID.

### `db.tableExists(tableName)`
Check if a table exists.

```lua
if db.tableExists("custom_table") then
    -- Table exists
end
```

---

## Configuration Functions

### `configManager.getString(key)`
Get string config value.

```lua
local serverName = configManager.getString(configKeys.SERVER_NAME)
```

### `configManager.getNumber(key)`
Get number config value.

```lua
local maxPlayers = configManager.getNumber(configKeys.MAX_PLAYERS)
```

### `configManager.getBoolean(key)`
Get boolean config value.

```lua
local freePremium = configManager.getBoolean(configKeys.FREE_PREMIUM)
```

### Common Config Keys

| Key | Description |
|-----|-------------|
| `configKeys.SERVER_NAME` | Server name |
| `configKeys.IP` | Server IP |
| `configKeys.LOGIN_PORT` | Login port |
| `configKeys.GAME_PORT` | Game port |
| `configKeys.MAX_PLAYERS` | Max players |
| `configKeys.RATE_EXP` | Experience rate |
| `configKeys.RATE_SKILL` | Skill rate |
| `configKeys.RATE_LOOT` | Loot rate |
| `configKeys.RATE_MAGIC` | Magic rate |
| `configKeys.FREE_PREMIUM` | Free premium |
| `configKeys.PROTECTION_LEVEL` | PvP protection level |
| `configKeys.HOUSE_PRICE` | House price per SQM |

---

## Output Functions

### `print(...)`
Print to console.

```lua
print("Server started!")
print("Player:", player:getName(), "Level:", player:getLevel())
```

### `debugPrint(message)`
Print debug message (if enabled in config).

---

## Type Checking

### `isType(value, typeName)`
Check if value is a specific type.

```lua
if isType(thing, "Player") then
    -- It's a player
end
```

### Type functions

| Function | Description |
|----------|-------------|
| `isPlayer(thing)` | Is a Player |
| `isCreature(thing)` | Is a Creature |
| `isContainer(thing)` | Is a Container |
| `isMonster(thing)` | Is a Monster |
| `isNpc(thing)` | Is an NPC |
| `isTile(thing)` | Is a Tile |
| `isItem(thing)` | Is an Item |

---

## Table Utilities

### `table.create(narr, nrec)`
Create a table with pre-allocated space.

```lua
local t = table.create(100, 0)  -- Array with 100 slots
```

### `table.pack(...)`
Pack values into a table.

```lua
local t = table.pack(1, 2, 3)  -- {1, 2, 3, n=3}
```

---

## String Utilities

### `string:split(separator)`
Split string by separator.

```lua
local parts = "a,b,c":split(",")  -- {"a", "b", "c"}
```

### `string:trim()`
Remove leading/trailing whitespace.

```lua
local clean = "  hello  ":trim()  -- "hello"
```

---

## Math Utilities

### `math.random(min, max)`
Random number in range.

```lua
local roll = math.random(1, 100)
```

---

## Time Functions

### `os.time()`
Current Unix timestamp.

### `os.date(format, time)`
Format a timestamp.

```lua
local dateStr = os.date("%Y-%m-%d %H:%M:%S", os.time())
```

### `os.mtime()`
Current time in milliseconds.

---

## Useful Patterns

### Delayed Message

```lua
local function sendDelayedMessage(player, message, delay)
    local playerId = player:getId()
    addEvent(function()
        local p = Player(playerId)
        if p then
            p:sendTextMessage(MESSAGE_INFO_DESCR, message)
        end
    end, delay)
end
```

### Repeat Event

```lua
local function repeatEvent(callback, interval, times)
    local count = 0
    local function tick()
        callback()
        count = count + 1
        if count < times then
            addEvent(tick, interval)
        end
    end
    tick()
end
```

### Safe Database Query

```lua
local function safeQuery(query)
    local success, result = pcall(db.query, query)
    if not success then
        print("DB Error: " .. tostring(result))
        return false
    end
    return result
end
```
