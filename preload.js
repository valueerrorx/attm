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
        game.load.audio('dying', 'assets/lose.ogg');
        game.load.spritesheet('gomba', 'assets/gomba-spritesheet.png', 64, 64);
        game.load.image('circlemask', 'assets/circlemask.png');
        game.load.spritesheet('levelbutton', 'assets/levelbutton.png', 64, 64);
        game.load.image('smoke', 'assets/smoke.png');
        game.load.image('smoke1', 'assets/smoke1.png');
        game.load.image('smoke2', 'assets/smoke2.png');
        game.load.image('smoke3', 'assets/smoke3.png');
        game.load.image('smoke4', 'assets/smoke4.png'); 
        game.load.audio('jump', 'assets/jump.ogg');
        game.load.audio('theme', 'assets/mariotheme.ogg');
        game.load.audio('stageclear', 'assets/stageclear.ogg');
        game.load.audio('mapsound', 'assets/map2.ogg');
        game.load.tilemap('level1', './assets/level1.json',null, Phaser.Tilemap.TILED_JSON); 
        game.load.tilemap('level2', './assets/level2.json',null, Phaser.Tilemap.TILED_JSON); 
        game.load.tilemap('level3','./assets/level3.json',null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', './assets/tileset.png');
        game.load.image('ice-terrain', './assets/ice-terrain.png');
        game.load.image('startbildschirm', './assets/startbildschirm.png');
        
        game.load.spritesheet('buttonhorizontal','./assets/buttons-big/button-horizontal.png', 96, 64);
        game.load.spritesheet('buttonfire','./assets/buttons-big/button-circle-f.png', 96, 96);
        game.load.spritesheet('buttonjump','./assets/buttons-big/button-circle-j.png', 96, 96);
        game.load.spritesheet('buttonanchor','./assets/buttons-big/button-circle-a.png', 96, 96);
    },
    create: function() {
        var tween1=game.add.tween(loaderFull).to({alpha:"-30"},1000,Phaser.Easing.Linear.None);
        var tween2=game.add.tween(loaderEmpty).to({alpha:0},1000,Phaser.Easing.Linear.None,true);
        
        tween1.start()
        tween2.onComplete.addOnce( function(){  game.state.start('menu');     }   );

        game.input.onDown.addOnce(gofull);
        
    }
}
    
    
