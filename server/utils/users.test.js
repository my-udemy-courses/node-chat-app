const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '2345',
            name: 'Arthur',
            room: 'Dschungel'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });
});