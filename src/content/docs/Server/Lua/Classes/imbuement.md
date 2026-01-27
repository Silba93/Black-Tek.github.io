---
title: Imbuement
---

# Imbuement System

Imbuements are temporary enhancements applied to equipment.

## Imbuement Class

### Constructor

```lua
Imbuement(name)
```

---

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getName()` | string | Imbuement name |
| `getId()` | number | Imbuement ID |
| `getDescription()` | string | Description |
| `getCategory()` | number | Category |
| `isPremium()` | boolean | Requires premium |
| `getBase()` | table | Base imbuement |
| `getBoost()` | table | Boost values |
| `getItems()` | table | Required items |
| `getPrice()` | number | Gold cost |
| `getProtectionPrice()` | number | Protection cost |
| `getDuration()` | number | Duration in seconds |
| `getElementDamage()` | number | Element damage |
| `getCombatType()` | number | Combat type |

---

### Item Imbuement Methods

```lua
-- Check imbuement slots
local slots = item:getImbuementSlots()
local free = item:getFreeImbuementSlots()

-- Add imbuement
if item:canImbue() then
    item:addImbuement(imbuement)
end

-- Check imbuements
if item:hasImbuements() then
    local imbues = item:getImbuements()
    for slot, imbue in pairs(imbues) do
        print(slot, imbue:getName())
    end
end

-- Check specific type
if item:hasImbuementType(IMBUEMENT_FIRE) then
    print("Has fire imbuement!")
end

-- Remove
item:removeImbuement(slotId)
```

---

## Examples

### Check Item Imbuements

```lua
local function describeImbuements(item)
    if not item:hasImbuements() then
        return "No imbuements"
    end
    
    local desc = "Imbuements:\n"
    local imbues = item:getImbuements()
    
    for slot, imbue in pairs(imbues) do
        desc = desc .. string.format("  Slot %d: %s\n", slot, imbue:getName())
    end
    
    return desc
end
```

### Add Imbuement with Check

```lua
local function addImbuementToItem(item, imbuement, player)
    if item:getFreeImbuementSlots() == 0 then
        player:sendCancelMessage("No free imbuement slots.")
        return false
    end
    
    local price = imbuement:getPrice()
    if player:getMoney() < price then
        player:sendCancelMessage("Not enough gold.")
        return false
    end
    
    -- Check required items
    local items = imbuement:getItems()
    for _, req in ipairs(items) do
        if player:getItemCount(req.id) < req.count then
            player:sendCancelMessage("Missing required items.")
            return false
        end
    end
    
    -- Remove cost
    player:removeMoney(price)
    for _, req in ipairs(items) do
        player:removeItem(req.id, req.count)
    end
    
    -- Apply imbuement
    item:addImbuement(imbuement)
    player:sendTextMessage(MESSAGE_INFO_DESCR, 
        "Imbuement applied: " .. imbuement:getName())
    
    return true
end
```
