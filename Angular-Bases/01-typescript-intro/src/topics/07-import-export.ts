import { taxCalculation, type Product } from './06-function-destructuring';


const shoppingCart: Product[] = [
    { description: 'Nokia A1', price: 150 },
    { description: 'iPad Air', price: 350 },
    { description: 'MacBook Air', price: 950 }
];

const [total, taxTotal] = taxCalculation({ products: shoppingCart, tax: 0.15 });

console.log('Total', total);
console.log('Tax',taxTotal);

