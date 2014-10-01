describe('angularjs homepage', function() {
  var ptor, cart, products, product, cartItems;

  beforeEach(function(){
    ptor = protractor.getInstance();
    ptor.get('app/index.html')
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

  describe('Adding and removing items from the cart', function(){
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
      expect(element(by.model('item.desiredQuantity')).getAttribute('value')).toEqual('2');
    });

    it('selecting quantity different from 1 increases the total', function(){
      ptor.findElements(protractor.By.model('item.desiredQuantity')).then(function(elems) {
        elems[0].clear();
        elems[0].sendKeys("4");
      });
      totalPrice = element(by.css('.total-price')).getText();
      expect(totalPrice).toEqual('Total price: £438.00');
    });
  });

  describe('Vouchers and discounts', function(){

    it('can add a £5 voucher', function(){
      ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
        elems[0].click();
      });

      total = element(by.css('.total-price')).getText();
      expect(total).toEqual('Total price: £99.00');
      ptor.findElements(protractor.By.css('.btn-voucher')).then(function(elems){
        elems[0].click();
      });
      total = element(by.css('.total-price')).getText();
      expect(total).toEqual("Total price: £94.00");
    });

    it('£5 voucher is accepted and the total updated', function(){
      // adding element to the cart
      ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
        elems[0].click();
      });
      // redeeming the £5 voucher
      ptor.findElements(protractor.By.css('.btn-voucher')).then(function(elems){
        elems[0].click();
      });

      //displaying message
      message = element(by.css('.label-success')).getText();
      expect(message).toEqual("Your voucher has been accepted")
      // updating total
      totalPrice = element(by.css('.total-price')).getText();
      expect(totalPrice).toEqual('Total price: £94.00');
    });

    it('£10 is accepted if spending at least £50', function(){
      // adding element to the cart
      ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
        elems[0].click();
      });
      // redeeming the £10 voucher
      ptor.findElements(protractor.By.css('.btn-voucher')).then(function(elems){
        elems[1].click();
      });
      // displaying message
      message = element(by.css('.label-success')).getText();
      expect(message).toEqual("Your voucher has been accepted")

      // updating total
      totalPrice = element(by.css('.total-price')).getText();
      expect(totalPrice).toEqual('Total price: £89.00');
    });

    it('£10 is not accepted if not spending £50', function(){
      // adding element to the cart
      ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
        elems[1].click();
      });
      // redeeming the £10 voucher
      ptor.findElements(protractor.By.css('.btn-voucher')).then(function(elems){
        elems[1].click();
      });
     message = element(by.css('.label-danger')).getText();
      expect(message).toEqual("Sorry, the voucher is invalid")
    });

    it('£15 is accepted if spending at least £75 and buying footwear', function(){
      // adding element to the cart
      ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
        elems[0].click();
      });
      // redeeming the £15 voucher
      ptor.findElements(protractor.By.css('.btn-voucher')).then(function(elems){
        elems[2].click();
      });

      // displaying message
      message = element(by.css('.label-success')).getText();
      expect(message).toEqual("Your voucher has been accepted")

      // updating total
      totalPrice = element(by.css('.total-price')).getText();
      expect(totalPrice).toEqual('Total price: £84.00');
    });

    it('£15 not accepted if not spending at least £75', function(){
      // adding element to the cart
      ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
        elems[1].click();
      });

      // redeeming the £15 voucher
      ptor.findElements(protractor.By.css('.btn-voucher')).then(function(elems){
        elems[2].click();
      });

      // displaying message
     message = element(by.css('.label-danger')).getText();
      expect(message).toEqual("Sorry, the voucher is invalid")
    });

    it('£15 not accepted if not buying a pair of shoes', function(){
      // adding element to the cart
      ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
        elems[5].click();
      });

      // redeeming the £15 voucher
      ptor.findElements(protractor.By.css('.btn-voucher')).then(function(elems){
        elems[2].click();
      });

      // displaying message
     message = element(by.css('.label-danger')).getText();
      expect(message).toEqual("Sorry, the voucher is invalid")
    });
  });
});