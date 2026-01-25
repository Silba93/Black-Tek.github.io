---
title: Augment and DamageModifier
---

# Augment System

Augments are custom modifiers that can be applied to items and creatures to alter combat behavior.

## Augment Class

### Constructor

```lua
Augment(name)
```

---

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getName()` | string | Augment name |
| `addDamageModifier(modifier)` | - | Add damage modifier |
| `getDamageModifiers()` | table | Get all modifiers |
| `register()` | - | Register augment |

---

### Creating an Augment

```lua
local fireAugment = Augment("Fire Mastery")

-- Add damage modifier for fire attacks
local modifier = DamageModifier()
modifier:setDamageType(COMBAT_FIREDAMAGE)
modifier:setPercent(25)  -- +25% fire damage

fireAugment:addDamageModifier(modifier)
fireAugment:register()
```

---

## DamageModifier Class

DamageModifiers define how damage is altered by augments.

### Constructor

```lua
DamageModifier()
```

---

### Methods

| Method | Description |
|--------|-------------|
| `setDamageType(combatType)` | Set damage type affected |
| `setPercent(percent)` | Set percentage modifier |
| `setFlat(amount)` | Set flat modifier |
| `setOrigin(origin)` | Set combat origin |
| `setPhase(phase)` | Set when modifier applies |

**Phases:**
- `MODIFIER_PHASE_DEALT` - When dealing damage
- `MODIFIER_PHASE_RECEIVED` - When receiving damage

```lua
-- Damage reduction augment
local defenseModifier = DamageModifier()
defenseModifier:setDamageType(COMBAT_PHYSICALDAMAGE)
defenseModifier:setPercent(-15)  -- -15% physical damage received
defenseModifier:setPhase(MODIFIER_PHASE_RECEIVED)
```

---

## Applying Augments

### To Items

```lua
-- Add augment to item
item:addAugment(augment)

-- Check augments
if item:isAugmented() then
    local augments = item:getAugments()
    for _, aug in ipairs(augments) do
        print(aug:getName())
    end
end

-- Remove augment
item:removeAugment(augment)
```

### To Creatures

```lua
-- Add to player/creature
player:addAugment(augment)

-- Check
if player:hasAugment(augment) then
    print("Has augment!")
end

-- Remove
player:removeAugment(augment)
```

---

## Examples

### Life Steal Augment

```lua
local lifeSteal = Augment("Vampirism")

local modifier = DamageModifier()
modifier:setDamageType(COMBAT_PHYSICALDAMAGE)
modifier:setLifeStealPercent(10)  -- 10% life steal
modifier:setPhase(MODIFIER_PHASE_DEALT)

lifeSteal:addDamageModifier(modifier)
lifeSteal:register()
```

### Elemental Resistance

```lua
local iceResist = Augment("Frost Ward")

local modifier = DamageModifier()
modifier:setDamageType(COMBAT_ICEDAMAGE)
modifier:setPercent(-20)  -- 20% ice resistance
modifier:setPhase(MODIFIER_PHASE_RECEIVED)

iceResist:addDamageModifier(modifier)
iceResist:register()
```

---