<html>
  <head>
    <title>Phaser Einführung</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel=stylesheet href=index.css>
    <link href='https://fonts.googleapis.com/css?family=Ubuntu:400,300' rel='stylesheet' type='text/css'>
    <script src="phaser.min.js"></script> 
  </head>
  <body>
    <span class=header> Phaser HTML5 Framework - Version 2.6.2 </span>
    <div id=stuff>
        <div class=main><a href="http://phaser.io/examples" target=blank> Phaser Examples </a></div>
        <div class=main><a href="http://phaser.io/docs/2.6.2/index" target=blank> Phaser Documentation </a></div>
        <div class=main><a href="http://phaser.io/learn/chains" target=blank> Phaser Docs Search </a></div>
        <div class="last main"><a href="http://www.html5gamedevs.com/forum/14-phaser/" target=blank> Phaser Game Devs </a></div>
    </div>
    <div id=preview name=preview ></div>
    <script type="text/javascript">




    
    
angle = 0; 
nextFire = 0;
fireRate = 200; 
gamestate = ""; 
var enemies = "";  
var timer = 0;
var fadeoutSprite;
var level = 0;  


var BootState = {
    preload: function() {
        game.load.image('loaderFull', 'assets/loaderfull.png');
        game.load.image('loaderEmpty', 'assets/loaderempty.png');
    },
    create: function() {
        game.state.start('preload');
    }
}
    
    
    
    
    
    

var PreloadState = {
    preload: function() {
        loaderEmpty = game.add.sprite(0, 0, 'loaderEmpty');
        loaderFull = game.add.sprite(0, 0, 'loaderFull');
        
        game.load.setPreloadSprite(loaderFull);
        
        
        game.load.bitmapFont('desyrel', 'assets/font1.png', 'assets/font1.xml');
        game.load.spritesheet('menucorner','./assets/menucorner.png',64,64);
        game.load.image('platform', 'assets/cloud-platform.png');
       
        game.load.image('clouds', './assets/clouds.jpg');
        game.load.image('darkgreen', './assets/darkgreen.png');
        game.load.image('green', './assets/green.png');
        game.load.spritesheet('mario', './assets/mariospritesheet1.png',50,50); 
        game.load.spritesheet('mario1', './assets/msprites.png',64,64); 
        game.load.image('fireball', './assets/fireball-small.png');
        game.load.image('bullet', './assets/bullet.png');
        game.load.spritesheet('bricks','./assets/bricks.png',32,32);
        game.load.audio('fireball', 'assets/fireball.ogg');
        game.load.spritesheet('gomba', 'assets/gomba-spritesheet.png', 64, 64);
        game.load.image('circlemask', 'assets/circlemask.png');
        game.load.spritesheet('levelbutton', 'assets/levelbutton.png', 64, 64);
        game.load.image('smoke', 'assets/smoke.png');
        game.load.image('smoke1', 'assets/smoke1.png');
        game.load.image('smoke2', 'assets/smoke2.png');
        game.load.image('smoke3', 'assets/smoke3.png');
        game.load.image('smoke4', 'assets/smoke4.png'); 
        game.load.audio('jump', 'assets/jump.ogg');
        game.load.tilemap('level1', './assets/level1.json',null, Phaser.Tilemap.TILED_JSON); 
        game.load.tilemap('level2', './assets/level2.json',null, Phaser.Tilemap.TILED_JSON); 
        game.load.image('tileset', './assets/tileset.png');
        game.load.image('ice-terrain', './assets/ice-terrain.png');
        
    },
    create: function() {
        var tween1=game.add.tween(loaderFull).to({alpha:"-30"},1000,Phaser.Easing.Linear.None);
        var tween2=game.add.tween(loaderEmpty).to({alpha:0},1000,Phaser.Easing.Linear.None,true);
        
        tween1.start()
        tween2.onComplete.addOnce( function(){  game.state.start('menu');     }   );
        
    }
}
    
    
    
    
    
    
    
    
var MenuState = {
    create: function () {
        sky = game.add.tileSprite(0, 0,game.world.width,game.world.height, 'clouds');

        var button = game.add.button(100, 100, 'levelbutton', function(){ 
            game.state.start('level1');}, this, 0, 0, 0);
        button.anchor.setTo(0.5,0.5);
        var number = game.add.bitmapText(button.x, button.y, 'desyrel','1', 34);
        number.anchor.setTo(0.5,0.5);
        
        var button = game.add.button(200, 100, 'levelbutton', function(){ 
            game.state.start('level2');}, this, 0, 0, 0);
        button.anchor.setTo(0.5,0.5);
        var number = game.add.bitmapText(button.x, button.y, 'desyrel','2', 34);
        number.anchor.setTo(0.5,0.5);
        
        
    },
    update: function() {

    }
}

