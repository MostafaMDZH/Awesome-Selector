const Selector = require('./selector.js');

test('sample test', () => {
    const sb = new Selector();
    expect(typeof sb).toEqual('object');
});