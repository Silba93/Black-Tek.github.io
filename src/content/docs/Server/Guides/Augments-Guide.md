---
title: Augments Guide
---

# Augments

**Augments are a way of grouping special types of modifiers into an object, able to be applied to players directly or to their items in a reusable and developer friendly way. Currently Augments can contain Damage Modifiers. A damage modifier can be triggered when the wearer of the augment has either attacked, or been attacked, that is, we have both attack and defensive types of Damage Modifiers.**

## Damage Modifiers

**Damage Modifiers exist as either *offensive* or *defensive* and since this is specific to the type of modifier used, you must know which category which modifier falls into. Let's take a look at those now :**

### Offensive Types
- **lifesteal** >> restores **health** to the user based on damage dealt
- **manasteal** >> restores **mana** to the user based on damage dealt
- **staminasteal** >> restores **stamina** to the user based on damage dealt
- **soulsteal** >> restores **soul** to the user based on damage dealt
- **critical** >> **increases damage** done to the target
- **piercing** >> deals the damage as **direct damage**
- **conversion** >> **converts outgoing damage** from one type **to another type**

### Defensive Types
- **absorb** >>  restores **health** to the user based on damage received
- **restore** >> restores **mana** to the user based on damage received
- **replenish**  >> restores **stamina** to the user based on damage received
- **revive** >> restores **soul** to the user based on damage received
- **reflect**  >> **reflects damage** back to the one who dealt it
- **deflect** >> **deflects damage** to enemies based on the **direction the attack came from**
- **ricochet** >> **deflects damage to a nearby location** (which can accept combat)
- **resist** >> **reduces damage**
- **reform** >> **converts incoming damage** from one type **to another type**
- **weakness** >> causes user to **receive increased damage**


**Now that we know what kinds of effects the damage modifiers have, lets expand our understanding of how they work. Each modifier has many options for configuring when exactly the modifier should trigger. I will refer to these as "filters" for clarity on their purpose. There are many such filters we can apply to our damage modifiers, let's have a look at those now :**

### Filter Types
- **damage** >> the **type of damage**, such as fire, death, ect.
- **origin** >> the **origin of the damage**, such as spell, melee, ect.
- **race** >> the **race the attacker or the target**, depending on if it's an **offensive** or **defensive** modifier
- **creaturetype** >> the **type of creature** (attacker/defender) such as, summon, monster, player, ect.
- **monster** >> **the specific monster** we wish the modifier to only work on for attacking/defending against.

**Now the thing to understand about these filters being applied to any damage modifier is that you can apply any and all of them, or none of them; It's your choice! Everything that you can configure on damage modifier has a default value, except the actual value. Let me explain:**

- **Damage** will default to all damage types if not set to a specific type.
- **Origin** will default to all origins if not set to a specific origin.
- **Race** will default to all races.
- **Creature** type will default to all creatures.
- **Monster** will only work when you specify a name. It's only purpose is to make a modifier only apply to a specific monster.

**This is not just the filters that work as defaults. We also have the *factor*, which is percent or flat rate. Every damage modifier defaults to percent based values unless specifically set to flat rate.** 


**Now that's a lot to take in I know, but since you have read up on all the core components of Augments, you are ready to learn how to put this knowledge to use!**

## Creating Custom Augments

**Augments can be created two different ways, through toml, or in lua.**

 ### Toml

