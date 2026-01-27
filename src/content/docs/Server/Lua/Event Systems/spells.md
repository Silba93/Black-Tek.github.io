---
title: Spells
---

# Spells

Spells in BlackTek Server are divided into two types: **Instant Spells** (spoken words) and **Rune Spells** (using rune items).

## Spell Types

| Type | Trigger | Example |
|------|---------|---------|
| Instant | Speaking words | "exura", "exori" |
| Rune | Using rune item | Sudden Death Rune |

---

## Creating a Spell

### Instant Spell

```lua
local spell = Spell(SPELL_INSTANT)

function spell.onCastSpell(creature, variant)
    creature:getPosition():sendMagicEffect(CONST_ME_MAGIC_BLUE)
    return true
end

spell:name("Test Spell")
spell:words("exevo test")
spell:level(1)
spell:mana(10)
spell:register()
```

### Rune Spell

```lua
local rune = Spell(SPELL_RUNE)

function rune.onCastSpell(creature, variant)
    local target = variant:getPosition()
    target:sendMagicEffect(CONST_ME_EXPLOSIONHIT)
    return true
end

rune:name("Test Rune")
rune:runeId(2260)  -- Rune item ID
rune:level(1)
rune:magicLevel(1)
rune:register()
```

---

## Methods

### Basic Properties

| Method | Description |
|--------|-------------|
| `name(name)` | Spell name |
| `id(id)` | Spell ID |
| `words(words)` | Trigger words (instant spells) |
| `level(level)` | Required level |
| `magicLevel(level)` | Required magic level |
| `mana(mana)` | Mana cost |
| `manaPercent(percent)` | Mana cost as percentage of max mana |
| `soul(soul)` | Soul cost |
| `range(range)` | Cast range |
| `isPremium(premium)` | Premium requirement |
| `isEnabled(enabled)` | Enable/disable spell |
| `vocation(vocName, show)` | Add vocation requirement |

### Instant Spell Properties

| Method | Description |
|--------|-------------|
| `words(words)` | Trigger words |
| `needDirection(need)` | Requires facing direction |
| `hasParams(has)` | Accepts parameters |
| `hasPlayerNameParam(has)` | Accepts player name parameter |
| `needCasterTargetOrDirection(need)` | Needs target or direction |
| `isBlockingWalls(blocking)` | Blocked by walls |

### Rune Spell Properties

| Method | Description |
|--------|-------------|
| `runeId(id)` | Rune item ID |
| `runeLevel(level)` | Level to use rune |
| `runeMagicLevel(level)` | Magic level to use rune |
| `charges(charges)` | Rune charges |
| `allowFarUse(allow)` | Allow far use |
| `blockWalls(block)` | Blocked by walls |
| `checkFloor(check)` | Check floor difference |

### Combat Properties

| Method | Description |
|--------|-------------|
| `group(group)` | Spell group |
| `groupCooldown(ms)` | Group cooldown |
| `cooldown(ms)` | Spell cooldown |
| `needTarget(need)` | Requires target |
| `needWeapon(need)` | Requires weapon |
| `needLearn(need)` | Must be learned |
| `isSelfTarget(self)` | Self-targeting |
| `isBlocking(blocking)` | Blocked by creatures/walls |
| `isAggressive(aggressive)` | Aggressive spell |
| `isPzLock(lock)` | Causes PZ lock |

### Spell Groups

- `SPELLGROUP_ATTACK` (1)
- `SPELLGROUP_HEALING` (2)
- `SPELLGROUP_SUPPORT` (3)
- `SPELLGROUP_SPECIAL` (4)

---

## Callback

### `onCastSpell(creature, variant)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `creature` | Creature | The caster |
| `variant` | Variant | Target information |

**Variant Methods:**
- `variant:getNumber()` - Get number value
- `variant:getString()` - Get string value (player name param)
- `variant:getPosition()` - Get target position

---

## Examples

### Healing Spell

```lua
local healSpell = Spell(SPELL_INSTANT)

function healSpell.onCastSpell(creature, variant)
    local minHeal = creature:getLevel() * 2
    local maxHeal = creature:getLevel() * 3 + creature:getMagicLevel() * 2
    
    creature:addHealth(math.random(minHeal, maxHeal))
    creature:getPosition():sendMagicEffect(CONST_ME_MAGIC_BLUE)
    
    return true
end

healSpell:name("Light Healing")
healSpell:words("exura")
healSpell:group(SPELLGROUP_HEALING)
healSpell:level(8)
healSpell:mana(20)
healSpell:cooldown(1000)
healSpell:groupCooldown(1000)
healSpell:vocation("sorcerer", true)
healSpell:vocation("druid", true)
healSpell:register()
```

