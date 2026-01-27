---
title: Item
---

# Item Class

The Item class represents items in the game world, including inventory items, ground items, and equipment.

## Constructor

```lua
Item(uid)
Item(itemId, count, position)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `uid` | number | Unique item ID in Lua context |
| `itemId` | number | Item type ID |
| `count` | number | Stack count (optional) |
| `position` | Position | Location (optional) |

---

## Type Checking

| Method | Returns | Description |
|--------|---------|-------------|
| `isItem()` | boolean | Is an item |

---

## Basic Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Item type ID |
| `getName()` | string | Item name |
| `getPluralName()` | string | Plural name |
| `getArticle()` | string | Article (a/an) |
| `getDescription(distance)` | string | Look description |
| `getSpecialDescription()` | string | Special description |
| `getSubType()` | number | Subtype value |
| `getCount()` | number | Stack count |
| `getCharges()` | number | Charges remaining |
| `getFluidType()` | number | Fluid type |
| `getWeight()` | number | Weight |
| `getWorth()` | number | Gold value |

---

## Position & Parent

| Method | Returns | Description |
|--------|---------|-------------|
| `getPosition()` | Position | Item position |
| `getTile()` | Tile | Tile item is on |
| `getParent()` | Cylinder | Parent (container/tile) |
| `getTopParent()` | Cylinder | Top-level parent |

---

## IDs

| Method | Returns | Description |
|--------|---------|-------------|
| `getUniqueId()` | number | Unique ID attribute |
| `getActionId()` | number | Action ID attribute |
| `setActionId(id)` | - | Set action ID |

```lua
-- Check action ID
if item:getActionId() == 1000 then
    -- Quest item
end

-- Set action ID
item:setActionId(2000)
```

---

## Attributes

| Method | Returns | Description |
|--------|---------|-------------|
| `hasAttribute(attributeType)` | boolean | Has attribute |
| `getAttribute(attributeType)` | varies | Get attribute value |
| `setAttribute(attributeType, value)` | - | Set attribute |
| `removeAttribute(attributeType)` | - | Remove attribute |

**Attribute Types:**
- `ITEM_ATTRIBUTE_ACTIONID`
- `ITEM_ATTRIBUTE_UNIQUEID`
- `ITEM_ATTRIBUTE_DESCRIPTION`
- `ITEM_ATTRIBUTE_TEXT`
- `ITEM_ATTRIBUTE_WRITER`
- `ITEM_ATTRIBUTE_NAME`
- `ITEM_ATTRIBUTE_ATTACK`
- `ITEM_ATTRIBUTE_DEFENSE`
- `ITEM_ATTRIBUTE_ARMOR`
- `ITEM_ATTRIBUTE_DURATION`
- `ITEM_ATTRIBUTE_CHARGES`

```lua
-- Set custom name
item:setAttribute(ITEM_ATTRIBUTE_NAME, "Magic Sword")

-- Get attack value
local attack = item:getAttribute(ITEM_ATTRIBUTE_ATTACK)
```

---

## Custom Attributes

| Method | Returns | Description |
|--------|---------|-------------|
| `getCustomAttribute(key)` | varies | Get custom attribute |
| `setCustomAttribute(key, value)` | - | Set custom attribute |
| `removeCustomAttribute(key)` | - | Remove custom attribute |

```lua
-- Set custom data
item:setCustomAttribute("owner", player:getName())
item:setCustomAttribute("created", os.time())

-- Get custom data
local owner = item:getCustomAttribute("owner")
```

---

## Manipulation

| Method | Returns | Description |
|--------|---------|-------------|
| `clone()` | Item | Create copy |
| `split(count)` | Item | Split stack |
| `remove(count)` | boolean | Remove item/count |
| `moveTo(destination, flags)` | ReturnValue | Move item |
| `transform(itemId, count)` | boolean | Transform to another item |
| `decay()` | - | Start decay timer |

```lua
-- Remove 1 from stack
item:remove(1)

-- Remove entire item
item:remove()

-- Transform item
item:transform(2160)  -- Transform to crystal coin

-- Move to player
item:moveTo(player)
```

---

## Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `hasProperty(property)` | boolean | Has property |
| `isLoadedFromMap()` | boolean | Is map item |
| `isStoreItem()` | boolean | Is store item |
| `setStoreItem(isStore)` | - | Set store item flag |

---

## Imbuements

| Method | Returns | Description |
|--------|---------|-------------|
| `getImbuementSlots()` | number | Total imbue slots |
| `getFreeImbuementSlots()` | number | Available slots |
| `canImbue()` | boolean | Can be imbued |
| `addImbuementSlots(count)` | - | Add imbue slots |
| `removeImbuementSlots(count)` | - | Remove slots |
| `hasImbuementType(type)` | boolean | Has imbue type |
| `hasImbuements()` | boolean | Has any imbues |
| `addImbuement(imbuement)` | boolean | Add imbuement |
| `removeImbuement(slot)` | boolean | Remove imbuement |
| `getImbuements()` | table | Get all imbues |

---

## Augments

| Method | Returns | Description |
|--------|---------|-------------|
| `addAugment(augment)` | boolean | Add augment |
| `removeAugment(augment)` | boolean | Remove augment |
| `isAugmented()` | boolean | Has any augments |
| `hasAugment(augment)` | boolean | Has specific augment |
| `getAugments()` | table | Get all augments |

---

## Custom Skills

| Method | Returns | Description |
|--------|---------|-------------|
| `giveSkill(name, params)` | - | Add custom skill |
| `addSkill(name, levels)` | - | Add levels |
| `subtractSkill(name, levels)` | - | Remove levels |
| `removeSkill(name)` | - | Remove skill |
| `hasSkill(name)` | boolean | Has skill |
| `getSkillLevel(name)` | number | Skill level |
| `canGainLevels()` | boolean | Can gain levels |

---

## Stats

| Method | Returns | Description |
|--------|---------|-------------|
| `giveStat(name, params)` | - | Add custom stat |
| `removeStat(name)` | - | Remove stat |
| `increaseStat(name, value)` | - | Increase stat |
| `decreaseStat(name, value)` | - | Decrease stat |
| `hasStat(name)` | boolean | Has stat |
| `getStat(name)` | Stat | Get stat |
| `getStats()` | table | All stats |

---

## Examples

### Quest Item Check

```lua
local function isQuestItem(item)
    return item:getActionId() >= 1000 and item:getActionId() < 2000
end
```

### Create Custom Item

```lua
local function createEnchantedSword(player)
    local item = player:addItem(2400, 1)  -- Sword
    if item then
        item:setAttribute(ITEM_ATTRIBUTE_NAME, "Enchanted Sword")
        item:setAttribute(ITEM_ATTRIBUTE_ATTACK, 50)
        item:setAttribute(ITEM_ATTRIBUTE_DEFENSE, 35)
        item:setCustomAttribute("enchantLevel", 1)
    end
    return item
end
```

### Split Stack

```lua
local function splitHalf(item)
    local count = item:getCount()
    if count > 1 then
        return item:split(math.floor(count / 2))
    end
    return nil
end
```

### Transform on Use

```lua
function onUse(player, item, fromPosition, target, toPosition, isHotkey)
    -- Transform empty vial to full
    if item:getId() == 2006 then
        item:transform(2007)  -- Full vial
        return true
    end
    return false
end
```

### Move Item Safely

```lua
local function moveItemTo(item, destination)
    local result = item:moveTo(destination)
    if result ~= RETURNVALUE_NOERROR then
        local message = Game.getReturnMessage(result)
        return false, message
    end
    return true
end
```
