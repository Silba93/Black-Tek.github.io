---
title: XMLDocument, XMLNode
---

# XML Classes

BlackTek Server provides classes for parsing XML files in Lua scripts.

---

## XMLDocument Class

XMLDocument loads and parses XML files.

### Constructor

```lua
XMLDocument(filepath)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `filepath` | string | Path to XML file |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `child(name)` | XMLNode | Get root/named child node |
| `delete()` | - | Free document memory |

### Example

```lua
local doc = XMLDocument("data/monsters/dragons/dragon.xml")
if doc then
    local root = doc:child("monster")
    if root then
        local name = root:attribute("name")
        print("Monster: " .. name)
    end
    doc:delete()
end
```

---

## XMLNode Class

XMLNode represents a node/element in an XML document.

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `attribute(name)` | string | Get attribute value |
| `name()` | string | Get node name |
| `firstChild()` | XMLNode | Get first child node |
| `nextSibling()` | XMLNode | Get next sibling node |
| `delete()` | - | Free node memory |

---

## Examples

### Parse Monster File

```lua
local function parseMonster(filepath)
    local doc = XMLDocument(filepath)
    if not doc then
        return nil
    end
    
    local monster = doc:child("monster")
    if not monster then
        doc:delete()
        return nil
    end
    
    local data = {
        name = monster:attribute("name"),
        nameDescription = monster:attribute("nameDescription"),
        race = monster:attribute("race"),
        experience = tonumber(monster:attribute("experience")) or 0,
        speed = tonumber(monster:attribute("speed")) or 0
    }
    
    -- Parse health
    local health = monster:firstChild()
    while health do
        if health:name() == "health" then
            data.health = tonumber(health:attribute("max")) or 100
            break
        end
        health = health:nextSibling()
    end
    
    doc:delete()
    return data
end
```

### Iterate Child Nodes

```lua
local function getMonsterLoot(filepath)
    local doc = XMLDocument(filepath)
    if not doc then
        return {}
    end
    
    local monster = doc:child("monster")
    if not monster then
        doc:delete()
        return {}
    end
    
    local loot = {}
    local node = monster:firstChild()
    
    while node do
        if node:name() == "loot" then
            local item = node:firstChild()
            while item do
                if item:name() == "item" then
                    table.insert(loot, {
                        id = tonumber(item:attribute("id")),
                        name = item:attribute("name"),
                        chance = tonumber(item:attribute("chance")) or 0,
                        countmax = tonumber(item:attribute("countmax")) or 1
                    })
                end
                item = item:nextSibling()
            end
            break
        end
        node = node:nextSibling()
    end
    
    doc:delete()
    return loot
end
```

### Parse Configuration File

```lua
local function loadConfig(filepath)
    local doc = XMLDocument(filepath)
    if not doc then
        return nil
    end
    
    local config = {}
    local root = doc:child("config")
    
    if root then
        local setting = root:firstChild()
        while setting do
            if setting:name() == "setting" then
                local key = setting:attribute("key")
                local value = setting:attribute("value")
                if key then
                    config[key] = value
                end
            end
            setting = setting:nextSibling()
        end
    end
    
    doc:delete()
    return config
end
```

### Parse NPC Shop Items

```lua
local function parseNpcShop(filepath)
    local doc = XMLDocument(filepath)
    if not doc then
        return {}
    end
    
    local items = {}
    local npc = doc:child("npc")
    
    if npc then
        local node = npc:firstChild()
        while node do
            if node:name() == "shop" then
                local item = node:firstChild()
                while item do
                    if item:name() == "item" then
                        table.insert(items, {
                            id = tonumber(item:attribute("id")),
                            name = item:attribute("name"),
                            buy = tonumber(item:attribute("buy")) or 0,
                            sell = tonumber(item:attribute("sell")) or 0
                        })
                    end
                    item = item:nextSibling()
                end
            end
            node = node:nextSibling()
        end
    end
    
    doc:delete()
    return items
end
```

### Recursive Node Parser

```lua
local function parseNode(node, depth)
    depth = depth or 0
    local indent = string.rep("  ", depth)
    
    print(indent .. "Node: " .. node:name())
    
    -- Print attributes (would need to know attribute names)
    
    -- Process children
    local child = node:firstChild()
    while child do
        parseNode(child, depth + 1)
        child = child:nextSibling()
    end
end

local function parseDocument(filepath)
    local doc = XMLDocument(filepath)
    if doc then
        local root = doc:child()
        if root then
            parseNode(root)
        end
        doc:delete()
    end
end
```

---

## Important Notes

1. **Always call `delete()`** on documents when done to free memory.

2. **Check for nil** - Methods return nil if node/attribute doesn't exist.

3. **Attribute values are strings** - Use `tonumber()` for numeric values.

4. **File paths** are relative to the server's working directory.
