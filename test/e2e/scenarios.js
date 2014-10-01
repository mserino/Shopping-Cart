describe('angularjs homepage', function() {
  var ptor, cart, products, product, cartItems;

  beforeEach(function(){
    ptor = protractor.getInstance();
    ptor.get('/')
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Shopping Cart');
  });

  it('should display all the items', function(){
    var itemsList = element.all(by.repeater('item in items'));
    expect(itemsList.count()).toBe(13);
  });

  it('should display the name of the item', function(){
    var item = element.all(by.binding('item.name')).first();
    expect(item.getText()).toBe('Almond Toe Court Shoes, Patent Black');
  });

  it('should display the category of the item', function(){
    var item = element.all(by.binding('item.category')).first();
    expect(item.getText()).toBe("Category: Women’s Footwear");
  });

  it('should display the price of the item', function(){
    var item = element.all(by.binding('item.price')).first();
    expect(item.getText()).toBe("£99.00");
  });

  it('should display how many items are still in stock', function(){
    var item = element.all(by.binding('item.quantity')).first();
    expect(item.getText()).toBe("5 left in stock");
  });

  it('should display an empty cart', function(){
    var cart = element(by.css('.cart'));
    expect(cart.getText()).toBe('The Cart is empty');
  });
});