(function() {

    var Game = window.Game = function(canvas) {
        this._te = new TEngine(canvas);
        if (window.location.hash == '#no-loader') {
            this.start();
        } else {
            this._te.startLoaderEffect('uncle', () => {
                this.start();
            });
        }
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

    Game.prototype.start = function() {
        this._drawLogo();
        this._drawUncle(10, 9);
    }

    Game.prototype.stop = function() {

    }

})();
