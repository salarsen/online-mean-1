function personCreator(name, items) {
    return { 
        name,
        items,
        stealFrom: function(){}
    };
}

function stealAnItem(stealer,jason,item){
    for(var i = 0; i < jason.items.length; i++){
        console.log('For Loop',i,jason.items);
        if(jason.items[i] === item){
            stealer.items.push(item)
            jason.items.splice(i,1);
            return true;
        };
    };
    return false;
}

var charlie = personCreator('Charlie', ['wallet', 'keys']);
var jason = personCreator('Jason', ['chapstick', 'keys', 'phone']);

// Get this to work!
/*
charlie.stealFrom(jason, 'phone');
jason.stealFrom(charlie, 'wallet');
*/