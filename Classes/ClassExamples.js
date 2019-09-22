// This file contains Accessors. To build, must target EMCAScript 5:
// tsc --target es5 ClassExamples.ts
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///////////////////////////////////////////////////////////////
/* Simple class example */
// Greeter class has 3 members:
// 1. property called 'greeting'
// 2. a constructor
// 3. method called 'greet()'
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        // 'this' denotes a member access.
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
// Use 'new' to construct an instance of Greeter.
var greeter = new Greeter("world");
///////////////////////////////////////////////////////////////
/* Inheritance example */
// Simple animal class.
var SimpleAnimal = /** @class */ (function () {
    function SimpleAnimal() {
    }
    SimpleAnimal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("Animal moved " + distanceInMeters + "m.");
    };
    return SimpleAnimal;
}());
// Dog can bark and move.
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log('Woof! Woof!');
    };
    return Dog;
}(SimpleAnimal));
var dog = new Dog();
dog.bark(); // Called from derived class Dog
dog.move(10); // Called from base class Animal
dog.bark();
// More complex animal class.
var ComplexAnimal = /** @class */ (function () {
    function ComplexAnimal(theName) {
        this.name = theName;
    }
    ComplexAnimal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + ".m");
    };
    return ComplexAnimal;
}());
// Since both the following classes have constructors, they *must* call
// super(), which will execute the constructor of the base class.
// We must call super() before we can access a property on 'this'.
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(ComplexAnimal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(ComplexAnimal));
var sam = new Snake("Sammy the Python");
// Tom is declared as ComplexAnimal, but it is a horse.
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
///////////////////////////////////////////////////////////////
/* Access Modifiers */
// Class members are public by default.
// You can still explicitly mark members with public:
var AccessAnimal = /** @class */ (function () {
    function AccessAnimal(theName) {
        this.name = theName;
    }
    AccessAnimal.prototype.move = function (distanceInMeters) {
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return AccessAnimal;
}());
// TypeScript is a structural type system. When 2 different types are
// compared, regardless of where they came from, if the types are
// compatible, then the types themselves are compatible.
// But, when comparing types that have private and protected members,
// the types are treated differently. For 2 types to be considered
// compatible, if one has a private member, then the other must have
// a private member that originated in the same declaration.
// This also applies to protected members.
var TypeCompareAnimal = /** @class */ (function () {
    function TypeCompareAnimal(theName) {
        this.name = theName;
    }
    return TypeCompareAnimal;
}());
var Hippo = /** @class */ (function (_super) {
    __extends(Hippo, _super);
    function Hippo() {
        return _super.call(this, "Hippo") || this;
    }
    return Hippo;
}(TypeCompareAnimal));
var Employee = /** @class */ (function () {
    function Employee(theName) {
        this.name = theName;
    }
    return Employee;
}());
var typeCompareAnimal = new TypeCompareAnimal("Goat");
var motoMoto = new Hippo();
var employee = new Employee("Bob");
// Valid assignment because typeCompareAnimal and motoMoto share
// the private side of their shape from the same declaration of
// private name: string in TypeCompareAnimal.
typeCompareAnimal = motoMoto;
// Cannot do employee = typeCompareAnimal. Even though employee
// has a private member called name, it's not the one declared in
// TypeCompareAnimal.
var SecondPerson = /** @class */ (function () {
    // Constructor can't be accessed outside of derived classes.
    function SecondPerson(name) {
        this.name = name;
    }
    return SecondPerson;
}());
var SecondEmployee = /** @class */ (function (_super) {
    __extends(SecondEmployee, _super);
    function SecondEmployee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    SecondEmployee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return SecondEmployee;
}(SecondPerson));
var howard = new SecondEmployee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// Can't call 'console.log(howard.name)' this since howard's name
// is protected and can't be accessed outside of the class or classes
// that extend SecondPerson.
// Can't write 'let john = new SecondPerson("John")' since
// SecondPerson's constructor is protected.
var Octopus = /** @class */ (function () {
    function Octopus(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
    return Octopus;
}());
var dad = new Octopus("Man with the 8 strong legs");
// Can't write 'dad.name = "Octodad"' since name is readonly.
var Spider = /** @class */ (function () {
    // Here, name is a Parameter Property. This lets you create
    // and initialize the variable in one place.
    function Spider(name) {
        this.name = name;
        this.numberOfLegs = 8;
    }
    return Spider;
}());
///////////////////////////////////////////////////////////////
/* Accessors */
var AccessorEmployee = /** @class */ (function () {
    function AccessorEmployee() {
    }
    return AccessorEmployee;
}());
var accessorEmployee = new AccessorEmployee();
accessorEmployee.fullname = "Bob Smith";
if (accessorEmployee.fullname) {
    console.log(accessorEmployee.fullname);
}
var fullNameMaxLength = 15;
var ImprovedAccessorEmployee = /** @class */ (function () {
    function ImprovedAccessorEmployee() {
    }
    Object.defineProperty(ImprovedAccessorEmployee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (newName && newName.length > fullNameMaxLength) {
                throw new Error("fullName has a max length of " + fullNameMaxLength);
            }
            this._fullName = newName;
        },
        enumerable: true,
        configurable: true
    });
    return ImprovedAccessorEmployee;
}());
// Accessors with a get and no set are automatically inferred to be readonly.
var improvedAccessorEmployee = new ImprovedAccessorEmployee();
improvedAccessorEmployee.fullName = "Bob Smith";
if (improvedAccessorEmployee.fullName) {
    console.log(improvedAccessorEmployee.fullName);
}
///////////////////////////////////////////////////////////////
/* Static Properties */
// Static members are visible on the class rather than on the members.
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    ;
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1.0); // 1x scale grid.
var grid2 = new Grid(5.0); // 5x scale grid.
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
///////////////////////////////////////////////////////////////
/* Abstract Classes */
// Abstract classes cannot be instantiated, only derived.
var AbstractAnimal = /** @class */ (function () {
    function AbstractAnimal() {
    }
    AbstractAnimal.prototype.move = function () {
        console.log("roaming the earth...");
    };
    return AbstractAnimal;
}());
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log("Department name: " + this.name);
    };
    return Department;
}());
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment() {
        return _super.call(this, "Accounting and Auditing") || this;
    }
    AccountingDepartment.prototype.printMeeting = function () {
        console.log("The Accounting Department meets each Monday at 10am.");
    };
    AccountingDepartment.prototype.generateReports = function () {
        console.log("Generating accoutning reports...");
    };
    return AccountingDepartment;
}(Department));
var department; // OK: Can create a reference to an abstract type.
// But CANNOT do: department = new Department(); because abstract classes cannot be instantiated.
department = new AccountingDepartment(); // OK: Create and assigne a non-abstract subclass.
department.printName();
department.printMeeting();
// Cannot call department.generateReports() because department was declared as a reference
// to the abstract class Department, so it doesn't exist for department.
///////////////////////////////////////////////////////////////
/* Advanced Techniques */
var myGreeter; // Greeter is the type of instances of the class Greeter.
// Constructor function is what is called when we 'new' up instances of the class.
var AdvancedGreeter = /** @class */ (function () {
    function AdvancedGreeter() {
    }
    AdvancedGreeter.prototype.greet = function () {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return AdvancedGreeter.standardGreeting;
        }
    };
    AdvancedGreeter.standardGreeting = "Hello, there";
    return AdvancedGreeter;
}());
// Instantiate AdvancedGreeter class and use the object.
var advancedGreeter1;
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
var greeterMaker = AdvancedGreeter;
greeterMaker.standardGreeting = "Hey there!";
// Calling new on greeterMaker creates a new instance of AdvancedGreeter.
var advancedGreeter2 = new greeterMaker();
console.log(advancedGreeter2.greet());
// Using a class as an interface:
// A class declaration creates 2 things:
// 1. A type representing instances of the class.
// 2. A constructor function.
// Because clases create types, you can use them in the same places
// you would be able to use interfaces.
var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };
