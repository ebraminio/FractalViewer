function mandelbrot(putPoint, X, Y, Z, colorizeLevel, height, width) {
    "use strict";
    var ImageHeight = height * Z,
        ImageWidth = width * Z,
        MaxIterations = colorizeLevel,
        MinRe = -3.0,
        MaxRe = 2.0,
        MinIm = -1.2,
        MaxIm = MinIm + (MaxRe - MinRe) * width / height,
        Re_factor = (MaxRe - MinRe) / (ImageHeight - 1),
        Im_factor = (MaxIm - MinIm) / (ImageWidth - 1),
        y,
        x,
        n,
        c_im,
        c_re,
        Z_re,
        Z_im,
        isInside,
        Z_re2,
        Z_im2;

    for (y = Y; y < width + Y; y = y + 1) {
        c_im = MaxIm - y * Im_factor;

        for (x = X; x < height + X; x = x + 1) {
            c_re = MinRe + x * Re_factor;
            Z_re = c_re;
            Z_im = c_im;
            isInside = true;

            for (n = 0; n < MaxIterations; n = n + 1) {
                Z_re2 = Z_re * Z_re;
                Z_im2 = Z_im * Z_im;
                if (Z_re2 + Z_im2 > 4) {
                    isInside = false;
                    putPoint(x - X, y - Y, n);
                    break;
                }
                Z_im = 2 * Z_re * Z_im + c_im;
                Z_re = Z_re2 - Z_im2 + c_re;
            }
            if (isInside) {
                putPoint(x - X, y - Y, MaxIterations);
            }
        }
    }
}