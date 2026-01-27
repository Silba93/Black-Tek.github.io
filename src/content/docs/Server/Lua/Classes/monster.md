---
title: Monster
---

# Monster Class

The Monster class represents monster creatures in the game. It inherits from Creature.

## Constructor

```lua
Monster(id)
Monster(name)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | Monster creature ID |
| `name` | string | Monster name |

---

## Type Checking

### `isMonster()`
Returns `true` if the creature is a monster.

```lua
if creature:isMonster() then
    local monster = creature:getMonster()
end
```

---

## Basic Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Creature ID |
| `getName()` | string | Monster name |
| `getType()` | MonsterType | Monster type data |

---

## Spawn & Respawn

| Method | Returns | Description |
|--------|---------|-------------|
| `getSpawnPosition()` | Position | Original spawn position |
| `isInSpawnRange(position)` | boolean | Is within spawn range |
| `setSpawnPosition(position)` | - | Set spawn position |

```lua
local spawnPos = monster:getSpawnPosition()
if not monster:isInSpawnRange(monster:getPosition()) then
    monster:teleportTo(spawnPos)
end
```

---

## Target & Combat

| Method | Returns | Description |
|--------|---------|-------------|
| `getTarget()` | Creature | Current target |
| `setTarget(creature)` | - | Set attack target |
| `selectTarget(creature)` | boolean | Select new target |
| `searchTarget(searchType)` | boolean | Search for target |
| `isTarget(creature)` | boolean | Is creature a target |
| `isOpponent(creature)` | boolean | Is creature an opponent |
| `isFriend(creature)` | boolean | Is creature a friend |

**Search Types:**
- `TARGETSEARCH_DEFAULT` (0)
- `TARGETSEARCH_RANDOM` (1)
- `TARGETSEARCH_ATTACKRANGE` (2)
- `TARGETSEARCH_NEAREST` (3)

```lua
-- Make monster target player
monster:selectTarget(player)

-- Search for nearest target
monster:searchTarget(TARGETSEARCH_NEAREST)
```

---

## Master & Summons

| Method | Returns | Description |
|--------|---------|-------------|
| `getMaster()` | Creature | Master (if summoned) |
| `setMaster(creature)` | boolean | Set master |
| `isSummon()` | boolean | Is a summon |

```lua
if monster:isSummon() then
    local master = monster:getMaster()
    if master and master:isPlayer() then
        print("Summoned by: " .. master:getName())
    end
end
```

---

## Behavior

| Method | Returns | Description |
|--------|---------|-------------|
| `isIdle()` | boolean | Is idle |
| `setIdle(idle)` | - | Set idle state |
| `isWalkingToSpawn()` | boolean | Walking to spawn |
| `isIgnoringFieldDamage()` | boolean | Ignoring field damage |

---

## Loot & Corpse

| Method | Returns | Description |
|--------|---------|-------------|
| `setDropLoot(drop)` | - | Enable/disable loot |
| `setSkillLoss(loss)` | - | Enable/disable skill loss |

```lua
-- Disable loot for arena monster
monster:setDropLoot(false)
```

---

## Examples

### Spawn Monster

```lua
local function spawnMonster(name, position)
    local monster = Game.createMonster(name, position, true, true)
    if monster then
        monster:getPosition():sendMagicEffect(CONST_ME_TELEPORT)
        return monster
    end
    return nil
end
```

### Create Summon

```lua
local function createSummon(player, monsterName)
    local position = player:getPosition()
    position:getNextPosition(player:getDirection())
    
    local summon = Game.createMonster(monsterName, position, true, true)
    if summon then
        summon:setMaster(player)
        return summon
    end
    return nil
end
```

### Monster Death Handler

```lua
local deathEvent = CreatureEvent("MonsterDeath")

function deathEvent.onDeath(creature, corpse, killer, mostDamageKiller, lastHitUnjustified, mostDamageUnjustified)
    if not creature:isMonster() then
        return true
    end
    
    local monster = creature:getMonster()
    local monsterType = monster:getType()
    
    if killer and killer:isPlayer() then
        local player = killer:getPlayer()
        player:sendTextMessage(MESSAGE_INFO_DESCR, 
            "You killed a " .. monster:getName() .. "!")
    end
    
    return true
end

deathEvent:register()
```

### Check Monster Type

```lua
local function isBoss(monster)
    local monsterType = monster:getType()
    return monsterType:isBoss()
end

local function getMonsterExperience(monster)
    local monsterType = monster:getType()
    return monsterType:getExperience()
end
```
