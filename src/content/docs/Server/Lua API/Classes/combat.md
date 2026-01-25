---
title: Combat
---

# Combat Class

The Combat class handles damage dealing, healing, and combat effects.

## Constructor

```lua
Combat()
```

---

## Parameters

### `setParameter(key, value)`

| Key | Values | Description |
|-----|--------|-------------|
| `COMBAT_PARAM_TYPE` | COMBAT_* | Damage type |
| `COMBAT_PARAM_EFFECT` | CONST_ME_* | Magic effect |
| `COMBAT_PARAM_DISTANCEEFFECT` | CONST_ANI_* | Distance effect |
| `COMBAT_PARAM_BLOCKSHIELD` | boolean | Blocked by shield |
| `COMBAT_PARAM_BLOCKARMOR` | boolean | Blocked by armor |
| `COMBAT_PARAM_TARGETCASTERORTOPMOST` | boolean | Target caster |
| `COMBAT_PARAM_CREATEITEM` | itemId | Create item |
| `COMBAT_PARAM_AGGRESSIVE` | boolean | Is aggressive |
| `COMBAT_PARAM_DISPEL` | CONDITION_* | Dispel condition |
| `COMBAT_PARAM_USECHARGES` | boolean | Use charges |

```lua
local combat = Combat()
combat:setParameter(COMBAT_PARAM_TYPE, COMBAT_FIREDAMAGE)
combat:setParameter(COMBAT_PARAM_EFFECT, CONST_ME_FIREAREA)
combat:setParameter(COMBAT_PARAM_DISTANCEEFFECT, CONST_ANI_FIRE)
```

---

## Combat Types

| Constant | Description |
|----------|-------------|
| `COMBAT_NONE` | No damage |
| `COMBAT_PHYSICALDAMAGE` | Physical |
| `COMBAT_ENERGYDAMAGE` | Energy |
| `COMBAT_EARTHDAMAGE` | Earth/Poison |
| `COMBAT_FIREDAMAGE` | Fire |
| `COMBAT_UNDEFINEDDAMAGE` | Undefined |
| `COMBAT_LIFEDRAIN` | Life drain |
| `COMBAT_MANADRAIN` | Mana drain |
| `COMBAT_HEALING` | Healing |
| `COMBAT_DROWNDAMAGE` | Drown |
| `COMBAT_ICEDAMAGE` | Ice |
| `COMBAT_HOLYDAMAGE` | Holy |
| `COMBAT_DEATHDAMAGE` | Death |

---

## Damage Formula

### `setFormula(type, mina, minb, maxa, maxb, minl, maxl, minm, maxm, minc, maxc)`

| Formula Type | Description |
|--------------|-------------|
| `COMBAT_FORMULA_UNDEFINED` | Undefined |
| `COMBAT_FORMULA_LEVELMAGIC` | Level + Magic Level based |
| `COMBAT_FORMULA_SKILL` | Skill based |
| `COMBAT_FORMULA_DAMAGE` | Fixed damage range |

```lua
-- Level + Magic based formula
combat:setFormula(COMBAT_FORMULA_LEVELMAGIC,
    0, 0,    -- min a, b (multipliers)
    0, 0,    -- max a, b (multipliers)
    5, 10)   -- min damage, max damage base

-- Fixed damage
combat:setFormula(COMBAT_FORMULA_DAMAGE,
    0, -50,  -- min = -50
    0, -100) -- max = -100
```

---

## Combat Area

### `setArea(area)`

```lua
local area = createCombatArea({
    {0, 0, 1, 0, 0},
    {0, 1, 1, 1, 0},
    {1, 1, 3, 1, 1},  -- 3 = center
    {0, 1, 1, 1, 0},
    {0, 0, 1, 0, 0}
})
combat:setArea(area)
```

**Area values:**
- `0` = No effect
- `1` = Effect area
- `2` = Alternative area
- `3` = Center point

---

## Conditions

### `addCondition(condition)`
### `setCondition(condition)`

```lua
local condition = Condition(CONDITION_FIRE)
condition:setParameter(CONDITION_PARAM_TICKS, 10000)
condition:setParameter(CONDITION_PARAM_MINVALUE, 10)
condition:setParameter(CONDITION_PARAM_MAXVALUE, 20)
combat:addCondition(condition)
```

---

## Callbacks

### `setCallback(key, function)`

| Callback | Parameters |
|----------|------------|
| `CALLBACK_PARAM_LEVELMAGICVALUE` | `(player, level, maglevel)` |
| `CALLBACK_PARAM_SKILLVALUE` | `(player, skill, attack, factor)` |
| `CALLBACK_PARAM_TARGETTILE` | `(creature, tile)` |
| `CALLBACK_PARAM_TARGETCREATURE` | `(creature, target)` |

```lua
combat:setCallback(CALLBACK_PARAM_LEVELMAGICVALUE, function(player, level, maglevel)
    local min = (level / 5) + (maglevel * 2)
    local max = (level / 5) + (maglevel * 3)
    return -min, -max
end)
```

---

## Execution

### `execute(creature, variant)`

```lua
function spell.onCastSpell(creature, variant)
    return combat:execute(creature, variant)
end
```

---

## Examples

### Fire Attack Spell

```lua
local combat = Combat()
combat:setParameter(COMBAT_PARAM_TYPE, COMBAT_FIREDAMAGE)
combat:setParameter(COMBAT_PARAM_EFFECT, CONST_ME_FIREAREA)

local area = createCombatArea({
    {1, 1, 1},
    {1, 3, 1},
    {1, 1, 1}
})
combat:setArea(area)

combat:setCallback(CALLBACK_PARAM_LEVELMAGICVALUE, function(player, level, maglevel)
    local min = (level / 5) + (maglevel * 1.5) + 10
    local max = (level / 5) + (maglevel * 2.5) + 20
    return -min, -max
end)

local spell = Spell(SPELL_INSTANT)
function spell.onCastSpell(creature, variant)
    return combat:execute(creature, variant)
end
```

### Healing Spell

```lua
local combat = Combat()
combat:setParameter(COMBAT_PARAM_TYPE, COMBAT_HEALING)
combat:setParameter(COMBAT_PARAM_EFFECT, CONST_ME_MAGIC_BLUE)
combat:setParameter(COMBAT_PARAM_AGGRESSIVE, false)

combat:setCallback(CALLBACK_PARAM_LEVELMAGICVALUE, function(player, level, maglevel)
    local min = (level / 5) + (maglevel * 3) + 20
    local max = (level / 5) + (maglevel * 5) + 40
    return min, max  -- Positive for healing
end)
```

### Condition Spell (Paralyze)

```lua
local combat = Combat()
combat:setParameter(COMBAT_PARAM_EFFECT, CONST_ME_MAGIC_RED)

local condition = Condition(CONDITION_PARALYZE)
condition:setParameter(CONDITION_PARAM_TICKS, 20000)
condition:setParameter(CONDITION_PARAM_SPEED, -40)
combat:addCondition(condition)
```
