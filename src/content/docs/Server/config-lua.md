---
title: Config.lua
---

# Configuration Reference (config.lua)

The `config.lua` file is the primary configuration file for BlackTek Server. It uses Lua syntax and is loaded when the server starts.

## Table of Contents

- [Combat Settings](#combat-settings)
- [Connection Settings](#connection-settings)
- [Account Manager](#account-manager)
- [Death Settings](#death-settings)
- [House Settings](#house-settings)
- [Item Usage](#item-usage)
- [Map Settings](#map-settings)
- [Market Settings](#market-settings)
- [Miscellaneous](#miscellaneous)
- [VIP and Depot Limits](#vip-and-depot-limits)
- [Quest Tracker](#quest-tracker)
- [World Light](#world-light)
- [Server Save](#server-save)
- [Experience Stages](#experience-stages)
- [Rates](#rates)
- [Monster Despawn](#monster-despawn)
- [Stamina](#stamina)
- [Scripts](#scripts)
- [Startup](#startup)
- [Status Server](#status-server)
- [MySQL Database](#mysql-database)

---

## Combat Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `worldType` | string | `"pvp"` | World type. Valid values: `"pvp"`, `"no-pvp"`, `"pvp-enforced"` |
| `hotkeyAimbotEnabled` | boolean | `true` | Allow hotkey targeting |
| `protectionLevel` | number | `1` | Minimum level for PvP protection |
| `killsToRedSkull` | number | `3` | Unjustified kills needed for red skull |
| `killsToBlackSkull` | number | `6` | Unjustified kills needed for black skull |
| `pzLocked` | number | `60000` | Protection zone lock duration (ms) |
| `removeChargesFromRunes` | boolean | `true` | Remove charges when using runes |
| `removeChargesFromPotions` | boolean | `true` | Remove charges when using potions |
| `removeWeaponAmmunition` | boolean | `true` | Remove ammunition when attacking |
| `removeWeaponCharges` | boolean | `true` | Remove weapon charges when attacking |
| `timeToDecreaseFrags` | number | `86400` | Time to decrease frag count (seconds) |
| `whiteSkullTime` | number | `900` | White skull duration (seconds) |
| `stairJumpExhaustion` | number | `2000` | Exhaustion between stair jumps (ms) |
| `experienceByKillingPlayers` | boolean | `false` | Gain experience from killing players |
| `expFromPlayersLevelRange` | number | `75` | Level range percentage for player exp |

### Example

```lua
worldType = "pvp"
hotkeyAimbotEnabled = true
protectionLevel = 1
killsToRedSkull = 3
killsToBlackSkull = 6
pzLocked = 60000
```

---

## Connection Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ip` | string | `"127.0.0.1"` | Server IP address |
| `bindOnlyGlobalAddress` | boolean | `false` | Bind only to global address |
| `loginProtocolPort` | number | `7171` | Login server port |
| `gameProtocolPort` | number | `7172` | Game server port |
| `statusProtocolPort` | number | `7171` | Status protocol port |
| `maxPlayers` | number | `0` | Maximum players (0 = unlimited) |
| `onePlayerOnlinePerAccount` | boolean | `true` | One character online per account |
| `allowClones` | boolean | `false` | Allow multiple logins same character |
| `allowWalkthrough` | boolean | `true` | Allow walking through players |
| `serverName` | string | `""` | Server name displayed to clients |
| `statusTimeout` | number | `5000` | Status query timeout (ms) |
| `replaceKickOnLogin` | boolean | `true` | Kick existing session on login |
| `maxPacketsPerSecond` | number | `25` | Maximum network packets per second |
| `enableTwoFactorAuth` | boolean | `true` | Enable two-factor authentication |

### Example

```lua
ip = "127.0.0.1"
loginProtocolPort = 7171
gameProtocolPort = 7172
maxPlayers = 100
serverName = "My BlackTek Server"
```

---

## Account Manager

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `useIngameAccountManager` | boolean | `true` | Enable in-game account manager |
| `allowNoPassLogin` | boolean | `true` | Allow login without password to manager |
| `accountManagerPassword` | string | `"1"` | Password for account manager access |
| `managerPositionX` | number | `95` | Account manager spawn X coordinate |
| `managerPositionY` | number | `117` | Account manager spawn Y coordinate |
| `managerPositionZ` | number | `7` | Account manager spawn Z coordinate |

### Example

```lua
useIngameAccountManager = true
allowNoPassLogin = true
accountManagerPassword = "1"
managerPositionX = 95
managerPositionY = 117
managerPositionZ = 7
```

---

## Death Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `deathLosePercent` | number | `-1` | Death penalty percentage. `-1` = default formula, `0` = no loss, `10` = old formula |

### Example

```lua
deathLosePercent = -1  -- Use default death penalty formula
```

---

## House Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `housePriceEachSQM` | number | `1000` | Price per square meter. `-1` = disable buying |
| `houseRentPeriod` | string | `"never"` | Rent period: `"daily"`, `"weekly"`, `"monthly"`, `"yearly"`, `"never"` |
| `houseOwnedByAccount` | boolean | `false` | Houses owned by account (not character) |
| `houseDoorShowPrice` | boolean | `true` | Show house price on doors |
| `onlyInvitedCanMoveHouseItems` | boolean | `true` | Only invited players can move house items |

### Example

```lua
housePriceEachSQM = 1000
houseRentPeriod = "monthly"
houseOwnedByAccount = false
```

---

## Item Usage

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timeBetweenActions` | number | `200` | Minimum time between item uses (ms) |
| `timeBetweenExActions` | number | `1000` | Minimum time between extended actions (ms) |

### Example

```lua
timeBetweenActions = 200
timeBetweenExActions = 1000
```

---

## Map Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mapName` | string | `"forgotten"` | Map filename (without .otbm extension) |
| `mapAuthor` | string | `"Unknown"` | Map author name |

### Example

```lua
mapName = "mymap"
mapAuthor = "MapMaker"
```

---

## Market Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `marketOfferDuration` | number | `2592000` | Market offer duration (seconds, default 30 days) |
| `premiumToCreateMarketOffer` | boolean | `true` | Require premium for market offers |
| `checkExpiredMarketOffersEachMinutes` | number | `60` | Check interval for expired offers |
| `maxMarketOffersAtATimePerPlayer` | number | `100` | Maximum concurrent offers per player |

### Example

```lua
marketOfferDuration = 30 * 24 * 60 * 60  -- 30 days
premiumToCreateMarketOffer = true
maxMarketOffersAtATimePerPlayer = 100
```

---

## Miscellaneous

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowChangeOutfit` | boolean | `true` | Allow players to change outfits |
| `freePremium` | boolean | `false` | All accounts have premium |
| `kickIdlePlayerAfterMinutes` | number | `15` | Kick idle players after X minutes |
| `maxMessageBuffer` | number | `4` | Maximum message buffer size |
| `emoteSpells` | boolean | `false` | Allow casting spells with emotes |
| `classicEquipmentSlots` | boolean | `true` | Use classic equipment slot system |
| `classicAttackSpeed` | boolean | `false` | Constant attack speed regardless of actions |
| `showScriptsLogInConsole` | boolean | `false` | Show script logs in console |
| `showOnlineStatusInCharlist` | boolean | `false` | Show online status in character list |
| `yellMinimumLevel` | number | `2` | Minimum level to yell |
| `yellAlwaysAllowPremium` | boolean | `false` | Premium can always yell |
| `minimumLevelToSendPrivate` | number | `1` | Minimum level for private messages |
| `premiumToSendPrivate` | boolean | `false` | Require premium for private messages |
| `forceMonsterTypesOnLoad` | boolean | `true` | Validate monster types on startup |
| `cleanProtectionZones` | boolean | `false` | Clean items from protection zones |
| `checkDuplicateStorageKeys` | boolean | `false` | Check for duplicate storage keys |

### Example

```lua
freePremium = false
kickIdlePlayerAfterMinutes = 15
classicEquipmentSlots = true
yellMinimumLevel = 2
```

---

## VIP and Depot Limits

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `vipFreeLimit` | number | `20` | VIP list limit for free accounts |
| `vipPremiumLimit` | number | `100` | VIP list limit for premium accounts |
| `depotFreeLimit` | number | `2000` | Depot item limit for free accounts |
| `depotPremiumLimit` | number | `15000` | Depot item limit for premium accounts |

### Example

```lua
vipFreeLimit = 20
vipPremiumLimit = 100
depotFreeLimit = 2000
depotPremiumLimit = 15000
```

---

## Quest Tracker

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `questTrackerFreeLimit` | number | `10` | Quest tracker limit for free accounts |
| `questTrackerPremiumLimit` | number | `15` | Quest tracker limit for premium accounts |

---

## World Light

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultWorldLight` | boolean | `true` | Use default world light algorithm. Set to `false` to use `setWorldLight()` |

### Example

```lua
defaultWorldLight = true
```

---

## Server Save

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `serverSaveNotifyMessage` | boolean | `true` | Broadcast server save notifications |
| `serverSaveNotifyDuration` | number | `5` | Notification duration before save (minutes) |
| `serverSaveCleanMap` | boolean | `false` | Clean map on server save |
| `serverSaveClose` | boolean | `false` | Close server after save |
| `serverSaveShutdown` | boolean | `true` | Shutdown server after save |

### Example

```lua
serverSaveNotifyMessage = true
serverSaveNotifyDuration = 5
serverSaveShutdown = true
```

---

## Experience Stages

Experience stages allow different multipliers based on player level. Can be defined in `config.lua` or `config/stages.toml`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `minlevel` | number | Yes | Minimum level for this stage |
| `maxlevel` | number | No | Maximum level (infinite if not set) |
| `multiplier` | number | Yes | Experience multiplier |

### Lua Example

```lua
experienceStages = {
    { minlevel = 1, maxlevel = 8, multiplier = 7 },
    { minlevel = 9, maxlevel = 20, multiplier = 6 },
    { minlevel = 21, maxlevel = 50, multiplier = 5 },
    { minlevel = 51, maxlevel = 100, multiplier = 4 },
    { minlevel = 101, multiplier = 3 }  -- No maxlevel = infinite
}
```

Set to `nil` to use flat `rateExp` multiplier:

```lua
experienceStages = nil
```

---

## Rates

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rateExp` | number | `5` | Experience rate (if stages disabled) |
| `rateSkill` | number | `3` | Skill training rate |
| `rateLoot` | number | `2` | Loot drop rate |
| `rateMagic` | number | `3` | Magic level training rate |
| `rateSpawn` | number | `1` | Monster spawn rate multiplier |
| `summonProximity` | number | `1` | Summon proximity range |

### Example

```lua
rateExp = 5
rateSkill = 3
rateLoot = 2
rateMagic = 3
rateSpawn = 1
```

---

## Monster Despawn

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `deSpawnRange` | number | `2` | Floors from spawn before despawn |
| `deSpawnRadius` | number | `50` | Tiles from spawn before despawn |
| `removeOnDespawn` | boolean | `true` | Remove monster on despawn (vs teleport back) |
| `walkToSpawnRadius` | number | `15` | Distance monster walks back to spawn |
| `monsterOverspawn` | boolean | `false` | Start respawn when out of bounds |

### Example

```lua
deSpawnRange = 2
deSpawnRadius = 50
removeOnDespawn = true
walkToSpawnRadius = 15
```

---

## Stamina

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `staminaSystem` | boolean | `true` | Enable stamina system |
| `timeToRegenMinuteStamina` | number | `180` | Seconds to regen 1 minute stamina |
| `timeToRegenMinutePremiumStamina` | number | `360` | Seconds to regen 1 minute premium stamina |

### Example

```lua
staminaSystem = true
timeToRegenMinuteStamina = 3 * 60
timeToRegenMinutePremiumStamina = 6 * 60
```

---

## Scripts

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `warnUnsafeScripts` | boolean | `true` | Warn about unsafe scripts |
| `convertUnsafeScripts` | boolean | `true` | Auto-convert unsafe scripts |

---

## Startup

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultPriority` | string | `"high"` | Process priority: `"normal"`, `"above-normal"`, `"high"` (Windows only) |
| `startupDatabaseOptimization` | boolean | `false` | Optimize database on startup |

---

## Status Server

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ownerName` | string | `""` | Server owner name |
| `ownerEmail` | string | `""` | Server owner email |
| `url` | string | `""` | Server website URL |
| `location` | string | `""` | Server location |

---

## MySQL Database

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mysqlHost` | string | `"127.0.0.1"` | MySQL server hostname |
| `mysqlUser` | string | `"forgottenserver"` | MySQL username |
| `mysqlPass` | string | `""` | MySQL password |
| `mysqlDatabase` | string | `"forgottenserver"` | MySQL database name |
| `mysqlPort` | number | `3306` | MySQL server port |
| `mysqlSock` | string | `""` | MySQL socket path (optional) |

### Example

```lua
mysqlHost = "127.0.0.1"
mysqlUser = "blacktek"
mysqlPass = "secretpassword"
mysqlDatabase = "blacktek_db"
mysqlPort = 3306
```

---

## Additional Boolean Options

These options provide additional server customization:

| Option | Default | Description |
|--------|---------|-------------|
| `bedOfflineTraining` | `true` | Enable bed offline training |
| `augmentSlotProtection` | `true` | Protect augment slots |
| `augmentStaminInMinutes` | `false` | Use minutes for augment stamina |
| `showAnimationOnCritHitFromAugment` | `true` | Show critical hit animation from augments |
| `allowNpcWalkthroughInPz` | `false` | Allow NPCs to walk through players in PZ |
| `healthRegenNotification` | `false` | Show health regeneration messages |
| `manaRegenNotification` | `false` | Show mana regeneration messages |
| `autoOpenContainers` | `true` | Auto-open containers when received |

---

## Reward System

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rewardBaseRate` | float | `1.0` | Base reward rate multiplier |
| `rewardRateDamageDone` | float | `1.0` | Reward rate for damage dealt |
| `rewardRateDamageTaken` | float | `1.0` | Reward rate for damage taken |
| `rewardRateHealingDone` | float | `1.0` | Reward rate for healing done |

---

## Party Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `partyExpShareRange` | number | `30` | Experience share range (tiles) |
| `partyExpShareFloors` | number | `1` | Experience share floor range |
| `maximumPartySize` | number | `10` | Maximum party members |
| `maximumInviteCount` | number | `20` | Maximum pending invites |

---

## Complete Example Configuration

```lua
-- config.lua

-- Combat
worldType = "pvp"
protectionLevel = 50
killsToRedSkull = 5
killsToBlackSkull = 10

-- Connection
ip = "0.0.0.0"
serverName = "BlackTek Server"
loginProtocolPort = 7171
gameProtocolPort = 7172
maxPlayers = 500

-- Map
mapName = "world"
mapAuthor = "Admin"

-- Rates
rateExp = 10
rateSkill = 5
rateLoot = 3
rateMagic = 5
rateSpawn = 1

-- Experience Stages
experienceStages = {
    { minlevel = 1, maxlevel = 50, multiplier = 10 },
    { minlevel = 51, maxlevel = 100, multiplier = 5 },
    { minlevel = 101, multiplier = 2 }
}

-- Database
mysqlHost = "localhost"
mysqlUser = "blacktek"
mysqlPass = "password"
mysqlDatabase = "blacktek"
mysqlPort = 3306
```
