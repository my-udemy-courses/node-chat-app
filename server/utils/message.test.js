var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res
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