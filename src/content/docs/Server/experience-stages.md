---
title: Experience Stages
---

# Experience Stages Configuration

BlackTek Server supports experience stage multipliers that vary based on player level. Stages can be configured in either `config.lua` (Lua format) or `config/stages.toml` (TOML format).

## Overview

Experience stages allow you to provide higher experience rates for lower-level players and gradually reduce the multiplier as players level up. This helps new players catch up while maintaining a balanced progression for high-level players.

**Priority**: If `config/stages.toml` exists and is enabled, it takes priority over `config.lua` stages.

---

## TOML Configuration (Recommended)

The TOML format is cleaner and easier to maintain. Create `config/stages.toml`:

### Basic Structure

```toml
[config]
enabled = true

[[stage]]
minlevel = 1
maxlevel = 50
multiplier = 10.0

[[stage]]
minlevel = 51
maxlevel = 100
multiplier = 5.0

[[stage]]
minlevel = 101
# No maxlevel means infinite
multiplier = 2.0
```

### Configuration Options

| Section | Field | Type | Required | Description |
|---------|-------|------|----------|-------------|
| `[config]` | `enabled` | boolean | No | Enable/disable stages (default: true) |
| `[[stage]]` | `minlevel` | integer | Yes | Minimum level for this stage |
| `[[stage]]` | `maxlevel` | integer | No | Maximum level (omit for infinite) |
| `[[stage]]` | `multiplier` | float | Yes | Experience multiplier |

### Disabling TOML Stages

To disable TOML stages and fall back to `config.lua`:

```toml
[config]
enabled = false
```

---

## Lua Configuration

Stages can also be defined in `config.lua`:

### Basic Structure

```lua
experienceStages = {
    { minlevel = 1, maxlevel = 8, multiplier = 7 },
    { minlevel = 9, maxlevel = 20, multiplier = 6 },
    { minlevel = 21, maxlevel = 50, multiplier = 5 },
    { minlevel = 51, maxlevel = 100, multiplier = 4 },
    { minlevel = 101, multiplier = 3 }
}
```

### Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `minlevel` | number | **Yes** | Minimum level for this stage (inclusive) |
| `maxlevel` | number | No | Maximum level for this stage (inclusive). Omit for no upper limit |
| `multiplier` | number | **Yes** | Experience multiplier for this level range |

### Disabling Stages

To use a flat experience rate instead of stages, set to `nil`:

```lua
experienceStages = nil
```

When stages are disabled, the `rateExp` value from `config.lua` is used as a flat multiplier for all levels.

---

## How Stages Work

1. When a player gains experience, the server checks their current level
2. It finds the stage where `minlevel <= player_level <= maxlevel`
3. The base experience is multiplied by the stage's `multiplier`
4. If no matching stage is found, `rateExp` from config is used

### Example Calculation

```
Player Level: 25
Base Experience Gained: 100
Matching Stage: { minlevel = 21, maxlevel = 50, multiplier = 5 }

Final Experience = 100 * 5 = 500
```

---

## Best Practices

### 1. No Gaps in Level Ranges

Ensure your stages cover all levels without gaps:

```lua
-- GOOD: Complete coverage
experienceStages = {
    { minlevel = 1, maxlevel = 50, multiplier = 10 },
    { minlevel = 51, maxlevel = 100, multiplier = 5 },
    { minlevel = 101, multiplier = 2 }  -- Covers 101+
}

-- BAD: Gap between 51-99
experienceStages = {
    { minlevel = 1, maxlevel = 50, multiplier = 10 },
    { minlevel = 100, multiplier = 2 }  -- Missing 51-99!
}
```

### 2. Final Stage Without maxlevel

The final stage should omit `maxlevel` to cover all remaining levels:

```lua
{ minlevel = 200, multiplier = 1 }  -- Covers 200 to infinity
```

### 3. Decimal Multipliers

Both formats support decimal multipliers:

```lua
{ minlevel = 1, maxlevel = 10, multiplier = 7.5 }
```

```toml
[[stage]]
minlevel = 1
maxlevel = 10
multiplier = 7.5
```

### 4. Order Doesn't Matter

Stages are automatically sorted by `minlevel`, so order in the config doesn't affect functionality.

---

## Common Configurations

### Low Rate Server

```lua
experienceStages = {
    { minlevel = 1, maxlevel = 100, multiplier = 2 },
    { minlevel = 101, maxlevel = 200, multiplier = 1.5 },
    { minlevel = 201, multiplier = 1 }
}
```

### Medium Rate Server

```lua
experienceStages = {
    { minlevel = 1, maxlevel = 50, multiplier = 10 },
    { minlevel = 51, maxlevel = 100, multiplier = 5 },
    { minlevel = 101, maxlevel = 150, multiplier = 3 },
    { minlevel = 151, maxlevel = 200, multiplier = 2 },
    { minlevel = 201, multiplier = 1 }
}
```

### High Rate Server

```lua
experienceStages = {
    { minlevel = 1, maxlevel = 100, multiplier = 500 },
    { minlevel = 101, maxlevel = 200, multiplier = 200 },
    { minlevel = 201, maxlevel = 300, multiplier = 100 },
    { minlevel = 301, maxlevel = 400, multiplier = 50 },
    { minlevel = 401, multiplier = 10 }
}
```

### Flat Rate (No Stages)

```lua
-- In config.lua
experienceStages = nil
rateExp = 5  -- All levels get 5x experience
```

---

## TOML Complete Example

```toml
# config/stages.toml
# Experience Stages Configuration

[config]
enabled = true

# Early game - high multiplier to help new players
[[stage]]
minlevel = 1
maxlevel = 20
multiplier = 50.0

# Low level - still fast leveling
[[stage]]
minlevel = 21
maxlevel = 50
multiplier = 25.0

# Mid level - moderate progression
[[stage]]
minlevel = 51
maxlevel = 100
multiplier = 10.0

# High level - slower progression
[[stage]]
minlevel = 101
maxlevel = 200
multiplier = 5.0

# End game - challenging progression
[[stage]]
minlevel = 201
maxlevel = 300
multiplier = 2.0

# Max level range - standard rate
[[stage]]
minlevel = 301
multiplier = 1.0
```

---

## Troubleshooting

### Stages Not Working

1. Check if TOML file exists and is enabled
2. Verify `minlevel` fields are present in all stages
3. Verify `multiplier` fields are present in all stages
4. Check server console for TOML parse errors

### Unexpected Experience Values

1. Ensure no gaps in level ranges
2. Check that stages don't overlap
3. Verify the correct format (TOML vs Lua)

### TOML Parse Errors

Common issues:
- Missing quotes around strings
- Incorrect array syntax (use `[[stage]]` not `[stage]`)
- Decimal numbers should use `.` not `,`