var Level1 = {
    create: function() {
        gamestate = "running";
        setupPhysics();
        setupMap("level1");
        createObjects()
        createEmitters()
        createPlayer()
        createGroups()
        createInput();
    },
    update: function() {
        gameUpdateLoop()
    }
}



var Level2 = {
    create: function() {
        gamestate = "running";
        setupPhysics();
        setupMap("level2");
        createObjects()
        createEmitters()
        createPlayer()
        createGroups()
        createInput();
    },
    update: function() {
        gameUpdateLoop()
    }
}



var game = new Phaser.Game(800, 480, Phaser.AUTO, 'preview');
game.state.add('boot', BootState, true);
game.state.add('preload', PreloadState, false);
game.state.add('menu', MenuState, false);
game.state.add('level1', Level1, false);  
game.state.add('level2', Level2, false);  

























function gameUpdateLoop(){
        if ( gamestate == "lost"){
            mario.frame=7;
        }
        else if (gamestate == 'running'){
            if ( cursors.left.isDown ) { 
                mario.body.moveLeft(300); 
                mario.scale.x = 1;
                mario.animations.play('walk');
            }
            else if ( cursors.right.isDown ) { 
                mario.body.moveRight(300);
                mario.scale.x = -1;
                mario.animations.play('walk');
            }
            else if (fireKey.isDown){
                mario.frame=8;
            } 
            else {
                mario.frame=0;
            } 
            
            
            if ( fireKey.isDown ) {
                mario.frame=8;
            } 
            else if ( jumpKey.isDown && !touching(mario, 'down') ) {
                mario.frame=6;
            } 
            
            enemies.forEach(moveAliveEnemy,this);
        }
        else if (gamestate == 'win'){ fadeOut();}
        
}











function createPlayer(){
    mario = game.add.sprite(100, 840, 'mario1');
    game.physics.p2.enable(mario,false);
    mario.body.fixedRotation=true;
    mario.body.clearShapes();
    mario.body.addCapsule(19, 12, 0, 4, game.math.degToRad(90)) 
    mario.animations.add('walk', [0,1,2,1,0,3,4,5,4,3], 16, true);
    mario.body.setCollisionGroup(playerCG);
    mario.body.collides([groundCG,enemyCG,finishlineCG]);
    mario.body.setMaterial(playerMaterial);
    mario.body.createGroupCallback(enemyCG, marioHit);
    mario.body.createGroupCallback(finishlineCG, finishWorld);

        


}


function createGroups(){
    fireballs = game.add.group();
    fireballs.createMultiple(20, 'fireball', 0, false);  //prepopulate group
}



  //------------------------------------------//
 //           INPUT                          //
//------------------------------------------//
function createInput(){
       //input handlers
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(mario);   // camera allways center the player
        
        jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        jumpKey.onDown.add(jump, this);
        
        fireKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
        fireKey.onDown.add(fire_now, this);
        
        
        button = game.add.button(game.camera.width-64,0, 'menucorner', function(){game.state.start('menu',true,false);}, this, 0, 1, 1);
        button.fixedToCamera=true;
        
}




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
 //           PHYSICS                        //
