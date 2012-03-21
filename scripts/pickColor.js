/*global $: false, artist, rePaint */
function hexFromRGB(r, g, b) {
    "use strict";
    var hex = [
            r.toString(16),
            g.toString(16),
            b.toString(16)
        ];
    $.each(hex, function (nr, val) {
        if (val.length === 1) {
            hex[nr] = "0" + val;
        }
    });
    return hex.join("").toUpperCase();
}
function refreshSwatch() {
    "use strict";
    var red = $("#red").slider("value"),
        green = $("#green").slider("value"),
        blue = $("#blue").slider("value"),
        hex = hexFromRGB(red, green, blue);
    $("#swatch").css("background-color", "#" + hex);
}
$(function () {
    "use strict";
    var oldColors = [0, 0, 0];
    $("#red, #green, #blue").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 127,
        slide: refreshSwatch,
        change: refreshSwatch
    });
    $("#red").slider("value", 255);
    $("#green").slider("value", 140);
    $("#blue").slider("value", 60);

    $("#settingMenu").dialog({
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");

                var red = $("#red").slider("value"),
                    green = $("#green").slider("value"),
                    blue = $("#blue").slider("value");

                artist.gradientColorDef(oldColors[0], oldColors[1], oldColors[2], red, green, blue);

                oldColors = [red, green, blue];
                rePaint();
                return false;
            }
        },
        autoOpen: false,
        show: "blind",
        hide: "explode",
        width: "530px"
    });

    $("#settingMenu").click(function () {
        return false;
    });

    $("#colorPickerButton").click(function () {
        $("#settingMenu").dialog("open");
        return false;
    });
});