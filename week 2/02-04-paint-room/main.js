function orderSupplies(item, callback) {
    var warehouse; // undefined
    var deliveryTime = Math.random() * 3000;
    setTimeout(function () {
        warehouse = {
            paint: {
                product: "Neon Green Paint",
                directions: function () {
                    return "mix it!";
                }
            },
            brush: {
                product: "Horsehair brush",
                directions: function () {
                    return "start painting!";
                }
            }
        };
        callback(warehouse[item]);
    }, deliveryTime);
}


function printDelivery(item){
    var output = `${item.product} received, time to ${item.directions()}`;
    console.log(output);
}

orderSupplies('paint', function(item){
    printDelivery(item);
});
orderSupplies('brush', function(item){
    printDelivery(item)
});
 


/*
Neon Green Paint received, time to mix it!
Horsehair brush received, time to start painting!
*/