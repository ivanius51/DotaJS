//Ivanius51 13.07.2016 АвтоАрмлет
//Распространяется под лицензией "GNU General Public License" https://jxself.org/translations/gpl-2.ru.shtml

//интервал(в секундах) через который будет делаться проверка меньше некуда
var interval = 0.1
//Глобальная переменная для проверки изменения НР
var OldHP = 0


function AutoArmletFunc()
{
	var User = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())
	var UserBuffs = Game.GetBuffsNames(User)
	var ArmletIt = Game.GetAbilityByName(User,'item_armlet')
	
	if ((Game.IntersecArrays(UserBuffs,["modifier_item_armlet"]))&&(!Game.IntersecArrays(UserBuffs,["modifier_item_armlet_unholy_strength"]))&&(Entities.GetHealth(User)<=50)&&(Math.abs(OldHP-Entities.GetHealth(User))>400))
		Game.ToggleAbil(User,ArmletIt,1);
	//Предел НР после которого выключать армлет
	if ((Game.IntersecArrays(UserBuffs,["modifier_item_armlet_unholy_strength"]))&&(Entities.GetHealth(User)<=220)&&(OldHP>Entities.GetHealth(User)))
		Game.ToggleAbil(User,ArmletIt,1)
	
	OldHP = Entities.GetHealth(User)
}

var AutoArmletOnCheckBoxClick = function()
{
	if ( !AutoArmlet.checked ){
		Game.ScriptLogMsg('Script disabled: AutoArmlet', '#ff0000')
		return
	}
	//Регистрируем обычное переключение армлета
	try
	{
		Game.AddCommand('__AutoArmlet', 
		function()
		{
			var User = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())
			var UserBuffs = Game.GetBuffsNames(User)
			var ArmletIt = Game.GetAbilityByName(User,'item_armlet')
			if (Game.IntersecArrays(UserBuffs,["modifier_item_armlet_unholy_strength"]))
				Game.ToggleAbil(User,ArmletIt,1)
			
			$.Schedule(0.005,function()
			{
				var User = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID());
				var ArmletIt = Game.GetAbilityByName(User,'item_armlet');
				Game.ToggleAbil(User,ArmletIt,1);
			},0)
		}, 'AutoArmlet Abuse',0)
	}catch(e){}
	
	//циклически замкнутый таймер с проверкой условия с интервалом 'interval'
	function maincheck(){ $.Schedule( interval,function(){
		AutoArmletFunc()
		if(AutoArmlet.checked)
			maincheck()
	})}
	maincheck()
	Game.ScriptLogMsg('Script enabled: AutoArmlet', '#00ff00')
}

//шаблонное добавление чекбокса в панель
var Temp = $.CreatePanel( "Panel", $('#scripts'), "AutoArmlet" )
Temp.SetPanelEvent( 'onactivate', AutoArmletOnCheckBoxClick )
Temp.BLoadLayoutFromString( '<root><styles><include src="s2r://panorama/styles/dotastyles.vcss_c" /><include src="s2r://panorama/styles/magadan.vcss_c" /></styles><Panel><ToggleButton class="CheckBox" id="AutoArmlet" text="AutoArmlet"/></Panel></root>', false, false)  
var AutoArmlet = $.GetContextPanel().FindChildTraverse( 'AutoArmlet' ).Children()[0]