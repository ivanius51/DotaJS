//edited by ivanius in 2018 for disable animation (functions OrderCastWOAnimation)

try
{
	Game.Panels.EzProcast.DeleteAsync(0);
	Game.Functions.EzProcast = false;
}
catch (e)
{}
Game.EzprocastConfig = Game.GetCFG('Ezprocast');

var CastStarted = false;

Game.Functions.EzProcastF = function()
{
	$.Msg('Try EzProcastF ',Game.Functions.EzProcast,' ',CastStarted,' ',EzProcast.checked);
	if ((!Game.Functions.EzProcast)||(CastStarted)||(!EzProcast.checked))
	{
		return;
	};		
	var MyEnt = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID());
	var EntOnCursor = GameUI.FindScreenEntities(GameUI.GetCursorPosition());
	var CursorXYZ = Game.ScreenXYToWorld(GameUI.GetCursorPosition()[0], GameUI.GetCursorPosition()[1]);
	var items = Game.Panels.EzProcast.Children()[2].Children();
	var abils = [];
	for (i in items)
	{
		if (items[i].Children()[0].paneltype == 'DOTAAbilityImage')
		{
			abils.push(items[i].Children()[0].abilityname)

		}
		else if (items[i].Children()[0].paneltype == 'DOTAItemImage')
		{
			abils.push(items[i].Children()[0].itemname)
		};
	};
	OrderCastWOAnimation(abils,MyEnt,EntOnCursor,CursorXYZ);
};

