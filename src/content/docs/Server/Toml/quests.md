---
title: Quests
---
## Quests (quests.toml)

### File Location

```
data/quests/quests.toml
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