(function() {

    var Game = window.Game = function(canvas) {
        this._te = new TEngine(canvas);
        // canvas.style.cursor = 'none';
        if (window.location.hash == '#no-loader') {
            this._registerEventListeners(canvas);
            this.start();
        } else {
            this._te.startLoaderEffect('uncle', () => {
                this._registerEventListeners(canvas);
                this.start();
            });
        }
    }

    Game.LASER_POWER_MAX = 69;
    Game.LASER_POWER_REGEN = 0.60;
    Game.AREA_MIN_X = 23;
    Game.AREA_MIN_Y = 6;

    Game.prototype._laserRegeneration = function(l, p) {
        return l + (Math.pow(0.9*p - 0.9, 7) + 1)*0.55;
    }

    Game.prototype._registerEventListeners = function(canvas) {
        var addEv = function(el, ev, fn) {
            ev.forEach((v) => { el.addEventListener(v, fn); });
        }
        addEv(canvas, ['mousemove', 'touchmove'], (e) => {
            var bound = canvas.getBoundingClientRect();
            var p = e;
            if (e.type == 'touchmove') {
                p = e.targetTouches[0];
            }
            this._drawPointer(Math.floor(80*(p.clientX - bound.left)/canvas.width), Math.floor(30*(p.clientY - bound.top)/canvas.height));
        });
        addEv(canvas, ['mousedown', 'touchstart'], (e) => {
            this._firing = true;
        });
        addEv(document, ['mouseup', 'touchend'], (e) => {
            this._firing = false;
        });
    }

    Game.prototype._drawPixelArt = function(data, x, y) {
        data.replace(/^\n|\n$/g, '').split('\n').forEach((line, i) => {
            this._te.drawText(line
                .replace(/#/g, '\xdb').replace(/_/g, '\xdc')
                .replace(/\[/g, '\xdd').replace(/\]/g, '\xde')
                .replace(/-/g, '\xdf')
            , x, y + i);
        });
    }

    Game.prototype._drawLogo = function() {
        var logo = `
____ _ _   _ ____ _  _ _ ____   _   _ ____ ____ _ ____   _  _ _  _ ____ _   ____
#    # ## ## #  # #-_# - #      ## ## #  # #    # #      #  # #-_# #    #   #
---# # # # # #  # #  #   ---#   # # # #--# #  _ # #      #  # #  # #    #   #---
___# # #   # #__# #  #   ___#   #   # #  # #__# # #___   #__# #  # #___ #__ #___
`;
        this._te.setColors(7, 0);
        this._drawPixelArt(logo, 0, 0);
        this._te.drawText('.com', 76, 4);
    }

    Game.prototype._drawUncle = function(x, y) {
        var uncle = `
     ###
    #####
    #o#o#
    #####
    #---#
 __  ###  __
#############
#####.#.#####
##  #####  ##
##  #####  ##
##  #####  ##
    #####
   ##[ ]##
   ##[ ]##
   ##[ ]##
   ##[ ]##
   ##[ ]##
`;
        this._te.setColors(TEngine.COLOR_BRIGHT_MAGENTA, TEngine.COLOR_BLACK);
        this._drawPixelArt(uncle, x, y);
        // hair
        this._te.setColors(TEngine.COLOR_YELLOW, TEngine.COLOR_BRIGHT_MAGENTA);
        this._te.drawText('\xb1\xb1\xb1', x + 5, y);
        this._te.drawText('\xb0', x + 4, y + 1);
        this._te.drawText('\xb0', x + 8, y + 1);
        // face and nips
        this._te.setColors(TEngine.BLACK, TEngine.COLOR_BRIGHT_MAGENTA);
        this._te.drawText('\x07', x + 5, y + 2);
        this._te.drawText('\x07', x + 7, y + 2);
        this._te.drawText('\xa8', x + 6, y + 3);
        this._te.drawText('\xdf\xdf\xdf', x + 5, y + 4);
        this._te.drawText('.', x + 5, y + 7);
        this._te.drawText('.', x + 7, y + 7);
    }

    Game.prototype._drawPointer = function(x, y) {
        if (x >= Game.AREA_MIN_X && y >= Game.AREA_MIN_Y) {
            this._te.setColors(TEngine.COLOR_WHITE, TEngine.COLOR_BLACK);
            this._te.clearRectangle(this._pointerX, this._pointerY, 1, 1);
            this._te.drawText('\xc5', x, y);
            this._pointerX = x;
            this._pointerY = y;
        }
    }

    Game.prototype._step = function() {
        // update eyes
        if (this._firing) {
            this._te.setColors(TEngine.COLOR_BRIGHT_RED, TEngine.COLOR_BRIGHT_MAGENTA);
        } else {
            this._te.setColors(TEngine.COLOR_BLACK, TEngine.COLOR_BRIGHT_MAGENTA);
        }
        this._te.drawText('\x07', 10 + 5, 9 + 2);
        this._te.drawText('\x07', 10 + 7, 9 + 2);

        // update lasers
        this._te.setColors(TEngine.COLOR_BRIGHT_RED, TEngine.COLOR_BLACK);
        if (this._firing && this._laserPower > 1) {
            this._lasers.push(new Game.Laser(this));
            this._laserPower--;
        }
        for (var i = 0, l = this._lasers.length; i < l; i++) {
            if (this._lasers[i].step()) {
                this._lasers.splice(i--, 1);
                l--;
            }
        }

        // update arrows
        this._te.setColors(TEngine.COLOR_BRIGHT_WHITE, TEngine.COLOR_BLACK);
        if (Math.random() < this._arrowSpawnChance) {
            this._arrows.push(new Game.Arrow(this));
        }
        for (var i = 0, l = this._arrows.length; i < l; i++) {
            if (this._arrows[i].step()) {
                this._arrows.splice(i--, 1);
                l--;
            }
        }

        // update arrow spawn chance
        if (this._arrowSpawnChance < 0.25) {
            this._arrowSpawnChance += 0.0002;
        }

        // draw score
        this._te.drawText(this._score.toString(), 7, 7);

        // draw laser power
        this._te.setColors(TEngine.COLOR_BRIGHT_RED, TEngine.COLOR_BLACK);
        var p = this._laserPower/Game.LASER_POWER_MAX;
        this._te.clearRectangle(7, 5, 73, 1);
        this._te.drawRectangle(7, 5, Math.round(66*p), 1);
        this._te.drawText(Math.floor(this._laserPower).toString(), 74, 5);
        this._laserPower = Math.min(Game.LASER_POWER_MAX, this._laserRegeneration(this._laserPower, p));
    }

    Game.prototype.start = function() {
        this._pointerX = 79;
        this._pointerY = 29;
        this._arrowSpawnChance = 0.05;
        this._score = 0;
        this._firing = false;
        this._laserPower = Game.LASER_POWER_MAX;
        this._lasers = [];
        this._arrows = [];
        this._drawLogo();
        this._drawUncle(10, 9);
        this._te.setColors(TEngine.COLOR_WHITE, TEngine.COLOR_BLACK);
        this._te.drawText('POWER:', 0, 5);
        this._te.drawText('SCORE: 0', 0, 7);
        this._interval = setInterval(() => {
            this._step();
        }, 50);
    }

    Game.prototype.stop = function() {
        clearInterval(this._interval);
    }

    // Game.Arrow

    Game.Arrow = function(game) {
        this._game = game;
        this._x = 79;
        this._y = Game.Arrow.MIN_Y + Math.floor((Game.Arrow.MAX_Y - Game.Arrow.MIN_Y)*Math.random());
        this._xf = this._x;
    }

    Game.Arrow.MIN_Y = 9;
    Game.Arrow.MAX_Y = 26;

    Game.Arrow.prototype.step = function() {
        // clear
        this._game._te.clearRectangle(this._x, this._y, 5, 1);
        // update
        this._xf -= 0.5;
        this._x = Math.floor(this._xf);
        // test boundary
        if (this._x < 0) {
            return true;
        }
        // draw
        this._game._te.drawText('<--<', this._x, this._y);
    }

    Game.Arrow.prototype.destroy = function() {
        this._game._te.clearRectangle(this._x, this._y, 5, 1);
    }

    // Game.Laser

    Game.Laser = function(game) {
        this._game = game;
        this._x = Game.Laser.START_X;
        this._y = Game.Laser.START_Y;
        this._xf = this._x;
        this._yf = this._y;

        // calculate angle
        var a = Math.atan2(this._game._pointerY - this._y, this._game._pointerX - this._x);
        this._speedX = Math.cos(a);
        this._speedY = Math.sin(a);
        if (Math.abs(a) > Math.PI/4) {
            this._c = '|';
        } else if (a > Math.PI/16) {
            this._c = '\\';
        } else if (a < -Math.PI/16) {
            this._c = '/';
        } else{
            this._c = '\x16';
        }

        this._game._te.drawText(this._c, this._x, this._y);
    }

    Game.Laser.START_X = 19;
    Game.Laser.START_Y = 11;

    Game.Laser.prototype.step = function() {
        // test collision with arrow
        var hit = false;
        for (var i = 0, l = this._game._arrows.length; i < l; i++) {
            var arr = this._game._arrows[i];
            if ((this._x == arr._x || this._x == arr._x + 1 || this._x == arr._x + 2) && this._y == arr._y) {
                this.destroy();
                arr.destroy();
                this._game._arrows.splice(i--, 1);
                l--;
                hit = true;
                this._game._score++;
            }
        }
        if (hit) {
            return true;
        }
        // clear
        this._game._te.clearRectangle(this._x, this._y, 1, 1);
        // update
        this._xf += this._speedX;
        this._yf += this._speedY;
        this._x = Math.round(this._xf);
        this._y = Math.round(this._yf);
        // test boundary
        if (this._x < Game.START_X || this._y < Game.AREA_MIN_Y || this._x > 79 || this._y > 29) {
            return true;
        }
        // draw
        this._game._te.drawText(this._c, this._x, this._y);
    }

    Game.Laser.prototype.destroy = function() {
        this._game._te.clearRectangle(this._x, this._y, 1, 1);
    }

})();
