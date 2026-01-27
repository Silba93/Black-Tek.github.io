---
title: Player
---

# Player Class

The Player class represents a player character in the game. It inherits from Creature and provides player-specific functionality.

## Constructor

```lua
Player(identifier)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `identifier` | number/string | Player ID, name, or userdata |

**Returns:** Player object or `nil` if not found

---

## Type Checking

### `isPlayer()`
Returns `true` if the object is a player.

```lua
if creature:isPlayer() then
    local player = creature:getPlayer()
end
```

---

## Account & Identity

| Method | Returns | Description |
|--------|---------|-------------|
| `getGuid()` | number | Player's unique database ID |
| `getName()` | string | Character name |
| `getIp()` | number | IP address as integer |
| `getAccountId()` | number | Account ID |
| `getAccountType()` | number | Account type (1-6) |
| `setAccountType(type)` | boolean | Set account type |
| `getLastLoginSaved()` | number | Last login timestamp |
| `getLastLogout()` | number | Last logout timestamp |

---

## Level & Experience

| Method | Returns | Description |
|--------|---------|-------------|
| `getLevel()` | number | Current level |
| `getExperience()` | number | Total experience |
| `addExperience(exp, sendText)` | - | Add experience |
| `removeExperience(exp, sendText)` | - | Remove experience |

```lua
-- Add 1000 exp with message
player:addExperience(1000, true)

-- Remove 500 exp silently
player:removeExperience(500, false)
```

---

## Health & Mana

| Method | Returns | Description |
|--------|---------|-------------|
| `getHealth()` | number | Current health |
| `getMaxHealth()` | number | Maximum health |
| `setMaxHealth(health)` | - | Set max health |
| `addHealth(amount)` | - | Add/remove health |
| `getMana()` | number | Current mana |
| `getMaxMana()` | number | Maximum mana |
| `setMaxMana(mana)` | - | Set max mana |
| `addMana(amount)` | - | Add/remove mana |
| `getBaseMaxHealth()` | number | Base max health (no bonuses) |
| `getBaseMaxMana()` | number | Base max mana (no bonuses) |

---

## Magic Level

| Method | Returns | Description |
|--------|---------|-------------|
| `getMagicLevel()` | number | Current magic level |
| `getBaseMagicLevel()` | number | Base magic level (no bonuses) |
| `getManaSpent()` | number | Mana spent for magic level |
| `addManaSpent(amount)` | - | Add mana spent |
| `removeManaSpent(amount)` | - | Remove mana spent |

---

## Skills

| Method | Returns | Description |
|--------|---------|-------------|
| `getSkillLevel(skillType)` | number | Skill level |
| `getEffectiveSkillLevel(skillType)` | number | Skill with bonuses |
| `getSkillPercent(skillType)` | number | Progress percent |
| `getSkillTries(skillType)` | number | Skill tries |
| `addSkillTries(skillType, tries)` | - | Add skill tries |
| `removeSkillTries(skillType, tries)` | - | Remove skill tries |
| `getSpecialSkill(skillType)` | number | Special skill value |
| `addSpecialSkill(skillType, value)` | - | Add special skill |

**Skill Types:**
- `SKILL_FIST`, `SKILL_CLUB`, `SKILL_SWORD`, `SKILL_AXE`
- `SKILL_DISTANCE`, `SKILL_SHIELDING`, `SKILL_FISHING`

**Special Skills:**
- `SPECIALSKILL_CRITICALHITCHANCE`
- `SPECIALSKILL_CRITICALHITAMOUNT`
- `SPECIALSKILL_LIFELEECHCHANCE`
- `SPECIALSKILL_LIFELEECHAMOUNT`
- `SPECIALSKILL_MANALEECHCHANCE`
- `SPECIALSKILL_MANALEECHAMOUNT`

---

## Soul & Stamina

| Method | Returns | Description |
|--------|---------|-------------|
| `getSoul()` | number | Current soul points |
| `addSoul(amount)` | - | Add soul points |
| `getMaxSoul()` | number | Maximum soul points |
| `getStamina()` | number | Stamina in minutes |
| `setStamina(minutes)` | - | Set stamina |

---

## Capacity

| Method | Returns | Description |
|--------|---------|-------------|
| `getCapacity()` | number | Max capacity |
| `setCapacity(cap)` | - | Set capacity |
| `getFreeCapacity()` | number | Available capacity |

---

## Vocation & Sex

| Method | Returns | Description |
|--------|---------|-------------|
| `getVocation()` | Vocation | Vocation object |
| `setVocation(vocation)` | - | Set vocation (ID or object) |
| `getSex()` | number | Sex (0=female, 1=male) |
| `setSex(sex)` | - | Set sex |

---

## Town & Guild

| Method | Returns | Description |
|--------|---------|-------------|
| `getTown()` | Town | Home town |
| `setTown(town)` | - | Set home town |
| `getGuild()` | Guild | Player's guild |
| `setGuild(guild)` | - | Set guild |
| `getGuildLevel()` | number | Guild rank level |
| `setGuildLevel(level)` | - | Set guild rank level |
| `getGuildNick()` | string | Guild nickname |
| `setGuildNick(nick)` | - | Set guild nickname |

---

## Group & Premium

| Method | Returns | Description |
|--------|---------|-------------|
| `getGroup()` | Group | Player group |
| `setGroup(group)` | - | Set group |
| `getPremiumEndsAt()` | number | Premium end timestamp |
| `setPremiumEndsAt(timestamp)` | - | Set premium end |

```lua
-- Check premium
if player:getPremiumEndsAt() > os.time() then
    print("Player has premium")
