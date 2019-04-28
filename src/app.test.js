
const app = require('./app');
describe('App test', ()=> {
    test('when run with abc', ()=> {
        expect(app.run('abc')).toBe('abc changed');
    });

    test('when run with abc fails', ()=> {
        expect(app.run('abc')).toBe('abc changed');
    });
});
