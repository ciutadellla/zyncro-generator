describe('<%= camelModuleName %> section', function () {
    beforeEach(module('<%= insertDep %>'));

    it('should have a dummy test', inject(function() {
        expect(true).toBeTruthy();
    }));
});