OrderCastWOAnimation = function(CastList,Self,Target,CursorXYZ)
{
	$.Msg('Abils: ' + CastList)
	Game.EntStop(Self, false);
	var i = 0;
	var oldtime = Game.Time();
	var CastNext = true;
	var WasCasted = false;

	function WaitCast(EntityID,AbilityID)
	{
		if ((!CastNext)&&(EzProcast.checked))
		$.Schedule(0.001,
			function()
			{
				$.Msg('WaitCast ',Abilities.GetAbilityName(AbilityID),' =',i,' exe=',Abilities.CanBeExecuted(AbilityID),' a=',Abilities.IsInAbilityPhase(AbilityID),' cd=',Abilities.GetCooldownTimeRemaining(AbilityID));
				i++;
				if (!WasCasted)
					WasCasted = Abilities.IsInAbilityPhase(AbilityID);

				if ((i>250)||(Abilities.GetCooldownTimeRemaining(AbilityID)!=0)||(!Abilities.IsInAbilityPhase(AbilityID) && WasCasted))
				{
					WasCasted = false;
					$.Msg('LAST=',(i*0.001),' time=',(Game.Time()-oldtime),' exe=',Abilities.CanBeExecuted(AbilityID),' a=',Abilities.IsInAbilityPhase(AbilityID),' cd=',Abilities.GetCooldownTimeRemaining(AbilityID),' wc=',WasCasted);
					$.Schedule(0.001,
						function()
						{
							Game.EntStop(EntityID,false);
							CastNext = true;
						});
				}
				else	
					WaitCast(EntityID,AbilityID);
			}
		);
	};

	SkillCast = function(abilname,Self,Target,CursorXYZ)
	{try
		{
		var AbilityID = Game.GetAbilityByName(Self, abilname);
		var Behavior = Game.Behaviors(AbilityID);
		var TargetTeam = Abilities.GetAbilityTargetTeam(AbilityID);
		var myxyz = Entities.GetAbsOrigin(Self);
		$.Msg('Abil Name: ', abilname);
		$.Msg('Team Target: ' + TargetTeam);
		$.Msg('Ability Behavior: ' + Behavior);
		if (Behavior.indexOf(512) != -1)
		{
			$.Msg('ToggleAbil');
			Game.ToggleAbil(Self, AbilityID, true);
			return true;
		}
		else if (Behavior.indexOf(4) != -1)
		{
			$.Msg('CastNoTarget');
			Game.CastNoTarget(Self, AbilityID, true);
			return true;
		}
		else if (Behavior.indexOf(16) != -1)
		{
			$.Msg('CastPosition ', Game.PointDistance(CursorXYZ, myxyz))
			if (abilname == "item_blink" && Game.PointDistance(CursorXYZ, myxyz) <= 200)
				return true;
			Game.CastPosition(Self, AbilityID, CursorXYZ, true);
			return true;
		}
		else if (abilname == "item_ethereal_blade" || abilname == "item_diffusal_blade" || abilname == "item_diffusal_blade_2")
		{
			$.Msg('CastTarget 1');
			if (Target.length != 0 && Entities.IsEnemy(Target[0].entityIndex))
				Game.CastTarget(Self, AbilityID, Target[0].entityIndex, true)
			else
				Game.CastTarget(Self, AbilityID, Self, true);
		}
		else if (Behavior.indexOf(8) != -1 || Behavior.length == 0)
		{
			if (parseInt(TargetTeam) == 3 || parseInt(TargetTeam) == 1)
			{
				$.Msg('CastTarget 2. test ',TargetTeam);
				Game.CastTarget(Self, AbilityID, Self, true);			
			}
			else if (parseInt(TargetTeam) == 4 || parseInt(TargetTeam) == 7)
			{
				$.Msg('CastTarget 3.',TargetTeam);
				Game.CastTarget(Self, AbilityID, Self, true);
			}
			else if (parseInt(TargetTeam) == 2)
			{
				$.Msg('CastTarget 4.',TargetTeam);
				Game.CastTarget(Self, AbilityID, Target[0].entityIndex, true);
			};
		};
		return true;
	}
	catch (e)
	{return false;}
	};

	var j = 0;

	DoOrderCastWOAnimation = function(AbilList,Self,Target,CursorXYZ)
	{
		if ((EzProcast.checked)&&(j<AbilList.length))
		$.Schedule(0.01,
			function()
			{
				var Abil=Game.GetAbilityByName(Self, AbilList[j]);
				$.Msg('ORDERCAST=',AbilList[j],' CastNext=',CastNext,' item=',Abilities.IsItem(Abil),' Range=',Abilities.GetCastRange(Abil));
				if (CastNext)
				{
					$.Msg('START ORDERCAST ',j);
					CastStarted = true;
					CastNext = false;
					i = 0;
					oldtime = Game.Time();
					if (Abilities.IsToggle(Abil)||((Abilities.GetCastRange(Abil)==0)&&Abilities.IsItem(Abil)))
						$.Schedule(0.005,function(){CastNext = true;});
					else
						WaitCast(Self,Abil);
					var	CastResult = SkillCast(AbilList[j],Self,Target,CursorXYZ);
					$.Msg('CastResult=',CastResult);
					if (!CastResult)
						CastNext = true;
					if (j==(AbilList.length-1))
						$.Schedule(0.15,function(){CastStarted = false;});
					else
					{
						j++;
						OrderCastWOAnimation(AbilList,Self,Target,CursorXYZ);
					};				
				}
				else 
					OrderCastWOAnimation(AbilList,Self,Target,CursorXYZ);
			});
	};

	DoOrderCastWOAnimation(CastList,Self,Target,CursorXYZ);	
};

var MyInv = []

