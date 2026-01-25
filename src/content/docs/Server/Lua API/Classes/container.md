---
title: Container
---

# Container Class

The Container class represents containers (bags, backpacks, chests, etc.) that can hold items.

## Constructor

```lua
Container(uid)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `uid` | number | Unique item ID |

---

## Basic Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getSize()` | number | Maximum capacity |
| `getCapacity()` | number | Maximum capacity |
| `getEmptySlots(recursive)` | number | Empty slots |
| `getItemHoldingCount()` | number | Total items (recursive) |
| `getItemCountById(itemId, subType)` | number | Count of specific item |

```lua
local container = Container(item:getUniqueId())
local freeSlots = container:getEmptySlots(false)
print("Free slots: " .. freeSlots)
```

---

## Item Access

| Method | Returns | Description |
|--------|---------|-------------|
| `getItem(index)` | Item | Get item at index |
| `hasItem(item)` | boolean | Contains item |
| `getItems(recursive)` | table | All items |

```lua
-- Iterate items
for i = 0, container:getSize() - 1 do
    local item = container:getItem(i)
    if item then
        print(item:getName())
    end
end

-- Get all items recursively
local allItems = container:getItems(true)
for _, item in ipairs(allItems) do
    print(item:getName())
end
```

---

## Item Management

| Method | Returns | Description |
|--------|---------|-------------|
| `addItem(item)` | ReturnValue | Add item |
| `addItemEx(item, index, flags)` | ReturnValue | Add item with options |

```lua
local newItem = Game.createItem(2160, 10)
local result = container:addItem(newItem)
if result == RETURNVALUE_NOERROR then
    print("Item added!")
end
```

---

## Content Type

| Method | Returns | Description |
|--------|---------|-------------|
| `getContentType()` | number | Content type restriction |

**Content Types:**
- `ITEMS_CONTENT` (0) - Any items
- `CONTAINERS_CONTENT` (1) - Only containers
- `QUIVER_CONTENT` (2) - Only ammunition

---

## Examples

### Count Items in Container

```lua
local function countItems(container)
    local count = 0
    for i = 0, container:getSize() - 1 do
        local item = container:getItem(i)
        if item then
            count = count + 1
        end
    end
    return count
end
```

### Find Item in Container

```lua
local function findItem(container, itemId, recursive)
    for i = 0, container:getSize() - 1 do
        local item = container:getItem(i)
        if item then
            if item:getId() == itemId then
                return item
            end
            if recursive and item:isContainer() then
                local subContainer = Container(item:getUniqueId())
                local found = findItem(subContainer, itemId, true)
                if found then
                    return found
                end
            end
        end
    end
    return nil
end
```

### Empty Container

```lua
local function emptyContainer(container, destination)
    local items = container:getItems(false)
    for _, item in ipairs(items) do
        item:moveTo(destination)
    end
end
```

### Check Container Full

```lua
local function isContainerFull(container)
    return container:getEmptySlots(false) == 0
end
```

### Get Total Weight

```lua
local function getContainerWeight(container)
    local weight = 0
    local items = container:getItems(true)
    for _, item in ipairs(items) do
        weight = weight + item:getWeight()
    end
    return weight
end
```

### Sort Container

```lua
local function sortContainer(container)
    local items = {}
    
    -- Collect items
    for i = 0, container:getSize() - 1 do
        local item = container:getItem(i)
        if item then
            table.insert(items, {
                id = item:getId(),
                count = item:getCount(),
                item = item
            })
        end
    end
    
    -- Sort by ID
    table.sort(items, function(a, b)
        return a.id < b.id
    end)
    
    -- Note: Full implementation would need to
    -- remove and re-add items in sorted order
end
```
