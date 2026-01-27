---
title: Creature Events
---
# Creature Events

Creature Events are callbacks that trigger during various lifecycle events of creatures (players, monsters, and NPCs). They are primarily used for tracking player activity, custom death mechanics, level advancement bonuses, and more.

## Overview

Creature Events can be:
- **Global** - Automatically applied to all players (login/logout/advance)
- **Registered** - Must be manually attached to creatures

## Event Types

| Type | Callback | Description |
|------|----------|-------------|
| `login` | `onLogin` | Player logs into the game |
| `logout` | `onLogout` | Player logs out of the game |
| `think` | `onThink` | Periodic creature think event |
| `preparedeath` | `onPrepareDeath` | Before creature death is processed |
| `death` | `onDeath` | Creature dies |
| `kill` | `onKill` | Creature kills another creature |
| `advance` | `onAdvance` | Player advances in level/skill |
| `modalwindow` | `onModalWindow` | Player responds to modal window |
| `textedit` | `onTextEdit` | Player edits writable item text |
| `healthchange` | `onHealthChange` | Creature health changes |
| `manachange` | `onManaChange` | Creature mana changes |
| `extendedopcode` | `onExtendedOpcode` | OTClient extended opcode received |

---

## Creating a Creature Event

### Basic Structure

```lua
local myEvent = CreatureEvent("eventName")

function myEvent.onLogin(player)
    -- Your code here
    return true
end

myEvent:register()
```

### Constructor

```lua
CreatureEvent(name)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | Unique event name |

---

## Methods

### `type(eventType)`
Sets the event type.

```lua
myEvent:type("login")
myEvent:type("death")
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventType` | string | Event type name |

---

### `register()`
Registers the event with the server.

```lua
myEvent:register()
```

---

## Callback Signatures

### `onLogin(player)`

Triggered when a player logs in. **Global event** - automatically applies to all players.

```lua
function myEvent.onLogin(player)
    return true  -- Allow login
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | Player | The player logging in |

| Return | Effect |
|--------|--------|
| `true` | Allow login |
| `false` | Deny login (disconnects player) |

---

### `onLogout(player)`

Triggered when a player logs out. **Global event**.

```lua
function myEvent.onLogout(player)
    return true  -- Allow logout
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | Player | The player logging out |

| Return | Effect |
|--------|--------|
| `true` | Allow logout |
| `false` | Prevent logout |

---

### `onThink(creature, interval)`

Triggered periodically for registered creatures.

```lua
function myEvent.onThink(creature, interval)
    return true
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `creature` | Creature | The creature thinking |
| `interval` | number | Milliseconds since last think |

**Note:** Must be registered on the creature with `creature:registerEvent("eventName")`.

---

### `onPrepareDeath(creature, killer)`

Triggered before death processing. Can prevent death.

```lua
function myEvent.onPrepareDeath(creature, killer)
    return true  -- Allow death
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `creature` | Creature | The dying creature |
| `killer` | Creature/nil | The killer (if any) |

| Return | Effect |
|--------|--------|
| `true` | Process death normally |
| `false` | Prevent death |

---

### `onDeath(creature, corpse, killer, mostDamageKiller, lastHitUnjustified, mostDamageUnjustified)`

Triggered when a creature dies.

```lua
function myEvent.onDeath(creature, corpse, killer, mostDamageKiller, lastHitUnjustified, mostDamageUnjustified)
    return true
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `creature` | Creature | The dead creature |
| `corpse` | Item | The corpse item |
| `killer` | Creature/nil | Last hit killer |
| `mostDamageKiller` | Creature/nil | Most damage dealer |
| `lastHitUnjustified` | boolean | Last hit was unjustified |
| `mostDamageUnjustified` | boolean | Most damage was unjustified |

---

### `onKill(creature, target)`

Triggered when a creature kills another creature.

```lua
function myEvent.onKill(creature, target)
    -- No return value
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `creature` | Creature | The killer |
| `target` | Creature | The killed creature |

---

### `onAdvance(player, skill, oldLevel, newLevel)`

Triggered when a player advances in level or skill. **Global event**.

```lua
function myEvent.onAdvance(player, skill, oldLevel, newLevel)
    return true  -- Allow advancement
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | Player | The advancing player |
| `skill` | number | Skill type (SKILL_* constant or LEVEL) |
| `oldLevel` | number | Previous level |
| `newLevel` | number | New level |

