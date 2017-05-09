 
    
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
        
              
        var button = game.add.button(300, 100, 'levelbutton', function(){ 
            game.state.start('level3');}, this, 0, 0, 0);
        button.anchor.setTo(0.5,0.5);
        var number = game.add.bitmapText(button.x, button.y, 'desyrel','3', 34);
        number.anchor.setTo(0.5,0.5);
        
        startbildschirm = game.add.sprite(535,300, 'startbildschirm'); //Schriftzug der auf und ab geht im Hauptmenü
        startbildschirm.scale.setTo(0.2); 
        game.add.tween(startbildschirm).to({y: "-80"}, 2000, Phaser.Easing.Cubic.InOut, true, 0, false, true);
        
        game.input.onDown.add(gofull);
         
        maptheme = game.add.sound("mapsound",1,true,true)
        maptheme.play();
    },
    update: function() {

    }
}
