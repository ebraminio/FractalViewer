/*global document: false, rePaint: false, $: false, Artist: false, mandelbrot: false, window: false */

var canvas, context, imageData, artist;

function computeWindowSize() {
    "use strict";
    var rect = document.body.getClientRects()[0];
    return [rect.height, rect.width, Math.min(rect.height, rect.width)];
}

function load() {
    "use strict";
    canvas = document.getElementById("mainCanvas");
    artist = new Artist(canvas, mandelbrot);
    rePaint();
}

function zoomInClick(e) {
    "use strict";
    artist.X = artist.X + e.pageX;
    artist.Y = artist.Y + e.pageY;
    artist.Z = artist.Z + 1;
    rePaint();
}

function zoomOutClick(e) {
    "use strict";
    artist.X = artist.X - e.pageX;
    artist.Y = artist.Y - e.pageY;
    artist.Z = artist.Z - 1;
    rePaint();
    return false; // disabling default contextMenu
}

function rePaint() {
    "use strict";
    artist.Draw();
}

function clear() {
    "use strict";
    artist.X = 0;
    artist.Y = 0;
    artist.Z = 1;
    rePaint();
    return false;
}

$(function () {
    "use strict";
    $("#clearButton").click(clear);
    $("#buttonsMenu").click(function () {
        return false;
    });
    $("body").bind("contextmenu", zoomOutClick);
    $("body").click(zoomInClick);

    $(window).resize(function () {
        rePaint();
    });

    $('#mainCanvas').imgAreaSelect({ maxWidth: 200, maxHeight: 150, handles: true });
});
