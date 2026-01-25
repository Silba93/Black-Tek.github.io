---
title: Guild
---

# Guild Class

The Guild class represents player guilds/clans.

## Constructor

```lua
Guild(id)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | Guild ID |

---

## Basic Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Guild ID |
| `getName()` | string | Guild name |
| `getMembersOnline()` | table | Online members |

```lua
local guild = Guild(1)
if guild then
    print("Guild: " .. guild:getName())
    print("Online: " .. #guild:getMembersOnline())
end
```

---

## MOTD (Message of the Day)

| Method | Returns | Description |
|--------|---------|-------------|
| `getMotd()` | string | Guild MOTD |
| `setMotd(motd)` | - | Set MOTD |

```lua
guild:setMotd("Welcome to our guild!")
print(guild:getMotd())
```

---

## Ranks

| Method | Returns | Description |
|--------|---------|-------------|
| `getRanks()` | table | All ranks |
| `getRankById(id)` | table | Rank by ID |
| `getRankByLevel(level)` | table | Rank by level |
| `addRank(name, level)` | boolean | Create rank |

**Rank Structure:**
```lua
{
    id = 1,
    name = "Leader",
    level = 3
}
```

```lua
-- Get all ranks
for _, rank in ipairs(guild:getRanks()) do
    print(rank.name .. " (Level " .. rank.level .. ")")
end

-- Add new rank
guild:addRank("Elite Member", 2)
```

---

## Member Management

Members are managed through the Player class:

```lua
-- Get player's guild
local guild = player:getGuild()

-- Set player's guild
player:setGuild(guild)

-- Get guild rank level
local rankLevel = player:getGuildLevel()

-- Set guild rank
player:setGuildLevel(2)

-- Get guild nickname
local nick = player:getGuildNick()

-- Set guild nickname
player:setGuildNick("The Brave")
```

---

## Examples

### Get Guild Info

```lua
local function getGuildInfo(guildId)
    local guild = Guild(guildId)
    if not guild then
        return nil
    end
    
    return {
        id = guild:getId(),
        name = guild:getName(),
        motd = guild:getMotd(),
        onlineCount = #guild:getMembersOnline(),
        ranks = guild:getRanks()
    }
end
```

### Guild Broadcast

```lua
local function guildBroadcast(guild, message)
    for _, player in ipairs(guild:getMembersOnline()) do
        player:sendTextMessage(MESSAGE_GUILD, message)
    end
end
```

### Check Same Guild

```lua
local function isSameGuild(player1, player2)
    local guild1 = player1:getGuild()
    local guild2 = player2:getGuild()
    
    if not guild1 or not guild2 then
        return false
    end
    
    return guild1:getId() == guild2:getId()
end
```

### Get Leader

```lua
local function getGuildLeader(guild)
    for _, player in ipairs(guild:getMembersOnline()) do
        if player:getGuildLevel() == 3 then
            return player
        end
    end
    return nil
end
```

### Guild War Check

```lua
local function areGuildsAtWar(guild1, guild2)
    -- Check database for active war
    local query = string.format([[
        SELECT id FROM guild_wars 
        WHERE ((guild1 = %d AND guild2 = %d) OR (guild1 = %d AND guild2 = %d))
        AND status = 1
    ]], guild1:getId(), guild2:getId(), guild2:getId(), guild1:getId())
    
    local result = db.storeQuery(query)
    if result then
        result:free()
        return true
    end
    return false
end
```

### Invite to Guild

```lua
local function inviteToGuild(leader, target)
    local guild = leader:getGuild()
    if not guild then
        leader:sendCancelMessage("You are not in a guild.")
        return false
    end
    
    if leader:getGuildLevel() < 2 then
        leader:sendCancelMessage("You don't have permission to invite.")
        return false
    end
    
    if target:getGuild() then
        leader:sendCancelMessage("That player is already in a guild.")
        return false
    end
    
    -- Add to database invites
    local query = string.format(
        "INSERT INTO guild_invites (guild_id, player_id) VALUES (%d, %d)",
        guild:getId(), target:getGuid()
    )
    db.query(query)
    
    target:sendTextMessage(MESSAGE_INFO_DESCR,
        "You have been invited to " .. guild:getName())
    
    return true
end
```
