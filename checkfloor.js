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
            else                                 { if (d < 0.5) result = true; }
        }
    } return result;
}