**Skill values:**
- `SKILL_FIST`, `SKILL_CLUB`, `SKILL_SWORD`, `SKILL_AXE`
- `SKILL_DISTANCE`, `SKILL_SHIELDING`, `SKILL_FISHING`
- `SKILL_MAGLEVEL` - Magic level
- `SKILL_LEVEL` - Experience level

---

### `onModalWindow(player, modalWindowId, buttonId, choiceId)`

Triggered when a player responds to a modal window.

```lua
function myEvent.onModalWindow(player, modalWindowId, buttonId, choiceId)
    -- No return value
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | Player | The player responding |
| `modalWindowId` | number | ID of the modal window |
| `buttonId` | number | ID of clicked button |
| `choiceId` | number | ID of selected choice |

---

### `onTextEdit(player, item, text)`

Triggered when a player edits text on a writable item.

```lua
function myEvent.onTextEdit(player, item, text)
    return true  -- Allow edit
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | Player | The editing player |
| `item` | Item | The writable item |
| `text` | string | The new text |

---

### `onHealthChange(creature, attacker, primaryDamage, primaryType, secondaryDamage, secondaryType, origin)`

Triggered when a creature's health changes.

```lua
function myEvent.onHealthChange(creature, attacker, primaryDamage, primaryType, secondaryDamage, secondaryType, origin)
    return primaryDamage, primaryType, secondaryDamage, secondaryType
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `creature` | Creature | Creature receiving damage/healing |
| `attacker` | Creature/nil | Source of damage/healing |
| `primaryDamage` | number | Primary damage amount |
| `primaryType` | number | Primary damage type |
| `secondaryDamage` | number | Secondary damage amount |
| `secondaryType` | number | Secondary damage type |
| `origin` | number | Combat origin |

**Returns:** Modified damage values `(primaryDamage, primaryType, secondaryDamage, secondaryType)`

---

### `onManaChange(creature, attacker, primaryDamage, primaryType, secondaryDamage, secondaryType, origin)`

Triggered when a creature's mana changes.

```lua
function myEvent.onManaChange(creature, attacker, primaryDamage, primaryType, secondaryDamage, secondaryType, origin)
    return primaryDamage, primaryType, secondaryDamage, secondaryType
end
```

Parameters and returns are identical to `onHealthChange`.

---

### `onExtendedOpcode(player, opcode, buffer)`

Triggered when receiving an extended opcode from OTClient.

```lua
function myEvent.onExtendedOpcode(player, opcode, buffer)
    -- No return value
end
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | Player | The player sending opcode |
| `opcode` | number | Extended opcode number |
| `buffer` | string | Data buffer |

---

## Examples

### Welcome Message on Login

```lua
local loginEvent = CreatureEvent("WelcomeMessage")

function loginEvent.onLogin(player)
    local message = string.format("Welcome, %s! You have been online for %d hours total.",
        player:getName(),
        math.floor(player:getStorageValue(12345) / 3600)
    )
    player:sendTextMessage(MESSAGE_STATUS_DEFAULT, message)
    return true
end

loginEvent:type("login")
loginEvent:register()
```

### Level Advancement Rewards

```lua
local advanceEvent = CreatureEvent("LevelRewards")

function advanceEvent.onAdvance(player, skill, oldLevel, newLevel)
    if skill ~= SKILL_LEVEL then
        return true
    end
    
    -- Reward every 50 levels
    if newLevel % 50 == 0 then
        player:addItem(2160, newLevel)  -- Crystal coins equal to level
        player:sendTextMessage(MESSAGE_INFO_DESCR, 
            string.format("Congratulations on level %d! You received %d crystal coins!", newLevel, newLevel))
    end
    
    return true
end

advanceEvent:type("advance")
advanceEvent:register()
```

### Death Prevention (Amulet of Loss)

