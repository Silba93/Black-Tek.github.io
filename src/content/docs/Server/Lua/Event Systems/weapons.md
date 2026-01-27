---
title: Weapons
---

# Weapons

Weapons in BlackTek Server can be scripted to add custom behavior, damage formulas, and special effects.

## Creating a Weapon

```lua
local weapon = Weapon(WEAPON_SWORD)

function weapon.onUseWeapon(player, variant)
    return true
end

weapon:id(2400)  -- Item ID
weapon:register()
```

---

## Weapon Types

| Type | Constant |
|------|----------|
| Sword | `WEAPON_SWORD` |
| Club | `WEAPON_CLUB` |
| Axe | `WEAPON_AXE` |
| Shield | `WEAPON_SHIELD` |
| Distance | `WEAPON_DISTANCE` |
| Wand | `WEAPON_WAND` |
| Ammunition | `WEAPON_AMMO` |

---

## Methods

### Basic Properties

| Method | Description |
|--------|-------------|
| `id(itemId)` | Item ID |
| `level(level)` | Required level |
| `magicLevel(level)` | Required magic level |
| `mana(mana)` | Mana cost per attack |
| `manaPercent(percent)` | Mana as percentage |
| `health(health)` | Health cost |
| `healthPercent(percent)` | Health as percentage |
| `soul(soul)` | Soul cost |
| `isPremium(premium)` | Premium requirement |
| `vocation(vocName, show)` | Vocation requirement |

### Combat Properties

| Method | Description |
|--------|-------------|
| `attack(attack)` | Attack value |
| `defense(defense)` | Defense value |
| `range(range)` | Attack range |
| `charges(charges)` | Item charges |
| `duration(seconds)` | Item duration |
| `decayTo(itemId)` | Decay target ID |
| `breakChance(percent)` | Break chance percentage |
| `hitChance(percent)` | Hit chance |
| `maxHitChance(percent)` | Maximum hit chance |
| `element(type, damage)` | Elemental damage |
| `extraElement(type, damage)` | Extra elemental damage |

### Distance Weapon Properties

| Method | Description |
|--------|-------------|
| `ammoType(type)` | Required ammo type |
| `shootType(type)` | Projectile animation |

### Wand Properties

| Method | Description |
|--------|-------------|
| `wandDamage(min, max)` | Wand damage range |
| `shootType(type)` | Projectile animation |

### Transformation

| Method | Description |
|--------|-------------|
| `transformEquipTo(itemId)` | Transform to ID on equip |
| `transformDeEquipTo(itemId)` | Transform to ID on deequip |
| `slotType(slot)` | Equipment slot |

### Action Type

| Method | Description |
|--------|-------------|
| `action(actionType)` | Action on use |
| `unproperly(value)` | Handle improper wielding |

**Action Types:**
- `WEAPONACTION_REMOVECOUNT` - Remove count
- `WEAPONACTION_REMOVECHARGE` - Remove charge
- `WEAPONACTION_MOVE` - Move to target

---

## Callback

### `onUseWeapon(player, variant)`

```lua
function weapon.onUseWeapon(player, variant)
    -- Return true to allow attack, false to cancel
    return true
end
```

---

## Examples

### Basic Melee Weapon

```lua
local fireSword = Weapon(WEAPON_SWORD)

function fireSword.onUseWeapon(player, variant)
    local target = Creature(variant:getNumber())
    if target then
        target:getPosition():sendMagicEffect(CONST_ME_HITBYFIRE)
    end
    return true
end

fireSword:id(2392)  -- Fire Sword
fireSword:level(30)
fireSword:attack(35)
fireSword:defense(20)
fireSword:element(COMBAT_FIREDAMAGE, 10)
fireSword:vocation("knight", true)
fireSword:vocation("elite knight", true)
fireSword:register()
```

### Distance Weapon

```lua
local crossbow = Weapon(WEAPON_DISTANCE)

crossbow:id(2455)  -- Crossbow
crossbow:level(25)
crossbow:range(6)
crossbow:ammoType(AMMO_BOLT)
crossbow:hitChance(90)
crossbow:maxHitChance(95)
crossbow:vocation("paladin", true)
crossbow:vocation("royal paladin", true)
crossbow:register()
```

### Wand

```lua
local fireWand = Weapon(WEAPON_WAND)

fireWand:id(2190)  -- Wand of Inferno
fireWand:level(33)
fireWand:mana(8)
fireWand:wandDamage(56, 74)
fireWand:element(COMBAT_FIREDAMAGE, 0)
fireWand:shootType(CONST_ANI_FIRE)
fireWand:vocation("sorcerer", true)
fireWand:vocation("master sorcerer", true)
fireWand:register()
```

### Throwing Weapon

```lua
local spear = Weapon(WEAPON_DISTANCE)

function spear.onUseWeapon(player, variant)
    -- Break chance
    if math.random(100) <= 5 then
        player:sendTextMessage(MESSAGE_STATUS_SMALL, "Your spear broke!")
        return false
    end
    return true
end

spear:id(2389)  -- Spear
spear:level(1)
spear:range(5)
spear:breakChance(5)
spear:shootType(CONST_ANI_SPEAR)
spear:action(WEAPONACTION_MOVE)
spear:register()
```

### Life Steal Weapon

```lua
local vampireSword = Weapon(WEAPON_SWORD)

function vampireSword.onUseWeapon(player, variant)
    local target = Creature(variant:getNumber())
    if target then
        -- 10% life steal
        local damage = math.random(30, 50)
        local heal = math.floor(damage * 0.1)
        player:addHealth(heal)
        player:getPosition():sendMagicEffect(CONST_ME_MAGIC_RED)
    end
    return true
end

vampireSword:id(8930)
vampireSword:level(50)
vampireSword:attack(45)
vampireSword:defense(25)
vampireSword:register()
```

### Ammunition

```lua
local bolt = Weapon(WEAPON_AMMO)

bolt:id(2543)  -- Bolt
bolt:attack(10)
bolt:shootType(CONST_ANI_BOLT)
bolt:action(WEAPONACTION_REMOVECOUNT)
bolt:register()
```

### Shield with Effect

```lua
local magicShield = Weapon(WEAPON_SHIELD)

magicShield:id(2537)  -- Magic Shield
magicShield:defense(20)
magicShield:register()
```

---

## Combat Types for Elements

- `COMBAT_PHYSICALDAMAGE`
- `COMBAT_ENERGYDAMAGE`
- `COMBAT_EARTHDAMAGE`
- `COMBAT_FIREDAMAGE`
- `COMBAT_ICEDAMAGE`
- `COMBAT_HOLYDAMAGE`
- `COMBAT_DEATHDAMAGE`

---

## File Location

```
data/scripts/weapons/
```
