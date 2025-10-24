export interface Passenger {
    name: string;
    children?: string[];
}
const passenger1: Passenger = {
    name: 'Edwin Tinitana'
};
const passenger2: Passenger = {
    name: 'Elena Martinez',
    children: ['Jessica Tinitana', 'Gabriel Tinitana']
}; 


function printChildren(passenger: Passenger): void {
    const howManyChildren = passenger.children?.length || 0;
    console.log(passenger.name,howManyChildren);
    //console.log(passenger.children?.length ?? 'No tiene hijos'); // null ?? undefined

}

printChildren(passenger1);
printChildren(passenger2);
