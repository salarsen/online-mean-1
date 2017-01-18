var a = ['spencer','charlie','xone','jason'];
// function each(arr,callback){
//     for(var i = 0; i < arr.length; i++){
//         callback(arr[i]);
//     }
// }
//
// function capitalize(string){
//     return string[0].toUpperCase() + string.slice(1,string.length);
// }
//
// each (a, function(item){
//     console.log(capitalize(item));
// })

var _ = {
   map: function() {
     //code here;
   },
   reduce: function(arr,callback) {
     // code here;
     var sum;
     for(var i = 0; i < arr.length; i++){
        //  callback(arr[i];
     }
     return sum;
   },
   find: function(arr,callback) {
     // code here;
     for(var i = 0; i < arr.length; i++){
         if(callback(arr[i])){
             return arr[i];
         }
     }
     //return undefined occurs automatically
   },
   filter: function(arr,callback) {
     // code here;
     var ret = [];
     for(var i = 0; i < arr.length; i++){
         if(callback(arr[i])){
            ret.push(arr[i]);
         }
     }
     return ret;
   },
   reject: function() {
     // code here;
   }
 }

 var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){
     return num % 2 == 0;
 });
 console.log(evens); // if things are working right, this will return [2,4,6].

// var reduction = _.reduce([1,2,3,4,5],function(num){
//     return num;
// });
// console.log(reduction);

 var pets = [
     { name: 'hank', type:'dog' },
     { name: 'brent', type:'python'},
     { name: 'hebert', type:'lion'}
]

var result = _.find(pets,function(item){
    return item.name === 'brent';
});
console.log(result);
