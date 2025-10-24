
export class Person {

    public name: string;
    private address: string;

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }
    
}

// export class Hero extends Person {
//     public alterEgo: string;
//     public age: number;
//     public realName?: string;

//     constructor(name: string, address: string, alterEgo: string, age: number, realName?: string) {
//         super(name, address);
//         this.alterEgo = alterEgo;
//         this.age = age;
//         this.realName = realName;
//     }   
// }


export class Hero  {
    public alterEgo: string;
    public age: number;
    public realName?: string;
    public person: Person;  
    constructor( person: Person, alterEgo: string, age: number, realName: string) {
        
        this.alterEgo = alterEgo;
        this.age = age;
        this.realName = realName;
        this.person = person;
    }   
}

const tony = new Person('Tony', 'New York, USA');
const iroman = new Hero(tony,  'Iron Man', 45, 'Anthony Edward Stark');
console.log(iroman);
