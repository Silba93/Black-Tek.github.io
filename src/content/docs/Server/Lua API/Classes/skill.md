---
title: Skill
---

# Custom Skills

BlackTek Server provides a custom skill system that extends beyond the standard included skills.

---

## Skill Class (Custom Skills)

Custom skills allow you to create new trainable abilities for players.

### Constructor

```lua
Skill(name)
```

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `level()` / `getLevel()` | number | Current skill level |
| `addLevels(amount)` | - | Add levels |
| `subtractLevels(amount)` | - | Remove levels |
| `removeLevels(amount)` | - | Alias for subtractLevels |
| `clearLevels()` | - | Reset to 0 |
| `bonusLevel()` | number | Bonus level (from equipment) |
| `addBonusLevels(amount)` | - | Add bonus levels |
| `subtractBonusLevels(amount)` | - | Remove bonus levels |
| `removeBonusLevels(amount)` | - | Alias for subtractBonusLevels |
| `clearBonus()` | - | Clear all bonus |
| `points()` / `getPoints()` | number | Current skill points |
| `addPoints(amount)` | - | Add points |
| `subtractPoints(amount)` | - | Remove points |
| `removePoints(amount)` | - | Alias for subtractPoints |
| `clearPoints()` | - | Reset points to 0 |
| `pointsNeeded()` | number | Points needed for next level |
| `maxLevel()` / `getMaxLevel()` | number | Maximum level |
| `percent()` / `getPercent()` | number | Progress to next level (%) |

---

## Giving Skills to Creatures/Items

### Creature Methods

```lua
-- Give a new skill
creature:giveSkill(skillName, params)

-- Add levels to existing skill
creature:addSkill(skillName, levels)

-- Remove levels
creature:subtractSkill(skillName, levels)

-- Remove skill entirely
creature:removeSkill(skillName)

-- Check if has skill
creature:hasSkill(skillName)  -- returns boolean

-- Get skill level
creature:getSkillLevel(skillName)  -- returns number
```

### Item Methods

Items can also have custom skills:

```lua
item:giveSkill(skillName, params)
item:addSkill(skillName, levels)
item:subtractSkill(skillName, levels)
item:removeSkill(skillName)
item:hasSkill(skillName)
item:getSkillLevel(skillName)
item:canGainLevels()
```

---

## Skill Parameters

When creating a skill with `giveSkill()`:

```lua
creature:giveSkill("Mining", {
    level = 1,           -- Starting level
    maxLevel = 100,      -- Maximum level
    points = 0,          -- Starting points
    formula = "linear"   -- Point formula type
})
```

**Formula Types:**
- `LINEAR` - Linear point growth
- `LOGARITHMIC` - Logarithmic growth
- `EXPONENTIAL` - Exponential growth
- `QUADRATIC` - Quadratic growth

---

## Examples

### Create Mining Skill

```lua
local function initMiningSkill(player)
    if not player:hasSkill("Mining") then
        player:giveSkill("Mining", {
            level = 1,
            maxLevel = 100
        })
    end
end

local function onMineOre(player)
    player:addSkill("Mining", 0)  -- Just add points, not levels
    
    -- Manual point addition for more control
    local skill = Skill("Mining")
    -- Access through player context
end
```

### Skill Check for Action

```lua
local mineAction = Action()

function mineAction.onUse(player, item, fromPosition, target, toPosition, isHotkey)
    local requiredLevel = 10
    
    if not player:hasSkill("Mining") then
        player:sendCancelMessage("You don't have the Mining skill.")
        return true
    end
    
    local level = player:getSkillLevel("Mining")
    if level < requiredLevel then
        player:sendCancelMessage("You need Mining level " .. requiredLevel .. ".")
        return true
    end
    
    -- Success - give ore and skill points
    player:addItem(2157, 1)  -- Ore
    player:addSkill("Mining", 1)  -- Add skill points
    
    player:sendTextMessage(MESSAGE_INFO_DESCR, "You mined some ore!")
    return true
end

mineAction:aid(5000)
mineAction:register()
```

---

