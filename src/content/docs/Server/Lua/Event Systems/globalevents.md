---
title: Global Events
---

# Global Events

Global Events are server-wide events that trigger at specific times, intervals, or during server lifecycle events.

## Event Types

| Type | Callback | Description |
|------|----------|-------------|
| `startup` | `onStartup` | Server starts |
| `shutdown` | `onShutdown` | Server shuts down |
| `record` | `onRecord` | New player record |
| `save` | `onSave` | Server saves |
| `timer` | `onTime` | Specific time of day |
| `think` | `onThink` | Periodic interval |

---

## Creating a Global Event

```lua
local myEvent = GlobalEvent("eventName")

function myEvent.onStartup()
    print("Server started!")
    return true
end

myEvent:type("startup")
myEvent:register()
```

---

## Methods

### `type(eventType)`
Sets the event type.

### `time(timeString)`
Sets the time for timer events (format: `"HH:MM:SS"` or `"HH:MM"`).

```lua
myEvent:time("12:00")  -- Triggers at noon
```

### `interval(ms)`
Sets the interval for think events in milliseconds.

```lua
myEvent:interval(60000)  -- Every minute
```

### `register()`
Registers the event.

---

## Callback Signatures

### `onStartup()`
```lua
function myEvent.onStartup()
    return true
end
```

### `onShutdown()`
```lua
function myEvent.onShutdown()
    return true
end
```

### `onRecord(current, old)`
```lua
function myEvent.onRecord(current, old)
    -- current = new record, old = previous record
    return true
end
```

### `onSave()`
```lua
function myEvent.onSave()
    return true
end
```

### `onTime(interval)`
```lua
function myEvent.onTime(interval)
    return true
end
```

### `onThink(interval)`
```lua
function myEvent.onThink(interval)
    return true
end
```

---

## Examples

### Startup Event

```lua
local startup = GlobalEvent("StartupMessage")

function startup.onStartup()
    print("=================================")
    print("BlackTek Server Started!")
    print("=================================")
    return true
end

startup:type("startup")
startup:register()
```

### Daily Reset at Midnight

```lua
local dailyReset = GlobalEvent("DailyReset")

function dailyReset.onTime(interval)
    -- Reset daily storages
    db.query("UPDATE player_storage SET value = 0 WHERE key = 50000")
    
    -- Broadcast message
    for _, player in ipairs(Game.getPlayers()) do
        player:sendTextMessage(MESSAGE_STATUS_WARNING, "Daily reset complete!")
    end
    
    return true
end

dailyReset:type("timer")
dailyReset:time("00:00")
dailyReset:register()
```

### Periodic Save Reminder

```lua
local saveReminder = GlobalEvent("SaveReminder")

function saveReminder.onThink(interval)
    for _, player in ipairs(Game.getPlayers()) do
        player:sendTextMessage(MESSAGE_STATUS_CONSOLE_BLUE, 
            "Remember to bank your gold!")
    end
    return true
end

saveReminder:type("think")
saveReminder:interval(3600000)  -- Every hour
saveReminder:register()
```

### Player Record Announcement

```lua
local recordEvent = GlobalEvent("PlayerRecord")

function recordEvent.onRecord(current, old)
    local message = string.format(
        "New player record: %d players! (Previous: %d)",
        current, old
    )
    
    for _, player in ipairs(Game.getPlayers()) do
        player:sendTextMessage(MESSAGE_STATUS_WARNING, message)
    end
    
    return true
end

recordEvent:type("record")
recordEvent:register()
```

---

## File Location

```
data/scripts/globalevents/
```
