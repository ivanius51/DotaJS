function EnemyItemPanelExecuteFunction()
{

	function DestroyMainItemsPanel()
	{
		try
		{
			Game.Panels.ItemsPanel.DeleteAsync(0);
		}
		catch (e)
		{};
		Game.ItemsPanelItems = [];
	};

	function DestroyHeroItemsPanel()
	{

		try
		{
			for (i in Game.Panels.ItemPanel)
				Game.Panels.ItemPanel[i].DeleteAsync(0);
		}
		catch (e)
		{};
		Game.Panels.ItemPanel = [];
	};

	function DestroyItemsPanels()
	{
		DestroyMainItemsPanel();
		DestroyHeroItemsPanel();
	};

	function DestroyHeroSkillsPanel()
	{
		try
		{
			for (i in Game.Panels.SkillPanel)
				Game.Panels.SkillPanel[i].DeleteAsync(0);
		}
		catch (e)
		{};
		Game.Panels.SkillPanel = [];
	};

	function DestroySkillPanels()
	{
		DestroyHeroSkillsPanel();
	};

	DestroyItemsPanels();
	DestroySkillPanels();

	Game.ItemsPanelConfig = Game.GetCFG('EnemyItemPanel');

	var PlayersAbilities = [];
	var ItemAbilitySize = 31;
	var item_width = Game.ItemsPanelConfig.Size;
	var hero_width = item_width * 1.25;
	var item_height = item_width * 0.75;
	var panel_width = hero_width + item_width * 9;
	var panel_opacity = Game.ItemsPanelConfig.Opacity / 100;
	var MainPanelRefreshSpeed = Game.ItemsPanelConfig.MainPanelRefreshSpeed / 10;
	var CurrentPlayers = {};
	var uiw = Game.GetMainHUD().actuallayoutwidth;
	var uih = Game.GetMainHUD().actuallayoutheight;
	var ImportantItems = {
		'item_blink': 1,
		'item_gem': 30,
		'item_dust': 40,
		'item_ward_sentry': 43,
		'item_rapier': 132,
		'item_ward_observer': 42
	};

	function UpdatePanelSize(pnlwidth, newpanelsize)
	{
		item_width = pnlwidth;
		hero_width = item_width * 1.25;
		item_height = item_width * 0.75;
		panel_width = hero_width + item_width * 9;
		ItemsPanel.checked = false;
		DestroyMainItemsPanel();
		ItemsPanel.checked = true;
		ItemsPanelLoad();
	}

	function CreatePlayerItemPanel(PlayerID)
	{
		var NewPlayerItemPanel = $.CreatePanel('Panel', Game.GetMainHUD(), 'EnemyItemsPanel_'+PlayerID);
		NewPlayerItemPanel.BLoadLayoutFromString(
			"<root><Panel style=\'opacity:0.95;border: 1px solid #000;background-color: rgba(0, 0, 0, 1); background-color: gradient( radial, 50% 50%, 0% 0%, 65% 35%, from( #aa1b1b ), to( #ff000011 ) ); flow-children: down;\'>			\
					<Panel style=\'flow-children: right;background-color: rgba(0, 0, 0, 1);\'>			\
						<DOTAItemImage itemname=\'\' style=\'width:30px;\'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></DOTAItemImage>			\
						<DOTAItemImage itemname=\'\' style=\'width:30px;\'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></DOTAItemImage>			\
						<DOTAItemImage itemname=\'\' style=\'width:30px;\'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></DOTAItemImage>			\
					</Panel>			\
					<Panel style=\'flow-children: right;background-color: rgba(0, 0, 0, 1);\'>			\
						<DOTAItemImage itemname=\'\' style=\'width:30px;\'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></DOTAItemImage>			\
						<DOTAItemImage itemname=\'\' style=\'width:30px;\'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></DOTAItemImage>			\
						<DOTAItemImage itemname=\'\' style=\'width:30px;\'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></DOTAItemImage>			\
					</Panel>			\
					<Panel style=\'flow-children: right;background-color: rgba(0, 0, 0, 1);opacity:0.90;\'>			\
						<DOTAItemImage itemname=\'\' style=\'saturation: 0.1;width:30px;\'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></DOTAItemImage>			\
						<DOTAItemImage itemname=\'\' style=\'saturation: 0.1;width:30px;\'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></DOTAItemImage>			\
						<DOTAItemImage itemname=\'\' style=\'saturation: 0.1;width:30px;\'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></DOTAItemImage>			\
						<Panel style='saturation: 0.1;background-color: rgba(50, 50, 50, 1);'/>\
					</Panel>			\
			</Panel></root>", false, false);
		return NewPlayerItemPanel;
	};

	function PlayersPanel()
	{
		if (!Game.ItemsPanelConfig.PlayerPanel || !ItemsPanel.checked)
			return;
		var AllPlayerIDs = Game.GetAllPlayerIDs();
		for (var curPlayerId in AllPlayerIDs)
		{
			var CurPlayerEntId = Players.GetPlayerHeroEntityIndex(AllPlayerIDs[curPlayerId]);
			if (!Entities.IsValidEntity(CurPlayerEntId))
				continue;
			if (!Entities.IsEnemy(CurPlayerEntId))
				continue;
			
			var curPlayerxyz = Entities.GetAbsOrigin(CurPlayerEntId);
			
			var curpluix = Game.WorldToScreenX(curPlayerxyz[0], curPlayerxyz[1], curPlayerxyz[2]);
			var curpluiy = Game.WorldToScreenY(curPlayerxyz[0], curPlayerxyz[1], curPlayerxyz[2]);

			if (Entities.GetAllHeroEntities().indexOf(CurPlayerEntId) == -1 || !Entities.IsAlive(CurPlayerEntId) || ((curpluix<120)||(curpluix>(uiw-50))||(curpluiy<120)||(curpluiy>(uih-50))))
			{
				if (Game.Panels.ItemPanel[curPlayerId])
					Game.Panels.ItemPanel[curPlayerId].visible = false;
				if (Game.Panels.SkillPanel[curPlayerId])
					Game.Panels.SkillPanel[curPlayerId].visible = false;
				continue;
			}
			else 
			{
				if (Game.Panels.ItemPanel[curPlayerId])
					Game.Panels.ItemPanel[curPlayerId].visible = true;
				if (Game.Panels.SkillPanel[curPlayerId])
					Game.Panels.SkillPanel[curPlayerId].visible = true;
			};

						

			var hboffs = Entities.GetHealthBarOffset(CurPlayerEntId);
			
			var UserEntID = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID());
			
			curpluix = Game.WorldToScreenX(curPlayerxyz[0], curPlayerxyz[1], curPlayerxyz[2] + 220);
			if (Entities.GetUnitName(CurPlayerEntId) == 'npc_dota_hero_skywrath_mage')
				curpluix = Game.WorldToScreenX(curPlayerxyz[0], curPlayerxyz[1], curPlayerxyz[2] + 300);
			curpluiy = Game.WorldToScreenY(curPlayerxyz[0], curPlayerxyz[1], curPlayerxyz[2] + hboffs);
			
			AbilityPanelForPlayer(AllPlayerIDs[curPlayerId],CurPlayerEntId);

			var curpluixp = (curpluix / uiw * 101) - 2;
			var curpluiyp = (curpluiy / uih * 100) - 8.75;
			if (!Game.Panels.ItemPanel[curPlayerId])
			{
				Game.Panels.ItemPanel[curPlayerId] = CreatePlayerItemPanel(AllPlayerIDs[curPlayerId]);
			};
			Game.Panels.ItemPanel[curPlayerId].style.position = curpluixp + '% ' + curpluiyp + '% 0';

			var CurPlItemPanel = Game.Panels.ItemPanel[curPlayerId];
			for (IItem = 0; IItem < 9; IItem++)
			{
				var CurPanel = CurPlItemPanel.Children()[Math.floor(IItem / 3)].Children();
				var CurItem = Entities.GetItemInSlot(CurPlayerEntId, IItem);
				var CurItemName = Abilities.GetAbilityName(CurItem);
				if ((CurItem != -1) && (!Game.ItemsPanelConfig.OnlyImp || Game.IntersecArrays([CurItemName], Game.ItemsPanelConfig.Items)))
				{
					CurPanel[IItem % 3].itemname = CurItemName;
					if (!Abilities.IsCooldownReady(CurItem))
					CurPanel[IItem % 3].GetChild(0).text = Math.round(Abilities.GetCooldownTimeRemaining(CurItem))
					else
					CurPanel[IItem % 3].GetChild(0).text = '';
					if (Items.IsStackable(CurItem))
					CurPanel[IItem % 3].GetChild(1).text = Items.GetCurrentCharges(CurItem)
					else
					CurPanel[IItem % 3].GetChild(1).text = '';
				}
				else
				{
					CurPanel[IItem % 3].itemname = '';
					CurPanel[IItem % 3].GetChild(0).text = '';
					CurPanel[IItem % 3].GetChild(1).text = '';
				};
			};
		};
		if (Game.ItemsPanelConfig.PlayerPanel)
			$.Schedule(0.005, PlayersPanel);
	};

	function AbilityPanelForPlayer(PlayerID,PlayerOID)
	{
		if (typeof PlayerOID === 'undefined')
			var PlayerOID = Players.GetPlayerHeroEntityIndex(PlayerID);
		if (!Entities.IsValidEntity(PlayerOID))
			return;
		var xyz = Entities.GetAbsOrigin(PlayerOID);
		var hboffs = Entities.GetHealthBarOffset(PlayerOID);
		var uix = Game.WorldToScreenX(xyz[0], xyz[1], (xyz[2] + hboffs));
		var uiy = Game.WorldToScreenY(xyz[0], xyz[1], (xyz[2] + hboffs));

		var i = 0;
		var RightAbilityCount = 0;
		var CurAbilities = [];
		for (i = 0; i < Entities.GetAbilityCount(PlayerOID); i++)
		{
			var CurAbility = Entities.GetAbility(PlayerOID, i);
			var AbilityName = Abilities.GetAbilityName(CurAbility);
			if ((CurAbility != -1) && Abilities.IsDisplayedAbility(CurAbility) && (!isEmptyString(AbilityName)))
			{
				CurAbilities.push(CurAbility);
				RightAbilityCount++;
			};
		};

		if (!Game.Panels.SkillPanel[PlayerID])
		{
			Game.Panels.SkillPanel[PlayerID] = $.CreatePanel('Panel', Game.GetMainHUD(), 'EnemySkills');
			Game.Panels.SkillPanel[PlayerID].BLoadLayoutFromString(
				'<root>\
					<Panel style="width:' + (ItemAbilitySize * RightAbilityCount) + 'px;height:'+ItemAbilitySize+'px;margin:-45px -' + (ItemAbilitySize * RightAbilityCount / 2) + 'px;background-color:#000000EE;border: 1px solid #000;flow-children: right;">\
					</Panel>\
				</root>', false, false);
		};

		uixp = (uix + 8) / uiw * 100;
		uiyp = (uiy + 38) / uih * 100;
		Game.Panels.SkillPanel[PlayerID].style.position = uixp + '% ' + uiyp + '% 0';

		//check to all hero skills still exist
		if (PlayersAbilities[PlayerID] && !Game.CompareArrays(PlayersAbilities[PlayerID],CurAbilities))
			for (i in PlayersAbilities[PlayerID])
				if (CurAbilities.indexOf(PlayersAbilities[PlayerID][i]) != -1)
					Game.Panels.SkillPanel[PlayerID].FindChild("EnemySkill_" + PlayerID + "_" + PlayersAbilities[PlayerID][i]).DeleteAsync(0);
		
		for (i in CurAbilities)
		{
			var CurAbility = CurAbilities[i];
			var AbilityName = Abilities.GetAbilityName(CurAbility);
			var CurSkillPanel = Game.Panels.SkillPanel[PlayerID].FindChild("EnemySkill_" + PlayerID + "_" + CurAbility)
			//$.Msg(i,' ',CurAbility,' ',AbilityName,' ',CurSkillPanel);
			if (!CurSkillPanel)
				var CurSkillPanel = CreatePlayerSkillPanel(PlayerID, CurAbility);
			else
			{
				UpdatePlayerSkillPanel(PlayerID, CurAbility);
			};
				
		};
		PlayersAbilities[PlayerID] = CurAbilities;
	};

	function NewItem(itemlistpanel, InvItems, HeroEntId)
	{
		for (var invItem in InvItems)
		{
			var curItemId = InvItems[invItem];
			var AbilItemName = Abilities.GetAbilityName(curItemId);
			if (itemlistpanel.indexOf(curItemId) != -1 || Game.ItemsPanelConfig.Items.indexOf(Abilities.GetAbilityName(curItemId)) == -1)
				continue;
			for (var importantitemname in ImportantItems)
			{
				if (importantitemname != AbilItemName)
					continue;
				if (Game.ItemsPanelConfig.Notify)
					GameEvents.SendEventClientSide('dota_item_purchase',
					{
						'userid': CurrentPlayers[HeroEntId],
						'itemid': ImportantItems[AbilItemName]
					});
				if (Game.ItemsPanelConfig.EmitSound)
					Game.EmitSound('General.Buy');
			};
		};
	};

	function CreatePlayerSkillPanel(PlayerID, AbilityIndex)
	{
		if ((typeof(PlayerID) === 'undefined') || (typeof(AbilityIndex) === 'undefined'))
		{
			$.Msg('Error CreatePlayerSkillPanel undefined PlayerID=', PlayerID, ' AbilityIndex=', AbilityIndex);
			return;
		};

		var AbilityName = Abilities.GetAbilityName(AbilityIndex);
		if ((AbilityIndex == -1) || (isEmptyString(AbilityName)))
		{
			$.Msg("Error CreatePlayerSkillPanel Can't get ability PlayerID=", PlayerID, ' AbilityIndex=', AbilityIndex);
			return;
		};

		var NewPlayerSkillPanel = $.CreatePanel('Panel', Game.Panels.SkillPanel[PlayerID], 'EnemySkill_' + PlayerID + "_" + AbilityIndex);
		NewPlayerSkillPanel.BLoadLayoutFromString(
			"<root><Panel>\
				<DOTAAbilityImage id='Ability' abilityname='' abilitylevel='' abilityid='' style='width: "+ItemAbilitySize+"px;height:"+ItemAbilitySize+"px;margin: 0px;border: 2px solid grey;'>\
					<Panel id='Cooldown' style='width: 100%;height: 100%;background-color:#000000; opacity: 0.7;'>\
						<Panel class='CooldownOverlay' style='height: 100%;width: 100%;' />\
						<Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/>\
					</Panel>\
					<Panel id='Level' style='height: 4px; width: 100%;vertical-align: bottom;flow-children: right;margin: 1px;'>\
					</Panel>\
				</DOTAAbilityImage>\
			</Panel></root>", false, false);

		//UpdatePlayerSkillPanel(PlayerID, AbilityIndex);
		return NewPlayerSkillPanel;
	};

	function UpdatePlayerSkillPanel(PlayerID, AbilityIndex)
	{
		var PlayerSkillPanel = Game.Panels.SkillPanel[PlayerID].FindChild("EnemySkill_" + PlayerID + "_" + AbilityIndex);
		if (!PlayerSkillPanel)
		{
			return;
		};
		var PlayerSkillImage = PlayerSkillPanel.Children()[0];
		var PlayerSkillLevels = PlayerSkillImage.Children()[1];

		var AbilityName = Abilities.GetAbilityName(AbilityIndex);

		if ((AbilityIndex != -1) && (!isEmptyString(AbilityName)))
		{
			var MaxLevel = Abilities.GetMaxLevel(AbilityIndex);
			var AbilLevel = Abilities.GetLevel(AbilityIndex);
			var LevelsWidth = Math.floor((ItemAbilitySize - 4 - (MaxLevel)) / MaxLevel);

			if (AbilLevel == 0)
			{
				PlayerSkillPanel.style.opacity = '0.4';
				//PlayerSkillPanel.style.brightness = '0.4';
				//PlayerSkillPanel.style.saturation = '0.4';
				PlayerSkillImage.Children()[0].visible = true;
				PlayerSkillImage.Children()[0].style.backgroundColor = 'black';
			}
			else
			{
				PlayerSkillPanel.style.opacity = '1';
				//PlayerSkillPanel.style.brightness = '2';
				//PlayerSkillPanel.style.saturation = '1';
			};

			PlayerSkillImage.abilityname = AbilityName;
			PlayerSkillImage.abilitylevel = AbilLevel;
			//PlayerSkillImage.abilityid = AbilityIndex;

			var ilevel = 1;
			for (ilevel = 1; ilevel <= MaxLevel; ilevel++)
			{
				if (!PlayerSkillLevels.Children()[ilevel - 1])
				{
					$.CreatePanel("Panel", PlayerSkillLevels, 'SkillPoint_' + ilevel).BLoadLayoutFromString(
						'<root>\
							<Panel style="width:' + LevelsWidth + 'px;height:3px;background-color:#FAFAFA' + ';margin-left: 1px;opacity: 1;"/>\
						</root>', false, false);
				};
				if (ilevel <= AbilLevel)
				{
					PlayerSkillLevels.Children()[ilevel - 1].style.backgroundColor = '#B7CA7B';
				}
				else
				{
					PlayerSkillLevels.Children()[ilevel - 1].style.backgroundColor = '#222222';
				};
			};

			if (AbilLevel > 0)
			{
				if (Abilities.IsCooldownReady(AbilityIndex))
				{ 
					PlayerSkillImage.Children()[0].Children()[1].text = '';
					if (Abilities.IsOwnersManaEnough(AbilityIndex))
					{
						PlayerSkillImage.Children()[0].visible = false;
						PlayerSkillImage.Children()[0].style.backgroundColor = 'black';
						if (Abilities.IsToggle(AbilityIndex) && Abilities.GetToggleState(AbilityIndex))
							PlayerSkillImage.style.border = '2px solid green';
						else
							PlayerSkillImage.style.border = '2px solid grey';
					}
					else
					{
						PlayerSkillImage.Children()[0].visible = true;
						PlayerSkillImage.Children()[0].style.backgroundColor = 'DarkBlue';
						PlayerSkillImage.style.border = '2px solid blue';
					}
				}
				else
				{
					PlayerSkillImage.Children()[0].visible = true;
					//if (!PlayerSkillImage.Children()[0].style.animation)
						//PlayerSkillImage.Children()[0].style.animation = Math.round(Abilities.GetCooldownTimeRemaining(AbilityIndex))+'s cooldown';
					if (Abilities.IsOwnersManaEnough(AbilityIndex))
					{
						PlayerSkillImage.Children()[0].style.backgroundColor = 'black';
						PlayerSkillImage.style.border = '2px solid red';
					}					
					else
					{
						PlayerSkillImage.Children()[0].style.backgroundColor = 'DarkBlue';
						PlayerSkillImage.style.border = '2px solid blue';
					};	

					PlayerSkillImage.Children()[0].Children()[1].text = Math.round(Abilities.GetCooldownTimeRemaining(AbilityIndex));
				};
			};
		};
	};

	function ItemsPanelEvery()
	{
		if (!ItemsPanel.checked)
		{
			DestroyMainItemsPanel();
			return;
		};
		if (Game.IsGamePaused())
			return;
		var AllPlayerIDs = Game.GetAllPlayerIDs();
		for (var curPlId in AllPlayerIDs)
		{
			var CurPlEntID = Players.GetPlayerHeroEntityIndex(AllPlayerIDs[curPlId]);
			if (Entities.IsEnemy(CurPlEntID))
				CurrentPlayers[CurPlEntID] = AllPlayerIDs[curPlId];
		};
		var EnemyHeroEntList = Game.PlayersEnemyHeroEnts();
		for (m in EnemyHeroEntList)
		{
			var EnemyHeroEntId = EnemyHeroEntList[m];
			var curitemIconOnMainPanel = Game.Panels.ItemsPanel.Children()[m];
			if (curitemIconOnMainPanel.Children()[0].heroname != Entities.GetUnitName(EnemyHeroEntId))
				curitemIconOnMainPanel.Children()[0].heroname = Entities.GetUnitName(EnemyHeroEntId);
			var EnemyHeroInv = Game.GetInventory(EnemyHeroEntId);

			for (var itemsiter = 1; itemsiter <= 9; itemsiter++)
			{
				var CurItemEnt = Entities.GetItemInSlot(EnemyHeroEntId, itemsiter - 1);
				curitemIconOnMainPanel.Children()[itemsiter].itemname = Abilities.GetAbilityName(CurItemEnt);
				if ((CurItemEnt != -1) && !Abilities.IsCooldownReady(CurItemEnt))
					curitemIconOnMainPanel.Children()[itemsiter].GetChild(0).text = Math.round(Abilities.GetCooldownTimeRemaining(CurItemEnt))
				else
					curitemIconOnMainPanel.Children()[itemsiter].GetChild(0).text = '';
				if ((CurItemEnt != -1) && Items.IsStackable(CurItemEnt))
					curitemIconOnMainPanel.Children()[itemsiter].GetChild(1).text = Items.GetCurrentCharges(CurItemEnt)
				else
					curitemIconOnMainPanel.Children()[itemsiter].GetChild(1).text = '';
			};

			if (Array.isArray(Game.ItemsPanelItems[EnemyHeroEntId]))
			{
				if (Game.CompareArrays(Game.ItemsPanelItems[EnemyHeroEntId], EnemyHeroInv))
					continue;
			}
			else
			{
				Game.ItemsPanelItems[EnemyHeroEntId] = [];
			};
			NewItem(Game.ItemsPanelItems[EnemyHeroEntId], EnemyHeroInv, EnemyHeroEntId);
			Game.ItemsPanelItems[EnemyHeroEntId] = EnemyHeroInv;

		};
	};
	var ItemsPanelLoad = function()
	{
		Game.Panels.ItemsPanel = $.CreatePanel('Panel', Game.GetMainHUD(), 'ItemsPanel1');
		Game.Panels.ItemsPanel.BLoadLayoutFromString(
			'		<root>			<Panel class="ItemsPanel1" style="opacity:' + panel_opacity + ';width:' + panel_width + 'px;flow-children: down;background-color:black;">				\
        	<Panel style="width:100%;height:' + item_height + 'px;flow-children:right;">					<DOTAHeroImage heroname="" style="width:' + hero_width + 'px;height:' + item_height + 'px;"/>					\
            <DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					\
            <DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>				\
						<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>				\
					</Panel>				\
        	<Panel style="width:100%;height:' + item_height + 'px;flow-children:right;">					<DOTAHeroImage heroname="" style="width:' + hero_width + 'px;height:' + item_height + 'px;"/>					\
            <DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					\
            <DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>				\
						<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>				\
					</Panel>				\
        	<Panel style="width:100%;height:' + item_height + 'px;flow-children:right;">					<DOTAHeroImage heroname="" style="width:' + hero_width + 'px;height:' + item_height + 'px;"/>					\
            <DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					\
            <DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>				\
						<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>				\
					</Panel>				\
        	<Panel style="width:100%;height:' + item_height + 'px;flow-children:right;">					<DOTAHeroImage heroname="" style="width:' + hero_width + 'px;height:' + item_height + 'px;"/>					\
            <DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					\
            <DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>				\
						<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>				\
					</Panel>				\
        	<Panel style="width:100%;height:' + item_height + 'px;flow-children:right;">					<DOTAHeroImage heroname="" style="width:' + hero_width + 'px;height:' + item_height + 'px;"/>					\
            <DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					\
            <DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>				\
						<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>					<DOTAItemImage itemname="" style="saturation: 0.1;height:' + item_height + 'px;width:' + item_width + 'px;"><Label style="font-size:14px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;" text=""/><Label style="font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;" text=""/></DOTAItemImage>				\
					</Panel>				\
				</Panel> 		</root>	', false, false);
		Game.Panels.ItemsPanel.style.position = Game.ItemsPanelConfig.MainPanel.x + ' ' + Game.ItemsPanelConfig.MainPanel.y + ' 0';
		GameUI.MovePanel(Game.Panels.ItemsPanel, function(subpanel)
		{
			var mainpanelxy = subpanel.style.position.split(' ');
			Game.ItemsPanelConfig.MainPanel.x = mainpanelxy[0];
			Game.ItemsPanelConfig.MainPanel.y = mainpanelxy[1];
			Game.SaveConfig('EnemyItemPanel', Game.ItemsPanelConfig);
		});
	};

	function ItemsPanelLoadOnOff()
	{
		if (!ItemsPanel.checked)
		{
			DestroyMainItemsPanel();
			Game.ScriptLogMsg('Деактивирован: Enemy Item Panel', '#ff0000');
			DestroyHeroItemsPanel();
			DestroySkillPanels();
		}
		else
		{
			if (!Game.ItemsPanelConfig.MainPanelEnabled)
			{
				UpdatePanelSize(0, panel_opacity);
			}
			else
			{
				UpdatePanelSize(Game.ItemsPanelConfig.Size, panel_opacity);
			};

			function fMain()
			{
				$.Schedule(MainPanelRefreshSpeed, function()
				{
					if (ItemsPanel.checked)
					{
						ItemsPanelEvery();
						fMain();
					};
				});
			};
			fMain();
			if (Game.ItemsPanelConfig.PlayerPanel)
				PlayersPanel();
			Game.ScriptLogMsg('Активирован: Enemy Item Panel', '#00ff00');
		};
	};
	
	var ItemsPanel = Game.AddScript('EnemyItemPanel', 'Enemy Item Panel', ItemsPanelLoadOnOff, '', '	<Label text="Enemy Item Panel:" style="horizontal-align:center;font-size:30px;text-shadow: 0px 0px 8px 5.0 #555;color:white;margin:12px;font-family:Radiance;"/>	<Label text="Описание скрипта: Показывает инвентарь врежеских героев. Уведомляет всплывающим окошком и звуком при появлении у врага важного айтема." style="font-size:22px;margin:0 15px;height:150px;"/>', false, false);
	
	var Settings = [
	{
		'type': 'toggle',
		'name': 'Всплывающее уведомление :',
		'enabled': Game.ItemsPanelConfig.Notify,
		'callback1': function(value)
		{
			Game.ItemsPanelConfig.Notify = value;
			Game.SaveConfig('EnemyItemPanel', Game.ItemsPanelConfig);
		}
	},
	{
		'type': 'toggle',
		'name': 'Отображать основную панель :',
		'enabled': Game.ItemsPanelConfig.MainPanelEnabled,
		'callback1': function(value)
		{
			Game.ItemsPanelConfig.MainPanelEnabled = value;
			Game.SaveConfig('EnemyItemPanel', Game.ItemsPanelConfig);
			if (!ItemsPanel.checked)
				return;
			if (!Game.ItemsPanelConfig.MainPanelEnabled)
			{
				UpdatePanelSize(0, panel_opacity);
			}
			else
			{
				UpdatePanelSize(Game.ItemsPanelConfig.Size, panel_opacity);
			};
		}
	},
	{
		'type': 'slider',
		'name': 'Размер панели =',
		'min': 0,
		'max': 100,
		'val': Game.ItemsPanelConfig.Size,
		'callback2': function(value)
		{
			Game.ItemsPanelConfig.Size = Math.round(value);
			if (ItemsPanel.checked)
				UpdatePanelSize(Game.ItemsPanelConfig.Size, panel_opacity);
			Game.SaveConfig('EnemyItemPanel', Game.ItemsPanelConfig);
		}
	},
	{
		'type': 'slider',
		'name': 'Прозрачность основной панели =',
		'min': 0,
		'max': 100,
		'val': Game.ItemsPanelConfig.Opacity,
		'callback2': function(value)
		{
			Game.ItemsPanelConfig.Opacity = Math.round(value);
			panel_opacity = Game.ItemsPanelConfig.Opacity / 100;
			if (ItemsPanel.checked)
				UpdatePanelSize(Game.ItemsPanelConfig.Size, panel_opacity);
			Game.SaveConfig('EnemyItemPanel', Game.ItemsPanelConfig);
		}
	},
	{
		'type': 'toggle',
		'name': 'Отображать предметы над игроками :',
		'enabled': Game.ItemsPanelConfig.PlayerPanel,
		'callback1': function(value)
		{
			Game.ItemsPanelConfig.PlayerPanel = value;
			if (!Game.ItemsPanelConfig.PlayerPanel)
			{
				DestroyHeroItemsPanel();
				DestroySkillPanels();
			}
			else
			{
				if (ItemsPanel.checked)
					PlayersPanel();
			}
			Game.SaveConfig('EnemyItemPanel', Game.ItemsPanelConfig);
		}
	},
	{
		'type': 'toggle',
		'name': 'Над игроками только важные :',
		'enabled': Game.ItemsPanelConfig.OnlyImp,
		'callback1': function(value)
		{
			Game.ItemsPanelConfig.OnlyImp = value;
			Game.SaveConfig('EnemyItemPanel', Game.ItemsPanelConfig);
		}
	},
	{
		'type': 'slider',
		'name': 'Скорость обновления =',
		'min': 1,
		'max': 50,
		'val': Game.ItemsPanelConfig.MainPanelRefreshSpeed,
		'callback2': function(value)
		{
			Game.ItemsPanelConfig.MainPanelRefreshSpeed = Math.round(value);
			MainPanelRefreshSpeed = Game.ItemsPanelConfig.MainPanelRefreshSpeed / 10;
			Game.SaveConfig('EnemyItemPanel', Game.ItemsPanelConfig);
		}
	}];
	Game.AddScriptToSettings('Enemy Item Panel', Settings);
};
EnemyItemPanelExecuteFunction();