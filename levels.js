 

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
        maptheme.stop();
        
       if (music && music.isPlaying) {}
        else {
            music = game.add.audio('theme');
            music.play();
         };
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
        maptheme.stop();
        
        
        
        if (music && music.isPlaying) {}
        else {
            music = game.add.audio('theme');
            music.play();
         };
        
    },
    update: function() {
        gameUpdateLoop()
    }
}



var Level3 = {
    create: function() {
        gamestate = "running";
        setupPhysics();
        setupMap("level3");
        createObjects()
        createEmitters()
        createPlayer()
        createGroups()
        createInput();
        maptheme.stop();
        
         if (music && music.isPlaying) {}
        else {
            music = game.add.audio('theme');
            music.play();
         };
    },
    update: function() {
        gameUpdateLoop()
    }
}

