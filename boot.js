 
var BootState = {
    preload: function() {
        game.load.image('loaderFull', 'assets/loaderfull.png');
        game.load.image('loaderEmpty', 'assets/loaderempty.png');
    },
    create: function() {
        game.state.start('preload');
        
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 
    }
}
    
    
