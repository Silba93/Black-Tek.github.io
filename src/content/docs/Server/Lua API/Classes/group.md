---
title: Group
---

# Group Class

The Group class represents player access groups (Normal, Tutor, GM, God, etc.).

## Constructor

```lua
Group(id)
```

---

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getId()` | number | Group ID |
| `getName()` | string | Group name |
| `getFlags()` | number | Permission flags |
| `getAccess()` | boolean | Has special access |
| `getMaxDepotItems()` | number | Max depot items |
| `getMaxVipEntries()` | number | Max VIP entries |
| `hasFlag(flag)` | boolean | Has permission flag |

```lua
local group = player:getGroup()
print("Group: " .. group:getName())

if group:getAccess() then
    print("Has staff access")
end
```

---