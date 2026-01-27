---
title: MonsterSpell
---

# MonsterSpell Class

MonsterSpell is a sub-class of Spell and used to define spells for custom monster types.

## Constructor

```lua
MonsterSpell()
```

## Methods

| Method | Description |
|--------|-------------|
| `setType(type)` | Set spell type |
| `setScriptName(name)` | Set script name |
| `setChance(chance)` | Set cast chance (0-100) |
| `setInterval(ms)` | Set cast interval |
| `setRange(range)` | Set cast range |
| `setCombatValue(min, max)` | Set damage range |
| `setCombatType(type)` | Set combat type |
| `setAttackValue(value)` | Set attack value |
| `setNeedTarget(need)` | Requires target |
| `setNeedDirection(need)` | Requires direction |
| `setCombatLength(length)` | Set wave length |
| `setCombatSpread(spread)` | Set wave spread |
| `setCombatRadius(radius)` | Set area radius |
| `setConditionType(type)` | Set condition type |
| `setConditionDamage(min, max, start)` | Set condition damage |
| `setConditionSpeedChange(change)` | Set speed change |
| `setConditionDuration(ms)` | Set condition duration |
| `setConditionDrunkenness(level)` | Set drunk level |
| `setConditionTickInterval(ms)` | Set tick interval |
| `setCombatShootEffect(effect)` | Set projectile effect |
| `setCombatEffect(effect)` | Set magic effect |
| `setOutfit(outfit)` | Set outfit change |
| `delete()` | Free memory |

---

## Examples

### Create Fire Attack

```lua
local function createFireAttack()
    local spell = MonsterSpell()
    spell:setType("combat")
    spell:setCombatType(COMBAT_FIREDAMAGE)
    spell:setCombatValue(-100, -150)
    spell:setRange(7)
    spell:setChance(20)
    spell:setInterval(2000)
    spell:setCombatShootEffect(CONST_ANI_FIRE)
    spell:setCombatEffect(CONST_ME_FIREAREA)
    spell:setNeedTarget(true)
    return spell
end
```

### Create Healing Spell

```lua
local function createHealingSpell()
    local spell = MonsterSpell()
    spell:setType("combat")
    spell:setCombatType(COMBAT_HEALING)
    spell:setCombatValue(50, 100)
    spell:setChance(15)
    spell:setInterval(2000)
    spell:setCombatEffect(CONST_ME_MAGIC_BLUE)
    spell:setNeedTarget(false)
    return spell
end
```

### Create Paralyze Spell

```lua
local function createParalyzeSpell()
    local spell = MonsterSpell()
    spell:setType("condition")
    spell:setConditionType(CONDITION_PARALYZE)
    spell:setConditionSpeedChange(-200)
    spell:setConditionDuration(10000)
    spell:setRange(5)
    spell:setChance(15)
    spell:setInterval(4000)
    spell:setCombatEffect(CONST_ME_MAGIC_RED)
    spell:setNeedTarget(true)
    return spell
end
```

### Create Wave Attack

```lua
local function createFireWave()
    local spell = MonsterSpell()
    spell:setType("combat")
    spell:setCombatType(COMBAT_FIREDAMAGE)
    spell:setCombatValue(-80, -120)
    spell:setCombatLength(8)
    spell:setCombatSpread(3)
    spell:setChance(15)
    spell:setInterval(2000)
    spell:setCombatEffect(CONST_ME_FIREAREA)
    spell:setNeedDirection(true)
    return spell
end
```

### Add Spells to MonsterType

```lua
local function setupDragonSpells(monsterType)
    -- Fire attack
    local fireAttack = createFireAttack()
    monsterType:addAttack(fireAttack)
    
    -- Fire wave
    local fireWave = createFireWave()
    monsterType:addAttack(fireWave)
    
    -- Self healing
    local healing = createHealingSpell()
    monsterType:addDefense(healing)
end
```

### Create Summon Spell

```lua
local function createSummonSpell()
    local spell = MonsterSpell()
    spell:setType("summon")
    spell:setScriptName("Fire Elemental")
    spell:setChance(10)
    spell:setInterval(8000)
    return spell
end
```
