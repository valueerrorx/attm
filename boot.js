 
var BootState = {
    preload: function() {
        game.load.image('loaderFull', 'assets/loaderfull.png');
        game.load.image('loaderEmpty', 'assets/loaderempty.png');
    },
    create: function() {

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        
        game.state.start('preload');
 
    }
}
    
    
