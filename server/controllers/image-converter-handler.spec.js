const {
    isValidDimension,
    isValidFormat,
    parseOptions,
    calcDimensionByMaxEdge,
    calcDimensionByWidthAndHeight
} = require("./image-converter-handler");

describe("isValidDimension should return true if one of the dimension options is incorrect", function() {
    const TESTS = [
        {
            desc: "With string number",
            in: [["m", "200"]],
            out: true
        },
        {
            desc: "Mix string and real number",
            in: [["m", "200"], ["h", 200], ["w", 200]],
            out: true
        },
        {
            desc: "Negative number is invalid",
            in: [["m", "200"], ["h", -200], ["w", 200]],
            out: false
        },
        {
            desc: "String is invalid",
            in: [["h", "string"]],
            out: false
        },
        {
            desc: "Empty options is valid",
            in: [],
            out: true
        }
    ];

    TESTS.forEach(data => {
        const option = new Map(data.in);
        test(`Case: ${data.desc}`, () => {
            expect(isValidDimension(option)).toEqual(data.out);
        });
    });
});

describe("isValidFormat should return true when format is valid, case insensitive", () => {
    const TESTS_CASES = [
        { desc: "mixed case, jpeg", in: "JpEG", out: true },
        { desc: "lower case png", in: "png", out: true },
        { desc: "mixed case, webp", in: "webP", out: true },
        { desc: "unsupported format", in: "tiff", out: false },
        { desc: "mixed cased, unsupported format", in: "RanDOM", out: false }
    ];

    TESTS_CASES.forEach(test_data => {
        test(`Case: ${test_data.desc}`, () => {
            expect(isValidFormat(test_data.in)).toEqual(test_data.out);
        });
    });
});

describe("parseOptions", function() {
    it("should parse a string into a map", () => {
        const TESTS = [
            {
                in: "m_100,h_100,w_100,f_jpeg",
                out: [["m", "100"], ["h", "100"], ["w", "100"], ["f", "jpeg"]]
            },
            { in: "m_100,h100,w_100,fjpeg", out: [["m", "100"], ["w", "100"]] },
            { in: "m_100h_100w_100f_jpeg", out: [] },
            {
                in: "m_100_100,h/100,w_100,f_jpeg",
                out: [["w", "100"], ["f", "jpeg"]]
            },
            { in: "", out: [] }
        ];

        TESTS.forEach(test => {
            expect(parseOptions(test.in)).toEqual(new Map(test.out));
        });
    });
});

describe("calcDimensionByMaxEdge", function() {
    it("should return scaled and floored width and height by max size", () => {
        const WIDE_IMAGE = { width: 200, height: 100 };
        const TALL_IMAGE = { width: 100, height: 200 };

        const TESTS = [
            { in: 100, out: { width: 100, height: 50 }, img: WIDE_IMAGE },
            { in: 200, out: { width: 200, height: 100 }, img: WIDE_IMAGE },
            { in: 300, out: { width: 300, height: 150 }, img: WIDE_IMAGE },
            { in: 100, out: { width: 50, height: 100 }, img: TALL_IMAGE },
            { in: 200, out: { width: 100, height: 200 }, img: TALL_IMAGE },
            { in: 300, out: { width: 150, height: 300 }, img: TALL_IMAGE }
        ];

        TESTS.forEach(test => {
            expect(calcDimensionByMaxEdge(test.img, test.in)).toEqual(test.out);
        });
    });
});

describe("calcDimensionByWidthAndHeight", function() {
    it("should return scaled and floored width and height by max size", () => {
        const WIDE_IMAGE = { width: 200, height: 100 };
        const TALL_IMAGE = { width: 100, height: 200 };

        const TESTS = [
            {
                in: { w: 100, h: 100 },
                out: { width: 100, height: 50 },
                img: WIDE_IMAGE
            },
            {
                in: { w: 400, h: 100 },
                out: { width: 200, height: 100 },
                img: WIDE_IMAGE
            },
            {
                in: { w: 100, h: 300 },
                out: { width: 100, height: 50 },
                img: WIDE_IMAGE
            },
            {
                in: { w: 100, h: 100 },
                out: { width: 50, height: 100 },
                img: TALL_IMAGE
            },
            {
                in: { w: 100, h: 300 },
                out: { width: 100, height: 200 },
                img: TALL_IMAGE
            },
            {
                in: { w: 400, h: 100 },
                out: { width: 50, height: 100 },
                img: TALL_IMAGE
            }
        ];

        TESTS.forEach(test => {
            expect(calcDimensionByWidthAndHeight(test.img, test.in)).toEqual(
                test.out
            );
        });
    });
});
