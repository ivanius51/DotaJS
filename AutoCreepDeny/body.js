//Ivanius51 13.07.2016 АвтоДенай крипов + подсвечивание

//интервал(в секундах) через который будет делаться проверка
var interval = 0.1
//debugg
var debug = true

var z = []

var CurCreep = 0

//DmgMultimler
var buffsMulDmg = 
[
	["modifier_item_quelling_blade", 1.4],
	["modifier_item_bfury", 1.6],
	["modifier_item_iron_talon", 1.4],
	["modifier_bloodseeker_bloodrage", [1.25,1.3,1.35,1.4]],
]

//список указателей на мобов - крипов
Game.CreepsList = function(){
	var CreepsEnt =  Entities.GetAllEntitiesByClassname('npc_dota_creep_lane')
	CreepsEnt.concat(Entities.GetAllEntitiesByClassname('npc_dota_creep_neutral'))
	return CreepsEnt
}

function AutoDenyFunc(){
	//проверяем включен ли скрипт в панели
	if ( !AutoDeny.checked )
		return
	//получаем свой указатель
	var User = Players.GetPlayerHeroEntityIndex(Game.GetLocalPlayerID())
	var UserBuffs = Game.GetBuffsNames(User)
	var UserDmg = 1
	/*if (Entities.IsRangedAttacker(User))
		UserDmg = Entities.GetDamageMin(User)
	else
		UserDmg = Entities.GetDamageMax(User)*/
	
	UserDmg = (Entities.GetDamageMax(User)-Entities.GetDamageMin(User))/2
	UserDmg += Entities.GetDamageMin(User)
	UserDmg += Entities.GetDamageBonus(User)
	
	var MulDmg = 1

	for (ibuff in UserBuffs)
		for (mulbuff in buffsMulDmg)			
		if(UserBuffs[ibuff] == buffsMulDmg[mulbuff][0])
		{
			//if(debug) $.Msg( 'My buffs: ' + UserBuffs[ibuff])
			if(Array.isArray(buffsMulDmg[mulbuff][1]))
				MulDmg *= buffsMulDmg[mulbuff][1][Abilities.GetLevel(Buffs.GetAbility(ent,buffs[i]))-1]
			else
				MulDmg *= buffsMulDmg[mulbuff][1]
		}	
	
	//if(debug) $.Msg( 'My dmg: ' + UserDmg + MulDmg + (MulDmg*UserDmg))
	
	var Creeps = Entities.GetAllEntitiesByClassname('npc_dota_creep_lane')
	Creeps.concat(Entities.GetAllEntitiesByClassname('npc_dota_creep_neutral'))

	
	if (Entities.IsAlive(User))
	for (icreep in Creeps) 
	{
		var CreepArmor =(Entities.GetBonusPhysicalArmor(Creeps[icreep])+Entities.GetPhysicalArmorValue(Creeps[icreep]))
		if (CreepArmor>=0)
			CreepArmor = 1+((0.06 * CreepArmor) / (1 + 0.06 * CreepArmor))
		else
			CreepArmor = 0.94
		
		if ((Entities.IsAlive(Creeps[icreep]))&&(Entities.IsEntityInRange(Creeps[icreep],User,800))&&
				((((UserDmg*MulDmg)>=(Entities.GetHealth(Creeps[icreep])*CreepArmor))&&(Entities.IsEnemy(Creeps[icreep])))||(UserDmg>=(Entities.GetHealth(Creeps[icreep])*CreepArmor))))
		{
			/*if ((Entities.IsEnemy(Creeps[icreep]))&&((Entities.IsEntityInRange(Creeps[icreep],User,Entities.GetAttackRange(User)))||(Entities.IsEntityInRange(Creeps[icreep],User,250))))
			{
				Game.AttackTarget(User,Creeps[icreep],0)	
				CurCreep = Creeps[icreep]
				break
			}
			else*/
				CreateFollowParticle(2,'particles/units/heroes/hero_sniper/sniper_crosshair.vpcf',Creeps[icreep])
		}
	}		
}

function CreateFollowParticle(time,particlepath,someobj){
	if(z.indexOf(someobj)!=-1)
		return
	var p = Particles.CreateParticle(particlepath, ParticleAttachment_t.PATTACH_OVERHEAD_FOLLOW, someobj)
	Particles.SetParticleControl(p, 0,  0)
	z.push(someobj)
	$.Schedule(time+0.1,function(){ Particles.DestroyParticleEffect(p,p); z.splice(z.indexOf(someobj),1); })
}

var AutoDenyOnCheckBoxClick = function(){
	if ( !AutoDeny.checked ){
		Game.ScriptLogMsg('Script disabled: AutoDeny By Ivanius51', '#ff0000')
		return
	}
	//циклически замкнутый таймер с проверкой условия с интервалом 'interval'
	function maincheck(){ $.Schedule( interval,function(){
		AutoDenyFunc()
		if(AutoDeny.checked)
			maincheck()
	})}
	maincheck()
	Game.ScriptLogMsg('Script enabled: AutoDeny By Ivanius51', '#00ff00')
}

//шаблонное добавление чекбокса в панель
var Temp = $.CreatePanel( "Panel", $('#scripts'), "AutoDeny" )
Temp.SetPanelEvent( 'onactivate', AutoDenyOnCheckBoxClick )
Temp.BLoadLayoutFromString( '<root><styles><include src="s2r://panorama/styles/dotastyles.vcss_c" /><include src="s2r://panorama/styles/magadan.vcss_c" /></styles><Panel><ToggleButton class="CheckBox" id="AutoDeny" text="AutoDeny"/></Panel></root>', false, false)  
var AutoDeny = $.GetContextPanel().FindChildTraverse( 'AutoDeny' ).Children()[0]