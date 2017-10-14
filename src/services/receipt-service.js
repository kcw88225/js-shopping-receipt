(function(root, printService, taxService){
    var exports = {};

    exports.printReceipt = function(arrOfProduct, location){
        var subTotal = this.getSubTotal(arrOfProduct);
        var taxTotal = this.getTaxTotal(arrOfProduct, location);
        var total = this.getTotal(subTotal, taxTotal);

        var receiptModel = {
            arrOfProduct: arrOfProduct,
            subTotal: subTotal,
            tax: taxTotal,
            total: total
        };

        printService.printReceipt(receiptModel);
    }

    exports.getSubTotal = function(arrOfProduct){
        var arrOfPrice = arrOfProduct.map(function(p){ return p.price });
        var subTotal = arrOfPrice.reduce(function(accumulator, currentValue){ return accumulator + currentValue; });

        return parseFloat(subTotal.toFixed(2));
    }

    exports.getTaxTotal = function(arrOfProduct, location){
        var taxTotal = 0;
        var productCount = arrOfProduct.length;

        for(var i = 0; i < productCount; i++){
            var curProduct = arrOfProduct[i];
            var productTaxRate = taxService.getTaxRate(location, curProduct.category);
            taxTotal += curProduct.price * productTaxRate;
        }
        
        return taxService.roundUpTaxRate(taxTotal);
    }

    exports.getTotal = function(subTotal, taxTotal){
        var total = subTotal + taxTotal;
        
        return parseFloat(total.toFixed(2));
    }

    root.receiptService = exports;
})(this, printService, taxService);