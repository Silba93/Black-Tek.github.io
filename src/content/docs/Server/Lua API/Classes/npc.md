---
title: Npc
---

# Npc Class

The Npc class represents non-player characters (NPCs) in the game. It inherits from Creature.

## Constructor

```lua
Npc(id)
Npc(name)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | NPC creature ID |
| `name` | string | NPC name |

---

## Type Checking

### `isNpc()`
Returns `true` if the creature is an NPC.

```lua
if creature:isNpc() then
    local npc = creature:getNpc()
end
```

---

## Basic Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Creature ID |
| `getName()` | string | NPC name |
| `getMasterPos()` | Position | Spawn position |

---

## Speech

| Method | Returns | Description |
|--------|---------|-------------|
| `getSpeechBubble()` | number | Speech bubble type |
| `setSpeechBubble(bubble)` | - | Set speech bubble |

**Speech Bubbles:**
- `SPEECHBUBBLE_NONE` (0)
- `SPEECHBUBBLE_NORMAL` (1)
- `SPEECHBUBBLE_TRADE` (2)
- `SPEECHBUBBLE_QUEST` (3)
- `SPEECHBUBBLE_QUESTTRADER` (4)

```lua
npc:setSpeechBubble(SPEECHBUBBLE_TRADE)
```

---

## Interaction

| Method | Returns | Description |
|--------|---------|-------------|
| `isInteractingWithPlayer(player)` | boolean | Talking to player |
| `closeShopWindow(player)` | - | Close shop for player |
| `openShopWindow(player, items, buyCallback, sellCallback)` | - | Open shop window |

```lua
-- Open shop
local shopItems = {
    {id = 2160, buy = 10000, sell = 10000, name = "crystal coin"},
    {id = 2152, buy = 100, sell = 100, name = "platinum coin"},
}

npc:openShopWindow(player, shopItems,
    function(player, itemId, subType, amount, ignore, inBackpacks)
        -- Buy callback
        return true
    end,
    function(player, itemId, subType, amount, ignore)
        -- Sell callback
        return true
    end
)
```

---

## Movement

| Method | Returns | Description |
|--------|---------|-------------|
| `setMasterPos(position)` | - | Set home position |
| `getWalkRadius()` | number | Walk radius |

---

## Examples

### Create NPC

```lua
local function spawnNpc(name, position)
    local npc = Game.createNpc(name, position, true, true)
    if npc then
        npc:setMasterPos(position)
        return npc
    end
    return nil
end
```

### NPC Speech

```lua
local function npcSay(npc, player, message)
    npc:say(message, TALKTYPE_PRIVATE_NP, false, player)
end

local function npcYell(npc, message)
    npc:say(message, TALKTYPE_YELL)
end
```

### Simple Shop NPC

```lua
local shopItems = {
    {id = 2050, buy = 50, sell = 25, name = "torch"},
    {id = 2120, buy = 100, sell = 50, name = "rope"},
    {id = 2554, buy = 200, sell = 100, name = "shovel"},
}

local function onBuy(player, itemId, subType, amount, ignore, inBackpacks)
    local item = ItemType(itemId)
    local totalCost = item:getBuyPrice() * amount
    
    if player:getMoney() < totalCost then
        return false
    end
    
    if player:addItem(itemId, amount) then
        player:removeMoney(totalCost)
        return true
    end
    return false
end

local function onSell(player, itemId, subType, amount, ignore)
    local item = ItemType(itemId)
    local totalPrice = item:getSellPrice() * amount
    
    if player:removeItem(itemId, amount) then
        player:addMoney(totalPrice)
        return true
    end
    return false
end

-- In NPC script
npc:openShopWindow(player, shopItems, onBuy, onSell)
```

### Distance Check

```lua
local function isPlayerNearNpc(npc, player, range)
    local npcPos = npc:getPosition()
    local playerPos = player:getPosition()
    return npcPos:getDistance(playerPos) <= range
end
```
