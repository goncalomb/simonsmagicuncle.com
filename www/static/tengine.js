(function (){

    // CP437.F16 from fntcol16.zip
    var FNT_WIDTH = 8;
    var FNT_HEIGHT = 16;
    var FNT_DATA = atob(`
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
AGDgYmZsGDBg3IYMGD4AAABg4GJmbBgwZs6aPwYGAAAAABgYABgYGDw8PBgAAAAAAAAAAAA2bNhs
NgAAAAAAAAAAAAAA2Gw2bNgAAAAAAAARRBFEEUQRRBFEEUQRRBFEVapVqlWqVapVqlWqVapVqt13
3Xfdd9133Xfdd9133XcYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGPgYGBgYGBgYGBgYGBgY+Bj4GBgY
GBgYGBg2NjY2NjY29jY2NjY2NjY2AAAAAAAAAP42NjY2NjY2NgAAAAAA+Bj4GBgYGBgYGBg2NjY2
NvYG9jY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NgAAAAAA/gb2NjY2NjY2NjY2NjY2NvYG/gAAAAAA
AAAANjY2NjY2Nv4AAAAAAAAAABgYGBgY+Bj4AAAAAAAAAAAAAAAAAAAA+BgYGBgYGBgYGBgYGBgY
GB8AAAAAAAAAABgYGBgYGBj/AAAAAAAAAAAAAAAAAAAA/xgYGBgYGBgYGBgYGBgYGB8YGBgYGBgY
GAAAAAAAAAD/AAAAAAAAAAAYGBgYGBgY/xgYGBgYGBgYGBgYGBgfGB8YGBgYGBgYGDY2NjY2NjY3
NjY2NjY2NjY2NjY2NjcwPwAAAAAAAAAAAAAAAAA/MDc2NjY2NjY2NjY2NjY29wD/AAAAAAAAAAAA
AAAAAP8A9zY2NjY2NjY2NjY2NjY3MDc2NjY2NjY2NgAAAAAA/wD/AAAAAAAAAAA2NjY2NvcA9zY2
NjY2NjY2GBgYGBj/AP8AAAAAAAAAADY2NjY2Njb/AAAAAAAAAAAAAAAAAP8A/xgYGBgYGBgYAAAA
AAAAAP82NjY2NjY2NjY2NjY2NjY/AAAAAAAAAAAYGBgYGB8YHwAAAAAAAAAAAAAAAAAfGB8YGBgY
GBgYGAAAAAAAAAA/NjY2NjY2NjY2NjY2NjY2/zY2NjY2NjY2GBgYGBj/GP8YGBgYGBgYGBgYGBgY
GBj4AAAAAAAAAAAAAAAAAAAAHxgYGBgYGBgY/////////////////////wAAAAAAAAD/////////
///w8PDw8PDw8PDw8PDw8PDwDw8PDw8PDw8PDw8PDw8PD/////////8AAAAAAAAAAAAAAAAAAHbc
2NjY3HYAAAAAAAB4zMzM2MzGxsbMAAAAAAAA/sbGwMDAwMDAwAAAAAAAAAAAAP5sbGxsbGwAAAAA
AAD+xmAwGBgwYMb+AAAAAAAAAAAAftjY2NjYcAAAAAAAAAAAAGZmZmZmZnxgYMAAAAAAAHbcGBgY
GBgYAAAAAAAAfhg8ZmZmZjwYfgAAAAAAADhsxsb+xsbGbDgAAAAAAAA4bMbGxmxsbGzuAAAAAAAA
HjAYDD5mZmZmPAAAAAAAAAAAAH7b29t+AAAAAAAAAAAAAwZ+29vzfmDAAAAAAAAAHDBgYHxgYGAw
HAAAAAAAAAB8xsbGxsbGxsYAAAAAAAAAAP4AAP4AAP4AAAAAAAAAAAAYGH4YGAAAfgAAAAAAAAAw
GAwGDBgwAH4AAAAAAAAADBgwYDAYDAB+AAAAAAAADhsbGBgYGBgYGBgYGBgYGBgYGBgYGBjY2Nhw
AAAAAAAAAAAYAH4AGAAAAAAAAAAAAAAAdtwAdtwAAAAAAAAAOGxsOAAAAAAAAAAAAAAAAAAAAAAA
ABgYAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAADwwMDAwM7GxsPBwAAAAAAGw2NjY2NgAAAAAAAAAA
AAA8ZgwYMn4AAAAAAAAAAAAAAAAAfn5+fn5+fgAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
`);

    var TEngine = window.TEngine = function(canvas) {
        canvas.width = 640;
        canvas.height = 480;

        // https://en.wikipedia.org/wiki/ZX_Spectrum_graphic_modes#Color_palette
        this._colors = ['#000000', '#0000D7', '#D70000', '#D700D7',
                        '#00D700', '#00D7D7', '#D7D700', '#D7D7D7',
                        '#000000', '#0000FF', '#FF0000', '#FF00FF',
                        '#00FF00', '#00FFFF', '#FFFF00', '#FFFFFF'];
        this._fgColor = this._colors[TEngine.COLOR_BRIGHT_WHITE];
        this._bgColor = this._colors[TEngine.COLOR_BLACK];

        this._ctx = canvas.getContext('2d');

        this._fntImageData = this._ctx.createImageData(16*FNT_WIDTH, 16*FNT_HEIGHT);
        var data = this._fntImageData.data;
        var i = 0;
        for (var c = 0; c < 256; c++) {
            var dx = (c%16)*FNT_WIDTH;
            var dy = Math.floor(c/16)*FNT_HEIGHT;
            var dp = 4*(this._fntImageData.width*dy + dx);
            for (var y = 0; y < FNT_HEIGHT; y++) {
                var p = dp;
                var d = FNT_DATA.charCodeAt(i);
                for (var x = 0; x < FNT_WIDTH; x++) {
                    if (d >> (7 - x) & 1) {
                        data[p] = 0;
                        data[p + 1] = 0;
                        data[p + 2] = 0;
                        data[p + 3] = 255;
                    }
                    p += 4;
                }
                dp += 4*this._fntImageData.width;
                i++;
            }
        }

        this.clear();
    }

    TEngine.COLOR_BLACK = 0;
    TEngine.COLOR_BLUE = 1;
    TEngine.COLOR_RED = 2;
    TEngine.COLOR_MAGENTA = 3;
    TEngine.COLOR_GREEN = 4;
    TEngine.COLOR_CYAN = 5;
    TEngine.COLOR_YELLOW = 6;
    TEngine.COLOR_WHITE = 7;
    TEngine.COLOR_BRIGHT_BLACK = 8;
    TEngine.COLOR_BRIGHT_BLUE = 9;
    TEngine.COLOR_BRIGHT_RED = 10;
    TEngine.COLOR_BRIGHT_MAGENTA = 11;
    TEngine.COLOR_BRIGHT_GREEN = 12;
    TEngine.COLOR_BRIGHT_CYAN = 13;
    TEngine.COLOR_BRIGHT_YELLOW = 14;
    TEngine.COLOR_BRIGHT_WHITE = 15;

    TEngine.prototype.setColors = function(fg, bg) {
        this._fgColor = this._colors[fg];
        this._bgColor = this._colors[bg];
    }

    TEngine.prototype.clear = function() {
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0, 0, FNT_WIDTH*80, FNT_HEIGHT*30);
    }

    TEngine.prototype.clearRectangle = function(x, y, w, h) {
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(x*FNT_WIDTH, y*FNT_HEIGHT, w*FNT_WIDTH, h*FNT_HEIGHT);
    }

    TEngine.prototype.drawRectangle = function(x, y, w, h) {
        this._ctx.fillStyle = this._fgColor;
        this._ctx.fillRect(x*FNT_WIDTH, y*FNT_HEIGHT, w*FNT_WIDTH, h*FNT_HEIGHT);
    }

    TEngine.prototype.drawChars = function(chars, x, y) {
        var l = chars.length;
        var w = l*FNT_WIDTH;
        var px = x*FNT_WIDTH;
        var py = y*FNT_HEIGHT;

        this._ctx.save();
        this._ctx.clearRect(px, py, w, FNT_HEIGHT);

        // draw characters
        for (var i = 0, qx = px; i < l; i++, qx += FNT_WIDTH) {
            var c = chars[i];
            var dx = (c%16)*FNT_WIDTH;
            var dy = Math.floor(c/16)*FNT_HEIGHT;
            this._ctx.putImageData(this._fntImageData, qx - dx, py - dy, dx, dy, FNT_WIDTH, FNT_HEIGHT);
        }
        // blend with fg color
        this._ctx.globalCompositeOperation = 'source-atop';
        this._ctx.fillStyle = this._fgColor;
        this._ctx.fillRect(px, py, w, FNT_HEIGHT);
        // blend with bg color
        this._ctx.globalCompositeOperation = 'destination-over';
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(px, py, w, FNT_HEIGHT);

        this._ctx.restore();
    }

    TEngine.prototype.drawChar = function(c, x, y) {
        this.drawChars([c], x, y);
    }

    TEngine.prototype.drawText = function(text, x, y) {
        var chars = [];
        for (var i = 0, l = text.length; i < l; i++) {
            chars.push(text.charCodeAt(i));
        }
        this.drawChars(chars, x, y);
    }

    TEngine.prototype.drawTestScreen = function() {
        this.setColors(TEngine.COLOR_BRIGHT_WHITE, TEngine.COLOR_BLACK);
        this.clear();
        // text
        this.drawText('Text example! \x01 \x02', 4, 2);
        this.drawText('Code Page 437', 76 - 13, 2);
        // color palette
        this.drawText('\xda' + '\xc4'.repeat(70) + '\xbf', 4, 4);
        this.drawText('\xc0' + '\xc4'.repeat(70) + '\xd9', 4, 13);
        for (var i = 0; i < 8; i++) {
            this.drawText('\xb3', 4, 5 + i);
            this.drawText('\xb3', 75, 5 + i);
        }
        for (var i = 0; i < 8; i++) {
            this.setColors(i, i + 8);
            this.drawRectangle(5, 5 + i, 35, 1);
            this.clearRectangle(40, 5 + i, 35, 1);
        }
        // text with colors
        this.setColors(TEngine.COLOR_BRIGHT_RED, TEngine.COLOR_BRIGHT_YELLOW);
        this.drawText('Text with colors!', 4, 15);
        this.setColors(TEngine.COLOR_MAGENTA, TEngine.COLOR_GREEN);
        this.clearRectangle(40, 16, 8, 4);
        this.drawRectangle(44, 18, 8, 4);
    }

})();
