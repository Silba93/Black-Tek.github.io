---
title: Items
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
skill_sword = 3
stats_maxhitpoints = 100
```