function UpdateUnv()
{
	if (!EzProcast.checked)
		return;
	var MyEnt = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID());
	var Inv = Game.GetInventory(MyEnt);
	if (Game.CompareArrays(MyInv, Inv))
	{
		return;
	}
	MyInv = Inv;
	try
	{
		Game.Panels.EzProcast.Children()[0].RemoveAndDeleteChildren();
	}
	catch (e)
	{}
	var AbC = Entities.GetAbilityCount(MyEnt)
	for (i = 0; i < AbC; i++)
	{
		var Ab = Entities.GetAbility(MyEnt, i)
		$.Msg(Abilities.GetAbilityName(Ab),' ', Abilities.IsActivated(Ab),' ',Abilities.CanBeExecuted(Ab),' ',Abilities.AbilityReady(Ab),' ',Abilities.IsHidden(Ab),' ',Abilities.IsOnCastbar(Ab),' ',Abilities.CanBeExecuted(Ab));
		if (!Abilities.IsDisplayedAbility(Ab) || Abilities.IsPassive(Ab))
			continue
		var P = $.CreatePanel('Panel', Game.Panels.EzProcast.Children()[0], 'EzProcast1Items')
		P.BLoadLayoutFromString('<root><script>function Add(){Parent=$.GetContextPanel().GetParent().GetParent();$.GetContextPanel().SetParent(Parent.Children()[2]);$.GetContextPanel().SetPanelEvent("onactivate", Rem)}function Rem(){Parent=$.GetContextPanel().GetParent().GetParent();$.GetContextPanel().SetParent(Parent.Children()[0]);$.GetContextPanel().SetPanelEvent("onactivate", Add)}</script><Panel style="border: 1px solid #000; border-radius: 10px;" onactivate="Add()"><DOTAAbilityImage /></Panel></root>', false, false)
		P.Children()[0].abilityname = Abilities.GetAbilityName(Ab)
	}
	for (i in Inv)
	{
		Behaviors = Game.Behaviors(Inv[i])
		if (Behaviors.indexOf(2) != -1)
			continue
		var P = $.CreatePanel('Panel', Game.Panels.EzProcast.Children()[0], 'EzProcast1Items2')
		P.BLoadLayoutFromString('<root><script>function Add(){Parent=$.GetContextPanel().GetParent().GetParent();$.GetContextPanel().SetParent(Parent.Children()[2]);$.GetContextPanel().SetPanelEvent("onactivate", Rem)}function Rem(){Parent=$.GetContextPanel().GetParent().GetParent();$.GetContextPanel().SetParent(Parent.Children()[0]);$.GetContextPanel().SetPanelEvent("onactivate", Add)}</script><Panel style="border: 1px solid #000; border-radius: 10px;" onactivate="Add()"><DOTAItemImage /></Panel></root>', false, false)
		P.Children()[0].itemname = Abilities.GetAbilityName(Inv[i])
	}
};

EzProcastOnOffLoad = function()
{
	Game.Panels.EzProcast = $.CreatePanel('Panel', Game.GetMainHUD(), 'EzProcast1')
	Game.Panels.EzProcast.BLoadLayoutFromString('\
		<root>\
			<Panel class="ItemsPanel1" style="width:120px;flow-children:right;background-color:#000000EE;">\
				<Panel style="width:35px;min-height:50px;flow-children:down;horizontal-align:left;"></Panel>\
				<Image src="s2r://panorama/images/hud/button_courier_greenarrow_png.vtex" style="horizontal-align:center;vertical-align:center;" />\
				<Panel style="width:35px;min-height:50px;flow-children:down;horizontal-align:right;"></Panel>\
			</Panel>\
		</root>\
	', false, false)
	GameUI.MovePanel(Game.Panels.EzProcast, function(p)
	{
		var position = p.style.position.split(' ')
		Game.EzprocastConfig.MainPanel.x = position[0]
		Game.EzprocastConfig.MainPanel.y = position[1]
		Game.SaveConfig('Ezprocast', Game.EzprocastConfig)
	})
	Game.Panels.EzProcast.style.position = Game.EzprocastConfig.MainPanel.x + ' ' + Game.EzprocastConfig.MainPanel.y + ' 0'
	var MyEnt = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())
	var AbC = Entities.GetAbilityCount(MyEnt)
	for (i = 0; i < AbC; i++)
	{
		var Ab = Entities.GetAbility(MyEnt, i)
		if (!Abilities.IsDisplayedAbility(Ab) || Abilities.IsPassive(Ab))
			continue
		var P = $.CreatePanel('Panel', Game.Panels.EzProcast.Children()[0], 'EzProcast1Items')
		P.BLoadLayoutFromString('<root><script>function Add(){Parent=$.GetContextPanel().GetParent().GetParent();$.GetContextPanel().SetParent(Parent.Children()[2]);$.GetContextPanel().SetPanelEvent("onactivate", Rem)}function Rem(){Parent=$.GetContextPanel().GetParent().GetParent();$.GetContextPanel().SetParent(Parent.Children()[0]);$.GetContextPanel().SetPanelEvent("onactivate", Add)}</script><Panel style="border: 1px solid #000; border-radius: 10px;" onactivate="Add()"><DOTAAbilityImage /></Panel></root>', false, false)
		P.Children()[0].abilityname = Abilities.GetAbilityName(Ab)
	}
	var Inv = Game.GetInventory(MyEnt)
	for (i in Inv)
	{
		Behaviors = Game.Behaviors(Inv[i])
		if (Behaviors.indexOf(2) != -1)
			continue
		var P = $.CreatePanel('Panel', Game.Panels.EzProcast.Children()[0], 'EzProcast1Items2')
		P.BLoadLayoutFromString('<root><script>function Add(){Parent=$.GetContextPanel().GetParent().GetParent();$.GetContextPanel().SetParent(Parent.Children()[2]);$.GetContextPanel().SetPanelEvent("onactivate", Rem)}function Rem(){Parent=$.GetContextPanel().GetParent().GetParent();$.GetContextPanel().SetParent(Parent.Children()[0]);$.GetContextPanel().SetPanelEvent("onactivate", Add)}</script><Panel style="border: 1px solid #000; border-radius: 10px;" onactivate="Add()"><DOTAItemImage /></Panel></root>', false, false)
		P.Children()[0].itemname = Abilities.GetAbilityName(Inv[i])
	}
}

