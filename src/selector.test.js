const Selector = require('./selector.js');

test('sample test', () => {
    const sb = new Selector({
        message: 'This is a Selector!'
    });
    expect(typeof sb).toEqual('object');
});