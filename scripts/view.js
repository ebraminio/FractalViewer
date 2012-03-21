/*global $: false */

$(function () {
    "use strict";
    $("#buttonsMenu").hover(function () {
        $(this).fadeTo("slow", 1.0);
        $("#buttonsMenu > p").hide();
    }, function () {
        $(this).fadeTo("slow", 0.3);
    });


    $(".bottom").hover(function () {
        $(this).fadeTo(0, 1.0);
    }, function () {
        $(this).fadeTo(5000, 0);
    });
    $(".bottom").fadeTo(3000, 0);
});