








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
            if ( cursors.left.isDown || left) { 
                mario.body.moveLeft(300);
                mario.scale.x = 1;
                mario.animations.play('walk');
            }
            else if ( cursors.right.isDown || right) { 
                mario.body.moveRight(300);
                mario.scale.x = -1;
                mario.animations.play('walk');
            } else {
                 mario.animations.stop();
                 mario.frame=0;
            }

            if (fireKey.isDown || fire){
                mario.frame=8;
            } 
            else if ( (jumpKey.isDown || jump) && !touching(mario, 'down') ) {
                mario.frame=6;
            } 


            if(touching(mario, "down") == false){
                mario.body.setMaterial(iceMaterial);
            }
            else{
                mario.body.setMaterial(playerMaterial);
            }

            if(mario && mario.body && mario.body.y > game.world.height){
                mario.destroy();
                music.stop();
                game.sound.play('dying');
                gamestate = "lost";
                setTimeout(function() {
                    game.state.restart();
                }, 2700);
            }
            
            enemies.forEach(moveAliveEnemy,this);

        }
        else if (gamestate == 'win'){ fadeOut();}
        
}
