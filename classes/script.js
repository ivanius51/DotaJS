//'use strict';

var isEmptyString = function(strtext) 
{
	return (typeof(strtext) === "undefined")||(strtext === null)||(strtext.length === 0) || (!strtext.trim());
};

Game.UI = 
{
	width: Game.GetMainHUD().actuallayoutwidth,
	height: Game.GetMainHUD().actuallayoutheight,
	ScreenWidth: Game.GetScreenWidth(),
	ScreenHeight: Game.GetScreenHeight()
};

//приказ герою переместится в точку с координатами [x,y,z]
Game.MoveTo = function(EntityID, xyz, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_TO_POSITION;
	order.UnitIndex = EntityID;
	order.Position = xyz;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

Game.MoveToDirection = function(EntityID, xyz, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_TO_DIRECTION;
	order.UnitIndex = EntityID;
	order.Position = xyz;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

Game.MoveToTarget = function(EntityID, target, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_TO_TARGET;
	order.UnitIndex = EntityID;
	order.TargetIndex = target;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

//каст способности или айтема на цель
Game.CastTarget = function(EntityID, Abil, target, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TARGET;
	order.UnitIndex = EntityID;
	order.TargetIndex = target;
	order.AbilityIndex = Abil;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

//атаковать
Game.AttackTarget = function(EntityID, target, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_TARGET;
	order.UnitIndex = EntityID;
	order.TargetIndex = target;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

//атаковать в точку
Game.AttackPoint = function(EntityID, xyz, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_TARGET;
	order.UnitIndex = EntityID;
	order.Position = xyz;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

//каст способности или айтема в точку (sunstrike)
Game.CastPosition = function(EntityID, abil, xyz, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_CAST_POSITION;
	order.UnitIndex = EntityID;
	order.Position = xyz;
	order.AbilityIndex = abil;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

//каст notarget способности или айтема
Game.CastNoTarget = function(EntityID, abil, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_CAST_NO_TARGET;
	order.UnitIndex = EntityID;
	order.AbilityIndex = abil;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

//переключение способности
Game.ToggleAbil = function(EntityID, abil, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE;
	order.UnitIndex = EntityID;
	order.AbilityIndex = abil;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

//приказ остановиться
Game.EntStop = function(EntityID, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_STOP;
	order.UnitIndex = EntityID;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

//разобрать артефакт
Game.DisassembleItem = function(EntityID, item, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_DISASSEMBLE_ITEM;
	order.UnitIndex = EntityID;
	order.AbilityIndex = item;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

//выбросить артефакт
Game.DropItem = function(EntityID, item, xyz, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_DROP_ITEM;
	order.UnitIndex = EntityID;
	order.Position = xyz;
	order.AbilityIndex = item;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

//поднять артефакт
Game.PuckupItem = function(EntityID, item, queue)
{
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_PICKUP_ITEM;
	order.UnitIndex = EntityID;
	order.TargetIndex = item;
	order.Queue = queue;
	order.ShowEffects = false;
	Game.PrepareUnitOrders(order);
};

Game.PickupItem = function(EntityID, item, queue)
{
	Game.PuckupItem(EntityID, item, queue);
};

Game.ItemLock = function(EntityID, item, queue){
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_SET_ITEM_COMBINE_LOCK
	order.UnitIndex = EntityID
	order.TargetIndex  = item
	order.Queue = queue
	order.ShowEffects = false
	Game.PrepareUnitOrders( order )
};

Game.PurchaseItem = function(EntityID, itemid, queue){
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_PURCHASE_ITEM 
	order.UnitIndex = EntityID
	order.AbilityIndex = itemid
	order.Queue = queue
	order.ShowEffects = false
	Game.PrepareUnitOrders( order )
};

Game.PurchaseItemPreGame = function(EntityID, itemid, queue){
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_PREGAME_ADJUST_ITEM_ASSIGNMENT
	order.UnitIndex = EntityID
	order.AbilityIndex = itemid
	order.Queue = queue
	order.ShowEffects = false
	Game.PrepareUnitOrders( order )
};

Game.SellItem = function(EntityID, itemid, queue){
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_SELL_ITEM 
	order.UnitIndex = EntityID
	order.AbilityIndex = itemid
	order.Queue = queue
	order.ShowEffects = false
	Game.PrepareUnitOrders( order )
};

Game.PuckupRune = function(EntityID, runeId, queue){
	var order = {};
	order.OrderType = dotaunitorder_t.DOTA_UNIT_ORDER_PICKUP_RUNE 
	order.UnitIndex = EntityID
	order.TargetIndex  = runeId
	order.Queue = queue
	order.ShowEffects = false
	Game.PrepareUnitOrders( order )
};



//Получение расстояния между двумя точками в пространстве, высшая математика епта
Game.PointDistance = function(a, b)
{
	return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
};

//"округление" числа до определенного кол-ва знаков после запятой
Game.roundPlus = function(x, n)
{
	if (isNaN(x) || isNaN(n)) return false;
	var n = Math.pow(10, n);
	return Math.round(x * n) / n;
};

//логарифм по основанию
Math.logb = function(number, base)
{
	return Math.log(number) / Math.log(base);
};

//поэлементное сравнение двух массивов, порядок элементов не учитывается
Game.CompareArrays = function(a, b)
{
	if (a == b)
		return true;
	if (a == null || b == null) 
		return false;
	if (a.length != b.length)
		return false;

	for (i in a)
		if (a[i] != b[i])
			return false;
	return true;
};

//проверяет есть ли в двух объектах хотя бы один одинаковый элемент
Game.IntersecArrays = function(a, b)
{
	for (i in a)
		for (j in b)
			if (a[i] == b[j])
				return true;
	return false;
};

//проверяет является ли иллюзией герой
Game.IsIllusion = function(EntityID)
{
	var PlayersEnt = [];
	var PlayersIDs = Game.GetAllPlayerIDs();
	for (i in PlayersIDs)
		PlayersEnt.push(Players.GetPlayerHeroEntityIndex(PlayersIDs[i]));
	if (PlayersEnt.indexOf(EntityID) == -1)
		return true;
	else
		return false;
};

Game.PlayerState = function()
{
	return Abilities.GetLocalPlayerActiveAbility();
};

Game.GetPlayer = function()
{
	return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
};

Game.GetPlayerTarget = function()
{
	return GameUI.FindScreenEntities(GameUI.GetCursorPosition());
};

//список указателей на героев без иллюзий
Game.PlayersHeroEnts = function()
{
	var PlayersEnt = [];
	var PlayersIDs = Game.GetAllPlayerIDs();
	for (i in PlayersIDs)
		PlayersEnt.push(Players.GetPlayerHeroEntityIndex(PlayersIDs[i]));
	return PlayersEnt;
};

//список указателей на только вражеских героев без иллюзий
Game.PlayersEnemyHeroEnts = function()
{
	var PlayersEnt = []
	var PlayersIDs = Game.GetAllPlayerIDs()
	for (i in PlayersIDs)
		if (Players.GetTeam(Players.GetLocalPlayer()) != Players.GetTeam(PlayersIDs[i]))
			PlayersEnt.push(Players.GetPlayerHeroEntityIndex(PlayersIDs[i]))
	return PlayersEnt
};

//возвращает DOTA_ABILITY_BEHAVIOR в удобном представлении
Game.Behaviors = function(DABor)
{
	var DABh = [];
	var ZBehavior = Abilities.GetBehavior(parseInt(DABor));
	var s = 32;
	while (ZBehavior > 0 && s > 0)
	{
		if (Math.pow(2, s) > ZBehavior)
		{
			s--;
			continue;
		}
		ZBehavior -= Math.pow(2, s);
		DABh.push(Math.pow(2, s));
	};
	return DABh;
};

Game.Behaviors2 = function(DABor)
{
	var DABh = [];
	var ZBehavior = DABor;
	var s = 32;
	while (ZBehavior > 0 && s > 0)
	{
		if (Math.pow(2, s) > ZBehavior)
		{
			s--;
			continue;
		};
		ZBehavior -= Math.pow(2, s);
		DABh.push(Math.pow(2, s));
	};
	return DABh
}

//получение массива с инвентарем юнита
Game.GetInventory = function(EntityID)
{
	var result = [];
	for (i = 0; i < 9; i++)
	{
		if (Entities.GetItemInSlot(EntityID, i) != -1)
			result.push(Entities.GetItemInSlot(EntityID, i));
	};
	return result;
};

//получение массива с инвентарем юнита
Game.GetInventoryNames = function(EntityID)
{
	var result = [];
	for (i = 0; i < 9; i++)
	{
		if (Entities.GetItemInSlot(EntityID, i) != -1)
			result.push(Abilities.GetAbilityName(Entities.GetItemInSlot(EntityID, i)));
	};
	return result;
};

//ищет по названию в инвентаре
Game.GetItemByName = function(EntityID, name)
{
	var item = -1;
	for (i = 0; i < 9; i++)
	{
		item = Entities.GetItemInSlot(EntityID, i)
		if (Abilities.GetAbilityName(item) == name)
			return item;
	};
	return -1;
};

//получение массива с инвентарем юнита
Game.GetAbilityNames = function(EntityID)
{
	var result = [];
	for (i = 0; i < Entities.GetAbilityCount(EntityID); i++)
		if (Abilities.GetLevel(Entities.GetAbility(EntityID, i)) > 0)
			result.push(Abilities.GetAbilityName(Entities.GetAbility(EntityID, i)));
	return result;
};

//получение массива с инвентарем юнита
Game.GetAbilities = function(EntityID)
{
	var result = [];
	for (i = 0; i < Entities.GetAbilityCount(EntityID); i++)
		if (Abilities.GetLevel(Entities.GetAbility(EntityID, i)) > 0)
			result.push(Entities.GetAbility(EntityID, i));
	return result;
};

//ищет по названию и в абилках и в инвентаре
Game.GetAbilityByName = function(EntityID, name)
{
	var GABN = Entities.GetAbilityByName(EntityID, name)
	if (GABN != -1)
		return GABN;
	for (i = 0; i < 9; i++)
	{
		var item = Entities.GetItemInSlot(EntityID, i)
		if (Abilities.GetAbilityName(item) == name)
			return item;
	};
	return -1;
};

//объект с указателями на бафы юнита
Game.GetBuffs = function(EntityID)
{
	var buffs = [];
	for (i = 0; i < Entities.GetNumBuffs(EntityID); i++)
		buffs.push(Entities.GetBuff(EntityID, i));
	return buffs;
};
//объект с именами бафов юнита
Game.GetBuffsNames = function(EntityID)
{
	var buffnames = [];
	for (i = 0; i < Entities.GetNumBuffs(EntityID); i++)
	{
		buffnames.push(Buffs.GetName(EntityID, Entities.GetBuff(EntityID, i)));
	};
	return buffnames;
};
Game.GetBuffByName = function(EntityID, buffname)
{
	var buff = -1
	for (i = 0; i < Entities.GetNumBuffs(EntityID); i++)
		if (Buffs.GetName(EntityID, Entities.GetBuff(EntityID, i)) == buffname)
			buff = Entities.GetBuff(EntityID, i);
	return buff;
};

//клонирование объекта
Game.CloneObject = function(EntityID)
{
	if (null == EntityID || "object" != typeof EntityID) return EntityID;
	var copy = EntityID.constructor();
	for (var attr in EntityID)
	{
		if (EntityID.hasOwnProperty(attr)) copy[attr] = EntityID[attr];
	};
	return copy;
};

Game.VelocityWaypoint = function(EntityID, time)
{
	var xyz = Entities.GetAbsOrigin(EntityID);
	var forward = Entities.GetForward(EntityID);
	var movespeed = Entities.GetIdealSpeed(EntityID);
	return [xyz[0] + forward[0] * movespeed * time, xyz[1] + forward[1] * movespeed * time, xyz[2] + forward[2] * movespeed * time];
};

$.Msg('Classes loaded ' + 'functions');

function D2Object(Oid, Options)
{
	this.Oid = Oid;
	this.Options = Options;
	$.Msg('Create D2Object OID = ', this.Oid, ';Options = ', this.Options);
};

function Entity(Oid, Owner, Options)
{
	if (!Entities.IsValidEntity(Oid))
		return null;
	D2Object.apply(this, [Oid, Options]);
	this.Owner = Owner;
	$.Msg('Create EntityID Owner = ', Owner, ';Class = ', Entities.GetClassname(this.Oid), ';Name = ', Entities.GetUnitName(this.Oid));
	this.AbsOrigin = function()
	{
		return Entities.GetAbsOrigin(this.Oid);
	};
	this.Forward = function()
	{
		return Entities.GetForward(this.Oid);
	};
	this.Right = function()
	{
		return Entities.GetRight(this.Oid);
	};
	this.Up = function()
	{
		return Entities.GetUp(this.Oid);
	};
	this.xyz = function()
	{
		return this.AbsOrigin();
	};
	this.x = function()
	{
		return this.AbsOrigin()[0];
	};
	this.y = function()
	{
		return this.AbsOrigin()[1];
	};
	this.z = function()
	{
		return this.AbsOrigin()[2];
	};
	this.DistTo = function(Target)
	{
		if (Array.isArray(Target))
			return Game.PointDistance(this.xyz(), Target);
		else
		if (Target instanceof Entity)
			return Game.PointDistance(this.xyz(), Target.xyz());
		else
			return -1;
	};
};

Entity.prototype = Object.create(D2Object.prototype);
Entity.prototype.constructor = Entity;

function Unit(Oid, Owner, Options)
{
	Entity.apply(this, [Oid, Owner, Options]);
	//variables
	this._Abilities = [];
	this._Buffs = [];
	this._Items = [];
	
	this.Name = this.GetUnitName();
	this.DisplayedName = this.DisplayedUnitName();
	this._HealthBarOffset = this.HealthBarOffset();

	this.ScreenCords = function(UI)
	{
		var xyz = this.xyz;
		if (UI)
			xyz[2] += this._HealthBarOffset;
		var result = {
			x : Game.WorldToScreenX(xyz[0], xyz[1], xyz[2]),
			y : Game.WorldToScreenY(xyz[0], xyz[1], xyz[2])
		};
		return result;
	};
	
	//methods
	this.MoveTo = function(Target,queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if (Array.isArray(Target))
			return Game.MoveTo(this.Oid, Target, queue);
		else
		if (Target instanceof Entity)
			return Game.MoveToTarget(this.Oid, Target.Oid, queue);
		else
			return -1;
	};
	this.MoveToDirection = function(Target,queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if (Array.isArray(Target))
			return Game.MoveToDirection(this.Oid, Target, queue);
		else
		if (Target instanceof Entity)
			return Game.MoveToDirection(this.Oid, Target.Oid, queue);
		else
			return -1;
	};
	this.Stop = function(queue)
	{
		GameUI.SelectUnit(this.Oid, false);
		Game.EntStop(this.Oid, queue);
	};
	this.Attack = function(Target,queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if (Array.isArray(Target))
			return Game.AttackPoint(this.Oid, Target, queue);
		else
		if (Target instanceof Entity)
			return Game.AttackTarget(this.Oid, Target.Oid, queue);
		else
			return -1;
	};
	this.PickupItem = function(Item,queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if (Item instanceof Entity)
			return Game.PickupItem(this.Oid, Item.Oid, queue);
		else
		if (Item != -1)
			return Game.PickupItem(this.Oid, Item, queue);
		else
			return -1;
	};
	this.PurchaseItem = function(Item,queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if (Item instanceof Entity)
			return Game.PurchaseItem(this.Oid, Item.Oid, queue);
		else
		if (Item != -1)
			return Game.PurchaseItem(this.Oid, Item, queue);
		else
			return -1;
	};
	this.PurchaseItemPreGame = function(Item,queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if (Item instanceof Entity)
			return Game.PurchaseItemPreGame(this.Oid, Item.Oid, queue);
		else
		if (Item != -1)
			return Game.PurchaseItemPreGame(this.Oid, Item, queue);
		else
			return -1;
	};
	this.BuyItem = function(Item,queue)
	{
		return this.PurchaseItem(Item,queue);
	};
	this.SellItem = function(Item,queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if (Item instanceof Entity)
			return Game.SellItem(this.Oid, Item.Oid, queue);
		else
		if (Item != -1)
			return Game.SellItem(this.Oid, Item, queue);
		else
			return -1;
	};
	this.ItemLock = function(Item,queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if (Item instanceof Entity)
			return Game.ItemLock(this.Oid, Item.Oid, queue);
		else
		if (Item != -1)
			return Game.ItemLock(this.Oid, Item, queue);
		else
			return -1;
	};
	
	//names
	this.Classname = function()
	{
		return Entities.GetClassname(this.Oid);
	};
	this.DisplayedUnitName = function()
	{
		return Entities.GetDisplayedUnitName(this.Oid);
	};
	this.UnitLabel = function()
	{
		return Entities.GetUnitLabel(this.Oid);
	};
	this.UnitName = function()
	{
		return Entities.GetUnitName(this.Oid);
	};

	//Stats
	this.DamageBonus = function()
	{
		return Entities.GetDamageBonus(this.Oid);
	};
	this.DamageMax = function()
	{
		return Entities.GetDamageMax(this.Oid);
	};
	this.DamageMin = function()
	{
		return Entities.GetDamageMin(this.Oid);
	};
	this.IsRangedAttacker = function()
	{
		return Entities.IsRangedAttacker(this.Oid);
	};
	this.AttackRange = function()
	{
		return Entities.GetAttackRange(this.Oid);
	};
	this.AttackSpeed = function()
	{
		return Entities.GetAttackSpeed(this.Oid);
	};
	this.IncreasedAttackSpeed = function()
	{
		return Entities.GetIncreasedAttackSpeed(this.Oid);
	};
	this.AttacksPerSecond = function()
	{
		return Entities.GetAttacksPerSecond(this.Oid);
	};
	this.BaseAttackTime = function()
	{
		return Entities.GetBaseAttackTime(this.Oid);
	};
	this.SecondsPerAttack = function()
	{
		return Entities.GetSecondsPerAttack(this.Oid);
	};
	this.BaseMoveSpeed = function()
	{
		return Entities.GetBaseMoveSpeed(this.Oid);
	};
	this.IdealSpeed = function()
	{
		return Entities.GetIdealSpeed(this.Oid);
	};

	this.Health = function()
	{
		return Entities.GetHealth(this.Oid);
	};
	this.MaxHealth = function()
	{
		return Entities.GetMaxHealth(this.Oid);
	};
	this.HealthPercent = function()
	{
		return Entities.GetHealthPercent(this.Oid);
	};
	this.HealthThinkRegen = function()
	{
		return Entities.GetHealthThinkRegen(this.Oid);
	};
	this.Mana = function()
	{
		return Entities.GetMana(this.Oid);
	};
	this.ManaThinkRegen = function()
	{
		return Entities.GetManaThinkRegen(this.Oid);
	};
	this.MaxMana = function()
	{
		return Entities.GetMaxMana(this.Oid);
	};
	this.Level = function()
	{
		return Entities.GetLevel(this.Oid);
	};
	this.AbilityPoints = function()
	{
		return Entities.GetAbilityPoints(this.Oid);
	};
	this.NeededXPToLevel = function()
	{
		return Entities.GetNeededXPToLevel(this.Oid);
	};
	this.TeamNumber = function()
	{
		return Entities.GetTeamNumber(this.Oid);
	};
	this.HasteFactor = function()
	{
		return Entities.GetHasteFactor(this.Oid);
	};

	this.BaseMagicalResistanceValue = function()
	{
		return Entities.GetBaseMagicalResistanceValue(this.Oid);
	};
	this.MagicalArmorValue = function()
	{
		return Entities.GetMagicalArmorValue(this.Oid);
	};
	this.BonusPhysicalArmor = function()
	{
		return Entities.GetBonusPhysicalArmor(this.Oid);
	};
	this.PhysicalArmorValue = function()
	{
		return Entities.GetPhysicalArmorValue(this.Oid);
	};
	this.ArmorForDamageType = function(DamageType)
	{
		return Entities.GetArmorForDamageType(this.Oid, DamageType);
	};
	this.ArmorReductionForDamageType = function(DamageType)
	{
		return Entities.GetArmorReductionForDamageType(this.Oid, DamageType);
	};
	//this.CombatClassAttack = function(){ return Entities.GetCombatClassAttack(this.Oid); };
	//this.CombatClassDefend = function(){ return Entities.GetCombatClassDefend(this.Oid); };
	this.IsAttackImmune = function()
	{
		return Entities.IsAttackImmune(this.Oid);
	};
	this.IsMagicImmune = function()
	{
		return Entities.IsMagicImmune(this.Oid);
	};
	this.IsEvadeDisabled = function()
	{
		return Entities.IsEvadeDisabled(this.Oid);
	};
	this.HasScepter = function()
	{
		return Entities.HasScepter(this.Oid);
	};

	this.IsSelectable = function()
	{
		return Entities.IsSelectable(this.Oid);
	};
	this.IsUnselectable = function()
	{
		return Entities.IsUnselectable(this.Oid);
	};
	this.IsMoving = function()
	{
		return Entities.IsMoving(this.Oid);
	};
	this.IsAlive = function()
	{
		return Entities.IsAlive(this.Oid);
	};
	this.IsInvisible = function()
	{
		return Entities.IsInvisible(this.Oid);
	};

	//debuffs
	this.IsRooted = function()
	{
		return Entities.IsRooted(this.Oid);
	};
	this.IsFrozen = function()
	{
		return Entities.IsFrozen(this.Oid);
	};
	this.IsDisarmed = function()
	{
		return Entities.IsDisarmed(this.Oid);
	};
	this.IsHexed = function()
	{
		return Entities.IsHexed(this.Oid);
	};
	this.IsNightmared = function()
	{
		return Entities.IsNightmared(this.Oid);
	};
	this.IsMuted = function()
	{
		return Entities.IsMuted(this.Oid);
	};
	this.IsInvulnerable = function()
	{
		return Entities.IsInvulnerable(this.Oid);
	};
	this.IsLowAttackPriority = function()
	{
		return Entities.IsLowAttackPriority(this.Oid);
	};
	this.IsSilenced = function()
	{
		return Entities.IsSilenced(this.Oid);
	};
	this.IsStunned = function()
	{
		return Entities.IsStunned(this.Oid);
	};

	//this.IsCommandRestricted = function(){ return Entities.IsCommandRestricted(this.Oid); };
	//this.IsConsideredHero = function(){ return Entities.IsConsideredHero(this.Oid); };
	//this.IsControllableByAnyPlayer = function(){ return Entities.IsControllableByAnyPlayer(this.Oid); };
	//this.IsGeneratedByEconItem = function(){ return Entities.IsGeneratedByEconItem(this.Oid); };
	//this.IsHallofFame = function(){ return Entities.IsHallofFame(this.Oid); };
	//this.IsInRangeOfFountain = function(){ return Entities.IsInRangeOfFountain(this.Oid); };

	//unit type
	this.IsAncient = function()
	{
		return Entities.IsAncient(this.Oid);
	};
	this.IsBarracks = function()
	{
		return Entities.IsBarracks(this.Oid);
	};
	this.IsBlind = function()
	{
		return Entities.IsBlind(this.Oid);
	};
	this.IsBoss = function()
	{
		return Entities.IsBoss(this.Oid);
	};
	this.IsRoshan = function()
	{
		return Entities.IsRoshan(this.Oid);
	};
	this.IsBuilding = function()
	{
		return Entities.IsBuilding(this.Oid);
	};
	this.IsCourier = function()
	{
		return Entities.IsCourier(this.Oid);
	};
	this.IsCreature = function()
	{
		return Entities.IsCreature(this.Oid);
	};
	this.IsCreep = function()
	{
		return Entities.IsCreep(this.Oid);
	};
	this.IsCreepHero = function()
	{
		return Entities.IsCreepHero(this.Oid);
	};
	this.IsDeniable = function()
	{
		return Entities.IsDeniable(this.Oid);
	};
	this.IsDominated = function()
	{
		return Entities.IsDominated(this.Oid);
	};
	this.IsEnemy = function()
	{
		return Entities.IsEnemy(this.Oid);
	};
	this.IsFort = function()
	{
		return Entities.IsFort(this.Oid);
	};
	this.IsHero = function()
	{
		return Entities.IsHero(this.Oid);
	};
	this.IsIllusion = function()
	{
		return Entities.IsIllusion(this.Oid);
	};
	this.IsLaneCreep = function()
	{
		return Entities.IsLaneCreep(this.Oid);
	};
	this.IsNeutralUnitType = function()
	{
		return Entities.IsNeutralUnitType(this.Oid);
	};
	this.IsOther = function()
	{
		return Entities.IsOther(this.Oid);
	};
	this.IsPhantom = function()
	{
		return Entities.IsPhantom(this.Oid);
	};
	this.IsShop = function()
	{
		return Entities.IsShop(this.Oid);
	};
	this.IsRealHero = function()
	{
		return Entities.IsRealHero(this.Oid);
	};
	this.IsSummoned = function()
	{
		return Entities.IsSummoned(this.Oid);
	};
	this.IsTower = function()
	{
		return Entities.IsTower(this.Oid);
	};
	this.IsWard = function()
	{
		return Entities.IsWard(this.Oid);
	};
	this.IsZombie = function()
	{
		return Entities.IsZombie(this.Oid);
	};

	//this.IsSpeciallyDeniable = function(){ return Entities.IsSpeciallyDeniable(this.Oid); };

	//this.NoHealthBar = function(){ return Entities.NoHealthBar(this.Oid); };
	//this.NoTeamMoveTo = function(){ return Entities.NoTeamMoveTo(this.Oid); };
	//this.NoTeamSelect = function(){ return Entities.NoTeamSelect(this.Oid); };
	this.NotOnMinimap = function()
	{
		return Entities.NotOnMinimap(this.Oid);
	};
	this.NotOnMinimapForEnemies = function()
	{
		return Entities.NotOnMinimapForEnemies(this.Oid);
	};
	//this.PassivesDisabled = function(){ return Entities.PassivesDisabled(this.Oid); };
	//this.UsesHeroAbilityNumbers = function(){ return Entities.UsesHeroAbilityNumbers(this.Oid); };
	//vision
	//this.CurrentVisionRange = function(){ return Entities.GetCurrentVisionRange(this.Oid); };
	//this.NightTimeVisionRange = function(){ return Entities.GetNightTimeVisionRange(this.Oid); };
	//this.DayTimeVisionRange = function(){ return Entities.GetDayTimeVisionRange(this.Oid); };
	//this.ProvidesVision = function(){ return Entities.ProvidesVision(this.Oid); };

	//this.PlayerOwnerID = function(){ return Entities.GetPlayerOwnerID(this.Oid); };

	//physics
	this.CollisionPadding = function()
	{
		return Entities.GetCollisionPadding(this.Oid);
	};
	this.HullRadius = function()
	{
		return Entities.GetHullRadius(this.Oid);
	};
	this.PaddedCollisionRadius = function()
	{
		return Entities.GetPaddedCollisionRadius(this.Oid);
	};
	this.ProjectileCollisionSize = function()
	{
		return Entities.GetProjectileCollisionSize(this.Oid);
	};
	this.RingRadius = function()
	{
		return Entities.GetRingRadius(this.Oid);
	};
	this.NoUnitCollision = function()
	{
		return Entities.NoUnitCollision(this.Oid);
	};
	this.HealthBarOffset = function()
	{
		return Entities.GetHealthBarOffset(this.Oid); 
	};

	this.PercentInvisible = function()
	{
		return Entities.GetPercentInvisible(this.Oid);
	};

	this.ChosenTarget = function()
	{
		return Entities.GetChosenTarget(this.Oid);
	};
	this.SelectionEntities = function()
	{
		return Entities.GetSelectionEntities(this.Oid);
	};
	this.SelectionGroup = function()
	{
		return Entities.GetSelectionGroup(this.Oid);
	};

	this.SoundSet = function()
	{
		return Entities.GetSoundSet(this.Oid);
	};
	this.MoveSpeedModifier = function(Speed)
	{
		return Entities.GetMoveSpeedModifier(this.Oid, Speed);
	};
	this.InState = function(State)
	{
		return Entities.InState(this.Oid, State);
	};
	this.States = function()
	{
		return Entities.GetStates(this.Oid);
	};

	this.RangeToUnit = function(Target)
	{
		if (Target instanceof Entity)
			return Entities.GetRangeToUnit(this.Oid, Target.Oid);
		else
			return Entities.GetRangeToUnit(this.Oid, Target);
	};
	this.IsEntityInRange = function(Target, Range)
	{
		if (Target instanceof Entity)
			return Entities.IsEntityInRange(this.Oid, Target.Oid, Range);
		else
			return Entities.IsEntityInRange(this.Oid, Target, Range);
	};

	//Lists
	this.IsInventoryEnabled = function()
	{
		return Entities.IsInventoryEnabled(this.Oid);
	};
	this.NumItemsInStash = function()
	{
		return Entities.GetNumItemsInStash(this.Oid);
	};
	this.NumItemsInInventory = function()
	{
		return Entities.GetNumItemsInInventory(this.Oid);
	};
	this.NumBuffs = function()
	{
		return Entities.GetNumBuffs(this.Oid);
	};
	this.AbilityCount = function()
	{
		return Entities.GetAbilityCount(this.Oid);
	};

	this.ItemInSlot = function(SlotIndex)
	{
		return Entities.GetItemInSlot(this.Oid, SlotIndex);
	};
	this.AbilityInSlot = function(SlotIndex)
	{
		return Entities.GetAbility(this.Oid, SlotIndex);
	};
	this.BuffInSlot = function(SlotIndex)
	{
		return Entities.GetBuff(this.Oid, SlotIndex);
	};

	//Lists
	this.Buffs = function()
	{
		var result = [];
		for (i = 0; i < this.NumBuffs(); i++)
			result.push(new Buff(This.BuffInSlot(i), this));
		return result;
	};
	this.BuffOids = function()
	{
		if (this.NumBuffs() > 0)
			return Game.GetBuffs(this.Oid);
	};
	this.BuffNames = function()
	{
		if (this.NumBuffs() > 0)
			return Game.GetBuffsNames(this.Oid);
	};
	this.Inventory = function()
	{
		var result = [];
		if (this.IsInventoryEnabled())
			for (i = 0; i < 9; i++)
				if (this.ItemInSlot(i) != -1)
					result.push(new Item(this.ItemInSlot(i), this));
		return result;
	};
	this.InventoryOids = function()
	{
		if (this.IsInventoryEnabled())
			return Game.GetInventory(this.Oid);
	};
	this.InventoryNames = function()
	{
		if (this.IsInventoryEnabled())
			return Game.GetInventoryNames(this.Oid);
	};
	this.Abilities = function()
	{
		var result = [];
		for (i = 0; i < this.AbilityCount(); i++)
			if (Abilities.GetLevel(this.AbilityInSlot(i)) > 0)
				result.push(new Skill(this.AbilityInSlot(i), this));
		return result;
	};
	this.AbilityOids = function()
	{
		return Game.GetAbilities(this.Oid);
	};
	this.AbilityNames = function()
	{
		return Game.GetAbilityNames(this.Oid);
	};
};

Unit.prototype = Object.create(Entity.prototype);
Unit.prototype.constructor = Unit;

function Effect(Oid, Owner, Options)
{
	D2Object.apply(this, [Oid, Options]);
	this.Owner = Owner;
};

Effect.prototype = Object.create(D2Object.prototype);
Effect.prototype.constructor = Effect;

function Buff(Oid, Owner, Options)
{
	D2Object.apply(this, [Oid, Owner, Options]);
	this.Name = Buffs.GetName(Owner.Oid, this.Oid);
	this.Texture = Buffs.GetTexture(Owner.Oid, this.Oid);
	this.Duration = function()
	{
		return Buffs.GetDuration(Owner.Oid, this.Oid);
	};
	this.DieTime = function()
	{
		return Buffs.GetDieTime(Owner.Oid, this.Oid);
	};
	this.RemainingTime = function()
	{
		return Buffs.GetRemainingTime(Owner.Oid, this.Oid);
	};
	this.ElapsedTime = function()
	{
		return Buffs.GetElapsedTime(Owner.Oid, this.Oid);
	};
	this.CreationTime = Buffs.GetCreationTime(Owner.Oid, this.Oid);
	this.StackCount = function()
	{
		return Buffs.GetStackCount(Owner.Oid, this.Oid);
	};
	this.IsDebuff = Buffs.IsDebuff(Owner.Oid, this.Oid);
	this.IsHidden = Buffs.IsHidden(Owner.Oid, this.Oid);

	this.Caster = Buffs.GetCaster(Owner.Oid, this.Oid);
	this.Parent = Buffs.GetParent(Owner.Oid, this.Oid);
	this.Ability = new Skill(Buffs.GetAbility(Owner.Oid, this.Oid), Owner); //Buffs.GetAbility(Owner.Oid, this.Oid);
};

Buff.prototype = Object.create(Effect.prototype);
Buff.prototype.constructor = Buff;

function Skill(Oid, Owner, Options)
{
	D2Object.apply(this, [Oid, Owner, Options]);
	this.Name = Abilities.GetAbilityName(Oid);
	//this.AbilityTextureName = Abilities.GetAbilityTextureName(Oid);
	this.Behavior = Abilities.GetBehavior(Oid);
	this.Behaviors = Game.Behaviors(this.Behavior);
	this.MaxLevel =  Abilities.GetMaxLevel(this.Oid);
	//this.AssociatedPrimaryAbilities = Abilities.GetAssociatedPrimaryAbilities(Oid);
	//this.AssociatedSecondaryAbilities = Abilities.GetAssociatedSecondaryAbilities(Oid);
	//this.AbilityType = Abilities.GetAbilityType(Oid);
	//methods
	this.Toggle = function(Queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if (this.IsToggle())
			return Game.ToggleAbil(this.Owner.Oid, this.Oid, Queue);
	};
	this.UseByOID = function(target,Queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if ((this.Behaviors.indexOf(8)!=-1)||(this.Behaviors.length==0))
		if (target != -1)
			return Game.CastTarget(this.Owner.Oid, this.Oid, target, Queue);
	};
	this.UseSelf = function(Queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		if(this.Behaviors.indexOf(4)!=-1)
			return Game.CastNoTarget(this.Owner.Oid, this.Oid, Queue);
		else
		if((this.Behaviors.indexOf(16)!=-1)||(this.IsDoubleTapCast()))
			return	Abilities.CreateDoubleTapCastOrder(this.Oid, this.Owner.Oid);
	};
	this.UseToPoint = function(target,Queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		Game.CastPosition(this.Owner.Oid, this.Oid, target, Queue);
	};
	this.Use = function(target,queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		
		GameUI.SelectUnit(this.Owner.Oid,false);
		if (!queue)
			Game.EntStop(this.Owner.Oid, false);

		if ((typeof target === 'undefined')||(target == -1))
		{
			if ((this.IsToggle())||(this.Behaviors.indexOf(512) != -1))
				this.Toggle(queue);
			else
				this.UseSelf(queue);
		}
		else
		if (Array.isArray(target))
			return this.UseToPoint(target,queue);
		else
		if ((typeof target === 'object') && (target instanceof Entity))
			if (Behavior.indexOf(16) != -1)
				return this.UseToPoint(target.xyz,queue);
			else
				return this.UseByOID(target.Oid,queue);
		else
		if (typeof target == "number")
			return this.UseByOID(target,queue);
	};	
	//propertys
	this.Level = function()
	{
		return Abilities.GetLevel(this.Oid);
	};
	this.ManaCost = function()
	{
		return Abilities.GetManaCost(this.Oid);
	};	
	this.CastRange = function()
	{
		return Abilities.GetCastRange(this.Oid);
	};
	this.AOERadius = function()
	{
		return Abilities.GetAOERadius(this.Oid);
	};
	this.CastPoint = function()
	{
		return Abilities.GetCastPoint(this.Oid);
	};
	this.IsInAbilityPhase = function()
	{
		return Abilities.IsInAbilityPhase(this.Oid);
	};
	this.AbilityDamage = function()
	{
		return Abilities.GetAbilityDamage(this.Oid);
	};
	this.AbilityDamageType = function()
	{
		return Abilities.GetAbilityDamageType(this.Oid);
	};	
	//Target
	this.AbilityTargetType = function()
	{
		return Abilities.GetAbilityTargetType(this.Oid);
	};
	this.AbilityTargetFlags = function()
	{
		return Abilities.GetAbilityTargetFlags(this.Oid);
	};
	this.AbilityTargetTeam = function()
	{
		return Abilities.GetAbilityTargetTeam(this.Oid);
	};
	this.CanBeExecuted = function()
	{
		return Abilities.CanBeExecuted(this.Oid);
	};
	//Cooldown
	this.AbilityReady = function()
	{
		return Abilities.AbilityReady(this.Oid);
	};
	this.IsCooldownReady = function()
	{
		return Abilities.IsCooldownReady(this.Oid);
	};
	this.CooldownTimeRemaining = function()
	{
		return Abilities.GetCooldownTimeRemaining(this.Oid);
	};
	this.SharedCooldownName = function()
	{
		return Abilities.GetSharedCooldownName(this.Oid);
	};
	this.Cooldown = function()
	{
		return Abilities.GetCooldown(this.Oid);
	};
	this.CooldownLength = function()
	{
		return Abilities.GetCooldownLength(this.Oid);
	};
	this.CooldownTime = function()
	{
		return Abilities.GetCooldownTime(this.Oid);
	};
	this.Duration = function()
	{
		return Abilities.GetDuration(this.Oid);
	};
	this.Caster = function()
	{
		return Abilities.GetCaster(this.Oid);
	};
	//keys
	this.HotkeyOverride = function()
	{
		return Abilities.GetHotkeyOverride(this.Oid);
	};
	this.Keybind = function()
	{
		return Abilities.GetKeybind(this.Oid);
	};

	this.LocalPlayerActiveAbility = function()
	{
		return Abilities.GetLocalPlayerActiveAbility(this.Oid);
	};
	//this.IntrinsicModifierName = Abilities.GetIntrinsicModifierName(this.Oid);
	//this.CanAbilityBeUpgraded = function()	{		return Abilities.CanAbilityBeUpgraded(this.Oid);	};
	
	this.ChannelledManaCostPerSecond = function()
	{
		return Abilities.GetChannelledManaCostPerSecond(this.Oid);
	};
	this.CurrentCharges = function()
	{
		return Abilities.GetCurrentCharges(this.Oid);
	};
	//this.EffectiveLevel = function()	{		return Abilities.GetEffectiveLevel(this.Oid);	};
	//this.HeroLevelRequiredToUpgrade = function()	{		return Abilities.GetHeroLevelRequiredToUpgrade(this.Oid);	};
	//this.AttemptToUpgrade = function()	{		return Abilities.AttemptToUpgrade(this.Oid);	};
	//this.CanLearn = function()	{		return Abilities.CanLearn(this.Oid); };
	//this.MaxLevel = function()	{		return Abilities.GetMaxLevel(this.Oid);	};
	//this.HasScepterUpgradeTooltip = function()	{		return Abilities.HasScepterUpgradeTooltip(this.Oid);	};

	this.AutoCastState = function()
	{
		return Abilities.GetAutoCastState(this.Oid);
	};
	this.ToggleState = function()
	{
		return Abilities.GetToggleState(this.Oid);
	};
	this.IsToggle = function()
	{
		return Abilities.IsToggle(this.Oid);
	};
	this.IsActivated = function()
	{
		return Abilities.IsActivated(this.Oid);
	};
	this.IsActivatedChanging = function()
	{
		return Abilities.IsActivatedChanging(this.Oid);
	};

	this.IsAttributeBonus = function()
	{
		return Abilities.IsAttributeBonus(this.Oid);
	};
	this.IsAutocast = function()
	{
		return Abilities.IsAutocast(this.Oid);
	};
	this.IsDisplayedAbility = function()
	{
		return Abilities.IsDisplayedAbility(this.Oid);
	};
	this.IsHidden = function()
	{
		return Abilities.IsHidden(this.Oid);
	};
	this.IsHiddenWhenStolen = function()
	{
		return Abilities.IsHiddenWhenStolen(this.Oid);
	};
	this.IsMarkedAsDirty = function()
	{
		return Abilities.IsMarkedAsDirty(this.Oid);
	};
	this.IsMuted = function()
	{
		return Abilities.IsMuted(this.Oid);
	};
	//this.IsOnCastbar = function()	{		return Abilities.IsOnCastbar(this.Oid);	};
	//this.IsOnLearnbar = function()	{		return Abilities.IsOnLearnbar(this.Oid);	};
	//this.IsOwnersGoldEnough = function()	{		return Abilities.IsOwnersGoldEnough(this.Oid);	};
	//this.IsOwnersGoldEnoughForUpgrade = function()	{		return Abilities.IsOwnersGoldEnoughForUpgrade(this.Oid);	};
	this.IsOwnersManaEnough = function()
	{
		return Abilities.IsOwnersManaEnough(this.Oid);
	};
	this.IsPassive = function()
	{
		return Abilities.IsPassive(this.Oid);
	};
	this.IsRecipe = function()
	{
		return Abilities.IsRecipe(this.Oid);
	};
	this.IsItem = function()
	{
		return Abilities.IsItem(this.Oid);
	};
	this.IsSharedWithTeammates = function()
	{
		return Abilities.IsSharedWithTeammates(this.Oid);
	};
	this.IsStealable = function()
	{
		return Abilities.IsStealable(this.Oid);
	};
	this.IsStolen = function()
	{
		return Abilities.IsStolen(this.Oid);
	};
	
	//this.BackswingTime = function()	{		return Abilities.GetBackswingTime(this.Oid);	};
	//this.ChannelStartTime = function()	{		return Abilities.GetChannelStartTime(this.Oid);	};
	//this.ChannelTime = function()	{		return Abilities.GetChannelTime(this.Oid);	};
	
	//this.UpgradeBlend = function()	{		return Abilities.GetUpgradeBlend(this.Oid);	};
	
	this.PingAbility = function()
	{
		return Abilities.PingAbility(this.Oid);
	};

};

Skill.prototype = Object.create(Effect.prototype);
Skill.prototype.constructor = Skill;

function Item(Oid, Owner, Options)
{
	Skill.apply(this, [Oid, Owner, Options]);
	//this.Name = Abilities.GetAbilityName(Oid);
	//this.AbilityTextureSF = Items.GetAbilityTextureSF(Oid);
	//this.Behavior = Game.Behaviors(Oid);
	this.Price = this.Cost();
	//this.PurchaseTime = Items.GetPurchaseTime(Oid);
	//this.Purchaser = Items.GetPurchaser(Oid);
	//methods
	this.SlotIndex = function()
	{
		for (var i = 1;i<9;i++) 
		{
			if (Owner.ItemInSlot() == this.Oid)
				return i;
		};
		return -1;
	}
	this.Disassemble = function(queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		Game.DisassembleItem(Owner.Oid, this.Oid, queue)
	};
	this.Drop = function(xyz, queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		Game.DropItem(Owner.Oid, this.Oid, xyz ,queue)
	};
	this.PickUp = function(pickuper,queue)
	{	
		if (typeof queue === 'undefined')
			queue = false;
		if (typeof pickuper === 'undefined')
			pickuper = Owner;
		if (pickuper instanceof Entity)
			Game.PickupItem(pickuper.Oid, this.Oid, queue)
		else
			Game.PickupItem(pickuper, this.Oid, queue)
	};
	this.SellItem = function(queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		return Game.SellItem(Owner.Oid, this.Oid, queue);
	};
	this.ItemLock = function(queue)
	{
		if (typeof queue === 'undefined')
			queue = false;
		return Game.ItemLock(Owner.Oid, this.Oid, queue);
	};
	
	//Items
	this.CanBeSoldByLocalPlayer = function()
	{
		return Items.CanBeSoldByLocalPlayer(this.Oid);
	};
	this.CanDoubleTapCast = function()
	{
		return Items.CanDoubleTapCast(this.Oid);
	};
	this.IsAlertableItem = function()
	{
		return Items.IsAlertableItem(this.Oid);
	};
	this.IsCastOnPickup = function()
	{
		return Items.IsCastOnPickup(this.Oid);
	};
	this.IsDisassemblable = function()
	{
		return Items.IsDisassemblable(this.Oid);
	};
	this.IsDroppable = function()
	{
		return Items.IsDroppable(this.Oid);
	};
	this.IsInnatelyDisassemblable = function()
	{
		return Items.IsInnatelyDisassemblable(this.Oid);
	};
	this.IsKillable = function()
	{
		return Items.IsKillable(this.Oid);
	};
	this.IsMuted = function()
	{
		return Items.IsMuted(this.Oid);
	};
	this.IsPermanent = function()
	{
		return Items.IsPermanent(this.Oid);
	};
	this.IsPurchasable = function()
	{
		return Items.IsPurchasable(this.Oid);
	};
	this.IsRecipe = function()
	{
		return Items.IsRecipe(this.Oid);
	};
	this.IsRecipeGenerated = function()
	{
		return Items.IsRecipeGenerated(this.Oid);
	};
	this.IsSellable = function()
	{
		return Items.IsSellable(this.Oid);
	};
	this.IsStackable = function()
	{
		return Items.IsStackable(this.Oid);
	};
	this.RequiresCharges = function()
	{
		return Items.RequiresCharges(this.Oid);
	};
	this.CanBeExecuted = function()
	{
		return Items.CanBeExecuted(this.Oid);
	};
	this.Cost = function()
	{
		return Items.GetCost(this.Oid);
	};
	this.CurrentCharges = function()
	{
		return Items.GetCurrentCharges(this.Oid);
	};
	//this.SecondaryCharges = function(){ return Items.GetSecondaryCharges(this.Oid); };
	//this.DisplayedCharges = function(){ return Items.GetDisplayedCharges(this.Oid); };
	//this.InitialCharges = function(){ return Items.GetInitialCharges(this.Oid); };
	//this.ItemColor = function(){ return Items.GetItemColor(this.Oid); };
	//this.Shareability = function(){ return Items.GetShareability(this.Oid); };
	//this.AssembledTime = function(){ return Items.GetAssembledTime(this.Oid); };
};

Item.prototype = Object.create(Skill.prototype);
Item.prototype.constructor = Item;

function Hero(ID, Options)
{
	Unit.apply(this, [Players.GetPlayerHeroEntityIndex(ID), 'HeroList', Options]);
	this.ID = ID;
	//this.Name = Entities.GetUnitName(this.Oid);

	$.Msg('DisplayedName = ', this.DisplayedName, ';Name = ', this.Name);
}

Hero.prototype = Object.create(Unit.prototype);
Hero.prototype.constructor = Hero;

Game.ScriptLogMsg('Classes loaded', '#00ff00');