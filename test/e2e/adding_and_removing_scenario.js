describe('Adding and removing items from the cart', function(){
	var ptor, cart, products, product, cartItems;

  beforeEach(function(){
    ptor = protractor.getInstance();
    ptor.get('app/index.html')
  });
  
  beforeEach(function(){
    cart = element.all(by.repeater('item in cart'));
    products = element.all(by.repeater('item in items'));
  });

  // adding two products to the cart
  beforeEach(function(){
    ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
      elems[0].click();
      elems[1].click();
    });
  });

  it('can add an item to the cart', function(){
    cartItem = element.all(by.css('.item-cart-name')).first();
    expect(cartItem.getText()).toEqual("Almond Toe Court Shoes, Patent Black");
  });

  it('can remove an item from the cart', function(){
    cartItem = element.all(by.css('.item-cart-name')).first();
    expect(cartItem.getText()).toEqual("Almond Toe Court Shoes, Patent Black");

    (element.all(by.css('.rmv-btn')).first()).click();

    var elem = element(by.cssContainingText('.item-cart-name', 'Almond Toe Court Shoes, Patent Black'));
    expect(elem.isPresent()).toBe(false);
  });

  it('displays the total price of the objects in the cart', function(){
    total = element(by.css('.total-price')).getText();
    expect(total).toEqual("Total price: £141.00");
  });

  it('if the element added to the cart is already present, increases the quantity by 1', function(){
    ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
      elems[0].click();
    });

    ptor.findElements(protractor.By.model('item.desiredQuantity')).then(function(elems) {
      expect(elems[0].getAttribute('value')).toEqual('2')
    });
  });

  it('selecting quantity different from 1 increases the total', function(){
    ptor.findElements(protractor.By.model('item.desiredQuantity')).then(function(elems) {
      elems[0].clear();
      elems[0].sendKeys("4");
    });
    totalPrice = element(by.css('.total-price')).getText();
    expect(totalPrice).toEqual('Total price: £438.00');
  });


  it('when the product is selected the quantity decreases', function(){
    ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
      elems[0].click();
      elems[0].click();
      elems[0].click();
    });
    var elem = element(by.cssContainingText('.item-quantity', '1 left in stock'));
    expect(elem.isPresent()).toBe(true);
  });
});