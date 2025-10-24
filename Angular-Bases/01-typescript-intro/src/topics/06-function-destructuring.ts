export interface Product {
  description: string;
  price: number;
}

// const phone: Product = {
//   description: 'Nokia A1',
//   price: 150
// };
// const tablet: Product = {
//   description: 'iPad Air',
//   price: 350
// };
// const laptop: Product = {
//   description: 'MacBook Air',
//   price: 950
// };

interface TaxCalculationOptions {
  tax: number;
  products: Product[];
}

export function taxCalculation(options: TaxCalculationOptions): [number, number] {
  //function taxCalculation({tax, products}: TaxCalculationOptions): [number, number] {  opcion no recomendada
  const { products, tax } = options;
  let total = 0;
  products.forEach(({ price }) => {
    total += price;
  });

  return [total, total * tax];
}

// const shoppingCart: Product[] = [phone, tablet, laptop];

// const tax = 0.15;

// const [total, taxTotal] = taxCalculation({ products: shoppingCart, tax: tax });

// console.log('Total', total);
// console.log('Tax', taxTotal);
