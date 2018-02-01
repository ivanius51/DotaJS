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


function PseudoRandomExecuteFunction() {

destroy()
var uiw = Game.GetMainHUD().actuallayoutwidth
var uih = Game.GetMainHUD().actuallayoutheight
var interval = 0.005


var PseudoP=
{
	PseudoRandomChanse : 0,
	NoLuckCount : 1,
	OldNoLuckCount : 0,
	SkillTableIndex : -1,
	SkillTable : [],
	CritMul : 0,
	SkillName : '',
	FullCD : 0,
	SkillID : 0,
	CreepMulDmg : 1
}

var PseudoArray = []

var ChanseTable = 
[
[5,0.00380],
[10,0.01475],
[15,0.03221],
[17,0.04221],
[20,0.05570],
[25,0.08475],
[30,0.11895],
[35,0.14628],
[40,0.18128],
[45,0.21867],
[50,0.25701],
[55,0.29509],
[60,0.33324],
[65,0.38109],
[70,0.42448],
[75,0.46134],
[80,0.50276]
]

var SkillsTableByDmg =
[
['juggernaut_blade_dance',[20,25,30,35]],
['skeleton_king_mortal_strike',15],
['phantom_assassin_coup_de_grace',15],
['lycan_shapeshift',30],
['brewmaster_drunken_brawler',[10,15,20,25]],
['chaos_knight_chaos_strike',10],
['sniper_headshot',40],
['troll_warlord_berserkers_rage',10]
]

var OnSkillsTable =
[
['ogre_magi_multicast',[20,40,60]],
['obsidian_destroyer_essence_aura',40]
]

var SkillsTableOnDmg =
[
['tiny_craggy_exterior',[10,15,20,25]],
//['phantom_assassin_blur',[20,30,40,50]],
['legion_commander_moment_of_courage',25],
['axe_counter_helix',20]
]

var SkillsTable =
[
['spirit_breaker_greater_bash',17],
['slardar_bash',[10,15,20,25]],
['faceless_void_time_lock',[10,15,20,25]],
//['phantom_lancer_juxtapose',[40,45,50]],
]

//DmgMultimler
var buffsMulDmg = 
[
	["modifier_item_quelling_blade", 1.4],
	["modifier_item_bfury", 1.6],
	["modifier_item_iron_talon", 1.4],
	["modifier_bloodseeker_bloodrage", [1.25,1.3,1.35,1.4]],
]

var User = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())
var UserID = Game.GetLocalPlayerID()

function PseudoRandomF()
{
	if (PseudoP.SkillTableIndex==-1)
		return
	if(Game.GetState()!=7 && Game.GetState()!=6){
		try{ Game.Panels.PseudoRandom.DeleteAsync(0) }catch(e){}
		PseudoRandom.checked = false
		return
	}

	if ((PseudoP.SkillTable == SkillsTable)||(PseudoP.SkillTable == SkillsTableOnDmg))
	{
		var Cast = Abilities.IsInAbilityPhase(PseudoP.SkillID)
		var CDAbil = Abilities.GetCooldownTimeRemaining(PseudoP.SkillID)
			
		if ((((Cast)||(CDAbil!=0))&&PseudoP.FullCD<=(CDAbil+0.06))||!Entities.IsAlive(User))
		{
			PseudoP.NoLuckCount = 1
			$.Msg(PseudoP.SkillName+' id '+PseudoP.SkillID+' Cast '+Cast+' CDAbil '+CDAbil+' FullCD '+PseudoP.FullCD)
		}
	}
	
	var xyz = Entities.GetAbsOrigin(User)
	var hboffs = Game.HBOffsets[Entities.GetUnitName(User)]
	var uix = Game.WorldToScreenX( xyz[0], xyz[1], (xyz[2]+hboffs) )
	var uiy = Game.WorldToScreenY( xyz[0], xyz[1], (xyz[2]+hboffs) )
	var uixp = (uix-4)/uiw*100
	var uiyp = (uiy+22.5)/uih*100
	Game.Panels.PseudoRandom.style.position = uixp+'% '+uiyp+'% 0'
	
	if (PseudoP.OldNoLuckCount!=PseudoP.NoLuckCount)
	{
		PseudoP.OldNoLuckCount=PseudoP.NoLuckCount
		PseudoP.PseudoRandomChanse = Math.round((PseudoP.NoLuckCount * PseudoP.CritMul)*100)
		Game.Panels.PseudoRandom.Children()[0].style.width = PseudoP.PseudoRandomChanse+'%'
		Game.Panels.PseudoRandom.Children()[1].text = PseudoP.SkillName
		//Game.Panels.PseudoRandom.Children()[2].text = PseudoP.PseudoRandomChanse+'%'
	}
}

function CheckInTable(table,UserBuff)
{
	for(k in table)
		if(UserBuff == table[k][0])
		{
			PseudoP.SkillName = table[k][0].replace(Entities.GetUnitName(User).replace('npc_dota_hero_','')+'_','')
			PseudoP.SkillTableIndex = k
			PseudoP.SkillTable = table
			return true
			break
		}
	return false
}

function GetCrinN()
{
	PseudoP.CritMul = 0
	if (PseudoP.SkillTableIndex==-1)
	{
		var UserBuffs = Game.GetBuffsNames(User)
		for(m in UserBuffs)
			for (mulbuff in buffsMulDmg)
			if(UserBuffs[m] == buffsMulDmg[mulbuff][0])
			if(Array.isArray(buffsMulDmg[mulbuff][1]))
				PseudoP.CreepMulDmg *= buffsMulDmg[mulbuff][1][Abilities.GetLevel(Entities.GetAbilityByName(User,UserBuffs[m]))-1]
			else
				PseudoP.CreepMulDmg *= buffsMulDmg[mulbuff][1]
			
		for(m = 0; m<Entities.GetAbilityCount(User); m++)
		{
			var name = Abilities.GetAbilityName(Entities.GetAbility( User, m ))
			CheckInTable(SkillsTable,name)
			CheckInTable(SkillsTableByDmg,name)
			CheckInTable(SkillsTableOnDmg,name)
			CheckInTable(OnSkillsTable,name)
		}
	}
	if (PseudoP.SkillTableIndex!=-1)
	{
	PseudoP.SkillID = Entities.GetAbilityByName (User, PseudoP.SkillTable[PseudoP.SkillTableIndex][0])
	PseudoP.FullCD = Abilities.GetCooldownLength(PseudoP.SkillID)
	
	if(Array.isArray(PseudoP.SkillTable[PseudoP.SkillTableIndex][1]))
		PseudoP.CritMul = PseudoP.SkillTable[PseudoP.SkillTableIndex][1][Abilities.GetLevel(Entities.GetAbilityByName(User,PseudoP.SkillTable[PseudoP.SkillTableIndex][0]))-1]
	else
		PseudoP.CritMul = PseudoP.SkillTable[PseudoP.SkillTableIndex][1]
	
	for (i in ChanseTable)
		if (PseudoP.CritMul==ChanseTable[i][0])
		{
			PseudoP.CritMul = ChanseTable[i][1]+0.02
			break
		}
	}
	$.Msg(PseudoP)
}

//Subscribes (events)
  //SomeOne Hit SomeOne
function entity_hurt(data)
{
	if ((data.entindex_attacker == User)&&(Entities.IsEnemy(data.entindex_killed)))
	{	
			var ArmorReduct =  Entities.GetArmorReductionForDamageType(data.entindex_killed, DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL)
			var Armor = (Entities.GetPhysicalArmorValue(data.entindex_killed))
			$.Msg(Armor)
			if (Armor>=0)
				Armor = (1-(0.06*Armor)/(1+0.06*Armor))
			else
				Armor = 1.06
			
			var dmgmax = (Entities.GetDamageMax(User) + Entities.GetDamageBonus(User)+1)*Armor
			var dmgmin = (Entities.GetDamageMin(User) + Entities.GetDamageBonus(User)-1)*Armor
			if (Entities.IsCreep(data.entindex_killed))
			{
				dmgmax *= PseudoP.CreepMulDmg
				dmgmin *= PseudoP.CreepMulDmg
			}
			
		if (PseudoP.SkillTable == SkillsTableByDmg)
		{		
			if ((dmgmax>data.damage)&&(dmgmin<data.damage))
				PseudoP.NoLuckCount += 1
			else
				PseudoP.NoLuckCount = 1
		}
		if (PseudoP.SkillTable == SkillsTableOnDmg)
		{
			if ((dmgmax<data.damage)||(dmgmin>data.damage))
				PseudoP.NoLuckCount = 1
			//Abilities.GetAbilityDamage(PseudoP.SkillID)
			//$.Msg('dmgmin '+dmgmin+' dmgmax '+dmgmax)
			//$.Msg(data)
		}
	}
	
	if ((data == User)&&(PseudoP.SkillTable == SkillsTableOnDmg))
	{
		//$.Msg(data)
		PseudoP.NoLuckCount += 1
	}
}

function dota_player_used_ability(data)
{
	$.Msg(data)
	if ((data.PlayerID == UserID)&&(PseudoP.SkillTable == OnSkillsTable))
	{
		PseudoP.NoLuckCount += 1
		$.Msg(data)
	}
}

function MapLoaded(data)
{
	Destroy()
	PseudoRandom.checked = false
}

function dota_player_learned_ability(data)
{
	if (!PseudoRandom.checked)
		return
	$.Msg(data)
	$.Msg(data.PlayerID == UserID)
	if (data.PlayerID == UserID)
	{
		$.Msg(CheckInTable(SkillsTable,data.abilityname))
		$.Msg(CheckInTable(SkillsTableByDmg,data.abilityname))
		$.Msg(CheckInTable(SkillsTableOnDmg,data.abilityname))
		$.Msg(CheckInTable(OnSkillsTable,data.abilityname))
		GetCrinN()
	}
}

function InitPceudo(data)
{
	data.PseudoRandomChanse = 0
	data.NoLuckCount = 1
	data.OldNoLuckCount = 0
	data.SkillTableIndex = -1
	data.SkillTable = []
	data.CritMul = 0
	data.SkillName = ''
	data.FullCD = 0
	data.SkillID = 0
	data.CreepMulDmg = 1
}

function destroy()
{
	try{Game.Panels.PseudoRandom.DeleteAsync(0)}catch(e){}
	for (i in Game.Subscribes.PseudoRandom)
		try{GameEvents.Unsubscribe(Game.Subscribes.PseudoRandom[i])}catch(e){}
}

function create()
{
	User = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())
	UserID = Game.GetLocalPlayerID()
	
	Game.Subscribes.PseudoRandom = []
	Game.Subscribes.PseudoRandom.push( GameEvents.Subscribe('game_newmap', MapLoaded) )
	Game.Subscribes.PseudoRandom.push( GameEvents.Subscribe('entity_hurt', entity_hurt) )
	Game.Subscribes.PseudoRandom.push( GameEvents.Subscribe('dota_player_learned_ability', dota_player_learned_ability) )
	Game.Subscribes.PseudoRandom.push( GameEvents.Subscribe('dota_player_used_ability', dota_player_used_ability) )
	
	//Game.Panels.PseudoRandom = []
	Game.Panels.PseudoRandom = $.CreatePanel( 'Panel', Game.GetMainHUD(), 'EzProcast1Items' )
	Game.Panels.PseudoRandom.BLoadLayoutFromString( '<root><Panel style="width:110px;height:15px;margin:-47px -52px;background-color:#000000EE;border: 1px solid #000;"><Panel style="height:100%;background-color:#888800ff;"></Panel><Label style="color:#ffffff55;font-size:11px;font-weight: bold;width:100%;text-align: left;vertical-align:center;margin: 0 10px;"/><Label style="color:#ffffff55;font-size:11px;font-weight: bold;width:100%;text-align: right;vertical-align:center;margin: 0 10px;"/></Panel></root>', false, false )
	
	InitPceudo(PseudoP)
	
	GetCrinN()
}

var PseudoRandomOnCheckBoxClick = function(){
	if ( !PseudoRandom.checked ){
		destroy()
		Game.ScriptLogMsg('Script disabled: PseudoRandom By IvaniuS51', '#ff0000')
		return
	}
	create()
	function f(){ $.Schedule( interval,function(){
		PseudoRandomF()
		if(PseudoRandom.checked)
			f()
	})}
	f()
}
//var Temp = $.CreatePanel( "Panel", $('#scripts'), "PseudoRandom" )
//Temp.SetPanelEvent( 'onactivate', PseudoRandomOnCheckBoxClick )
//Temp.BLoadLayoutFromString( '<root><styles><include src="s2r://panorama/styles/dotastyles.vcss_c" /><include src="s2r://panorama/styles/magadan.vcss_c" /></styles><Panel><ToggleButton class="CheckBox" id="PseudoRandom" text="PseudoRandom"/></Panel></root>', false, false)  
var PseudoRandom = Game['AddScript']('ASD1', 'PseudoRandom', PseudoRandomOnCheckBoxClick, 'ASD2', '', ![], ![]);} PseudoRandomExecuteFunction();//$.GetContextPanel().FindChildTraverse( 'PseudoRandom' ).Children()[0]