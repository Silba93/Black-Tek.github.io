---
title: Database Structure
---

# Database Schema Reference

BlackTek Server uses MySQL/MariaDB for persistent data storage. This document describes the database schema and table structures.

## Table of Contents

- [Overview](#overview)
- [Core Tables](#core-tables)
  - [accounts](#accounts)
  - [players](#players)
- [Account Related Tables](#account-related-tables)
- [Player Related Tables](#player-related-tables)
- [Guild Tables](#guild-tables)
- [House Tables](#house-tables)
- [Market Tables](#market-tables)
- [Ban Tables](#ban-tables)
- [Utility Tables](#utility-tables)
- [Entity Relationship Diagram](#entity-relationship-diagram)

---

## Overview

The database is designed with foreign key constraints to maintain referential integrity. Most player-related tables cascade deletes from the `players` table.

**Recommended Settings:**
- Engine: InnoDB (required for foreign keys)
- Charset: utf8mb3 or utf8mb4
- Collation: utf8_general_ci

---

## Core Tables

### accounts

Stores user account information.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | int | AUTO_INCREMENT | Primary key |
| `name` | varchar(32) | - | Account name (login) |
| `password` | char(40) | - | SHA1 hashed password |
| `secret` | char(16) | NULL | Two-factor auth secret |
| `type` | int | 1 | Account type (1=normal, 6=god) |
| `premium_ends_at` | int unsigned | 0 | Premium expiration timestamp |
| `email` | varchar(255) | '' | Account email |
| `creation` | int | 0 | Account creation timestamp |

**Account Types:**
- `1` = ACCOUNT_TYPE_NORMAL
- `2` = ACCOUNT_TYPE_TUTOR
- `3` = ACCOUNT_TYPE_SENIORTUTOR
- `4` = ACCOUNT_TYPE_GAMEMASTER
- `5` = ACCOUNT_TYPE_COMMUNITYMANAGER
- `6` = ACCOUNT_TYPE_GOD

---

### players

Stores character information.

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | int | AUTO_INCREMENT | Primary key |
| `name` | varchar(255) | - | Character name |
| `group_id` | int | 1 | Group ID for permissions |
| `account_id` | int | 0 | Foreign key to accounts |
| `level` | int | 1 | Character level |
| `vocation` | int | 0 | Vocation ID |
| `health` | int | 150 | Current health |
| `healthmax` | int | 150 | Maximum health |
| `experience` | bigint unsigned | 0 | Total experience |
| `lookbody` | int | 0 | Body color |
| `lookfeet` | int | 0 | Feet color |
| `lookhead` | int | 0 | Head color |
| `looklegs` | int | 0 | Legs color |
| `looktype` | int | 136 | Outfit type |
| `lookaddons` | int | 0 | Outfit addons |
| `direction` | tinyint unsigned | 2 | Facing direction |
| `maglevel` | int | 0 | Magic level |
| `mana` | int | 0 | Current mana |
| `manamax` | int | 0 | Maximum mana |
| `manaspent` | bigint unsigned | 0 | Mana spent for magic level |
| `soul` | int unsigned | 0 | Soul points |
| `town_id` | int | 1 | Home town ID |
| `posx` | int | 0 | Last position X |
| `posy` | int | 0 | Last position Y |
| `posz` | int | 0 | Last position Z |
| `conditions` | blob | - | Serialized conditions |
| `cap` | int | 400 | Capacity |
| `sex` | int | 0 | Sex (0=female, 1=male) |
| `lastlogin` | bigint unsigned | 0 | Last login timestamp |
| `lastip` | int unsigned | 0 | Last IP address |
| `save` | tinyint | 1 | Save on logout |
| `skull` | tinyint | 0 | Skull type |
| `skulltime` | bigint | 0 | Skull expiration |
| `lastlogout` | bigint unsigned | 0 | Last logout timestamp |
| `blessings` | tinyint | 0 | Blessings bitmask |
| `onlinetime` | bigint | 0 | Total online time (seconds) |
| `deletion` | bigint | 0 | Deletion timestamp (0=not deleted) |
| `balance` | bigint unsigned | 0 | Bank balance |
| `offlinetraining_time` | smallint unsigned | 43200 | Offline training time |
| `offlinetraining_skill` | int | -1 | Offline training skill |
| `stamina` | smallint unsigned | 2520 | Stamina minutes |
| `skill_fist` | int unsigned | 10 | Fist fighting level |
| `skill_fist_tries` | bigint unsigned | 0 | Fist fighting tries |
| `skill_club` | int unsigned | 10 | Club fighting level |
| `skill_club_tries` | bigint unsigned | 0 | Club fighting tries |
| `skill_sword` | int unsigned | 10 | Sword fighting level |
| `skill_sword_tries` | bigint unsigned | 0 | Sword fighting tries |
| `skill_axe` | int unsigned | 10 | Axe fighting level |
| `skill_axe_tries` | bigint unsigned | 0 | Axe fighting tries |
| `skill_dist` | int unsigned | 10 | Distance fighting level |
| `skill_dist_tries` | bigint unsigned | 0 | Distance fighting tries |
| `skill_shielding` | int unsigned | 10 | Shielding level |
| `skill_shielding_tries` | bigint unsigned | 0 | Shielding tries |
| `skill_fishing` | int unsigned | 10 | Fishing level |
| `skill_fishing_tries` | bigint unsigned | 0 | Fishing tries |

**Trigger:** `ondelete_players` - Sets house owner to 0 when player is deleted.

---

## Account Related Tables

### account_storage

Key-value storage for account data.

| Column | Type | Description |
|--------|------|-------------|
| `account_id` | int | Foreign key to accounts |
| `key` | int unsigned | Storage key |
| `value` | int | Storage value |

**Primary Key:** (`account_id`, `key`)

---

### account_viplist

Account VIP list entries.

| Column | Type | Description |
|--------|------|-------------|
| `account_id` | int | Account owning the VIP entry |
| `player_id` | int | Target player ID |
| `description` | varchar(128) | Custom description |
| `icon` | tinyint unsigned | VIP icon |
| `notify` | tinyint | Notify on login |

---

## Player Related Tables

### player_items

Player inventory items.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `pid` | int | Parent container slot |
| `sid` | int | Slot ID |
| `itemtype` | smallint unsigned | Item type ID |
| `count` | smallint | Stack count |
| `attributes` | blob | Item attributes |
| `augments` | blob | Item augments |
| `skills` | blob | Item custom skills |
| `stats` | blob | Item custom stats |

---

### player_depotitems

Player depot contents.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `sid` | int | Slot ID (0-100 reserved for lockers) |
| `pid` | int | Parent container slot |
| `itemtype` | smallint unsigned | Item type ID |
| `count` | smallint | Stack count |
| `attributes` | blob | Item attributes |
| `augments` | blob | Item augments |
| `skills` | blob | Item custom skills |
| `stats` | blob | Item custom stats |

---

### player_inboxitems

Player inbox items.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `sid` | int | Slot ID |
| `pid` | int | Parent container slot |
| `itemtype` | smallint unsigned | Item type ID |
| `count` | smallint | Stack count |
| `attributes` | blob | Item attributes |
| `augments` | blob | Item augments |
| `skills` | blob | Item custom skills |
| `stats` | blob | Item custom stats |

---

### player_rewarditems

Player reward chest items.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `sid` | int | Slot ID (0-100 for offline additions) |
| `pid` | int | Parent container slot |
| `itemtype` | smallint unsigned | Item type ID |
| `count` | smallint | Stack count |
| `attributes` | blob | Item attributes |

---

### player_storage

Player storage values (quest progress, etc.).

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `key` | int unsigned | Storage key |
| `value` | int | Storage value |

**Primary Key:** (`player_id`, `key`)

---

### player_spells

Learned spells.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `name` | varchar(255) | Spell name |

---

### player_deaths

Death records.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `time` | bigint unsigned | Death timestamp |
| `level` | int | Level at death |
| `killed_by` | varchar(255) | Killer name |
| `is_player` | tinyint | Killer is player |
| `mostdamage_by` | varchar(100) | Most damage dealer |
| `mostdamage_is_player` | tinyint | Most damage is player |
| `unjustified` | tinyint | Unjustified kill |
| `mostdamage_unjustified` | tinyint | Most damage unjustified |

---

### player_namelocks

Name lock records.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `reason` | varchar(255) | Lock reason |
| `namelocked_at` | bigint | Lock timestamp |
| `namelocked_by` | int | Player who locked |

---

### player_augments

Player augment data.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `augments` | blob | Serialized augment data |

---

### player_custom_skills

Custom skill data.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `skills` | blob | Serialized skill data |

---

### player_custom_stats

Custom stat data.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `stats` | blob | Serialized stat data |

---

### players_online

Currently online players (MEMORY engine).

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Player ID currently online |

**Engine:** MEMORY (cleared on server restart)

---

## Guild Tables

### guilds

Guild information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `name` | varchar(255) | Guild name |
| `ownerid` | int | Foreign key to players (leader) |
| `creationdata` | int | Creation timestamp |
| `motd` | varchar(255) | Message of the day |
| `balance` | bigint unsigned | Guild bank balance |

**Trigger:** `oncreate_guilds` - Creates default ranks on guild creation.

---

### guild_ranks

Guild rank definitions.

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `guild_id` | int | Foreign key to guilds |
| `name` | varchar(255) | Rank name |
| `level` | int | Rank level (3=leader, 2=vice, 1=member) |

---

### guild_membership

Guild member associations.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Foreign key to players |
| `guild_id` | int | Foreign key to guilds |
| `rank_id` | int | Foreign key to guild_ranks |
| `nick` | varchar(15) | Guild nickname |

---

### guild_invites

Pending guild invitations.

| Column | Type | Description |
|--------|------|-------------|
| `player_id` | int | Invited player |
| `guild_id` | int | Inviting guild |

---

### guild_wars

Guild war declarations.

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `guild1` | int | First guild ID |
| `guild2` | int | Second guild ID |
| `name1` | varchar(255) | First guild name |
| `name2` | varchar(255) | Second guild name |
| `status` | tinyint | War status |
| `started` | bigint | Start timestamp |
| `ended` | bigint | End timestamp |
| `frags_to_end` | int | Kills to win |

---

### guildwar_kills

Guild war kill records.

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `killer` | varchar(50) | Killer name |
| `target` | varchar(50) | Target name |
| `killerguild` | int | Killer's guild |
| `targetguild` | int | Target's guild |
| `warid` | int | Foreign key to guild_wars |
| `time` | bigint | Kill timestamp |

---

## House Tables

### houses

House definitions.

| Column | Type | Description |
|--------|------|-------------|
| `id` | int | Primary key |
| `owner` | int | Owner player ID (0=no owner) |
| `paid` | int unsigned | Rent paid until |
| `warnings` | int | Rent warnings |
| `name` | varchar(255) | House name |
| `rent` | int | Rent amount |
| `town_id` | int | Town ID |
| `bid` | int | Current bid |
| `bid_end` | int | Auction end time |
| `last_bid` | int | Last bid amount |
| `highest_bidder` | int | Highest bidder ID |
| `size` | int | House size (SQM) |
| `beds` | int | Number of beds |

---

### house_lists

House access lists.

| Column | Type | Description |
|--------|------|-------------|
| `house_id` | int | Foreign key to houses |
| `listid` | int | List type |
| `list` | text | Access list content |

---

### tile_store

House tile items.

| Column | Type | Description |
|--------|------|-------------|
| `house_id` | int | Foreign key to houses |
| `data` | longblob | Serialized tile data |

---

## Market Tables

### market_offers

Active market offers.

| Column | Type | Description |
|--------|------|-------------|
| `id` | int unsigned | Primary key |
| `player_id` | int | Foreign key to players |
| `sale` | tinyint | Is sale offer |
| `itemtype` | smallint unsigned | Item type ID |
| `amount` | smallint unsigned | Item amount |
| `created` | bigint unsigned | Creation timestamp |
| `anonymous` | tinyint | Anonymous offer |
| `price` | int unsigned | Price per item |

---

### market_history

Completed market transactions.

| Column | Type | Description |
|--------|------|-------------|
| `id` | int unsigned | Primary key |
| `player_id` | int | Foreign key to players |
| `sale` | tinyint | Was sale offer |
| `itemtype` | smallint unsigned | Item type ID |
| `amount` | smallint unsigned | Item amount |
| `price` | int unsigned | Transaction price |
| `expires_at` | bigint unsigned | Original expiration |
| `inserted` | bigint unsigned | Transaction timestamp |
| `state` | tinyint unsigned | Transaction state |

---

## Ban Tables

### account_bans

Active account bans.

| Column | Type | Description |
|--------|------|-------------|
| `account_id` | int | Foreign key to accounts |
| `reason` | varchar(255) | Ban reason |
| `banned_at` | bigint | Ban start timestamp |
| `expires_at` | bigint | Ban end timestamp |
| `banned_by` | int | Banning player ID |

---

### account_ban_history

Historical ban records.

| Column | Type | Description |
|--------|------|-------------|
| `id` | int unsigned | Primary key |
| `account_id` | int | Foreign key to accounts |
| `reason` | varchar(255) | Ban reason |
| `banned_at` | bigint | Ban start timestamp |
| `expired_at` | bigint | Ban end timestamp |
| `banned_by` | int | Banning player ID |

---

### ip_bans

IP address bans.

| Column | Type | Description |
|--------|------|-------------|
| `ip` | int unsigned | IP address (integer) |
| `reason` | varchar(255) | Ban reason |
| `banned_at` | bigint | Ban start timestamp |
| `expires_at` | bigint | Ban end timestamp |
| `banned_by` | int | Banning player ID |

---

## Utility Tables

### server_config

Server configuration storage.

| Column | Type | Description |
|--------|------|-------------|
| `config` | varchar(50) | Config key |
| `value` | varchar(256) | Config value |

---

## Entity Relationship Diagram

```
accounts (1) ──────────< (N) players
    │                        │
    │                        ├──< player_items
    │                        ├──< player_depotitems
    │                        ├──< player_inboxitems
    │                        ├──< player_rewarditems
    │                        ├──< player_storage
    │                        ├──< player_spells
    │                        ├──< player_deaths
    │                        ├──< player_augments
    │                        ├──< player_custom_skills
    │                        ├──< player_custom_stats
    │                        │
    ├──< account_storage     └──< guild_membership ──> guilds
    ├──< account_viplist                                  │
    └──< account_bans                                     ├──< guild_ranks
                                                          ├──< guild_invites
                                                          └──< guild_wars
                                                                  │
houses ──< house_lists                                           └──< guildwar_kills
   │
   └──< tile_store

market_offers ──> players
market_history ──> players
```

---

## Database Maintenance

### Optimization

Run periodically to optimize tables:

```sql
OPTIMIZE TABLE players, player_items, player_depotitems;
```

### Cleanup Queries

Remove deleted players:
```sql
DELETE FROM players WHERE deletion > 0 AND deletion < UNIX_TIMESTAMP();
```

Remove expired bans:
```sql
DELETE FROM account_bans WHERE expires_at < UNIX_TIMESTAMP();
DELETE FROM ip_bans WHERE expires_at < UNIX_TIMESTAMP();
```

Clean expired market offers:
```sql
DELETE FROM market_offers WHERE created + (30 * 24 * 60 * 60) < UNIX_TIMESTAMP();
```