**Toml parsing for augments is done at startup. The folder */data/augments/* is where you can store any number of toml files, and folders which contain toml files, that are written for augments. This means you can organize and categorize your augments however you wish; You can make folders of augments you intend to be provided to specific vocations, or you could have a single file holding all the augments for your new *item upgrade system*, it's entirely up to you.**

**Since this guide is not meant to teach you all about toml, it's recommended to check out the [toml official site](https://toml.io) to familiarize yourself with the syntax and data types supported. Now that you have a good understanding on the basics of toml, let's have a look at how to use it for creating augments:**

```erlang
[NecromancersDelight]
name = "Necromancer's Delight"
description = "The darkest souls find comfort in deathly pain"
modifiers = [
	# Death Absorbtion
	{ mod = "absorb", value = 15, damage = "death"}
]
```

**Ok let's break down the basic example above!**

**First the ``[NecromanacersDelight]`` in the brackets like that represents a table entry, in this case, our entries are the augment, and the words inside matter not, so long as there is no spaces and no duplicates; A good way to avoid any problems is to just put inside there the name of the augment without spaces or symbols, this will help make sure there are no problems with duplicates , because you certainly don't want duplicate names either.**

**I think that the``name`` and ``description`` fields are both self explanatory, but to be clear, they are just both strings attached to the augment, and you can use them how you want. The augment description in the default onLook is just an example of how you could do it, not a requirement.** 

**Now the best part, the modifiers! Modifiers are stored an ``array`` data type, which means that to start an array of modifiers must start with this bracket ``[`` and end with this bracket ``]``, and every entry inside must begin with this bracket ``{`` and end with these two together ``],`` with the exception being the last entry doesn't require a comma, so the comma is unnecessary in cases where there is only one entry like above. Inside each modifier entry, we have our options in the form of keys and values. The official list of keys are as follows:** 

 - **mod** = *the modifier type*
 - **damage** = *a filter applied to the type of damage*
 - **factor** = *percent or flat : if it's percent its based off the damage amount*
 - **value** = *the amount the modifier applies, if flat it's the exact amount, if percent it's based on the damage*
 - **target** = *a filter for the type of creature to apply against, such as bosses, or summons, ect.*
 - **origin** = *a filter for the type of origin of the damage, such as spell, melee, ranged, ect.*
 - **race** = *a filter for the type of race of the creature either doing the damage or receiving it*
 - **monster** = *a filter to the specific monster by name, for either attacking or receiving damage from*

**Don't forget the filter keywords apply to the target when it's an attack modifier and to the receiver of damage when it's a defensive modifier. You should also know that the only keyword actually required to create a modifier entry is the ``mod`` and ``value`` keywords; Everything else has a default value and will fallback to it's default value if not specified. The filters all default to ``"all"`` when not set, which is the same as ``"none"`` . Even the ``factor`` will default to ``"percent"`` if not set.** 

**Each of the filter keywords all have their own list of options:**

|Damage|Target|Origin|Race|
|--|--|--|--|
|``all`` or ``none``|``all`` or ``none``|``all`` or ``none``|``none``|
|``physical`` or ``melee``|``player``|``condition``|``venom``|
|``energy`` or ``electric``|``monster``|``spell``|``blood``|
|``earth`` or ``poison``|``npc``|``melee``|``undead``|
|``fire``|``allsummon`` or ``summons``|``ranged``|``fire``|
|``lifedrain`` or ``lifesteal`` or ``lifeleech``|``ownedsummon`` or ``mysummon``|``absorb``|``energy``|
|``manadrain`` or ``manasteal`` or ``manaleech``|``hostilesummon`` or ``enemysummon``|``restore``|-|
|``drown`` or ``water``|``guildsummon``|``reflect``|-|
|``ice``|``partysummon``|``deflect``|-|
|``holy``|``boss``|``ricochet``|-|
|``death`` or ``curse``|-|``piercing``|-|

**You can find more example's included with BlackTek already in the */data/augments/* folder, or you can visit the discord and get help and more examples from the [BlackTek community.](https://discord.gg/dy5wXSzbPG)**

### Lua
 ***coming soon*** 

## Applying Augments

**Augments can be applied to either players or items. When applying an augment to an item, it will only affect the player that is wearing it (in the appropriate slot). To apply an augment directly to a player we must use lua, but to apply it to an item we have the option to use lua to apply to only specific instances of items, or we can use the ``items.xml`` to apply directly to an ``ItemType``, so that anytime an item of that type is created, it comes with the augment already. For example, if we applied an augment to the ``blue robe`` in items.xml then all blue robes would now have this augment when being created (either via npc, or as loot, from a script, ect.).** 

**Let's have a look at that example:**

```xml
    <item id="2656" article="a" name="blue robe">
        <attribute key="description" value="It is a magic robe." />
        <attribute key="weight" value="2200" />
        <attribute key="armor" value="11" />
        <attribute key="slotType" value="body" />
        <attribute key="augment" value="Necromancer's Delight">
        <attribute key="imbuementslots" value="2" />
    </item>
```

**You will notice that the value of the augment is the name, and that this must match exactly the ``name`` assigned to the augment. That's it! It's as simple as that to assign an augment directly to an ``ItemType``, now all blue robes will start with ``Necromancer's Delight``.**

**The other way to add augments, and the more dynamic and flexible way to do so, is via the augments lua API. There is a full fledged augment lua class, as well as a damage modifier class, both with their own assortment of methods available in lua, you can find all that information above in the section for  ``Creating Augments``. *(please note, that part of this guide has not yet been completed)***

**Let's have a look at how to register an already created augment (such as one in toml) to a player and to an item in lua:**

```lua
	local augment = Augment("Necromancer's Delight") -- Here we construct the augment using it's name which is case sensitive

	if not augment then
		player:sendCancelMessage("There is no augment with that name.")
		return false
	end
	-- Here we are using some sort of already valid player/item userdata and just adding the augment directly
	player:addAugment(augment)
	item:addAugment(augment)

```