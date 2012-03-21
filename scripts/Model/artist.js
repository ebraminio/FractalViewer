/*global computeWindowSize: false */
function Artist(canvasElement, drawingAlgorithm) {
    "use strict";
    this.X = 0;
    this.Y = 0;
    this.Z = 1;
    this.colorizeLevel = 31;

    var canvas = canvasElement,
        context = canvas.getContext('2d'),
        RColor = [],
        GColor = [],
        BColor = [],
        AColor = [],
        size = [],
        canvasImageData;

    this.gradientColorDef = function (startR, startG, startB, endR, endG, endB) {
        var diffRed = endR - startR,
            diffGreen = endG - startG,
            diffBlue = endB - startB,
            i,
            percentFade;

        for (i = 0; i < this.colorizeLevel; i = i + 1) {
            percentFade = i / this.colorizeLevel;
            RColor[i] = (diffRed * percentFade) + startR;
            GColor[i] = (diffGreen * percentFade) + startG;
            BColor[i] = (diffBlue * percentFade) + startB;
            AColor[i] = 255;
        }

        RColor[this.colorizeLevel] = 255;
        GColor[this.colorizeLevel] = 255;
        BColor[this.colorizeLevel] = 255;
        AColor[this.colorizeLevel] = 255;
    };

    this.gradientColorDef(255, 255, 255, 0, 0, 255);

    this.Draw = function () {
        var newSize = computeWindowSize(),
            width = newSize[0],
            height = newSize[1],
            drawingArray;

        if (size.join() !== newSize.join()) {
            size = newSize;
            canvasImageData = context.createImageData(size[1], size[0]);
        }

        drawingArray = canvasImageData.data;

        function putPoint(y, x, n) {
            drawingArray[((x * (height * 4)) + (y * 4))] = RColor[n];
            drawingArray[((x * (height * 4)) + (y * 4)) + 1] = GColor[n];
            drawingArray[((x * (height * 4)) + (y * 4)) + 2] = BColor[n];
            drawingArray[((x * (height * 4)) + (y * 4)) + 3] = AColor[n];
        }

        drawingAlgorithm(putPoint, this.X, this.Y, this.Z, this.colorizeLevel, height, width);

        canvas.height = size[0];
        canvas.width = size[1];
        context.putImageData(canvasImageData, 0, 0);
    };
}