function EzProcastOnOff()
{
	if (Game.GetState() != 7 && Game.GetState() != 6 && Game.GetState() != 8)
	{
		try
		{
			Game.Panels.EzProcast.DeleteAsync(0);
			Game.Functions.EzProcast = false;
		}
		catch (e)
		{}
	};
	if (!EzProcast.checked)
	{
		try
		{
			CastStarted = false;
			Game.Panels.EzProcast.DeleteAsync(0);
		}
		catch (e)
		{}
		for (i in Game.Subscribes.EzProcast)
			try { GameEvents.Unsubscribe(Game.Subscribes.EzProcast[i]) }
		catch (e) {}
		Game.ScriptLogMsg('�������������: EzProcast', '#ff0000')

	}
	else
	{
		EzProcastOnOffLoad();

		Game.Subscribes.EzProcast = [];
		/*Game.Subscribes.EzProcast.push(GameEvents.Subscribe("game_end",function()
		{
			$.Msg('Game.Functions.EzProcast unload');
			Game.Functions.EzProcast = false;
			Game.Functions.EzProcast = false;
		}));
		Game.Subscribes.EzProcast.push(GameEvents.Subscribe('game_newmap', function()
		{
			$.Msg('Game.Functions.EzProcast unload');
			Game.Functions.EzProcast = false;
			Game.Functions.EzProcast = false;
		}));
		Game.Subscribes.EzProcast.push(GameEvents.Subscribe('game_init', function()
		{
			$.Msg('Game.Functions.EzProcast unload');
			Game.Functions.EzProcast = false;
			Game.Functions.EzProcast = false;
		}));*/
		function MainFunc()
		{
			$.Schedule(0, function()
			{
				if (EzProcast.checked)
				{
					UpdateUnv()
				}
				MainFunc()
			})
		};
		MainFunc();
		Game.AddCommand("__EzProcast", Game.Functions.EzProcastF, "", 0);
		Game.Functions.EzProcast = true;
		/*if (!Game.Functions.EzProcast)
		{
			Game.Functions.EzProcast = true;
			Game.AddCommand("__EzProcast", Game.Functions.EzProcastF, "", 0);
		};*/

		Game.ScriptLogMsg('�����������: EzProcast', '#00ff00')
	}
}
var EzProcast = Game.AddScript('', "EzProcast", EzProcastOnOff, "Exieros", '\
	<Label text="EzProcast" style="horizontal-align:center;font-size:30px;text-shadow: 0px 0px 8px 5.0 #555;color:white;margin:10px;font-family:Radiance;"/>\
	<Label text="test" style="font-size:25px;margin:0 15px;height:100px;"/>\
	<Label text="������� ����������� �� ������� \'__EzProcast\'. \
Ÿ ������� ������� ��������� �������: \'bind key __EzProcast\',\
 ��� key - ���� ������." style="font-size:25px;margin:0 15px;height:150px;color:green;"/>\
', false, false);