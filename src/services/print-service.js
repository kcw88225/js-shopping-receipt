(function(root){
    var exports = {};
    var constant = {
        dom: "app"
    };

    exports.printLine = function(msg){
        var dom = document.getElementsByTagName(constant.dom)[0];
        var newContent = document.createElement("div");
        newContent.innerHTML = msg;
        dom.appendChild(newContent);
    }

    exports.printReceipt = function(receiptModel){
        var dom = document.getElementsByTagName(constant.dom)[0];
        var table = document.createElement("table");
        table.setAttribute('border', '1');

        //title
        var titleRow = getReceiptRow("item", "price", "qty");
        table.appendChild(titleRow);

        //product
        var productGroups = groupProduct(receiptModel.arrOfProduct);
        for (key in productGroups) {
            var curGroup = productGroups[key];
            var productRow = getReceiptRow(key, curGroup.price, curGroup.qty);
            table.appendChild(productRow);
        }

        //total
        var subTotalRow = getReceiptRow("subTotal:", "", receiptModel.subTotal);
        var taxRow = getReceiptRow("tax:", "", receiptModel.tax);
        var totalRow = getReceiptRow("total:", "", receiptModel.total);
        table.appendChild(subTotalRow);
        table.appendChild(taxRow);
        table.appendChild(totalRow);

        dom.appendChild(table);
    }

    function getReceiptRow(item, price, qty){
        var tr = document.createElement("tr");
        var tdItem = document.createElement("td");
        tdItem.appendChild(document.createTextNode(item));
        
        var tdPrice = document.createElement("td");
        tdPrice.appendChild(document.createTextNode(price));

        var tdQty = document.createElement("td");
        tdQty.appendChild(document.createTextNode(qty));

        tr.appendChild(tdItem);
        tr.appendChild(tdPrice);
        tr.appendChild(tdQty);

        return tr;
    }

    function groupProduct(arrOfProduct){
        var group = {};
        var productCount = arrOfProduct.length;
        for(var i = 0; i < productCount; i++){
            var curProduct = arrOfProduct[i];
            if(!group.hasOwnProperty(curProduct.name)){
                group[curProduct.name] = { qty: 1, price: curProduct.price };
            }
            else {
                group[curProduct.name].qty++;
            }
        }

        return group
    }

    root.printService = exports;
})(this);