```lua
local deathProtection = CreatureEvent("AmuletProtection")

function deathProtection.onPrepareDeath(creature, killer)
    if not creature:isPlayer() then
        return true
    end
    
    local player = creature:getPlayer()
    local amulet = player:getSlotItem(CONST_SLOT_NECKLACE)
    
    if amulet and amulet:getId() == 2173 then  -- Amulet of Loss
        player:addHealth(player:getMaxHealth())
        player:addMana(player:getMaxMana())
        player:getPosition():sendMagicEffect(CONST_ME_HOLYDAMAGE)
        amulet:remove(1)
        player:sendTextMessage(MESSAGE_INFO_DESCR, "Your amulet of loss saved you from death!")
        return false  -- Prevent death
    end
    
    return true  -- Process death normally
end

deathProtection:type("preparedeath")
deathProtection:register()
```

### Kill Tracking

```lua
local killTracker = CreatureEvent("KillTracker")

function killTracker.onKill(creature, target)
    if not creature:isPlayer() then
        return
    end
    
    local player = creature:getPlayer()
    
    if target:isPlayer() then
        -- PvP kill
        local kills = player:getStorageValue(10001) or 0
        player:setStorageValue(10001, kills + 1)
    elseif target:isMonster() then
        -- Monster kill
        local kills = player:getStorageValue(10002) or 0
        player:setStorageValue(10002, kills + 1)
    end
end

killTracker:type("kill")
killTracker:register()

-- Register on login
local registerKillTracker = CreatureEvent("RegisterKillTracker")

function registerKillTracker.onLogin(player)
    player:registerEvent("KillTracker")
    return true
end

registerKillTracker:type("login")
registerKillTracker:register()
```

### Damage Modification

```lua
local damageReduction = CreatureEvent("VIPDamageReduction")

function damageReduction.onHealthChange(creature, attacker, primaryDamage, primaryType, secondaryDamage, secondaryType, origin)
    if not creature:isPlayer() then
        return primaryDamage, primaryType, secondaryDamage, secondaryType
    end
    
    local player = creature:getPlayer()
    
    -- VIP players take 10% less damage
    if player:getPremiumEndsAt() > os.time() then
        primaryDamage = math.floor(primaryDamage * 0.9)
        secondaryDamage = math.floor(secondaryDamage * 0.9)
    end
    
    return primaryDamage, primaryType, secondaryDamage, secondaryType
end

damageReduction:type("healthchange")
damageReduction:register()
```

### Modal Window Response

```lua
-- First, create the modal window somewhere
local function showTeleportMenu(player)
    local window = ModalWindow(1000, "Teleport Menu", "Select a destination:")
    window:addChoice(1, "Temple")
    window:addChoice(2, "Depot")
    window:addChoice(3, "Training Room")
    window:addButton(1, "Teleport")
    window:addButton(2, "Cancel")
    window:setDefaultEnterButton(1)
    window:setDefaultEscapeButton(2)
    window:sendToPlayer(player)
end

-- Handle the response
local modalHandler = CreatureEvent("TeleportModalHandler")

function modalHandler.onModalWindow(player, modalWindowId, buttonId, choiceId)
    if modalWindowId ~= 1000 then
        return
    end
    
    if buttonId == 2 then  -- Cancel
        return
    end
    
    local destinations = {
        [1] = Position(1000, 1000, 7),  -- Temple
        [2] = Position(1050, 1000, 7),  -- Depot
        [3] = Position(1100, 1000, 7),  -- Training
    }
    
    local dest = destinations[choiceId]
    if dest then
        player:teleportTo(dest)
        player:getPosition():sendMagicEffect(CONST_ME_TELEPORT)
    end
end

modalHandler:type("modalwindow")
modalHandler:register()
```

---

## Registering Events on Creatures

For non-global events, you must register them on individual creatures:

```lua
-- In a login event
function onLogin(player)
    player:registerEvent("KillTracker")
    player:registerEvent("DeathHandler")
    return true
end

-- Or on monster spawn
function onSpawn(monster)
    monster:registerEvent("BossThink")
end
```

### Unregistering Events

```lua
creature:unregisterEvent("EventName")
```

---

## File Location

Creature event scripts are typically placed in:
```
data/scripts/creaturescripts/
```

Or in the legacy location:
```
data/creaturescripts/scripts/
```
