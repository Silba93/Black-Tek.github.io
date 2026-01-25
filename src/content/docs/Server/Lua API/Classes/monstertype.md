---
title: MonsterType
---

# MonsterType Class

The MonsterType class provides static information about monster types.

## Constructor

```lua
MonsterType(name)
```

---

## Basic Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getName()` | string | Monster name |
| `getNameDescription()` | string | Name description |
| `getExperience()` | number | Experience given |
| `getHealth()` | number | Base health |
| `getMaxHealth()` | number | Maximum health |
| `getCombatImmunities()` | number | Combat immunities |
| `getConditionImmunities()` | number | Condition immunities |
| `getRunHealth()` | number | Health to flee |
| `getBaseSpeed()` | number | Base speed |
| `getLight()` | level, color | Light info |

```lua
local mt = MonsterType("Dragon")
if mt then
    print("Name: " .. mt:getName())
    print("HP: " .. mt:getHealth())
    print("Exp: " .. mt:getExperience())
end
```

---

## Classification

| Method | Returns | Description |
|--------|---------|-------------|
| `isBoss()` | boolean | Is boss |
| `isRewardBoss()` | boolean | Is reward boss |
| `isConvinceable()` | boolean | Can be convinced |
| `isSummonable()` | boolean | Can be summoned |
| `isIllusionable()` | boolean | Can be illusioned |
| `isHostile()` | boolean | Is hostile |
| `isPushable()` | boolean | Can be pushed |
| `isHealthHidden()` | boolean | Health hidden |
| `canPushItems()` | boolean | Pushes items |
| `canPushCreatures()` | boolean | Pushes creatures |
| `canWalkOnEnergy()` | boolean | Walks on energy |
| `canWalkOnFire()` | boolean | Walks on fire |
| `canWalkOnPoison()` | boolean | Walks on poison |

---

## Combat

| Method | Returns | Description |
|--------|---------|-------------|
| `getAttackList()` | table | Attack spells |
| `getDefenseList()` | table | Defense spells |
| `getTargetDistance()` | number | Target distance |
| `getStaticAttackChance()` | number | Attack chance |
| `getChangeTargetChance()` | number | Retarget chance |
| `getChangeTargetSpeed()` | number | Retarget speed |
| `getArmor()` | number | Armor value |
| `getDefense()` | number | Defense value |

---

## Appearance

| Method | Returns | Description |
|--------|---------|-------------|
| `getOutfit()` | Outfit | Monster outfit |
| `getRace()` | number | Race type |
| `getCorpseId()` | number | Corpse item ID |

---

## Loot

| Method | Returns | Description |
|--------|---------|-------------|
| `getLoot()` | table | Loot table |
| `addLoot(loot)` | - | Add loot |

```lua
local loot = mt:getLoot()
for _, item in ipairs(loot) do
    print(item.itemId, item.chance)
end
```

---

## Summons

| Method | Returns | Description |
|--------|---------|-------------|
| `getSummonList()` | table | Summon list |
| `getMaxSummons()` | number | Max summons |

---

## Elements

| Method | Returns | Description |
|--------|---------|-------------|
| `getElementList()` | table | Element modifiers |

---

## Creation

| Method | Returns | Description |
|--------|---------|-------------|
| `createLoot(position)` | table | Create loot items |
| `createLootContainer(position)` | Container | Create loot container |

---

## Examples

### Monster Info

```lua
local function getMonsterInfo(name)
    local mt = MonsterType(name)
    if not mt then
        return nil
    end
    
    return {
        name = mt:getName(),
        health = mt:getHealth(),
        experience = mt:getExperience(),
        hostile = mt:isHostile(),
        boss = mt:isBoss()
    }
end
```

### Check Immunities

```lua
local function isImmuneToFire(monsterType)
    local immunities = monsterType:getCombatImmunities()
    return bit.band(immunities, COMBAT_FIREDAMAGE) ~= 0
end
```
