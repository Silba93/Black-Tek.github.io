---
title: Items
---

## Items (items.toml)

### Structure

Minimal item (required fields only, with comments):

```toml
# Minimum required fields
[[item]]
id = 1000        # Unique item ID
name = "example" # Display name
weight = 100     # Weight in 0.01 oz units (100 = 1.00 oz)
```

Examples:

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
speed = 20

[[item]]
id = 2463
name = "plate armor"
weight = 12000
armor = 12
slot = "body"
suppressPhysical = true
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

Abilities are set as top-level item keys (not an `[item.abilities]` table).

<details>
<summary>See all ability keys</summary>

| Key | Type | Description |
|-----|------|-------------|
| `invisible` | bool | Grants invisibility |
| `manaShield` | bool | Grants mana shield |
| `speed` | int | Speed change |
| `healthGain` | int | HP regen amount |
| `healthTicks` | int | HP regen tick interval |
| `manaGain` | int | Mana regen amount |
| `manaTicks` | int | Mana regen tick interval |
| `skillSword` | int | Sword skill bonus |
| `skillAxe` | int | Axe skill bonus |
| `skillClub` | int | Club skill bonus |
| `skillDist` | int | Distance skill bonus |
| `skillFish` | int | Fishing skill bonus |
| `skillShield` | int | Shielding skill bonus |
| `skillFist` | int | Fist skill bonus |
| `criticalHitChance` | int | Critical hit chance bonus |
| `criticalHitAmount` | int | Critical hit damage bonus |
| `manaLeechChance` | int | Mana leech chance bonus |
| `manaLeechAmount` | int | Mana leech amount bonus |
| `lifeLeechChance` | int | Life leech chance bonus |
| `lifeLeechAmount` | int | Life leech amount bonus |
| `maxHitpoints` | int | Max HP bonus |
| `maxHitpointsPercent` | int | Max HP % bonus |
| `maxManaPoints` | int | Max mana bonus |
| `maxManaPointsPercent` | int | Max mana % bonus |
| `magicPoints` | int | Magic level bonus |
| `magicLevelPoints` | int | Alias of `magicPoints` |
| `magicPointsPercent` | int | Magic level % bonus |
| `suppressDrunk` | bool | Suppress drunk condition |
| `suppressEnergy` | bool | Suppress energy condition |
| `suppressFire` | bool | Suppress fire condition |
| `suppressPoison` | bool | Suppress poison condition |
| `suppressDrown` | bool | Suppress drown condition |
| `suppressPhysical` | bool | Suppress bleeding (physical) condition |
| `suppressFreeze` | bool | Suppress freezing condition |
| `suppressDazzle` | bool | Suppress dazzled condition |
| `suppressCurse` | bool | Suppress cursed condition |
| `elementIce` | int | Adds ice elemental damage |
| `elementEarth` | int | Adds earth elemental damage |
| `elementFire` | int | Adds fire elemental damage |
| `elementEnergy` | int | Adds energy elemental damage |
| `elementDeath` | int | Adds death elemental damage |
| `elementHoly` | int | Adds holy elemental damage |

</details>
