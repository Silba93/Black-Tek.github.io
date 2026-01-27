---
title: Party
---

# Party Class

The Party class represents a group of players working together, sharing experience and loot.

## Getting a Party

```lua
local party = player:getParty()
```

---

## Members

| Method | Returns | Description |
|--------|---------|-------------|
| `getLeader()` | Player | Party leader |
| `getMembers()` | table | All members (excluding leader) |
| `getMemberCount()` | number | Member count |
| `getInvitees()` | table | Pending invites |
| `getInviteeCount()` | number | Invite count |

```lua
local party = player:getParty()
if party then
    local leader = party:getLeader()
    print("Leader: " .. leader:getName())
    
    for _, member in ipairs(party:getMembers()) do
        print("Member: " .. member:getName())
    end
end
```

---

## Invitations

| Method | Returns | Description |
|--------|---------|-------------|
| `addInvite(player)` | boolean | Invite player |
| `removeInvite(player)` | boolean | Cancel invite |
| `isInvited(player)` | boolean | Check if invited |

```lua
-- Invite player to party
party:addInvite(targetPlayer)

-- Check invitation
if party:isInvited(player) then
    print("Player is invited!")
end
```

---

## Member Management

| Method | Returns | Description |
|--------|---------|-------------|
| `addMember(player)` | boolean | Add member |
| `removeMember(player)` | boolean | Remove member |
| `passLeadership(player)` | boolean | Transfer leadership |
| `disband()` | boolean | Disband party |

```lua
-- Transfer leadership
party:passLeadership(newLeader)

-- Kick member
party:removeMember(member)

-- Disband
party:disband()
```

---

## Experience Sharing

| Method | Returns | Description |
|--------|---------|-------------|
| `isSharedExperienceActive()` | boolean | Shared exp active |
| `isSharedExperienceEnabled()` | boolean | Shared exp enabled |
| `setSharedExperience(active)` | boolean | Toggle shared exp |

```lua
if party:isSharedExperienceActive() then
    print("Party is sharing experience!")
end

-- Enable shared exp
party:setSharedExperience(true)
```

---

## Examples

### Create Party System

```lua
local function createParty(leader)
    -- Player becomes leader when inviting
    return leader:getParty()
end

local function inviteToParty(leader, target)
    local party = leader:getParty()
    if not party then
        -- Create party by inviting
        leader:sendTextMessage(MESSAGE_INFO_DESCR, 
            "You have invited " .. target:getName() .. " to your party.")
        return true
    end
    
    if party:getLeader() ~= leader then
        leader:sendCancelMessage("Only the leader can invite players.")
        return false
    end
    
    party:addInvite(target)
    return true
end
```

### Party Message

```lua
local function partyMessage(party, message)
    local leader = party:getLeader()
    leader:sendTextMessage(MESSAGE_PARTY_MANAGEMENT, message)
    
    for _, member in ipairs(party:getMembers()) do
        member:sendTextMessage(MESSAGE_PARTY_MANAGEMENT, message)
    end
end
```

### Check Same Party

```lua
local function isSameParty(player1, player2)
    local party1 = player1:getParty()
    local party2 = player2:getParty()
    
    if not party1 or not party2 then
        return false
    end
    
    return party1 == party2
end
```

### Party Heal

```lua
local function healParty(caster, amount)
    local party = caster:getParty()
    if not party then
        caster:addHealth(amount)
        return
    end
    
    -- Heal leader
    local leader = party:getLeader()
    if caster:getPosition():getDistance(leader:getPosition()) <= 10 then
        leader:addHealth(amount)
        leader:getPosition():sendMagicEffect(CONST_ME_MAGIC_BLUE)
    end
    
    -- Heal members
    for _, member in ipairs(party:getMembers()) do
        if caster:getPosition():getDistance(member:getPosition()) <= 10 then
            member:addHealth(amount)
            member:getPosition():sendMagicEffect(CONST_ME_MAGIC_BLUE)
        end
    end
end
```

### Party Level Range Check

```lua
local function canShareExperience(party)
    local leader = party:getLeader()
    local minLevel = leader:getLevel()
    local maxLevel = leader:getLevel()
    
    for _, member in ipairs(party:getMembers()) do
        local level = member:getLevel()
        if level < minLevel then minLevel = level end
        if level > maxLevel then maxLevel = level end
    end
    
    -- Check if within 2/3 range
    return minLevel >= (maxLevel * 2 / 3)
end
```
