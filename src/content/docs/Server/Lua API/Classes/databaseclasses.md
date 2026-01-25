---
title: DBInsert, DBTransaction
---

# Database Classes

BlackTek Server provides Lua classes for efficient database operations.

---

## DBInsert Class

DBInsert is used for efficient batch insertion of multiple rows.

### Constructor

```lua
DBInsert(query)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | INSERT query with placeholders |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `addRow(values)` | boolean | Add a row to the batch |
| `execute()` | boolean | Execute all pending inserts |

### Example

```lua
-- Batch insert player kills
local insert = DBInsert("INSERT INTO `player_kills` (`player_id`, `target_id`, `time`) VALUES ")

for _, kill in ipairs(kills) do
    insert:addRow(string.format("(%d, %d, %d)", 
        kill.playerId, 
        kill.targetId, 
        os.time()
    ))
end

insert:execute()
```

### Practical Example: Logging System

```lua
local function logPlayerActions(actions)
    local insert = DBInsert(
        "INSERT INTO `player_actions` (`player_id`, `action`, `timestamp`, `data`) VALUES "
    )
    
    for _, action in ipairs(actions) do
        insert:addRow(string.format("(%d, %s, %d, %s)",
            action.playerId,
            db.escapeString(action.type),
            action.time,
            db.escapeString(action.data or "")
        ))
    end
    
    return insert:execute()
end
```

---

## DBTransaction Class

DBTransaction provides atomic database operations with commit/rollback support.

### Constructor

```lua
DBTransaction()
```

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `begin()` | boolean | Start transaction |
| `commit()` | boolean | Commit changes |
| `rollback()` | boolean | Rollback changes |

### Example

```lua
local transaction = DBTransaction()

transaction:begin()

local success = true

-- Perform multiple operations
success = success and db.query("UPDATE accounts SET coins = coins - 100 WHERE id = 1")
success = success and db.query("UPDATE accounts SET coins = coins + 100 WHERE id = 2")

if success then
    transaction:commit()
    print("Transfer complete!")
else
    transaction:rollback()
    print("Transfer failed, rolled back.")
end
```

### Practical Example: Item Transfer

```lua
local function transferItems(fromPlayerId, toPlayerId, items)
    local transaction = DBTransaction()
    transaction:begin()
    
    local success = true
    
    for _, item in ipairs(items) do
        -- Remove from source
        success = success and db.query(string.format(
            "DELETE FROM player_items WHERE player_id = %d AND itemtype = %d LIMIT 1",
            fromPlayerId, item.id
        ))
        
        -- Add to destination
        success = success and db.query(string.format(
            "INSERT INTO player_items (player_id, itemtype, count) VALUES (%d, %d, %d)",
            toPlayerId, item.id, item.count
        ))
    end
    
    if success then
        transaction:commit()
        return true
    else
        transaction:rollback()
        return false
    end
end
```

### Safe Transaction Wrapper

```lua
local function safeTransaction(operations)
    local transaction = DBTransaction()
    transaction:begin()
    
    local success, error = pcall(function()
        for _, op in ipairs(operations) do
            if not db.query(op) then
                error("Query failed: " .. op)
            end
        end
    end)
    
    if success then
        transaction:commit()
        return true
    else
        transaction:rollback()
        print("Transaction failed: " .. tostring(error))
        return false
    end
end

-- Usage
safeTransaction({
    "UPDATE players SET level = level + 1 WHERE id = 1",
    "INSERT INTO player_achievements (player_id, achievement) VALUES (1, 'level_up')",
})
```

---

## db Global Functions

In addition to the classes above, these global database functions are available:

| Function | Returns | Description |
|----------|---------|-------------|
| `db.query(query)` | boolean | Execute a query |
| `db.storeQuery(query)` | Result | Execute and return results |
| `db.escapeString(str)` | string | Escape string for SQL |
| `db.escapeBlob(data, len)` | string | Escape binary data |
| `db.lastInsertId()` | number | Last auto-increment ID |
| `db.tableExists(name)` | boolean | Check if table exists |

### Query Result Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `result:getNumber(column)` | number | Get number value |
| `result:getString(column)` | string | Get string value |
| `result:getStream(column)` | string | Get binary data |
| `result:next()` | boolean | Move to next row |
| `result:free()` | - | Free result memory |

### Example: Reading Data

```lua
local result = db.storeQuery("SELECT id, name, level FROM players WHERE level > 100")

if result then
    repeat
        local id = result:getNumber("id")
        local name = result:getString("name")
        local level = result:getNumber("level")
        print(string.format("Player %s (ID: %d) - Level %d", name, id, level))
    until not result:next()
    result:free()
end
```
