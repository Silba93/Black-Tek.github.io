---
title: ItemType
---

# ItemType Class

The ItemType class provides static information about item types (from items.xml/items.otb).

## Constructor

```lua
ItemType(id)
ItemType(name)
```

---

## Basic Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Item ID |
| `getClientId()` | number | Client ID |
| `getName()` | string | Item name |
| `getPluralName()` | string | Plural name |
| `getArticle()` | string | Article (a/an) |
| `getDescription()` | string | Description |
| `getGroup()` | number | Item group |
| `getType()` | number | Item type |

```lua
local itemType = ItemType(2160)
print("Name: " .. itemType:getName())
print("ID: " .. itemType:getId())
```

---

## Classification

| Method | Returns | Description |
|--------|---------|-------------|
| `isMovable()` | boolean | Can be moved |
| `isStackable()` | boolean | Is stackable |
| `isPickupable()` | boolean | Can be picked up |
| `isContainer()` | boolean | Is container |
| `isFluidContainer()` | boolean | Is fluid container |
| `isRune()` | boolean | Is rune |
| `isDoor()` | boolean | Is door |
| `isMagicField()` | boolean | Is magic field |
| `isUseable()` | boolean | Is useable |
| `isBlocking()` | boolean | Blocks movement |
| `isGroundTile()` | boolean | Is ground tile |
| `isSplash()` | boolean | Is splash |
| `isPodium()` | boolean | Is podium |
| `isCorpse()` | boolean | Is corpse |

---

## Combat Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getAttack()` | number | Attack value |
| `getDefense()` | number | Defense value |
| `getExtraDefense()` | number | Extra defense |
| `getArmor()` | number | Armor value |
| `getWeaponType()` | number | Weapon type |
| `getShootRange()` | number | Shoot range |
| `getAmmoType()` | number | Ammo type |
| `getHitChance()` | number | Hit chance |

---

## Physical Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getWeight()` | number | Weight |
| `getSlotPosition()` | number | Slot flags |
| `getCapacity()` | number | Container capacity |
| `getFloorChange()` | number | Floor change |
| `getCharges()` | number | Default charges |
| `getRotateTo()` | number | Rotate to ID |
| `getWorth()` | number | Gold value |
| `getDecayId()` | number | Decay target ID |
| `getDecayTime()` | number | Decay time |

---

## Requirements

| Method | Returns | Description |
|--------|---------|-------------|
| `getMinReqLevel()` | number | Required level |
| `getMinReqMagicLevel()` | number | Required magic level |

---

## Abilities

| Method | Returns | Description |
|--------|---------|-------------|
| `getAbilities()` | table | Item abilities |
| `hasAbilities()` | boolean | Has any abilities |
| `hasShowAttributes()` | boolean | Shows attributes |
| `hasShowCharges()` | boolean | Shows charges |
| `hasShowDuration()` | boolean | Shows duration |

---

## Transformation

| Method | Returns | Description |
|--------|---------|-------------|
| `getTransformEquipId()` | number | Transform on equip |
| `getTransformDeEquipId()` | number | Transform on deequip |

---

## Examples

### Get Item Info

```lua
local function getItemInfo(itemId)
    local it = ItemType(itemId)
    if it:getId() == 0 then
        return nil
    end
    
    return {
        id = it:getId(),
        name = it:getName(),
        weight = it:getWeight(),
        attack = it:getAttack(),
        defense = it:getDefense(),
        armor = it:getArmor(),
        stackable = it:isStackable()
    }
end
```

### Check Equipment

```lua
local function isEquipment(itemId)
    local it = ItemType(itemId)
    local slot = it:getSlotPosition()
    return slot > 0
end
```

---

