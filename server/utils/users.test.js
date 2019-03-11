const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

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

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });

    it('should remove a user', () => {
        var user = users.removeUser('2');
        
        expect(user.id).toBe('2');
        expect(users.getUser('2')).toBe(undefined);
    });

    it('should not remove user', () => {
        var user = users.removeUser('10');

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should get user by id', () => {
        var user = users.getUser('2');

        expect(user).toBe(users.users[1]);
    });

    it('should not find user with non-existent id', () => {
        var user = users.getUser('6');

        expect(user).toBe(undefined);
    });
});