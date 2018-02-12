//Ivanius51 18.07.2016 Отображение шанса псевдорандома
/*-----------------------------------------------
  ______     __   _____                _        _____ _____ __ 
 |  _ \ \   / /  |_   _|              (_)      / ____| ____/_ |
 | |_) \ \_/ /     | |_   ____ _ _ __  _ _   _| (___ | |__  | |
 |  _ < \   /      | \ \ / / _` | '_ \| | | | |\___ \|___ \ | |
 | |_) | | |      _| |\ V / (_| | | | | | |_| |____) |___) || |
 |____/  |_|     |_____\_/ \__,_|_| |_|_|\__,_|_____/|____/ |_|
                                                               
http://GetScript.Net
-----------------------End---------------------*/
function PseudoRandomExecuteFunction()
{
	destroy();
	var uiw = Game.GetMainHUD().actuallayoutwidth;
	var uih = Game.GetMainHUD().actuallayoutheight;
	var interval = 0.005;
	var InvUpdate = false;

	var User = 
	{
		ID: -1,
		Oid: -1,
		Name: '',
		buffs: [],
		buffnames: [],
		inventory: [],
		abilities: [],
		abilitynames: [],
		AutoUpdate: false,
		xyz: function()
		{
			if (this.Oid == -1)
				this.Init();
			return Entities.GetAbsOrigin(this.Oid);
		},
		Buffs: function()
		{
			if (this.Oid == -1)
				this.Init();
			if (!this.AutoUpdate)
				return this.buffs;
			this.buffs = Game.GetBuffs(this.Oid);
			/*for (i = 0; i < Entities.GetNumBuffs(this.Oid); i++)
				this.buffs.push(this.Oid, Entities.GetBuff(this.Oid, i));*/
			return this.buffs;
		},
		BuffNames: function()
		{
			if (this.Oid == -1)
				this.Init();
			if (!this.AutoUpdate)
				return this.buffnames;
			this.buffnames = Game.GetBuffsNames(this.Oid);
			/*for (i = 0; i < Entities.GetNumBuffs(this.Oid); i++)
				this.buffnames.push(Buffs.GetName(this.Oid, Entities.GetBuff(this.Oid, i)));*/
			return this.buffnames;
		},
		Inventory: function()
		{
			if (this.Oid == -1)
				this.Init();
			if (!this.AutoUpdate)
				return this.inventory;
			this.inventory = Game.GetInventory(this.Oid);
			/*for (i = 0; i < 9; i++)
			{
				if (Entities.GetItemInSlot(this.Oid, i) != -1)
					this.inventory.push(Entities.GetItemInSlot(this.Oid, i));
			};*/
			return this.inventory;
		},
		Abilities: function()
		{
			if (this.Oid == -1)
				this.Init();
			if (!this.AutoUpdate)
				return this.abilities;
			this.abilities = Game.GetAbilities(this.Oid);
			/*for (m = 0; m < Entities.GetAbilityCount(this.Oid); m++)
				if (Abilities.GetLevel(Entities.GetAbility(this.Oid, m)) > 0)
					this.abilities.push(Entities.GetAbility(this.Oid, m));*/
			return this.abilities;
		},
		AbilityNames: function()
		{
			if (this.Oid == -1)
				this.Init();
			if (!this.AutoUpdate)
				return this.abilitynames;
			this.abilitynames = Game.GetAbilityNames(this.Oid);
			/*for (m = 0; m < Entities.GetAbilityCount(this.Oid); m++)
				if (Abilities.GetLevel(Entities.GetAbility(this.Oid, m)) > 0)
					this.abilitynames.push(Abilities.GetAbilityName(Entities.GetAbility(this.Oid, m)));*/
			return this.abilitynames;
		},
		GetAbilityByName: function(Name)
		{
			if (this.Oid == -1)
				this.Init();
			return Entities.GetAbilityByName(this.Oid, Name);
		},
		Init: function()
		{
			this.ID = Game.GetLocalPlayerID();
			this.Oid = Players.GetPlayerHeroEntityIndex(this.ID);
			this.Name = Entities.GetUnitName(this.Oid).replace('npc_dota_hero_', '');
			//var oldUpdate = this.AutoUpdate;
			this.AutoUpdate = true;
			this.Abilities();
			this.AbilityNames();
			this.Buffs();
			this.BuffNames();
			this.Inventory();
			this.AutoUpdate = false;
			//$.Msg('User ' + this.Name + ' init ok; Abilities=', this.AbilityNames(), '; BuffNames=', this.BuffNames(), '; Inventory=', this.Inventory());
		}
	};

	var PseudoP = 
	{
		PseudoRandomChanse: 0,
		NoLuckCount: 1,
		OldNoLuckCount: 0,
		SkillTableIndex: -1,
		SkillTable: [],
		CritMul: 0,
		SkillName: '',
		SkillTableName: [],
		FullCD: 0,
		SkillID: 0,
		CreepMulDmg: 1
	};

	var PseudoArray = [];

	var ChanseTable = [
		[5, 0.003802],
		[6, 0.005440],
		[7, 0.007359],
		[8, 0.009552],
		[9, 0.012016],
		[10, 0.014746],
		[11, 0.017736],
		[12, 0.020983],
		[13, 0.024482],
		[14, 0.028230],
		[15, 0.032221],
		[16, 0.036452],
		[17, 0.040920],
		[18, 0.045620],
		[19, 0.050549],
		[20, 0.055704],
		[21, 0.061081],
		[22, 0.066676],
		[23, 0.072488],
		[24, 0.078511],
		[25, 0.084744],
		[26, 0.091183],
		[27, 0.097826],
		[28, 0.104670],
		[29, 0.111712],
		[30, 0.118949],
		[31, 0.126379],
		[32, 0.134001],
		[33, 0.141805],
		[34, 0.149810],
		[35, 0.157983],
		[36, 0.166329],
		[37, 0.174909],
		[38, 0.183625],
		[39, 0.192486],
		[40, 0.201547],
		[41, 0.210920],
		[42, 0.220365],
		[43, 0.229899],
		[44, 0.239540],
		[45, 0.249307],
		[46, 0.259872],
		[47, 0.270453],
		[48, 0.281008],
		[49, 0.291552],
		[50, 0.302103],
		[51, 0.312677],
		[52, 0.323291],
		[53, 0.334120],
		[54, 0.347370],
		[55, 0.360398],
		[56, 0.373217],
		[57, 0.385840],
		[58, 0.398278],
		[59, 0.410545],
		[60, 0.422650],
		[61, 0.434604],
		[62, 0.446419],
		[63, 0.458104],
		[64, 0.469670],
		[65, 0.481125],
		[66, 0.492481],
		[67, 0.507463],
		[68, 0.529412],
		[69, 0.550725],
		[70, 0.571429],
		[71, 0.591549],
		[72, 0.611111],
		[73, 0.630137],
		[74, 0.648649],
		[75, 0.666667],
		[76, 0.684211],
		[77, 0.701299],
		[78, 0.717949],
		[79, 0.734177],
		[80, 0.750276]
	];

	var SkillsTableByDmg = [
		['juggernaut_blade_dance', [20, 25, 30, 35]],
		['skeleton_king_mortal_strike', [9, 11, 13, 15]], //15],//
		['phantom_assassin_coup_de_grace', 15],
		['lycan_shapeshift', 30],
		['brewmaster_drunken_brawler', [10, 15, 20, 25]],
		['chaos_knight_chaos_strike', 10],
		['sniper_headshot', 40],
		['troll_warlord_berserkers_rage', 10]
	];

	var OnSkillsTable = [
		['ogre_magi_multicast', [20, 40, 60]],
		['obsidian_destroyer_essence_aura', 40]
	];

	var SkillsTableOnDmg = [
		['tiny_craggy_exterior', [10, 15, 20, 25]],
		//['phantom_assassin_blur',[20,30,40,50]],
		['legion_commander_moment_of_courage', 25],
		['axe_counter_helix', 20]
	];

	var SkillsTable = [
		['spirit_breaker_greater_bash', 17],
		['slardar_bash', [10, 15, 20, 25]],
		['faceless_void_time_lock', [10, 15, 20, 25]],
		//['phantom_lancer_juxtapose',[40,45,50]],
	];

	//DmgMultimler
	var buffsMulDmg = [
		["modifier_item_quelling_blade", 1.4],
		["modifier_item_bfury", 1.6],
		//["modifier_item_iron_talon", 1.4],
		["modifier_bloodseeker_bloodrage", [1.25, 1.3, 1.35, 1.4]],
	];

	//var UserOid = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID());
	//var User.ID = Game.GetLocalPlayerID();
	var Enemys = Game.PlayersEnemyHeroEnts();

	function PseudoRandomF()
	{
		if (PseudoP.SkillTableIndex == -1)
			return;
		if (Game.GetState() != 7 && Game.GetState() != 6 && Game.GetState() != 8)
		{
			try { Game.Panels.PseudoRandom.DeleteAsync(0) }
			catch (e) {};
			PseudoRandom.checked = false;
			return;
		}

		if ((PseudoP.SkillTable == SkillsTable) || (PseudoP.SkillTable == SkillsTableOnDmg))
		{
			var Cast = Abilities.IsInAbilityPhase(PseudoP.SkillID);
			var CDAbil = Abilities.GetCooldownTimeRemaining(PseudoP.SkillID);

			if ((((Cast) || (CDAbil != 0)) && PseudoP.FullCD <= (CDAbil + 0.06)) || !Entities.IsAlive(User.Oid))
			{
				PseudoP.NoLuckCount = 1;
				//$.Msg(PseudoP.SkillName+' id '+PseudoP.SkillID+' Cast '+Cast+' CDAbil '+CDAbil+' FullCD '+PseudoP.FullCD)
			}
		}

		var xyz = Entities.GetAbsOrigin(User.Oid);
		var hboffs = Entities.GetHealthBarOffset(User.Oid);//Game.HBOffsets[Entities.GetUnitName(User.Oid)];
		var uix = Game.WorldToScreenX(xyz[0], xyz[1], (xyz[2] + hboffs));
		var uiy = Game.WorldToScreenY(xyz[0], xyz[1], (xyz[2] + hboffs));
		var uixp = (uix - 4) / uiw * 100;
		var uiyp = (uiy + 22.5) / uih * 100;
		Game.Panels.PseudoRandom.style.position = uixp + '% ' + uiyp + '% 0';

		if (PseudoP.OldNoLuckCount != PseudoP.NoLuckCount)
		{
			PseudoP.OldNoLuckCount = PseudoP.NoLuckCount;
			PseudoP.PseudoRandomChanse = Math.round((PseudoP.NoLuckCount * PseudoP.CritMul) * 100);
			Game.Panels.PseudoRandom.Children()[0].style.width = PseudoP.PseudoRandomChanse + '%';
			Game.Panels.PseudoRandom.Children()[1].text = PseudoP.SkillName;
			Game.Panels.PseudoRandom.Children()[2].text = PseudoP.PseudoRandomChanse + '%'
		}
	}

	function CheckInTable(table, UserBuff)
	{
		for (k in table)
			if (UserBuff == table[k][0])
			{
				//$.Msg('Finded Ability '+UserBuff);
				PseudoP.SkillName = table[k][0].replace(Entities.GetUnitName(User.Oid).replace('npc_dota_hero_', '') + '_', '');
				PseudoP.SkillTableName = table[k],
				PseudoP.SkillTableIndex = k;
				PseudoP.SkillTable = table;
				return true;
				break;
			}
		return false
	}

	function GetCrinN()
	{
		User.Init();

		//var UserBuffs = User.BuffNames();//Game.GetBuffsNames(User.Oid);
		PseudoP.CritMul = 0;
		PseudoP.CreepMulDmg = 1;
		for (i in User.BuffNames())
			for (mulbuff in buffsMulDmg)
				if (User.BuffNames()[i] == buffsMulDmg[mulbuff][0])
				{
					//$.Msg('Finded buff '+User.BuffNames()[i]);
					if (Array.isArray(buffsMulDmg[mulbuff][1]))
						PseudoP.CreepMulDmg *= buffsMulDmg[mulbuff][1][Abilities.GetLevel(Entities.GetAbilityByName(User.Oid, User.BuffNames()[i])) - 1];
					else
						PseudoP.CreepMulDmg *= buffsMulDmg[mulbuff][1];
				};

		if (PseudoP.SkillTableIndex == -1)
		{
			for (i in User.AbilityNames())
			{
				var name = User.AbilityNames()[i]; //Abilities.GetAbilityName(Entities.GetAbility( User.Oid,i));
				(CheckInTable(SkillsTable, name));
				(CheckInTable(SkillsTableByDmg, name));
				(CheckInTable(SkillsTableOnDmg, name));
				(CheckInTable(OnSkillsTable, name));
			}
		};
		if (PseudoP.SkillTableIndex != -1)
		{
			PseudoP.SkillID = Entities.GetAbilityByName(User.Oid, PseudoP.SkillTableName[0]);
			PseudoP.FullCD = Abilities.GetCooldownLength(PseudoP.SkillID);

			PseudoP.CritMul = -1;
			var CritChanse = -1;

			if (Array.isArray(PseudoP.SkillTableName[1]))
				CritChanse = PseudoP.SkillTableName[1][Abilities.GetLevel(User.GetAbilityByName(PseudoP.SkillTableName[0])) - 1];
			else
				CritChanse = PseudoP.SkillTableName[1];

			if (CritChanse != -1)
				for (i in ChanseTable)
					if (CritChanse == ChanseTable[i][0])
					{
						//$.Msg('CritChanse='+CritChanse+' CritMul='+ChanseTable[i][1]);
						PseudoP.CritMul = ChanseTable[i][1] + 0.02;
						break;
					};
		};

		//$.Msg(PseudoP);
	}

	//Subscribes (events)
	//SomeOne Hit SomeOne
	function entity_hurt(data)
	{
		if ((data.entindex_attacker == User.Oid) && (Entities.IsEnemy(data.entindex_killed)) && (!Entities.IsTower(data.entindex_killed)))
		{
			var ArmorReduct = Entities.GetArmorReductionForDamageType(data.entindex_killed, DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL);
			/*
			var Armor = (Entities.GetPhysicalArmorValue(data.entindex_killed));

			if (Armor>=0)
				var DamageMul = (1 - (0.05 * (Armor))/(1 + 0.05 * (Armor)));
			else
				var DamageMul = (1 - (0.05 * (Armor))/(1 + 0.05 * (Armor)));
		
		
		
			//$.Msg('ArmorReduct='+ArmorReduct+' Armor='+Armor+' DamageMul d2='+DamageMul+' DamageMul my='+(1 - (0.05 * (Armor))/(1 + 0.05 * (Armor))));
			*/

			var DamageMul = 1 - ArmorReduct;

			if (DamageMul > 2)
				DamageMul = 2;

			var dmgmax = (Entities.GetDamageMax(User.Oid) + Entities.GetDamageBonus(User.Oid) + 4);
			var dmgmin = (Entities.GetDamageMin(User.Oid) + Entities.GetDamageBonus(User.Oid) - 4);

			dmgmax *= DamageMul;
			dmgmin *= DamageMul;

			if (Entities.IsCreep(data.entindex_killed))
			{
				dmgmax *= PseudoP.CreepMulDmg;
				dmgmin *= PseudoP.CreepMulDmg;
			}

			//$.Msg('Max='+(Entities.GetDamageMax(User) + Entities.GetDamageBonus(User))+' Max*Mul='+dmgmax+' Max*Mul*Crp='+(dmgmax*PseudoP.CreepMulDmg)+' Damage='+data.damage);

			$.Msg('dmgmin=' + dmgmin + ' dmgmax=' + dmgmax + ' Damage=' + data.damage);

			if (PseudoP.SkillTable == SkillsTableByDmg)
			{
				if ((dmgmax > data.damage)) //&&(dmgmin<data.damage)
					PseudoP.NoLuckCount += 1;
				else
					PseudoP.NoLuckCount = 1;
			}
			if (PseudoP.SkillTable == SkillsTableOnDmg)
			{
				if ((dmgmax < data.damage) || (dmgmin > data.damage))
					PseudoP.NoLuckCount = 1;
				//Abilities.GetAbilityDamage(PseudoP.SkillID)
				//$.Msg('dmgmin '+dmgmin+' dmgmax '+dmgmax,data)
			}
		}

		if ((data.entindex_killed == User.Oid) && (PseudoP.SkillTable == SkillsTableOnDmg))
		{
			//$.Msg(data)
			PseudoP.NoLuckCount += 1;
		}
	}

	function modifier_event(data)
	{
		//$.Msg(data)
		if ((data.PlayerID == User.ID) && (PseudoP.SkillTable == OnSkillsTable))
		{
			PseudoP.NoLuckCount += 1;
			//$.Msg(data);
		}
	}

	function MapLoaded(data)
	{
		Destroy();
		PseudoRandom.checked = false;
	}

	function dota_inventory_item_changed(data)
	{
		//InvUpdate = ;
		if (data.entityIndex == User.Oid)
		{
			//var UserBuffs = User.BuffNames();//Game.GetBuffsNames(User.Oid);
			for (i in User.BuffNames())
				for (mulbuff in buffsMulDmg)
					if (User.BuffNames()[i] == buffsMulDmg[mulbuff][0])
						if (Array.isArray(buffsMulDmg[mulbuff][1]))
							PseudoP.CreepMulDmg *= buffsMulDmg[mulbuff][1][Abilities.GetLevel(Entities.GetAbilityByName(User.Oid, User.BuffNames()[i])) - 1];
						else
							PseudoP.CreepMulDmg *= buffsMulDmg[mulbuff][1];
			//InvUpdate = false;
			GetCrinN();
		}
	}

	function dota_inventory_item_added(data)
	{

	}

	function dota_player_learned_ability(data)
	{
		if (!PseudoRandom.checked)
			return;
		if (data.PlayerID == User.ID)
		{
			CheckInTable(SkillsTable, data.abilityname);
			CheckInTable(SkillsTableByDmg, data.abilityname);
			CheckInTable(SkillsTableOnDmg, data.abilityname);
			CheckInTable(OnSkillsTable, data.abilityname);
			GetCrinN();
		}
	}

	function InitPceudo(data)
	{
		data.PseudoRandomChanse = 0;
		data.NoLuckCount = 1;
		data.OldNoLuckCount = 0;
		data.SkillTableIndex = -1;
		data.SkillTable = [];
		data.SkillTableName = [];
		data.CritMul = 0;
		data.SkillName = '';
		data.FullCD = 0;
		data.SkillID = 0;
		data.CreepMulDmg = 1;
	}

	function destroy()
	{
		try { Game.Panels.PseudoRandom.DeleteAsync(0) }
		catch (e) {}
		for (i in Game.Subscribes.PseudoRandom)
			try { GameEvents.Unsubscribe(Game.Subscribes.PseudoRandom[i]) }
		catch (e) {}
	}

	function create()
	{
		//User.Oid = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID());
		//User.ID = Game.GetLocalPlayerID();
		User.Init();

		Game.Subscribes.PseudoRandom = [];
		Game.Subscribes.PseudoRandom.push(GameEvents.Subscribe('game_newmap', MapLoaded));
		Game.Subscribes.PseudoRandom.push(GameEvents.Subscribe('entity_hurt', entity_hurt));
		Game.Subscribes.PseudoRandom.push(GameEvents.Subscribe('dota_player_learned_ability', dota_player_learned_ability));
		Game.Subscribes.PseudoRandom.push(GameEvents.Subscribe('modifier_event', modifier_event))
		Game.Subscribes.PseudoRandom.push(GameEvents.Subscribe('dota_inventory_item_changed', dota_inventory_item_changed));
		Game.Subscribes.PseudoRandom.push(GameEvents.Subscribe('dota_inventory_item_added', dota_inventory_item_added));
		Game.Subscribes.PseudoRandom.push(GameEvents.Subscribe("game_end", function(a) { PseudoRandom.checked = false; }));
		Game.Subscribes.PseudoRandom.push(GameEvents.Subscribe("dota_unit_event", function(a) { $.Msg('dota_unit_event ',data); }));

		//Game.Panels.PseudoRandom = []
		Game.Panels.PseudoRandom = $.CreatePanel('Panel', Game.GetMainHUD(), 'EzProcast1Items');
		Game.Panels.PseudoRandom.BLoadLayoutFromString('<root><Panel style="width:110px;height:15px;margin:-47px -52px;background-color:#000000EE;border: 1px solid #000;"><Panel style="height:100%;background-color:#888800ff;"></Panel><Label style="color:#ffffff55;font-size:11px;font-weight: bold;width:100%;text-align: left;vertical-align:center;margin: 0 10px;"/><Label style="color:#ffffff55;font-size:11px;font-weight: bold;width:100%;text-align: right;vertical-align:center;margin: 0 10px;"/></Panel></root>', false, false);

		InitPceudo(PseudoP);

		GetCrinN();
	}

	var PseudoRandomOnCheckBoxClick = function()
	{
		if (!PseudoRandom.checked)
		{
			destroy()
			Game.ScriptLogMsg('Script disabled: PseudoRandom By IvaniuS51', '#ff0000')
			return
		}
		create();

		function mainfunc()
		{
			$.Schedule(
				interval,
				function()
				{
					PseudoRandomF()

					if (PseudoRandom.checked)
						mainfunc()
				})
		}
		mainfunc()
		Game.ScriptLogMsg('Script enabled: PseudoRandom By IvaniuS51', '#00ff00')
	}

	var PseudoRandom = //Game.AddScript('ASD1', 'PseudoRandom', PseudoRandomOnCheckBoxClick, 'ASD2', '', ![], ![]);
		Game.AddScript('','PseudoRandom',PseudoRandomOnCheckBoxClick,'Ivanius51','\
		<Label text="Pseudo Random:" style="horizontal-align:center;font-size:30px;text-shadow: 0px 0px 8px 5.0 #555;color:white;margin:10px;font-family:Radiance;"/>\
		<Label text="Show chanse of pseudo random triggers" style="font-size:22px;margin:0 15px;height:130px;"/>\
	', false, false );
}
PseudoRandomExecuteFunction();