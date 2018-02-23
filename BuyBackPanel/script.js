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
function BuyBackUltiPanelExecuteFunction()
{
	Destroy();
	var uiw = Game.GetMainHUD().actuallayoutwidth;
	var uih = Game.GetMainHUD().actuallayoutheight;
	var interval = 0.5;

	var Config = {
		MainPanel: [],
		Items: []
	};
	

	//var User = new Hero(Game.GetLocalPlayerID());
	//var EnemyHeroeIDs = Game.PlayersEnemyHeroEnts();
	
	var uix = 0;
	var TeamOffcet = 0;
	if (Players.GetTeam(Players.GetLocalPlayer())==2)
		TeamOffcet = 5;
	if (Players.GetTeam(Players.GetLocalPlayer())==2)
		uix = (uiw/2)+101;
	else
		uix = (uiw/2)-417;
	var uiy = 40;
	var uixp = (uix) / uiw * 100;
	var uiyp = (uiy) / uih * 100;

	function BuyBackUltiF()
	{
		if ((Game.GetState() != 7 && Game.GetState() != 6 && Game.GetState() != 8)|| (!BuyBackUlti.checked))
		{
			try
			{
				Game.Panels.BuyBackUlti.DeleteAsync(0);
			}
			catch (e) {};
			Game.BybackStatus = [];
			BuyBackUlti.checked = false;
			return;
		};

		var EnemyHeroeIDs = Game.PlayersEnemyHeros();

		for (var i in EnemyHeroeIDs)
		{
			if (Players.CanPlayerBuyback(EnemyHeroeIDs[i]))
			{
				Game.Panels.BuyBackUlti.Children()[EnemyHeroeIDs[i]-TeamOffcet].style.border='2px solid #888800ff';
			}
			else	
			{
				Game.Panels.BuyBackUlti.Children()[EnemyHeroeIDs[i]-TeamOffcet].Children()[0].text=Players.GetLastBuybackTime(EnemyHeroeIDs[i]);
				Game.Panels.BuyBackUlti.Children()[EnemyHeroeIDs[i]-TeamOffcet].style.border='2px solid #666666ff';
			};
		};
	};

	function Test()
	{
		
	};

	//Subscribes (events)
	function MapLoaded(data)
	{
		Destroy();
		BuyBackUlti.checked = false;
		$.Msg('MapLoaded ',data);
	};


	function Destroy()
	{
		try
		{
			Game.Panels.BuyBackUlti.DeleteAsync(0)
		}
		catch (e) {}
		for (i in Game.Subscribes.BuyBackUlti)
			try
			{
				GameEvents.Unsubscribe(Game.Subscribes.BuyBackUlti[i])
			}
		catch (e) {}
	};

	function create()
	{
		Game.Subscribes.BuyBackUlti = [];
		Game.Subscribes.BuyBackUlti.push(GameEvents.Subscribe('game_newmap', MapLoaded));
		Game.Subscribes.BuyBackUlti.push(GameEvents.Subscribe("game_end", function(a)
		{
			BuyBackUlti.checked = false;
			Destroy();
		}));
		Game.Panels.BuyBackUlti = $.CreatePanel('Panel', Game.GetMainHUD(), 'PseudoRandomPanel');
		Game.Panels.BuyBackUlti.BLoadLayoutFromString("\
			<root><Panel style='width:315px;height:25px;opacity:0.95;background-color: rgba(0,0,0,0); flow-children: right;'>			\
				<Panel style='width:20%;height:100%;border:2px solid #888800ff;background-color:rgba(0,0,0,0);'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:12px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></Panel>			\
				<Panel style='width:20%;height:100%;border:2px solid #888800ff;background-color:rgba(0,0,0,0);'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:12px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></Panel>			\
				<Panel style='width:20%;height:100%;border:2px solid #888800ff;background-color:rgba(0,0,0,0);'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:12px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></Panel>			\
				<Panel style='width:20%;height:100%;border:2px solid #888800ff;background-color:rgba(0,0,0,0);'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:12px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></Panel>			\
				<Panel style='width:20%;height:100%;border:2px solid #888800ff;background-color:rgba(0,0,0,0);'><Label id='CooldownTimer' class='MonoNumbersFont' style='font-size:12px;horizontal-align: center;vertical-align: middle; color: #FFFAFA;' text=''/><Label id='Count' style='font-size:12px;horizontal-align: right;vertical-align: bottom; color: #FFFAFA;' text='' hittest='false'/></Panel>			\
			</Panel></root>", false, false);
		Game.Panels.BuyBackUlti.style.position = uixp + '% ' + uiyp + '% 0';
		Game.BybackStatus = [];
	};

	var BuyBackUltiOnCheckBoxClick = function()
	{
		if (!BuyBackUlti.checked)
		{
			Destroy();
			Game.ScriptLogMsg('Script disabled: BuyBackUlti By IvaniuS51', '#ff0000');
			return;
		}
		create();

		function mainfunc()
		{
			$.Schedule(
				interval,
				function()
				{
					BuyBackUltiF();
					Test();
					if (BuyBackUlti.checked)
						mainfunc();
				});
		};
		mainfunc();
		Game.ScriptLogMsg('Script enabled: BuyBackUlti By IvaniuS51', '#00ff00');
	};

	var BuyBackUlti = Game.AddScript('BuyBackUlti', 'BuyBackUlti', BuyBackUltiOnCheckBoxClick, 'Ivanius51', '', false, false);
};
BuyBackUltiPanelExecuteFunction();