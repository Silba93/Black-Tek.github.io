---
title: ModalWindow
---
# ModalWindow Class

The ModalWindow class creates interactive dialog windows for players.

## Constructor

```lua
ModalWindow(id, title, message)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | Unique window ID (1-65535) |
| `title` | string | Window title |
| `message` | string | Window message |

```lua
local window = ModalWindow(1000, "Quest Selection", "Choose your quest:")
```

---

## Buttons

| Method | Returns | Description |
|--------|---------|-------------|
| `addButton(id, text)` | - | Add button |
| `getButtonCount()` | number | Button count |
| `setDefaultEnterButton(id)` | - | Set enter button |
| `setDefaultEscapeButton(id)` | - | Set escape button |

**Button IDs:**
- `1-250` - Custom buttons
- `0x00` - Enter/OK
- `0xFF` - Escape/Cancel

```lua
window:addButton(1, "Accept")
window:addButton(2, "Decline")
window:setDefaultEnterButton(1)
window:setDefaultEscapeButton(2)
```

---

## Choices

| Method | Returns | Description |
|--------|---------|-------------|
| `addChoice(id, text)` | - | Add choice |
| `getChoiceCount()` | number | Choice count |

```lua
window:addChoice(1, "Dragon Quest")
window:addChoice(2, "Demon Quest")
window:addChoice(3, "Annihilator Quest")
```

---

## Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Window ID |
| `getTitle()` | string | Window title |
| `getMessage()` | string | Window message |
| `setPriority(priority)` | - | Set priority |
| `hasPriority(priority)` | boolean | Check priority |

---

## Sending

| Method | Description |
|--------|-------------|
| `sendToPlayer(player)` | Display to player |

---

## Handling Responses

Use CreatureEvent `onModalWindow` to handle responses:

```lua
local modalHandler = CreatureEvent("ModalWindowHandler")

function modalHandler.onModalWindow(player, modalWindowId, buttonId, choiceId)
    if modalWindowId == 1000 then
        if buttonId == 1 then  -- Accept
            if choiceId == 1 then
                player:sendTextMessage(MESSAGE_INFO_DESCR, "Dragon Quest started!")
            elseif choiceId == 2 then
                player:sendTextMessage(MESSAGE_INFO_DESCR, "Demon Quest started!")
            end
        else  -- Decline
            player:sendTextMessage(MESSAGE_INFO_DESCR, "Quest declined.")
        end
        return true
    end
    return true
end

modalHandler:register()
```

---

## Examples

### Quest Selection

```lua
local function showQuestWindow(player)
    local window = ModalWindow(1001, "Quest Master", "Select a quest to begin:")
    
    window:addChoice(1, "The Dragon's Lair (Level 50+)")
    window:addChoice(2, "The Demon Oak (Level 100+)")
    window:addChoice(3, "The Pits of Inferno (Level 150+)")
    
    window:addButton(1, "Start Quest")
    window:addButton(2, "Cancel")
    
    window:setDefaultEnterButton(1)
    window:setDefaultEscapeButton(2)
    
    window:sendToPlayer(player)
end
```

### Confirmation Dialog

```lua
local function showConfirmation(player, title, message, windowId)
    local window = ModalWindow(windowId, title, message)
    
    window:addButton(1, "Yes")
    window:addButton(2, "No")
    
    window:setDefaultEnterButton(1)
    window:setDefaultEscapeButton(2)
    
    window:sendToPlayer(player)
end

-- Usage
showConfirmation(player, "Confirm Purchase", 
    "Buy Dragon Sword for 10,000 gold?", 2000)
```

### Multi-Choice Menu

```lua
local function showTeleportMenu(player)
    local window = ModalWindow(1002, "Teleporter", "Choose your destination:")
    
    local destinations = {
        {id = 1, name = "Thais", pos = Position(32369, 32241, 7)},
        {id = 2, name = "Carlin", pos = Position(32341, 31782, 7)},
        {id = 3, name = "Venore", pos = Position(32957, 32076, 7)},
    }
    
    for _, dest in ipairs(destinations) do
        window:addChoice(dest.id, dest.name)
    end
    
    window:addButton(1, "Teleport")
    window:addButton(2, "Cancel")
    
    window:sendToPlayer(player)
end
```
