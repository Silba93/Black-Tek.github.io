---
title: Raids
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