end
```

---

## Bank & Money

| Method | Returns | Description |
|--------|---------|-------------|
| `getBankBalance()` | number | Bank balance |
| `setBankBalance(balance)` | - | Set bank balance |
| `getMoney()` | number | Money in inventory |
| `addMoney(amount)` | boolean | Add money to inventory |
| `removeMoney(amount)` | boolean | Remove money |

---

## Storage

| Method | Returns | Description |
|--------|---------|-------------|
| `getStorageValue(key)` | number | Storage value (-1 if not set) |
| `setStorageValue(key, value)` | - | Set storage value |

```lua
-- Quest example
if player:getStorageValue(1000) == -1 then
    player:setStorageValue(1000, 1)
    player:sendTextMessage(MESSAGE_INFO_DESCR, "Quest started!")
end
```

---

## Items & Inventory

| Method | Returns | Description |
|--------|---------|-------------|
| `addItem(itemId, count, canDropOnMap, subType, slot)` | Item | Add item |
| `addItemEx(item, canDropOnMap, slot)` | ReturnValue | Add existing item |
| `removeItem(itemId, count, subType, ignoreEquipped)` | boolean | Remove items |
| `getItemCount(itemId, subType)` | number | Count of item |
| `getItemById(itemId, deepSearch, subType)` | Item | Find item |
| `getSlotItem(slot)` | Item | Get equipped item |

**Slots:** `CONST_SLOT_HEAD`, `CONST_SLOT_NECKLACE`, `CONST_SLOT_BACKPACK`, `CONST_SLOT_ARMOR`, `CONST_SLOT_RIGHT`, `CONST_SLOT_LEFT`, `CONST_SLOT_LEGS`, `CONST_SLOT_FEET`, `CONST_SLOT_RING`, `CONST_SLOT_AMMO`

```lua
-- Add item
local item = player:addItem(2160, 10)  -- 10 crystal coins

-- Check slot
local armor = player:getSlotItem(CONST_SLOT_ARMOR)
if armor then
    print("Wearing: " .. armor:getName())
