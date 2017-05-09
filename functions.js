
 
 
 
 
 
 
 
 
 
 
 
 
  //------------------------------------------//
 //           JUMP                           //
//------------------------------------------//

var jumpHeightCounter = 0 ;
function jump(){
    mario.frame=5; 
     
    if (touching(mario,'down')){
        mario.body.velocity.y = -800;
        game.sound.play('jump');
        jumpHeightCounter = 1;
    }
    else if (jumpHeightCounter == 1){
        game.sound.play('jump');
        mario.body.moveUp(700);
        jumpHeightCounter = 0;
        smokeemitter.x = mario.x;
        smokeemitter.y = mario.y;
        smokeemitter.explode(1400, 6);
    }

}

 
 
 
 
 
 
 
 

  //------------------------------------------//
 //           MOVE ENEMIES                   //
//------------------------------------------//

function moveAliveEnemy(enemy) { 
        if (enemy.name == "gomba"){
            if (touching(enemy, 'left') || touching(enemy,'right')){
            enemy.body.velocity.x = enemy.velo; 
            enemy.velo *= -1;
            enemy.body.x += 10 * Math.sign(enemy.velo)
            enemy.scale.x *=-1; } //set "back" schildi a few pixels to not fire touchingLeft/Right again and turn speed around
            enemy.body.velocity.x=enemy.velo;
         }
        else if (enemy.name == "bullet"){ 
            enemy.body.moveLeft(200);   
            if (enemy.body.x < game.camera.x){
            
                enemy.body.x=game.camera.x+game.camera.width
                enemy.body.y=Math.random()*game.world.height-40;
                enemy.body.angle=0;
            }
//             movetotarget(enemy, mario, 50);
        }
        else {
            // there are no other enemies atm
        }
}

function movetotarget(object, target, speed){
    var angletoplayer = Math.atan2(target.y - object.y, target.x - object.x);
    object.body.rotation = angletoplayer+ game.math.degToRad(180);
    object.body.velocity.x = Math.cos(angletoplayer) * speed;    // accelerateToObject 
    object.body.velocity.y = Math.sin(angletoplayer) * speed;

}
 
 
 
 
  //------------------------------------------//
 //           FIRE                           //
//------------------------------------------//
function fire_now() {
    if (game.time.now > nextFire ){
        nextFire = game.time.now + fireRate;
        var fireball = fireballs.getFirstExists(false);
        if (fireball){
            game.sound.play('fireball');
            fireball.exists = true;
            fireball.lifespan=3500;  //kill after 2500 ms
            game.physics.p2.enable(fireball);
            fireball.body.setCircle(6);
            fireball.body.setCollisionGroup(fireballCG);
            fireball.body.setMaterial(fireballMaterial);
            fireball.body.collides([playerCG,enemyCG,groundCG]);
            fireball.body.onBeginContact.add(fireballCollision, fireball);
            
            fireball.reset(mario.x, mario.y);
            
            if (mario.scale.x < 0){
                fireball.body.velocity.x = 800;
                fireball.body.velocity.y = -220;
            }
            else{
                fireball.body.velocity.x = -800;
                fireball.body.velocity.y = -220;
            }
        }
    }
}


 
 
 
 
 
function fireballCollision(object1){
    console.log('fireball touched something')
    fireball=this;   // we send fireball instead of this in the onBeginContact function and here fireball is accessable as this
    if (object1 && object1.sprite && object1.sprite.parent == enemies) {   //if the hit body is a sprite and belongs to enemies
//         killEnemy(object1,fireball.body);
        smokeemitter.x = object1.x;
        smokeemitter.y = object1.y;
        smokeemitter.explode(1400, 2);
        object1.sprite.kill();
        fireball.kill();
    }
} 





function killEnemy(enemy,fireball) {
    if (fireball){fireball.sprite.kill(); }
    if (enemy.sprite.name == "gomba"){  enemy.moveUp(20);
        enemy.angularVelocity=40;
        enemy.clearCollision(true,true);
        enemy.data.gravityScale=1;
        enemy.sprite.animations.stop();
        enemy.sprite.loadTexture('gomba', 5);
    }
    else {
        enemy.sprite.kill();
    }
    
}

 
 
 
 
 
 
 
 
 
function marioHit(playerbody,enemybody){

        if (touching(enemybody.sprite,'up')  ){
            enemybody.reset(game.camera.x+game.camera.width,Math.random()*game.world.height-40);
            enemybody.setCollisionGroup(enemyCG);
            enemybody.collides([playerCG,fireballCG]);
        }
        else {
            game.sound.play('dying');
            playerbody.clearCollision(true,true);

            music.stop();

            gamestate = "lost";
            playerbody.setZeroVelocity();
            playerbody.data.gravityScale = 1;
            
            
            tween1 = game.add.tween(playerbody);
                tween1.to({ y:"-50"}, 600, Phaser.Easing.Linear.None);
                tween1.to({ y:"700"}, 600, Phaser.Easing.Linear.None);
                tween1.start();
                game.time.events.add(Phaser.Timer.SECOND * 2,function(){game.state.restart(); } , this).autoDestroy = true;
        }


}




 
 
 
 
   //------------------------------------------//
 //           FINISH                         //
//------------------------------------------//
function finishWorld(player,finish) {  // level finished
    if (gamestate != 'win'){
        if (finish){    finish.sprite.kill();}
        gamestate = "win";
        
             
        fadeoutSprite=game.add.image(player.x, player.y, 'circlemask');
        fadeoutSprite.anchor.setTo(0.5,0.5);
        fadeoutSprite.scale.setTo(4,4);
        fadeoutSprite.alpha=0;
        timer = 0;

        player.sprite.animations.stop();
        player.static=true;  //make it static
        player.clearCollision(true,true);
        player.setZeroVelocity();
       
        var first=game.add.tween(player.sprite).to({angle : 360}, 5000).start().onComplete.add(wingame, this);; //animate player movements
        }
}


 
 
 
 
 
 
 
 
 
 
 
function wingame(){
 console.log('restart');
    game.state.start("menu");
   
}


function fadeOut(){
    timer += 0.01;
    fadeoutSprite.alpha += timer*0.001;
    if (fadeoutSprite.scale.x >1){
        fadeoutSprite.scale.x = fadeoutSprite.scale.y  = 4 + timer * -1;
    }
}



function touching(someone, where) {
    if ( where=="up" || where=="down" ){ var Axis = p2.vec2.fromValues(0, 1); }
    else                               { var Axis = p2.vec2.fromValues(1, 0); }
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];  // cycles through all the contactEquations until it finds our "someone"
        if (c.bodyA === someone.body.data || c.bodyB === someone.body.data)        {
            var d = p2.vec2.dot(c.normalA, Axis); // Normal dot Y-axis
            if (c.bodyA === someone.body.data) d *= -1;
            if (where=="down" || where=="right") { if (d > 0.5) result = true; }
            else                                 { if (d < -0.5) result = true; }
        }
    } return result;
}


