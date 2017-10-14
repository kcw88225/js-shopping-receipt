(function(root){
    var exports = {};
    
    exports.roundUpTaxRate = function(taxRate){ //and sales tax amount should be rounded up to the nearest 0.05 (e.g. 1.13->1.15, 1.16->1.20, 1.151->1.20)
        return Math.ceil(taxRate * 20) / 20;
    }

    exports.getTaxRate = function(location, productCategory){ //Certain product categories are exempt from sales tax (means tax will be 0)
        var freeTaxCategories = this.getFreeTaxCategoriesForLocation(location);
        if(freeTaxCategories.indexOf(productCategory) > -1){
            return 0;
        }

        return this.getTaxRateForLocation(location);
    }

    exports.getTaxRateForLocation = function(location){
        switch(location)
        {
            case "CA":
                return 0.0975;
            case "NY":
                return 0.0875;
            default:
                throw "not supported location.";
        }
    }

    exports.getFreeTaxCategoriesForLocation = function(location){
        switch(location)
        {
            case "CA":
                return ["food"];
            case "NY":
                return ["food", "clothing"];
            default:
                throw "not supported location.";
        }
    }

    root.taxService = exports;
})(this);