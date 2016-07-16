var Me = Players.GetPlayerHeroEntityIndex( Game.GetLocalPlayerID() );
var TIndicator = false;
var enmIds = Game.GetAllPlayerIDs();
var Target = GetClosesToMouse();
 
function GetClosesToMouse(){       
    for(var i in enmIds){
        var target = Players.GetPlayerHeroEntityIndex( enmIds[i] );
        var CursorXYZ = Game.ScreenXYToWorld( GameUI.GetCursorPosition()[0],GameUI.GetCursorPosition()[1] );
        if(target != null && Entities.IsEnemy(target) && Entities.IsAlive(target) && !Entities.IsIllusion(target) && PointDistance(CursorXYZ,Entities.GetAbsOrigin(target)) <= 2500)
            return target;
    }
}
 
function DrawIndicator()
{
    if (!TIndicator)
    {
        Particles.TargetIndicator = Particles.CreateParticle("particles/ui_mouseactions/range_finder_tower_aoe.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW , GetClosesToMouse());
        Particles.SetParticleControl(Particles.TargetIndicator, 2, [Me[0], Me[1], Me[2]]);
        Particles.SetParticleControl(Particles.TargetIndicator, 6, [1, 0, 0]);
        Particles.SetParticleControl(Particles.TargetIndicator, 7, [GetClosesToMouse()[0], GetClosesToMouse()[1], GetClosesToMouse()[2]]);
        TIndicator = true;
    }
    else
    {
        Particles.DestroyParticleEffect( Particles.TargetIndicator, false );
        TIndicator = false;
    }
}