end
```

---

## Depot & Storage Containers

| Method | Returns | Description |
|--------|---------|-------------|
| `getDepotChest(depotId, autoCreate)` | Container | Depot chest |
| `getDepotItemCount()` | number | Total depot items |
| `getInbox()` | Container | Inbox container |
| `getStoreInbox()` | Container | Store inbox |
| `getRewardChest()` | Container | Reward chest |

---

## Messaging

| Method | Description |
|--------|-------------|
| `sendTextMessage(type, message)` | Send text message |
| `sendChannelMessage(author, message, type, channelId)` | Send channel message |
| `sendPrivateMessage(target, message, type)` | Send private message |
| `channelSay(target, type, message, channelId)` | Say in channel |
| `sendCancelMessage(message)` | Send cancel message |
| `popupFYI(message)` | Show popup |

**Message Types:** `MESSAGE_STATUS_DEFAULT`, `MESSAGE_STATUS_WARNING`, `MESSAGE_INFO_DESCR`, `MESSAGE_STATUS_CONSOLE_BLUE`, `MESSAGE_STATUS_CONSOLE_RED`

---

## Outfits & Mounts

| Method | Returns | Description |
|--------|---------|-------------|
| `addOutfit(lookType)` | - | Add outfit |
| `addOutfitAddon(lookType, addon)` | - | Add addon |
| `removeOutfit(lookType)` | - | Remove outfit |
| `removeOutfitAddon(lookType, addon)` | - | Remove addon |
| `hasOutfit(lookType, addon)` | boolean | Check outfit |
| `canWearOutfit(lookType, addon)` | boolean | Can wear outfit |
| `sendOutfitWindow()` | - | Open outfit dialog |
| `addMount(mountId)` | - | Add mount |
| `removeMount(mountId)` | - | Remove mount |
| `hasMount(mountId)` | boolean | Check mount |

---

## Blessings

| Method | Returns | Description |
|--------|---------|-------------|
| `hasBlessing(blessing)` | boolean | Check blessing |
| `addBlessing(blessing, count)` | - | Add blessing |
| `removeBlessing(blessing)` | - | Remove blessing |

---

## Spells

| Method | Returns | Description |
|--------|---------|-------------|
| `canLearnSpell(spellName)` | boolean | Can learn spell |
| `learnSpell(spellName)` | - | Learn spell |
| `forgetSpell(spellName)` | - | Forget spell |
| `hasLearnedSpell(spellName)` | boolean | Has learned spell |
| `getInstantSpells()` | table | List of known spells |
| `canCast(spell)` | boolean | Can cast spell |

---

## Combat & PvP

| Method | Returns | Description |
|--------|---------|-------------|
| `getSkull()` | number | Skull type |
| `setSkull(skull)` | - | Set skull |
| `getSkullTime()` | number | Skull time remaining |
| `setSkullTime(time)` | - | Set skull time |
| `getDeathPenalty()` | number | Death penalty percent |
| `isPzLocked()` | boolean | Has PZ lock |
| `hasChaseMode()` | boolean | Chase mode enabled |
| `hasSecureMode()` | boolean | Secure mode enabled |
| `getFightMode()` | number | Fight mode |

---

## House

| Method | Returns | Description |
|--------|---------|-------------|
| `getHouse()` | House | Player's house (if in one) |
| `sendHouseWindow(house, listId)` | - | Open house dialog |
| `setEditHouse(house, listId)` | - | Edit house list |

---

## Party

| Method | Returns | Description |
|--------|---------|-------------|
| `getParty()` | Party | Player's party |

---

## Offline Training

| Method | Returns | Description |
|--------|---------|-------------|
| `getOfflineTrainingTime()` | number | Training time left |
| `addOfflineTrainingTime(time)` | - | Add training time |
| `removeOfflineTrainingTime(time)` | - | Remove training time |
| `getOfflineTrainingSkill()` | number | Skill being trained |
| `setOfflineTrainingSkill(skillId)` | - | Set training skill |
| `addOfflineTrainingTries(skillType, tries)` | - | Add offline tries |

---

## Containers

| Method | Returns | Description |
|--------|---------|-------------|
| `getContainerId(container)` | number | Container ID for player |
| `getContainerById(id)` | Container | Get container by ID |
| `getContainerIndex(id)` | number | Container index |

---

## UI & Interface

| Method | Description |
|--------|-------------|
| `showTextDialog(item, text, canWrite, length)` | Show text dialog |
| `openChannel(channelId)` | Open channel window |
| `sendTutorial(tutorialId)` | Send tutorial hint |
| `addMapMark(pos, type, description)` | Add map marker |
| `sendCreatureSquare(creature, color)` | Show square on creature |

---

## Idle & Activity

| Method | Returns | Description |
|--------|---------|-------------|
| `getIdleTime()` | number | Idle time in ms |
| `resetIdleTime()` | - | Reset idle timer |

---

## Ghost Mode

| Method | Description |
|--------|-------------|
| `setGhostMode(enabled)` | Enable/disable ghost mode |
| `isInGhostMode()` | Check ghost mode |

---

## Equipment

| Method | Returns | Description |
|--------|---------|-------------|
| `getEquipment()` | table | All equipped items |

---

## Save

| Method | Returns | Description |
|--------|---------|-------------|
| `save()` | boolean | Save player to database |

---

## Augments

| Method | Returns | Description |
|--------|---------|-------------|
| `addAugment(augment)` | - | Add augment |
| `removeAugment(augment)` | - | Remove augment |
| `isAugmented()` | boolean | Has any augments |
| `hasAugment(augment)` | boolean | Has specific augment |
| `getAugments()` | table | List of augments |

---

## Example: Complete Player Handler

```lua
local function onPlayerLogin(player)
    -- Welcome message
    player:sendTextMessage(MESSAGE_STATUS_DEFAULT, 
        "Welcome to the server, " .. player:getName() .. "!")
    
    -- First login bonus
    if player:getLastLoginSaved() == 0 then
        player:addItem(2160, 100)
        player:sendTextMessage(MESSAGE_INFO_DESCR, 
            "Welcome bonus: 100 crystal coins!")
    end
    
    -- Daily login reward
    local lastDaily = player:getStorageValue(10000)
    local today = os.date("%Y%m%d")
    if lastDaily ~= tonumber(today) then
        player:setStorageValue(10000, tonumber(today))
        player:addExperience(1000, true)
    end
    
    -- Premium check
    if player:getPremiumEndsAt() > os.time() then
        player:sendTextMessage(MESSAGE_STATUS_CONSOLE_BLUE, 
            "Premium active!")
    end
    
    return true
end
```
