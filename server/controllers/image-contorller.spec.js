describe("Image service controller", function() {
    xit("should have a endpoint that return Original image", () => {
        //`/image/{file.ext}`
    });

    xit("should returns the image resized with aspect ratio maintained so that the largest edge is less than or equal to the value of `max` (number) in pixels", () => {
        // /image/m_{max}/{file.ext}
    });

    xit("should returns the image with the width and height resized to fit within `width` (number) and `height` (number) while maintaining aspect ratio. A specified `max` value should be ignored if width and height are specified.", () => {
        // /image/w_{width},h_{height}/{file.ext}`
    });

    xit("should In addition to the returning the original or resized image, if a user specifies a format of `jpeg`, `png` or `webp` the image should be returned in that format and not the original format.", () => {
        //`/image/f_{format}/{file.ext}`
    });
});
