








var game = new Phaser.Game(800, 480, Phaser.AUTO, 'preview');

game.state.add('boot', BootState, true);
game.state.add('preload', PreloadState, false);
game.state.add('menu', MenuState, false);
game.state.add('level1', Level1, false);  
game.state.add('level2', Level2, false);  
game.state.add('level3', Level3, false);









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

            if(mario && mario.body && mario.body.y > game.world.height){
                mario.destroy();
                gamestate = "lost"
                setTimeout(function() {
                    game.state.restart();
                }, 2*1000);
            }
            
            enemies.forEach(moveAliveEnemy,this);
        }
        else if (gamestate == 'win'){ fadeOut();}
        
}
