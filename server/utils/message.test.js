var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Testperson';
        var text = 'Fucking retarded!';

        var message = generateMessage(from, text);

        // assert from match
        expect(message.from).toBe(from);

        // assert text match
        expect(message.text).toBe(text);

        // assert createdAt is number
        expect(typeof message.createdAt).toBe('number')
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Testperson';
        var lat = 15.345345;
        var lng = -17.345435435;

        var message = generateLocationMessage(from, lat, lng);

        expect(message.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
    });
});