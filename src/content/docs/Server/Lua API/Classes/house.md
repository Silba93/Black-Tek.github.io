---
title: House
---

# House Class

The House class represents player houses.

## Constructor

```lua
House(id)
```

---

## Basic Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | House ID |
| `getName()` | string | House name |
| `getTown()` | Town | House town |
| `getRent()` | number | Rent amount |
| `getPaidUntil()` | number | Paid until timestamp |
| `getSize()` | number | Size in SQM |
| `getTileCount()` | number | Tile count |
| `getBeds()` | table | All beds |
| `getBedCount()` | number | Bed count |
| `getExitPosition()` | Position | Exit position |

---

## Ownership

| Method | Returns | Description |
|--------|---------|-------------|
| `getOwnerGuid()` | number | Owner player ID |
| `getOwnerName()` | string | Owner name |
| `setOwnerGuid(guid)` | - | Set owner |
| `setNewOwnerGuid(guid)` | - | Set pending owner |

```lua
local house = House(1)
if house:getOwnerGuid() == 0 then
    print("House is for sale!")
else
    print("Owner: " .. house:getOwnerName())
end
```

---

## Access Lists

| Method | Returns | Description |
|--------|---------|-------------|
| `getAccessList(listId)` | string | Get access list |
| `setAccessList(listId, list)` | - | Set access list |
| `kickPlayer(player, player)` | boolean | Kick from house |

**List IDs:**
- `SUBOWNER_LIST` (0x100) - Sub-owners
- `GUEST_LIST` (0x101) - Guests

```lua
-- Add guest
local list = house:getAccessList(GUEST_LIST)
house:setAccessList(GUEST_LIST, list .. "\n" .. player:getName())
```

---

## Doors

| Method | Returns | Description |
|--------|---------|-------------|
| `getDoors()` | table | All doors |
| `getDoorCount()` | number | Door count |
| `getDoorIdByPosition(position)` | number | Door ID at position |

---

## Tiles

| Method | Returns | Description |
|--------|---------|-------------|
| `getTiles()` | table | All house tiles |
| `getItems()` | table | All items in house |

---

## Examples

### Buy House

```lua
local function buyHouse(player, house)
    if house:getOwnerGuid() > 0 then
        player:sendCancelMessage("This house already has an owner.")
        return false
    end
    
    local price = house:getTileCount() * 10000  -- 10k per sqm
    if player:getBankBalance() < price then
        player:sendCancelMessage("You need " .. price .. " gold.")
        return false
    end
    
    player:setBankBalance(player:getBankBalance() - price)
    house:setOwnerGuid(player:getGuid())
    
    player:sendTextMessage(MESSAGE_INFO_DESCR,
        "You bought " .. house:getName() .. " for " .. price .. " gold!")
    
    return true
end
```

### Check House Access

```lua
local function hasHouseAccess(player, house)
    if house:getOwnerGuid() == player:getGuid() then
        return true
    end
    
    local subowners = house:getAccessList(SUBOWNER_LIST)
    if subowners:find(player:getName()) then
        return true
    end
    
    local guests = house:getAccessList(GUEST_LIST)
    if guests:find(player:getName()) then
        return true
    end
    
    return false
end
```
