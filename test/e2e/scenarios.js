describe('angularjs homepage', function() {
  it('should have a title', function() {
    browser.get('http://localhost:8000/app/index.html');

    expect(browser.getTitle()).toEqual('Shopping Cart');
  });
});