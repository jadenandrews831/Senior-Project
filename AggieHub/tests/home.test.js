const { getDays } = require('../static/js/home.js');
const { getTime } = require('../static/js/home.js');
const { evalHexColor } = require('../static/js/home.js');

describe('converts string of weekdays to array of numbers', () => {
    it("should return '135'", () => {
        expect(getDays('MWF')).toBe('135');
    });
    it("should return '24'", () => {
        expect(getDays('TR')).toBe('24');
    });
});

describe('converts string time range (hh:mm (am/pm)) to array in military time range in the form (hh:mm:ss)', () => {
    it("should return ['12:00:00', '13:50:00']", () => {
        expect(getTime('12:00 pm-1:50 pm')).toStrictEqual(['12:00:00', '13:50:00']);
    });
    it("should return ['18:00:00', '19:15:00']", () => {
        expect(getTime('06:00 pm-07:15 pm')).toStrictEqual(['18:00:00', '19:15:00']);
    });
    it("should return ['09:00:00', '10:30:00']", () => {
        expect(getTime('09:00 am-10:30 am')).toStrictEqual(['09:00:00', '10:30:00']);
    });
});

describe('checks the brightness of a given hexadecimal color', () => {
    it("should return false", () => {
        expect(evalHexColor('000000')).toBe(false);
    });
    it("should return true", () => {
        expect(evalHexColor('ffffff')).toBe(true);
    });
    it("should return true", () => {
        expect(evalHexColor('ead1dc')).toBe(true);
    });
    it("should return false", () => {
        expect(evalHexColor('b45f06')).toBe(false);
    });
});