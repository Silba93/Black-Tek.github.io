---
title: Vocation
---

# Vocation Class

The Vocation class represents player vocations (Knight, Sorcerer, etc.).

## Constructor

```lua
Vocation(id)
Vocation(name)
```

---

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Vocation ID |
| `getClientId()` | number | Client vocation ID |
| `getName()` | string | Vocation name |
| `getDescription()` | string | Description |
| `getPromotion()` | Vocation | Promoted vocation |
| `getBaseId()` | number | Base vocation ID |
| `getFromVocation()` | Vocation | Base vocation |
| `getRequiredManaSpent(magLevel)` | number | Mana for magic level |
| `getRequiredSkillTries(skill, level)` | number | Tries for skill |
| `getCapacityGain()` | number | Capacity per level |
| `getHealthGain()` | number | HP per level |
| `getHealthGainTicks()` | number | HP regen interval |
| `getHealthGainAmount()` | number | HP regen amount |
| `getManaGain()` | number | Mana per level |
| `getManaGainTicks()` | number | Mana regen interval |
| `getManaGainAmount()` | number | Mana regen amount |
| `getMaxSoul()` | number | Maximum soul |
| `getSoulGainTicks()` | number | Soul regen interval |
| `getAttackSpeed()` | number | Attack speed |
| `getBaseSpeed()` | number | Base movement speed |
| `getDemotion()` | Vocation | Demoted vocation |

```lua
local voc = player:getVocation()
print("Vocation: " .. voc:getName())
print("HP per level: " .. voc:getHealthGain())

-- Get promotion
local promo = voc:getPromotion()
if promo then
    print("Promotes to: " .. promo:getName())
end
```

---