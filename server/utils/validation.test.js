const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var result = isRealString(12345);

        expect(result).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        var result = isRealString('     ');

        expect(result).toBeFalsy();
    })

    it('should accpet string with content', () => {
        var result = isRealString('  something  ');

        expect(result).toBeTruthy();
    })
});