function personCreator(name, items) {
    return {
        name,
        items,
        stealFrom: function(victim, item){
          for(var i = 0; i < victim.items.length; i++){
              if(victim.items[i] === item){
                  items.push(item);
                  victim.items.splice(i,1);
                  return true;
              };
          };
          return false;
        }
    };
}

// function stealAnItem(stealer,jason,item){
//     for(var i = 0; i < jason.items.length; i++){
//         console.log('For Loop',i,jason.items);
//         if(jason.items[i] === item){
//             stealer.items.push(item)
//             jason.items.splice(i,1);
//             return true;
//         };
//     };
//     return false;
// }

var charlie = personCreator('Charlie', ['wallet', 'keys']);
var jason = personCreator('Jason', ['chapstick', 'keys', 'phone']);

// Get this to work!

charlie.stealFrom(jason, 'phone');
jason.stealFrom(charlie, 'wallet');

console.log(charlie);
console.log(jason);
