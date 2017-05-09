
  //------------------------------------------//
 //           PLAYER                         //
//------------------------------------------//
 
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





function gofull() {
  if (game.scale.isFullScreen) {
    game.scale.stopFullScreen();
  } else {
    game.scale.startFullScreen(false);
  }
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
 //           PHYSICS                        //
//------------------------------------------//
function setupPhysics(){
        //create physics 
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 2000;
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
 //           MAPS                           //
//------------------------------------------//
function setupMap(level){
    clouds = game.add.tileSprite(0, 0, 4800, 960, 'clouds');
    clouds.fixedToCamera=true;
    green = game.add.tileSprite(0, 480, 4800, 960, 'green');
    darkgreen = game.add.tileSprite(0,480, 4800, 960, 'darkgreen');

    music = game.add.audio('theme');
    music.play();

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



    












