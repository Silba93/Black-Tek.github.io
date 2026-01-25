---
title: Talk Actions
---

# Talk Actions

Talk Actions are commands triggered when players say specific words or phrases in chat. They are commonly used for player commands, GM commands, and custom game features.

## Overview

Talk Actions respond to:
- **Exact words** - Triggered by specific command words (e.g., `!help`)
- **Word prefixes** - Can include parameters after the command
- **Access restrictions** - Can be limited by account type or access level

## Creating a Talk Action

### Basic Structure

```lua
local myCommand = TalkAction("!command")

function myCommand.onSay(player, words, param, type)
    -- Your code here
    return false  -- Don't show message in chat
end

myCommand:register()
```

### Constructor

```lua
TalkAction(words, ...)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `words` | string | Command word(s) |
| `...` | strings | Additional command words |

---

## Methods

### `onSay(callback)`
Sets the callback function for when the command is spoken.

### `separator(sep)`
Sets the parameter separator character. Default is `"` (quote).

### `access(needAccess)`
Sets whether the command requires special access rights.

### `accountType(type)`
Sets the minimum account type required.

**Account Types:**
- `ACCOUNT_TYPE_NORMAL` (1)
- `ACCOUNT_TYPE_TUTOR` (2)
- `ACCOUNT_TYPE_SENIORTUTOR` (3)
- `ACCOUNT_TYPE_GAMEMASTER` (4)
- `ACCOUNT_TYPE_GOD` (6)

### `register()`
Registers the talk action with the server.

---

## Callback Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | Player | The player who spoke |
| `words` | string | The command word(s) spoken |
| `param` | string | Parameters after the command |
| `type` | number | Speech type (TALKTYPE_*) |

**Return `false`** to suppress the message from chat.

---

## Examples

### Simple Player Command

```lua
local serverInfo = TalkAction("!serverinfo", "!info")

function serverInfo.onSay(player, words, param, type)
    local message = string.format("Players Online: %d", Game.getPlayerCount())
    player:sendTextMessage(MESSAGE_STATUS_CONSOLE_BLUE, message)
    return false
end

serverInfo:register()
```

### GM Teleport Command

```lua
local teleportTo = TalkAction("!goto")

function teleportTo.onSay(player, words, param, type)
    if param == "" then
        player:sendCancelMessage("Usage: !goto <player name>")
        return false
    end
    
    local target = Player(param)
    if not target then
        player:sendCancelMessage("Player not found.")
        return false
    end
    
    player:teleportTo(target:getPosition())
    player:getPosition():sendMagicEffect(CONST_ME_TELEPORT)
    return false
end

teleportTo:separator(" ")
teleportTo:accountType(ACCOUNT_TYPE_GAMEMASTER)
teleportTo:register()
```

### Broadcast Command

```lua
local broadcast = TalkAction("/bc")

function broadcast.onSay(player, words, param, type)
    if param == "" then
        return false
    end
    
    for _, p in ipairs(Game.getPlayers()) do
        p:sendTextMessage(MESSAGE_STATUS_WARNING, param)
    end
    return false
end

broadcast:separator(" ")
broadcast:access(true)
broadcast:accountType(ACCOUNT_TYPE_GAMEMASTER)
broadcast:register()
```

### Create Item Command

```lua
local createItem = TalkAction("/i")

function createItem.onSay(player, words, param, type)
    local split = param:split(",")
    local itemId = tonumber(split[1])
    local count = tonumber(split[2]) or 1
    
    if not itemId then
        player:sendCancelMessage("Usage: /i <itemId>, <count>")
        return false
    end
    
    player:addItem(itemId, count)
    return false
end

createItem:separator(",")
createItem:accountType(ACCOUNT_TYPE_GOD)
createItem:register()
```

---

## File Location

```
data/scripts/talkactions/
```
