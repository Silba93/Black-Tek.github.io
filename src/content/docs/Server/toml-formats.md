---
title: Toml Configuration Files
---

# TOML Data Formats

BlackTek Server uses TOML for several configuration files.

## Groups (groups.toml)

### File Location

```
data/XML/groups.toml
```

### Structure

```toml
[[group]]
id = 1
name = "Player"
access = false
maxdepotitems = 2000
maxvipentries = 100

[[group]]
id = 4
name = "Gamemaster"
access = true
maxdepotitems = 10000
maxvipentries = 200
flags = [
    "cannotbeattacked",
    "canconvinceall",
    "cansummonall",
    "cansenseinvisibility",
    "ignoredbymonsters",
    "hasinfinitemana"
]

[[group]]
id = 6
name = "God"
access = true
maxdepotitems = 10000
maxvipentries = 200
flags = ["*"]  # All flags
```

### Available Flags

- `cannotbeattacked`, `canconvinceall`, `cansummonall`
- `canillusionall`, `cansenseinvisibility`, `ignoredbymonsters`
- `notgaininfight`, `hasinfinitemana`, `hasinfinitesoul`
- `notgainexperience`, `notgainskill`, `setmaxspeed`
- `ignoreprotectionzone`, `ignoreweaponcheck`, `canpushallcreatures`
- `*` - All flags

---

## Vocations (vocations.toml)

### File Location

```
data/XML/vocations.toml
```

### Structure

```toml
[[vocation]]
id = 1
name = "Sorcerer"
description = "a sorcerer"
gaincap = 10
gainhp = 5
gainmana = 30
gainhpticks = 12
gainhpamount = 5
gainmanaticks = 6
gainmanaamount = 10
manamultiplier = 1.1
attackspeed = 2000
basespeed = 220
soulmax = 100
gainsoulticks = 120
fromvoc = 0

[vocation.skill]
fist = 1.5
club = 2.0
sword = 2.0
axe = 2.0
distance = 2.0
shielding = 1.5
fishing = 1.1

[[vocation]]
id = 4
name = "Knight"
description = "a knight"
gaincap = 25
gainhp = 15
gainmana = 5
gainhpticks = 6
gainhpamount = 10
gainmanaticks = 6
gainmanaamount = 2
manamultiplier = 3.0
attackspeed = 2000
basespeed = 220
soulmax = 100
gainsoulticks = 120
fromvoc = 0
```

### Properties

| Property | Description |
|----------|-------------|
| `gaincap` | Capacity per level |
| `gainhp` | HP per level |
| `gainmana` | Mana per level |
| `gainhpticks` | HP regen interval (sec) |
| `gainmanaticks` | Mana regen interval |
| `manamultiplier` | Mana spent multiplier |
| `fromvoc` | Base vocation ID (0 = base) |

---

## Outfits (outfits.toml)

### File Location

```
data/XML/outfits.toml
```

### Structure

```toml
[[outfit]]
type = "male"
looktype = 128
name = "Citizen"
premium = false
unlocked = true

[[outfit]]
type = "female"
looktype = 136
name = "Citizen"
premium = false
unlocked = true

[[outfit]]
type = "male"
looktype = 130
name = "Mage"
premium = true
unlocked = false
addons = [1, 2, 3]
```

---

## Quests (quests.toml)

### File Location

```
data/XML/quests.toml
```

### Structure

```toml
[[quest]]
name = "The Rookie Guard"
startstorage = 10000
startstoragevalue = 1

[[quest.mission]]
name = "First Steps"
storage = 10000
startvalue = 1
endvalue = 2
description = "Talk to the guard captain."

[[quest.mission]]
name = "Combat Training"
storage = 10000
startvalue = 2
endvalue = 3
description = "Defeat 10 rats."

[[quest]]
name = "Dragon Slayer"
startstorage = 20000
startstoragevalue = 1

[[quest.mission]]
name = "The Legend"
storage = 20000
startvalue = 1
endvalue = 2
description = "Learn about dragons from the sage."
```

---

## Raids (raids.toml)

### File Location

```
data/raids/raids.toml
```

### Structure

```toml
[[raid]]
name = "Dragon Attack"
interval = 7200000  # 2 hours in ms
margin = 3600000    # 1 hour margin
file = "dragon_attack.xml"
enabled = true

[[raid]]
name = "Orc Raid"
interval = 3600000   # 1 hour
margin = 1800000
file = "orc_raid.xml"
enabled = true
```

### Raid Event File (XML)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<raid>
    <announce delay="0" type="broadcast" message="Dragons attacking!"/>
    <singlespawn delay="1000" name="Dragon" x="32369" y="32241" z="7"/>
    <areaspawn delay="5000" fromx="32360" tox="32380" fromy="32230" toy="32250" z="7">
        <monster name="Dragon" amount="3"/>
    </areaspawn>
</raid>
```

---

## Items (items.toml)

### Structure

```toml
[[item]]
id = 2160
name = "crystal coin"
weight = 10
worth = 10000
stackable = true

[[item]]
id = 2400
name = "magic sword"
weight = 4200
attack = 40
defense = 35
level = 80

[item.abilities]
speed = 20

[[item]]
id = 2463
name = "plate armor"
weight = 12000
armor = 12
slot = "body"

[item.abilities]
protection_physical = 5
```

### Item Properties

| Property | Description |
|----------|-------------|
| `id` | Item ID |
| `name` | Item name |
| `weight` | Weight (0.01 oz units) |
| `worth` | Gold value |
| `attack`, `defense`, `armor` | Combat stats |
| `slot` | Equipment slot |
| `level` | Required level |
| `stackable` | Can stack |

### Abilities

```toml
[item.abilities]
speed = 20
healthgain = 5
managain = 3
protection_physical = 10
protection_fire = 15
skill_sword = 3
stats_maxhitpoints = 100
```
