// This file contains Accessors. To build, must target EMCAScript 5:
// tsc --target es5 ClassExamples.ts

///////////////////////////////////////////////////////////////
/* Simple class example */

// Greeter class has 3 members:
// 1. property called 'greeting'
// 2. a constructor
// 3. method called 'greet()'
class Greeter {
    greeting: string;
    constructor(message: string) {
        // 'this' denotes a member access.
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

// Use 'new' to construct an instance of Greeter.
let greeter = new Greeter("world");

///////////////////////////////////////////////////////////////
/* Inheritance example */

// Simple animal class.
class SimpleAnimal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

// Dog can bark and move.
class Dog extends SimpleAnimal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();   // Called from derived class Dog
dog.move(10); // Called from base class Animal
dog.bark();

// More complex animal class.
class ComplexAnimal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}.m`);
    }
}

// Since both the following classes have constructors, they *must* call
// super(), which will execute the constructor of the base class.
// We must call super() before we can access a property on 'this'.

class Snake extends ComplexAnimal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends ComplexAnimal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");

// Tom is declared as ComplexAnimal, but it is a horse.
let tom: ComplexAnimal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

///////////////////////////////////////////////////////////////
/* Access Modifiers */

// Class members are public by default.
// You can still explicitly mark members with public:
class AccessAnimal {
    public name: string;
    public constructor(theName: string) { this.name = theName }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

// TypeScript is a structural type system. When 2 different types are
// compared, regardless of where they came from, if the types are
// compatible, then the types themselves are compatible.

// But, when comparing types that have private and protected members,
// the types are treated differently. For 2 types to be considered
// compatible, if one has a private member, then the other must have
// a private member that originated in the same declaration.
// This also applies to protected members.

class TypeCompareAnimal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Hippo extends TypeCompareAnimal {
    constructor() { super("Hippo"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let typeCompareAnimal = new TypeCompareAnimal("Goat");
let motoMoto = new Hippo();
let employee = new Employee("Bob");

// Valid assignment because typeCompareAnimal and motoMoto share
// the private side of their shape from the same declaration of
// private name: string in TypeCompareAnimal.
typeCompareAnimal = motoMoto;

// Cannot do employee = typeCompareAnimal. Even though employee
// has a private member called name, it's not the one declared in
// TypeCompareAnimal.

class SecondPerson {
    protected name: string;

    // Constructor can't be accessed outside of derived classes.
    protected constructor(name: string) { this.name = name; }
}

class SecondEmployee extends SecondPerson {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new SecondEmployee("Howard", "Sales");
console.log(howard.getElevatorPitch());

// Can't call 'console.log(howard.name)' this since howard's name
// is protected and can't be accessed outside of the class or classes
// that extend SecondPerson.

// Can't write 'let john = new SecondPerson("John")' since
// SecondPerson's constructor is protected.

class Octopus {
    // readonly properties must be initialized at declaration
    // or in the constructor.
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
        this.name = theName;
    }
}

let dad = new Octopus("Man with the 8 strong legs");

// Can't write 'dad.name = "Octodad"' since name is readonly.

class Spider {
    readonly numberOfLegs: number = 8;

    // Here, name is a Parameter Property. This lets you create
    // and initialize the variable in one place.
    constructor(readonly name: string) {
    }
}

///////////////////////////////////////////////////////////////
/* Accessors */

class AccessorEmployee {
    fullname: string;
}

let accessorEmployee = new AccessorEmployee();
accessorEmployee.fullname = "Bob Smith";
if(accessorEmployee.fullname) {
    console.log(accessorEmployee.fullname);
}

const fullNameMaxLength = 15;

class ImprovedAccessorEmployee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if(newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }

        this._fullName = newName;
    }
}

// Accessors with a get and no set are automatically inferred to be readonly.

let improvedAccessorEmployee = new ImprovedAccessorEmployee();
improvedAccessorEmployee.fullName = "Bob Smith";
if(improvedAccessorEmployee.fullName) {
    console.log(improvedAccessorEmployee.fullName);
}

///////////////////////////////////////////////////////////////
/* Static Properties */

// Static members are visible on the class rather than on the members.

class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number, y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }

    constructor(public scale: number) { };
}

let grid1 = new Grid(1.0); // 1x scale grid.
let grid2 = new Grid(5.0); // 5x scale grid.

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

///////////////////////////////////////////////////////////////
/* Abstract Classes */

// Abstract classes cannot be instantiated, only derived.

abstract class AbstractAnimal {

    // Must be implemented in derived classes.
    // Defines signature without implementation.
    abstract makeSound(): void;

    move(): void {
        console.log("roaming the earth...");
    }
}

abstract class Department {
    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // Have to implement in derived classes.
}

class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing");
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accoutning reports...");
    }
}

let department: Department; // OK: Can create a reference to an abstract type.
// But CANNOT do: department = new Department(); because abstract classes cannot be instantiated.
department = new AccountingDepartment(); // OK: Create and assigne a non-abstract subclass.
department.printName();
department.printMeeting();
// Cannot call department.generateReports() because department was declared as a reference
// to the abstract class Department, so it doesn't exist for department.

///////////////////////////////////////////////////////////////
/* Advanced Techniques */

let myGreeter: Greeter; // Greeter is the type of instances of the class Greeter.

// Constructor function is what is called when we 'new' up instances of the class.

class AdvancedGreeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if(this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return AdvancedGreeter.standardGreeting;
        }
    }
}

// Instantiate AdvancedGreeter class and use the object.
let advancedGreeter1: AdvancedGreeter;
advancedGreeter1 = new AdvancedGreeter;
console.log(advancedGreeter1.greet());

// greeterMaker holds the class itself, or said another way,
// greetermaker holds AdvancedGreeter's constructor function.
// typeof AdvancedGreeter means "give me the type of the
// AdvancedGreeter class itself rather than the instance type".
// Or, put another way, it means "give me the type of the symbol called
// AdvancedGreeter", which is the type of the constructor function.
// This type contains all the static members of AdvancedGreeter and
// the constructor that creates instances of AdvancedGreeter.
let greeterMaker: typeof AdvancedGreeter = AdvancedGreeter;
greeterMaker.standardGreeting = "Hey there!";

// Calling new on greeterMaker creates a new instance of AdvancedGreeter.
let advancedGreeter2: AdvancedGreeter = new greeterMaker();
console.log(advancedGreeter2.greet());

// Using a class as an interface:
// A class declaration creates 2 things:
// 1. A type representing instances of the class.
// 2. A constructor function.
// Because clases create types, you can use them in the same places
// you would be able to use interfaces.
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};