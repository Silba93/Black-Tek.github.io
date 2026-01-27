---
title: Groups
---

## Groups (groups.toml)

### File Location

```
config/groups.toml
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