### Area Attack Spell

```lua
local areaSpell = Spell(SPELL_INSTANT)

function areaSpell.onCastSpell(creature, variant)
    local combat = Combat()
    combat:setParameter(COMBAT_PARAM_TYPE, COMBAT_FIREDAMAGE)
    combat:setParameter(COMBAT_PARAM_EFFECT, CONST_ME_FIREAREA)
    
    -- Create area
    local area = createCombatArea({
        {0, 1, 0},
        {1, 3, 1},
        {0, 1, 0}
    })
    combat:setArea(area)
    
    -- Set damage formula
    combat:setFormula(COMBAT_FORMULA_LEVELMAGIC, 
        0, 0,   -- min a, b
        0, 0,   -- max a, b
        20, 50) -- min, max damage
    
    return combat:execute(creature, variant)
end

areaSpell:name("Fire Wave")
areaSpell:words("exevo flam")
areaSpell:group(SPELLGROUP_ATTACK)
areaSpell:level(20)
areaSpell:mana(50)
areaSpell:cooldown(4000)
areaSpell:needDirection(true)
areaSpell:isAggressive(true)
areaSpell:register()
```

### Target Spell with Condition

```lua
local paralyzeSpell = Spell(SPELL_INSTANT)

function paralyzeSpell.onCastSpell(creature, variant)
    local target = variant:getNumber()
    local targetCreature = Creature(target)
    
    if not targetCreature then
        creature:sendCancelMessage("You need a target.")
        return false
    end
    
    local condition = Condition(CONDITION_PARALYZE)
    condition:setParameter(CONDITION_PARAM_TICKS, 10000)
    condition:setParameter(CONDITION_PARAM_SPEED, -50)
    
    targetCreature:addCondition(condition)
    targetCreature:getPosition():sendMagicEffect(CONST_ME_MAGIC_RED)
    
    return true
end

paralyzeSpell:name("Paralyze")
paralyzeSpell:words("exori mort")
paralyzeSpell:group(SPELLGROUP_ATTACK)
paralyzeSpell:level(40)
paralyzeSpell:mana(100)
paralyzeSpell:cooldown(6000)
paralyzeSpell:needTarget(true)
paralyzeSpell:range(3)
paralyzeSpell:isAggressive(true)
paralyzeSpell:register()
```

### Rune Spell

```lua
local sdRune = Spell(SPELL_RUNE)

function sdRune.onCastSpell(creature, variant)
    local combat = Combat()
    combat:setParameter(COMBAT_PARAM_TYPE, COMBAT_DEATHDAMAGE)
    combat:setParameter(COMBAT_PARAM_EFFECT, CONST_ME_MORTAREA)
    combat:setParameter(COMBAT_PARAM_DISTANCEEFFECT, CONST_ANI_DEATH)
    
    combat:setFormula(COMBAT_FORMULA_LEVELMAGIC,
        0, 0, 0, 0,
        50, 150)
    
    return combat:execute(creature, variant)
end

sdRune:name("Sudden Death Rune")
sdRune:runeId(2268)
sdRune:level(45)
sdRune:magicLevel(15)
sdRune:charges(3)
sdRune:allowFarUse(true)
sdRune:needTarget(true)
sdRune:isAggressive(true)
sdRune:register()
```

### Support Spell (Haste)

```lua
local hasteSpell = Spell(SPELL_INSTANT)

function hasteSpell.onCastSpell(creature, variant)
    local condition = Condition(CONDITION_HASTE)
    condition:setParameter(CONDITION_PARAM_TICKS, 30000)
    condition:setParameter(CONDITION_PARAM_SPEED, 
        math.floor(creature:getBaseSpeed() * 0.3))
    
    creature:addCondition(condition)
    creature:getPosition():sendMagicEffect(CONST_ME_MAGIC_GREEN)
    
    return true
end

hasteSpell:name("Haste")
hasteSpell:words("utani hur")
hasteSpell:group(SPELLGROUP_SUPPORT)
hasteSpell:level(14)
hasteSpell:mana(60)
hasteSpell:cooldown(2000)
hasteSpell:isSelfTarget(true)
hasteSpell:isAggressive(false)
hasteSpell:register()
```

---

## Combat Areas

### Creating Areas

```lua
local area = createCombatArea({
    {0, 0, 1, 0, 0},
    {0, 1, 1, 1, 0},
    {1, 1, 3, 1, 1},  -- 3 = center (caster position)
    {0, 1, 1, 1, 0},
    {0, 0, 1, 0, 0}
})
```

Values:
- `0` = No effect
- `1` = Effect area
- `2` = Alternative effect area
- `3` = Center/caster position

---

## File Location

```
data/scripts/spells/
```
