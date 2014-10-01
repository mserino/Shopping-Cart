describe('Vouchers and discounts', function(){
  var ptor, cart, products, product, cartItems;

  beforeEach(function(){
    ptor = protractor.getInstance();
    ptor.get('app/index.html')
  });

  it('can add a £5 voucher', function(){
    // adding element to the cart
    ptor.findElements(protractor.By.css('.add-btn')).then(function(elems) {
      elems[0].click();
    });

    total = element(by.css('.total-price')).getText();
    expect(total).toEqual('Total price: £99.00');
    
    // redeeming the £5 voucher
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