//------------------------------------------//
function setupPhysics(){
        //create physics 
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.friction = 1;
       
        game.physics.p2.setImpactEvents(true);
        
        //create collisiongroups
        playerCG = game.physics.p2.createCollisionGroup();
        groundCG = game.physics.p2.createCollisionGroup();
        enemyCG = game.physics.p2.createCollisionGroup();
        fireballCG = game.physics.p2.createCollisionGroup();
        finishlineCG = game.physics.p2.createCollisionGroup();
       
        //create materials
        groundMaterial = game.physics.p2.createMaterial();
        playerMaterial = game.physics.p2.createMaterial();
        iceMaterial = game.physics.p2.createMaterial();
        fireballMaterial = game.physics.p2.createMaterial();

        //define how materials behave
        game.physics.p2.createContactMaterial(playerMaterial, groundMaterial, { friction: 2  }); 
        game.physics.p2.createContactMaterial(playerMaterial, iceMaterial, { friction: 0.1 }); 
        game.physics.p2.createContactMaterial(fireballMaterial, groundMaterial, { friction: 0.5 , restitution: 0.6 });
        game.physics.p2.createContactMaterial(fireballMaterial, iceMaterial, { friction: 0.3 , restitution: 1 });

        
        game.physics.p2.setWorldMaterial(iceMaterial, true, true, true, true);
        //game.physics.p2.updateBoundsCollisionGroup();
        

}


  //------------------------------------------//
 //           EMITTERS                       //
//------------------------------------------//

function createEmitters(){
    smokeemitter = game.add.emitter(0, 0, 20);
    smokeemitter.makeParticles(['smoke','smoke1','smoke2','smoke3']);
                    //(anfangswert,endwert,zeitdauer,annäherungsart)
    smokeemitter.setAlpha(1, 0,2500,Phaser.Easing.Quintic.Out);
    smokeemitter.setScale(0.5, 1, 0.5, 1, 2500, Phaser.Easing.Quintic.Out);
    smokeemitter.setRotation(0,0);
    smokeemitter.gravity = 0;
}



  //------------------------------------------//
 //           MAPS                           //
//------------------------------------------//
function setupMap(level){
    clouds = game.add.tileSprite(0, 0, 4800, 960, 'clouds');
    clouds.fixedToCamera=true;
    green = game.add.tileSprite(0, 480, 4800, 960, 'green');
    darkgreen = game.add.tileSprite(0,480, 4800, 960, 'darkgreen');


    mymap = game.add.tilemap(level);
    mymap.addTilesetImage('tileset');
    mymap.addTilesetImage('ice-terrain');
     
    layer_background = mymap.createLayer('background');
    layer_floor = mymap.createLayer('floor');
    layer_enemy = mymap.createLayer('enemy');
    polyline_bodies = game.physics.p2.convertCollisionObjects(mymap,"polylines");
    layer_background.resizeWorld();
    mymap.setCollisionByExclusion([0],true, 'enemy');
    mymap.setCollisionByExclusion([0],true, 'floor'); 
    
    layer_floor_bodies = game.physics.p2.convertTilemap(mymap, layer_floor);

    for (i=0; i<layer_floor_bodies.length; i++){
            layer_floor_bodies[i].setMaterial(groundMaterial);
            layer_floor_bodies[i].setCollisionGroup(groundCG);
            layer_floor_bodies[i].collides([playerCG,enemyCG,fireballCG]);
    }
    for (i=0; i<polyline_bodies.length; i++){
            polyline_bodies[i].setMaterial(iceMaterial);
            polyline_bodies[i].setCollisionGroup(groundCG);
            polyline_bodies[i].collides([playerCG,enemyCG,fireballCG]);
    }
}















  //------------------------------------------//
 //           OBJECTS                        //
//------------------------------------------//

