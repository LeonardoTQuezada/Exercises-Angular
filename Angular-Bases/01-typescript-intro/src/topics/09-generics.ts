








export function whatIsMyType<T>(argument: T): T {
    return argument;
}   

let amIString = whatIsMyType<string>('Hello World');
const amINumber = whatIsMyType<number>(100);
const amIArray = whatIsMyType<number[]>([1,2,3,4,5]);
const amIObject = whatIsMyType({ name: 'Edwin', age: 52 }); 

console.log('amIString', amIString.split);
console.log('amINumber', amINumber.toFixed);
console.log('amIArray', amIArray.join(' - '));
console.log('amIObject', amIObject);    
