---
title: Vocations
---

## Vocations (vocations.toml)

### File Location

```
data/vocations/vocations.toml
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