function createObjects(){
    enemies = game.add.group(); 
    enemies.name='enemies';
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.P2JS;
   
    mymap.createFromObjects('polylines', 5142, 'bullet',0, true, false, enemies);
    enemies.forEach(setupEnemies,this);
    
    mymap.createFromObjects('polylines', 5144, 'gomba',1, true, false, enemies);
    enemies.forEach(setupEnemies,this);
    
    finishlines = game.add.group();
     mymap.createFromObjects('polylines', 5141, 'bricks',4, true, false, finishlines);
    finishlines.forEach(setupFinishline,this);
    
    
    movingplatforms = game.add.group(); 
    mymap.createFromObjects('polylines', 5145, 'platform', 0, true, false, movingplatforms);
    movingplatforms.forEach(setupMovingPlatforms,this);
    
}




function setupMovingPlatforms(platform){
    game.physics.p2.enable(platform);
    platform.body.y += 16;  // enabling physics changes the anchor to 0.5, 0.5
    platform.body.x += 64;
   // platform.body.setRectangle(platform.width,8,0,-12);
    platform.body.kinematic=true;
    platform.body.setCollisionGroup(groundCG);
    platform.body.collides([playerCG,fireballCG,enemyCG]);
    platform.body.setMaterial(groundMaterial);
    //to(properties, duration, ease, autoStart, delay, repeat, yoyo)
    delay = game.rnd.integerInRange(0,2000);
    game.add.tween(platform.body).to({y:"-200"},2000,Phaser.Easing.Sinusoidal.InOut, true, delay, -1, true); 

}








function setupFinishline(finishline){
    game.physics.p2.enable(finishline); 
    finishline.body.y += 32;  // we are replacing one tile with 4 so we need to adjust the position here
    finishline.body.x += 16;
   
    finishline.body.data.gravityScale=0;
    finishline.body.static=true;
    finishline.body.fixedRotation=true;
    finishline.body.setCollisionGroup(finishlineCG);
    finishline.body.collides([playerCG,groundCG]);
 
}

function setupEnemies(enemy){
    if (enemy.key == 'gomba'){
        enemy.name = 'gomba'
        enemy.scale.setTo(0.6,0.6);
        enemy.animations.add('walk', [0,1,2,3,4,3,2,1], 10, true);
        enemy.animations.play('walk');
        enemy.body.setCircle(16);
        enemy.body.y += 26
        enemy.velo=100;
    }else if  (enemy.key == 'bullet'){
        enemy.body.static = true;
        enemy.name = "bullet";
        enemy.body.setCircle(12);
        enemy.body.y += 16 // just a little positioning correction
    }
    enemy.health=10; 
    enemy.body.fixedRotation=true;
    enemy.body.allowSleep=true;
    enemy.body.setCollisionGroup(enemyCG);
    enemy.body.collides([playerCG,fireballCG,groundCG]);
}











  //------------------------------------------//
 //           MOVE ENEMIES                   //
//------------------------------------------//

function moveAliveEnemy(enemy) { 
        if (enemy.name == "gomba"){
            if (touching(enemy, 'left') || touching(enemy,'right')){
            enemy.body.velocity.x = enemy.velo; 
            enemy.velo *= -1;
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











// event listener erhält sprite.body als collisions "object"
function marioHit(object){
    if (object && object.sprite.name == "enemy"){
            console.log('dawischt !!!')
            game.state.restart();
    
    }

}



function marioHit(playerbody,enemybody){
        
        console.flog('ibinabug')
        
        if (touching(enemybody.sprite,'up')  ){
            enemybody.reset(game.camera.x+game.camera.width,Math.random()*game.world.height-40);
            enemybody.setCollisionGroup(enemyCG);
            enemybody.collides([playerCG,fireballCG]);
        }
        else {
            console.log('dawischt !!!')
            gamestate = "lost";
            playerbody.setZeroVelocity();
            playerbody.clearCollision(true,true);
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









</script>
  </body>
</html>
