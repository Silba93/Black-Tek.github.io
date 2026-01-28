---
title: Items
---

## Items (items.toml)

### Structure

Examples (minimal fields for a few common categories):

```toml
# Minimum required fields
[[item]]
id = 1000        # Unique item ID
name = "example" # Display name
weight = 100     # Weight in 0.01 oz units (100 = 1.00 oz)

[[item]]
id = 2160
name = "crystal coin"
weight = 10
worth = 10000 # Worth is relative and handled automatically by the server (e.g., 10000 is 10x a coin with worth = 1000)
stackable = true

[[item]]
id = 2400
name = "magic sword"
weight = 4200
attack = 40
defense = 35
slotType = "hand"

[[item]]
id = 2463
name = "plate armor"
weight = 12000
armor = 12
slotType = "body"

[[item]]
id = 1988
name = "backpack"
weight = 1800
slotType = "backpack"
```

Examples with abilities:

```toml
[[item]]
id = 3001
name = "boots of haste"
weight = 800
speed = 80

[[item]]
id = 3002
name = "ring of vitality"
weight = 200
healthGain = 5
healthTicks = 2000

[[item]]
id = 3003
name = "amulet of focus"
weight = 500
manaGain = 5
manaTicks = 2000

[[item]]
id = 3004
name = "training blade"
weight = 1800
skillSword = 3
skillShield = 2
```

### Item Properties

| Property | Description |
|----------|-------------|
| `id` | Item ID |
| `name` | Item name |
| `weight` | Weight (0.01 oz units) |
| `worth` | Gold value |
| `attack`, `defense`, `armor` | Combat stats |
| `slotType` | Equipment slot |
| `level` | Required level |
| `stackable` | Can stack |

### Abilities

Abilities are optional fields that grant bonuses or effects.

Common abilities:

| Key | Description |
|-----|-------------|
| `speed` | Speed change |
| `healthGain`, `healthTicks` | HP regen amount and tick interval |
| `manaGain`, `manaTicks` | Mana regen amount and tick interval |
| `skillSword`, `skillAxe`, `skillClub`,`skillDist`, `skillFish`, `skillShield`, `skillFist` | Skill bonuses |

Full list of abilities can be found in [items.h](https://github.com/Black-Tek/BlackTek-Server/blob/82542d5734e8f81c2a8b41f342d1d31f9bbc00d9/src/items.h#L58) or expanded here:

<details>
<summary><strong>All ability keys</strong> (expand)</summary>

Regen:
`healthGain`, `healthTicks`, `manaGain`, `manaTicks`

Effects:
`speed`, `invisible`, `manaShield`

Skills:
`skillSword`, `skillAxe`, `skillClub`, `skillDist`, `skillFish`, `skillShield`, `skillFist`

Special skills:
`criticalHitChance`, `criticalHitAmount`, `manaLeechChance`, `manaLeechAmount`, `lifeLeechChance`, `lifeLeechAmount`

Stats:
`maxHitpoints`, `maxHitpointsPercent`, `maxManaPoints`, `maxManaPointsPercent`, `magicPoints`, `magicLevelPoints`, `magicPointsPercent`

Condition suppression:
`suppressDrunk`, `suppressEnergy`, `suppressFire`, `suppressPoison`, `suppressDrown`, `suppressPhysical`, `suppressFreeze`, `suppressDazzle`, `suppressCurse`

Elemental damage(weapon damage):
`elementIce`, `elementEarth`, `elementFire`, `elementEnergy`, `elementDeath`, `elementHoly`

</details>
