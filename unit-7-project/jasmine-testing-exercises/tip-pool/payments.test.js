submitPaymentInfo()
createCurPayment()
updateServerTable()
updateSummary()



describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
      billAmtInput.value = 50;
      tipAmtInput.value = 10;
    });
  
    it('should add a new payment to AllPayment on submitPaymentInfo()', function () {
        // when submit payment form
        submitPaymentInfo()
    
        // there should be only one key, in the length of allPayments Obj. 
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('50');
        expect(allPayments['payment1'].tipAmt).toEqual('10');
        expect(allPayments['payment1'].tipPercent).toEqual(20);
    });
    


    it("should not add a new payment on submitPyamentInfo() with empty input", function() {
      //when submitting an empty value of billAmt in payment form
      billAmtInput.value = '';
      submitPaymentInfo();
  
      //there is no addition to allPayments.
      expect(Object.keys(allPayments).length).toEqual(0);
    });

    it("should not create payment on createCurPyament() with empty inputs", function() {
      //when submitting an empty value of billAmt & tipAmt in payment form
      billAmtInput.value = '';
      tipAmtInput.value = '';
      let expectedPayment = createCurPayment();
  
      //expectedPayment should return undefined
      expect(expectedPayment).toEqual(undefined);
    });

    it('should create a new payment on createCurPayment()', function () {
      let expectedPayment = {
        billAmt: '50',
        tipAmt: '10',
        tipPercent: 20,
      }
  
      expect(createCurPayment()).toEqual(expectedPayment);
    });
    
    afterEach(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      serverTbody.innerHTML = '';
      paymentId = 0;
      allPayments = {};
    });

  });
  
  
  